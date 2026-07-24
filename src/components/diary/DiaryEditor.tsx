"use client";

import { publishDiary, saveDraft } from "@/app/actions/diaries";
import { DailyQuestionPrompt } from "@/components/diary/DailyQuestionPrompt";
import { MessageCircleHeart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type DiaryEditorProps = {
  mode: "create" | "edit";
  diaryId?: string;
  initialContent?: string;
  alreadyPublished?: boolean;
  todayQuestion?: string | null;
  onUpdate?: (content: string) => Promise<void>;
};

function applyQuestionToContent(content: string, question: string) {
  const marker = `Q. ${question}`;
  const trimmed = content.trim();
  if (!trimmed) return `${marker}\n\n`;
  if (trimmed.startsWith(marker) || trimmed.includes(`Q. ${question}`)) {
    return content;
  }
  return `${marker}\n\n${trimmed}`;
}

export function DiaryEditor({
  mode,
  initialContent = "",
  alreadyPublished = false,
  todayQuestion = null,
  onUpdate,
}: DiaryEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [message, setMessage] = useState<string | null>(null);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function run(action: () => Promise<void>) {
    setMessage(null);
    startTransition(async () => {
      try {
        await action();
        setMessage("저장했어요.");
        router.refresh();
      } catch (error) {
        const digest =
          error && typeof error === "object" && "digest" in error
            ? String((error as { digest?: string }).digest)
            : "";
        if (digest.startsWith("NEXT_REDIRECT")) throw error;
        setMessage(
          error instanceof Error ? error.message : "처리 중 오류가 났어요.",
        );
      }
    });
  }

  return (
    <>
      <div className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-text-secondary">
            막히면 오늘의 질문을 참고해 보세요.
          </p>
          <button
            type="button"
            onClick={() => setQuestionOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3.5 py-2 text-sm font-semibold text-accent transition-colors hover:bg-[#fadeda]"
          >
            <MessageCircleHeart className="h-4 w-4" />
            오늘의 질문 확인하기
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={14}
          placeholder="오늘의 이야기를 적어보세요."
          className="w-full resize-y rounded-[16px] border border-border bg-surface-soft px-4 py-3 text-[15px] leading-relaxed text-text-primary outline-none placeholder:text-text-muted focus:border-accent/40"
        />

        {message ? (
          <p className="mt-3 text-sm text-text-secondary">{message}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {mode === "create" && !alreadyPublished ? (
            <>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  run(async () => {
                    await saveDraft(content);
                  })
                }
                className="rounded-[12px] border border-border px-4 py-2.5 text-sm font-semibold text-text-secondary hover:bg-surface-soft disabled:opacity-60"
              >
                임시 저장
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  run(async () => {
                    await publishDiary(content);
                  })
                }
                className="rounded-[12px] bg-text-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                작성 완료 · 공개
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={pending || !onUpdate}
              onClick={() =>
                run(async () => {
                  if (onUpdate) await onUpdate(content);
                })
              }
              className="rounded-[12px] bg-text-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              수정 저장
            </button>
          )}
        </div>
      </div>

      <DailyQuestionPrompt
        open={questionOpen}
        question={todayQuestion}
        onClose={() => setQuestionOpen(false)}
        onApply={() => {
          if (!todayQuestion) return;
          setContent((prev) => applyQuestionToContent(prev, todayQuestion));
          setQuestionOpen(false);
          setMessage("질문을 본문 위에 넣었어요. 이어서 적어 보세요.");
        }}
      />
    </>
  );
}
