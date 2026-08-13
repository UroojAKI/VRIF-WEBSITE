"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface GalleryCounterItem {
  image: string;
  caption?: string;
  category?: string;
}

interface GalleryCounterProps {
  items: GalleryCounterItem[];
  className?: string;
}

export default function GalleryCounter({ items, className = "" }: GalleryCounterProps) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + total) % total);
  };

  if (total === 0) return null;
  const current = items[index];

  return (
    <div className={`relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.image}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={current.image}
            alt={current.caption ?? "VRIF Event"}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom gradient mask for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none z-10" />

      {/* Caption & Category */}
      <div className="absolute left-6 bottom-6 z-20 max-w-xl">
        {current.category && (
          <span className="inline-block text-[10px] font-bold text-blue-400 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-2">
            {current.category}
          </span>
        )}
        {current.caption && (
          <p className="text-white text-base md:text-lg font-bold tracking-tight drop-shadow-md">
            {current.caption}
          </p>
        )}
      </div>

      {/* Fraction counter: "3 / 12", bottom-right */}
      <div className="absolute right-6 bottom-6 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md text-white/70 text-xs font-mono tracking-widest shadow-lg">
        <span className="text-white font-bold">{index + 1}</span>
        <span className="text-white/40">/</span>
        <span>{total}</span>
      </div>

      {/* Prev / Next navigation buttons */}
      <button
        aria-label="Previous image"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white border border-white/10 transition-all hover:scale-105 cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Next image"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white border border-white/10 transition-all hover:scale-105 cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
