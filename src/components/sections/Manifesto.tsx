"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

const COPY =
  "Most consulting ends at the recommendation. A deck lands, the room nods, and eighteen months later nothing has changed. We built Arclight around the opposite promise: we stay in the room, we take the work, and we are measured on what actually shipped.";

/* Ghost = the shape we refuse, etched in steel hairline.
   Flame = what replaces it, lit and blooming. Each drawing makes the same
   argument its sentence makes, so the panel reads before it's read. */

const ART_SVG = "h-full w-full overflow-visible";
const POP = "mf-pop [transform-box:fill-box] origin-center";

/* 01 — the org chart stays, and one flame line runs straight through it:
   the partner at the top is the body at the bottom. */
function ArtPyramid() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={ART_SVG}>
      {/* three tiers, machined and stacked, lifting away */}
      <g className="mf-ghost">
        {[
          { x: 24, y: 9, w: 16 },
          { x: 17, y: 21, w: 30 },
          { x: 10, y: 33, w: 44 },
        ].map((t) => (
          <g key={t.y} filter="url(#mfCast)">
            <rect
              className={POP}
              x={t.x}
              y={t.y}
              width={t.w}
              height="9"
              rx="2.5"
              fill="url(#mfPlate)"
              stroke="url(#mfSteel)"
              strokeWidth="1.3"
            />
            <path
              className="mf-bevel"
              d={`M${t.x + 3} ${t.y + 2.1}h${t.w - 6}`}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>

      {/* one bench, everyone on it */}
      <g filter="url(#mfBloom)">
        <rect
          className={POP}
          x="5"
          y="51"
          width="54"
          height="6"
          rx="3"
          fill="url(#mfFlame)"
        />
      </g>
    </svg>
  );
}

/* 02 — the lock is yours: body cast in steel, shackle already off and
   lifted clear, still glowing. */
function ArtLock() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={ART_SVG}>
      {/* shackle, swung open on its right hinge */}
      <g filter="url(#mfBloom)">
        <path
          className="mf-draw-hot"
          d="M43 33v-9a9.5 9.5 0 0 0-17.4-5.3"
          stroke="url(#mfFlame)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      <g filter="url(#mfCast)">
        <rect
          className={POP}
          x="14"
          y="33"
          width="36"
          height="25"
          rx="7"
          fill="url(#mfPlate)"
          stroke="url(#mfSteel)"
          strokeWidth="1.5"
        />
      </g>
      {/* lit top bevel, so the body reads as a solid, not an outline */}
      <path
        className="mf-bevel"
        d="M19 35.2h26"
        stroke="rgba(255,255,255,0.34)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <g
        className="mf-ghost"
        stroke="url(#mfSteel)"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <circle className="mf-draw" cx="32" cy="43" r="3.2" />
        <path className="mf-draw" d="M32 46.5v4.5" />
      </g>
    </svg>
  );
}

/* 03 — the deck is dead behind; one page in front, and the only thing
   on it is the number. */
function ArtPage() {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={ART_SVG}>
      {/* the fanned deck, going cold */}
      <g className="mf-ghost">
        <rect
          className="mf-draw"
          x="7"
          y="17"
          width="24"
          height="33"
          rx="3"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.2"
          transform="rotate(-11 19 33)"
        />
        <rect
          className="mf-draw"
          x="14"
          y="14"
          width="24"
          height="33"
          rx="3"
          stroke="rgba(255,255,255,0.24)"
          strokeWidth="1.2"
          transform="rotate(-5 26 30)"
        />
      </g>

      {/* the one page, a real sheet with a lit edge */}
      <g filter="url(#mfCast)">
        <rect
          className={POP}
          x="27"
          y="9"
          width="30"
          height="42"
          rx="3.5"
          fill="url(#mfPlate)"
          stroke="url(#mfSteel)"
          strokeWidth="1.5"
        />
      </g>
      <path
        className="mf-bevel"
        d="M31 11.6h22"
        stroke="rgba(255,255,255,0.36)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* numbers, blockers, next move */}
      <g
        className="mf-ghost"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path className="mf-draw" d="M32 17h14" />
        <path className="mf-draw" d="M32 22h9" />
      </g>
      <g filter="url(#mfBloom)">
        <path
          className="mf-draw-hot"
          d="M32 41.5l6.5-7 5 3.5L52 27"
          stroke="url(#mfFlame)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className={POP} cx="52" cy="27" r="2.6" fill="url(#mfFlame)" />
      </g>
    </svg>
  );
}

