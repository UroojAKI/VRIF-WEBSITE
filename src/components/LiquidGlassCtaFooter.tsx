"use client";

import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import YouTubeModal from "./YouTubeModal";

const LiquidGlassCtaFooter = () => {
  const [isYtOpen, setIsYtOpen] = useState(false);

  const socialLinks = [
    {
      name: "YouTube",
      href: "https://youtu.be/LYUKhSnSG3s",
      color: "#FF0000",
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/vtu-vrif/",
      color: "#0A66C2",
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/vtu.vrif/",
      color: "#E4405F",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/18RnGRPehh/",
      color: "#1877F2",
      path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z",
    },
  ];

  return (
    <>
      <section className="relative py-28 px-6 md:px-16 lg:px-24 text-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/70 to-slate-950 text-white rounded-t-[40px] my-12 border-t border-slate-800 shadow-2xl">
        {/* Ambient Glowing Orbs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[200px] bg-purple-600/15 blur-[90px] pointer-events-none rounded-full" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-6 inline-block">
            Karnataka Startup Ecosystem
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] max-w-4xl mx-auto mb-6">
            Your next innovation starts at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">VTU VRIF</span>.
          </h2>

          <p className="text-slate-300 font-medium text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Book an incubation discovery call with VTU VRIF. Experience what deep-tech academic research, state-of-the-art lab infrastructure, and grant funding can do for your venture.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-8 py-4 rounded-full text-base shadow-xl shadow-blue-600/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer border border-blue-400/30"
            >
              Apply for Incubation
              <ArrowUpRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsYtOpen(true)}
              className="px-6 py-3.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-red-400 border border-red-500/30 hover:border-red-500/60 font-bold text-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
              Watch Story on YouTube
            </button>
          </div>

          {/* Social Icons Strip */}
          <div className="flex items-center justify-center gap-3 mb-16 flex-wrap">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mr-2">Connect:</span>
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 border border-white/10"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" style={{ color: s.color }}>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

          {/* Footer Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="text-center md:text-left">
              <p className="font-semibold text-slate-300">
                © {new Date().getFullYear()} Visvesvaraya Research &amp; Innovation Foundation (VRIF)
              </p>
              <p className="text-slate-500 mt-0.5">
                Silver Jubilee Bhavan, VTU Campus, Belagavi - 590018, Karnataka
              </p>
            </div>

            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-white transition-colors">About VRIF</a>
              <a href="#careers" className="hover:text-white transition-colors">Careers</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <a
                href="https://youtu.be/LYUKhSnSG3s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> YouTube Channel
              </a>
            </div>
          </div>
        </div>
      </section>

      <YouTubeModal isOpen={isYtOpen} onClose={() => setIsYtOpen(false)} />
    </>
  );
};

export default LiquidGlassCtaFooter;
