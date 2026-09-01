"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, steps } from "@/lib/content";
import ChromeField from "@/components/ui/ChromeField";

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the viewport and drive the track sideways
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = root.current!.querySelector(".pr-track") as HTMLElement;
          const distance = () => track.scrollWidth - window.innerWidth;

          const tl = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              pin: true,
              scrub: 0.7,
              start: "top top",
              end: () => `+=${distance()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          gsap.to(".pr-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              scrub: 0.7,
              start: "top top",
              end: () => `+=${distance()}`,
              invalidateOnRefresh: true,
            },
          });

          // Each panel's photo counter-drifts for depth
          gsap.utils.toArray<HTMLElement>(".pr-img").forEach((img) => {
            gsap.fromTo(
              img,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: img,
                  containerAnimation: tl,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });
        },
      );

      // Mobile: simple stacked reveals
      mm.add("(max-width: 767px)", () => {
        gsap.from(gsap.utils.toArray<HTMLElement>(".pr-panel"), {
          y: 48,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "arc",
          scrollTrigger: { trigger: ".pr-track", start: "top 78%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="process"
      className="relative overflow-hidden bg-paper-3 md:flex md:h-[100svh] md:flex-col"
    >
      <ChromeField className="opacity-70" />
      <div className="container-page relative z-20 flex shrink-0 items-end justify-between gap-6 pb-8 pt-20 md:pb-6 md:pt-[calc(var(--nav-h)+2.5rem)]">
        <div>
          <p className="eyebrow flex items-center gap-3 text-grey-400">
            <span className="h-px w-8 bg-flame-600" />
            04 &nbsp;/&nbsp; How it runs
          </p>
          <h2 className="font-title-tight mt-4 text-[10vw] text-ink sm:text-[6vw] lg:text-[3.4vw]">
            Fourteen weeks,
            <span className="text-grey-300"> start to shipped.</span>
          </h2>
        </div>
        <p className="eyebrow hidden shrink-0 items-center gap-2 text-grey-400 md:flex">
          Drag&nbsp;/&nbsp;Scroll
          <svg
            viewBox="0 0 24 8"
            className="h-2 w-8"
            fill="none"
            stroke="currentColor"
          >
            <path d="M0 4h22M18 1l4 3-4 3" />
          </svg>
        </p>
      </div>

      <div className="pr-track flex flex-col gap-6 px-5 pb-20 md:min-h-0 md:flex-1 md:flex-row md:items-stretch md:gap-0 md:px-0 md:pb-16">
        {steps.map((s, i) => (
          <article
            key={s.no}
            className="pr-panel group relative shrink-0 md:h-full md:w-[48vw] md:pl-[4vw] lg:w-[38vw]"
          >
            <div className="plate relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 md:rounded-[2rem] md:p-8">
              <div className="flex items-start justify-between">
                <span className="font-title-tight text-6xl text-grey-200 transition-colors duration-500 group-hover:text-flame-600 md:text-7xl">
                  {s.no}
                </span>
                <span className="eyebrow rounded-full bg-paper/90 px-3.5 py-2 text-grey-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.9)]">
                  {s.kicker}
                </span>
              </div>

              <h3 className="font-title-tight mt-6 text-4xl text-ink md:text-5xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-grey-500">
                {s.body}
              </p>

              <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-[1.25rem] md:mt-8 md:aspect-auto md:flex-1">
                <div className="pr-img absolute inset-0 scale-[1.18]">
                  <Image
                    src={IMG(s.img, 900)}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-70"
                  style={{ background: "var(--grad-flame)" }}
                />
              </div>
            </div>

            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute right-[-2vw] top-1/2 hidden h-px w-[4vw] bg-ink/12 md:block"
              />
            )}
          </article>
        ))}
        <div className="hidden w-[10vw] shrink-0 md:block" />
      </div>

      {/* Scrub progress */}
      <div className="absolute inset-x-0 bottom-8 z-20 hidden px-[4vw] md:block">
        <div className="h-px w-full bg-ink/8">
          <div className="pr-progress h-px w-full origin-left scale-x-0 bg-flame" />
        </div>
      </div>
    </section>
  );
}
