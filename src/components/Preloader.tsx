"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"building" | "done">("building");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);
    const cx = W / 2;
    const cy = H / 2;

    /* ── Phase 1: random particles ── */
    type Particle = { x: number; y: number; tx: number; ty: number; alpha: number; r: number; color: string };
    const colors = ["#38BDF8", "#818CF8", "#34D399", "#F472B6", "#60A5FA"];
    const NODES = 60;
    const particles: Particle[] = Array.from({ length: NODES }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      tx: 0, ty: 0,
      alpha: 0,
      r: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    /* ── VRIF letter target positions (5 letters spaced) ── */
    const letters = ["V", "R", "I", "F"];
    const letterW = 72; const gap = 24;
    const totalW = letters.length * letterW + (letters.length - 1) * gap;
    const startX = cx - totalW / 2;
    // Assign clusters of particles to each letter
    const perLetter = Math.floor(NODES / letters.length);
    particles.forEach((p, i) => {
      const li = Math.min(Math.floor(i / perLetter), letters.length - 1);
      const xOff = (i % perLetter) % 5;
      const yOff = Math.floor((i % perLetter) / 5);
      p.tx = startX + li * (letterW + gap) + xOff * 14 + Math.random() * 8;
      p.ty = cy - 30 + yOff * 14 + Math.random() * 8;
    });

    let t = 0;
    let animId: number;
    const DURATION = 90; // ~1.5s at 60fps

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#070B14";
      ctx.fillRect(0, 0, W, H);

      const progress = Math.min(t / DURATION, 1);
      // Easing
      const ease = (x: number) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      const ep = ease(progress);

      particles.forEach((p, i) => {
        // Fade in
        p.alpha = Math.min(1, p.alpha + 0.03);
        // Converge toward letter position
        const delay = (i / NODES) * 0.3;
        const localP = Math.max(0, Math.min(1, (progress - delay) / 0.7));
        const lp = ease(localP);
        const curX = p.x + (p.tx - p.x) * lp;
        const curY = p.y + (p.ty - p.y) * lp;

        ctx.beginPath();
        ctx.arc(curX, curY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 200).toString(16).padStart(2, "0");
        ctx.fill();

        // Draw connection lines between nearby particles (phase > 0.3)
        if (progress > 0.3) {
          const lineAlpha = (progress - 0.3) / 0.7;
          particles.slice(i + 1, i + 6).forEach((p2, j) => {
            const lp2 = ease(Math.max(0, Math.min(1, (progress - (j + i) / NODES * 0.3) / 0.7)));
            const x2 = p2.x + (p2.tx - p2.x) * lp2;
            const y2 = p2.y + (p2.ty - p2.y) * lp2;
            const dist = Math.hypot(curX - x2, curY - y2);
            if (dist < 90) {
              ctx.beginPath();
              ctx.moveTo(curX, curY);
              ctx.lineTo(x2, y2);
              ctx.strokeStyle = `rgba(56,189,248,${(1 - dist / 90) * lineAlpha * 0.4})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      // Phase > 0.7: draw glowing VRIF text overlay
      if (progress > 0.65) {
        const textAlpha = (progress - 0.65) / 0.35;
        ctx.save();
        ctx.font = `bold ${72}px 'Syncopate', 'Rajdhani', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // Glow
        ctx.shadowColor = "#38BDF8";
        ctx.shadowBlur = 20 * textAlpha;
        ctx.fillStyle = `rgba(255,255,255,${textAlpha})`;
        ctx.fillText("VRIF", cx, cy);
        // Subtitle
        ctx.font = `400 13px 'Inter', sans-serif`;
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(148,163,184,${textAlpha * 0.8})`;
        ctx.fillText("VISVESVARAYA RESEARCH & INNOVATION FOUNDATION", cx, cy + 52);
        ctx.restore();
      }

      // Progress bar
      const barW = Math.min(280, W * 0.4);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(cx - barW / 2, H - 80, barW, 2);
      ctx.fillStyle = "#38BDF8";
      ctx.fillRect(cx - barW / 2, H - 80, barW * ep, 2);

      t++;
      if (t <= DURATION + 18) {
        animId = requestAnimationFrame(draw);
      } else {
        setPhase("done");
      }
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    if (phase === "done") {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase === "building" && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#070B14]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
      )}
      {phase === "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#070B14] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          onAnimationComplete={onComplete}
        />
      )}
    </AnimatePresence>
  );
}
