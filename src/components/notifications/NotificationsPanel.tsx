"use client";

import { NotificationRow } from "@/components/notifications/NotificationRow";
import { NotificationsToolbar } from "@/components/notifications/NotificationsToolbar";
import {
  notifications,
  type NotificationFilter,
} from "@/data/notifications";
import { useMemo, useState } from "react";

export function NotificationsPanel() {
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter((item) => item.unread);
    return notifications.filter((item) => item.type === filter);
  }, [filter]);

  return (
    <div>
      <NotificationsToolbar
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <section className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-sm)]">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <NotificationRow key={item.id} item={item} />
          ))
        ) : (
          <p className="px-4 py-10 text-center text-sm text-text-muted">
            해당 조건의 알림이 없어요.
          </p>
        )}
      </section>

      <p className="mt-6 text-center text-sm text-text-muted">
        마지막 알림이에요. 더 이상 알림이 없어요.{" "}
        <span aria-hidden>❤️</span>
      </p>
    </div>
  );
}
