import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";

type AppShellProps = {
  children: React.ReactNode;
  activeNavId?: string;
};

export function AppShell({ children, activeNavId = "today" }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <AppSidebar activeId={activeNavId} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <MobileHeader />
        <div className="flex-1 pb-24 lg:pb-0">{children}</div>
        <MobileBottomNav />
      </div>
    </div>
  );
}
