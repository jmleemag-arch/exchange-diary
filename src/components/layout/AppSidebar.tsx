import {
  Bell,
  CalendarDays,
  Heart,
  List,
  Settings,
  SunMedium,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DevDbStatus } from "@/components/dev/DevDbStatus";
import { heroImage, navItems } from "@/data/home";
import { daysTogether } from "@/lib/date";
import { prisma } from "@/lib/prisma";

const icons = {
  today: SunMedium,
  list: List,
  notifications: Bell,
  settings: Settings,
} as const;

type AppSidebarProps = {
  activeId?: string;
};

export async function AppSidebar({ activeId = "today" }: AppSidebarProps) {
  const couple = await prisma.coupleSettings.findUnique({ where: { id: 1 } });
  const togetherDays = couple ? daysTogether(couple.startedAt) : 0;
  const sinceLabel = couple
    ? `${couple.startedAt.getUTCFullYear()}.${String(couple.startedAt.getUTCMonth() + 1).padStart(2, "0")}.${String(couple.startedAt.getUTCDate()).padStart(2, "0")}부터`
    : "";

  return (
    <aside className="hidden h-screen w-[240px] shrink-0 flex-col border-r border-border bg-surface px-5 py-7 lg:flex">
      <Link href="/" className="mb-9 flex items-center gap-2.5 px-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft">
          <Heart className="h-4 w-4 fill-accent text-accent" />
        </span>
        <span className="text-[16px] font-semibold tracking-tight text-text-primary">
          우리의 교환일기
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1.5">
        {navItems.map((item) => {
          const Icon = icons[item.id as keyof typeof icons];
          const active = item.id === activeId;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[14px] transition-colors ${
                active
                  ? "bg-accent-soft font-semibold text-accent"
                  : "text-text-secondary hover:bg-surface-soft hover:text-text-primary"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] ${active ? "text-accent" : ""}`}
                strokeWidth={active ? 2.2 : 1.8}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 space-y-3">
        <div className="rounded-[20px] bg-surface-soft px-4 py-4">
          <div className="mb-2 flex items-center gap-2 text-text-secondary">
            <CalendarDays className="h-4 w-4 text-accent" />
            <span className="text-xs font-medium">우리가 함께한 시간</span>
          </div>
          <p className="text-[24px] font-semibold tracking-tight text-text-primary">
            D + {togetherDays}
          </p>
          <p className="mt-1 text-xs text-text-muted">{sinceLabel}</p>
          <DevDbStatus />
        </div>

        <div className="overflow-hidden rounded-[20px] bg-[#f3eee8]">
          <div className="relative h-[88px]">
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover opacity-90"
              sizes="220px"
            />
          </div>
          <p className="px-4 py-3 text-[12px] font-medium leading-relaxed text-text-primary">
            작은 하루들이 모여
            <br />
            우리를 만들어가요.
          </p>
        </div>
      </div>
    </aside>
  );
}
