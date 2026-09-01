"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* A flame hairline across the very top, drawn by the scroll itself.
   Scrubbed rather than event-driven so it tracks Lenis' smoothed position.

   The initial scaleX(0) is inline, not a `scale-x-0` class: Tailwind v4
   compiles that to the standalone `scale` property, which would multiply
   against GSAP's `transform` and hold the bar at zero forever. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.3,
        invalidateOnRefresh: true,
      },
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[999] h-[3px]"
    >
      <div
        ref={bar}
        className="bg-flame h-full w-full origin-left shadow-[0_0_14px_rgba(255,92,26,0.5)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
