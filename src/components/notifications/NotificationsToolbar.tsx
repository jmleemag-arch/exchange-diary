"use client";

import {
  notificationFilters,
  type NotificationFilter,
} from "@/data/notifications";
import { CheckCheck, MoreVertical } from "lucide-react";

type NotificationsToolbarProps = {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
};

export function NotificationsToolbar({
  activeFilter,
  onFilterChange,
}: NotificationsToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {notificationFilters.map((filter) => {
          const active = filter.id === activeFilter;
          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                active
                  ? "bg-accent-soft font-semibold text-accent"
                  : "bg-surface text-text-secondary hover:bg-surface-soft"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-1 self-end lg:self-auto">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-surface"
        >
          <CheckCheck className="h-4 w-4" />
          모두 읽음
        </button>
        <button
          type="button"
          aria-label="더보기"
          className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted hover:bg-surface"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
