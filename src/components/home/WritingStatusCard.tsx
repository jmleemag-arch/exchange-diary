import { writers } from "@/data/home";
import { Check } from "lucide-react";
import Image from "next/image";

function Writer({
  name,
  avatar,
  status,
}: {
  name: string;
  avatar: string;
  status: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <div className="relative shrink-0">
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <span className="absolute -bottom-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-success text-white ring-2 ring-white">
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        </span>
      </div>
      <div>
        <p className="text-[15px] font-semibold text-text-primary">{name}</p>
        <p className="text-xs font-medium text-success">{status}</p>
      </div>
    </div>
  );
}

export function WritingStatusCard() {
  return (
    <section className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <h2 className="mb-5 text-[17px] font-semibold text-text-primary">
        오늘의 작성 현황
      </h2>
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        <Writer {...writers[0]} />
        <div className="flex shrink-0 flex-col items-center justify-center px-2 text-center sm:min-w-[140px]">
          <p className="text-[13px] font-semibold text-text-primary">
            2025.07.24 (목)
          </p>
          <p className="mt-0.5 text-xs text-text-muted">오늘</p>
        </div>
        <Writer {...writers[1]} />
      </div>
    </section>
  );
}
