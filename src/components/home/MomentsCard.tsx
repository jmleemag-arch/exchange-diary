import { moments } from "@/data/home";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type MomentsCardProps = {
  showCollectCard?: boolean;
};

export function MomentsCard({ showCollectCard = true }: MomentsCardProps) {
  return (
    <div className="space-y-3">
      <section className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-text-primary">
            Our Moments
          </h2>
          <Link
            href="#"
            className="text-xs font-medium text-text-muted transition-colors hover:text-accent"
          >
            더보기 &gt;
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {moments.map((src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-[14px]"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
          ))}
        </div>
      </section>

      {showCollectCard ? (
        <section className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[15px] font-semibold text-text-primary">
                추억을 모아보세요
              </p>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                함께한 순간을 사진으로 남겨요
              </p>
            </div>
            <button
              type="button"
              aria-label="추억 추가"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_18px_rgba(240,138,132,0.35)]"
            >
              <Plus className="h-5 w-5" strokeWidth={2.4} />
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
