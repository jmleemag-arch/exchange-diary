import { writers } from "@/data/home";

export type NotificationType = "diary" | "comment" | "like" | "system";

export type NotificationFilter =
  | "all"
  | "unread"
  | "diary"
  | "comment"
  | "like"
  | "system";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  actorName: string;
  actorAvatar?: string;
  message: string;
  snippet?: string;
  timeLabel: string;
  unread: boolean;
};

export const notificationFilters: {
  id: NotificationFilter;
  label: string;
}[] = [
  { id: "all", label: "전체" },
  { id: "unread", label: "읽지 않음" },
  { id: "diary", label: "일기" },
  { id: "comment", label: "댓글" },
  { id: "like", label: "좋아요" },
  { id: "system", label: "시스템" },
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    type: "diary",
    actorName: "민우",
    actorAvatar: writers[1].avatar,
    message: "민우님이 새로운 일기를 작성했어요",
    snippet: "오늘 바다가 정말 예뻤어...",
    timeLabel: "10분 전",
    unread: true,
  },
  {
    id: "n2",
    type: "comment",
    actorName: "지민",
    actorAvatar: writers[0].avatar,
    message: "지민님이 회원님의 일기에 댓글을 남겼어요",
    snippet: "그 풍경 정말 좋았겠다!",
    timeLabel: "1시간 전",
    unread: true,
  },
  {
    id: "n3",
    type: "like",
    actorName: "민우",
    actorAvatar: writers[1].avatar,
    message: "민우님이 회원님의 일기를 좋아해요",
    snippet: "비 오는 날의 카페",
    timeLabel: "어제",
    unread: false,
  },
  {
    id: "n4",
    type: "comment",
    actorName: "지민",
    actorAvatar: writers[0].avatar,
    message: "지민님이 회원님의 일기에 댓글을 남겼어요",
    snippet: "다음에 같이 가자",
    timeLabel: "어제",
    unread: false,
  },
  {
    id: "n5",
    type: "system",
    actorName: "시스템",
    message: "오늘의 공통 질문이 도착했어요",
    snippet: "요즘 가장 감사한 일은 무엇인가요?",
    timeLabel: "2일 전",
    unread: false,
  },
  {
    id: "n6",
    type: "diary",
    actorName: "민우",
    actorAvatar: writers[1].avatar,
    message: "민우님이 새로운 일기를 작성했어요",
    snippet: "퇴근길의 노을이 예뻐서...",
    timeLabel: "3일 전",
    unread: false,
  },
];

export const notificationShortcuts = [
  { id: "prefs", label: "알림 환경 설정" },
  { id: "schedule", label: "알림 시간 설정" },
  { id: "help", label: "알림 도움말" },
] as const;
