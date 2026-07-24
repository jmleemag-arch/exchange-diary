import { markNotificationRead } from "@/app/actions/notifications";
import { formatRelativeTime } from "@/lib/date";
import type { NotificationType } from "@prisma/client";
import { Heart, MessageCircle, Pencil, BookOpen } from "lucide-react";
import Image from "next/image";

const typeIcon: Record<
  NotificationType,
  { Icon: typeof Pencil; className: string }
> = {
  COMMENT: {
    Icon: MessageCircle,
    className: "bg-[#f2a08e] text-white",
  },
  REPLY: {
    Icon: Heart,
    className: "bg-[#ef7f8d] text-white",
  },
  DIARY_PUBLISHED: {
    Icon: BookOpen,
    className: "bg-accent text-white",
  },
};

type Item = {
  id: string;
  type: NotificationType;
  message: string;
  snippet: string | null;
  createdAt: Date;
  readAt: Date | null;
  actor: { nickname: string; avatarUrl: string | null } | null;
};

export function NotificationRow({ item }: { item: Item }) {
  const { Icon, className } = typeIcon[item.type];
  const unread = !item.readAt;

  return (
    <form action={markNotificationRead.bind(null, item.id)}>
      <button
        type="submit"
        className={`flex w-full items-start gap-3 border-b border-border px-3 py-4 text-left last:border-b-0 sm:gap-4 sm:px-4 ${
          unread ? "bg-accent-soft/50" : "bg-surface"
        }`}
      >
        <div className="relative shrink-0">
          {item.actor?.avatarUrl ? (
            <Image
              src={item.actor.avatarUrl}
              alt={item.actor.nickname}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-sm font-semibold text-text-secondary">
              {item.actor?.nickname.slice(0, 1) ?? "알"}
            </span>
          )}
          <span
            className={`absolute -right-0.5 -bottom-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full ring-2 ring-white ${className}`}
          >
            <Icon className="h-2.5 w-2.5" strokeWidth={2.4} />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold leading-snug text-text-primary sm:text-[15px]">
            {item.message}
          </p>
          {item.snippet ? (
            <p className="mt-1 truncate text-[13px] text-text-secondary">
              “{item.snippet}”
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 pt-0.5">
          <span className="text-xs whitespace-nowrap text-text-muted">
            {formatRelativeTime(new Date(item.createdAt))}
          </span>
          {unread ? (
            <span className="h-2 w-2 rounded-full bg-accent" aria-label="읽지 않음" />
          ) : (
            <span className="h-2 w-2" aria-hidden />
          )}
        </div>
      </button>
    </form>
  );
}
