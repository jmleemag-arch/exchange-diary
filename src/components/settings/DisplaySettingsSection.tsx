"use client";

import { ChevronDown, Rows3, SunMedium, Type } from "lucide-react";
import { useState } from "react";

export function DisplaySettingsSection() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <section className="mb-2">
      <h2 className="mb-3 text-[16px] font-semibold text-text-primary">
        화면 설정
      </h2>
      <div className="overflow-hidden rounded-[20px] border border-border bg-surface shadow-[var(--shadow-sm)]">
        <div className="flex items-center gap-3 border-b border-border px-4 py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#fff4e8] text-[#e0a45a]">
            <SunMedium className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-text-primary">화면 모드</p>
            <p className="mt-0.5 text-xs text-text-muted">
              라이트와 다크 중 선택
            </p>
          </div>
          <div className="inline-flex rounded-full bg-surface-soft p-1">
            <button
              type="button"
              onClick={() => setMode("light")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                mode === "light"
                  ? "bg-accent text-white"
                  : "text-text-secondary"
              }`}
            >
              라이트
            </button>
            <button
              type="button"
              onClick={() => setMode("dark")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                mode === "dark"
                  ? "bg-accent text-white"
                  : "text-text-secondary"
              }`}
            >
              다크
            </button>
          </div>
        </div>

        <button
          type="button"
          className="flex w-full items-center gap-3 border-b border-border px-4 py-4 text-left transition-colors hover:bg-surface-soft"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#eef2f8] text-[#7f93b3]">
            <Type className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-text-primary">
              글꼴 크기
            </span>
            <span className="mt-0.5 block text-xs text-text-muted">
              본문 글자 크기 조절
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-text-secondary">
            보통
            <ChevronDown className="h-4 w-4 text-text-muted" />
          </span>
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-surface-soft"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#eef6ef] text-[#7fa88a]">
            <Rows3 className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-text-primary">
              레이아웃 밀도
            </span>
            <span className="mt-0.5 block text-xs text-text-muted">
              카드 간격과 여백 조절
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm text-text-secondary">
            보통
            <ChevronDown className="h-4 w-4 text-text-muted" />
          </span>
        </button>
      </div>
    </section>
  );
}
