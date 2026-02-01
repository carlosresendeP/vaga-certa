import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const targetEmail = "carlosresende.paula@gmail.com";

  console.log(`\n1. Searching for user with email: ${targetEmail}`);
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: { equals: targetEmail, mode: "insensitive" } },
        { paymentEmail: { equals: targetEmail, mode: "insensitive" } },
      ],
    },
  });
  console.log("User found:", user || "NO USER FOUND");

  console.log("\n2. Fetching last 5 webhook logs...");
  const logs = await prisma.kiwifyWebhookLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  logs.forEach((log) => {
    console.log(`\nDate: ${log.createdAt.toISOString()}`);
    console.log(`Event: ${log.event}`);
    console.log(`Status: ${log.status}`);
    console.log(`Error: ${log.error}`);
    // console.log(`Payload: ${JSON.stringify(log.payload).substring(0, 100)}...`);
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
