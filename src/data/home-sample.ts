/**
 * UI 구성용 샘플 데이터.
 * 실제 사용자/일기/추억 데이터가 아니며, DB와 연결되어 있지 않다.
 */

export type SampleWriterStatus = "작성 완료" | "아직 작성 전";

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const SAMPLE_NAV_ITEMS: NavItem[] = [
  { id: "today", label: "오늘의 일기", href: "/" },
  { id: "list", label: "일기 목록", href: "#" },
  { id: "questions", label: "공통 질문", href: "#" },
  { id: "moments", label: "추억", href: "#" },
  { id: "notifications", label: "알림", href: "#" },
  { id: "settings", label: "설정", href: "#" },
];

export const SAMPLE_WRITERS = [
  {
    id: "user-a",
    nickname: "지민",
    initials: "지",
    status: "작성 완료" as SampleWriterStatus,
    tone: "coral" as const,
  },
  {
    id: "user-b",
    nickname: "민우",
    initials: "민",
    status: "아직 작성 전" as SampleWriterStatus,
    tone: "beige" as const,
  },
];

export const SAMPLE_RECENT_DIARIES = [
  {
    id: "diary-1",
    preview: "오늘 바다가 정말 예뻤어",
    author: "지민",
    date: "2025.07.23",
    commentCount: 2,
    tone: "sky" as const,
  },
  {
    id: "diary-2",
    preview: "새로운 카페를 발견했어",
    author: "민우",
    date: "2025.07.22",
    commentCount: 1,
    tone: "sand" as const,
  },
  {
    id: "diary-3",
    preview: "퇴근길의 하늘이 예뻐서",
    author: "지민",
    date: "2025.07.21",
    commentCount: 3,
    tone: "sage" as const,
  },
];

/** 추억 사진은 아직 없으므로 빈 배열로 둔다. */
export const SAMPLE_MOMENTS: string[] = [];

export const SAMPLE_TODAY_QUESTION =
  "요즘 가장 감사했던 일은 무엇인가요?";

export const SAMPLE_TOGETHER = {
  days: 128,
  sinceLabel: "2025.03.18부터",
};

export const SAMPLE_CALENDAR = {
  year: 2025,
  month: 7,
  markedDays: [2, 5, 8, 12, 15, 18, 21, 23],
  today: 24,
};

export const SAMPLE_WEATHER = {
  label: "맑음",
  // lucide icon name used by HomeHeader
  icon: "sun" as const,
};
