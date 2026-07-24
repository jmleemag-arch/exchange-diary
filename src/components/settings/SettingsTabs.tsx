"use client";

import {
  settingsTabs,
  type SettingsTabId,
} from "@/data/settings";

type SettingsTabsProps = {
  activeTab: SettingsTabId;
  onTabChange: (tab: SettingsTabId) => void;
};

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border">
      {settingsTabs.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative shrink-0 px-3.5 py-3 text-sm transition-colors sm:px-4 ${
              active
                ? "font-semibold text-accent"
                : "font-medium text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
            {active ? (
              <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-accent" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
