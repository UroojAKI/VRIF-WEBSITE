"use client";

import React from "react";
import { Monitor, Palette, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  gradient: string;
  delay: number;
}

export function FeatureCard({ title, description, icon: Icon, gradient, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="relative flex flex-col justify-start items-start w-full max-w-[280px] md:max-w-[310px] group mx-auto"
    >
      {/* Glow Background (Light Mode Diffused Shadow Blur) */}
      <div
        className="w-full h-[260px] md:h-[300px] opacity-40 group-hover:opacity-70 transition-opacity duration-500 rounded-[40px] pointer-events-none absolute inset-0 z-0"
        style={{
          background: gradient,
          filter: "blur(40px)",
        }}
      />

      {/* Foreground Card with Gradient Border via background-clip */}
      <div
        className="self-stretch h-[260px] md:h-[300px] rounded-[40px] z-10 overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1"
        style={{
          border: "4px solid transparent",
          background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, ${gradient} border-box`,
        }}
      >
        {/* Content Inner Layout */}
        <div className="w-full h-full p-7 flex flex-col justify-between bg-white/95">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-blue-600 shadow-sm border border-slate-200/60 group-hover:scale-110 transition-transform">
            <Icon size={30} strokeWidth={2.2} />
          </div>

          <div>
            <h3 className="text-slate-900 font-bold text-xl mb-2 tracking-tight">{title}</h3>
            <p className="text-slate-600 text-[14px] leading-[1.6] font-medium">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GlowingFeatureCards() {
  const cards = [
    {
      title: "Hardware & IoT CoE",
      icon: Monitor,
      delay: 0.1,
      description: "Our state-of-the-art hardware labs built for deep tech precision. Equipped with industrial 3D printing and IoT sensor validation.",
      gradient: "linear-gradient(137deg, #1D4ED8 0%, #3B82F6 45%, #06B6D4 100%)",
    },
    {
      title: "AI & Software Studio",
      icon: Palette,
      delay: 0.2,
      description: "Dedicated high-performance compute clusters defining machine learning models and spatial computer vision applications.",
      gradient: "linear-gradient(137deg, #4F46E5 0%, #8B5CF6 45%, #EC4899 100%)",
    },
    {
      title: "Startup Motion & Scale",
      icon: Zap,
      delay: 0.3,
      description: "Accelerating prototypes into market-ready commercial ventures, bridging academic research with venture capital funding.",
      gradient: "linear-gradient(137deg, #D97706 0%, #F59E0B 45%, #10B981 100%)",
    },
  ];

  return (
    <div className="w-full min-h-[420px] bg-slate-50/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 md:p-12 font-sans rounded-3xl border border-slate-200/80 shadow-md my-12 relative overflow-hidden">
      <div className="text-center mb-10 z-10">
        <span className="text-xs uppercase tracking-widest text-blue-700 font-extrabold px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 mb-3 inline-block">
          Deep Tech Pillars
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Capabilities &amp; Infrastructure
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 w-full max-w-[960px] z-10">
        {cards.map((card, i) => (
          <FeatureCard
            key={i}
            title={card.title}
            description={card.description}
            icon={card.icon}
            gradient={card.gradient}
            delay={card.delay}
          />
        ))}
      </div>
    </div>
  );
}
