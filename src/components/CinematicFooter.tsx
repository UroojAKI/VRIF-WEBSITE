"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function CinematicFooter({
  navLinks,
  socialLinks,
  scrollTo,
}: {
  navLinks: { id: string; label: string }[];
  socialLinks: { href: string; label: string; path: string }[];
  scrollTo: (id: string) => void;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <footer
      ref={containerRef}
      id="footer"
      className="relative overflow-hidden bg-[#020408] pt-32 pb-12 rounded-t-[3rem] sm:rounded-t-[5rem] mt-24 border-t border-white/5"
    >
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] pointer-events-none">
        <div className="absolute top-[-200px] left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute top-[-200px] right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Massive CTA */}
        <motion.div style={{ y, opacity }} className="text-center mb-32">
          <h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8"
            style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}
          >
            WHAT WILL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              YOU BUILD?
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            The innovation & entrepreneurship arm of VTU Belagavi is ready to back your next idea.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:scale-105 transition-transform" data-cursor="button">
              START YOUR JOURNEY →
            </button>
            <button className="px-8 py-4 rounded-full bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-colors" data-cursor="button">
              Watch Our Story ▶
            </button>
          </div>
        </motion.div>

        {/* Marquee Strip */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mb-24 opacity-20 py-4 border-y border-white/10" aria-hidden="true">
          <motion.div
            animate={{ x: [0, -1035] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
            className="flex gap-12 font-black text-4xl uppercase tracking-widest text-white"
            style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}
          >
            <span>INNOVATE • INCUBATE • ACCELERATE • IDEATE • BUILD • LAUNCH • SCALE • IMPACT •</span>
            <span>INNOVATE • INCUBATE • ACCELERATE • IDEATE • BUILD • LAUNCH • SCALE • IMPACT •</span>
          </motion.div>
        </div>

        {/* Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5 flex flex-col gap-6">
            <button onClick={() => scrollTo("home")} className="cursor-pointer flex-shrink-0 w-fit text-left">
              <Image src="/images/vrif_logo_cropped.webp" alt="VRIF Logo" width={220} height={60} className="object-contain brightness-200" />
            </button>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Visvesvaraya Research & Innovation Foundation (VRIF) — the innovation and entrepreneurship arm of VTU, Belagavi.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/[0.03] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all border border-white/10" aria-label={s.label} data-cursor="link">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-5">
            <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollTo(link.id)}
                  className="text-slate-400 hover:text-white text-sm font-medium text-left transition-colors w-fit">{link.label}</button>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-5">
            <h4 className="text-[11px] font-black tracking-widest text-slate-500 uppercase">Office Location</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Silver Jubilee Bhavan, VTU Campus,<br />Jnana Sangama, Machhe,<br />Belagavi – 590018, Karnataka, India
            </p>
            <div className="flex flex-col gap-1 mt-2">
              <a href="mailto:ops@vtuvrif.com" className="text-sm font-bold text-blue-400 hover:text-blue-300" data-cursor="link">ops@vtuvrif.com</a>
              <a href="tel:9739444818" className="text-sm font-bold text-slate-400 hover:text-white" data-cursor="link">+91 97394 44818</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Visvesvaraya Research & Innovation Foundation. All Rights Reserved.
          </div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Innovation Arm of VTU Belagavi
          </div>
        </div>
      </div>
    </footer>
  );
}
