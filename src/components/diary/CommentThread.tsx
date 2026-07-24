"use client";

import { createComment, createReply } from "@/app/actions/comments";
import { formatRelativeTime } from "@/lib/date";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type CommentAuthor = {
  id: string;
  nickname: string;
  avatarUrl: string | null;
};

type CommentNode = {
  id: string;
  content: string;
  createdAt: Date;
  author: CommentAuthor;
  replies: {
    id: string;
    content: string;
    createdAt: Date;
    author: CommentAuthor;
  }[];
};

export function CommentThread({
  diaryId,
  comments,
}: {
  diaryId: string;
  comments: CommentNode[];
}) {
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function submitComment() {
    setError(null);
    startTransition(async () => {
      try {
        await createComment(diaryId, text);
        setText("");
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "댓글 작성 실패");
      }
    });
  }

  function submitReply(parentId: string) {
    setError(null);
    startTransition(async () => {
      try {
        await createReply(diaryId, parentId, replyText);
        setReplyTo(null);
        setReplyText("");
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "답글 작성 실패");
      }
    });
  }

  return (
    <section className="mt-6 rounded-[22px] border border-border bg-surface p-5 shadow-[var(--shadow-sm)]">
      <h2 className="mb-4 text-[17px] font-semibold text-text-primary">댓글</h2>

      <div className="mb-5">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="따뜻한 한마디를 남겨보세요."
          className="w-full rounded-[14px] border border-border bg-surface-soft px-3 py-2.5 text-sm outline-none focus:border-accent/40"
        />
        <button
          type="button"
          disabled={pending}
          onClick={submitComment}
          className="mt-2 rounded-[12px] bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          댓글 작성
        </button>
      </div>

      {error ? <p className="mb-3 text-sm text-accent">{error}</p> : null}

      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
            <div className="flex gap-3">
              {comment.author.avatarUrl ? (
                <Image
                  src={comment.author.avatarUrl}
                  alt={comment.author.nickname}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {comment.author.nickname.slice(0, 1)}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">
                    {comment.author.nickname}
                  </span>
                  <span className="text-xs text-text-muted">
                    {formatRelativeTime(new Date(comment.createdAt))}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm text-text-primary">
                  {comment.content}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setReplyTo(comment.id);
                    setReplyText("");
                  }}
                  className="mt-2 text-xs font-medium text-text-secondary hover:text-accent"
                >
                  답글
                </button>

                {replyTo === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={2}
                      className="w-full rounded-[12px] border border-border bg-surface-soft px-3 py-2 text-sm outline-none"
                      placeholder={`${comment.author.nickname}님에게 답글`}
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => submitReply(comment.id)}
                        className="rounded-[10px] bg-text-primary px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        답글 등록
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyTo(null)}
                        className="rounded-[10px] px-3 py-1.5 text-xs text-text-muted"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : null}

                {comment.replies.length > 0 ? (
                  <ul className="mt-3 space-y-3 border-l border-border pl-4">
                    {comment.replies.map((reply) => (
                      <li key={reply.id} className="flex gap-2.5">
                        {reply.author.avatarUrl ? (
                          <Image
                            src={reply.author.avatarUrl}
                            alt={reply.author.nickname}
                            width={28}
                            height={28}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                        ) : null}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                              {reply.author.nickname}
                            </span>
                            <span className="text-xs text-text-muted">
                              {formatRelativeTime(new Date(reply.createdAt))}
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm whitespace-pre-wrap">
                            {reply.content}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
