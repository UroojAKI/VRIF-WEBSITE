"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export default function BackgroundEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  // Dynamic parameters calculated from scroll position
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.8, 0.5, 0.7, 0.4, 0.6]);
  const particleColorShift = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [
    "rgba(59, 130, 246, ",  // Blue
    "rgba(139, 92, 246, ",  // Purple
    "rgba(6, 182, 212, ",   // Cyan
    "rgba(244, 63, 94, ",   // Coral
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create particles
    const PARTICLE_COUNT = 75;
    const particles: Particle[] = [];
    const colors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#F43F5E", "#F59E0B"];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle nodes & neural connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby particles with neural lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 140) * 0.15;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070F]">
      {/* Dynamic Aurora Ambient Lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: auroraOpacity,
          background: `
            radial-gradient(ellipse 80% 50% at 20% -10%, rgba(59, 130, 246, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 80% 15%, rgba(139, 92, 246, 0.14) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 50% 85%, rgba(6, 182, 212, 0.12) 0%, transparent 65%),
            radial-gradient(ellipse 50% 40% at 10% 90%, rgba(244, 63, 94, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Volumetric Particle Engine Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
