import { currentUser } from "@/data/home";
import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

export function NotificationsHeader() {
  return (
    <header className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-[28px] font-bold tracking-tight text-text-primary sm:text-[30px]">
          알림
          <Bell className="h-6 w-6 text-accent" aria-hidden />
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">
          우리의 소식을 한눈에 확인하세요.
        </p>
      </div>

      <div className="hidden items-center gap-3 lg:flex">
        <button
          type="button"
          aria-label="알림"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text-secondary shadow-[var(--shadow-sm)]"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 shadow-[var(--shadow-sm)]"
        >
          <Image
            src={currentUser.avatar}
            alt={currentUser.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <ChevronDown className="h-4 w-4 text-text-muted" />
        </button>
      </div>
    </header>
  );
}
