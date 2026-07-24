import { Avatar } from "@/components/common/Avatar";
import { SectionTitle } from "@/components/common/SectionTitle";
import type { SampleWriterStatus } from "@/data/home-sample";
import { SAMPLE_WRITERS } from "@/data/home-sample";
import { Check } from "lucide-react";

function WriterStatus({
  nickname,
  initials,
  status,
  tone,
}: {
  nickname: string;
  initials: string;
  status: SampleWriterStatus;
  tone: "coral" | "beige";
}) {
  const done = status === "작성 완료";

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <div className="relative shrink-0">
        <Avatar
          initials={initials}
          alt={`${nickname} 프로필`}
          size="lg"
          tone={tone}
        />
        {done ? (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-success text-white ring-2 ring-surface">
            <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
          </span>
        ) : null}
      </div>
      <div className="min-w-0">
        <p className="truncate text-[15px] font-semibold text-text-primary">
          {nickname}
        </p>
        <p
          className={`text-xs font-medium ${
            done ? "text-success" : "text-text-muted"
          }`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}

type WritingStatusCardProps = {
  todayLabel?: string;
};

export function WritingStatusCard({
  todayLabel = "2025.07.24",
}: WritingStatusCardProps) {
  return (
    <section className="rounded-[18px] border border-border bg-surface p-5 shadow-[var(--shadow)] sm:p-6">
      <SectionTitle>오늘의 작성 현황</SectionTitle>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <WriterStatus
          nickname={SAMPLE_WRITERS[0].nickname}
          initials={SAMPLE_WRITERS[0].initials}
          status={SAMPLE_WRITERS[0].status}
          tone={SAMPLE_WRITERS[0].tone}
        />

        <div className="flex shrink-0 flex-col items-center justify-center px-2 text-center sm:min-w-[112px]">
          <span className="text-xs text-text-muted">오늘</span>
          <span className="mt-0.5 text-sm font-semibold text-text-primary">
            {todayLabel}
          </span>
        </div>

        <WriterStatus
          nickname={SAMPLE_WRITERS[1].nickname}
          initials={SAMPLE_WRITERS[1].initials}
          status={SAMPLE_WRITERS[1].status}
          tone={SAMPLE_WRITERS[1].tone}
        />
      </div>
    </section>
  );
}
