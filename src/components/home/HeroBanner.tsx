import { heroImage } from "@/data/home";
import { Heart } from "lucide-react";
import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="overflow-hidden rounded-[22px] bg-surface shadow-[var(--shadow)]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#f4efe9] px-7 py-8 sm:px-9 sm:py-10">
          <Heart
            className="mb-4 h-4 w-4 fill-accent text-accent"
            aria-hidden
          />
          <p className="text-[22px] font-semibold leading-snug tracking-tight text-text-primary sm:text-[24px]">
            작은 하루들이 모여
            <br />
            우리를 만들어가요.
          </p>
        </div>
        <div className="relative min-h-[180px] md:min-h-[220px]">
          <Image
            src={heroImage}
            alt="고요한 공간의 화병과 촛불"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>
      </div>
    </section>
  );
}
