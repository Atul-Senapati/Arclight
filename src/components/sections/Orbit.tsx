"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import ChromeField from "@/components/ui/ChromeField";
import Mark from "@/components/ui/Mark";
import Reveal from "@/components/ui/Reveal";

/**
 * Hub and spokes: the five practices wired into one squad. Pentagon layout,
 * top-centred — positions are percentages of a square stage, so the whole
 * diagram scales as one piece.
 */
const R = 36; // ring radius, in stage units (viewBox 0–100)
const NODES = [
  { label: "Strategy", angle: -90 },
  { label: "Brand", angle: -18 },
  { label: "Product", angle: 54 },
  { label: "Growth", angle: 126 },
  { label: "AI Systems", angle: 198 },
].map((n) => ({
  ...n,
  x: 50 + R * Math.cos((n.angle * Math.PI) / 180),
  y: 50 + R * Math.sin((n.angle * Math.PI) / 180),
}));

const INK = { stroke: "#24242a", strokeOpacity: 0.3, fill: "none" } as const;

const ART: Record<string, React.ReactNode> = {
  // A radar: the market as a dashed field, one swept arc, one placed bet
  Strategy: (
    <>
      <circle
        cx="24"
        cy="24"
        r="17"
        {...INK}
        strokeWidth="1.4"
        strokeDasharray="2 3"
      />
      <path
        d="M8.5 24h-4M24 43.5v-4M43.5 24h-4"
        {...INK}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M26.95 7.26 A17 17 0 0 1 40.74 21.05"
        stroke="url(#ob-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="36" cy="12" r="2.6" fill="url(#ob-grad)" />
      <circle
        cx="36"
        cy="12"
        r="6"
        {...INK}
        strokeWidth="1.1"
        strokeDasharray="1.6 2.4"
      />
    </>
  ),
  // Two audiences, one identity: the overlap is the brand
  Brand: (
    <>
      <circle cx="18" cy="24" r="10.5" {...INK} strokeWidth="1.5" />
      <circle
        cx="30"
        cy="24"
        r="10.5"
        {...INK}
        strokeWidth="1.5"
        strokeDasharray="2 3"
      />
      <path
        d="M24 15.9 A10.5 10.5 0 0 1 24 32.1 A10.5 10.5 0 0 1 24 15.9 Z"
        fill="url(#ob-grad)"
        fillOpacity="0.9"
      />
    </>
  ),
  // Layers shipping: two drafts behind, the live one in front, cursor on it
  Product: (
    <>
      <rect
        x="8.5"
        y="6.5"
        width="17"
        height="17"
        rx="4"
        {...INK}
        strokeWidth="1.4"
        strokeOpacity="0.18"
      />
      <rect
        x="13.5"
        y="12"
        width="17"
        height="17"
        rx="4"
        {...INK}
        strokeWidth="1.4"
      />
      <rect
        x="18.5"
        y="17.5"
        width="17"
        height="17"
        rx="4"
        stroke="url(#ob-grad)"
        strokeWidth="2.2"
        fill="none"
      />
      <path
        d="m30.5 28.5 9.5 3.6-4.1 1.6 2.3 4.4-2.3 1.2-2.3-4.4-3.1 3.2z"
        fill="url(#ob-grad)"
      />
    </>
  ),
  // The Arc, miniature: flat dashed baseline, the execution curve, lit tip
  Growth: (
    <>
      <path
        d="M7 37h34"
        {...INK}
        strokeWidth="1.4"
        strokeDasharray="1.6 3"
        strokeLinecap="round"
      />
      <path
        d="M8 34.5 C 17 34.5 22.5 30 30.5 20"
        stroke="url(#ob-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32.5" cy="17.5" r="2.6" fill="url(#ob-grad)" />
      <circle
        cx="32.5"
        cy="17.5"
        r="5.8"
        {...INK}
        strokeWidth="1.1"
        strokeDasharray="1.6 2.4"
      />
    </>
  ),
  // A chip wired in, spark on the corner: models in production, not decks
  "AI Systems": (
    <>
      <path
        d="M24 16.5v-6M24 37.5v-6M16.5 24h-6M37.5 24h6M0 0"
        {...INK}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="8.5" r="1.7" fill="#24242a" fillOpacity="0.3" />
      <circle cx="24" cy="39.5" r="1.7" fill="#24242a" fillOpacity="0.3" />
      <circle cx="8.5" cy="24" r="1.7" fill="#24242a" fillOpacity="0.3" />
      <rect
        x="16.5"
        y="16.5"
        width="15"
        height="15"
        rx="3.5"
        stroke="url(#ob-grad)"
        strokeWidth="2.2"
        fill="none"
      />
      <circle cx="24" cy="24" r="2.4" fill="url(#ob-grad)" />
      <path
        d="M39 7.5l1.2 3.1 3.1 1.2-3.1 1.2-1.2 3.1-1.2-3.1-3.1-1.2 3.1-1.2z"
        fill="url(#ob-grad)"
      />
    </>
  ),
};

export default function Orbit() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const calm = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (calm) return;

      // Entrance: hub, then spokes draw, then satellites pop along them
      const tl = gsap.timeline({
        defaults: { ease: "arc" },
        scrollTrigger: { trigger: ".ob-stage", start: "top 78%", once: true },
      });
      tl.from(".ob-hub", { scale: 0.55, opacity: 0, duration: 0.9 })
        .from(
          ".ob-spoke",
          { strokeDashoffset: 1, duration: 0.7, stagger: 0.07, ease: "swift" },
          "-=0.45",
        )
        .from(
          ".ob-node",
          { scale: 0.55, opacity: 0, duration: 0.7, stagger: 0.07 },
          "-=0.55",
        );

      // The dashed orbit ring turns, slowly, and only while on screen
      gsap.to(".ob-ring", {
        rotation: 360,
        duration: 90,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: ".ob-stage",
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play pause resume pause",
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="orbit" className="relative py-24 md:py-32">
      <ChromeField className="opacity-40" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
        {/* ---------- Diagram ---------- */}
        <div className="ob-stage relative order-2 mx-auto w-full max-w-[34rem] lg:order-1">
          <div className="relative aspect-square w-full">
            {/* Spokes + orbit ring */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              <circle
                className="ob-ring"
                cx="50"
                cy="50"
                r={R}
                stroke="#24242a"
                strokeOpacity="0.14"
                strokeWidth="0.28"
                strokeDasharray="0.9 1.7"
              />
              {NODES.map((n) => (
                <path
                  key={n.label}
                  className="ob-spoke"
                  d={`M 50 50 L ${n.x} ${n.y}`}
                  pathLength={1}
                  strokeDasharray="1"
                  stroke="#24242a"
                  strokeOpacity="0.16"
                  strokeWidth="0.3"
                />
              ))}
              <defs>
                <linearGradient id="ob-grad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#ff3b21" />
                  <stop offset="0.55" stopColor="#ff5c1a" />
                  <stop offset="1" stopColor="#ffb457" />
                </linearGradient>
              </defs>
            </svg>

            {/* Hub — one large keycap */}
            <div className="ob-hub absolute left-1/2 top-1/2 z-10 flex aspect-square w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[8%] rounded-full bg-[#272727] bg-[image:var(--face-dark)] shadow-[var(--key-dark)]">
              <Mark className="w-[34%]" />
              <span className="font-title-tight text-[clamp(0.8rem,2.4vw,1.05rem)] text-white lg:text-base">
                Arclight
              </span>
            </div>

            {/* Satellites — plate discs */}
            {NODES.map((n) => (
              <div
                key={n.label}
                className="ob-node absolute z-10 flex aspect-square w-[23%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-[9%] rounded-full"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  background:
                    "linear-gradient(158deg, #fdfdfe 0%, #f0eff4 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(24,24,30,0.05), var(--lift-md)",
                }}
              >
                {/* Its own faint dashed halo, like a small orbit of its own */}
                <span
                  aria-hidden
                  className="absolute -inset-[9%] rounded-full border border-dashed border-ink/12"
                />
                <svg viewBox="0 0 48 48" className="w-[44%]" fill="none">
                  {ART[n.label]}
                </svg>
                <span className="px-2 text-center text-[clamp(0.55rem,1.6vw,0.75rem)] font-medium leading-tight text-grey-600 lg:text-xs">
                  {n.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- Copy ---------- */}
        <div className="order-1 lg:order-2 lg:pl-6">
          <Reveal stagger={0.1}>
            <p className="eyebrow flex items-center gap-3 text-grey-400">
              <span className="h-px w-8 bg-flame-600" />
              03 &nbsp;/&nbsp; One team
            </p>

            <h2 className="font-title-tight mt-6 text-[clamp(1.9rem,4.6vw,3.5rem)] text-ink">
              Five practices,
              <br />
              <span className="text-grey-300">zero handoffs.</span>
            </h2>

            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-grey-500">
              Strategy, brand, product, growth and AI ship from one squad
              &mdash; same standups, same repo, same deadline. Nothing gets
              thrown over a wall, because there is no wall.
            </p>

            <div className="mt-9">
              <Button href="#pricing" size="md" icon="arrow">
                See our pricing
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
