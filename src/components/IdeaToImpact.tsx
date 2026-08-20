"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Search, PenTool, CheckCircle, TrendingUp, DollarSign, Rocket, Globe } from "lucide-react";

const STEPS = [
  { num: "01", name: "IDEA", desc: "Every journey begins with a spark.", program: "VINYASA Bootcamp", icon: Lightbulb, color: "#38BDF8" },
  { num: "02", name: "RESEARCH", desc: "Validate the science and technology.", program: "SAMSHODHANA", icon: Search, color: "#818CF8" },
  { num: "03", name: "PROTOTYPE", desc: "Build the first working model.", program: "Hardware & IoT CoE", icon: PenTool, color: "#34D399" },
  { num: "04", name: "VALIDATION", desc: "Test with real-world users.", program: "VRIF LAUNCHPAD", icon: CheckCircle, color: "#FBBF24" },
  { num: "05", name: "INCUBATION", desc: "Structured growth and mentorship.", program: "TBI NAVODAYA", icon: TrendingUp, color: "#F472B6" },
  { num: "06", name: "FUNDING", desc: "Seed grants and VC connections.", program: "Elevation Fund", icon: DollarSign, color: "#A78BFA" },
  { num: "07", name: "STARTUP", desc: "Incorporate and build a team.", program: "NAIN Network", icon: Rocket, color: "#F87171" },
  { num: "08", name: "IMPACT", desc: "Scale across markets.", program: "Industry Partnerships", icon: Globe, color: "#60A5FA" },
];

export default function IdeaToImpact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Sticky Left Sidebar */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-1/3">
              <span className="text-xs uppercase tracking-[0.2em] text-blue-400 font-bold mb-4 block">
                The VRIF Journey
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-none mb-6" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}>
                FROM CAMPUS<br />TO COMPANY.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                We don&apos;t just talk about innovation. We provide a structured 8-stage pipeline to take students and researchers from a raw idea to a funded, scalable startup.
              </p>
              
              <div className="mt-8 flex gap-3">
                <button className="px-6 py-3 rounded-full bg-white text-slate-900 font-bold text-sm hover:bg-slate-200 transition-colors" data-cursor="button">
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>

          {/* Scrolling Timeline Right */}
          <div className="lg:col-span-7 relative" ref={containerRef}>
            
            {/* Background Line */}
            <div className="absolute left-8 lg:left-12 top-0 bottom-0 w-[2px] bg-white/5" />
            
            {/* Animated Fill Line */}
            <motion.div 
              className="absolute left-8 lg:left-12 top-0 w-[2px] bg-gradient-to-b from-blue-400 via-purple-400 to-emerald-400 origin-top"
              style={{ height: lineHeight }}
            />

            <div className="space-y-16 lg:space-y-24 py-12">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="relative pl-24 lg:pl-32 group"
                  >
                    {/* Node */}
                    <div 
                      className="absolute left-[33px] lg:left-[49px] top-1 -translate-x-1/2 w-6 h-6 rounded-full border-[4px] border-[#070B14] z-10 transition-colors duration-300"
                      style={{ backgroundColor: step.color }}
                    />
                    
                    {/* Content Card */}
                    <div className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-3xl group-hover:bg-white/[0.04] transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl font-black text-white/10" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}>
                          {step.num}
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">
                          {step.name}
                        </h3>
                      </div>
                      
                      <p className="text-slate-400 mb-6">{step.desc}</p>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.05]">
                        <Icon className="w-4 h-4" style={{ color: step.color }} />
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{step.program}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
