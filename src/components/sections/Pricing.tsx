"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { plans } from "@/lib/content";
import Button from "@/components/ui/Button";
import ChromeField from "@/components/ui/ChromeField";
import Reveal from "@/components/ui/Reveal";

const money = (n: number) => `£${n.toLocaleString("en-GB")}`;

/**
 * Rolls between prices instead of swapping them. The JSX text is captured once
 * and never changes, so React never re-patches this node and GSAP can own its
 * textContent outright — no fighting over the DOM.
 */
function Amount({
  value,
  className,
  style,
}: {
  value: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [initial] = useState(value); // captured at mount, never re-renders
  const shown = useRef(value);

  useGSAP(
    () => {
      const el = ref.current!;
      if (shown.current === value) {
        el.textContent = money(value);
        return;
      }
      const obj = { v: shown.current };
      gsap.to(obj, {
        v: value,
        duration: 0.8,
        ease: "power2.inOut",
        snap: { v: 100 },
        onUpdate: () => {
          el.textContent = money(Math.round(obj.v));
        },
        onComplete: () => {
          shown.current = value;
        },
      });
    },
    { dependencies: [value] },
  );

  return (
    <span ref={ref} className={className} style={style}>
      {money(initial)}
    </span>
  );
}

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.4 5.4a3.2 3.2 0 0 1 0 6.2M17.8 20a6.2 6.2 0 0 0-1.6-4.2" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 21h17M5 21V6.5L13 3v18M13 9.5h6V21" />
      <path d="M8 8.5h2M8 12h2M8 15.5h2M15.5 13h1M15.5 16.5h1" />
    </svg>
  );
}

