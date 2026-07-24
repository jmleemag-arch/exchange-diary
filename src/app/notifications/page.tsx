import { Suspense } from "react";
import {
  getNotifications,
  type NotificationFilter,
} from "@/app/actions/notifications";
import { AppShell } from "@/components/layout/AppShell";
import { MiniCalendar } from "@/components/home/MiniCalendar";
import { NotificationRow } from "@/components/notifications/NotificationRow";
import { NotificationsHeader } from "@/components/notifications/NotificationsHeader";
import { NotificationsToolbar } from "@/components/notifications/NotificationsToolbar";
import { getPublishedDatesInMonth } from "@/app/actions/diaries";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function NotificationsPage({ searchParams }: Props) {
  const params = await searchParams;
  const filter =
    (typeof params.filter === "string"
      ? params.filter
      : "all") as NotificationFilter;

  const items = await getNotifications(filter);
  const now = new Date();
  const markedDays = await getPublishedDatesInMonth(
    now.getFullYear(),
    now.getMonth() + 1,
  );

  return (
    <AppShell activeNavId="notifications">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <NotificationsHeader />
            <Suspense fallback={null}>
              <NotificationsToolbar />
            </Suspense>
            <section className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-sm)]">
              {items.length > 0 ? (
                items.map((item) => (
                  <NotificationRow key={item.id} item={item} />
                ))
              ) : (
                <p className="px-4 py-10 text-center text-sm text-text-muted">
                  해당 조건의 알림이 없어요.
                </p>
              )}
            </section>
            <p className="mt-6 text-center text-sm text-text-muted">
              마지막 알림이에요. 더 이상 알림이 없어요.
            </p>
          </div>

          <aside className="flex flex-col gap-4 lg:pt-1">
            <MiniCalendar
              initialYear={now.getFullYear()}
              initialMonth={now.getMonth() + 1}
              markedDays={markedDays}
              today={now.getDate()}
            />
            <section className="rounded-[22px] border border-dashed border-border bg-surface px-5 py-6 text-center text-sm text-text-muted">
              알림 설정 바로가기 · 준비 중
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
