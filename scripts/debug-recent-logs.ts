import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("Fetching logs with empty event...");

  // Fetch logs that are success but might have weird event data
  const logs = await prisma.kiwifyWebhookLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  for (const log of logs) {
    if (!log.event || log.event.trim() === "") {
      console.log("Found log with empty event:");
      console.log(JSON.stringify(log.payload, null, 2));
      break; // Only start with one
    } else {
      console.log(`Log ${log.id} has event: ${log.event}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
