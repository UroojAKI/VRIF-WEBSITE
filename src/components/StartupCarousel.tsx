"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Rocket, TrendingUp, Award, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface StartupCardData {
  id: string;
  name: string;
  tagline: string;
  sector: string;
  funding: string;
  college: string;
  tech: string[];
  founder: string;
  description: string;
  logoUrl?: string;
  accentColor?: string;
}

const STARTUPS: StartupCardData[] = [
  {
    id: "1",
    name: "AeroSense Dynamics",
    tagline: "Autonomous Drone Swarm Intelligence for AgriTech",
    sector: "Robotics & Drones",
    funding: "₹45 Lakhs Seed",
    college: "VTU Campus Belagavi",
    tech: ["AI", "Autonomous Flight", "Edge Computing"],
    founder: "Rohan K. & Team",
    description: "Building AI-powered drone swarms for precision agriculture mapping and emergency disaster response in rural Karnataka.",
    accentColor: "#3B82F6",
  },
  {
    id: "2",
    name: "MedPulse Systems",
    tagline: "Point-of-Care Diagnostic Devices for Rural Healthcare",
    sector: "Biomedical Tech",
    funding: "₹60 Lakhs Grant",
    college: "BMS College of Engineering",
    tech: ["Biosensors", "Microfluidics", "IoT"],
    founder: "Dr. Ananya P.",
    description: "Portable lab-on-a-chip diagnostic devices providing rapid blood testing results in under 5 minutes without lab infrastructure.",
    accentColor: "#F43F5E",
  },
  {
    id: "3",
    name: "QuantumGrid CleanEnergy",
    tagline: "Solid-State Sodium Ion Battery Storage Solutions",
    sector: "Clean Energy",
    funding: "₹75 Lakhs Pre-Series A",
    college: "MSRIT Bengaluru",
    tech: ["Materials Science", "Energy Storage", "Battery Management"],
    founder: "Karthik V.",
    description: "Developing next-generation non-flammable solid-state sodium batteries for grid energy storage and EV micro-mobility.",
    accentColor: "#10B981",
  },
  {
    id: "4",
    name: "NeuroVision AI",
    tagline: "Industrial Defect Inspection via Spatial AI & Computer Vision",
    sector: "Artificial Intelligence",
    funding: "₹50 Lakhs TBI Grant",
    college: "SJCE Mysuru",
    tech: ["Deep Learning", "Spatial AI", "Robotic Vision"],
    founder: "Deepak S. & Meera M.",
    description: "Real-time automated quality control inspection cameras for high-speed manufacturing assembly lines.",
    accentColor: "#8B5CF6",
  },
  {
    id: "5",
    name: "CyberShield DLT",
    tagline: "Zero-Trust Blockchain Authentication for Government Infra",
    sector: "Cybersecurity",
    funding: "₹40 Lakhs NAIN Seed",
    college: "NIE Mysuru",
    tech: ["Zero-Knowledge Proofs", "Blockchain", "Identity"],
    founder: "Siddharth R.",
    description: "Tamper-proof digital identity and credential verification protocol built on decentralized ledger technology.",
    accentColor: "#06B6D4",
  },
];

export default function StartupCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevCard = () => {
    setActiveIndex((prev) => (prev === 0 ? STARTUPS.length - 1 : prev - 1));
  };

  const nextCard = () => {
    setActiveIndex((prev) => (prev === STARTUPS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12 px-4">
      {/* Controls & Title Row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Incubated Startups</h3>
            <p className="text-xs text-slate-400">Portfolio ventures accelerated through VTU VRIF</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevCard}
            aria-label="Previous startup"
            className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextCard}
            aria-label="Next startup"
            className="w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 3D Cylinder / Perspective Card Display */}
      <div className="relative h-[420px] w-full flex items-center justify-center perspective-[1200px]">
        <AnimatePresence mode="popLayout">
          {STARTUPS.map((startup, index) => {
            const offset = (index - activeIndex + STARTUPS.length) % STARTUPS.length;

            // Determine cylinder 3D transforms based on index offset
            let zIndex = 0;
            let transform = "scale(0.7) translateX(0) translateZ(-400px)";
            let opacity = 0;

            if (offset === 0) {
              // Active center card
              zIndex = 30;
              transform = "scale(1) translateX(0) translateZ(0)";
              opacity = 1;
            } else if (offset === 1 || offset === -(STARTUPS.length - 1)) {
              // Right card
              zIndex = 20;
              transform = "scale(0.85) translateX(65%) translateZ(-120px) rotateY(-18deg)";
              opacity = 0.65;
            } else if (offset === STARTUPS.length - 1 || offset === -1) {
              // Left card
              zIndex = 20;
              transform = "scale(0.85) translateX(-65%) translateZ(-120px) rotateY(18deg)";
              opacity = 0.65;
            }

            if (opacity === 0) return null;

            return (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity, scale: offset === 0 ? 1 : 0.85 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveIndex(index)}
                style={{
                  zIndex,
                  transform,
                  transformStyle: "preserve-3d",
                }}
                className={`absolute w-full max-w-md rounded-3xl p-7 bg-slate-900/90 border border-white/15 backdrop-blur-2xl shadow-2xl transition-all duration-500 cursor-pointer ${
                  offset === 0 ? "border-amber-400/40 shadow-blue-500/10" : "hover:border-white/30"
                }`}
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{
                      background: `${startup.accentColor}18`,
                      border: `1px solid ${startup.accentColor}35`,
                      color: startup.accentColor,
                    }}
                  >
                    {startup.sector}
                  </span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {startup.funding}
                  </span>
                </div>

                {/* Startup Name & Tagline */}
                <h4 className="text-xl font-black text-white mb-1.5 tracking-tight">{startup.name}</h4>
                <p className="text-xs font-semibold text-slate-300 mb-4">{startup.tagline}</p>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-3">
                  {startup.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {startup.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Founder & Institution Info */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Founder</span>
                    <span className="font-bold text-white">{startup.founder}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Origin</span>
                    <span className="font-medium text-slate-300">{startup.college}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {STARTUPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Go to startup ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex ? "w-8 bg-amber-400" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
