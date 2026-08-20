"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Rocket, FlaskConical, Handshake } from "lucide-react";

const AUDIENCES = [
  {
    icon: GraduationCap,
    label: "I'm a Student",
    desc: "Discover programs, bootcamps, hackathons, and innovation opportunities across 210+ VTU campuses.",
    highlight: "5,000+ students engaged",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.15)",
    border: "rgba(56,189,248,0.25)",
    scrollTo: "programs",
  },
  {
    icon: Rocket,
    label: "I'm a Founder",
    desc: "Access incubation, expert mentorship, seed grants, and market-entry support through TBI Navodaya.",
    highlight: "50+ startups supported",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.25)",
    scrollTo: "programs",
  },
  {
    icon: FlaskConical,
    label: "I'm a Researcher",
    desc: "Access state-of-the-art labs, IP protection, technology transfer, and research commercialization.",
    highlight: "90+ prototypes built",
    color: "#34D399",
    glow: "rgba(52,211,153,0.15)",
    border: "rgba(52,211,153,0.25)",
    scrollTo: "infrastructure",
  },
  {
    icon: Handshake,
    label: "I'm an Industry Partner",
    desc: "Find talent pipelines, deep-tech collaborations, MoU opportunities, and corporate accelerators.",
    highlight: "MoU with Keysight, QpiAI +",
    color: "#818CF8",
    glow: "rgba(129,140,248,0.15)",
    border: "rgba(129,140,248,0.25)",
    scrollTo: "contact",
  },
];

export default function AudienceSelector() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold block mb-4">
              Personalized Journey
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}
            >
              WHAT BRINGS
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                YOU HERE?
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AUDIENCES.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => scrollTo(a.scrollTo)}
                className="group relative text-left p-7 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
                whileHover={{
                  scale: 1.03,
                  borderColor: a.border,
                  background: a.glow,
                }}
              >
                {/* Glow corner */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: a.glow }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: a.glow, border: `1px solid ${a.border}` }}
                >
                  <Icon className="w-6 h-6" style={{ color: a.color }} />
                </div>

                {/* Label */}
                <h3 className="text-lg font-extrabold text-slate-100 mb-2 leading-tight">
                  {a.label}
                </h3>

                {/* Desc */}
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{a.desc}</p>

                {/* Stat pill */}
                <span
                  className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ color: a.color, background: a.glow, border: `1px solid ${a.border}` }}
                >
                  {a.highlight}
                </span>

                {/* Arrow */}
                <div
                  className="absolute bottom-6 right-6 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                  style={{ color: a.color }}
                >
                  Explore →
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
