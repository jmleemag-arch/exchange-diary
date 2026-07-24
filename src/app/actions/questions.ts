"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/session";
import { toEntryDate } from "@/lib/date";

export async function getTodayQuestion() {
  await requireUser();
  const date = toEntryDate();

  return prisma.dailyQuestion.findUnique({
    where: { date },
  });
}

export async function getQuestionForDate(date: Date) {
  await requireUser();
  return prisma.dailyQuestion.findUnique({
    where: { date: toEntryDate(date) },
  });
}
