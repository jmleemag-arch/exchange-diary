"use client";

import {
  themeColors,
  togetherSettings,
} from "@/data/settings";
import { CalendarHeart, Check, Heart, Palette } from "lucide-react";
import { useState } from "react";

export function TogetherSettingsSection() {
  const [selectedTheme, setSelectedTheme] =
    useState<(typeof themeColors)[number]["id"]>(themeColors[0].id);

  return (
    <section className="mb-6">
      <h2 className="mb-3 text-[16px] font-semibold text-text-primary">
        함께 설정
      </h2>
      <div className="overflow-hidden rounded-[20px] border border-border bg-surface shadow-[var(--shadow-sm)]">
        <button
          type="button"
          className="flex w-full items-center gap-3 border-b border-border px-4 py-4 text-left transition-colors hover:bg-surface-soft"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-accent-soft text-accent">
            <Heart className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-text-primary">
              우리의 별명
            </span>
            <span className="mt-0.5 block text-xs text-text-muted">
              둘만의 이름을 정해보세요
            </span>
          </span>
          <span className="text-sm font-medium text-text-secondary">
            {togetherSettings.nickname}
          </span>
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 border-b border-border px-4 py-4 text-left transition-colors hover:bg-surface-soft"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f4efe9] text-[#c4a484]">
            <CalendarHeart className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-text-primary">
              기념일
            </span>
            <span className="mt-0.5 block text-xs text-text-muted">
              우리가 시작한 날
            </span>
          </span>
          <span className="text-sm font-medium text-text-secondary">
            {togetherSettings.anniversary}
          </span>
        </button>

        <div className="flex items-center gap-3 px-4 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#eef3f7] text-[#7ea3c0]">
            <Palette className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary">테마 색상</p>
            <p className="mt-0.5 text-xs text-text-muted">
              포인트 컬러를 골라보세요
            </p>
          </div>
          <div className="flex items-center gap-2">
            {themeColors.map((theme) => {
              const selected = theme.id === selectedTheme;
              return (
                <button
                  key={theme.id}
                  type="button"
                  aria-label={`${theme.id} 테마`}
                  onClick={() => setSelectedTheme(theme.id)}
                  className="relative flex h-7 w-7 items-center justify-center rounded-full"
                  style={{ backgroundColor: theme.color }}
                >
                  {selected ? (
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
