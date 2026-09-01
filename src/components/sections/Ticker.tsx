"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Two full-bleed tapes crossing in an X — flame carrying the practices,
 * ink carrying the proof — scrolling in opposite directions, both leaning
 * into your scroll velocity.
 */
const FLAME_WORDS = ["Strategy", "Brand", "Product", "Growth", "AI Systems"];
const INK_WORDS = [
  "214 engagements",
  "96% re-hire",
  "Four continents",
  "Est. 2014",
  "Partners only",
];

function Spark({ className, fill }: { className: string; fill: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8Z"
        fill={fill}
        fillOpacity="0.9"
      />
    </svg>
  );
}

function Row({
  words,
  row,
  spark,
  dim,
}: {
  words: string[];
  row: string;
  spark: string;
  dim?: boolean;
}) {
  return (
    <div
      className={`${row} flex shrink-0 items-center whitespace-nowrap will-change-transform`}
    >
      {words.map((w, i) => (
        <span key={w} className="flex items-center">
          <span
            className={`font-title-tight px-7 text-[clamp(1.05rem,2.3vw,1.9rem)] leading-none md:px-10 ${
              dim && i % 2 === 1 ? "text-white/45" : "text-white"
            }`}
          >
            {w}
          </span>
          <Spark
            className="h-[0.9em] w-[0.9em] shrink-0 text-[clamp(1.05rem,2.3vw,1.9rem)]"
            fill={spark}
          />
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const calm = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (calm) return;

      const flameRows = gsap.utils.toArray<HTMLElement>(".tape-flame-row");
      const inkRows = gsap.utils.toArray<HTMLElement>(".tape-ink-row");

      // Opposite directions; both loops seamless over duplicated rows
      const loopFlame = gsap.to(flameRows, {
        xPercent: -100,
        repeat: -1,
        duration: 30,
        ease: "none",
      });
      const loopInk = gsap.fromTo(
        inkRows,
        { xPercent: -100 },
        { xPercent: 0, repeat: -1, duration: 34, ease: "none" },
      );

      // Scroll velocity leans and accelerates both tapes
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const speed =
            gsap.utils.clamp(0.35, 5, Math.abs(v) / 420 + 0.55) *
            (self.direction < 0 ? -1 : 1);
          loopFlame.timeScale(speed);
          loopInk.timeScale(speed);
          gsap.to([...flameRows, ...inkRows], {
            skewX: gsap.utils.clamp(-10, 10, v / -280),
            duration: 0.5,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });

      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="relative overflow-hidden py-4 md:py-6"
    >
      <div className="relative h-[clamp(7.5rem,14vw,11.5rem)]">
        {/* Ink tape — under, tilted up to the right */}
        <div className="absolute inset-x-[-6%] top-1/2 -translate-y-1/2 rotate-[4deg] bg-ink-2 py-[clamp(0.8rem,1.5vw,1.3rem)] shadow-[0_18px_40px_-18px_rgba(16,16,20,0.55)]">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
            <Row words={INK_WORDS} row="tape-ink-row" spark="#ff5c1a" dim />
            <Row words={INK_WORDS} row="tape-ink-row" spark="#ff5c1a" dim />
          </div>
        </div>

        {/* Flame tape — over, tilted down to the right */}
        <div className="bg-flame absolute inset-x-[-6%] top-1/2 -translate-y-1/2 rotate-[-4deg] py-[clamp(0.8rem,1.5vw,1.3rem)] shadow-[0_22px_50px_-18px_rgba(224,34,0,0.5)]">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
            <Row words={FLAME_WORDS} row="tape-flame-row" spark="#ffffff" />
            <Row words={FLAME_WORDS} row="tape-flame-row" spark="#ffffff" />
          </div>
        </div>
      </div>
    </div>
  );
}
