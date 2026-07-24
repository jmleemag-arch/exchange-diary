import { diaryListEntries } from "@/data/diaries";
import { ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DiaryListFeed() {
  return (
    <div className="space-y-3">
      {diaryListEntries.map((entry) => (
        <Link
          key={entry.id}
          href="#"
          className="flex items-center gap-4 rounded-[20px] border border-border bg-surface p-3.5 shadow-[var(--shadow-sm)] transition-colors hover:bg-surface-soft sm:gap-5 sm:p-4"
        >
          <Image
            src={entry.thumbnail}
            alt=""
            width={112}
            height={84}
            className="h-[72px] w-[96px] shrink-0 rounded-[14px] object-cover sm:h-[84px] sm:w-[112px]"
          />

          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <Image
                src={entry.author.avatar}
                alt={entry.author.name}
                width={22}
                height={22}
                className="h-[22px] w-[22px] rounded-full object-cover"
              />
              <span className="text-xs font-semibold text-text-primary">
                {entry.author.name}
              </span>
              <span className="text-xs text-text-muted">{entry.date}</span>
            </div>

            <p className="truncate text-[15px] font-semibold text-text-primary sm:text-[16px]">
              {entry.title}
            </p>
            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-text-secondary">
              {entry.preview}
            </p>
          </div>

          <div className="hidden shrink-0 flex-col items-end gap-3 sm:flex">
            <span className="inline-flex items-center gap-1 text-xs text-text-muted">
              <MessageCircle className="h-3.5 w-3.5" />
              {entry.comments}
            </span>
            <ChevronRight className="h-4 w-4 text-text-muted" />
          </div>
        </Link>
      ))}
    </div>
  );
}
