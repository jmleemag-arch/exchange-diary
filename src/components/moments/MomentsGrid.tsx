import { momentPublicUrl } from "@/lib/uploads";
import { formatRelativeTime } from "@/lib/date";
import Image from "next/image";

type MomentItem = {
  id: string;
  imagePath: string;
  caption: string | null;
  createdAt: Date;
  uploader: {
    nickname: string;
  };
};

export function MomentsGrid({ items }: { items: MomentItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-[22px] border border-dashed border-border bg-surface px-5 py-12 text-center text-sm text-text-muted">
        아직 모아둔 사진이 없어요. 첫 추억을 올려보세요.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <figure
          key={item.id}
          className="overflow-hidden rounded-[18px] border border-border bg-surface shadow-[var(--shadow-sm)]"
        >
          <div className="relative aspect-square">
            <Image
              src={momentPublicUrl(item.imagePath)}
              alt={item.caption ?? `${item.uploader.nickname}의 추억`}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 220px"
            />
          </div>
          <figcaption className="space-y-0.5 px-3 py-2.5">
            <p className="truncate text-xs font-semibold text-text-primary">
              {item.uploader.nickname}
            </p>
            {item.caption ? (
              <p className="truncate text-xs text-text-secondary">
                {item.caption}
              </p>
            ) : null}
            <p className="text-[11px] text-text-muted">
              {formatRelativeTime(new Date(item.createdAt))}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
