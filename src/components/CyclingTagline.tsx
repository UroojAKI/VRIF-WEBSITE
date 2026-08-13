"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CyclingTaglineProps {
  words: string[];
  intervalMs?: number;
  className?: string;
}

export default function CyclingTagline({
  words,
  intervalMs = 2400,
  className = "",
}: CyclingTaglineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <div
      className={`relative h-[1.5em] overflow-hidden inline-flex items-center justify-center ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient-aurora font-bold tracking-tight inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
