import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// PRO token only
const KIWIFY_WEBHOOK_TOKEN_PRO = process.env.KIWIFY_WEBHOOK_TOKEN_PRO;

type KiwifyEvent =
  | "subscription_renewed"
  | "subscription_canceled"
  | "subscription_late"
  | "subscription_refunded"
  | "chargeback"
  | "order_approved"
  | (string & {});

interface KiwifyCustomer {
  email?: string;
  [key: string]: unknown;
}

interface KiwifySubscription {
  start_date?: string;
  [key: string]: unknown;
}

interface KiwifyPayload {
  token?: string;
  email?: string;
  Customer?: KiwifyCustomer;
  Subscription?: KiwifySubscription;
  subscription?: KiwifySubscription; // Covering possible casing variations
  event?: KiwifyEvent;
  [key: string]: unknown;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as KiwifyPayload;

    // 1. Security Check
    const receivedToken =
      payload.token || new URL(req.url).searchParams.get("token");

    if (
      !KIWIFY_WEBHOOK_TOKEN_PRO ||
      receivedToken !== KIWIFY_WEBHOOK_TOKEN_PRO
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 2. Extract Data
    const email = payload.Customer?.email || payload.email;
    const event = payload.event;

    // Helper to cast payload for Prisma InputJsonValue safely
    // (Prisma InputJsonValue allows null, string, number, boolean, object, array)
    const payloadJson = payload as unknown as Prisma.InputJsonValue;

    if (!email) {
      await prisma.kiwifyWebhookLog.create({
        data: {
          event: event || "unknown",
          payload: payloadJson,
          status: "error",
          error: "Email not found in payload",
        },
      });
      return NextResponse.json({ error: "Email missing" }, { status: 400 });
    }

    // 3. Find User
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { paymentEmail: email }],
      },
    });

    if (!user) {
      await prisma.kiwifyWebhookLog.create({
        data: {
          event: event || "unknown",
          payload: payloadJson,
          status: "error",
          error: `User not found for email: ${email}`,
        },
      });
      return NextResponse.json({ message: "User not found, ignored" });
    }

    // 4. Process Event
    let newPlan = user.plan;
    let newPlanExpiresAt = user.planExpiresAt;

    const normalizedEvent = event?.toLowerCase() || "";

    if (
      normalizedEvent === "order_approved" ||
      normalizedEvent === "subscription_renewed"
    ) {
      newPlan = "PRO";
      // Extend for 30 days essentially
      const now = new Date();
      const nextMonth = new Date(now);
      nextMonth.setDate(now.getDate() + 30);
      newPlanExpiresAt = nextMonth;
    } else if (
      normalizedEvent === "subscription_canceled" ||
      normalizedEvent === "subscription_late" ||
      normalizedEvent === "subscription_refunded" ||
      normalizedEvent === "chargeback"
    ) {
      // "se a assintura for cancelada apos 7 dias, o resto do mes deve continuar ativo"
      // "se dentro de 7 dias o usuaro cancelar a compra deve se mudar para o free"

      const subscriptionStartDateStr =
        payload.Subscription?.start_date || payload.subscription?.start_date;
      let isWithin7Days = false;

      if (subscriptionStartDateStr) {
        const startDate = new Date(subscriptionStartDateStr);
        const diffTime = Math.abs(new Date().getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) isWithin7Days = true;
      } else {
        // Fallback: If event is specifically 'subscription_refunded' or 'chargeback', implies immediate loss.
        if (
          normalizedEvent === "subscription_refunded" ||
          normalizedEvent === "chargeback"
        ) {
          isWithin7Days = true;
        }
      }

      if (isWithin7Days) {
        newPlan = "FREE";
        newPlanExpiresAt = null;
      }
      // Else: do nothing, let it expire naturally.
      // The user remains "PRO" in the DB, but logic in app checks planExpiresAt.
    }

    // 5. Update User if needed
    // We check if plan or expiration changed.
    // Note: Comparing Date objects with !== doesn't work well, use getTime()
    const expiresAtChanged =
      (newPlanExpiresAt === null && user.planExpiresAt !== null) ||
      (newPlanExpiresAt !== null && user.planExpiresAt === null) ||
      (newPlanExpiresAt &&
        user.planExpiresAt &&
        newPlanExpiresAt.getTime() !== user.planExpiresAt.getTime());

    if (newPlan !== user.plan || expiresAtChanged) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          plan: newPlan,
          planExpiresAt: newPlanExpiresAt,
        },
      });
    }

    // 6. Log Success
    await prisma.kiwifyWebhookLog.create({
      data: {
        event: normalizedEvent,
        payload: payloadJson,
        status: "success",
      },
    });

    return NextResponse.json({ message: "Webhook processed" });
  } catch (error: unknown) {
    console.error("Kiwify Webhook Error:", error);

    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    try {
      await prisma.kiwifyWebhookLog.create({
        data: {
          event: "processing_error",
          payload: {},
          status: "error",
          error: errorMessage,
        },
      });
    } catch (err) {
      console.error("Failed to log error:", err);
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
