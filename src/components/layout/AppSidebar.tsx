import {
  Bell,
  CalendarDays,
  Heart,
  Images,
  List,
  MessageCircleHeart,
  Settings,
  SunMedium,
} from "lucide-react";
import Link from "next/link";
import { DevDbStatus } from "@/components/dev/DevDbStatus";
import { SAMPLE_NAV_ITEMS, SAMPLE_TOGETHER } from "@/data/home-sample";

const icons = {
  today: SunMedium,
  list: List,
  questions: MessageCircleHeart,
  moments: Images,
  notifications: Bell,
  settings: Settings,
} as const;

type AppSidebarProps = {
  activeId?: string;
};

export function AppSidebar({ activeId = "today" }: AppSidebarProps) {
  return (
    <aside className="hidden h-screen w-[232px] shrink-0 flex-col border-r border-border bg-surface px-4 py-6 xl:w-[248px] lg:flex">
      <Link
        href="/"
        className="mb-8 flex items-center gap-2.5 rounded-[12px] px-2 py-1"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Heart className="h-3.5 w-3.5 fill-current" aria-hidden />
        </span>
        <span className="text-[16px] font-semibold tracking-tight text-text-primary">
          우리의 교환일기
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1" aria-label="주요 메뉴">
        {SAMPLE_NAV_ITEMS.map((item) => {
          const Icon = icons[item.id as keyof typeof icons];
          const active = item.id === activeId;
          const unavailable = item.href === "#";

          const className = `flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[14px] transition-colors ${
            active
              ? "bg-accent-soft font-semibold text-accent"
              : unavailable
                ? "cursor-not-allowed text-text-muted"
                : "text-text-secondary hover:bg-surface-soft hover:text-text-primary"
          }`;

          if (unavailable) {
            return (
              <span
                key={item.id}
                className={className}
                aria-disabled="true"
                title="아직 준비 중"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                {item.label}
              </span>
            );
          }

          return (
            <Link key={item.id} href={item.href} className={className}>
              <Icon
                className="h-[18px] w-[18px]"
                strokeWidth={active ? 2.1 : 1.8}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-[18px] border border-border bg-surface-soft px-4 py-4">
        <div className="mb-2 flex items-center gap-2 text-text-secondary">
          <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
          <span className="text-xs font-medium">우리가 함께한 시간</span>
        </div>
        <p className="text-[22px] font-semibold tracking-tight text-text-primary">
          D + {SAMPLE_TOGETHER.days}
        </p>
        <p className="mt-1 text-xs text-text-muted">
          {SAMPLE_TOGETHER.sinceLabel}
        </p>
        <DevDbStatus />
      </div>
    </aside>
  );
}
