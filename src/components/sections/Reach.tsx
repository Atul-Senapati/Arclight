"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reachNote } from "@/lib/content";
import Button from "@/components/ui/Button";
import Stars from "@/components/ui/Stars";

export default function Reach() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(gsap.utils.toArray<HTMLElement>(".rc-card"), {
        y: 48,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "arc",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="reach"
      className="relative px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto grid max-w-[90rem] gap-5 lg:grid-cols-[1.25fr_1fr]">
        {/* ---------- Availability card ---------- */}
        <article
          className="rc-card noise relative flex min-h-[30rem] flex-col items-center overflow-hidden rounded-[2rem] bg-ink-2 px-7 pt-14 text-center md:min-h-[36rem] md:rounded-[2.5rem] md:pt-20"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.35), var(--lift-card-dark)",
          }}
        >
          {/* Background: laptop mockup shipped for this card */}
          <div className="absolute inset-0">
            <Image
              src="/worldwide-mockup.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-[46%_34%]"
              priority={false}
            />
            {/* Keeps the badge/heading/button legible over the photo */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink-3/85 via-ink-3/35 to-ink-3/80" />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-3 to-transparent" />
          </div>

          <div className="relative flex flex-col items-center">
            <p className="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500"
                style={{
                  animation: "pulse-dot 2.4s var(--ease-swift) infinite",
                }}
              />
              <span className="text-[0.8125rem] font-medium text-grey-300">
                Available for worldwide engagements
              </span>
            </p>

            <h2 className="font-title-tight mt-7 max-w-xl text-[clamp(1.9rem,4.2vw,3.4rem)] text-white">
              Based in <span className="text-flame">London,</span>
              <br />
              shipping worldwide.
            </h2>

            <div className="mt-8">
              <Button href="#contact" size="md" icon="arrow">
                Start a project
              </Button>
            </div>
          </div>
        </article>

        {/* ---------- Right stack ---------- */}
        <div className="flex flex-col gap-5">
          {/* Rating plate with ghost figure */}
          <article
            className="rc-card plate relative flex-1 overflow-hidden rounded-[2rem] p-7 md:rounded-[2.5rem] md:p-9"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,1), var(--lift-card)",
            }}
          >
            <p
              aria-hidden
              className="font-title-tight pointer-events-none absolute -bottom-[0.18em] -right-[0.04em] select-none leading-none tracking-[-0.05em] text-ink/[0.06]"
              style={{ fontSize: "clamp(7rem, 13vw, 12rem)" }}
            >
              214
            </p>

            <p className="relative max-w-md text-[1.0625rem] leading-relaxed text-ink/85 md:text-lg">
              {reachNote.line}
            </p>

            <div className="relative mt-9 flex items-center gap-3 md:mt-12">
              <Stars value={4.8} />
              <p className="font-title-tight text-lg leading-none text-ink">
                4.8<span className="text-grey-400">/5</span>
              </p>
              <span className="h-4 w-px bg-ink/12" />
              <p className="text-sm text-grey-500">214 engagements, rated</p>
            </div>
          </article>

          {/* Duotone quote plate */}
          <article
            className="rc-card plate relative flex-1 overflow-hidden rounded-[2rem] p-7 md:rounded-[2.5rem] md:p-9"
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,1), var(--lift-card)",
            }}
          >
            <div className="flex h-full items-center gap-6 md:gap-8">
              {/* Finished duotone portrait — rendered as supplied */}
              <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-[1.25rem] shadow-[var(--lift-md)] md:w-36">
                <Image
                  src={reachNote.img}
                  alt={reachNote.name}
                  fill
                  sizes="180px"
                  className="object-cover object-[50%_18%]"
                />
              </div>

              <figure className="min-w-0">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="url(#rc-q)"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="rc-q" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" stopColor="#ff3b21" />
                      <stop offset="1" stopColor="#ffb457" />
                    </linearGradient>
                  </defs>
                  <path d="M10.2 5.5C6.6 7.6 4.5 10.6 4.5 14.2c0 2.8 1.8 4.6 4.1 4.6 2.1 0 3.7-1.5 3.7-3.7 0-2-1.4-3.4-3.3-3.4-.4 0-.8 0-1 .1.5-2 2-3.8 4-5L10.2 5.5Zm9 0c-3.6 2.1-5.7 5.1-5.7 8.7 0 2.8 1.8 4.6 4.1 4.6 2.1 0 3.7-1.5 3.7-3.7 0-2-1.4-3.4-3.3-3.4-.4 0-.8 0-1 .1.5-2 2-3.8 4-5L19.2 5.5Z" />
                </svg>
                <blockquote className="mt-3 text-[1.0625rem] leading-snug text-ink/85 md:text-lg">
                  {reachNote.quote}
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-medium text-ink">{reachNote.name}</span>
                  <span className="text-grey-400">
                    {" "}
                    &nbsp;·&nbsp; {reachNote.role}
                  </span>
                </figcaption>
              </figure>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
