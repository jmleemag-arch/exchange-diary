import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.systemCheck.findFirst({
    where: {
      message: "Prisma SQLite connection successful",
    },
  });

  if (existing) {
    console.log("SystemCheck seed already present. Skipping create.");
    return;
  }

  const created = await prisma.systemCheck.create({
    data: {
      message: "Prisma SQLite connection successful",
    },
  });

  console.log("SystemCheck seed created:", created);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
