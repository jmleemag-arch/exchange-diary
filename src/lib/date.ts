export function toEntryDate(date = new Date()) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
}

export function formatEntryDate(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  // Use local weekday from UTC components for consistency with stored date
  const local = new Date(y, date.getUTCMonth(), date.getUTCDate());
  const weekday = weekdays[local.getDay()];
  return `${y}.${m}.${d} (${weekday})`;
}

export function formatRelativeTime(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "어제";
  if (days < 7) return `${days}일 전`;
  return formatEntryDate(date);
}

export function makePreview(content: string, maxLength = 80) {
  const normalized = content.replace(/\s+/g, " ").trim();
  if (!normalized) return "";
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}…`;
}

export function daysTogether(startedAt: Date, now = new Date()) {
  const start = new Date(
    startedAt.getFullYear(),
    startedAt.getMonth(),
    startedAt.getDate(),
  );
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.floor((today.getTime() - start.getTime()) / 86400000);
  return Math.max(diff, 0);
}

export function snippet(text: string, max = 40) {
  const value = text.replace(/\s+/g, " ").trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max).trim()}…`;
}
