import { getTodayWritingStatus } from "@/app/actions/diaries";
import { formatEntryDate, toEntryDate } from "@/lib/date";
import { Check } from "lucide-react";
import Image from "next/image";

export async function WritingStatusCard() {
  const statuses = await getTodayWritingStatus();
  const todayLabel = formatEntryDate(toEntryDate());

  return (
    <section className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <h2 className="mb-5 text-[17px] font-semibold text-text-primary">
        오늘의 작성 현황
      </h2>
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        {statuses.map((item, index) => (
          <div key={item.user.id} className="contents">
            {index === 1 ? (
              <div className="flex shrink-0 flex-col items-center justify-center px-2 text-center sm:min-w-[140px]">
                <p className="text-[13px] font-semibold text-text-primary">
                  {todayLabel}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">오늘</p>
              </div>
            ) : null}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="relative shrink-0">
                {item.user.avatarUrl ? (
                  <Image
                    src={item.user.avatarUrl}
                    alt={item.user.nickname}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent">
                    {item.user.nickname.slice(0, 1)}
                  </span>
                )}
                {item.statusLabel === "작성 완료" ? (
                  <span className="absolute -right-0.5 -bottom-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-success text-white ring-2 ring-white">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                ) : null}
              </div>
              <div>
                <p className="text-[15px] font-semibold text-text-primary">
                  {item.user.nickname}
                </p>
                <p
                  className={`text-xs font-medium ${
                    item.statusLabel === "작성 완료"
                      ? "text-success"
                      : item.statusLabel === "작성 중"
                        ? "text-accent"
                        : "text-text-muted"
                  }`}
                >
                  {item.statusLabel}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
