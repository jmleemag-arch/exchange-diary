"use client";

import { markAllNotificationsRead } from "@/app/actions/notifications";
import type { NotificationFilter } from "@/app/actions/notifications";
import { CheckCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const filters: { id: NotificationFilter; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "unread", label: "읽지 않음" },
  { id: "comment", label: "댓글" },
  { id: "reply", label: "답글" },
];

export function NotificationsToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = (searchParams.get("filter") as NotificationFilter) || "all";
  const [pending, startTransition] = useTransition();

  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => {
          const isActive = filter.id === active;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                if (filter.id === "all") params.delete("filter");
                else params.set("filter", filter.id);
                router.push(`/notifications?${params.toString()}`);
              }}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-accent-soft font-semibold text-accent"
                  : "bg-surface text-text-secondary hover:bg-surface-soft"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await markAllNotificationsRead();
            router.refresh();
          })
        }
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface"
      >
        <CheckCheck className="h-4 w-4" />
        모두 읽음
      </button>
    </div>
  );
}
