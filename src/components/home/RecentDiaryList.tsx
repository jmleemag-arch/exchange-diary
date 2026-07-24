import { SectionTitle } from "@/components/common/SectionTitle";
import { SAMPLE_RECENT_DIARIES } from "@/data/home-sample";
import { ChevronRight, MessageCircle } from "lucide-react";

const toneClass = {
  sky: "bg-[#eef3f6]",
  sand: "bg-[#f3efe9]",
  sage: "bg-[#eef2ec]",
} as const;

export function RecentDiaryList() {
  return (
    <section className="rounded-[18px] border border-border bg-surface p-5 shadow-[var(--shadow)] sm:p-6">
      <SectionTitle
        action={
          <span
            className="text-xs font-medium text-text-muted"
            title="일기 목록은 아직 준비 중"
          >
            전체 보기
          </span>
        }
      >
        최근 일기
      </SectionTitle>

      <ul className="divide-y divide-border">
        {SAMPLE_RECENT_DIARIES.map((diary) => (
          <li key={diary.id}>
            <div className="group flex items-center gap-3.5 rounded-[14px] px-1 py-3.5 transition-colors hover:bg-surface-soft">
              <div
                aria-hidden
                className={`h-14 w-14 shrink-0 rounded-[14px] ${toneClass[diary.tone]}`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-medium text-text-primary">
                  {diary.preview}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
                  <span>{diary.author}</span>
                  <span>{diary.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                    {diary.commentCount}
                  </span>
                </div>
              </div>
              <ChevronRight
                className="h-4 w-4 shrink-0 text-text-muted"
                aria-hidden
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
