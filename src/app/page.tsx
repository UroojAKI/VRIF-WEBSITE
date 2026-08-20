"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion, AnimatePresence, useScroll, useSpring, useInView, useTransform
} from "framer-motion";
import {
  Building2, GraduationCap, Users, Cpu, Lightbulb, UserCheck, Rocket,
  ChevronRight, ChevronLeft, Download, Mail, Phone, MapPin, Menu, X,
  Zap, Target, Layers, Sparkles, ArrowRight, ArrowUp, Globe,
  TrendingUp, BookOpen, Star, Network, Plus, Minus
} from "lucide-react";

import SmartCursor from "@/components/SmartCursor";
import Preloader from "@/components/Preloader";
import BackgroundEngine from "@/components/BackgroundEngine";
import StatsCounter, { StatItem } from "@/components/StatsCounter";
import GalleryCounter, { GalleryCounterItem } from "@/components/GalleryCounter";
import GlowingFeatureCards from "@/components/GlowingFeatureCards";
import CinematicFooter from "@/components/CinematicFooter";
import CareersSection from "@/components/CareersSection";
import YouTubeModal from "@/components/YouTubeModal";
import HeroNetwork from "@/components/HeroNetwork";
import ScrollJourney from "@/components/ScrollJourney";
import AudienceSelector from "@/components/AudienceSelector";
import IdeaToImpact from "@/components/IdeaToImpact";

import galleryData from "./gallery_data.json";

/* ──────────────────────────────────────────────
   ScrollReveal — fade + rise in on scroll
────────────────────────────────────────────── */
function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   MagneticCard — 3D mouse-parallax tilt
────────────────────────────────────────────── */
function MagneticCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [resetting, setResetting] = useState(false);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -intensity;
      const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * intensity;
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      ref.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      ref.current.style.boxShadow = `${ry * -1.5}px ${rx * 1.5}px 40px rgba(26,86,219,0.13)`;
      ref.current.style.setProperty("--mx", `${mx}%`);
      ref.current.style.setProperty("--my", `${my}%`);
    },
    [intensity]
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    setResetting(true);
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    ref.current.style.boxShadow = "";
    setTimeout(() => setResetting(false), 550);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`magnetic-card spotlight-card${resetting ? " resetting" : ""}${className ? " " + className : ""}`}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────
   SubscribeCard
