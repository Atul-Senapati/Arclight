"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

/**
 * Masked line-by-line (or char) reveal driven by SplitText. Waits on
 * document.fonts so the split never measures a fallback face.
 */
export default function SplitReveal({
  children,
  as: Tag = "div",
  className = "",
  type = "lines",
  delay = 0,
  stagger = 0.09,
  duration = 1.15,
  start = "top 85%",
  immediate = false,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  type?: "lines" | "chars" | "words";
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      let split: SplitText | null = null;
      let cancelled = false;

      const run = () => {
        if (cancelled) return;
        gsap.set(el, { opacity: 1 });

        split = SplitText.create(el, {
          type: type === "chars" ? "chars,words,lines" : `${type},lines`,
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            const targets =
              type === "chars"
                ? self.chars
                : type === "words"
                  ? self.words
                  : self.lines;
            return gsap.from(targets, {
              yPercent: 118,
              opacity: type === "lines" ? 1 : 0,
              duration,
              delay,
              stagger: type === "chars" ? stagger * 0.16 : stagger,
              ease: "arc",
              scrollTrigger: immediate
                ? undefined
                : { trigger: el, start, once: true },
            });
          },
        });
      };

      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(run);
      } else {
        run();
      }

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [type] },
  );

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
