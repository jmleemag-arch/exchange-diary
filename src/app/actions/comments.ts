"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/session";
import { snippet } from "@/lib/date";
import { DiaryStatus, NotificationType } from "@prisma/client";

export async function createComment(diaryId: string, content: string) {
  const user = await requireUser();
  const trimmed = content.trim();
  if (!trimmed) throw new Error("댓글 내용을 입력해 주세요.");

  const diary = await prisma.diary.findUnique({ where: { id: diaryId } });
  if (!diary || diary.status !== DiaryStatus.PUBLISHED) {
    throw new Error("공개된 일기에만 댓글을 남길 수 있어요.");
  }

  const comment = await prisma.comment.create({
    data: {
      diaryId,
      authorId: user.id,
      content: trimmed,
    },
  });

  if (diary.authorId !== user.id) {
    const pref = await prisma.userPreference.findUnique({
      where: { userId: diary.authorId },
    });
    if (pref?.notifyComment !== false) {
      await prisma.notification.create({
        data: {
          recipientId: diary.authorId,
          actorId: user.id,
          type: NotificationType.COMMENT,
          diaryId,
          commentId: comment.id,
          message: `${user.nickname}님이 회원님의 일기에 댓글을 남겼어요`,
          snippet: snippet(trimmed),
        },
      });
    }
  }

  revalidatePath(`/diaries/${diaryId}`);
  revalidatePath("/notifications");
  revalidatePath("/");
  revalidatePath("/diaries");
  return comment;
}

export async function createReply(
  diaryId: string,
  parentId: string,
  content: string,
) {
  const user = await requireUser();
  const trimmed = content.trim();
  if (!trimmed) throw new Error("답글 내용을 입력해 주세요.");

  const diary = await prisma.diary.findUnique({ where: { id: diaryId } });
  if (!diary || diary.status !== DiaryStatus.PUBLISHED) {
    throw new Error("공개된 일기에만 답글을 남길 수 있어요.");
  }

  const parent = await prisma.comment.findUnique({ where: { id: parentId } });
  if (!parent || parent.diaryId !== diaryId) {
    throw new Error("원댓글을 찾을 수 없어요.");
  }
  if (parent.parentId) {
    throw new Error("답글에는 다시 답글을 달 수 없어요.");
  }

  const reply = await prisma.comment.create({
    data: {
      diaryId,
      authorId: user.id,
      parentId,
      content: trimmed,
    },
  });

  if (parent.authorId !== user.id) {
    const pref = await prisma.userPreference.findUnique({
      where: { userId: parent.authorId },
    });
    if (pref?.notifyComment !== false) {
      await prisma.notification.create({
        data: {
          recipientId: parent.authorId,
          actorId: user.id,
          type: NotificationType.REPLY,
          diaryId,
          commentId: reply.id,
          message: `${user.nickname}님이 회원님의 댓글에 답글을 남겼어요`,
          snippet: snippet(trimmed),
        },
      });
    }
  }

  revalidatePath(`/diaries/${diaryId}`);
  revalidatePath("/notifications");
  return reply;
}
