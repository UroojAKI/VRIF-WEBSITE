"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function RocketCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const lastPos = useRef({ x: 0, y: 0 });
  const particleId = useRef(0);
  const angleRef = useRef(0);

  useEffect(() => {
    // Enable custom cursor styles only on devices with pointer/mouse capabilities
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);
    document.documentElement.classList.add("custom-cursor-active");

    const generateParticles = (x: number, y: number, currentAngle: number, isClick: boolean) => {
      const angleRad = ((currentAngle - 90) * Math.PI) / 180;
      const count = isClick ? 12 : 2;
      
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        // Fire shoots in opposite direction of rocket travel
        const scatter = (Math.random() - 0.5) * 0.4;
        const fireAngle = angleRad + Math.PI + scatter;
        const speed = isClick ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.5;
        
        // Offset starting position to the nozzle at the bottom of the rocket
        const offsetDist = 18;
        const startX = x + Math.cos(angleRad + Math.PI) * offsetDist;
        const startY = y + Math.sin(angleRad + Math.PI) * offsetDist;

        // Warm flame colors: orange, red, yellow
        const colors = ["#ff5722", "#ff9800", "#ffeb3b", "#ff3d00"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        newParticles.push({
          id: particleId.current++,
          x: startX,
          y: startY,
          vx: Math.cos(fireAngle) * speed,
          vy: Math.sin(fireAngle) * speed,
          size: Math.random() * 5 + (isClick ? 4 : 2),
          life: 0,
          maxLife: isClick ? 25 : 15,
          color,
        });
      }
      setParticles((prev) => [...prev, ...newParticles].slice(-80));
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });

      // Calculate direction vector to rotate rocket
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        // Compute angle in degrees (offset by 45 deg because our rocket SVG points top-right or top)
        // Let's assume rocket SVG points up (0 deg is up, which is -90 in standard math).
        let newAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        setAngle(newAngle);
        angleRef.current = newAngle;

        // Generate thrust particles
        generateParticles(x, y, newAngle, false);

        lastPos.current = { x, y };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      generateParticles(e.clientX, e.clientY, angleRef.current, true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      // Check if target or ancestor is interactive
      const interactive = target.closest("a, button, input, select, textarea, [role='button'], .cursor-pointer");
      setIsHoveringLink(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  // Particle physics updates - runs independently without resetting
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life + 1,
            size: Math.max(0, p.size * 0.92),
          }))
          .filter((p) => p.life < p.maxLife && p.size > 0.5);
      });
    }, 16); // ~60fps particle updates

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 999999 }}>
      {/* Flame thrust particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: (p.maxLife - p.life) / p.maxLife,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}

      {/* Floating Rocket */}
      <div
        className="absolute w-8 h-8 transition-transform duration-75"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) rotate(${angle}deg) ${
            isClicking ? "scale(1.3)" : isHoveringLink ? "scale(1.15)" : "scale(1)"
          }`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full drop-shadow-[0_0_6px_rgba(0,196,204,0.6)]"
        >
          {/* Rocket Nose and Body */}
          <path
            d="M12 2C12 2 9 6 9 12C9 15.5 10.5 18 12 19C13.5 18 15 15.5 15 12C15 6 12 2 12 2Z"
            fill="#ffffff"
            stroke="#00c4cc"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Fins */}
          <path
            d="M9 14L5 18V19H8L9 17"
            fill="#7d2ae8"
            stroke="#7d2ae8"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 14L19 18V19H16L15 17"
            fill="#7d2ae8"
            stroke="#7d2ae8"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Porthole Window */}
          <circle cx="12" cy="10" r="2" fill="#0f1015" stroke="#00c4cc" strokeWidth="1" />
          {/* Flame Nozzle */}
          <path d="M10 19H14L12 21L10 19Z" fill="#ff5722" />
        </svg>
      </div>
    </div>
  );
}
