"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Building2, Users, Lightbulb, UserCheck, Rocket, Landmark, ChevronRight, ArrowRight, Sparkles } from "lucide-react";

interface Stakeholder {
  id: string;
  label: string;
  icon: any;
  role: string;
  description: string;
  connections: string[];
}

interface Phase {
  title: string;
  tagline: string;
  color: string;
  stakeholders: Stakeholder[];
}

export default function EcosystemGraph() {
  const [activeStakeholder, setActiveStakeholder] = useState<string>("students");

  const phases: Phase[] = [
    {
      title: "Phase 1: Talent & Ideas",
      tagline: "Cultivating Mindsets",
      color: "from-cyan-400 to-blue-500",
      stakeholders: [
        {
          id: "students",
          label: "Students",
          icon: GraduationCap,
          role: "Future Founders",
          description: "Engaged via structured hackathons, capacity building (SamShoDhana), and NAIN project funding to cultivate an entrepreneurial mindset.",
          connections: ["academia", "innovators"]
        },
        {
          id: "academia",
          label: "Academia",
          icon: Building2,
          role: "Ecosystem Nodes",
          description: "Fostering institutional innovation culture across VTU's 210+ colleges via Faculty Development Programs (FDPs) and research nodes.",
          connections: ["students", "researchers"]
        }
      ]
    },
    {
      title: "Phase 2: R&D & Prototyping",
      tagline: "Validating Technologies",
      color: "from-blue-500 to-indigo-500",
      stakeholders: [
        {
          id: "researchers",
          label: "Researchers",
          icon: Users,
          role: "IP Creators",
          description: "Supported in commercializing academic research, tech transfer, patent licensing, and advanced development lab validation.",
          connections: ["academia", "industry"]
        },
        {
          id: "innovators",
          label: "Innovators",
          icon: Lightbulb,
          role: "Solution Architects",
          description: "Empowered with prototyping grants (e.g. ₹2.5 Lakh under Launchpad), mentorship, and access to CoEs to build functional MVPs.",
          connections: ["students", "startups"]
        }
      ]
    },
    {
      title: "Phase 3: Venture Building",
      tagline: "Commercial Incubation",
      color: "from-indigo-500 to-purple-600",
      stakeholders: [
        {
          id: "entrepreneurs",
          label: "Entrepreneurs",
          icon: UserCheck,
          role: "Venture Leaders",
          description: "Empowered through TBI Navodaya's structured incubation program, venture mentoring, and startup-to-investor matches.",
          connections: ["startups", "industry"]
        },
        {
          id: "startups",
          label: "Startups",
          icon: Rocket,
          role: "Economic Engines",
          description: "Scaling through TBI Navodaya's 12-month incubation program, funding links, and corporate pilot placements.",
          connections: ["innovators", "industry", "government"]
        }
      ]
    },
    {
      title: "Phase 4: Scaling & Support",
      tagline: "Ecosystem Acceleration",
      color: "from-purple-600 to-secondary",
      stakeholders: [
        {
          id: "industry",
          label: "Industry",
          icon: Building2,
          role: "Market Adopters",
          description: "Providing industry-linked challenges, mentorship, corporate connections, and pilot validation pathways for startups.",
          connections: ["researchers", "startups"]
        },
        {
          id: "government",
          label: "Government",
          icon: Landmark,
          role: "Ecosystem Patrons",
          description: "Supported by KITS (Govt of Karnataka) and KDEM to fund regional innovation clusters and state-wide network initiatives.",
          connections: ["startups", "academia"]
        }
      ]
    }
  ];

  // Flatten stakeholders for details query
  const allStakeholders = phases.flatMap(p => p.stakeholders);
  const selectedStakeholder = allStakeholders.find(s => s.id === activeStakeholder) || allStakeholders[0];

  return (
    <div className="w-full flex flex-col gap-10">
      {/* 4-Column Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {/* Horizontal Laser Connectors (Desktop only) */}
        <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-primary via-indigo-500 to-secondary opacity-30 z-0 transform -translate-y-1/2" />

        {phases.map((phase, pIdx) => (
          <div key={`phase-${pIdx}`} className="flex flex-col gap-4 relative z-10">
            {/* Phase Header */}
            <div className="flex flex-col gap-1 border-b border-[#394660]/30 pb-3">
              <span className={`text-[10px] font-black uppercase tracking-widest bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                {phase.tagline}
              </span>
              <h4 className="text-sm font-bold text-white uppercase">{phase.title}</h4>
            </div>

            {/* Stakeholder Cards in Phase */}
            <div className="flex flex-col gap-3">
              {phase.stakeholders.map((sh) => {
                const SHIcon = sh.icon;
                const isActive = sh.id === activeStakeholder;

                return (
                  <motion.button
                    key={sh.id}
                    onClick={() => setActiveStakeholder(sh.id)}
                    whileHover={{ y: -4, borderColor: "rgba(0,196,204,0.4)" }}
                    className={`w-full p-4 rounded-2xl text-left border flex items-center gap-3 transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-900 border-primary shadow-[0_0_15px_rgba(0,196,204,0.15)] text-white"
                        : "bg-[#1d1f26]/60 border-[#394660]/40 text-slate-350 hover:bg-[#1d1f26]"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl border transition-colors ${
                      isActive 
                        ? "bg-primary/10 border-primary/20 text-primary" 
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}>
                      <SHIcon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{sh.role}</span>
                      <span className="text-sm font-black mt-0.5">{sh.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${isActive ? "text-primary transform translate-x-1" : "text-slate-500"}`} />
                  </motion.button>
                );
              })}
            </div>
            
            {/* Divider arrow on desktop between columns */}
            {pIdx < 3 && (
              <div className="hidden md:flex absolute top-1/2 -right-4.5 transform -translate-y-1/2 z-20 text-indigo-500/50">
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Connection Info Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStakeholder.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#1d1f26] border border-[#394660]/80 relative overflow-hidden flex flex-col md:flex-row gap-6 items-start md:items-center shadow-2xl"
        >
          {/* Subtle logo backplate */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Icon Panel */}
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
              <selectedStakeholder.icon className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-widest text-primary uppercase">Ecosystem Node</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{selectedStakeholder.label}</h3>
              <span className="text-xs text-slate-400 mt-0.5 font-bold italic">Role: {selectedStakeholder.role}</span>
            </div>
          </div>

          {/* Description Block */}
          <div className="flex-1 border-t md:border-t-0 md:border-l border-[#394660]/40 pt-4 md:pt-0 md:pl-6">
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {selectedStakeholder.description}
            </p>
            
            <div className="flex flex-wrap gap-2 items-center mt-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Connects to</span>
              {selectedStakeholder.connections.map((connId) => {
                const conn = allStakeholders.find(s => s.id === connId);
                if (!conn) return null;
                return (
                  <span
                    key={`conn-badge-${connId}`}
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-950 border border-slate-900 text-slate-400"
                  >
                    {conn.label}
                  </span>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
