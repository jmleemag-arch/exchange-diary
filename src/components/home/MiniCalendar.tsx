"use client";

import { SAMPLE_CALENDAR } from "@/data/home-sample";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

function buildCells(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: Array<number | null> = Array.from({ length: firstDay }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  return cells;
}

type MiniCalendarProps = {
  markedDays?: number[];
  today?: number;
  initialYear?: number;
  initialMonth?: number;
};

export function MiniCalendar({
  markedDays = SAMPLE_CALENDAR.markedDays,
  today = SAMPLE_CALENDAR.today,
  initialYear = SAMPLE_CALENDAR.year,
  initialMonth = SAMPLE_CALENDAR.month,
}: MiniCalendarProps) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const cells = useMemo(() => buildCells(year, month), [year, month]);
  const isSampleMonth =
    year === SAMPLE_CALENDAR.year && month === SAMPLE_CALENDAR.month;

  function goPrev() {
    if (month === 1) {
      setYear((value) => value - 1);
      setMonth(12);
      return;
    }
    setMonth((value) => value - 1);
  }

  function goNext() {
    if (month === 12) {
      setYear((value) => value + 1);
      setMonth(1);
      return;
    }
    setMonth((value) => value + 1);
  }

  return (
    <section className="rounded-[18px] border border-border bg-surface p-5 shadow-[var(--shadow)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-text-primary">
          {year}년 {month}월
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="이전 달"
            onClick={goPrev}
            className="flex h-8 w-8 items-center justify-center rounded-[12px] text-text-secondary hover:bg-surface-soft"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="다음 달"
            onClick={goNext}
            className="flex h-8 w-8 items-center justify-center rounded-[12px] text-text-secondary hover:bg-surface-soft"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-text-muted">
        {weekdays.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {cells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const isToday = isSampleMonth && day === today;
          const marked = isSampleMonth && markedDays.includes(day);

          return (
            <div
              key={day}
              className="relative flex aspect-square items-center justify-center"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] ${
                  isToday
                    ? "bg-accent-soft font-semibold text-accent"
                    : "text-text-primary"
                }`}
              >
                {day}
              </span>
              {marked && !isToday ? (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
