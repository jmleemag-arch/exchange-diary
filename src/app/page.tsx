import { AppShell } from "@/components/layout/AppShell";
import { HeroBanner } from "@/components/home/HeroBanner";
import { HomeHeader } from "@/components/home/HomeHeader";
import { MiniCalendar } from "@/components/home/MiniCalendar";
import { RecentDiaryList } from "@/components/home/RecentDiaryList";
import { WriteDiaryButton } from "@/components/home/WriteDiaryButton";
import { WritingStatusCard } from "@/components/home/WritingStatusCard";
import { MomentsCard } from "@/components/moments/MomentsCard";
import { getPublishedDatesInMonth } from "@/app/actions/diaries";

export default async function Home() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const markedDays = await getPublishedDatesInMonth(year, month);

  return (
    <AppShell activeNavId="today">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <HomeHeader />
            <div className="flex flex-col gap-5">
              <HeroBanner />
              <WritingStatusCard />
              <RecentDiaryList />
            </div>
            <WriteDiaryButton />
          </div>

          <aside className="flex flex-col gap-4 lg:pt-[4.5rem]">
            <MiniCalendar
              initialYear={year}
              initialMonth={month}
              markedDays={markedDays}
              today={now.getDate()}
            />
            <MomentsCard />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
