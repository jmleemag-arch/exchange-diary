import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const systemCheck = await prisma.systemCheck.findFirst({
    where: { message: "Prisma SQLite connection successful" },
  });

  if (!systemCheck) {
    await prisma.systemCheck.create({
      data: { message: "Prisma SQLite connection successful" },
    });
  }

  const jimin = await prisma.user.upsert({
    where: { loginKey: "jimin" },
    update: {
      nickname: "지민",
      email: "jimin@example.com",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces",
    },
    create: {
      loginKey: "jimin",
      nickname: "지민",
      email: "jimin@example.com",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces",
      preference: { create: {} },
    },
  });

  const minwoo = await prisma.user.upsert({
    where: { loginKey: "minwoo" },
    update: {
      nickname: "민우",
      email: "minwoo@example.com",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
    },
    create: {
      loginKey: "minwoo",
      nickname: "민우",
      email: "minwoo@example.com",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
      preference: { create: {} },
    },
  });

  await prisma.userPreference.upsert({
    where: { userId: jimin.id },
    update: {},
    create: { userId: jimin.id },
  });

  await prisma.userPreference.upsert({
    where: { userId: minwoo.id },
    update: {},
    create: { userId: minwoo.id },
  });

  await prisma.coupleSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      pairNickname: "지민이와 민우",
      anniversary: new Date("2024-11-20T00:00:00.000Z"),
      startedAt: new Date("2025-03-18T00:00:00.000Z"),
    },
  });

  const questionPool = [
    "요즘 가장 감사했던 일은 무엇인가요?",
    "오늘 가장 마음이 따뜻해진 순간은 언제였나요?",
    "최근에 서로를 떠올리게 한 작은 일은 무엇인가요?",
    "오늘 하루를 한 문장으로 남긴다면 무엇일까요?",
    "지금 가장 듣고 싶은 말은 무엇인가요?",
    "이번 주에 함께 하고 싶은 일은 무엇인가요?",
    "오늘 나를 웃게 만든 일은 무엇이었나요?",
  ];

  const today = new Date();
  for (let offset = -3; offset <= 7; offset += 1) {
    const local = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + offset,
    );
    const date = new Date(
      Date.UTC(local.getFullYear(), local.getMonth(), local.getDate()),
    );
    const content =
      questionPool[(offset + 3) % questionPool.length] ?? questionPool[0];

    await prisma.dailyQuestion.upsert({
      where: { date },
      update: { content },
      create: { date, content },
    });
  }

  console.log("Seed complete:", {
    jimin: jimin.nickname,
    minwoo: minwoo.nickname,
    questions: await prisma.dailyQuestion.count(),
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
