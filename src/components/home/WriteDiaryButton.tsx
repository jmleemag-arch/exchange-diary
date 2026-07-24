import { Pencil } from "lucide-react";
import Link from "next/link";

export function WriteDiaryButton() {
  return (
    <div className="mt-6 hidden justify-center lg:flex">
      <Link
        href="#"
        className="inline-flex items-center gap-2 rounded-full bg-[#2c2a28] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(44,42,40,0.2)] transition-transform hover:-translate-y-0.5"
      >
        <Pencil className="h-4 w-4" />
        새 일기 쓰기
      </Link>
    </div>
  );
}
