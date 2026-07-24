import { AppShell } from "@/components/layout/AppShell";
import { MiniCalendar } from "@/components/home/MiniCalendar";
import { MomentsCard } from "@/components/home/MomentsCard";
import { NotificationShortcuts } from "@/components/notifications/NotificationShortcuts";
import { NotificationsHeader } from "@/components/notifications/NotificationsHeader";
import { NotificationsPanel } from "@/components/notifications/NotificationsPanel";

export default function NotificationsPage() {
  return (
    <AppShell activeNavId="notifications">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <NotificationsHeader />
            <NotificationsPanel />
          </div>

          <aside className="flex flex-col gap-4 lg:pt-1">
            <MiniCalendar />
            <MomentsCard />
            <NotificationShortcuts />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
