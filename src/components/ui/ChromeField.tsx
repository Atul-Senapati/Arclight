"use client";

/**
 * Ambient chrome lighting. `tone="light"` lays soft silver-lavender blooms with
 * a flame swoosh; `tone="dark"` warms a charcoal section from one edge.
 * Purely decorative — always pointer-events-none.
 */
export default function ChromeField({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  if (tone === "dark") {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      >
        <div
          className="absolute -right-[10%] -top-[45%] h-[75vw] w-[75vw] rounded-full opacity-40 blur-[110px] md:h-[45vw] md:w-[45vw]"
          style={{
            background:
              "radial-gradient(circle at 45% 55%, #ff5c1a 0%, #e02200 34%, transparent 68%)",
            animation: "drift 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -left-[18%] bottom-[-30%] h-[60vw] w-[60vw] rounded-full opacity-25 blur-[130px] md:h-[38vw] md:w-[38vw]"
          style={{
            background:
              "radial-gradient(circle, #8f8dff 0%, #3a3a55 45%, transparent 72%)",
            animation: "drift 26s ease-in-out infinite reverse",
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Silver bloom, top-left */}
      <div
        className="absolute -left-[15%] -top-[30%] h-[70vw] w-[70vw] rounded-full opacity-50 blur-[100px] md:h-[45vw] md:w-[45vw]"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, #ffffff 0%, #dedce8 45%, transparent 72%)",
        }}
      />
      {/* Graphite shadow sweeping through the middle */}
      <div
        className="absolute left-[8%] top-[20%] h-[55vw] w-[85vw] -rotate-[18deg] rounded-full opacity-[0.18] blur-[90px] md:h-[30vw]"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, #9a98a8 40%, #6e6c7c 55%, transparent 90%)",
        }}
      />
      {/* Flame swoosh, right edge */}
      <div
        className="absolute -right-[18%] top-[-20%] h-[100vh] w-[34vw] rotate-[8deg] opacity-35 blur-[80px] md:w-[24vw]"
        style={{
          background:
            "linear-gradient(96deg, transparent 0%, #ffd9c4 26%, #ff5c1a 52%, #ff3b21 64%, #2a1008 80%, transparent 96%)",
          animation: "drift 22s ease-in-out infinite",
        }}
      />
    </div>
  );
}
