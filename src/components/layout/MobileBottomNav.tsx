"use client";

import { Bell, List, Plus, Settings, SunMedium } from "lucide-react";
import Link from "next/link";

const items = [
  { id: "today", label: "오늘", href: "/", Icon: SunMedium, enabled: true },
  { id: "list", label: "목록", href: "#", Icon: List, enabled: false },
  {
    id: "write",
    label: "작성",
    href: "#",
    Icon: Plus,
    enabled: false,
    primary: true,
  },
  {
    id: "notifications",
    label: "알림",
    href: "#",
    Icon: Bell,
    enabled: false,
  },
  {
    id: "settings",
    label: "설정",
    href: "#",
    Icon: Settings,
    enabled: false,
  },
] as const;

export function MobileBottomNav() {
  return (
    <nav
      aria-label="하단 내비게이션"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-sm lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-end justify-between">
        {items.map((item) => {
          const active = item.id === "today";

          if ("primary" in item && item.primary) {
            return (
              <li key={item.id} className="-mt-4">
                <button
                  type="button"
                  aria-label="새 일기 쓰기"
                  disabled
                  title="일기 작성은 아직 준비 중"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white opacity-80"
                >
                  <item.Icon className="h-6 w-6" strokeWidth={2.2} />
                </button>
              </li>
            );
          }

          if (!item.enabled) {
            return (
              <li key={item.id}>
                <button
                  type="button"
                  disabled
                  aria-label={item.label}
                  title="아직 준비 중"
                  className="flex min-h-11 min-w-[56px] flex-col items-center justify-center gap-1 px-1 text-[11px] text-text-muted"
                >
                  <item.Icon className="h-5 w-5" strokeWidth={1.8} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`flex min-h-11 min-w-[56px] flex-col items-center justify-center gap-1 px-1 text-[11px] ${
                  active
                    ? "font-semibold text-accent"
                    : "font-medium text-text-muted"
                }`}
              >
                <item.Icon
                  className="h-5 w-5"
                  strokeWidth={active ? 2.1 : 1.8}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
