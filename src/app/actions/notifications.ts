"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/session";
import { NotificationType, Prisma } from "@prisma/client";

export type NotificationFilter =
  | "all"
  | "unread"
  | "comment"
  | "reply";

export async function getNotifications(filter: NotificationFilter = "all") {
  const user = await requireUser();
  const where: Prisma.NotificationWhereInput = {
    recipientId: user.id,
  };

  if (filter === "unread") where.readAt = null;
  if (filter === "comment") where.type = NotificationType.COMMENT;
  if (filter === "reply") where.type = NotificationType.REPLY;

  return prisma.notification.findMany({
    where,
    include: { actor: true, diary: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function markNotificationRead(id: string) {
  const user = await requireUser();
  const notification = await prisma.notification.findUnique({
    where: { id },
  });

  if (!notification || notification.recipientId !== user.id) {
    throw new Error("FORBIDDEN");
  }

  if (!notification.readAt) {
    await prisma.notification.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  revalidatePath("/notifications");

  if (notification.diaryId) {
    redirect(`/diaries/${notification.diaryId}`);
  }

  redirect("/notifications");
}

export async function markAllNotificationsRead() {
  const user = await requireUser();
  await prisma.notification.updateMany({
    where: { recipientId: user.id, readAt: null },
    data: { readAt: new Date() },
  });
  revalidatePath("/notifications");
}
