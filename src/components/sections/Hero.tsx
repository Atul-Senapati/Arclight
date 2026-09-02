"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IMG, heroProof } from "@/lib/content";
import Button from "@/components/ui/Button";
import Stars from "@/components/ui/Stars";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const cue = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const calm = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const intro = gsap
        .timeline({ paused: true, defaults: { ease: "arc" } })
        .from(q(".hero-badge"), { y: 16, opacity: 0, duration: 0.85 })
        .from(
          q(".hero-line > *"),
          { yPercent: 118, duration: 1.3, stagger: 0.1 },
          "-=0.55",
        )
        .from(
          q(".hero-chip"),
          { scale: 0.3, opacity: 0, duration: 1 },
          "-=0.95",
        )
        .from(
          q(".hero-fade"),
          { y: 22, opacity: 0, duration: 0.95, stagger: 0.1 },
          "-=0.85",
        )
        .from(q(".hero-quote"), { y: 20, opacity: 0, duration: 0.95 }, "-=0.7")
        .from(q(".hero-cut"), { y: 20, opacity: 0, duration: 0.8 }, "-=0.7");

      if (calm) {
        intro.progress(1);
        return;
      }
      intro.play();

      /* The wheel rolls down the shell and fades, over and over — the whole
         cue's motion is one 3px dot, which is as loud as this needs to be. */
      cue.current = [
        gsap.fromTo(
          q(".cue-wheel"),
          { y: 0, opacity: 0 },
          {
            keyframes: {
              y: [0, 0.5, 7.5],
              opacity: [0, 1, 0],
              easeEach: "sine.inOut",
            },
            duration: 1.5,
            repeat: -1,
            repeatDelay: 0.25,
            ease: "none",
          },
        ),
      ];

      /* Scroll-linked only — the plate drifts, the copy lifts away. One
         ScrollTrigger driving one timeline rather than three identical
         triggers: a third of the per-frame bookkeeping, and the wash copies
         can no longer drift apart and break the cutout's registration. */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          defaults: { ease: "none" },
        })
        .to(q(".hero-wash"), { yPercent: 6 }, 0)
        .to(q(".hero-plate"), { yPercent: 10 }, 0)
        .to(q(".hero-copy"), { yPercent: -9, opacity: 0.12 }, 0);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative h-[100svh] min-h-[36rem] overflow-hidden"
    >
      {/* ---------- Chrome plate ----------
          Two layers. The wash covers the whole hero (blurred, so cover-scaling
          into a tall viewport costs nothing) and is what the scroll cutout
          samples. The arc sits on top at the asset's own ratio, because
          cover-scaling a 1.7:1 plate into a tall viewport magnifies it past
          recognition. */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="hero-wash absolute inset-0 scale-110 opacity-70 blur-[38px] will-change-transform [mask-image:linear-gradient(to_bottom,transparent_30%,#000_68%)]">
          {/* 38px of blur erases all detail, so this layer is served tiny —
              a full-width decode here buys nothing and costs a lot. */}
          <Image
            src="/chrome-field.jpg"
            alt=""
            fill
            priority
            sizes="256px"
            className="object-cover object-[100%_50%]"
          />
        </div>
        <div className="hero-plate absolute inset-x-[-3%] -top-[6%] aspect-[4224/2460] min-h-[62%] will-change-transform [mask-image:linear-gradient(to_bottom,#000_52%,transparent_94%)]">
          <Image
            src="/chrome-field.jpg"
            alt=""
            fill
            priority
            sizes="110vw"
            className="object-cover object-[100%_50%]"
          />
        </div>
        {/* Veil: keeps type legible, and gives the cutout something to punch through */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper/68 via-paper/8 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-paper/70 via-paper/20 to-transparent" />
      </div>

      {/* ---------- Copy ---------- */}
      <div className="container-page relative flex h-full flex-col justify-center pb-28 pt-[var(--nav-h)] md:pb-32">
        <div className="hero-copy">
          <div className="hero-badge glass-thin mb-7 inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
              <path
                d="M12 2.5l1.9 5.4 5.6 1.9-5.6 1.9L12 17.1l-1.9-5.4L4.5 9.8l5.6-1.9L12 2.5ZM18.5 15l.9 2.5 2.6.9-2.6.9-.9 2.5-.9-2.5-2.6-.9 2.6-.9.9-2.5Z"
                fill="url(#sparkg)"
              />
              <defs>
                <linearGradient id="sparkg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ff3b21" />
                  <stop offset="1" stopColor="#ffb457" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-[0.8125rem] font-medium">
              <span className="text-flame-600">Consulting studio</span>
              <span className="text-grey-400">&nbsp;·&nbsp;Est. 2014</span>
            </span>
          </div>

          <h1
            className="font-title-tight text-ink"
            style={{ fontSize: "clamp(2.5rem, min(9.6vw, 13.2vh), 8.5rem)" }}
          >
            <span className="mask-line hero-line">
              <span className="block">Growth isn&rsquo;t advice,</span>
            </span>
            <span className="mask-line hero-line">
              {/* One span for the words so the flex gap only falls before the chip */}
              <span className="flex items-center gap-[0.16em]">
                <span>
                  it&rsquo;s{" "}
                  <em className="text-flame not-italic">execution</em> &mdash;
                </span>
                <span className="hero-chip relative inline-block h-[0.7em] w-[1.5em] shrink-0 overflow-hidden rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7),var(--lift-md)]">
                  {/* The chip renders at ~97×45. Stock photography turns to mush
                      at that size — this reads because it is pure silhouette:
                      black figures on a bright city, monochrome like the palette. */}
                  <Image
                    src="/office.png"
                    alt=""
                    fill
                    sizes="220px"
                    className="object-cover object-[50%_42%]"
                    priority
                  />
                </span>
              </span>
            </span>
            <span className="mask-line hero-line">
              <span className="block">so we stay and build.</span>
            </span>
          </h1>

          <p className="hero-fade mt-8 max-w-md text-[1.0625rem] leading-relaxed text-grey-600 md:mt-10">
            Embedded with your team &mdash; in your codebase, on your deadline,
            until the work is live.
          </p>

          <div className="mt-8 flex items-center justify-between gap-8">
            <div className="hero-fade flex flex-wrap items-center gap-3">
              <Button href="#contact" size="lg" icon="diagonal">
                Book a diagnostic
              </Button>
              <Button href="#pricing" variant="glass" size="lg" icon="none">
                See our pricing
              </Button>
            </div>

            {/* Small proof, riding the same axis as the CTAs */}
            <div className="hero-quote hidden shrink-0 items-center gap-3.5 lg:flex">
              <div className="flex -space-x-2.5">
                {heroProof.faces.map((f, i) => (
                  <span
                    key={f}
                    className="relative h-8 w-8 overflow-hidden rounded-full shadow-[var(--lift-sm)] ring-2 ring-white/90"
                    style={{ zIndex: heroProof.faces.length - i }}
                  >
                    <Image
                      src={IMG(f, 120)}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover object-[50%_22%]"
                    />
                  </span>
                ))}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Stars value={heroProof.rating} className="h-3 w-3" />
                  <span className="rounded-full bg-ink px-2 py-0.5 text-[0.6875rem] font-semibold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                    {heroProof.rating}
                    <span className="text-white/55">/5</span>
                  </span>
                </div>
                <p className="mt-1 text-[0.8125rem] text-grey-500">
                  Join {heroProof.extra.replace("+", "")} happy clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Scroll cue, cut out of the plate ----------
          The inner copy uses the wash's exact geometry (100vw x 100svh, cover,
          right-anchored) offset by the pill's own inset, so what shows through
          the hole lines up with the background behind it. */}
      <a
        href="#manifesto"
        onMouseEnter={() =>
          gsap.to(cue.current, { timeScale: 2.2, duration: 0.35 })
        }
        onMouseLeave={() =>
          gsap.to(cue.current, { timeScale: 1, duration: 0.5 })
        }
        className="hero-cut cutout group absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 overflow-hidden rounded-full py-2.5 pl-6 pr-2.5 md:bottom-9"
      >
        <span
          aria-hidden
          className="hero-wash pointer-events-none absolute bottom-[-1.75rem] left-1/2 h-[100svh] w-[100vw] -translate-x-1/2 scale-110 opacity-70 blur-[38px] [mask-image:linear-gradient(to_bottom,transparent_30%,#000_68%)] md:bottom-[-2.25rem]"
        >
          {/* same source and same low resolution as the plate's wash, so the
              two stay indistinguishable through the cutout */}
          <Image
            src="/chrome-field.jpg"
            alt=""
            fill
            sizes="256px"
            className="object-cover object-[100%_50%]"
          />
        </span>

        <span className="relative text-sm font-medium text-ink/80 transition-colors duration-500 group-hover:text-ink">
          Scroll for more
        </span>
        {/* A little mouse: the body is a machined outline, the wheel is the one
            hot pixel and it keeps rolling down. Left static under reduced
            motion, which is why nothing here starts hidden in CSS. */}
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ink/[0.07]">
          <svg
            aria-hidden
            viewBox="0 0 36 36"
            className="h-9 w-9 overflow-visible"
            fill="none"
          >
            <rect
              x="11.5"
              y="8"
              width="13"
              height="21"
              rx="6.5"
              stroke="currentColor"
              strokeWidth="1.4"
              className="text-ink/45"
            />
            {/* a lit edge along the top of the shell, as on the keycaps */}
            <path
              d="M14.6 10.4a4.6 4.6 0 0 1 6.8 0"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle
              className="cue-wheel"
              cx="18"
              cy="13.4"
              r="1.7"
              fill="url(#cueFlame)"
            />
            <defs>
              <linearGradient id="cueFlame" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff3b21" />
                <stop offset="100%" stopColor="#ff8a2b" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </a>
    </section>
  );
}
