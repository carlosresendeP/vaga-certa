import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// PRO tokens
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

interface KiwifyPayload {
  token?: string;
  email?: string;
  Customer?: KiwifyCustomer;
  event?: KiwifyEvent;
  [key: string]: unknown;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as KiwifyPayload;

    // 1. Security Check & Plan Identification
    const receivedToken =
      payload.token || new URL(req.url).searchParams.get("token");
    let planType: "PRO" | null = null;

    if (receivedToken === KIWIFY_WEBHOOK_TOKEN_PRO) {
      planType = "PRO";
    }

    if (!planType) {
      // Invalid or missing token
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // 2. Extract Data
    const email = payload.Customer?.email || payload.email;
    const event = payload.event;
    const payloadJson = payload as unknown as Prisma.InputJsonValue;

    if (!email) {
      // Log error but we can't associate with user yet
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
    const user = await prisma.user.findUnique({
      where: { email },
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

    const normalizedEvent = event?.toLowerCase() || "";

    if (
      normalizedEvent === "subscription_canceled" ||
      normalizedEvent === "subscription_late" ||
      normalizedEvent === "subscription_refunded" ||
      normalizedEvent === "chargeback"
    ) {
      // If they cancel ANY plan, we downgrade to FREE.
      // Logic: You can't be "partially" subscribed.
      // Exception: If they have overlapping subscriptions, this might be tricky,
      // but for now, simple logic: cancellation = free.
      newPlan = "FREE";
    } else if (
      normalizedEvent === "subscription_renewed" ||
      normalizedEvent === "order_approved"
    ) {
      // Grant the plan associated with the token
      newPlan = planType;
    }

    if (newPlan !== user.plan) {
      await prisma.user.update({
        where: { id: user.id },
        data: { plan: newPlan },
      });
    }

    // 5. Log Success
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
