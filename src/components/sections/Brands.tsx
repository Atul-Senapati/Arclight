"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { clients } from "@/lib/content";

function Row() {
  return (
    <div
      aria-hidden
      className="br-row flex shrink-0 items-center gap-14 pr-14 will-change-transform md:gap-[4.5rem] md:pr-[4.5rem]"
    >
      {clients.map((c) => (
        <span
          key={c.name}
          className="flex shrink-0 items-center gap-2.5 text-grey-400"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 md:h-7 md:w-7"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d={c.glyph} />
          </svg>
          <span className="font-title-tight whitespace-nowrap text-lg md:text-xl">
            {c.name}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Brands() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Two identical rows translated by their own width — seamless either way
      const loop = gsap.to(gsap.utils.toArray<HTMLElement>(".br-row"), {
        xPercent: -100,
        repeat: -1,
        duration: 34,
        ease: "none",
      });

      gsap.from(root.current, {
        opacity: 0,
        duration: 1,
        ease: "arc",
        scrollTrigger: { trigger: root.current, start: "top 96%", once: true },
      });

      return () => loop.kill();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Clients"
      className="relative py-11 md:py-14"
    >
      {/* Hairline that fades out at both ends */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative flex flex-col gap-8 md:flex-row md:items-center md:gap-14">
        <p className="shrink-0 text-sm leading-[1.5] text-grey-600 md:max-w-[9rem]">
          Trusted by 100+
          <br className="hidden md:block" /> top-tier brands
        </p>

        {/* Marquee, masked so marks dissolve rather than clip at the edges */}
        <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_7%,#000_93%,transparent_100%)]">
          <div className="flex">
            <Row />
            <Row />
          </div>
        </div>
      </div>
    </section>
  );
}
