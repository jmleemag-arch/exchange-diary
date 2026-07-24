import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "우리의 교환일기",
  description: "두 명이 먼저 사용하는 비공개 교환일기 로컬 MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
