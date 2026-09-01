/** Five stars with the last one part-filled to match a fractional rating. */
export default function Stars({
  value,
  className = "h-3.5 w-3.5",
}: {
  value: number;
  className?: string;
}) {
  const row = (color: string) => (
    <span className={`flex w-max gap-0.5 ${color}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={className}
          fill="currentColor"
        >
          <path d="M12 1.8l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.6l-6.2 3.3 1.2-6.9-5-4.9 6.9-1L12 1.8Z" />
        </svg>
      ))}
    </span>
  );

  return (
    <span
      className="relative inline-flex"
      role="img"
      aria-label={`${value} out of 5`}
    >
      {row("text-ink/12")}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${(value / 5) * 100}%` }}
      >
        {row("text-flame-500")}
      </span>
    </span>
  );
}
