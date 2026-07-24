import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "우리의 교환일기",
  description: "서로의 하루를 나누는 따뜻한 커플 교환일기",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
