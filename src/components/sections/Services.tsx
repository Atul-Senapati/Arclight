"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, services } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ChromeField from "@/components/ui/ChromeField";

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(gsap.utils.toArray<HTMLElement>(".srv-row"), {
        yPercent: 36,
        opacity: 0,
        duration: 1.05,
        stagger: 0.08,
        ease: "arc",
        scrollTrigger: { trigger: ".srv-list", start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="relative py-20 md:py-32">
      <ChromeField className="opacity-60" />
      <div className="container-page relative">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <div>
            <p className="eyebrow flex items-center gap-3 text-grey-400">
              <span className="h-px w-8 bg-flame-600" />
              02 &nbsp;/&nbsp; What we do
            </p>
            <h2 className="font-title-tight mt-5 text-[11vw] text-ink sm:text-[7vw] lg:text-[5vw]">
              Five practices.
              <br />
              <span className="text-grey-300">One team.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-grey-500">
            Engagements start at eight weeks. Most clients keep two practices
            running at once &mdash; that is where the compounding happens.
          </p>
        </Reveal>

        <ul className="srv-list border-t border-ink/8">
          {services.map((s) => (
            <li
              key={s.no}
              className="srv-row group relative border-b border-ink/8"
            >
              {/* Ink plate wipes up under the row */}
              <span className="pointer-events-none absolute inset-x-[-1rem] inset-y-1 origin-bottom scale-y-0 rounded-[1.5rem] bg-ink-2 shadow-[var(--lift-lg)] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-top group-hover:scale-y-100 md:inset-x-[-1.5rem]" />

              <a
                href="#contact"
                className="relative flex items-center gap-5 py-7 md:gap-8 md:py-9"
              >
                <span className="eyebrow w-8 shrink-0 text-grey-400 transition-colors duration-500 group-hover:text-flame-500">
                  {s.no}
                </span>

                {/* Thumbnail opens out on hover — no cursor tracking */}
                <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl transition-[width,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:h-20 md:w-0 md:opacity-0 md:group-hover:w-28 md:group-hover:opacity-100">
                  <Image
                    src={IMG(s.img, 500)}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="font-title-tight block text-[8vw] text-ink transition-colors duration-500 group-hover:text-white sm:text-5xl lg:text-[3.4vw]">
                    {s.title}
                  </span>
                  <span className="mt-2 block max-w-lg text-sm leading-relaxed text-grey-500 transition-colors duration-500 group-hover:text-grey-300 md:mt-3">
                    {s.blurb}
                  </span>
                </span>

                <span className="hidden shrink-0 flex-wrap justify-end gap-2 transition-opacity duration-500 lg:flex lg:group-hover:opacity-0">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="eyebrow rounded-full bg-white/70 px-3.5 py-2 text-grey-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.9),var(--lift-sm)]"
                    >
                      {t}
                    </span>
                  ))}
                </span>

                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[var(--lift-sm)] transition-colors duration-500 group-hover:bg-flame-600 md:h-12 md:w-12">
                  <svg
                    viewBox="0 0 18 18"
                    className="h-4 w-4 text-ink transition-all duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4.5 13.5l9-9M6 4.5h7.5V12" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