const REFUSALS = [
  {
    word: "Pyramids",
    body: "The partner who pitched is the partner who builds.",
    Art: ArtPyramid,
  },
  {
    word: "Lock-in",
    body: "You own every artefact, repo and dashboard from day one.",
    Art: ArtLock,
  },
  {
    word: "Theatre",
    body: "One page a week. Numbers, blockers, next move.",
    Art: ArtPage,
  },
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!.querySelector(".mf-copy") as HTMLElement;
      let split: SplitText | null = null;

      const run = () => {
        split = SplitText.create(el, {
          type: "words,lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { color: "#b4b2bd" },
              {
                color: "#24242a",
                ease: "none",
                stagger: 1,
                duration: 1,
                scrollTrigger: {
                  trigger: el,
                  start: "top 78%",
                  end: "bottom 52%",
                  scrub: 0.6,
                },
              },
            );
          },
        });
      };

      /* The deck lands as one slab, then each panel wakes in turn. */
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".mf-deck", start: "top 84%", once: true },
      });

      /* Every stroke is drawn, not faded: the grey schematic etches itself
         first, then the flame runs through it, then the solids drop in. */
      const draw = (sel: string, at: number, dur: number, stag: number) =>
        tl.fromTo(
          gsap.utils.toArray<SVGGeometryElement>(sel),
          {
            strokeDasharray: (_i, t: SVGGeometryElement) => t.getTotalLength(),
            strokeDashoffset: (_i, t: SVGGeometryElement) =>
              t.getTotalLength(),
          },
          {
            strokeDashoffset: 0,
            duration: dur,
            stagger: stag,
            ease: "swift",
            clearProps: "strokeDasharray,strokeDashoffset",
          },
          at,
        );

      tl.from(".mf-deck", { y: 46, opacity: 0, duration: 1.1, ease: "arc" })
        .from(
          ".mf-gutter",
          { scaleY: 0, duration: 0.9, stagger: 0.08, ease: "arc" },
          0.15,
        );

      draw(".mf-draw", 0.3, 0.65, 0.035);
      draw(".mf-draw-hot", 0.62, 0.8, 0.1);

      tl.from(
        ".mf-pop",
        {
          opacity: 0,
          scale: 0.55,
          duration: 0.5,
          stagger: 0.035,
          ease: "arc",
        },
        0.5,
      ).from(
        ".mf-bevel",
        { opacity: 0, duration: 0.6, stagger: 0.1, ease: "none" },
        0.8,
      );

      gsap.utils.toArray<HTMLElement>(".mf-panel").forEach((panel, i) => {
        const at = 0.42 + i * 0.12;
        tl.from(
          panel.querySelectorAll(".mf-lift"),
          { y: 20, opacity: 0, duration: 0.8, stagger: 0.07, ease: "arc" },
          at,
        )
          .fromTo(
            panel.querySelector(".mf-strike"),
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 0.5,
              ease: "swift",
            },
            at + 0.28,
          )
          .to(
            panel.querySelector(".mf-word-text"),
            { opacity: 0.55, duration: 0.45, ease: "arc" },
            at + 0.28,
          );
      });

      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(run);
      } else {
        run();
      }
      return () => split?.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="manifesto" className="relative py-24 md:py-40">
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="mfFlame" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff3b21" />
            <stop offset="45%" stopColor="#ff5c1a" />
            <stop offset="100%" stopColor="#ffb457" />
          </linearGradient>

          {/* brushed edge: bright where light lands, falling to shadow */}
          <linearGradient id="mfSteel" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.62" />
            <stop offset="52%" stopColor="#cfcdd8" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#6f6d7a" stopOpacity="0.4" />
          </linearGradient>

          {/* the face of a solid part, domed like the deck it sits on */}
          <linearGradient id="mfPlate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
          </linearGradient>

          <filter
            id="mfBloom"
            x="-60%"
            y="-60%"
            width="220%"
            height="220%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2.4"
              floodColor="#ff5c1a"
              floodOpacity="0.5"
            />
          </filter>

          <filter
            id="mfCast"
            x="-40%"
            y="-40%"
            width="180%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor="#000000"
              floodOpacity="0.55"
            />
          </filter>
        </defs>
      </svg>

      <div className="container-page grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-3">
          <div className="md:sticky md:top-32">
            <p className="eyebrow flex items-center gap-3 text-grey-400">
              <span className="h-px w-8 bg-flame-600" />
              01 &nbsp;/&nbsp; Manifesto
            </p>
          </div>
        </div>

        <div className="md:col-span-9">
          <p className="mf-copy font-title text-[7.2vw] leading-[1.06] tracking-[-0.03em] sm:text-[5vw] lg:text-[3.35vw]">
            {COPY}
          </p>

          {/* Not three cards — one machined slab, three engraved keys.
              The same material as the buttons, scaled up to hold the refusals. */}
          <div className="mf-deck noise relative mt-14 overflow-hidden rounded-[1.75rem] bg-[#272727] bg-[image:var(--face-dark)] shadow-[var(--key-dark)] md:mt-20 md:rounded-[2rem]">
            <div className="relative grid sm:grid-cols-3">
              {REFUSALS.map((r, i) => (
                <div
                  key={r.word}
                  className="mf-panel group relative overflow-hidden p-8 transition-colors duration-500 hover:bg-white/[0.035] md:p-10"
                >
                  {/* engraved gutter, lit on one side and cut on the other */}
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="mf-gutter absolute left-0 top-0 hidden h-full w-px origin-top bg-black/45 shadow-[1px_0_0_rgba(255,255,255,0.07)] sm:block"
                    />
                  )}
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="mf-gutter absolute inset-x-8 top-0 h-px origin-left bg-black/45 shadow-[0_1px_0_rgba(255,255,255,0.07)] sm:hidden"
                    />
                  )}

                  {/* cropped ghost numeral, the page's own motif */}
                  <span
                    aria-hidden
                    className="font-title-tight pointer-events-none absolute -bottom-10 -right-4 hidden select-none text-[8rem] leading-none text-white/[0.028] sm:block"
                  >
                    {i + 1}
                  </span>

                  <div className="mf-lift relative h-14 w-14 md:h-16 md:w-16">
                    <r.Art />
                  </div>

                  {/* font-size on the wrapper so the strike's em units resolve
                      against the word, not the body text */}
                  <span className="mf-lift relative mt-9 block w-fit text-[clamp(1.5rem,2.5vw,2rem)] md:mt-12">
                    <span className="mf-word-text font-title-tight block text-white/90">
                      {r.word}
                    </span>
                    <span
                      aria-hidden
                      className="mf-strike bg-flame absolute left-[-0.06em] right-[-0.1em] top-[0.55em] block h-[0.085em] rounded-full"
                    />
                  </span>

                  <p className="mf-lift relative mt-4 max-w-[22ch] text-[0.9375rem] leading-relaxed text-white/45">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
