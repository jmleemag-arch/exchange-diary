"use client";

import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type MobileHeaderProps = {
  nickname: string;
  avatarUrl: string | null;
};

export function MobileHeader({ nickname, avatarUrl }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/80 bg-background/90 px-4 py-3 backdrop-blur-md lg:hidden">
      <span className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted">
        <Menu className="h-5 w-5" aria-hidden />
      </span>
      <p className="text-[15px] font-semibold text-text-primary">
        우리의 교환일기
      </p>
      <div className="flex items-center gap-2">
        <Link
          href="/notifications"
          aria-label="알림"
          className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary"
        >
          <Bell className="h-5 w-5" />
        </Link>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={nickname}
            width={34}
            height={34}
            className="h-[34px] w-[34px] rounded-full object-cover"
          />
        ) : (
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
            {nickname.slice(0, 1) || "?"}
          </span>
        )}
      </div>
    </header>
  );
}
