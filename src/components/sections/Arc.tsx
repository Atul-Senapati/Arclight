"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The whole pitch as one graph, drawn by scroll. A dashed grey line for what
 * advice alone does; a flame curve for what shipping does. A keycap dot rides
 * the curve, and milestone chips pop as it passes them.
 */

const VB = { w: 1200, h: 600 };

/* Fractions are of the curve's own length, not x — the dot uses the same
   measure, so chips fire exactly as it passes. */
const MILESTONES = [
  {
    f: 0.1,
    label: "Week 02",
    note: "Diagnosis lands",
    shift: "translate(-30%, -150%)",
    always: true,
  },
  {
    f: 0.44,
    label: "Week 06",
    note: "First release ships",
    shift: "translate(-50%, -160%)",
    always: false,
  },
  {
    f: 0.7,
    label: "Week 14",
    note: "Handover",
    shift: "translate(-50%, 55%)",
    always: false,
  },
  {
    f: 0.965,
    label: "Year 1",
    note: "+38% margin",
    shift: "translate(-100%, 60%)",
    always: true,
  },
];

const CURVE =
  "M 40 508 C 210 508 330 498 430 458 C 570 402 660 316 790 232 C 908 156 1040 96 1160 62";

export default function Arc() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const path = q<SVGPathElement>(".arc-curve")[0];
      const dot = q<SVGGElement>(".arc-dot")[0];
      const clipRect = q<SVGRectElement>(".arc-clip-rect")[0];
      const nodes = q<SVGCircleElement>(".arc-node");
      const chips = q<HTMLElement>(".arc-chip");
      if (!path) return;

      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      // Park nodes and chips on the curve itself
      MILESTONES.forEach((m, i) => {
        const pt = path.getPointAtLength(m.f * len);
        nodes[i]?.setAttribute("cx", String(pt.x));
        nodes[i]?.setAttribute("cy", String(pt.y));
        if (chips[i]) {
          chips[i].style.left = `${(pt.x / VB.w) * 100}%`;
          chips[i].style.top = `${(pt.y / VB.h) * 100}%`;
        }
      });
      gsap.set(chips, { autoAlpha: 0, y: 10 });
      gsap.set(nodes, { attr: { r: 0 } });
      gsap.set(".arc-advice-label", { autoAlpha: 0 });

      const state = { p: 0 };
      const apply = () => {
        const at = state.p * len;
        path.style.strokeDashoffset = String(len - at);
        const pt = path.getPointAtLength(at);
        dot.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
        // The fill and the dashed baseline sweep in lockstep with the dot
        clipRect.setAttribute("width", String(Math.max(0, pt.x)));
      };
      apply();

      const build = (trigger: ScrollTrigger.Vars) => {
        const tl = gsap.timeline({ scrollTrigger: trigger });
        tl.to(state, { p: 1, duration: 1, ease: "none", onUpdate: apply }, 0);
        tl.to(".arc-advice-label", { autoAlpha: 1, duration: 0.06 }, 0.66);
        MILESTONES.forEach((m, i) => {
          tl.to(nodes[i], { attr: { r: 5 }, duration: 0.04 }, m.f);
          tl.to(chips[i], { autoAlpha: 1, y: 0, duration: 0.05 }, m.f);
        });
        return tl;
      };

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = build({
            trigger: root.current,
            start: "top top",
            end: "+=130%",
            scrub: 0.7,
            pin: true,
            anticipatePin: 1,
          });
          return () => tl.kill();
        },
      );

      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = build({
            trigger: q(".arc-stage")[0],
            start: "top 82%",
            end: "top 18%",
            scrub: 0.6,
          });
          return () => tl.kill();
        },
      );

      mm.add("(prefers-reduced-motion: reduce)", () => {
        state.p = 1;
        apply();
        gsap.set(chips, { autoAlpha: 1, y: 0 });
        gsap.set(nodes, { attr: { r: 5 } });
        gsap.set(".arc-advice-label", { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="arc"
      className="relative flex flex-col justify-center overflow-hidden bg-paper-2 py-20 md:h-[100svh] md:min-h-[42rem] md:py-0"
    >
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow flex items-center gap-3 text-grey-400">
              <span className="h-px w-8 bg-flame-600" />
              The arc
            </p>
            <h2 className="font-title-tight mt-5 text-[clamp(1.9rem,5vw,4rem)] text-ink">
              Every engagement,
              <span className="text-grey-300"> one graph.</span>
            </h2>
          </div>
          <p className="max-w-xs pb-1 text-sm leading-relaxed text-grey-500">
            Flat while we diagnose, climbing while we build &mdash; still
            climbing after we hand over. The dashed line is advice alone.
          </p>
        </div>

        {/* ---------- Chart stage, on a plate ---------- */}
        <div
          className="arc-stage relative mt-10 w-full rounded-[1.75rem] p-4 sm:p-6 md:mt-14 md:rounded-[2.25rem] md:p-10"
          style={{
            background: "linear-gradient(158deg, #fdfdfe 0%, #f0eff4 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(24,24,30,0.05), var(--lift-card)",
          }}
        >
          <div className="relative w-full" style={{ aspectRatio: "2 / 1" }}>
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="absolute inset-0 h-full w-full overflow-visible"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="arc-stroke" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#ff3b21" />
                  <stop offset="0.55" stopColor="#ff5c1a" />
                  <stop offset="1" stopColor="#ffb457" />
                </linearGradient>
                <linearGradient id="arc-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff5c1a" stopOpacity="0.16" />
                  <stop offset="1" stopColor="#ff5c1a" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="arc-dot-face" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#45454e" />
                  <stop offset="0.5" stopColor="#272727" />
                  <stop offset="1" stopColor="#101014" />
                </linearGradient>
                <radialGradient id="arc-glow">
                  <stop offset="0" stopColor="#ff5c1a" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#ff5c1a" stopOpacity="0" />
                </radialGradient>
                <filter
                  id="arc-line-lift"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="160%"
                >
                  <feDropShadow
                    dx="0"
                    dy="10"
                    stdDeviation="9"
                    floodColor="#e02200"
                    floodOpacity="0.22"
                  />
                </filter>
                <filter
                  id="arc-dot-lift"
                  x="-120%"
                  y="-120%"
                  width="340%"
                  height="340%"
                >
                  <feDropShadow
                    dx="0"
                    dy="5"
                    stdDeviation="5"
                    floodColor="#101014"
                    floodOpacity="0.45"
                  />
                </filter>
                <clipPath id="arc-clip">
                  <rect
                    className="arc-clip-rect"
                    x="0"
                    y="0"
                    width="0"
                    height={VB.h}
                  />
                </clipPath>
              </defs>

              {/* Grid — three hairlines, nothing more */}
              {[180, 340, 508].map((y) => (
                <line
                  key={y}
                  x1="40"
                  x2="1160"
                  y1={y}
                  y2={y}
                  stroke="#24242a"
                  strokeOpacity="0.07"
                  strokeWidth="1"
                />
              ))}

              {/* What advice alone does — swept by the same clip as the fill */}
              <g clipPath="url(#arc-clip)">
                <path
                  d={`${CURVE} L 1160 ${VB.h} L 40 ${VB.h} Z`}
                  fill="url(#arc-fill)"
                />
                <path
                  d="M 40 508 H 1160"
                  stroke="#8d8b97"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  strokeDasharray="3 9"
                  strokeLinecap="round"
                />
              </g>

              {/* The execution curve */}
              <path
                className="arc-curve"
                d={CURVE}
                stroke="url(#arc-stroke)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#arc-line-lift)"
              />

              {/* Milestone nodes */}
              {MILESTONES.map((m) => (
                <circle
                  key={m.f}
                  className="arc-node"
                  r="0"
                  fill="#ffffff"
                  stroke="#ff5c1a"
                  strokeWidth="2.5"
                  filter="url(#arc-dot-lift)"
                />
              ))}

              {/* The rider — a small keycap riding the line */}
              <g className="arc-dot">
                <circle r="24" fill="url(#arc-glow)" />
                <g filter="url(#arc-dot-lift)">
                  <circle r="8.5" fill="url(#arc-dot-face)" />
                  <circle
                    r="8.5"
                    fill="none"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="2"
                  />
                </g>
              </g>
            </svg>

            {/* Milestone chips, parked on the curve by the same measure */}
            {MILESTONES.map((m) => (
              <div
                key={m.f}
                className={`arc-chip glass absolute items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-3 pr-3.5 ${
                  m.always ? "flex" : "hidden sm:flex"
                }`}
                style={{ transform: m.shift }}
              >
                <span className="eyebrow text-[9px] text-flame-600">
                  {m.label}
                </span>
                <span className="text-xs font-medium text-ink">{m.note}</span>
              </div>
            ))}

            {/* Label for the flat line */}
            <p
              className="arc-advice-label absolute text-xs font-medium text-grey-400"
              style={{
                left: "78%",
                top: "84.6%",
                transform: "translateY(0.9rem)",
              }}
            >
              Advice alone
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
