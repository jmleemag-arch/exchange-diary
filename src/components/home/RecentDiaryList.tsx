import { recentDiaries } from "@/data/home";
import { ChevronRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function RecentDiaryList() {
  return (
    <section className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[17px] font-semibold text-text-primary">
          최근 일기
        </h2>
      </div>
      <ul>
        {recentDiaries.map((diary) => (
          <li key={diary.id} className="border-b border-border last:border-b-0">
            <Link
              href="#"
              className="flex items-center gap-3.5 py-3.5 transition-colors hover:bg-surface-soft"
            >
              <Image
                src={diary.thumbnail}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-[14px] object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-text-primary">
                  {diary.title}
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-text-muted">
                  <span>{diary.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {diary.comments}
                  </span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
