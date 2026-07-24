import { updateDiary, getDiaryForViewer } from "@/app/actions/diaries";
import { getTodayQuestion } from "@/app/actions/questions";
import { AppShell } from "@/components/layout/AppShell";
import { DiaryEditor } from "@/components/diary/DiaryEditor";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditDiaryPage({ params }: Props) {
  const { id } = await params;
  const [result, todayQuestion] = await Promise.all([
    getDiaryForViewer(id),
    getTodayQuestion(),
  ]);

  if (!result) redirect("/diaries");
  const { diary, currentUser } = result;

  if (diary.authorId !== currentUser.id) {
    redirect(`/diaries/${id}`);
  }

  async function handleUpdate(content: string) {
    "use server";
    await updateDiary(id, content);
  }

  return (
    <AppShell activeNavId="list">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
        <h1 className="mb-2 text-2xl font-bold text-text-primary">일기 수정</h1>
        <p className="mb-5 text-sm text-text-secondary">
          수정하면 상세 화면에 ‘수정됨’이 표시돼요.
        </p>
        <DiaryEditor
          mode="edit"
          diaryId={diary.id}
          initialContent={diary.content}
          alreadyPublished={diary.status === "PUBLISHED"}
          todayQuestion={todayQuestion?.content ?? null}
          onUpdate={handleUpdate}
        />
      </div>
    </AppShell>
  );
}
