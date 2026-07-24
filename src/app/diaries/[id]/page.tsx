import { getDiaryForViewer } from "@/app/actions/diaries";
import { AppShell } from "@/components/layout/AppShell";
import { CommentThread } from "@/components/diary/CommentThread";
import { formatEntryDate } from "@/lib/date";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function DiaryDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getDiaryForViewer(id);
  if (!result) redirect("/diaries");

  const { diary, currentUser } = result;
  const isOwner = diary.authorId === currentUser.id;

  return (
    <AppShell activeNavId="list">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link
            href="/diaries"
            className="text-sm text-text-secondary hover:text-accent"
          >
            ← 목록
          </Link>
          {isOwner ? (
            <Link
              href={`/diaries/${diary.id}/edit`}
              className="rounded-[12px] border border-border px-3.5 py-2 text-sm font-medium text-text-secondary"
            >
              수정
            </Link>
          ) : null}
        </div>

        <article className="rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-sm)] sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            {diary.author.avatarUrl ? (
              <Image
                src={diary.author.avatarUrl}
                alt={diary.author.nickname}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : null}
            <div>
              <p className="font-semibold text-text-primary">
                {diary.author.nickname}
              </p>
              <p className="text-xs text-text-muted">
                {formatEntryDate(diary.entryDate)}
                {diary.editedAt ? " · 수정됨" : ""}
                {diary.status === "DRAFT" ? " · 임시저장" : ""}
              </p>
            </div>
          </div>
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-text-primary">
            {diary.content}
          </p>
        </article>

        {diary.status === "PUBLISHED" ? (
          <CommentThread diaryId={diary.id} comments={diary.comments} />
        ) : null}
      </div>
    </AppShell>
  );
}
