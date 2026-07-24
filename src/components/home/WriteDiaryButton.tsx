import { Pencil } from "lucide-react";

export function WriteDiaryButton() {
  return (
    <div className="mt-5 hidden justify-center lg:flex">
      <button
        type="button"
        disabled
        title="일기 작성은 아직 준비 중"
        className="inline-flex min-h-12 items-center gap-2 rounded-[12px] bg-text-primary px-6 py-3 text-sm font-semibold text-white opacity-80"
      >
        <Pencil className="h-4 w-4" aria-hidden />
        새 일기 쓰기
      </button>
    </div>
  );
}
