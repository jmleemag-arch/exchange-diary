"use client";

import { Leaf, X } from "lucide-react";

type DailyQuestionPromptProps = {
  open: boolean;
  question: string | null;
  onClose: () => void;
  onApply: () => void;
};

export function DailyQuestionPrompt({
  open,
  question,
  onClose,
  onApply,
}: DailyQuestionPromptProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-question-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow)]"
        onClick={(e) => e.stopPropagation()}
      >
        <Leaf
          className="pointer-events-none absolute -right-1 top-3 h-14 w-14 text-accent/15"
          aria-hidden
        />
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p
              id="daily-question-title"
              className="text-xs font-semibold tracking-wide text-accent"
            >
              오늘의 공통 질문
            </p>
            <p className="mt-1 text-sm text-text-muted">
              막힐 때 참고만 하세요. 꼭 이 질문으로 쓸 필요는 없어요.
            </p>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:bg-surface-soft"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {question ? (
          <p className="text-[16px] font-medium leading-relaxed text-text-primary">
            “{question}”
          </p>
        ) : (
          <p className="text-sm text-text-muted">
            오늘 등록된 질문이 아직 없어요.
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!question}
            onClick={onApply}
            className="rounded-[12px] bg-accent px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            이 질문으로 시작하기
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] border border-border px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-soft"
          >
            그냥 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
