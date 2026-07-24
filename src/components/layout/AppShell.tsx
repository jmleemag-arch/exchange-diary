import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { getCurrentUser } from "@/lib/auth/session";

type AppShellProps = {
  children: React.ReactNode;
  activeNavId?: string;
};

export async function AppShell({
  children,
  activeNavId = "today",
}: AppShellProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <AppSidebar activeId={activeNavId} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <MobileHeader
          nickname={user?.nickname ?? ""}
          avatarUrl={user?.avatarUrl ?? null}
        />
        <div className="flex-1 pb-24 lg:pb-0">{children}</div>
        <MobileBottomNav />
      </div>
    </div>
  );
}
