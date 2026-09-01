"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, photos, results } from "@/lib/content";
import ChromeField from "@/components/ui/ChromeField";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";

const PATHS = {
  stack: "M12 3.5 21 8l-9 4.5L3 8l9-4.5ZM3 12.5 12 17l9-4.5M3 16.5 12 21l9-4.5",
  trend: "M3.5 17 10 10.5l3.5 3.5L21 6.5M15 6.5h6v6",
  repeat:
    "M4 10a6.5 6.5 0 0 1 11-4M20 14a6.5 6.5 0 0 1-11 4M4 5.5V10h4.5M20 18.5V14h-4.5",
} as const;

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Rules draw out from the left as the block arrives
      gsap.from(gsap.utils.toArray<HTMLElement>(".ab-rule"), {
        scaleX: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: "arc",
        scrollTrigger: { trigger: ".ab-body", start: "top 84%", once: true },
      });

      gsap.from(gsap.utils.toArray<HTMLElement>(".ab-row"), {
        y: 26,
        opacity: 0,
        duration: 0.95,
        stagger: 0.11,
        ease: "arc",
        scrollTrigger: { trigger: ".ab-body", start: "top 82%", once: true },
      });

      // Figures count up once
      gsap.utils.toArray<HTMLElement>(".ab-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.9,
          ease: "power3.out",
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Photo: curtain up, then drift
      gsap.fromTo(
        ".ab-figure",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "arc",
          scrollTrigger: {
            trigger: ".ab-figure",
            start: "top 88%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".ab-img",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: ".ab-figure",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <ChromeField className="opacity-45" />

      {/* One gradient, shared by every glyph below */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="ab-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#ff3b21" />
            <stop offset="0.55" stopColor="#ff5c1a" />
            <stop offset="1" stopColor="#ffb457" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-page relative">
        <Reveal stagger={0.1}>
          <p className="eyebrow flex items-center gap-3 text-grey-400">
            <span className="h-px w-8 bg-flame-600" />
            02 &nbsp;/&nbsp; About us
          </p>
        </Reveal>

        <SplitReveal
          as="h2"
          type="lines"
          className="font-title-tight mt-9 max-w-[68rem] text-[clamp(2.1rem,6.2vw,5.1rem)] text-ink md:mt-12"
        >
          At our core, we believe the only honest measure of a firm is what
          shipped
        </SplitReveal>
      </div>

      {/* ---------- Results and photo ---------- */}
      <div className="ab-body relative mt-16 md:mt-24">
        <div className="ab-rule h-px w-full origin-left bg-ink/12" />

        <div className="grid lg:grid-cols-2">
          {/* Left: the numbers, aligned to the container's left edge */}
          <div className="px-5 pb-2 pt-9 md:px-8 lg:px-0 lg:pb-10 lg:pl-[max(2rem,calc((100vw-90rem)/2+3rem))] lg:pr-16">
            <p className="eyebrow max-w-sm leading-[1.7] text-grey-400">
              Eleven years of engagements, measured the same way every time
              &mdash; by what the client kept.
            </p>

            <div className="ab-rule mt-9 h-px w-full origin-left bg-ink/10" />

            {results.map((r, i) => (
              <div key={r.label}>
                <div className="ab-row flex items-center gap-5 py-7 md:gap-6 md:py-8">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#272727] bg-[image:var(--face-dark)] shadow-[var(--key-dark)] md:h-16 md:w-16">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 md:h-7 md:w-7"
                      fill="none"
                      stroke="url(#ab-grad)"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={PATHS[r.icon]} />
                    </svg>
                  </span>

                  <div className="min-w-0">
                    <p className="font-title-tight text-[2.25rem] text-ink md:text-[3rem]">
                      <span className="ab-num" data-value={r.value}>
                        0
                      </span>
                      <span className="text-flame">{r.suffix}</span>
                    </p>
                    <p className="mt-1 text-sm text-grey-500 md:text-[0.9375rem]">
                      {r.label}
                    </p>
                  </div>
                </div>
                {i < results.length - 1 && (
                  <div className="ab-rule h-px w-full origin-left bg-ink/10" />
                )}
              </div>
            ))}
          </div>

          {/* Right: photo, bleeding to the edge */}
          <figure className="ab-figure relative mt-8 min-h-[20rem] overflow-hidden lg:mt-0 lg:min-h-[36rem]">
            <div className="ab-img absolute -inset-y-[8%] inset-x-0">
              <Image
                src={IMG(photos.loft, 1600)}
                alt="The Arclight floor, London"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale contrast-[1.12]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-3/55 via-transparent to-ink-3/20" />

            {/* Measured ruler — every fourth tick picks up the accent */}
            <div
              aria-hidden
              className="absolute inset-x-7 top-7 flex items-start justify-between md:inset-x-9 md:top-9"
            >
              {Array.from({ length: 21 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i % 4 === 0
                      ? "h-3.5 w-px bg-flame-500"
                      : "h-1.5 w-px bg-white/45"
                  }
                />
              ))}
            </div>

            <figcaption className="glass-dark absolute bottom-6 left-6 rounded-full px-4 py-2 md:bottom-8 md:left-8">
              <span className="eyebrow text-white">
                Arclight floor &nbsp;·&nbsp; London
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="ab-rule h-px w-full origin-left bg-ink/12" />
      </div>
    </section>
  );
}
