"use client";

import { DisplaySettingsSection } from "@/components/settings/DisplaySettingsSection";
import { ProfileInfoSection } from "@/components/settings/ProfileInfoSection";
import { SettingsTabs } from "@/components/settings/SettingsTabs";
import { TogetherSettingsSection } from "@/components/settings/TogetherSettingsSection";
import type { SettingsTabId } from "@/data/settings";
import { useState } from "react";

export function SettingsPanel() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("profile");

  return (
    <div>
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "profile" ? (
        <>
          <ProfileInfoSection />
          <TogetherSettingsSection />
          <DisplaySettingsSection />
        </>
      ) : (
        <div className="rounded-[20px] border border-border bg-surface px-5 py-12 text-center shadow-[var(--shadow-sm)]">
          <p className="text-sm font-medium text-text-primary">
            {activeTab === "account" && "계정"}
            {activeTab === "notification" && "알림"}
            {activeTab === "diary" && "일기"}
            {activeTab === "privacy" && "개인정보"}
            {activeTab === "etc" && "기타"}{" "}
            설정 화면은 준비 중이에요.
          </p>
          <p className="mt-2 text-xs text-text-muted">
            지금은 프로필 탭 UI를 먼저 구성해 두었어요.
          </p>
        </div>
      )}
    </div>
  );
}
