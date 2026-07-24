import { getCurrentUser } from "@/lib/auth/session";
import { Bell, ChevronDown, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function HomeHeader() {
  const user = await getCurrentUser();

  return (
    <header className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-[28px] font-bold tracking-tight text-text-primary sm:text-[30px]">
          오늘의 교환일기
          <Sun className="h-6 w-6 text-[#f0b45a]" aria-hidden />
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">
          매일 서로의 하루를 나누며 더 가까워져요.
          {user ? ` · ${user.nickname}` : ""}
        </p>
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <Link
          href="/notifications"
          aria-label="알림"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text-secondary shadow-[var(--shadow-sm)]"
        >
          <Bell className="h-[18px] w-[18px]" />
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 shadow-[var(--shadow-sm)]"
        >
          {user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.nickname}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : null}
          <span className="text-sm font-medium text-text-primary">
            {user?.nickname}
          </span>
          <ChevronDown className="h-4 w-4 text-text-muted" />
        </Link>
      </div>
    </header>
  );
}
