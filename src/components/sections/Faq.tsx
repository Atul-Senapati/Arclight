"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { faqs } from "@/lib/content";
import Button from "@/components/ui/Button";
import ChromeField from "@/components/ui/ChromeField";
import Reveal from "@/components/ui/Reveal";

export default function Faq() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  // Cards rise in as the stack arrives
  useGSAP(
    () => {
      gsap.from(gsap.utils.toArray<HTMLElement>(".faq-card"), {
        y: 34,
        opacity: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: "arc",
        scrollTrigger: { trigger: ".faq-stack", start: "top 84%", once: true },
      });
    },
    { scope: root },
  );

  // Height is animated rather than transitioned so the panel can't jump when
  // the answer reflows, and ScrollTrigger stays in sync with the new height.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".faq-panel").forEach((panel) => {
        const isOpen = panel.dataset.open === "true";
        gsap.to(panel, {
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          duration: 0.55,
          ease: "arc",
          overwrite: true,
          onComplete: () => ScrollTrigger.refresh(),
        });
      });
    },
    { dependencies: [open], scope: root },
  );

  return (
    <section ref={root} id="faq" className="relative py-24 md:py-32">
      <ChromeField className="opacity-50" />

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ---------- Heading, held while the list scrolls ---------- */}
        <div>
          <div className="lg:sticky lg:top-32">
            <Reveal stagger={0.1}>
              <p className="eyebrow flex items-center gap-3 text-grey-400">
                <span className="h-px w-8 bg-flame-600" />
                05 &nbsp;/&nbsp; Questions
              </p>

              <h2 className="font-title-tight mt-6 text-[clamp(1.9rem,4.6vw,3.5rem)] text-ink">
                The things clients
                <br />
                <span className="text-grey-300">ask before signing.</span>
              </h2>

              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-grey-500">
                Short answers, no hedging. Anything not covered here, ask a
                partner directly — you will get a reply the same day.
              </p>

              <div className="mt-8">
                <Button href="#contact" size="md" icon="arrow">
                  Ask a partner
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------- The stack ---------- */}
        <div className="faq-stack flex flex-col gap-3.5">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <article
                key={f.q}
                className={`faq-card group relative rounded-[1.5rem] transition-[transform,box-shadow] duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:rounded-[1.75rem] ${
                  isOpen ? "-translate-y-0.5" : "hover:-translate-y-px"
                }`}
                style={{
                  background:
                    "linear-gradient(158deg, #fdfdfe 0%, #f0eff4 100%)",
                  boxShadow: isOpen
                    ? "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(24,24,30,0.05), var(--lift-card)"
                    : "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(24,24,30,0.05), var(--lift-md)",
                }}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 rounded-[1.5rem] px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-600/40 md:gap-6 md:px-8 md:py-6"
                  >
                    <span
                      className={`eyebrow w-5 shrink-0 transition-colors duration-500 ${
                        isOpen ? "text-flame" : "text-grey-400"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="font-title flex-1 text-[1.0625rem] text-ink md:text-xl">
                      {f.q}
                    </span>

                    {/* Keycap toggle */}
                    <span
                      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#272727] bg-[image:var(--face-dark)] shadow-[var(--key-dark)] md:h-10 md:w-10"
                      aria-hidden
                    >
                      <span className="absolute h-[1.5px] w-3.5 rounded-full bg-white md:w-4" />
                      <span
                        className="absolute h-[1.5px] w-3.5 rounded-full bg-white transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:w-4"
                        style={{
                          transform: isOpen ? "rotate(0deg)" : "rotate(90deg)",
                        }}
                      />
                    </span>
                  </button>
                </h3>

                {/* Answer — height owned by GSAP, so start closed unless first */}
                <div
                  id={`faq-panel-${i}`}
                  className="faq-panel overflow-hidden"
                  data-open={isOpen}
                  style={i === 0 ? undefined : { height: 0, opacity: 0 }}
                >
                  <div className="px-6 pb-6 pl-6 md:px-8 md:pb-7">
                    <div className="mb-4 h-px w-full bg-ink/8" />
                    <p className="max-w-xl text-[0.9375rem] leading-relaxed text-grey-500 md:pl-11">
                      {f.a}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