export default function Pricing() {
  const root = useRef<HTMLElement>(null);
  const [annual, setAnnual] = useState(true);

  useGSAP(
    () => {
      gsap.from(gsap.utils.toArray<HTMLElement>(".pl-card"), {
        y: 56,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "arc",
        scrollTrigger: { trigger: ".pl-grid", start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  // The figures roll on their own (see Amount); only the swapped words need
  // easing in, so they don't pop while the numbers are still moving.
  useGSAP(
    () => {
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".pl-term"),
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "arc" },
      );
    },
    { dependencies: [annual], scope: root },
  );

  return (
    <section ref={root} id="pricing" className="relative py-24 md:py-32">
      <ChromeField className="opacity-50" />

      <div className="container-page relative">
        {/* ---------- Heading, with the term switch set into it ---------- */}
        <Reveal className="max-w-4xl" stagger={0.1}>
          <p className="eyebrow flex items-center gap-3 text-grey-400">
            <span className="h-px w-8 bg-flame-600" />
            04 &nbsp;/&nbsp; Pricing
          </p>

          <h2
            className="font-title-tight mt-6 text-ink/85"
            style={{ fontSize: "clamp(1.9rem, 5.4vw, 4.25rem)" }}
          >
            From pilot to enterprise
            <br />
            clear scope, transparent costs
            <br />
            <span className="inline-flex items-center gap-[0.3em] align-middle">
              <button
                type="button"
                role="switch"
                aria-checked={annual}
                aria-label="Bill annually"
                onClick={() => setAnnual((v) => !v)}
                className="relative inline-flex h-[0.92em] w-[1.95em] shrink-0 items-center rounded-full bg-grey-200 p-[0.09em] transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-flame-600/30"
                style={{
                  boxShadow: annual
                    ? "0 0.14em 0.55em rgba(255,59,33,0.55), 0 0.4em 1.5em rgba(255,59,33,0.42), inset 0 1px 0 rgba(255,255,255,0.32)"
                    : "inset 0 1px 2px rgba(24,24,30,0.14)",
                }}
              >
                {/* A gradient can't animate to a flat colour, so it rides on
                    its own layer and fades instead. */}
                <span
                  aria-hidden
                  className="bg-flame absolute inset-0 rounded-full transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ opacity: annual ? 1 : 0 }}
                />
                <span
                  className={`relative block h-[0.74em] w-[0.74em] rounded-full bg-white shadow-[0_1px_3px_rgba(24,24,30,0.28)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    annual ? "translate-x-[1.03em]" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="pl-term">{annual ? "annually" : "monthly"}</span>
            </span>
          </h2>
        </Reveal>

        {/* ---------- Cards ---------- */}
        <div className="pl-grid mt-14 grid items-stretch gap-6 md:mt-20 lg:grid-cols-2">
          {plans.map((p) => {
            const dark = p.tone === "dark";
            return (
              <article
                key={p.name}
                className="pl-card relative overflow-hidden rounded-[2rem] p-7 md:rounded-[2.5rem] md:p-10"
                style={{
                  background: dark
                    ? "linear-gradient(158deg, #26262a 0%, #16161a 100%)"
                    : "linear-gradient(158deg, #fdfdfe 0%, #eff0f3 100%)",
                  boxShadow: dark
                    ? "inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.35), var(--lift-card-dark)"
                    : "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(24,24,30,0.05), var(--lift-card)",
                }}
              >
                {/* Soft light pooling behind the call to action */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-[4%] top-[14%] h-64 w-64 rounded-full blur-[55px]"
                  style={{
                    background: dark
                      ? "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 68%)"
                      : "radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 68%)",
                  }}
                />

                <div className="relative">
                  {/* Plan */}
                  <div className="flex items-center gap-3">
                    {dark ? (
                      <BuildingIcon
                        className={`h-[1.15rem] w-[1.15rem] shrink-0 ${dark ? "text-white" : "text-ink"}`}
                      />
                    ) : (
                      <PeopleIcon className="h-[1.15rem] w-[1.15rem] shrink-0 text-ink" />
                    )}
                    <span
                      className={`text-[0.9375rem] font-semibold ${dark ? "text-white" : "text-ink"}`}
                    >
                      {p.name}
                    </span>
                    <span
                      className={`h-4 w-px ${dark ? "bg-white/18" : "bg-ink/12"}`}
                    />
                    <span
                      className={`text-[0.9375rem] ${dark ? "text-grey-400" : "text-grey-500"}`}
                    >
                      {p.audience}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-9 flex flex-wrap items-end justify-between gap-x-6 gap-y-5 md:mt-11">
                    <p className="flex items-baseline gap-2.5">
                      <Amount
                        value={annual ? p.annual : p.monthly}
                        className={`font-display font-light tabular-nums tracking-[-0.045em] ${dark ? "text-white" : "text-ink"}`}
                        style={{
                          fontSize: "clamp(2.5rem, 5.6vw, 4.25rem)",
                          lineHeight: 1,
                        }}
                      />
                      <span
                        className={`pl-term text-lg font-light ${dark ? "text-grey-400" : "text-grey-500"}`}
                      >
                        / {annual ? "year" : "month"}
                      </span>
                    </p>

                    <Button
                      href="#contact"
                      variant="primary"
                      size="md"
                      icon="none"
                      className={dark ? "!bg-[#333338]" : ""}
                    >
                      Get Started
                    </Button>
                  </div>

                  <div
                    className={`mt-9 h-px w-full md:mt-11 ${dark ? "bg-white/12" : "bg-ink/8"}`}
                  />

                  {/* Included */}
                  <div className="mt-8 grid gap-8 md:mt-10 sm:grid-cols-2 sm:gap-10">
                    <div>
                      <p
                        className={`text-[0.9375rem] font-semibold ${dark ? "text-white" : "text-ink"}`}
                      >
                        What&rsquo;s included
                      </p>
                      <p
                        className={`mt-2.5 max-w-xs text-sm leading-relaxed ${dark ? "text-grey-400" : "text-grey-500"}`}
                      >
                        {p.blurb}
                      </p>
                    </div>

                    <ul className="space-y-3.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <span
                            className={`flex h-[1.35rem] w-[1.35rem] shrink-0 items-center justify-center rounded-full ${
                              dark ? "bg-white/10" : "bg-ink/[0.07]"
                            }`}
                          >
                            <svg
                              viewBox="0 0 16 16"
                              className={`h-3 w-3 ${dark ? "text-grey-300" : "text-grey-500"}`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3.5 8.5 6.2 11.5 12.5 5" />
                            </svg>
                          </span>
                          <span
                            className={`text-[0.9375rem] ${dark ? "text-grey-200" : "text-ink/85"}`}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
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
