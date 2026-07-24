import { AppShell } from "@/components/layout/AppShell";
import { DiaryEditor } from "@/components/diary/DiaryEditor";
import { getTodayDiaryForCurrentUser } from "@/app/actions/diaries";
import { getTodayQuestion } from "@/app/actions/questions";
import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NewDiaryPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [todayDiary, todayQuestion] = await Promise.all([
    getTodayDiaryForCurrentUser(),
    getTodayQuestion(),
  ]);

  if (todayDiary?.status === "PUBLISHED") {
    return (
      <AppShell activeNavId="today">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <h1 className="text-2xl font-bold text-text-primary">오늘의 일기</h1>
          <p className="mt-3 text-sm text-text-secondary">
            오늘은 이미 공개한 일기가 있어요. 내용을 바꾸려면 수정 화면을 이용해
            주세요.
          </p>
          <div className="mt-5 flex gap-2">
            <Link
              href={`/diaries/${todayDiary.id}`}
              className="rounded-[12px] bg-text-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              일기 보기
            </Link>
            <Link
              href={`/diaries/${todayDiary.id}/edit`}
              className="rounded-[12px] border border-border px-4 py-2.5 text-sm font-semibold text-text-secondary"
            >
              수정하기
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activeNavId="today">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
        <h1 className="mb-2 text-2xl font-bold text-text-primary">
          새 일기 쓰기
        </h1>
        <p className="mb-5 text-sm text-text-secondary">
          {user.nickname}님의 오늘 하루를 남겨보세요. 임시 저장 후 언제든 이어서
          쓸 수 있어요.
        </p>
        <DiaryEditor
          mode="create"
          initialContent={todayDiary?.content ?? ""}
          todayQuestion={todayQuestion?.content ?? null}
        />
      </div>
    </AppShell>
  );
}
