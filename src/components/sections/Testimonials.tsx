"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, testimonials } from "@/lib/content";
import ChromeField from "@/components/ui/ChromeField";

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(".tm-card");
          cards.forEach((card, i) => {
            if (i === cards.length - 1) return;
            // Cards recede as the next one slides over them
            gsap.to(card, {
              scale: 0.9 - (cards.length - 2 - i) * 0.015,
              yPercent: -4,
              filter: "brightness(0.72)",
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top 78%",
                end: "top 22%",
                scrub: 0.6,
              },
            });
          });
        },
      );

      gsap.from(gsap.utils.toArray<HTMLElement>(".tm-mark"), {
        scale: 0.4,
        opacity: 0,
        rotate: -18,
        duration: 1.2,
        ease: "arc",
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="noise relative bg-ink-2 py-24 text-white md:py-32"
    >
      <ChromeField tone="dark" />

      <div className="container-page relative">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
          <div>
            <p className="eyebrow flex items-center gap-3 text-grey-500">
              <span className="h-px w-8 bg-flame-500" />
              05 &nbsp;/&nbsp; In their words
            </p>
            <h2 className="font-title-tight mt-5 text-[11vw] sm:text-[7vw] lg:text-[4.8vw]">
              The part we
              <br />
              <span className="text-grey-600">
                can&rsquo;t write ourselves.
              </span>
            </h2>
          </div>
          <svg
            className="tm-mark h-20 w-20 shrink-0 md:h-32 md:w-32"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M42 22C28 30 20 43 20 58c0 12 8 20 18 20s17-7 17-17-7-16-16-16c-2 0-4 .3-5 .8C36 38 42 30 50 25zM92 22C78 30 70 43 70 58c0 12 8 20 18 20s17-7 17-17-7-16-16-16"
              stroke="url(#qg)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="qg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ff3d00" />
                <stop offset="1" stopColor="#ffc93c" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex flex-col gap-6 md:gap-0">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="tm-card glass-dark origin-top overflow-hidden rounded-[1.75rem] bg-ink-3/80 will-change-transform md:rounded-[2.25rem] md:sticky"
              style={{ top: `${7 + i * 2.5}rem` }}
            >
              <div className="grid gap-0 md:grid-cols-12">
                <div className="relative aspect-[16/9] md:col-span-4 md:aspect-auto">
                  <Image
                    src={IMG(t.img, 800)}
                    alt={t.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink-3/40 to-ink-3/90" />
                  <span className="eyebrow absolute left-5 top-5 text-flame-400">
                    0{i + 1}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-8 p-7 md:col-span-8 md:p-12">
                  <blockquote className="font-title text-2xl leading-[1.16] sm:text-3xl lg:text-[2.35vw]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                    <div>
                      <p className="font-title text-lg">{t.name}</p>
                      <p className="text-sm text-grey-500">{t.role}</p>
                    </div>
                    <span className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <span
                          key={s}
                          className="h-1.5 w-1.5 rounded-full bg-flame-500"
                        />
                      ))}
                    </span>
                  </figcaption>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
