import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DiaryListPagination({
  page,
  totalPages,
  queryString,
}: {
  page: number;
  totalPages: number;
  queryString: string;
}) {
  function hrefFor(p: number) {
    const params = new URLSearchParams(queryString);
    params.set("page", String(p));
    return `/diaries?${params.toString()}`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    0,
    12,
  );

  return (
    <nav
      aria-label="일기 목록 페이지"
      className="mt-7 flex items-center justify-center gap-1.5"
    >
      <Link
        href={hrefFor(Math.max(page - 1, 1))}
        aria-label="이전 페이지"
        className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted hover:bg-surface"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${
            p === page
              ? "bg-accent text-white"
              : "text-text-secondary hover:bg-surface"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={hrefFor(Math.min(page + 1, totalPages))}
        aria-label="다음 페이지"
        className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted hover:bg-surface"
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
