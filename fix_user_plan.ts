import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "carlosresende.paula@gmail.com";
  console.log(`Checking user status for ${email}...`);

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: { equals: email, mode: "insensitive" } },
        { paymentEmail: { equals: email, mode: "insensitive" } },
      ],
    },
  });

  if (user) {
    console.log("User found:", user);
  } else {
    console.log("User not found.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
