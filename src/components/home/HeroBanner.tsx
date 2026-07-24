import { Heart } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-[18px] border border-border bg-surface shadow-[var(--shadow)]">
      <div className="grid min-h-[180px] grid-cols-1 sm:min-h-[200px] sm:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-8">
          <Heart
            className="mb-3 h-4 w-4 text-accent"
            fill="currentColor"
            aria-hidden
          />
          <p className="max-w-[16ch] text-[22px] font-semibold leading-snug tracking-tight text-text-primary sm:text-[24px]">
            작은 하루들이 모여
            <br />
            우리를 만들어가요.
          </p>
        </div>

        <div
          aria-hidden
          className="relative min-h-[140px] overflow-hidden bg-[linear-gradient(145deg,#f4eee8_0%,#efe6df_45%,#f7f1ec_100%)] sm:min-h-full"
        >
          <div className="absolute -right-6 top-4 h-28 w-28 rounded-full bg-[#e8ddd3]/70" />
          <div className="absolute bottom-0 left-6 h-24 w-24 rounded-full bg-[#dccfc3]/55" />
          <div className="absolute right-10 top-1/2 h-16 w-2 -translate-y-1/2 rounded-full bg-[#cbb9a8]/80" />
          <div className="absolute right-[4.5rem] top-[38%] h-20 w-20 rounded-full border border-[#d7c8ba]/bg-[#efe4da]/80" />
          <div className="absolute bottom-5 right-16 h-10 w-16 rounded-full bg-[#e5d7ca]" />
        </div>
      </div>
    </section>
  );
}
