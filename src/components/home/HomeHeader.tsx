import { Avatar } from "@/components/common/Avatar";
import { SAMPLE_WEATHER } from "@/data/home-sample";
import { Bell, ChevronDown, CloudSun, Sun } from "lucide-react";

export function HomeHeader() {
  const WeatherIcon = SAMPLE_WEATHER.icon === "sun" ? Sun : CloudSun;

  return (
    <header className="mb-6 flex items-start justify-between gap-4 sm:mb-7">
      <div className="min-w-0">
        <h1 className="flex flex-wrap items-center gap-2 text-[28px] font-bold tracking-tight text-text-primary sm:text-[30px]">
          <span>오늘의 교환일기</span>
          <WeatherIcon
            className="h-6 w-6 text-accent"
            aria-label={`오늘 날씨: ${SAMPLE_WEATHER.label}`}
          />
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-text-secondary">
          매일 서로의 하루를 나누며 조금 더 가까워져요.
        </p>
      </div>

      <div className="hidden items-center gap-2 lg:flex">
        <button
          type="button"
          aria-label="알림"
          disabled
          title="알림은 아직 준비 중"
          className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-border bg-surface text-text-secondary"
        >
          <Bell className="h-[18px] w-[18px]" />
        </button>

        <button
          type="button"
          aria-label="프로필 메뉴"
          disabled
          title="프로필 메뉴는 아직 준비 중"
          className="flex h-11 items-center gap-1.5 rounded-[12px] border border-border bg-surface py-1 pl-1 pr-2.5"
        >
          <Avatar initials="지" alt="내 프로필" size="sm" tone="coral" />
          <ChevronDown className="h-4 w-4 text-text-muted" aria-hidden />
        </button>
      </div>
    </header>
  );
}
