import { settingsProfiles } from "@/data/settings";
import Image from "next/image";

export function ProfileInfoSection() {
  return (
    <section className="mb-6">
      <h2 className="mb-3 text-[16px] font-semibold text-text-primary">
        프로필 정보
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {settingsProfiles.map((profile) => (
          <article
            key={profile.id}
            className="rounded-[20px] border border-border bg-surface p-5 shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-start gap-3">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[16px] font-semibold text-text-primary">
                    {profile.name}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      profile.roleTone === "me"
                        ? "bg-accent-soft text-accent"
                        : "bg-surface-soft text-text-secondary"
                    }`}
                  >
                    {profile.role}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-text-muted">
                  {profile.email}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-[12px] border border-border bg-surface py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-soft"
            >
              프로필 수정
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
