import { prisma } from "../lib/prisma";

async function main() {
  console.log("Checking recent Kiwify Webhook logs for errors...");

  const logs = await prisma.kiwifyWebhookLog.findMany({
    where: {
      status: "error",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  if (logs.length === 0) {
    console.log("No error logs found.");
  } else {
    console.log(`Found ${logs.length} error logs:`);
    logs.forEach((log) => {
      console.log("---------------------------------------------------");
      console.log(`ID: ${log.id}`);
      console.log(`Event: ${log.event}`);
      console.log(`Status: ${log.status}`);
      console.log(`Error: ${log.error}`);
      console.log(`Created At: ${log.createdAt}`);
      console.log(`Payload: ${JSON.stringify(log.payload, null, 2)}`);
    });
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
