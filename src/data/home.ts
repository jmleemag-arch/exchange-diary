export const navItems = [
  { id: "today", label: "오늘의 일기", href: "/" },
  { id: "list", label: "일기 목록", href: "/diaries" },
  { id: "questions", label: "공통 질문", href: "#" },
  { id: "moments", label: "Our Moments", href: "#" },
  { id: "notifications", label: "알림", href: "/notifications" },
  { id: "settings", label: "설정", href: "#" },
] as const;

export const writers = [
  {
    id: "jimin",
    name: "지민",
    status: "작성 완료" as const,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces",
  },
  {
    id: "minwoo",
    name: "민우",
    status: "작성 완료" as const,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
  },
];

export const recentDiaries = [
  {
    id: "1",
    title: "오늘 바다가 정말 예뻤어",
    date: "2025.07.23",
    comments: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    title: "비 오는 날의 카페",
    date: "2025.07.22",
    comments: 1,
    thumbnail:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    title: "우리 처음으로 같이 본 영화",
    date: "2025.07.21",
    comments: 3,
    thumbnail:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=200&fit=crop",
  },
];

export const moments = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1529333166437-5170ead30955?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=300&fit=crop",
];

export const heroImage =
  "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=1200&h=700&fit=crop";

export const todayQuestion = "요즘 가장 감사한 일은 무엇인가요?";

export const together = {
  days: 128,
  since: "2025.03.18부터",
};

export const calendar = {
  year: 2025,
  month: 7,
  markedDays: [3, 6, 9, 12, 15, 18, 21, 23],
  today: 24,
};

export const currentUser = {
  name: "지민",
  avatar: writers[0].avatar,
};
