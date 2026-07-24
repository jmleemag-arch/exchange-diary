"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LOGIN_KEYS, type LoginKey } from "@/lib/auth/constants";
import { createSession, destroySession } from "@/lib/auth/session";

export async function loginAs(loginKey: LoginKey) {
  if (!LOGIN_KEYS.includes(loginKey)) {
    throw new Error("Invalid login key");
  }

  const user = await prisma.user.findUnique({ where: { loginKey } });
  if (!user) {
    throw new Error("User not found. Run prisma db seed.");
  }

  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
