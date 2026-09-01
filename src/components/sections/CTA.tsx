"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import ChromeField from "@/components/ui/ChromeField";

/**
 * The closing argument, performed: scroll draws a flame strike through
 * "Enough advice." — the site's thesis acted out — and "Let's build."
 * stands in the gradient. One button, one line, nothing else.
 */
export default function CTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(gsap.utils.toArray<HTMLElement>(".cta-line > *"), {
        yPercent: 114,
        duration: 1.35,
        stagger: 0.14,
        ease: "arc",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
      gsap.from(gsap.utils.toArray<HTMLElement>(".cta-up"), {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: "arc",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });

      // The strike: drawn by the scroll itself, and it can back off with it
      gsap.fromTo(
        ".cta-strike",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 62%",
            end: "top 18%",
            scrub: 0.6,
          },
        },
      );
      // The first line gives up its ink as the strike lands
      gsap.to(".cta-struck", {
        color: "#b4b2bd",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 50%",
          end: "top 18%",
          scrub: 0.6,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contact"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <ChromeField className="opacity-40" />

      <div className="container-page relative">
        {/* One quiet line of meta */}
        <div className="cta-up flex flex-wrap items-center justify-between gap-4">
          <p className="eyebrow flex items-center gap-3 text-grey-400">
            <span className="h-px w-8 bg-flame-600" />
            06 &nbsp;/&nbsp; Next step
          </p>
          <p className="flex items-center gap-2.5">
            <span
              className="h-1.5 w-1.5 rounded-full bg-flame-500"
              style={{ animation: "pulse-dot 2.4s var(--ease-swift) infinite" }}
            />
            <span className="eyebrow text-grey-500">
              Two slots &middot; Q2 2026
            </span>
          </p>
        </div>

        {/* The statement */}
        <h2
          className="font-title-tight mt-12 md:mt-16"
          style={{ fontSize: "clamp(3.2rem, 13vw, 11.5rem)", lineHeight: 0.98 }}
        >
          <span className="mask-line cta-line">
            <span className="cta-struck relative block w-fit text-ink">
              Enough advice.
              {/* The flame strike, scrubbed through the words */}
              <span
                aria-hidden
                className="cta-strike bg-flame absolute left-[-0.06em] right-[-0.1em] top-[0.53em] block h-[0.075em] rounded-full"
              />
            </span>
          </span>
          <span className="mask-line cta-line">
            <span className="text-flame block w-fit">Let&rsquo;s build.</span>
          </span>
        </h2>

        {/* One line, one key */}
        <div className="cta-up mt-12 flex flex-wrap items-center gap-x-10 gap-y-7 md:mt-16">
          <Button href="mailto:studio@arclight.co" size="lg" icon="diagonal">
            Book a diagnostic
          </Button>
          <p className="max-w-[21rem] text-[0.9375rem] leading-relaxed text-grey-500">
            45 minutes with a partner. Bring the problem nobody wants to own.
          </p>
        </div>
      </div>
    </section>
  );
}
