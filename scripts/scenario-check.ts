import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

async function main() {
  const users = await p.user.findMany({
    select: { loginKey: true, nickname: true },
  });
  console.log("users", users);

  const j = await p.user.findUniqueOrThrow({ where: { loginKey: "jimin" } });
  const m = await p.user.findUniqueOrThrow({ where: { loginKey: "minwoo" } });
  const now = new Date();
  const entryDate = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
  );

  const diary = await p.diary.upsert({
    where: { authorId_entryDate: { authorId: j.id, entryDate } },
    update: {
      content: "오늘 바다가 정말 예뻤어",
      preview: "오늘 바다가 정말 예뻤어",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    create: {
      authorId: j.id,
      content: "오늘 바다가 정말 예뻤어",
      preview: "오늘 바다가 정말 예뻤어",
      entryDate,
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  const existingComment = await p.comment.findFirst({
    where: { diaryId: diary.id, authorId: m.id, parentId: null },
  });

  const comment =
    existingComment ??
    (await p.comment.create({
      data: {
        diaryId: diary.id,
        authorId: m.id,
        content: "그 풍경 좋았겠다!",
      },
    }));

  const existingNotif = await p.notification.findFirst({
    where: {
      recipientId: j.id,
      commentId: comment.id,
      type: "COMMENT",
    },
  });

  if (!existingNotif) {
    await p.notification.create({
      data: {
        recipientId: j.id,
        actorId: m.id,
        type: "COMMENT",
        diaryId: diary.id,
        commentId: comment.id,
        message: `${m.nickname}님이 회원님의 일기에 댓글을 남겼어요`,
        snippet: "그 풍경 좋았겠다!",
      },
    });
  }

  console.log("scenario ok", {
    diaryId: diary.id,
    notifications: await p.notification.count({
      where: { recipientId: j.id },
    }),
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await p.$disconnect();
  });
