"use client";

import { uploadMoment } from "@/app/actions/moments";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

export function MomentUploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function onFileChange(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    setMessage(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("file", file);
        if (caption.trim()) formData.set("caption", caption.trim());
        await uploadMoment(formData);
        setCaption("");
        if (inputRef.current) inputRef.current.value = "";
        setMessage("추억을 올렸어요.");
        router.refresh();
      } catch (error) {
        setMessage(
          error instanceof Error ? error.message : "업로드에 실패했어요.",
        );
      }
    });
  }

  return (
    <section className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-sm)]">
      <h2 className="text-[16px] font-semibold text-text-primary">
        추억 올리기
      </h2>
      <p className="mt-1 text-sm text-text-muted">
        jpg, png, webp, gif · 최대 5MB
      </p>

      <input
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="한 줄 메모 (선택)"
        className="mt-4 w-full rounded-[12px] border border-border px-3 py-2.5 text-sm outline-none focus:border-accent/40"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files)}
      />

      <button
        type="button"
        disabled={pending}
        onClick={() => inputRef.current?.click()}
        className="mt-3 inline-flex items-center gap-2 rounded-[12px] bg-accent px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        <Plus className="h-4 w-4" />
        {pending ? "올리는 중..." : "사진 선택 · 업로드"}
      </button>

      {message ? (
        <p className="mt-3 text-sm text-text-secondary">{message}</p>
      ) : null}
    </section>
  );
}
