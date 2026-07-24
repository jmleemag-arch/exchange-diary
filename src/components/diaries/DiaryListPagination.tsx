import { ChevronLeft, ChevronRight } from "lucide-react";

const pages = [1, 2, 3, 4, 5, "...", 12] as const;

export function DiaryListPagination() {
  return (
    <nav
      aria-label="일기 목록 페이지"
      className="mt-7 flex items-center justify-center gap-1.5"
    >
      <button
        type="button"
        aria-label="이전 페이지"
        className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted hover:bg-surface"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-sm text-text-muted"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${
              page === 1
                ? "bg-accent text-white"
                : "text-text-secondary hover:bg-surface"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="다음 페이지"
        className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted hover:bg-surface"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
