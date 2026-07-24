export const settingsTabs = [
  { id: "profile", label: "프로필" },
  { id: "account", label: "계정" },
  { id: "notification", label: "알림" },
  { id: "diary", label: "일기" },
  { id: "privacy", label: "개인정보" },
  { id: "etc", label: "기타" },
] as const;

export type SettingsTabId = (typeof settingsTabs)[number]["id"];

export const settingsGuides = [
  { id: "guide", label: "설정 가이드" },
  { id: "faq", label: "자주 묻는 질문" },
  { id: "contact", label: "문의하기" },
] as const;
