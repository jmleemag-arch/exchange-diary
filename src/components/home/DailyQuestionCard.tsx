import { SAMPLE_TODAY_QUESTION } from "@/data/home-sample";
import { Leaf } from "lucide-react";

export function DailyQuestionCard() {
  return (
    <section className="relative overflow-hidden rounded-[18px] border border-border bg-surface p-5 shadow-[var(--shadow)]">
      <Leaf
        className="pointer-events-none absolute -right-1 top-2 h-14 w-14 text-accent/10"
        aria-hidden
      />
      <p className="text-xs font-semibold tracking-wide text-accent">
        오늘의 공통 질문
      </p>
      <p className="mt-3 text-[15px] font-medium leading-relaxed text-text-primary">
        {SAMPLE_TODAY_QUESTION}
      </p>
      <button
        type="button"
        disabled
        title="일기 작성은 아직 준비 중"
        className="mt-5 inline-flex rounded-[12px] bg-accent-soft px-4 py-2.5 text-sm font-semibold text-accent opacity-80"
      >
        이 질문으로 쓰기
      </button>
    </section>
  );
}
