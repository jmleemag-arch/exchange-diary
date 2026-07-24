"use client";

import { logout } from "@/app/actions/auth";
import { LogOut } from "lucide-react";

export function LogoutButton({ className = "" }: { className?: string }) {
  return (
    <form action={logout}>
      <button
        type="submit"
        className={`inline-flex items-center gap-2 rounded-[12px] border border-border px-3.5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-soft ${className}`}
      >
        <LogOut className="h-4 w-4" />
        로그아웃
      </button>
    </form>
  );
}
