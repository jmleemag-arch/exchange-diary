import { AppShell } from "@/components/layout/AppShell";
import { MiniCalendar } from "@/components/home/MiniCalendar";
import { MomentsCard } from "@/components/home/MomentsCard";
import { SettingsGuideCard } from "@/components/settings/SettingsGuideCard";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsPanel } from "@/components/settings/SettingsPanel";

export default function SettingsPage() {
  return (
    <AppShell activeNavId="settings">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <SettingsHeader />
            <SettingsPanel />
          </div>

          <aside className="flex flex-col gap-4 lg:pt-1">
            <MiniCalendar />
            <MomentsCard />
            <SettingsGuideCard />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
