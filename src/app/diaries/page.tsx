import { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { DiaryListFeed } from "@/components/diaries/DiaryListFeed";
import { DiaryListHeader } from "@/components/diaries/DiaryListHeader";
import { DiaryListPagination } from "@/components/diaries/DiaryListPagination";
import { DiaryListToolbar } from "@/components/diaries/DiaryListToolbar";
import { MiniCalendar } from "@/components/home/MiniCalendar";
import { MomentsCard } from "@/components/moments/MomentsCard";
import { getDiaryList, getPublishedDatesInMonth } from "@/app/actions/diaries";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DiariesPage({ searchParams }: Props) {
  const params = await searchParams;
  const authorId =
    typeof params.authorId === "string" ? params.authorId : undefined;
  const date = typeof params.date === "string" ? params.date : undefined;
  const q = typeof params.q === "string" ? params.q : undefined;
  const page = Number(typeof params.page === "string" ? params.page : "1") || 1;

  const [result, users] = await Promise.all([
    getDiaryList({ authorId, date, q, page, pageSize: 10 }),
    prisma.user.findMany({
      where: { loginKey: { in: ["jimin", "minwoo"] } },
      orderBy: { loginKey: "asc" },
      select: { id: true, nickname: true },
    }),
  ]);

  const now = new Date();
  const markedDays = await getPublishedDatesInMonth(
    now.getFullYear(),
    now.getMonth() + 1,
  );

  const query = new URLSearchParams();
  if (authorId) query.set("authorId", authorId);
  if (date) query.set("date", date);
  if (q) query.set("q", q);

  return (
    <AppShell activeNavId="list">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <DiaryListHeader />
            <Suspense fallback={null}>
              <DiaryListToolbar users={users} />
            </Suspense>
            <DiaryListFeed items={result.items} />
            <DiaryListPagination
              page={result.page}
              totalPages={result.totalPages}
              queryString={query.toString()}
            />
          </div>

          <aside className="flex flex-col gap-4 lg:pt-1">
            <MiniCalendar
              initialYear={now.getFullYear()}
              initialMonth={now.getMonth() + 1}
              markedDays={markedDays}
              today={now.getDate()}
            />
            <MomentsCard />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
