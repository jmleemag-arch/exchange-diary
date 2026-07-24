import { writers } from "@/data/home";

export const settingsTabs = [
  { id: "profile", label: "프로필" },
  { id: "account", label: "계정" },
  { id: "notification", label: "알림" },
  { id: "diary", label: "일기" },
  { id: "privacy", label: "개인정보" },
  { id: "etc", label: "기타" },
] as const;

export type SettingsTabId = (typeof settingsTabs)[number]["id"];

export const settingsProfiles = [
  {
    id: "me",
    name: writers[0].name,
    email: "jimin@example.com",
    avatar: writers[0].avatar,
    role: "나",
    roleTone: "me" as const,
  },
  {
    id: "partner",
    name: writers[1].name,
    email: "minwoo@example.com",
    avatar: writers[1].avatar,
    role: "파트너",
    roleTone: "partner" as const,
  },
];

export const togetherSettings = {
  nickname: "지민이와 민우",
  anniversary: "2024.11.20",
};

export const themeColors = [
  { id: "coral", color: "#f08a84" },
  { id: "beige", color: "#d8c3b0" },
  { id: "sage", color: "#9bb89a" },
  { id: "sky", color: "#8eb8d4" },
  { id: "lavender", color: "#b7a6d4" },
] as const;

export const settingsGuides = [
  { id: "guide", label: "설정 가이드" },
  { id: "faq", label: "자주 묻는 질문" },
  { id: "contact", label: "문의하기" },
] as const;
