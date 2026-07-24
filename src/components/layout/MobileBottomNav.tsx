"use client";

import { Bell, List, Plus, Settings, SunMedium } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { id: "today", label: "오늘", href: "/", Icon: SunMedium },
  { id: "list", label: "목록", href: "/diaries", Icon: List },
  { id: "write", label: "작성", href: "/diaries/new", Icon: Plus, primary: true },
  {
    id: "notifications",
    label: "알림",
    href: "/notifications",
    Icon: Bell,
  },
  { id: "settings", label: "설정", href: "/settings", Icon: Settings },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md lg:hidden">
      <ul className="mx-auto flex max-w-md items-end justify-between">
        {items.map((item) => {
          const active =
            item.id === "today"
              ? pathname === "/"
              : item.id === "list"
                ? pathname.startsWith("/diaries") &&
                  !pathname.startsWith("/diaries/new")
                : item.id === "write"
                  ? pathname.startsWith("/diaries/new")
                  : item.id === "notifications"
                    ? pathname.startsWith("/notifications")
                    : item.id === "settings"
                      ? pathname.startsWith("/settings")
                      : false;

          if ("primary" in item && item.primary) {
            return (
              <li key={item.id} className="-mt-5">
                <Link
                  href={item.href}
                  aria-label="새 일기 쓰기"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_10px_24px_rgba(240,138,132,0.4)]"
                >
                  <item.Icon className="h-6 w-6" strokeWidth={2.3} />
                </Link>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`flex min-w-[56px] flex-col items-center gap-1 px-1 py-1 text-[11px] ${
                  active
                    ? "font-semibold text-accent"
                    : "font-medium text-text-muted"
                }`}
              >
                <item.Icon
                  className="h-5 w-5"
                  strokeWidth={active ? 2.2 : 1.8}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
