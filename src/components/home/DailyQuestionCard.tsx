import { todayQuestion } from "@/data/home";
import { Leaf } from "lucide-react";
import Link from "next/link";

type DailyQuestionCardProps = {
  actionLabel?: string;
};

export function DailyQuestionCard({
  actionLabel = "답변 보기",
}: DailyQuestionCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)]">
      <Leaf className="pointer-events-none absolute -right-1 top-3 h-16 w-16 text-accent/15" />
      <Leaf className="pointer-events-none absolute bottom-3 right-10 h-10 w-10 -rotate-12 text-accent/10" />

      <p className="text-xs font-semibold tracking-wide text-accent">
        오늘의 공통 질문
      </p>
      <p className="mt-1 text-2xl leading-none text-text-muted/40">&ldquo;</p>
      <p className="-mt-2 text-[15px] font-medium leading-relaxed text-text-primary">
        {todayQuestion}
      </p>
      <Link
        href="#"
        className="mt-5 inline-flex rounded-xl bg-accent-soft px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-[#fadeda]"
      >
        {actionLabel}
      </Link>
    </section>
  );
}
