"use client";

import React, { useEffect, useRef, useState } from "react";

export interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color?: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface StatsCounterProps {
  stats: StatItem[];
  durationMs?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const CountUpNumber: React.FC<{ stat: StatItem; active: boolean; durationMs: number }> = ({
  stat,
  active,
  durationMs,
}) => {
  const [display, setDisplay] = useState(active ? stat.value : 0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      setDisplay(stat.value * eased);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, stat.value, durationMs]);

  const decimals = stat.decimals ?? 0;
  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const fullStaticValue = `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`;

  return (
    <span
      className="text-4xl md:text-5xl font-black tracking-tight"
      style={stat.color ? { color: stat.color } : { color: "#60A5FA" }}
      aria-label={`${fullStaticValue} ${stat.label}`}
    >
      {stat.prefix}
      {formatted}
      {stat.suffix}
    </span>
  );
};

export default function StatsCounter({
  stats,
  durationMs = 1800,
  className = "",
}: StatsCounterProps) {
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full py-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center ${className}`}
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        const fullStaticText = `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""} ${stat.label}`;

        return (
          <div
            key={i}
            className="group relative p-6 rounded-3xl bg-white/[0.05] border border-white/[0.08] hover:border-blue-500/30 hover:bg-blue-500/[0.06] transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center gap-2"
          >
            {/* Hidden fallback text for SEO crawlers & accessibility */}
            <span className="sr-only">{fullStaticText}</span>

            {Icon && (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                style={{
                  background: stat.color ? `${stat.color}15` : "rgba(29,78,216,0.12)",
                  border: stat.color ? `1px solid ${stat.color}30` : "1px solid rgba(29,78,216,0.2)",
                }}
              >
                <Icon className="w-5 h-5" style={stat.color ? { color: stat.color } : { color: "#1D4ED8" }} />
              </div>
            )}

            <CountUpNumber stat={stat} active={active} durationMs={durationMs} />
            <span className="text-xs md:text-sm font-bold text-slate-400 tracking-wide">
              {stat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
