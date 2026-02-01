import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "carlosresende.paula@gmail.com";
  console.log(`Setting plan to FREE for ${email}...`);

  const user = await prisma.user.update({
    where: { email },
    data: {
      plan: "FREE",
      planExpiresAt: null,
    },
  });

  console.log("User updated:", user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
