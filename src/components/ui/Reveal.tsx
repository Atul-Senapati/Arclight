"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Generic scroll-in: fades and lifts its direct children with a stagger. */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  y = 28,
  stagger = 0.08,
  delay = 0,
  start = "top 88%",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  stagger?: number;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const targets = Array.from(ref.current!.children);
      if (!targets.length) return;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1.1,
        delay,
        stagger,
        ease: "arc",
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
