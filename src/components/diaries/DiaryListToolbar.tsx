"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

type UserOption = { id: string; nickname: string };

export function DiaryListToolbar({ users }: { users: UserOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [pending, startTransition] = useTransition();

  function updateParams(patch: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    params.delete("page");
    startTransition(() => {
      router.push(`/diaries?${params.toString()}`);
    });
  }

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-text-secondary"
          value={searchParams.get("authorId") ?? ""}
          disabled={pending}
          onChange={(e) =>
            updateParams({ authorId: e.target.value || null })
          }
        >
          <option value="">전체 작성자</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nickname}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-text-secondary"
          value={searchParams.get("date") ?? ""}
          disabled={pending}
          onChange={(e) => updateParams({ date: e.target.value || null })}
        />
      </div>

      <form
        className="relative block w-full sm:max-w-[260px]"
        onSubmit={(e) => {
          e.preventDefault();
          updateParams({ q: query.trim() || null });
        }}
      >
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
            onClick={() => {
              setQuery("");
              updateParams({ q: null });
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-text-muted"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </form>
    </div>
  );
}
