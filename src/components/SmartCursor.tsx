"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export default function SmartCursor() {
  const [hoverState, setHoverState] = useState<"default" | "button" | "image" | "program" | "link">("default");
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for cursor position
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      
      if (cursorType === "button") setHoverState("button");
      else if (cursorType === "image") setHoverState("image");
      else if (cursorType === "program") setHoverState("program");
      else if (cursorType === "link") setHoverState("link");
      else if (target.tagName.toLowerCase() === "button" || target.closest("button")) setHoverState("button");
      else if (target.tagName.toLowerCase() === "a" || target.closest("a")) setHoverState("link");
      else setHoverState("default");
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      border: "0px solid rgba(255, 255, 255, 0)",
      mixBlendMode: "difference" as const,
    },
    button: {
      width: 60,
      height: 60,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(56, 189, 248, 0.15)",
      border: "1px solid rgba(56, 189, 248, 0.5)",
      mixBlendMode: "normal" as const,
    },
    image: {
      width: 72,
      height: 72,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "0px solid rgba(255, 255, 255, 0)",
      mixBlendMode: "normal" as const,
    },
    program: {
      width: 64,
      height: 64,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(167, 139, 250, 0.15)",
      border: "1px solid rgba(167, 139, 250, 0.5)",
      mixBlendMode: "normal" as const,
    },
    link: {
      width: 60,
      height: 60,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(52, 211, 153, 0.15)",
      border: "1px solid rgba(52, 211, 153, 0.5)",
      mixBlendMode: "normal" as const,
    }
  };

  const getLabel = () => {
    switch (hoverState) {
      case "button": return "VIEW";
      case "image": return "EXPLORE";
      case "program": return "ENTER";
      case "link": return "OPEN ↗";
      default: return "";
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full flex items-center justify-center font-bold tracking-widest text-[9px] backdrop-blur-[2px]"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
      variants={variants}
      animate={hoverState}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {hoverState !== "default" && (
          <motion.span
            key={hoverState}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
            className={`
              ${hoverState === 'image' ? 'text-slate-900' : ''}
              ${hoverState === 'button' ? 'text-blue-400' : ''}
              ${hoverState === 'program' ? 'text-purple-400' : ''}
              ${hoverState === 'link' ? 'text-emerald-400' : ''}
            `}
          >
            {getLabel()}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
