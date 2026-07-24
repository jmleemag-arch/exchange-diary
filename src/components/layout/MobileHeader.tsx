"use client";

import { currentUser } from "@/data/home";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/80 bg-background/90 px-4 py-3 backdrop-blur-md lg:hidden">
      <button
        type="button"
        aria-label="메뉴"
        className="flex h-10 w-10 items-center justify-center rounded-full text-text-primary"
      >
        <Menu className="h-5 w-5" />
      </button>
      <p className="text-[15px] font-semibold text-text-primary">
        우리의 교환일기
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="알림"
          className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary"
        >
          <Bell className="h-5 w-5" />
        </button>
        <Image
          src={currentUser.avatar}
          alt={currentUser.name}
          width={34}
          height={34}
          className="h-[34px] w-[34px] rounded-full object-cover"
        />
      </div>
    </header>
  );
}
