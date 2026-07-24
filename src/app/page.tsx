import { AppShell } from "@/components/layout/AppShell";
import { DailyQuestionCard } from "@/components/home/DailyQuestionCard";
import { HeroBanner } from "@/components/home/HeroBanner";
import { HomeHeader } from "@/components/home/HomeHeader";
import { MiniCalendar } from "@/components/home/MiniCalendar";
import { MomentsCard } from "@/components/home/MomentsCard";
import { RecentDiaryList } from "@/components/home/RecentDiaryList";
import { WriteDiaryButton } from "@/components/home/WriteDiaryButton";
import { WritingStatusCard } from "@/components/home/WritingStatusCard";

export default function Home() {
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
            <DailyQuestionCard />
            <MiniCalendar />
            <MomentsCard />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
