import { loginAs } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import type { LoginKey } from "@/lib/auth/constants";
import { Heart } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const users = await prisma.user.findMany({
    where: { loginKey: { in: ["jimin", "minwoo"] } },
    orderBy: { loginKey: "asc" },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-lg rounded-[24px] border border-border bg-surface p-8 shadow-[var(--shadow)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
            <Heart className="h-5 w-5 fill-accent text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">
            우리의 교환일기
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            사용할 사람을 선택해 시작해요. (로컬 MVP · 비밀번호 없음)
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {users.map((user) => (
            <form
              key={user.id}
              action={async () => {
                "use server";
                await loginAs(user.loginKey as LoginKey);
              }}
            >
              <button
                type="submit"
                className="flex w-full flex-col items-center gap-3 rounded-[18px] border border-border bg-surface-soft px-4 py-6 text-center transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
              >
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.nickname}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-accent-soft text-xl font-semibold text-accent">
                    {user.nickname.slice(0, 1)}
                  </span>
                )}
                <span className="text-base font-semibold text-text-primary">
                  {user.nickname}
                </span>
                <span className="text-xs text-text-muted">이 계정으로 입장</span>
              </button>
            </form>
          ))}
        </div>
      </div>
    </main>
  );
}
