"use client";
import React, { useEffect, useRef } from "react";

interface Node {
  id: string;
  label: string;
  color: string;
  glowColor: string;
  angle: number;
  radius: number;
  desc: string;
}

const NODES: Node[] = [
  { id: "research",   label: "Research",   color: "#38BDF8", glowColor: "#38BDF8", angle: 270, radius: 160, desc: "210+ Colleges" },
  { id: "students",   label: "Students",   color: "#818CF8", glowColor: "#818CF8", angle: 330, radius: 160, desc: "5,000+ Engaged" },
  { id: "prototypes", label: "Prototypes", color: "#34D399", glowColor: "#34D399", angle:  30, radius: 160, desc: "90+ Built" },
  { id: "startups",   label: "Startups",   color: "#F59E0B", glowColor: "#F59E0B", angle:  90, radius: 160, desc: "50+ Supported" },
  { id: "mentors",    label: "Mentors",    color: "#F472B6", glowColor: "#F472B6", angle: 150, radius: 160, desc: "Expert Network" },
  { id: "industry",   label: "Industry",   color: "#60A5FA", glowColor: "#60A5FA", angle: 210, radius: 160, desc: "MoU Partners" },
];

export default function HeroNetwork({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let destroyed = false;
    let tilt = { x: 0, y: 0 };
    let time = 0;

    // Pulse animation per connection
    const pulses: { node: string; t: number }[] = NODES.map(n => ({ node: n.id, t: Math.random() * Math.PI * 2 }));

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      if (destroyed) return;
      raf = requestAnimationFrame(draw);
      time += 0.012;

      const W = canvas.width;
      const H = canvas.height;
      const dpr = window.devicePixelRatio || 1;
      const cx = W / 2;
      const cy = H / 2;
      const scale = Math.min(W, H) / 600;

      ctx.clearRect(0, 0, W, H);

      // Tilt toward mouse
      const mx = mouseRef.current.x / (canvas.offsetWidth || 1);
      const my = mouseRef.current.y / (canvas.offsetHeight || 1);
      tilt.x += ((my - 0.5) * 18 - tilt.x) * 0.06;
      tilt.y += ((mx - 0.5) * 18 - tilt.y) * 0.06;

      // Isometric-style perspective offset
      const isoX = tilt.y * 0.4;
      const isoY = tilt.x * 0.4;

      // Compute node screen positions
      const nodePositions: Record<string, { x: number; y: number }> = {};
      NODES.forEach(n => {
        const rad = (n.angle * Math.PI) / 180;
        const r = n.radius * scale;
        nodePositions[n.id] = {
          x: cx + Math.cos(rad) * r + isoX * scale * 3,
          y: cy + Math.sin(rad) * r + isoY * scale * 3,
        };
      });

      // Draw connection lines with traveling pulse
      NODES.forEach((n, ni) => {
        const from = nodePositions[n.id];
        const to = { x: cx, y: cy };

        // Base line
        const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        grad.addColorStop(0, n.color + "60");
        grad.addColorStop(1, n.color + "20");
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();

        // Traveling pulse dot
        const pulse = pulses[ni];
        pulse.t += 0.018;
        const pt = (Math.sin(pulse.t) + 1) / 2;
        const px = from.x + (to.x - from.x) * pt;
        const py = from.y + (to.y - from.y) * pt;

        ctx.beginPath();
        ctx.arc(px, py, 3 * dpr * scale, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Central hub glow rings
      for (let r = 3; r >= 1; r--) {
        const ringR = (28 + r * 14) * scale * dpr;
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, ringR);
        rg.addColorStop(0, `rgba(56,189,248,${0.15 / r})`);
        rg.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.fillStyle = rg;
        ctx.fill();
      }

      // Pulsing ring
      const pulse = (Math.sin(time * 2) + 1) / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, (28 + pulse * 22) * scale * dpr, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56,189,248,${0.4 - pulse * 0.35})`;
      ctx.lineWidth = 1.5 * dpr;
      ctx.stroke();

      // Hub node
      ctx.beginPath();
      ctx.arc(cx, cy, 26 * scale * dpr, 0, Math.PI * 2);
      ctx.fillStyle = "#0F172A";
      ctx.fill();
      ctx.strokeStyle = "#38BDF8";
      ctx.lineWidth = 2 * dpr;
      ctx.stroke();

      // Hub label
      ctx.save();
      ctx.font = `bold ${11 * scale * dpr}px 'Syncopate', 'Rajdhani', sans-serif`;
      ctx.fillStyle = "#38BDF8";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("VRIF", cx, cy - 4 * scale * dpr);
      ctx.font = `${8 * scale * dpr}px 'Inter', sans-serif`;
      ctx.fillStyle = "#64748B";
      ctx.fillText("HUB", cx, cy + 7 * scale * dpr);
      ctx.restore();

      // Draw outer nodes
      NODES.forEach(n => {
        const pos = nodePositions[n.id];
        const isHovered = hoveredRef.current === n.id;
        const nodeR = (isHovered ? 20 : 16) * scale * dpr;

        // Glow
        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, nodeR * 2.5);
        glow.addColorStop(0, n.color + (isHovered ? "50" : "25"));
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeR * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = "#0D1526";
        ctx.fill();
        ctx.strokeStyle = n.color;
        ctx.lineWidth = (isHovered ? 2.5 : 1.8) * dpr;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isHovered ? 18 : 6;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label
        const rad = (n.angle * Math.PI) / 180;
        const labelDist = 32 * scale * dpr;
        const lx = pos.x + Math.cos(rad) * labelDist;
        const ly = pos.y + Math.sin(rad) * labelDist;
        ctx.save();
        ctx.font = `bold ${isHovered ? 11 : 9.5}px 'Inter', sans-serif`;
        ctx.fillStyle = isHovered ? n.color : "#94A3B8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label.toUpperCase(), lx, ly);
        if (isHovered) {
          ctx.font = `${8}px 'Inter', sans-serif`;
          ctx.fillStyle = "#64748B";
          ctx.fillText(n.desc, lx, ly + 14);
        }
        ctx.restore();
      });

      // Hover detection
      const mx2 = mouseRef.current.x * (window.devicePixelRatio || 1);
      const my2 = mouseRef.current.y * (window.devicePixelRatio || 1);
      hoveredRef.current = null;
      NODES.forEach(n => {
        const pos = nodePositions[n.id];
        const dist = Math.hypot(mx2 - pos.x, my2 - pos.y);
        if (dist < 22 * scale * dpr) hoveredRef.current = n.id;
      });

      // Ambient floating particles
      for (let i = 0; i < 8; i++) {
        const a = (time * 0.3 + i * 0.8) % (Math.PI * 2);
        const pr = (70 + i * 30) * scale;
        const px = cx + Math.cos(a) * pr + isoX;
        const py = cy + Math.sin(a * 1.3) * pr * 0.5 + isoY;
        ctx.beginPath();
        ctx.arc(px, py, 1.5 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,0.35)`;
        ctx.fill();
      }
    };

    draw();
    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ cursor: "crosshair" }}
    />
  );
}
