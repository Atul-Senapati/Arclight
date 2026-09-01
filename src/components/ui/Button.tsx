import type { ReactNode } from "react";

type Variant = "primary" | "glass" | "light";

const SHELL: Record<Variant, string> = {
  primary:
    "bg-[#272727] bg-[image:var(--face-dark)] text-white shadow-[var(--key-dark)]",
  glass: "bg-white/80 text-ink backdrop-blur-xl shadow-[var(--key-light)]",
  light: "bg-white text-ink shadow-[var(--key-light)]",
};

/* Colour-only hover: a faint veil, nothing moves */
const VEIL: Record<Variant, string> = {
  primary: "group-hover:bg-white/[0.07]",
  glass: "group-hover:bg-white/45",
  light: "group-hover:bg-ink/[0.03]",
};

/* Chip inverts against its pill */
const CHIP: Record<Variant, string> = {
  primary: "bg-white text-ink",
  glass: "bg-ink text-white",
  light: "bg-ink text-white",
};

/* The arrow leaves the chip and a second one arrives behind it, travelling
   the way it points — the same hand-off the `roll` text utility does.
   The pill itself still never moves. */
const EASE = "duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

const TRAVEL: Record<string, { out: string; in: string }> = {
  arrow: {
    out: "group-hover:translate-x-[185%]",
    in: "-translate-x-[185%] group-hover:translate-x-0",
  },
  down: {
    out: "group-hover:translate-y-[185%]",
    in: "-translate-y-[185%] group-hover:translate-y-0",
  },
  diagonal: {
    out: "group-hover:translate-x-[150%] group-hover:-translate-y-[150%]",
    in: "-translate-x-[150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0",
  },
};

const PATH: Record<string, string> = {
  arrow: "M2.5 9h13M10.5 4l5 5-5 5",
  down: "M9 2.5v13M4 9.5l5 5 5-5",
  diagonal: "M4.5 13.5l9-9M6 4.5h7.5V12",
};

const SIZE = {
  sm: {
    shell: "h-11 pl-5 pr-1.5 text-[0.8125rem]",
    flat: "h-11 px-6 text-[0.8125rem]",
    chip: "h-8 w-8 ml-3",
    icon: "h-3.5 w-3.5",
  },
  md: {
    shell: "h-[3.25rem] pl-6 pr-2 text-sm",
    flat: "h-[3.25rem] px-7 text-sm",
    chip: "h-9 w-9 ml-4",
    icon: "h-4 w-4",
  },
  lg: {
    shell: "h-[3.75rem] pl-8 pr-2.5 text-[0.9375rem]",
    flat: "h-[3.75rem] px-9 text-[0.9375rem]",
    chip: "h-11 w-11 ml-5",
    icon: "h-[1.125rem] w-[1.125rem]",
  },
};

export default function Button({
  children,
  href = "#contact",
  variant = "primary",
  size = "md",
  icon = "arrow",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  icon?: "arrow" | "diagonal" | "down" | "none";
  className?: string;
}) {
  const s = SIZE[size];

  return (
    <a
      href={href}
      className={`group relative inline-flex shrink-0 items-center justify-center rounded-full font-medium ${SHELL[variant]} ${icon === "none" ? s.flat : s.shell} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full bg-transparent transition-colors duration-300 ${VEIL[variant]}`}
      />

      <span className="relative whitespace-nowrap">{children}</span>

      {icon !== "none" && (
        <span
          className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ${CHIP[variant]} ${s.chip}`}
        >
          {/* Chip warms to the accent on hover */}
          <span
            aria-hidden
            className="absolute inset-0 bg-flame opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* two copies: the one you see leaves, the one behind takes its place */}
          {(["out", "in"] as const).map((leg) => (
            <svg
              key={leg}
              aria-hidden
              viewBox="0 0 18 18"
              className={`absolute inset-0 m-auto ${s.icon} transition-[translate,color] ${EASE} group-hover:text-white ${
                TRAVEL[icon][leg]
              } ${leg === "in" ? "motion-reduce:hidden" : "motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={PATH[icon]} />
            </svg>
          ))}
        </span>
      )}
    </a>
  );
}
