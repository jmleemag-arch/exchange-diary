"use client";

import { calendar } from "@/data/home";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

function buildCells(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: Array<number | null> = Array.from(
    { length: firstDay },
    () => null,
  );
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  return cells;
}

export function MiniCalendar() {
  const [year, setYear] = useState(calendar.year);
  const [month, setMonth] = useState(calendar.month);
  const cells = useMemo(() => buildCells(year, month), [year, month]);
  const isBase =
    year === calendar.year && month === calendar.month;

  return (
    <section className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-text-primary">
          {year}년 {month}월
        </h2>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="이전 달"
            onClick={() => {
              if (month === 1) {
                setYear((y) => y - 1);
                setMonth(12);
              } else setMonth((m) => m - 1);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary hover:bg-surface-soft"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="다음 달"
            onClick={() => {
              if (month === 12) {
                setYear((y) => y + 1);
                setMonth(1);
              } else setMonth((m) => m + 1);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary hover:bg-surface-soft"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-text-muted">
        {weekdays.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center text-sm">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} className="aspect-square" />;
          const today = isBase && day === calendar.today;
          const marked = isBase && calendar.markedDays.includes(day);
          return (
            <div
              key={day}
              className="relative flex aspect-square items-center justify-center"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] ${
                  today
                    ? "bg-accent font-semibold text-white"
                    : "text-text-primary"
                }`}
              >
                {day}
              </span>
              {marked && !today ? (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-success" />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
