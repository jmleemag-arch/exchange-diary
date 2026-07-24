import { getRecentPublishedDiaries } from "@/app/actions/diaries";
import { formatEntryDate } from "@/lib/date";
import { ChevronRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export async function RecentDiaryList() {
  const diaries = await getRecentPublishedDiaries(5);

  return (
    <section className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[17px] font-semibold text-text-primary">
          최근 일기
        </h2>
        <Link href="/diaries" className="text-xs font-medium text-text-muted hover:text-accent">
          전체 보기
        </Link>
      </div>

      {diaries.length === 0 ? (
        <p className="py-6 text-center text-sm text-text-muted">
          아직 공개된 일기가 없어요.
        </p>
      ) : (
        <ul>
          {diaries.map((diary) => (
            <li key={diary.id} className="border-b border-border last:border-b-0">
              <Link
                href={`/diaries/${diary.id}`}
                className="flex items-center gap-3.5 py-3.5 transition-colors hover:bg-surface-soft"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-surface-soft text-sm font-semibold text-accent">
                  {diary.author.nickname.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-text-primary">
                    {diary.preview}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-text-muted">
                    <span>{diary.author.nickname}</span>
                    <span>{formatEntryDate(diary.entryDate)}</span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {diary._count.comments}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
