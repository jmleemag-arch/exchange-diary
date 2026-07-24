import { AppShell } from "@/components/layout/AppShell";
import { MiniCalendar } from "@/components/home/MiniCalendar";
import { SettingsGuideCard } from "@/components/settings/SettingsGuideCard";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { getPublishedDatesInMonth } from "@/app/actions/diaries";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [partner, couple, preference] = await Promise.all([
    prisma.user.findFirst({
      where: {
        loginKey: { in: ["jimin", "minwoo"] },
        NOT: { id: user.id },
      },
    }),
    prisma.coupleSettings.findUnique({ where: { id: 1 } }),
    prisma.userPreference.findUnique({ where: { userId: user.id } }),
  ]);

  const anniversary = couple?.anniversary
    ? couple.anniversary.toISOString().slice(0, 10)
    : "2024-11-20";

  const now = new Date();
  const markedDays = await getPublishedDatesInMonth(
    now.getFullYear(),
    now.getMonth() + 1,
  );

  return (
    <AppShell activeNavId="settings">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <SettingsHeader />
            <SettingsPanel
              me={{
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                avatarUrl: user.avatarUrl,
                isMe: true,
              }}
              partner={
                partner
                  ? {
                      id: partner.id,
                      nickname: partner.nickname,
                      email: partner.email,
                      avatarUrl: partner.avatarUrl,
                      isMe: false,
                    }
                  : null
              }
              pairNickname={couple?.pairNickname ?? "지민이와 민우"}
              anniversary={anniversary}
              notifyDiary={preference?.notifyDiary ?? true}
              notifyComment={preference?.notifyComment ?? true}
            />
          </div>

          <aside className="flex flex-col gap-4 lg:pt-1">
            <MiniCalendar
              initialYear={now.getFullYear()}
              initialMonth={now.getMonth() + 1}
              markedDays={markedDays}
              today={now.getDate()}
            />
            <section className="rounded-[22px] border border-dashed border-border bg-surface px-5 py-6 text-center text-sm text-text-muted">
              Our Moments · 준비 중
            </section>
            <SettingsGuideCard />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
