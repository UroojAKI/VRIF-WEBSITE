"use client";

import React from "react";

interface MarqueeStripProps {
  topRow: string[];
  bottomRow?: string[];
  speedTop?: number; // seconds for one full loop
  speedBottom?: number;
  className?: string;
}

const Row: React.FC<{
  items: string[];
  duration: number;
  reverse?: boolean;
}> = ({ items, duration, reverse }) => {
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-1">
      <div
        className="flex w-max gap-8 whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="text-xs md:text-sm font-semibold text-slate-400/80 tracking-widest uppercase flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 animate-pulse" />
            {item}
          </span>
        ))}
      </div>
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#05070F] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#05070F] to-transparent z-10" />
    </div>
  );
};

export default function MarqueeStrip({
  topRow,
  bottomRow,
  speedTop = 28,
  speedBottom = 32,
  className = "",
}: MarqueeStripProps) {
  return (
    <div className={`w-full py-8 flex flex-col gap-4 border-y border-white/5 relative z-10 bg-slate-950/40 backdrop-blur-md ${className}`}>
      <Row items={topRow} duration={speedTop} />
      {bottomRow && <Row items={bottomRow} duration={speedBottom} reverse />}
      <style jsx global>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
