"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import ChromeField from "@/components/ui/ChromeField";
import Mark from "@/components/ui/Mark";

const EMAIL = "studio@arclight.co";

const STUDIOS = [
  { city: "London", tz: "Europe/London" },
  { city: "Lisbon", tz: "Europe/Lisbon" },
  { city: "Singapore", tz: "Asia/Singapore" },
] as const;

const SOCIALS = ["LinkedIn", "Instagram", "Substack"] as const;

const PAGES = [
  { label: "About", href: "#about" },
  { label: "One team", href: "#orbit" },
  { label: "Pricing", href: "#pricing" },
  { label: "Questions", href: "#faq" },
] as const;

const WORDMARK = "ARCLIGHT";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const [times, setTimes] = useState<string[]>(() =>
    STUDIOS.map(() => "--:--:--"),
  );
  const [open, setOpen] = useState<boolean[]>(() => STUDIOS.map(() => false));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tick = () => {
      setTimes(
        STUDIOS.map((s) =>
          new Intl.DateTimeFormat("en-GB", {
            timeZone: s.tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(new Date()),
        ),
      );
      setOpen(
        STUDIOS.map((s) => {
          const h = Number(
            new Intl.DateTimeFormat("en-GB", {
              timeZone: s.tz,
              hour: "numeric",
              hour12: false,
            }).format(new Date()),
          );
          return h >= 9 && h < 18;
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(EMAIL);
      ok = true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  useGSAP(
    () => {
      gsap.from(".ft-up", {
        y: 22,
        opacity: 0,
        duration: 0.95,
        stagger: 0.09,
        ease: "arc",
        scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
      });

      gsap.from(".ft-rule", {
        scaleX: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "arc",
        scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
      });

      // The wordmark rises out of the crop, letter by letter
      gsap.from(".ft-letter", {
        yPercent: 100,
        duration: 1.25,
        stagger: 0.05,
        ease: "arc",
        scrollTrigger: { trigger: ".ft-word", start: "top 96%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <footer
      ref={root}
      className="noise relative overflow-hidden bg-ink-3 text-white"
    >
      <ChromeField tone="dark" className="opacity-60" />

      <div className="container-page relative pt-16 md:pt-24">
        {/* Availability, and where else to find us */}
        <div className="ft-up flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p className="flex items-center gap-3">
            <Mark className="h-6 w-6 shrink-0" />
            <span className="flex items-center gap-2.5 text-sm text-grey-300">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500"
                style={{
                  animation: "pulse-dot 2.4s var(--ease-swift) infinite",
                }}
              />
              Taking two engagements for Q2 2026
            </span>
          </p>

          <nav className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#top"
                className="roll text-sm text-grey-400 hover:text-white"
              >
                <span>{s}</span>
                <span className="text-flame-400">{s}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="ft-rule mt-8 h-px w-full origin-left bg-white/10" />

        {/* The one thing we want you to do — write, or copy the address */}
        <div className="ft-up mt-10 flex flex-wrap items-center gap-x-7 gap-y-5 md:mt-14">
          <a
            href={`mailto:${EMAIL}`}
            className="font-title-tight block min-w-0 truncate text-[clamp(1.75rem,7vw,5.75rem)] text-white transition-colors duration-500 hover:text-flame-400"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${EMAIL} to clipboard`}
            className={`eyebrow shrink-0 rounded-full px-5 py-3 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame-500/50 ${
              copied
                ? "bg-flame-500/15 text-flame-400 shadow-[inset_0_0_0_1px_rgba(255,92,26,0.4)]"
                : "bg-white/[0.06] text-grey-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] hover:text-white"
            }`}
          >
            <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
          </button>
        </div>

        {/* Three studios — live clocks, live open/after-hours state */}
        <div className="ft-up mt-12 grid grid-cols-1 sm:grid-cols-3 md:mt-16">
          {STUDIOS.map((s, i) => (
            <div
              key={s.city}
              className={`flex items-baseline justify-between gap-4 py-4 sm:block sm:py-0 sm:pl-6 ${
                i === 0 ? "sm:pl-0" : "sm:border-l sm:border-white/10"
              } ${i < STUDIOS.length - 1 ? "border-b border-white/10 sm:border-b-0" : ""}`}
            >
              <p className="flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    open[i] ? "bg-flame-500" : "bg-white/20"
                  }`}
                  style={
                    open[i]
                      ? {
                          animation:
                            "pulse-dot 2.4s var(--ease-swift) infinite",
                        }
                      : undefined
                  }
                />
                <span className="eyebrow text-grey-500">{s.city}</span>
                <span className="eyebrow hidden text-[9px] text-grey-600 sm:inline">
                  &middot; {open[i] ? "In office" : "After hours"}
                </span>
              </p>
              <p className="font-title-tight text-xl tabular-nums text-grey-200 sm:mt-2.5 sm:text-2xl">
                {times[i]}
              </p>
            </div>
          ))}
        </div>

        <div className="ft-rule mt-12 h-px w-full origin-left bg-white/10 md:mt-16" />

        {/* Bottom bar: legal · page map · back up */}
        <div className="ft-up flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-6">
          <p className="eyebrow text-grey-600">
            &copy; {new Date().getFullYear()} Arclight Partners Ltd.
            &nbsp;·&nbsp; Reg 09241155
          </p>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {PAGES.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="roll eyebrow text-grey-500 hover:text-white"
              >
                <span>{p.label}</span>
                <span className="text-flame-400">{p.label}</span>
              </a>
            ))}
          </nav>

          <a
            href="#top"
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#272727] bg-[image:var(--face-dark)] shadow-[var(--key-dark)] transition-transform duration-150 ease-[var(--ease-swift)] active:translate-y-[3px]"
          >
            <svg
              viewBox="0 0 18 18"
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 15.5v-13M4 8l5-5.5L14 8" />
            </svg>
          </a>
        </div>
      </div>

      {/* Wordmark, cropped by the bottom edge of the page */}
      <div
        aria-hidden
        className="ft-word relative flex overflow-hidden px-3 md:px-6"
        style={{ height: "0.56em", fontSize: "clamp(5rem, 15.5vw, 18rem)" }}
      >
        {WORDMARK.split("").map((ch, i) => (
          <span key={i} className="flex-1 overflow-hidden text-center">
            <span
              className={`ft-letter font-title-tight block leading-[0.78] tracking-[-0.05em] ${
                i === 0 ? "text-flame" : "text-chrome"
              }`}
            >
              {ch}
            </span>
          </span>
        ))}
      </div>
    </footer>
  );
}
