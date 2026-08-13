"use client";

import React from "react";
import { motion } from "framer-motion";

interface IndexedCardProps {
  index: number;
  title: string;
  description: string;
  badge?: string;
  delay?: number;
  className?: string;
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor?: string;
}

export default function IndexedCard({
  index,
  title,
  description,
  badge,
  delay = 0,
  className = "",
  icon: Icon,
  accentColor = "#3B82F6",
}: IndexedCardProps) {
  const padded = String(index).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -6 }}
      className={`group relative rounded-3xl p-7 bg-white border border-slate-200/80 hover:border-blue-300 shadow-md hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="block text-xs font-mono font-bold text-blue-600">
          {padded}
        </span>
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            {badge}
          </span>
        )}
        {Icon && (
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
            }}
          >
            <Icon className="w-4 h-4" style={{ color: accentColor }} />
          </div>
        )}
      </div>

      <h3 className="text-slate-900 font-extrabold text-lg mb-2 tracking-tight group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-600 font-medium text-sm leading-relaxed">{description}</p>

      {/* Subtle hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accentColor}15, transparent 70%)`,
          boxShadow: `inset 0 1px 1px ${accentColor}30`,
        }}
      />
    </motion.div>
  );
}
