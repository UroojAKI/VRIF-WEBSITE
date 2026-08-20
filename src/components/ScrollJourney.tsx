"use client";
import React, { useEffect, useRef, useState } from "react";

const CHAPTERS = [
  { text: "It starts with a question.", sub: "Every breakthrough begins with curiosity." },
  { text: "Then comes an idea.", sub: "Raw, unpolished, but full of potential." },
  { text: "The idea becomes a prototype.", sub: "From whiteboard to working model." },
  { text: "The prototype meets an ecosystem.", sub: "Mentors, labs, funding — VRIF." },
  { text: "And impact goes beyond the campus.", sub: "210+ colleges. 5,000+ students. One movement." },
];

export default function ScrollJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chapter, setChapter] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  /* ── Scroll handler: map scroll progress 0→1 to chapter 0→4 ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const totalH = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / totalH);
      const newChapter = Math.min(CHAPTERS.length - 1, Math.floor(progress * CHAPTERS.length));
      setChapter(prev => {
        if (prev !== newChapter) {
          setTextVisible(false);
          setTimeout(() => setTextVisible(true), 220);
        }
        return newChapter;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Canvas animation: evolves with chapter ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let destroyed = false;
    let t = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (destroyed) return;
      raf = requestAnimationFrame(draw);
      t += 0.018;

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      ctx.clearRect(0, 0, W, H);

      const ch = chapter;

      /* Chapter 0 — single glowing particle */
      if (ch === 0) {
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
        glow.addColorStop(0, "rgba(56,189,248,0.8)");
        glow.addColorStop(0.4, "rgba(56,189,248,0.15)");
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, 60, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        const s = 6 + Math.sin(t * 2) * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, s, 0, Math.PI * 2);
        ctx.fillStyle = "#38BDF8";
        ctx.shadowColor = "#38BDF8";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      /* Chapter 1 — constellation of particles */
      if (ch >= 1) {
        const count = ch === 1 ? 18 : 30;
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2 + t * 0.3;
          const r = 80 + Math.sin(t + i) * 20;
          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r * 0.6;
          ctx.beginPath();
          ctx.arc(px, py, 2.5 + Math.sin(t * 2 + i) * 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${129 + i * 4},${140 + i * 2},248,${0.5 + Math.sin(t + i) * 0.3})`;
          ctx.fill();
          if (i > 0 && ch >= 1) {
            const a2 = ((i - 1) / count) * Math.PI * 2 + t * 0.3;
            const r2 = 80 + Math.sin(t + i - 1) * 20;
            const px2 = cx + Math.cos(a2) * r2;
            const py2 = cy + Math.sin(a2) * r2 * 0.6;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px2, py2);
            ctx.strokeStyle = "rgba(129,140,248,0.2)";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      /* Chapter 2 — wireframe triangle assembles */
      if (ch >= 2) {
        const size = 80 + Math.sin(t) * 4;
        const corners = [
          { x: cx, y: cy - size },
          { x: cx + size * 0.866, y: cy + size * 0.5 },
          { x: cx - size * 0.866, y: cy + size * 0.5 },
        ];
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        corners.slice(1).forEach(c => ctx.lineTo(c.x, c.y));
        ctx.closePath();
        ctx.strokeStyle = "#34D399";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#34D399";
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
        corners.forEach(c => {
          ctx.beginPath();
          ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "#34D399";
          ctx.fill();
        });
      }

      /* Chapter 3 — radiating network */
      if (ch >= 3) {
        const spokes = 8;
        for (let i = 0; i < spokes; i++) {
          const a = (i / spokes) * Math.PI * 2 + t * 0.1;
          const maxR = 130 + Math.sin(t + i) * 15;
          const grad = ctx.createLinearGradient(cx, cy,
            cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
          grad.addColorStop(0, "rgba(245,158,11,0.7)");
          grad.addColorStop(1, "rgba(245,158,11,0)");
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#F59E0B";
          ctx.fill();
        }
      }

      /* Chapter 4 — burst + map hint */
      if (ch >= 4) {
        const count = 60;
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          const r = 100 + Math.sin(t * 2 + i * 0.3) * 30;
          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r * 0.8;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96,165,250,${0.4 + Math.sin(t + i * 0.2) * 0.2})`;
          ctx.fill();
        }
        // Central glow
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
        cg.addColorStop(0, "rgba(56,189,248,0.3)");
        cg.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, 80, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();
      }
    };

    draw();
    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [chapter]);

  return (
    /* Tall section so scroll controls the journey */
    <div ref={sectionRef} className="relative" style={{ height: "500vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[#070B14]">
        {/* Canvas visual */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Dim radial overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#070B14]/80 pointer-events-none" />

        {/* Chapter text */}
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto select-none">
          <div
            className={`transition-all duration-300 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="text-xs font-black tracking-[0.3em] text-slate-500 uppercase mb-6">
              {String(chapter + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")}
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4"
              style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}
            >
              {CHAPTERS[chapter].text}
            </h2>
            <p className="text-slate-400 text-base sm:text-lg font-medium leading-relaxed">
              {CHAPTERS[chapter].sub}
            </p>
          </div>

          {/* Chapter progress dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {CHAPTERS.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-500 ${
                  i === chapter
                    ? "w-8 h-2 bg-blue-400"
                    : i < chapter
                    ? "w-2 h-2 bg-blue-600/50"
                    : "w-2 h-2 bg-white/10"
                }`}
              />
            ))}
          </div>

          <div className="mt-10 text-xs text-slate-600 tracking-widest uppercase animate-bounce">
            ↓ Scroll to continue
          </div>
        </div>
      </div>
    </div>
  );
}
