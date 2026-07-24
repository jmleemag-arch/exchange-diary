"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/session";

export async function updateNickname(nickname: string) {
  const user = await requireUser();
  const trimmed = nickname.trim();
  if (!trimmed) throw new Error("닉네임을 입력해 주세요.");

  await prisma.user.update({
    where: { id: user.id },
    data: { nickname: trimmed },
  });

  revalidatePath("/settings");
  revalidatePath("/");
}

export async function updateCoupleSettings(input: {
  pairNickname: string;
  anniversary: string;
}) {
  await requireUser();
  const pairNickname = input.pairNickname.trim();
  if (!pairNickname) throw new Error("우리의 별명을 입력해 주세요.");

  const anniversary = new Date(`${input.anniversary}T00:00:00.000Z`);
  if (Number.isNaN(anniversary.getTime())) {
    throw new Error("기념일 형식이 올바르지 않아요.");
  }

  await prisma.coupleSettings.upsert({
    where: { id: 1 },
    update: { pairNickname, anniversary },
    create: {
      id: 1,
      pairNickname,
      anniversary,
      startedAt: anniversary,
    },
  });

  revalidatePath("/settings");
  revalidatePath("/");
}

export async function updatePreferences(input: {
  notifyDiary: boolean;
  notifyComment: boolean;
}) {
  const user = await requireUser();
  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {
      notifyDiary: input.notifyDiary,
      notifyComment: input.notifyComment,
    },
    create: {
      userId: user.id,
      notifyDiary: input.notifyDiary,
      notifyComment: input.notifyComment,
    },
  });
  revalidatePath("/settings");
}
