import { settingsGuides } from "@/data/settings";
import {
  BookOpenText,
  ChevronRight,
  CircleHelp,
  MessageSquareMore,
} from "lucide-react";

const icons = {
  guide: BookOpenText,
  faq: CircleHelp,
  contact: MessageSquareMore,
} as const;

export function SettingsGuideCard() {
  return (
    <section className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-sm)]">
      <h2 className="mb-3 text-[15px] font-semibold text-text-primary">
        설정 안내
      </h2>
      <ul className="divide-y divide-border">
        {settingsGuides.map((item) => {
          const Icon = icons[item.id];
          return (
            <li key={item.id}>
              <button
                type="button"
                className="flex w-full items-center gap-3 py-3.5 text-left transition-colors hover:text-accent"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-soft text-text-secondary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex-1 text-sm font-medium text-text-primary">
                  {item.label}
                </span>
                <ChevronRight className="h-4 w-4 text-text-muted" />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
