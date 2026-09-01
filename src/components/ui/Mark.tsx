/** Arclight monogram — a chrome sphere with the arc cut out of it. */
export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="mk-body" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#4a4a55" />
          <stop offset="0.45" stopColor="#1d1d23" />
          <stop offset="1" stopColor="#3a3a44" />
        </linearGradient>
        <linearGradient id="mk-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#ff3b21" />
          <stop offset="0.55" stopColor="#ff5c1a" />
          <stop offset="1" stopColor="#ffb457" />
        </linearGradient>
        <linearGradient id="mk-gloss" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill="url(#mk-body)" />
      <path
        d="M20 1a19 19 0 0 0-13.4 32.5A19 19 0 0 1 20 1Z"
        fill="url(#mk-gloss)"
      />
      <path
        d="M11 27.5 20 10l9 17.5"
        fill="none"
        stroke="url(#mk-arc)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="24.5" r="2.4" fill="url(#mk-arc)" />
    </svg>
  );
}
