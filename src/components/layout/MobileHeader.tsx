"use client";

import { Avatar } from "@/components/common/Avatar";
import { Bell, Menu } from "lucide-react";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm lg:hidden">
      <button
        type="button"
        aria-label="메뉴 열기"
        className="flex h-11 w-11 items-center justify-center rounded-[12px] text-text-primary"
        disabled
        title="메뉴는 아직 준비 중"
      >
        <Menu className="h-5 w-5" />
      </button>

      <p className="text-[15px] font-semibold tracking-tight text-text-primary">
        우리의 교환일기
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="알림"
          className="flex h-11 w-11 items-center justify-center rounded-[12px] text-text-secondary"
          disabled
          title="알림은 아직 준비 중"
        >
          <Bell className="h-5 w-5" />
        </button>
        <Avatar initials="지" alt="내 프로필" size="sm" tone="coral" />
      </div>
    </header>
  );
}
