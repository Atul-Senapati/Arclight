"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, work } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ChromeField from "@/components/ui/ChromeField";
import Button from "@/components/ui/Button";

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".wk-card").forEach((card) => {
        const frame = card.querySelector(".wk-frame")!;
        const img = card.querySelector(".wk-img")!;

        // Clip-path curtain
        gsap.fromTo(
          frame,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.35,
            ease: "arc",
            scrollTrigger: { trigger: card, start: "top 86%", once: true },
          },
        );
        gsap.from(img, {
          scale: 1.35,
          duration: 1.6,
          ease: "arc",
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        });
        gsap.from(card.querySelectorAll(".wk-meta > *"), {
          y: 22,
          opacity: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "arc",
          scrollTrigger: { trigger: card, start: "top 80%", once: true },
        });

        // Continuous parallax inside the frame
        gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="relative py-24 md:py-36">
      <ChromeField className="opacity-55" />
      <div className="container-page relative">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-grey-400">
              <span className="h-px w-8 bg-flame-600" />
              05 &nbsp;/&nbsp; Selected work
            </p>
            <h2 className="font-title-tight mt-5 text-[11vw] text-ink sm:text-[7vw] lg:text-[5vw]">
              Things that
              <br />
              <span className="text-flame">actually shipped.</span>
            </h2>
          </div>
          <Button href="#contact" variant="glass" size="md" icon="arrow">
            All 214 cases
          </Button>
        </Reveal>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-28">
          {work.map((w, i) => (
            <article
              key={w.client}
              className={`wk-card group ${i % 2 === 1 ? "md:mt-28" : ""}`}
            >
              <a href="#contact" className="block">
                <div
                  className={`wk-frame relative overflow-hidden rounded-[1.75rem] bg-grey-100 shadow-[var(--lift-md)] md:rounded-[2rem] ${
                    w.size === "tall" ? "aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                >
                  <div className="wk-img absolute -inset-y-[9%] inset-x-0">
                    <Image
                      src={IMG(w.img, 1200)}
                      alt={w.title}
                      fill
                      sizes="(max-width: 768px) 92vw, 46vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </div>

                  {/* Flame wash on hover */}
                  <div
                    className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-60"
                    style={{ background: "var(--grad-flame)" }}
                  />

                  {/* Result badge */}
                  <div className="glass absolute left-4 top-4 flex items-baseline gap-2 rounded-full px-4 py-2.5 md:left-6 md:top-6">
                    <span className="font-title-tight text-xl text-ink">
                      {w.metric}
                    </span>
                    <span className="eyebrow text-[9px] text-grey-500">
                      {w.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="wk-meta mt-5 md:mt-7">
                  <div className="flex items-center gap-3">
                    <span className="eyebrow text-flame-600">{w.client}</span>
                    <span className="h-px flex-1 bg-ink/10" />
                    <span className="eyebrow text-grey-400">
                      {w.sector} &nbsp;·&nbsp; {w.year}
                    </span>
                  </div>
                  <h3 className="font-title-tight mt-3 text-2xl text-ink md:text-[2vw]">
                    {w.title}
                  </h3>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
