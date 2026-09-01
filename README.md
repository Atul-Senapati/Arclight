# Arclight — animated landing page

A single-page site for a fictional consulting studio, built as a showcase for
scroll-driven motion and micro-interactions.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
GSAP 3.15 (ScrollTrigger, SplitText, CustomEase) · Lenis smooth scroll.

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

## The look: chrome and glass

Soft silver-lavender surfaces, charcoal type, one flame accent. Two rules keep
it coherent:

- **Nothing is pure black.** Type and dark sections are charcoal
  (`#24242a` → `#101014`); pure black flattens the metal.
- **Every raised surface has a lit top edge.** `inset 0 1px 0 rgba(255,255,255,…)`
  plus two soft ambient shadows (`--lift-sm/md/lg`) — never a hard border.

Tokens and utilities live in [`globals.css`](src/app/globals.css) as Tailwind v4
`@theme` values and `@utility` classes:

| Utility | What it is |
| --- | --- |
| `glass` / `glass-thin` | Frosted panel, lit edge, ambient lift |
| `cutout` | Rim and inner shadow of a hole punched in a surface |
| `glass-dark` | Same construction for dark sections |
| `plate` | Solid card that still reads as a physical object |
| `lift-sm/md/lg` | The three elevation steps |
| `--key-dark` / `--key-light` | Keycap pills: eight-stop shadow ramp, lit top edge, hard dark bottom edge inside |
| `--face-dark` | Vertical dome gradient across a dark pill's face |
| `--lift-card` / `--lift-card-dark` | Four-stop throw for cards, longer than a button's |
| `font-title` / `font-title-tight` | Display type — geometric and deliberately light; weight comes from scale |
| `text-flame` / `bg-flame` | The accent gradient, as text fill or background |
| `text-chrome` | Brushed-metal text fill (the footer wordmark) |
| `roll` | Two-copy hover text roll |
| `mask-line`, `noise` | Line-reveal wrapper, film grain |

**Two typefaces.** `Outfit` for display — geometric, wide, set at weight 500 —
and `Inter Tight` for body and UI labels. Both via `next/font/google`, so there
is no layout shift for SplitText to measure around.

`public/chrome-field.jpg` is the hero's metal plate, laid down in two layers.
A blurred **wash** covers the whole hero — cover-scaling a 1.7:1 asset into a
tall viewport costs nothing once it is blurred — and a crisp **arc** sits on top
at the asset's own aspect ratio, because cover-scaling that layer would magnify
the arc past recognition. The arc's lower edge is masked so it dissolves into
the wash rather than ending on a seam, and a veil on the left keeps type legible.

The "Scroll for more" pill is a real cutout: it clips a second copy of the wash
that uses the wash's exact geometry (`100vw × 100svh`, cover, right-anchored)
offset by the pill's own inset, so the image showing through the hole lines up
with the background around it. Both copies share the same scroll tween, so they
stay registered while the plate drifts.
[`ChromeField`](src/components/ui/ChromeField.tsx) reproduces the same lighting
in CSS for the other sections, in light and dark tones.

## Motion

`src/lib/gsap.ts` registers the plugins once and defines the two signature
easings — `arc` (settling, for entrances) and `swift` (symmetric, for state
changes). `SmoothScroll` drives Lenis from GSAP's ticker so ScrollTrigger and
the scroll position can never drift apart.

| Section | Technique |
| --- | --- |
| Preloader | Counter tween + stepped word cycle, then five panels peel away |
| Scroll progress | Flame hairline pinned to the top edge, scaled left-to-right against total scroll (`start: 0`, `end: "max"`, scrubbed so it rides Lenis' smoothed position) |
| Nav | Glass pill drops in on handover, then tightens on scroll |
| Hero | Held to one viewport (`h-[100svh]`); masked line reveals, scroll-linked plate drift, a small proof card (avatar stack, part-filled 4.8 rating, one quote) in the negative space, scroll cue cut out of the background, carrying a small mouse whose flame wheel rolls down the shell and fades on a loop — the wheel is the only thing that moves, and it speeds up while the cue is hovered |
| Brands | Steady logo marquee behind an edge mask, under a hairline that fades at both ends |
| Ticker | Two full-bleed tapes crossing in an X — flame practices over ink proof — scrolling opposite directions, speed and skew riding scroll velocity |
| Manifesto | SplitText words scrubbed grey to ink; below, one machined black deck — the button's own material scaled up — engraved into three keys: Pyramids, Lock-in, Theatre. Each key holds a machined micro-diagram — steel parts with lit bevels and cast shadows for the shape we refuse, one blooming flame element for what replaces it — drawn stroke by stroke on entry, then strikes its word through, prefiguring the CTA |
| Stats | Snapped count-up on first entry |
| Orbit | Hub-and-spoke: Arclight keycap hub, plate satellites carrying duotone micro-illustrations, spokes draw in on a slowly turning dashed orbit |
| About | Rules draw out from the left, figures count up, photo curtains up then drifts |
| Pricing | Term switch set inline in the heading; figures roll between rates, light and dark plan cards |
| FAQ | Accordion of plate cards; height animated by GSAP, open card lifts to a deeper shadow with an accent numeral, keycap +/− toggle |
| Reach | Availability card carries a shipped laptop-mockup photo behind veiled copy; ghost-figure rating plate and a duotone quote plate alongside |
| CTA | The thesis performed: scroll scrubs a flame strike through “Enough advice.” as it fades to grey, “Let’s build.” stands in the gradient — one keycap button, one line |
| Footer | Copyable address, live clocks with in-office/after-hours states, page map, keycap back-to-top; the chrome wordmark rises from the crop with a flame initial |

Buttons are keycaps. Depth comes from three things and no more: an eight-stop
shadow ramp out to `0 22px 80px`, a 1px lit top edge inside, and a hard 3px dark
edge inside the bottom (`--key-dark` / `--key-light`), plus a straight vertical
dome across the face (`--face-dark`) — form, not a highlight streak. Cards use a
longer, softer throw of their own (`--lift-card` / `--lift-card-dark`).

Micro-interactions are deliberately still. The pill itself never moves on hover:
a faint veil crosses it and the oversized inverted chip warms to the accent
gradient. The one thing that moves is the arrow — it leaves the chip along the
axis it points and a second copy arrives behind it from the opposite side,
clipped by the chip's own `overflow-hidden` (the same two-copy hand-off as the
`roll` text utility, on `translate` since Tailwind v4 puts translate utilities
there rather than on `transform`). Under `prefers-reduced-motion` the second
copy is dropped and the hover goes back to colour only. No magnetic pull, no
custom cursor, and nothing tracks the pointer anywhere on the page. Motion is
otherwise reserved for scroll — plus hover text rolls in the nav and footer, and
a live London clock.

Everything is gated behind `prefers-reduced-motion` and `(pointer: fine)`, and
the pinned and horizontal behaviours are scoped with `gsap.matchMedia()` so
mobile falls back to plain stacked reveals.

## Content

Copy, imagery and case-study data live in
[`src/lib/content.ts`](src/lib/content.ts) — edit there rather than in the
section components. Photography is served from Unsplash via `next/image`
(allow-listed in `next.config.ts`).

> Arclight is a fictional studio. Names, metrics and testimonials are invented.
