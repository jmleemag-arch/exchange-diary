import type { NotificationItem, NotificationType } from "@/data/notifications";
import { Bell, Heart, MessageCircle, Pencil } from "lucide-react";
import Image from "next/image";

const typeIcon: Record<
  NotificationType,
  { Icon: typeof Pencil; className: string }
> = {
  diary: {
    Icon: Pencil,
    className: "bg-accent text-white",
  },
  comment: {
    Icon: MessageCircle,
    className: "bg-[#f2a08e] text-white",
  },
  like: {
    Icon: Heart,
    className: "bg-[#ef7f8d] text-white",
  },
  system: {
    Icon: Bell,
    className: "bg-text-secondary text-white",
  },
};

type NotificationRowProps = {
  item: NotificationItem;
};

export function NotificationRow({ item }: NotificationRowProps) {
  const { Icon, className } = typeIcon[item.type];

  return (
    <article
      className={`flex items-start gap-3 border-b border-border px-3 py-4 last:border-b-0 sm:gap-4 sm:px-4 ${
        item.unread ? "bg-accent-soft/50" : "bg-surface"
      }`}
    >
      <div className="relative shrink-0">
        {item.actorAvatar ? (
          <Image
            src={item.actorAvatar}
            alt={item.actorName}
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-soft text-sm font-semibold text-text-secondary">
            알
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
        <span className="text-xs text-text-muted whitespace-nowrap">
          {item.timeLabel}
        </span>
        {item.unread ? (
          <span className="h-2 w-2 rounded-full bg-accent" aria-label="읽지 않음" />
        ) : (
          <span className="h-2 w-2" aria-hidden />
        )}
      </div>
    </article>
  );
}
