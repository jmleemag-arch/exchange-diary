import { prisma } from "@/lib/prisma";

/**
 * 개발 환경에서만 표시하는 DB 연결 확인.
 * 메인 UI를 방해하지 않도록 작게 둔다.
 */
export async function DevDbStatus() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  let label = "DB: 연결 실패";

  try {
    const check = await prisma.systemCheck.findFirst({
      orderBy: { createdAt: "asc" },
    });
    label = check
      ? `DB: ${check.message}`
      : "DB: 연결됨 (seed 필요)";
  } catch {
    label = "DB: 연결 실패";
  }

  return (
    <p
      className="mt-3 truncate px-1 text-[11px] leading-relaxed text-text-muted"
      title={label}
    >
      {label}
    </p>
  );
}
