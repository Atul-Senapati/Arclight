"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import Mark from "@/components/ui/Mark";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Drop the pill in once the preloader clears, then tighten it on scroll
  useGSAP(
    () => {
      const pill = root.current!.querySelector(".nav-pill");

      gsap.from(pill, {
        y: -70,
        opacity: 0,
        duration: 1.1,
        ease: "arc",
      });

      gsap.to(pill, {
        scale: 0.965,
        duration: 0.5,
        ease: "swift",
        scrollTrigger: {
          start: "top -100",
          end: 99999,
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const el = menu.current!;
      if (open) {
        gsap.set(el, { pointerEvents: "auto" });
        gsap
          .timeline()
          .to(el, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "arc",
          })
          .from(
            ".menu-item",
            { yPercent: 112, duration: 0.85, stagger: 0.07, ease: "arc" },
            "-=0.5",
          )
          .from(".menu-foot", { opacity: 0, y: 18, duration: 0.6 }, "-=0.4");
      } else {
        gsap.to(el, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.6,
          ease: "swift",
          onComplete: () => gsap.set(el, { pointerEvents: "none" }),
        });
      }
      ScrollTrigger.refresh();
    },
    { dependencies: [open], scope: menu },
  );

  return (
    <header
      ref={root}
      className="pointer-events-none fixed inset-x-0 top-0 z-[900] flex justify-center px-4 pt-4 md:pt-5"
    >
      <div
        className={`nav-pill glass-nav pointer-events-auto relative z-[1001] flex items-center gap-7 rounded-full p-2.5 transition-colors duration-500 sm:gap-9 lg:gap-5 lg:p-3 ${
          open ? "bg-white/10" : ""
        }`}
      >
        {/* Wordmark */}
        <a
          href="#top"
          aria-label="Arclight, back to top"
          className="group flex shrink-0 items-center gap-2.5 rounded-full pl-2 pr-1 md:pl-3"
        >
          <Mark className="h-7 w-7 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[18deg] md:h-8 md:w-8" />
          <span
            className={`font-title-tight text-[1.0625rem] transition-colors duration-500 md:text-[1.1875rem] ${
              open ? "text-white" : "text-ink"
            }`}
          >
            Arclight
          </span>
        </a>

        {/* Links. Padding sits on the link and the roll hugs the text —
            otherwise the second copy is positioned to the padded box and lands
            off-register. The link is the `group` the roll listens to. */}
        <nav className="hidden items-center lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group rounded-full px-4 py-2.5 text-[0.9375rem] font-medium text-grey-600 transition-colors hover:text-ink"
            >
              <span className="roll">
                <span>{l.label}</span>
                <span className="text-flame-600">{l.label}</span>
              </span>
            </a>
          ))}
        </nav>

        {/* CTA + menu toggle */}
        <div className="flex shrink-0 items-center gap-2">
          <div
            className={`hidden transition-opacity duration-300 lg:block ${
              open ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <Button href="#contact" size="sm" icon="arrow">
              Start a project
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`relative flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full bg-[#272727] bg-[image:var(--face-dark)] shadow-[var(--key-dark)] transition-transform duration-500 lg:hidden ${
              open ? "scale-95" : ""
            }`}
          >
            <span
              className={`h-px w-[18px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-[18px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Full-screen menu */}
      <div
        ref={menu}
        className="noise pointer-events-none fixed inset-0 z-[1000] flex flex-col justify-between overflow-hidden bg-ink-2 px-6 pb-10 pt-32"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[20%] -top-[20%] h-[80vw] w-[80vw] rounded-full opacity-35 blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, #ff5c1a 0%, #e02200 40%, transparent 70%)",
          }}
        />
        <nav className="relative flex flex-col">
          {LINKS.map((l, i) => (
            <div key={l.href} className="overflow-hidden py-1">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="menu-item flex items-baseline gap-4 font-title-tight text-[13vw] text-white sm:text-6xl"
              >
                <span className="eyebrow translate-y-[-0.9em] text-[10px] text-flame-400">
                  0{i + 1}
                </span>
                {l.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="menu-foot relative flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-6">
          <div>
            <p className="eyebrow text-grey-500">Say hello</p>
            <a
              href="mailto:studio@arclight.co"
              className="font-title text-2xl text-white"
            >
              studio@arclight.co
            </a>
          </div>
          <p className="text-sm text-grey-400">London · Lisbon · Singapore</p>
        </div>
      </div>
    </header>
  );
}
