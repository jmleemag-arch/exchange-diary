import { EmptyState } from "@/components/common/EmptyState";
import { SectionTitle } from "@/components/common/SectionTitle";
import { SAMPLE_MOMENTS } from "@/data/home-sample";

export function MomentsCard() {
  return (
    <section className="rounded-[18px] border border-border bg-surface p-5 shadow-[var(--shadow)]">
      <SectionTitle
        action={
          <button
            type="button"
            disabled
            title="추억 보기는 아직 준비 중"
            className="text-xs font-medium text-text-muted"
          >
            더보기
          </button>
        }
      >
        우리의 순간
      </SectionTitle>

      {SAMPLE_MOMENTS.length === 0 ? (
        <EmptyState message="아직 모아둔 사진이 없어요." />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {SAMPLE_MOMENTS.slice(0, 3).map((src) => (
            <div
              key={src}
              className="aspect-square rounded-[14px] bg-surface-soft"
              aria-hidden
            />
          ))}
        </div>
      )}
    </section>
  );
}
