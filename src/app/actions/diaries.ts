"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/session";
import { makePreview, snippet, toEntryDate } from "@/lib/date";
import { DiaryStatus, NotificationType, Prisma } from "@prisma/client";

export async function saveDraft(content: string) {
  const user = await requireUser();
  const entryDate = toEntryDate();
  const trimmed = content.trim();
  if (!trimmed) {
    throw new Error("내용을 입력해 주세요.");
  }

  const existing = await prisma.diary.findUnique({
    where: {
      authorId_entryDate: { authorId: user.id, entryDate },
    },
  });

  if (existing?.status === DiaryStatus.PUBLISHED) {
    throw new Error("오늘은 이미 공개한 일기가 있어요. 수정 화면을 이용해 주세요.");
  }

  const diary = existing
    ? await prisma.diary.update({
        where: { id: existing.id },
        data: {
          content: trimmed,
          preview: makePreview(trimmed),
          status: DiaryStatus.DRAFT,
        },
      })
    : await prisma.diary.create({
        data: {
          authorId: user.id,
          content: trimmed,
          preview: makePreview(trimmed),
          entryDate,
          status: DiaryStatus.DRAFT,
        },
      });

  revalidatePath("/");
  revalidatePath("/diaries");
  revalidatePath("/diaries/new");
  return diary;
}

export async function publishDiary(content: string) {
  const user = await requireUser();
  const entryDate = toEntryDate();
  const trimmed = content.trim();
  if (!trimmed) {
    throw new Error("내용을 입력해 주세요.");
  }

  const existing = await prisma.diary.findUnique({
    where: {
      authorId_entryDate: { authorId: user.id, entryDate },
    },
  });

  if (existing?.status === DiaryStatus.PUBLISHED) {
    throw new Error("오늘은 이미 공개한 일기가 있어요. 수정 화면을 이용해 주세요.");
  }

  const preview = makePreview(trimmed);

  const diary = existing
    ? await prisma.diary.update({
        where: { id: existing.id },
        data: {
          content: trimmed,
          preview,
          status: DiaryStatus.PUBLISHED,
          publishedAt: new Date(),
        },
      })
    : await prisma.diary.create({
        data: {
          authorId: user.id,
          content: trimmed,
          preview,
          entryDate,
          status: DiaryStatus.PUBLISHED,
          publishedAt: new Date(),
        },
      });

  const partners = await prisma.user.findMany({
    where: {
      loginKey: { in: ["jimin", "minwoo"] },
      NOT: { id: user.id },
    },
    include: { preference: true },
  });

  for (const partner of partners) {
    if (partner.preference?.notifyDiary === false) continue;

    await prisma.notification.create({
      data: {
        recipientId: partner.id,
        actorId: user.id,
        type: NotificationType.DIARY_PUBLISHED,
        diaryId: diary.id,
        message: `${user.nickname}님이 새로운 일기를 작성했어요`,
        snippet: snippet(preview),
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/diaries");
  revalidatePath("/notifications");
  revalidatePath(`/diaries/${diary.id}`);
  redirect(`/diaries/${diary.id}`);
}

export async function updateDiary(diaryId: string, content: string) {
  const user = await requireUser();
  const trimmed = content.trim();
  if (!trimmed) {
    throw new Error("내용을 입력해 주세요.");
  }

  const diary = await prisma.diary.findUnique({ where: { id: diaryId } });
  if (!diary) throw new Error("일기를 찾을 수 없어요.");
  if (diary.authorId !== user.id) throw new Error("FORBIDDEN");

  await prisma.diary.update({
    where: { id: diaryId },
    data: {
      content: trimmed,
      preview: makePreview(trimmed),
      editedAt: new Date(),
    },
  });

  revalidatePath("/");
  revalidatePath("/diaries");
  revalidatePath(`/diaries/${diaryId}`);
  redirect(`/diaries/${diaryId}`);
}

export type DiaryListFilters = {
  authorId?: string;
  date?: string; // YYYY-MM-DD
  q?: string;
  page?: number;
  pageSize?: number;
};

export async function getDiaryList(filters: DiaryListFilters = {}) {
  await requireUser();
  const page = Math.max(filters.page ?? 1, 1);
  const pageSize = filters.pageSize ?? 10;
  const where: Prisma.DiaryWhereInput = {
    status: DiaryStatus.PUBLISHED,
  };

  if (filters.authorId) {
    where.authorId = filters.authorId;
  }

  if (filters.date) {
    const [y, m, d] = filters.date.split("-").map(Number);
    if (y && m && d) {
      where.entryDate = toEntryDate(new Date(y, m - 1, d));
    }
  }

  if (filters.q?.trim()) {
    where.content = { contains: filters.q.trim() };
  }

  const [total, items] = await Promise.all([
    prisma.diary.count({ where }),
    prisma.diary.findMany({
      where,
      include: {
        author: true,
        _count: { select: { comments: true } },
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(Math.ceil(total / pageSize), 1),
  };
}

export async function getDiaryForViewer(diaryId: string) {
  const user = await requireUser();
  const diary = await prisma.diary.findUnique({
    where: { id: diaryId },
    include: {
      author: true,
      comments: {
        where: { parentId: null },
        include: {
          author: true,
          replies: {
            include: { author: true },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      _count: { select: { comments: true } },
    },
  });

  if (!diary) return null;

  if (
    diary.status === DiaryStatus.DRAFT &&
    diary.authorId !== user.id
  ) {
    return null;
  }

  return { diary, currentUser: user };
}

export async function getTodayWritingStatus() {
  await requireUser();
  const entryDate = toEntryDate();
  const users = await prisma.user.findMany({
    where: { loginKey: { in: ["jimin", "minwoo"] } },
    orderBy: { loginKey: "asc" },
  });

  const diaries = await prisma.diary.findMany({
    where: {
      entryDate,
      authorId: { in: users.map((u) => u.id) },
    },
  });

  return users.map((user) => {
    const diary = diaries.find((d) => d.authorId === user.id);
    let statusLabel = "아직 작성 전";
    if (diary?.status === DiaryStatus.PUBLISHED) statusLabel = "작성 완료";
    else if (diary?.status === DiaryStatus.DRAFT) statusLabel = "작성 중";
    return { user, diary, statusLabel };
  });
}

export async function getRecentPublishedDiaries(limit = 5) {
  await requireUser();
  return prisma.diary.findMany({
    where: { status: DiaryStatus.PUBLISHED },
    include: {
      author: true,
      _count: { select: { comments: true } },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: limit,
  });
}

export async function getPublishedDatesInMonth(year: number, month: number) {
  await requireUser();
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1));

  const diaries = await prisma.diary.findMany({
    where: {
      status: DiaryStatus.PUBLISHED,
      entryDate: { gte: start, lt: end },
    },
    select: { entryDate: true },
  });

  return Array.from(
    new Set(diaries.map((d) => d.entryDate.getUTCDate())),
  );
}

export async function getTodayDiaryForCurrentUser() {
  const user = await requireUser();
  const entryDate = toEntryDate();
  return prisma.diary.findUnique({
    where: {
      authorId_entryDate: { authorId: user.id, entryDate },
    },
  });
}
