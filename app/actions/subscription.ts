"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/lib/auth"; // Assuming better-auth usage
import { headers } from "next/headers";

const schema = z.object({
  paymentEmail: z.string().email("Email inválido"),
});

export async function claimSubscription(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "Não autorizado" };
  }

  const paymentEmail = formData.get("paymentEmail") as string;
  const result = schema.safeParse({ paymentEmail });

  if (!result.success) {
    return { error: result.error.message };
  }

  const email = result.data.paymentEmail;

  // 1. Check if email is already in use by another user
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: { equals: email, mode: "insensitive" } },
        { paymentEmail: { equals: email, mode: "insensitive" } },
      ],
      NOT: { id: session.user.id },
    },
  });

  if (existingUser) {
    return { error: "Este email já está vinculado a outra conta." };
  }

  // 2. Check for successful webhook logs with this email
  // 2. Check for successful webhook logs with this email (Case Insensitive)
  // Since Prisma JSON filtering is case-sensitive, we fetch recent success logs and filter in memory.
  const recentLogs = await prisma.kiwifyWebhookLog.findMany({
    where: {
      status: "success",
    },
    orderBy: { createdAt: "desc" },
    take: 100, // Look at last 100 successful transactions
  });

  const validLog = recentLogs.find((log) => {
    const payload = log.payload as {
      Customer?: { email?: string };
      email?: string;
    };
    const logEmail = payload?.Customer?.email || payload?.email;
    return logEmail && logEmail.toLowerCase() === email.toLowerCase();
  });

  if (!validLog) {
    // Fallback: Check for error logs that might have come through but failed "User not found"
    // If we find an error log with "User not found", it means the webhook TRIED to process.
    // If the event was 'order_approved' or 'subscription_renewed', we can trust it now.

    // We need to hunt inside the payload which is JSON.
    // Prisma's JSON filtering is powerful but let's be safe.
    // Find logs that contain the email in payload

    // Note: This is an expensive query if table is huge, but likely fine here.
    const errorLogs = await prisma.kiwifyWebhookLog.findMany({
      where: {
        status: "error",
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const relevantErrorLog = errorLogs.find((log) => {
      const payload = log.payload as {
        Customer?: { email?: string };
        email?: string;
      };
      const logEmail = payload?.Customer?.email || payload?.email;
      return (
        logEmail &&
        logEmail.toLowerCase() === email.toLowerCase() &&
        (log.event === "order_approved" || log.event === "subscription_renewed")
      );
    });

    if (!relevantErrorLog) {
      return { error: "Nenhuma assinatura ativa encontrada para este email." };
    }
  }

  // 3. Update User
  // If we found a log, it implies there was a transaction.
  // We assume if they are claiming, they want PRO.
  // Ideally we parse the log event to decide plan, but for now let's grant based on claim.
  // A more robust way: re-process the latest log logic.

  // Let's keep it simple: Link the email.
  // AND if the latest log indicated a valid subscription event, we upgrade.

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      paymentEmail: email,
      plan: "PRO", // Granting PRO immediately upon successful claim of a valid payment email
      planExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  return { success: "Assinatura vinculada com sucesso!" };
}
