import { listMoments } from "@/app/actions/moments";
import { momentPublicUrl } from "@/lib/uploads";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function MomentsCard({ limit = 3 }: { limit?: number }) {
  const items = await listMoments(limit);

  return (
    <div className="space-y-3">
      <section className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-text-primary">
            Our Moments
          </h2>
          <Link
            href="/moments"
            className="text-xs font-medium text-text-muted transition-colors hover:text-accent"
          >
            더보기 &gt;
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="py-4 text-center text-sm text-text-muted">
            아직 사진이 없어요.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {items.map((item) => (
              <Link
                key={item.id}
                href="/moments"
                className="relative aspect-square overflow-hidden rounded-[14px]"
              >
                <Image
                  src={momentPublicUrl(item.imagePath)}
                  alt={item.caption ?? "추억"}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="100px"
                />
              </Link>
            ))}
          </div>
        )}
      </section>

      <Link
        href="/moments"
        className="flex items-center justify-between gap-3 rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)] transition-colors hover:bg-surface-soft"
      >
        <div>
          <p className="text-[15px] font-semibold text-text-primary">
            추억을 모아보세요
          </p>
          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            사진과 함께 우리의 순간을 기록해요
          </p>
        </div>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_18px_rgba(240,138,132,0.35)]">
          <Plus className="h-5 w-5" strokeWidth={2.4} />
        </span>
      </Link>
    </div>
  );
}
