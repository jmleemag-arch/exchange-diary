import { AppShell } from "@/components/layout/AppShell";
import { DiaryListFeed } from "@/components/diaries/DiaryListFeed";
import { DiaryListHeader } from "@/components/diaries/DiaryListHeader";
import { DiaryListPagination } from "@/components/diaries/DiaryListPagination";
import { DiaryListToolbar } from "@/components/diaries/DiaryListToolbar";
import { DailyQuestionCard } from "@/components/home/DailyQuestionCard";
import { MiniCalendar } from "@/components/home/MiniCalendar";
import { MomentsCard } from "@/components/home/MomentsCard";

export default function DiariesPage() {
  return (
    <AppShell activeNavId="list">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <DiaryListHeader />
            <DiaryListToolbar />
            <DiaryListFeed />
            <DiaryListPagination />
          </div>

          <aside className="flex flex-col gap-4 lg:pt-1">
            <MiniCalendar />
            <DailyQuestionCard actionLabel="답변 쓰기" />
            <MomentsCard />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