────────────────────────────────────────────── */
function SubscribeCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  };
  return (
    <div className="max-w-xl mx-auto bg-[#0A101D] rounded-3xl p-8 border border-white/10 shadow-2xl text-center relative overflow-hidden backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 pointer-events-none" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-white mb-2">Stay Updated with VRIF</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-sm mx-auto">
          Subscribe for updates on bootcamps, hackathons, incubation cohorts, and mentoring events.
        </p>
        {submitted ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-emerald-400 font-bold text-sm py-3.5 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            🎉 Thank you! You&apos;ve successfully subscribed.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white/[0.05] border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-white placeholder-slate-400" />
            <button type="submit"
              className="btn-primary px-6 py-3.5 rounded-2xl text-white text-sm font-bold cursor-pointer whitespace-nowrap">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   HOME — single-scroll page
══════════════════════════════════════════════ */
export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeProgram, setActiveProgram] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const teamScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("vrif-preloader-done")) {
      setPreloaderDone(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("vrif-preloader-done", "true");
    setPreloaderDone(true);
  };

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % galleryData.length);
      if (e.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + galleryData.length) % galleryData.length);
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  const scrollTo = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navLinks = [
    { id: "home",           label: "Home" },
    { id: "stats",          label: "Impact" },
    { id: "infrastructure", label: "Labs" },
    { id: "programs",       label: "Programs" },
    { id: "team",           label: "Team" },
    { id: "gallery",        label: "Gallery" },
  ];

  const socialLinks = [
    { href: "https://youtu.be/LYUKhSnSG3s",                 label: "YouTube",   path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    { href: "https://www.linkedin.com/company/vtu-vrif/",    label: "LinkedIn",   path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
    { href: "https://www.instagram.com/vtu.vrif/",           label: "Instagram",  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  ];

  const statItems: StatItem[] = [
    { value: 5000, suffix: "+", label: "Students Engaged", icon: GraduationCap, color: "#3B82F6" },
    { value: 2396, suffix: "+", label: "Students in Vinyasa", icon: Users, color: "#8B5CF6" },
    { value: 5000, suffix: "+", label: "Women Engaged", icon: Star, color: "#EC4899" },
    { value: 100, suffix: "+", label: "Female Founders", icon: UserCheck, color: "#F43F5E" },
    { value: 90, suffix: "+", label: "Prototypes Built", icon: Cpu, color: "#06B6D4" },
    { value: 50, suffix: "+", label: "Startups Supported", icon: Rocket, color: "#10B981" },
    { value: 210, suffix: "+", label: "Colleges Reached", icon: Building2, color: "#6366F1" },
    { value: 725, suffix: "+", label: "Faculty Trained", icon: GraduationCap, color: "#F59E0B" },
  ];

  const coes = [
    { n: "01", title: "Robotics Lab",                desc: "Custom actuators, controllers, and development boards for industrial automation testing.", icon: Cpu,        color: "#3B82F6" },
    { n: "02", title: "IoT Centre of Excellence",   desc: "Testing beds for sensor networks, connectivity protocols, and hardware-software validation.", icon: Globe,      color: "#06B6D4" },
    { n: "03", title: "Drone Technology CoE",       desc: "Autopilot controllers, carbon layouts, telemetry rigs, and flight validation toolkits.", icon: Rocket,     color: "#F59E0B" },
    { n: "04", title: "3D Printing & Prototyping",  desc: "Industrial additive manufacturing printers supporting PLA, ABS, Nylon, and custom polymers.", icon: Zap,        color: "#10B981" },
    { n: "05", title: "Data Centre",                desc: "High-performance compute clusters for processing heavy machine learning models.", icon: Layers,     color: "#8B5CF6" },
    { n: "06", title: "Advanced Product Dev.",      desc: "Multi-axis machinery, tooling labs, and testing racks supporting development lifecycles.", icon: Target,     color: "#F43F5E" },
  ];

  const programs = [
    { id: "vinyasa",      name: "VINYASA",        tagline: "Nurturing Innovation & Entrepreneurship",          icon: Sparkles,   color: "#3B82F6", bg: "rgba(59,130,246,0.1)", details: ["Problem Discovery", "Ideation", "Prototyping", "Validation"] },
    { id: "samshodhana",  name: "SAMSHODHANA",    tagline: "Skill | Research | Innovate | Enterprise",         icon: BookOpen,   color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", details: ["Deep-Tech Focus", "Research Grants", "Mentorship", "Industry Connect"] },
    { id: "she-innovates",name: "SHE INNOVATES",  tagline: "Empowering Women to Lead Innovation",              icon: Star,       color: "#EC4899", bg: "rgba(236,72,153,0.1)", details: ["Women Founders", "Exclusive Funding", "Leadership Training", "Network"] },
    { id: "nain-pmu",     name: "NAIN PMU",        tagline: "New Age Innovation Network",                       icon: Globe,      color: "#F59E0B", bg: "rgba(245,158,11,0.1)", details: ["Statewide Network", "College Hubs", "Seed Capital", "Ecosystem Connect"] },
    { id: "launchpad",    name: "VRIF LAUNCHPAD",  tagline: "Transforming Ideas into Market-Ready Products",   icon: Rocket,     color: "#10B981", bg: "rgba(16,185,129,0.1)", details: ["Product Dev", "Go-To-Market", "Investor Pitching", "Scale-up"] },
    { id: "tbi-navodaya", name: "TBI NAVODAYA",    tagline: "Building Startups Through Structured Incubation", icon: TrendingUp, color: "#6366F1", bg: "rgba(99,102,241,0.1)", details: ["12-Month Cohort", "Co-working Space", "Cloud Credits", "Legal/CA Support"] },
  ];

  const directors = [
    { name: "Dr. S. Vidyashankar",  role: "Vice-Chancellor, VTU & Chairman, VRIF",        img: "/images/vc_vidyashankar.webp" },
    { name: "Dr. Prasad Rampure",   role: "Registrar, VTU — Board of Directors",           img: "/images/registrar.webp" },
    { name: "Dr. Ujwal Urubail",    role: "Registrar (Evaluation) — Board of Directors",   img: "/images/ujwal.webp" },
  ];

  const tbiTeam = [
    { name: "Santosh Ittanagi",   role: "Chief Executive Officer",                           img: "/images/santosh.webp",    linkedin: "https://www.linkedin.com/in/santosh-ittanagi-96944011a/" },
    { name: "Absar Patel",        role: "Operations Manager",                                 img: "/images/absar.webp",      linkedin: "https://www.linkedin.com/in/absar-patel-8b2196169/" },
    { name: "Chetan Haragabal",   role: "Incubation Manager",    img: "/images/chetan_h.webp",   linkedin: "https://www.linkedin.com/in/chetan-haragabal-ab8705268/" },
    { name: "Chitra Thakre",      role: "Incubation Manager",    img: "/images/chitra.webp",     linkedin: "https://www.linkedin.com/in/chitra-thakre-3ba8b320a/" },
    { name: "Vikas Rudrapur",     role: "Associate – Events & Programs",                     img: "/images/vikas.webp",      linkedin: "https://www.linkedin.com/in/vikas-rudrapur-4b3516235/" },
    { name: "Shrinath Basapuri",  role: "Account Officer",                                   img: "/images/shreenath.webp",  linkedin: "https://www.linkedin.com/in/shrinath-basapuri-bb8b26211/" },
    { name: "Chetan Gaonkar",     role: "Associate – Media & Marketing",                     img: "/images/chetan.webp",     linkedin: "https://www.linkedin.com/in/chetan-gaonkar-7b9958214/" },
    { name: "Anju Jamboti",       role: "Associate – Admin",                                 img: "/images/anju.webp",       linkedin: "https://www.linkedin.com/in/anju-jamboti-059b16224/" },
  ];

  const partners = [
    { src: "/images/vtu_logo_cropped.webp",        name: "VTU",               label: "Visvesvaraya Technological University" },
    { src: "/images/k_tech.webp",                 name: "KITS",              label: "Govt. of Karnataka" },
    { src: "/images/kdem.webp",                   name: "KDEM",              label: "Digital Mission" },
    { src: "/images/startup_karnataka_logo.webp", name: "Startup Karnataka", label: "Startup Initiative" },
    { src: "/images/itbt.webp",                   name: "ITBT Dept.",        label: "Govt. of Karnataka" },
  ];

  const galleryItems: GalleryCounterItem[] = galleryData.map((item, idx) => ({
    image: item.src,
    caption: `VRIF Moment #${idx + 1} — Incubation, Research & Hackathons`,
    category: "Campus Innovation",
  }));

  const [isYtModalOpen, setIsYtModalOpen] = useState(false);

  /* ── RENDER ── */
  return (
    <div className="flex flex-col min-h-screen relative font-sans bg-[#070B14] text-slate-100 selection:bg-blue-600 selection:text-white">
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <SmartCursor />
      <BackgroundEngine />

      <motion.div className="scroll-progress-bar bg-blue-600 fixed top-0 left-0 right-0 h-1 z-[60] origin-left" style={{ scaleX }} />

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <header className="fixed top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full left-0 right-0">
        <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/[0.08] shadow-md flex items-center justify-between gap-4">
          <button onClick={() => scrollTo("home")} className="cursor-pointer flex-shrink-0" data-cursor="button">
            <Image src="/images/vrif_logo_cropped.webp" alt="VRIF Logo" width={260} height={70}
              className="object-contain" priority style={{ height: 48, width: "auto" }} />
          </button>

          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} data-cursor="button"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 text-slate-300 hover:text-blue-400 hover:bg-white/[0.06] cursor-pointer">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center gap-1.5">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" data-cursor="link"
                  className="p-2 rounded-xl hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all border border-white/[0.08]" aria-label={s.label}>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-white/[0.08] cursor-pointer border border-white/[0.1]">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="lg:hidden fixed top-24 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-3 shadow-2xl">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="py-3 px-4 rounded-xl text-left font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ MAIN ═══════════════ */}
      <main className="flex-1 relative z-10">

        {/* ───── HERO ───── */}
        <section id="home" className="relative h-screen w-full flex items-center overflow-hidden">
          <HeroNetwork className="absolute inset-0 z-0 opacity-80" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pointer-events-none mt-16 sm:mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-left"
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-black text-white leading-[0.85] tracking-tighter" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}>
                IDEAS<br />
                BECOME<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">IMPACT.</span>
              </h1>
              <div className="mt-8">
                <p className="text-slate-300 text-lg sm:text-xl font-medium max-w-xl pointer-events-auto">
                  The Innovation & Entrepreneurship Arm of VTU Belagavi, catalyzing startups and research commercialization across 210+ engineering campuses in Karnataka.
                </p>
                <div className="flex gap-4 mt-8 pointer-events-auto">
                   <button onClick={() => scrollTo("programs")} className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-sm hover:scale-105 transition-transform" data-cursor="button">
                     Explore Programs
                   </button>
                   <button onClick={() => setIsYtModalOpen(true)} className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-sm hover:bg-white/10 transition-colors" data-cursor="button">
                     Watch Video
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───── SCROLL JOURNEY ───── */}
        <ScrollJourney />

        {/* ───── AUDIENCE SELECTOR ───── */}
        <AudienceSelector />

        {/* ───── STATS / IMPACT COUNTER ───── */}
        <section id="stats" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-blue-300 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">
                Impact at a Glance
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}>
                OUR NUMBERS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">SPEAK</span>
              </h2>
            </ScrollReveal>
            <StatsCounter stats={statItems} />
          </div>
        </section>

        {/* ───── PROGRAMS (In-Page Accordion) ───── */}
        <section id="programs" className="py-24 relative">
          <div className="absolute inset-0 bg-[#0A101D] border-y border-white/5" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-purple-300 font-extrabold px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block mb-4">
                VRIF Ecosystem
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}>
                PROGRAMS &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">INITIATIVES</span>
              </h2>
            </ScrollReveal>
            
            <div className="space-y-4">
              {programs.map((program, i) => {
                const Icon = program.icon;
                const isActive = activeProgram === program.id;
                
                return (
                  <ScrollReveal key={program.id} delay={i * 0.1}>
                    <div 
                      className={`rounded-3xl border transition-all duration-500 overflow-hidden ${isActive ? "bg-white/[0.04] border-white/20" : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]"}`}
                    >
                      <button 
                        onClick={() => setActiveProgram(isActive ? null : program.id)}
                        className="w-full text-left p-6 sm:p-8 flex items-center justify-between cursor-pointer"
                        data-cursor="program"
                      >
                        <div className="flex items-center gap-6">
                           <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300" style={{ background: program.bg, transform: isActive ? "scale(1.1)" : "scale(1)" }}>
                             <Icon className="w-7 h-7" style={{ color: program.color }} />
                           </div>
                           <div>
                             <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{program.name}</h3>
                             <p className="text-slate-400 text-sm mt-1 font-medium">{program.tagline}</p>
                           </div>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 shrink-0 text-white transition-transform duration-300" style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}>
                           {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 sm:px-8 pb-8 pt-2">
                              <div className="h-[1px] w-full bg-white/10 mb-6" />
                              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">What you&apos;ll experience</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {program.details.map((detail, idx) => (
                                  <div key={idx} className="flex flex-col gap-2 p-4 rounded-xl bg-black/40 border border-white/5">
                                    <span className="text-[10px] text-slate-500 font-black">0{idx + 1}</span>
                                    <span className="text-sm font-bold text-slate-200">{detail}</span>
                                  </div>
                                ))}
                              </div>
                              <button className="px-6 py-3 rounded-full text-white font-bold text-sm transition-transform hover:scale-105 cursor-pointer" style={{ background: program.color }} data-cursor="button">
                                Apply for {program.name} →
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───── LABS / CENTRES OF EXCELLENCE ───── */}
        <section id="infrastructure" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-emerald-300 font-extrabold px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 inline-block mb-4">Infrastructure</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}>
                CENTRES OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">EXCELLENCE</span>
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coes.map((coe, i) => {
                const Icon = coe.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <MagneticCard>
                      <div className="rounded-3xl p-8 bg-[#0D1526] border border-white/10 group h-full hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                            style={{ background: coe.color + "15", border: `1px solid ${coe.color}30` }}>
                            <Icon className="w-7 h-7" style={{ color: coe.color }} />
                          </div>
                          <span className="font-black text-3xl opacity-20 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif", color: coe.color }}>{coe.n}</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-white mb-3 leading-tight">{coe.title}</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">{coe.desc}</p>
                      </div>
                    </MagneticCard>
                  </ScrollReveal>
                );
              })}
            </div>

            <div className="mt-16">
              <GlowingFeatureCards />
            </div>
          </div>
        </section>

        {/* ───── IDEA TO IMPACT JOURNEY ───── */}
        <IdeaToImpact />

        {/* ───── EDITORIAL TEAM SECTION (Horizontal Scroll) ───── */}
        <section id="team" className="py-32 relative overflow-hidden bg-[#020408]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <ScrollReveal>
              <h2 className="text-5xl sm:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}>
                THE PEOPLE<br />
                <span className="text-slate-500">BEHIND THE</span><br />
                <span className="text-blue-400">MOVEMENT.</span>
              </h2>
            </ScrollReveal>
          </div>
          
          {/* Board of Directors */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
             <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Board of Directors</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {directors.map((d, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="group">
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-white/5 border border-white/10">
                        <Image src={d.img} alt={d.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-1">{d.name}</h4>
                      <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">{d.role}</p>
                    </div>
                  </ScrollReveal>
                ))}
             </div>
          </div>

          {/* Execution Team - Horizontal Scroll Container */}
          <div className="pl-4 sm:pl-6 lg:pl-8 max-w-[100vw] overflow-x-auto pb-12 hide-scrollbar cursor-grab active:cursor-grabbing"
               ref={teamScrollRef}
               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
               onMouseDown={(e) => {
                 const ele = teamScrollRef.current;
                 if(!ele) return;
                 let startPos = { left: ele.scrollLeft, x: e.clientX };
                 
                 const handleMouseMove = (ev: MouseEvent) => {
                    const dx = ev.clientX - startPos.x;
                    ele.scrollLeft = startPos.left - dx;
                 };
                 
                 const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                 };
                 
                 document.addEventListener('mousemove', handleMouseMove);
                 document.addEventListener('mouseup', handleMouseUp);
               }}>
             <div className="w-fit pr-8">
               <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 border-b border-white/10 pb-4 ml-4 sticky left-4 w-64">Execution Team</h3>
               <div className="flex gap-6">
                 {tbiTeam.map((m, i) => (
                   <div key={i} className="w-64 shrink-0 group">
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-white/5 border border-white/10">
                        <Image src={m.img} alt={m.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105 pointer-events-none" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1">{m.name}</h4>
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider min-h-[32px]">{m.role}</p>
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 mt-2 rounded-xl bg-white/[0.05] hover:bg-blue-600 text-slate-400 hover:text-white transition-all border border-white/[0.1]" data-cursor="link">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </a>
                   </div>
                 ))}
               </div>
             </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
             <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 text-center">Ecosystem Partners</h3>
             <div className="flex flex-wrap justify-center gap-8 lg:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                {partners.map((p, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                     <Image src={p.src} alt={p.name} width={120} height={50} className="object-contain brightness-0 invert" style={{ height: "48px", width: "auto" }} />
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* ───── GALLERY ───── */}
        <section id="gallery" className="py-24 relative bg-[#070B14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-blue-300 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-4">Visual Insights</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}>
                LIFE INSIDE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">VRIF</span>
              </h2>
            </ScrollReveal>

            <GalleryCounter items={galleryItems} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-12">
              {galleryData.slice(0, visibleCount).map((img, i) => (
                <ScrollReveal key={i} delay={(i % 3) * 0.05}>
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-md border border-white/10 cursor-pointer"
                    onClick={() => setLightboxIndex(i)} data-cursor="image">
                    <Image src={img.src} alt={`VRIF Gallery ${i + 1}`} fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                        View Image
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
            {galleryData.length > 6 && (
              <div className="text-center mt-12">
                <button onClick={() => setVisibleCount(visibleCount === 6 ? galleryData.length : 6)}
                  className="px-8 py-4 rounded-full font-bold text-sm flex items-center gap-2 mx-auto bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" data-cursor="button">
                  {visibleCount === 6 ? "View All Photos" : "Collapse Gallery"}
                  <ChevronRight className={`w-4 h-4 transition-transform ${visibleCount > 6 ? "rotate-90" : ""}`} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ───── CAREERS ───── */}
        <CareersSection />

        {/* ───── SUBSCRIBE ───── */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: "'Syncopate', 'Rajdhani', sans-serif" }}>
                STAY IN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">LOOP</span>
              </h2>
            </ScrollReveal>
            <SubscribeCard />
          </div>
        </section>

        {/* ───── CINEMATIC FOOTER ───── */}
        <CinematicFooter navLinks={navLinks} socialLinks={socialLinks} scrollTo={scrollTo} />
      </main>

      {/* YouTube Modal */}
      <YouTubeModal isOpen={isYtModalOpen} onClose={() => setIsYtModalOpen(false)} />

      {/* Gallery lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-[#070B14]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}>
            <button className="absolute top-6 right-6 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer transition-colors"
              onClick={() => setLightboxIndex(null)}>
              <X className="w-6 h-6" />
            </button>
            <button className="absolute left-6 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer z-10 transition-colors hidden sm:block"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryData.length) % galleryData.length); }}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.div key={lightboxIndex}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-5xl w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}>
              <Image src={galleryData[lightboxIndex].src} alt={`VRIF Gallery ${lightboxIndex + 1}`}
                fill className="object-contain" sizes="100vw" priority />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-4">
                <span>{lightboxIndex + 1} / {galleryData.length}</span>
                <div className="w-px h-3 bg-white/20" />
                <span className="text-slate-400">Use arrow keys to navigate</span>
              </div>
            </motion.div>
            <button className="absolute right-6 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white cursor-pointer z-10 transition-colors hidden sm:block"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryData.length); }}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#0D1526]/80 hover:bg-blue-600 text-blue-400 hover:text-white border border-white/10 shadow-2xl backdrop-blur-md cursor-pointer transition-colors duration-200"
            aria-label="Back to top" data-cursor="button">
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
