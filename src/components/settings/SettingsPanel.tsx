"use client";

import {
  updateCoupleSettings,
  updateNickname,
  updatePreferences,
} from "@/app/actions/settings";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { SettingsTabs } from "@/components/settings/SettingsTabs";
import type { SettingsTabId } from "@/data/settings";
import Image from "next/image";
import { useState, useTransition } from "react";

type Profile = {
  id: string;
  nickname: string;
  email: string | null;
  avatarUrl: string | null;
  isMe: boolean;
};

type Props = {
  me: Profile;
  partner: Profile | null;
  pairNickname: string;
  anniversary: string;
  notifyDiary: boolean;
  notifyComment: boolean;
};

export function SettingsPanel({
  me,
  partner,
  pairNickname,
  anniversary,
  notifyDiary,
  notifyComment,
}: Props) {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("profile");
  const [nickname, setNickname] = useState(me.nickname);
  const [pairName, setPairName] = useState(pairNickname);
  const [anni, setAnni] = useState(anniversary);
  const [prefDiary, setPrefDiary] = useState(notifyDiary);
  const [prefComment, setPrefComment] = useState(notifyComment);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function save(action: () => Promise<void>, ok = "저장했어요.") {
    setMessage(null);
    startTransition(async () => {
      try {
        await action();
        setMessage(ok);
      } catch (e) {
        setMessage(e instanceof Error ? e.message : "저장 실패");
      }
    });
  }

  return (
    <div>
      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {message ? (
        <p className="mb-4 text-sm text-text-secondary">{message}</p>
      ) : null}

      {activeTab === "profile" ? (
        <>
          <section className="mb-6">
            <h2 className="mb-3 text-[16px] font-semibold text-text-primary">
              프로필 정보
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[me, partner].filter(Boolean).map((profile) => (
                <article
                  key={profile!.id}
                  className="rounded-[20px] border border-border bg-surface p-5 shadow-[var(--shadow-sm)]"
                >
                  <div className="flex items-start gap-3">
                    {profile!.avatarUrl ? (
                      <Image
                        src={profile!.avatarUrl}
                        alt={profile!.nickname}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[16px] font-semibold text-text-primary">
                          {profile!.isMe ? nickname : profile!.nickname}
                        </p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            profile!.isMe
                              ? "bg-accent-soft text-accent"
                              : "bg-surface-soft text-text-secondary"
                          }`}
                        >
                          {profile!.isMe ? "나" : "파트너"}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-text-muted">
                        {profile!.email}
                      </p>
                    </div>
                  </div>
                  {profile!.isMe ? (
                    <div className="mt-4 space-y-2">
                      <input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full rounded-[12px] border border-border px-3 py-2 text-sm outline-none focus:border-accent/40"
                      />
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() =>
                          save(() => updateNickname(nickname), "닉네임을 저장했어요.")
                        }
                        className="w-full rounded-[12px] border border-border bg-surface py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-soft"
                      >
                        닉네임 저장
                      </button>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-text-muted">
                      파트너 정보는 조회만 가능해요.
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="mb-3 text-[16px] font-semibold text-text-primary">
              함께 설정
            </h2>
            <div className="space-y-3 rounded-[20px] border border-border bg-surface p-4 shadow-[var(--shadow-sm)]">
              <label className="block text-sm">
                <span className="mb-1 block font-semibold text-text-primary">
                  우리의 별명
                </span>
                <input
                  value={pairName}
                  onChange={(e) => setPairName(e.target.value)}
                  className="w-full rounded-[12px] border border-border px-3 py-2 outline-none"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-semibold text-text-primary">
                  기념일
                </span>
                <input
                  type="date"
                  value={anni}
                  onChange={(e) => setAnni(e.target.value)}
                  className="w-full rounded-[12px] border border-border px-3 py-2 outline-none"
                />
              </label>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  save(() =>
                    updateCoupleSettings({
                      pairNickname: pairName,
                      anniversary: anni,
                    }),
                  )
                }
                className="rounded-[12px] bg-text-primary px-4 py-2.5 text-sm font-semibold text-white"
              >
                함께 설정 저장
              </button>
              <p className="text-xs text-text-muted">
                테마 색상 변경은 준비 중이에요.
              </p>
            </div>
          </section>

          <section className="mb-6 rounded-[20px] border border-dashed border-border bg-surface px-5 py-6 text-sm text-text-muted">
            화면 설정(라이트/다크, 글꼴, 밀도)은 준비 중이에요.
          </section>

          <LogoutButton />
        </>
      ) : null}

      {activeTab === "notification" ? (
        <section className="rounded-[20px] border border-border bg-surface p-5 shadow-[var(--shadow-sm)]">
          <h2 className="mb-4 text-[16px] font-semibold">알림 환경설정</h2>
          <label className="mb-3 flex items-center justify-between gap-3 text-sm">
            <span>상대 일기 공개 알림</span>
            <input
              type="checkbox"
              checked={prefDiary}
              onChange={(e) => setPrefDiary(e.target.checked)}
            />
          </label>
          <label className="mb-4 flex items-center justify-between gap-3 text-sm">
            <span>댓글·답글 알림</span>
            <input
              type="checkbox"
              checked={prefComment}
              onChange={(e) => setPrefComment(e.target.checked)}
            />
          </label>
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              save(() =>
                updatePreferences({
                  notifyDiary: prefDiary,
                  notifyComment: prefComment,
                }),
              )
            }
            className="rounded-[12px] bg-text-primary px-4 py-2.5 text-sm font-semibold text-white"
          >
            알림 설정 저장
          </button>
        </section>
      ) : null}

      {activeTab !== "profile" && activeTab !== "notification" ? (
        <div className="rounded-[20px] border border-border bg-surface px-5 py-12 text-center shadow-[var(--shadow-sm)]">
          <p className="text-sm font-medium text-text-primary">준비 중이에요.</p>
          <p className="mt-2 text-xs text-text-muted">
            이 탭의 설정은 다음 단계에서 연결할 예정이에요.
          </p>
        </div>
      ) : null}
    </div>
  );
}
