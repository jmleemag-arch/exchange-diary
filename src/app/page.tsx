"use client";

import {
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Heart,
  Image as ImageIcon,
  Menu,
  MessageCircle,
  Pencil,
  Plus,
  Settings,
  Sun,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "오늘의 일기", icon: CalendarDays, active: true },
  { label: "일기 목록", icon: BookOpen },
  { label: "공통 질문", icon: CircleHelp },
  { label: "Our Moments", icon: Heart },
  { label: "알림", icon: Bell },
  { label: "설정", icon: Settings },
];

const diaryItems = [
  { title: "오늘 바다가 정말 예뻤어", date: "2025.07.23 (수)", comments: 8, image: "sea" },
  { title: "새로운 카페를 발견했어", date: "2025.07.22 (화)", comments: 6, image: "cafe" },
  { title: "퇴근길에 하늘이 예뻐서", date: "2025.07.21 (월)", comments: 4, image: "sky" },
];

const calendarDays = Array.from({ length: 35 }, (_, i) => (i < 2 ? null : i - 1));
const markedDays = new Set([3, 5, 6, 7, 9, 10, 11, 12, 13, 15, 18, 19, 20, 23, 24, 25, 26]);

function Avatar({ name, tone }: { name: string; tone: "rose" | "sage" }) {
  return <span className={`avatar avatar-${tone}`}>{name.slice(0, 1)}</span>;
}

export default function Home() {
  const [dark, setDark] = useState(false);

  return (
    <main className={dark ? "app dark" : "app"}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="theme-switch" aria-label="화면 테마">
        <button className={!dark ? "selected" : ""} onClick={() => setDark(false)}>Light</button>
        <button className={dark ? "selected" : ""} onClick={() => setDark(true)}>Dark</button>
      </div>

      <section className="dashboard">
        <aside className="sidebar">
          <div className="brand"><Heart fill="currentColor" /><strong>우리의 교환일기</strong></div>
          <nav>
            {navItems.map(({ label, icon: Icon, active }) => (
              <button key={label} className={active ? "nav-active" : ""}>
                <Icon /><span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="together">
            <span>우리가 함께한 시간</span>
            <strong>D + 128</strong>
            <small>2025.03.18부터</small>
          </div>
        </aside>

        <div className="mobile-header">
          <Menu />
          <strong><Heart fill="currentColor" /> 우리의 교환일기</strong>
          <Bell />
        </div>

        <section className="content">
          <header className="page-header">
            <div>
              <h1>오늘의 교환일기 <Sun /></h1>
              <p>매일 서로의 하루를 나누며 더 가까워져요.</p>
            </div>
            <div className="profile-actions">
              <button aria-label="알림"><Bell /></button>
              <Avatar name="지민" tone="rose" />
              <ChevronDown />
            </div>
          </header>

          <section className="hero">
            <img src="/diary-hero.png" alt="따뜻한 빛을 받은 화병과 촛불" />
            <div className="hero-copy">
              <p>작은 하루들이 모여<br />우리를 만들어가요.</p>
              <Heart />
            </div>
          </section>

          <section className="writing-section">
            <h2>오늘의 작성 현황</h2>
            <div className="writing-card">
              <div className="writer">
                <Avatar name="지민" tone="rose" />
                <div><strong>지민</strong><span>작성 완료 <Check /></span></div>
              </div>
              <div className="today-date"><strong>2025.07.24 (목)</strong><span>오늘</span></div>
              <div className="writer writer-right">
                <Avatar name="민우" tone="sage" />
                <div><strong>민우</strong><span>작성 완료 <Check /></span></div>
              </div>
            </div>
          </section>

          <section className="recent">
            <h2>최근 일기</h2>
            <div className="diary-list">
              {diaryItems.map((item) => (
                <button className="diary-item" key={item.title}>
                  <span className={`thumb thumb-${item.image}`} />
                  <span className="diary-copy">
                    <strong>{item.title}</strong>
                    <small>{item.date} <span><MessageCircle /> {item.comments}</span></small>
                  </span>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </section>

          <button className="write-button"><Pencil /> 새 일기 쓰기</button>
        </section>

        <aside className="rightbar">
          <section className="side-card question-card">
            <span className="quote">“</span>
            <h2>오늘의 공통 질문</h2>
            <p>요즘 가장 감사한 일은<br />무엇인가요?</p>
            <button>답변 보기</button>
            <div className="leaf-art">⌇<br />⌇</div>
          </section>

          <section className="side-card calendar-card">
            <h2>캘린더</h2>
            <div className="calendar-head"><ChevronLeft /><strong>2025.07</strong><ChevronRight /></div>
            <div className="weekdays">{["S","M","T","W","T","F","S"].map((d, i) => <span key={`${d}-${i}`}>{d}</span>)}</div>
            <div className="calendar-grid">
              {calendarDays.map((day, i) => (
                <span key={i} className={day === 24 ? "calendar-today" : ""}>
                  {day}<i className={day && markedDays.has(day) ? "marked" : ""} />
                </span>
              ))}
            </div>
          </section>

          <section className="side-card moments-card">
            <div className="card-title"><h2>Our Moments</h2><button>더보기 <ChevronRight /></button></div>
            <div className="moments">
              <span className="moment moment-sea" />
              <span className="moment moment-cafe" />
              <span className="moment moment-tree" />
            </div>
            <div className="memory-cta">
              <div><strong>추억을 모아보세요</strong><p>사진과 함께 우리의 순간을 기록해요.</p></div>
              <button aria-label="추억 추가"><Plus /></button>
            </div>
          </section>
        </aside>

        <nav className="bottom-nav">
          {[
            { label: "오늘의 일기", icon: CalendarDays, active: true },
            { label: "일기 목록", icon: BookOpen },
            { label: "", icon: Plus, center: true },
            { label: "알림", icon: Bell },
            { label: "설정", icon: Settings },
          ].map(({ label, icon: Icon, active, center }, index) => (
            <button key={`${label}-${index}`} className={`${active ? "active" : ""} ${center ? "center" : ""}`}>
              <Icon /><span>{label}</span>
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}
