"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";

export function DiaryListToolbar() {
  const [query, setQuery] = useState("");

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-text-secondary"
        >
          전체
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-text-secondary"
        >
          최신순
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      <label className="relative block w-full sm:max-w-[260px]">
        <span className="sr-only">일기 검색</span>
        <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="일기 검색..."
          className="h-10 w-full rounded-full border border-border bg-surface pr-10 pl-10 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent/40"
        />
        {query ? (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => setQuery("")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-text-muted hover:text-text-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </label>
    </div>
  );
}
