import { listMoments } from "@/app/actions/moments";
import { AppShell } from "@/components/layout/AppShell";
import { MomentUploadForm } from "@/components/moments/MomentUploadForm";
import { MomentsGrid } from "@/components/moments/MomentsGrid";
import { getCurrentUser } from "@/lib/auth/session";
import { Images } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MomentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const items = await listMoments(48);

  return (
    <AppShell activeNavId="moments">
      <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
        <header className="mb-6">
          <h1 className="flex items-center gap-2 text-[28px] font-bold tracking-tight text-text-primary">
            Our Moments
            <Images className="h-6 w-6 text-accent" aria-hidden />
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            둘이 함께한 순간을 사진으로 남겨요.
          </p>
        </header>

        <div className="mb-6">
          <MomentUploadForm />
        </div>

        <MomentsGrid items={items} />
      </div>
    </AppShell>
  );
}
