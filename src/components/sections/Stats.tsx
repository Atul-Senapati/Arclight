"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stats } from "@/lib/content";
import ChromeField from "@/components/ui/ChromeField";

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-num[data-value]").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.from(gsap.utils.toArray<HTMLElement>(".stat-cell"), {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "arc",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });

      gsap.from(gsap.utils.toArray<HTMLElement>(".stat-rule"), {
        scaleY: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "arc",
        scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative px-4 py-16 md:px-8 md:py-24">
      <div className="noise relative overflow-hidden rounded-[2rem] bg-ink-2 py-16 text-white shadow-[var(--lift-lg)] md:rounded-[2.75rem] md:py-24">
        <ChromeField tone="dark" />
        <div className="container-page relative">
          <p className="eyebrow mb-12 flex items-center gap-3 text-grey-500 md:mb-16">
            <span className="h-px w-8 bg-flame-500" />
            03 &nbsp;/&nbsp; Receipts
          </p>

          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className="stat-cell relative pl-5 md:pl-8">
                <span
                  className={`stat-rule absolute left-0 top-1 h-[calc(100%-0.25rem)] w-px origin-top ${
                    i === 0 ? "bg-flame" : "bg-white/12"
                  }`}
                />
                <p className="font-title-tight text-[13vw] sm:text-[9vw] lg:text-[4.4vw]">
                  <span className="stat-num" data-value={s.value}>
                    0
                  </span>
                  <span className="text-flame">{s.suffix}</span>
                </p>
                <p className="mt-4 max-w-[9rem] text-sm leading-snug text-grey-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
