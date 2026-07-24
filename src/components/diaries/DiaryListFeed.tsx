import { formatEntryDate } from "@/lib/date";
import { ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type DiaryItem = {
  id: string;
  preview: string;
  content: string;
  entryDate: Date;
  editedAt: Date | null;
  author: {
    nickname: string;
    avatarUrl: string | null;
  };
  _count: { comments: number };
};

export function DiaryListFeed({ items }: { items: DiaryItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-[20px] border border-border bg-surface px-4 py-12 text-center text-sm text-text-muted shadow-[var(--shadow-sm)]">
        조건에 맞는 일기가 없어요.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((entry) => (
        <Link
          key={entry.id}
          href={`/diaries/${entry.id}`}
          className="flex items-center gap-4 rounded-[20px] border border-border bg-surface p-3.5 shadow-[var(--shadow-sm)] transition-colors hover:bg-surface-soft sm:gap-5 sm:p-4"
        >
          <div className="flex h-[72px] w-[96px] shrink-0 items-center justify-center rounded-[14px] bg-surface-soft text-lg font-semibold text-accent sm:h-[84px] sm:w-[112px]">
            {entry.author.nickname.slice(0, 1)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              {entry.author.avatarUrl ? (
                <Image
                  src={entry.author.avatarUrl}
                  alt={entry.author.nickname}
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] rounded-full object-cover"
                />
              ) : null}
              <span className="text-xs font-semibold text-text-primary">
                {entry.author.nickname}
              </span>
              <span className="text-xs text-text-muted">
                {formatEntryDate(entry.entryDate)}
                {entry.editedAt ? " · 수정됨" : ""}
              </span>
            </div>

            <p className="truncate text-[15px] font-semibold text-text-primary sm:text-[16px]">
              {entry.preview}
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-text-secondary">
              {entry.content}
            </p>
          </div>

          <div className="hidden shrink-0 flex-col items-end gap-3 sm:flex">
            <span className="inline-flex items-center gap-1 text-xs text-text-muted">
              <MessageCircle className="h-3.5 w-3.5" />
              {entry._count.comments}
            </span>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </div>
        </Link>
      ))}
    </div>
  );
}
