import "dotenv/config";
import { prisma } from "../lib/prisma";
import { getAndCheckUserUsage } from "../lib/usage";

async function main() {
  console.log("Starting Usage Reset Verification...");

  // 1. Setup Test User
  const testEmail = "test_usage_reset@example.com";
  let user = await prisma.user.findUnique({ where: { email: testEmail } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: testEmail,
        name: "Test Usage User",
      },
    });
  }

  // 2. Test Case: Different Month (Should Reset)
  console.log("\n[Test 1] Setting lastReset to last month...");
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  await prisma.userUsage.upsert({
    where: { userId: user.id },
    update: {
      resumeUploads: 10,
      lastReset: lastMonth,
    },
    create: {
      userId: user.id,
      resumeUploads: 10,
      lastReset: lastMonth,
    },
  });

  let usage = await getAndCheckUserUsage(user.id);
  console.log("Usage after check (Expect 0):", usage?.resumeUploads);

  if (usage?.resumeUploads === 0) {
    console.log("✅ Passed: Usage reset correctly.");
  } else {
    console.error("❌ Failed: Usage did not reset.");
  }

  // 3. Test Case: Same Month (Should Preserve)
  console.log("\n[Test 2] Setting usage to 5, lastReset to today...");
  await prisma.userUsage.update({
    where: { userId: user.id },
    data: {
      resumeUploads: 5,
      lastReset: new Date(),
    },
  });

  usage = await getAndCheckUserUsage(user.id);
  console.log("Usage after check (Expect 5):", usage?.resumeUploads);

  if (usage?.resumeUploads === 5) {
    console.log("✅ Passed: Usage preserved correctly.");
  } else {
    console.error("❌ Failed: Usage was incorrectly reset.");
  }

  // Cleanup
  await prisma.userUsage.delete({ where: { userId: user.id } });
  await prisma.user.delete({ where: { id: user.id } });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
