"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import {
  Building2, GraduationCap, Users, Cpu, Lightbulb, UserCheck, Rocket,
  ChevronRight, ChevronLeft, Download, Mail, Phone, MapPin, Menu, X, Award, Compass, Zap,
  Target, Briefcase, Layers, Sparkles, ArrowRight, Globe, Shield, TrendingUp,
  BookOpen, Star, FlaskConical, Microscope, CircuitBoard, Network
} from "lucide-react";

import AnimatedCounter from "@/components/AnimatedCounter";
import ProgramDetailsModal from "@/components/ProgramDetailsModal";
import RocketCursor from "@/components/RocketCursor";
import galleryData from "./gallery_data.json";

/* ── ScrollFloat3D — scroll-triggered 3D entry animation ── */
function ScrollFloat3D({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 15 }}
      transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{ transformStyle: "preserve-3d" }}>
      {children}
    </motion.div>
  );
}

/* ── Floating3DObject — Bounded, Concentric 3-Axis 3D Gyroscope Scroll Animation ── */
function Floating3DObject() {
  const { scrollY } = useScroll();
  // Bounded vertical movement so it stays in the viewport (from -50px to 250px)
  const y = useTransform(scrollY, [0, 4000], [-50, 250]);
  const springY = useSpring(y, { stiffness: 40, damping: 25 });
  
  // Scroll-driven rotations for the rings
  const rotateX = useTransform(scrollY, [0, 4000], [0, 360]);
  const rotateY = useTransform(scrollY, [0, 4000], [0, -720]);
  const rotateZ = useTransform(scrollY, [0, 4000], [0, 540]);
  
  const springX = useSpring(rotateX, { stiffness: 45, damping: 20 });
  const springYRot = useSpring(rotateY, { stiffness: 45, damping: 20 });
  const springZ = useSpring(rotateZ, { stiffness: 45, damping: 20 });

  return (
    <motion.div
      style={{ y: springY }}
      className="fixed right-[4%] top-[25%] pointer-events-none w-32 h-32 md:w-44 md:h-44 opacity-[0.35] z-[1]">
      <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Outer Ring - Y Axis */}
        <motion.div 
          style={{ rotateY: springYRot, transformStyle: "preserve-3d" }}
          className="absolute inset-0 border-[3px] border-blue-500/50 rounded-full flex items-center justify-center"
        >
          {/* Middle Ring - X Axis */}
          <motion.div 
            style={{ rotateX: springX, transformStyle: "preserve-3d" }}
            className="w-[85%] h-[85%] border-[3px] border-indigo-500/50 rounded-full flex items-center justify-center"
          >
            {/* Inner Ring - Z Axis */}
            <motion.div 
              style={{ rotateZ: springZ }}
              className="w-[80%] h-[80%] border-2 border-emerald-500/40 rounded-full flex items-center justify-center"
            >
              {/* Core */}
              <motion.div 
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_20px_#f59e0b]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#0ea5e9]"
            style={{
              top: '50%',
              left: '50%',
              transformStyle: "preserve-3d",
              animation: `orbit-${i} ${8 + i * 4}s linear infinite`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Hero right panel — Karnataka Innovation Ecosystem Dashboard ── */
/* ── Interactive Innovation Launch Engine (Hero Right Animation) ── */
function HeroAnimation() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] aspect-square flex items-center justify-center mx-auto">
      {/* 3D background grid effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-2xl" />

      {/* Rotating outer orbital rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[95%] h-[95%] rounded-full border-2 border-dashed border-blue-200/40" 
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-indigo-200/30" 
      />
      
      {/* 3D Tilted Orbiting Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateY(-15deg)" }}>
        {/* Ring 1 */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-[90%] h-[90%] border border-cyan-400/40 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00c4cc]" />
        </motion.div>
        
        {/* Ring 2 */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[70%] h-[70%] border border-purple-500/35 rounded-full"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-purple-50 shadow-[0_0_10px_#7c3aed]" />
        </motion.div>
      </div>

      {/* Pulsing Central VRIF Hub Core with Logo and rotating border */}
      <div className="z-10 text-center relative flex items-center justify-center">
        {/* Rotating outer border of the hub */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-dashed border-blue-500/60"
        />
        
        {/* Second counter-rotating outer border of the hub */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-[140px] h-[140px] sm:w-[176px] sm:h-[176px] rounded-full border border-indigo-400/40"
        />

        {/* Pulsing Core with VRIF logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.08, 1],
            boxShadow: ["0 0 20px rgba(26,86,219,0.2)", "0 0 40px rgba(26,86,219,0.5)", "0 0 20px rgba(26,86,219,0.2)"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white flex items-center justify-center border border-blue-100 shadow-xl animate-tilt-3d p-3.5 z-10"
        >
          <Image src="/images/vrif_logo_cropped.webp" alt="VRIF Logo" width={140} height={56} className="object-contain w-[90%] h-[90%]" style={{ width: "90%", height: "auto" }} priority />
        </motion.div>

        {/* Pulse rings radiating outward */}
        {[0, 1, 2].map((n) => (
          <motion.div key={n} className="absolute inset-0 m-auto rounded-full border border-blue-400/30 pointer-events-none"
            style={{ width: 90, height: 90 }}
            animate={{ scale: [1, 3.2], opacity: [0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: n * 1.3, ease: "easeOut" }} />
        ))}
      </div>

      {/* Floating 3D Startup Rocket Node */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          x: [-6, 6, -6],
          rotate: [12, 8, 12]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-[8%] z-20 flex flex-col items-center gap-1.5"
      >
        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
          <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
            <path d="M12 2C12 2 9 6 9 12C9 15.5 10.5 18 12 19C13.5 18 15 15.5 15 12C15 6 12 2 12 2Z" fill="white" />
            <path d="M9 14L5 18V19H8L9 17" fill="#7c3aed" />
            <path d="M15 14L19 18V19H16L15 17" fill="#7c3aed" />
            <circle cx="12" cy="10" r="1.5" fill="#12131a" />
          </svg>
        </div>
        <span className="text-[11px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Launch</span>
      </motion.div>

      {/* Floating Ideation Node */}
      <motion.div
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[6%] top-[22%] z-20 flex flex-col items-center gap-1.5"
      >
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white flex items-center justify-center shadow-md border border-slate-100">
          <Lightbulb className="w-10 h-10 text-amber-500" />
        </div>
        <span className="text-[10px] font-black text-slate-500 bg-white border border-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Ideate</span>
      </motion.div>

      {/* Floating Scale/Growth Node */}
      <motion.div
        animate={{
          y: [8, -8, 8],
          x: [-4, 4, -4]
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute left-[15%] bottom-[10%] z-20 flex flex-col items-center gap-1.5"
      >
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white flex items-center justify-center shadow-md border border-slate-100">
          <TrendingUp className="w-10 h-10 text-emerald-500" />
        </div>
        <span className="text-[10px] font-black text-slate-500 bg-white border border-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Scale</span>
      </motion.div>

      {/* Floating Connect/Network Node */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          x: [4, -4, -4]
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute right-[8%] bottom-[18%] z-20 flex flex-col items-center gap-1.5"
      >
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-white flex items-center justify-center shadow-md border border-slate-100">
          <Network className="w-10 h-10 text-indigo-500" />
        </div>
        <span className="text-[10px] font-black text-slate-500 bg-white border border-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">Connect</span>
      </motion.div>

      {/* Animated Connective Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400">
        <motion.line x1="80" y1="110" x2="200" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
        <motion.line x1="320" y1="80" x2="200" y2="200" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />
        <motion.line x1="100" y1="320" x2="200" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
        <motion.line x1="330" y1="290" x2="200" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
      </svg>
    </div>
  );
}

function SubscribeCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-100 shadow-lg text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 pointer-events-none" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2">Stay Updated with VRIF</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed max-w-sm mx-auto">
          Subscribe to our newsletter for updates on bootcamps, hackathons, incubation cohorts, and mentoring events.
        </p>

        {submitted ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-emerald-600 font-bold text-sm bg-emerald-50 py-3.5 px-6 rounded-2xl border border-emerald-100">
            🎉 Thank you! You've successfully subscribed to our newsletter.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-slate-50/50"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function GallerySection() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  const showMore = () => {
    if (visibleCount === 6) {
      setVisibleCount(galleryData.length);
    } else {
      setVisibleCount(6);
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryData.length) % galleryData.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryData.length);
    }
  };

  return (
    <section id="gallery" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFloat3D>
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">Visual Insights</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4">VRIF <span className="text-gradient-blue">Gallery</span></h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-4 leading-relaxed">Explore snapshots from our workshops, innovation labs, and ecosystem activities across Karnataka.</p>
          </div>
        </ScrollFloat3D>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryData.slice(0, visibleCount).map((img, i) => (
            <ScrollFloat3D key={i} delay={(i % 3) * 0.05}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all cursor-pointer group bg-slate-100"
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={img.src}
                  alt={`VRIF Gallery Image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">View Photo</span>
                </div>
              </motion.div>
            </ScrollFloat3D>
          ))}
        </div>

        {galleryData.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={showMore}
              className="btn-outline px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer mx-auto"
            >
              {visibleCount === 6 ? "View More Photos" : "Collapse Gallery"}
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${visibleCount > 6 ? "rotate-90" : ""}`} />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-10"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryData[lightboxIndex].src}
                alt={`VRIF Gallery Image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
              {/* Image indicator count */}
              <div className="absolute bottom-6 left-6 bg-slate-950/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-full">
                {lightboxIndex + 1} / {galleryData.length}
              </div>
            </motion.div>

            {/* Next button */}
            <button
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-10"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Home() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "infrastructure", "programs", "team", "gallery", "resources", "contact"];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "infrastructure", label: "Labs" },
    { id: "programs", label: "Programs" },
    { id: "team", label: "Team" },
    { id: "gallery", label: "Gallery" },
    { id: "resources", label: "Resources" },
    { id: "contact", label: "Contact" },
  ];

  const coes = [
    { title: "Robotics Lab", desc: "Custom actuators, controllers, and development boards for industrial automation testing.", icon: Cpu, color: "#1a56db" },
    { title: "Data Centre", desc: "High-performance compute clusters for processing heavy machine learning models.", icon: Layers, color: "#7c3aed" },
    { title: "IoT Centre of Excellence", desc: "Testing beds for sensor networks, connectivity protocols, and hardware-software validation.", icon: Globe, color: "#0ea5e9" },
    { title: "Drone Technology CoE", desc: "Autopilot controllers, carbon layouts, telemetry rigs, and flight validation toolkits.", icon: Rocket, color: "#f59e0b" },
    { title: "3D Printing & Rapid Prototyping", desc: "Industrial additive manufacturing printers supporting PLA, ABS, Nylon, and custom polymers.", icon: Zap, color: "#10b981" },
    { title: "Advanced Product Development", desc: "Multi-axis machinery, tooling labs, and testing racks supporting development lifecycles.", icon: Target, color: "#ef4444" },
  ];

  const programs = [
    { id: "vinyasa", name: "VINYASA", tagline: "Nurturing Innovation & Entrepreneurship", icon: Sparkles, color: "#1a56db", bg: "#e8f0fe" },
    { id: "samshodhana", name: "SAMSHODHANA", tagline: "Skill | Research | Innovate | Enterprise", icon: BookOpen, color: "#7c3aed", bg: "#ede9fe" },
    { id: "she-innovates", name: "SHE INNOVATES", tagline: "Empowering Women to Lead Innovation", icon: Star, color: "#ec4899", bg: "#fce7f3" },
    { id: "nain-pmu", name: "NAIN PMU", tagline: "New Age Innovation Network", icon: Globe, color: "#f59e0b", bg: "#fef3c7" },
    { id: "launchpad", name: "VRIF LAUNCHPAD", tagline: "Transforming Ideas into Market-Ready Products", icon: Rocket, color: "#10b981", bg: "#d1fae5" },
    { id: "tbi-navodaya", name: "TBI NAVODAYA", tagline: "Building Startups Through Structured Incubation", icon: TrendingUp, color: "#6366f1", bg: "#e0e7ff" },
  ];

  const stats = [
    { value: "5000+", label: "Students Engaged", icon: GraduationCap, color: "#1a56db" },
    { value: "2396+", label: "Students in Vinyasa", icon: Users, color: "#7c3aed" },
    { value: "5000+", label: "Women Engaged", icon: Star, color: "#ec4899" },
    { value: "100+", label: "Female Founders", icon: UserCheck, color: "#ef4444" },
    { value: "90+", label: "Prototypes Built", icon: Cpu, color: "#0ea5e9" },
    { value: "50+", label: "Startups Supported", icon: Rocket, color: "#10b981" },
    { value: "210+", label: "Colleges Reached", icon: Building2, color: "#6366f1" },
    { value: "725+", label: "Faculty Trained", icon: GraduationCap, color: "#f59e0b" },
    { value: "₹5 Lakh", label: "NAIN Project Funding", icon: Award, color: "#7c3aed" },
    { value: "₹2.5 Lakh", label: "Launchpad MVP Grant", icon: Zap, color: "#1a56db" },
    { value: "12 Month", label: "Structured Incubation", icon: Target, color: "#10b981" },
    { value: "6", label: "Centres of Excellence", icon: Layers, color: "#0ea5e9" },
  ];

  const directors = [
    { name: "Dr. S. Vidyashankar", role: "Vice-Chancellor, VTU & Chairman, VRIF", img: "/images/vc_vidyashankar.webp" },
    { name: "Dr. Prasad Rampure", role: "Registrar, VTU — Board of Directors", img: "/images/registrar.webp" },
    { name: "Dr. Ujwal Urubail", role: "Registrar (Evaluation), VTU — Board of Directors", img: "/images/ujwal.webp" },
  ];

  const tbiTeam = [
    { name: "Santosh Ittanagi", role: "Chief Executive Officer", img: "/images/santosh.webp", linkedin: "https://www.linkedin.com/in/santosh-ittanagi-96944011a/" },
    { name: "Absar Patel", role: "Operations Manager", img: "/images/absar.webp", linkedin: "https://www.linkedin.com/in/absar-patel-8b2196169/" },
    { name: "Chetan Haragabal", role: "Incubation Manager (Outreach & Market Content)", img: "/images/chetan_h.webp", linkedin: "https://www.linkedin.com/in/chetan-haragabal-ab8705268/" },
    { name: "Chitra Thakre", role: "Incubation Manager (Mentor Connect & Facility Management)", img: "/images/chitra.webp", linkedin: "https://www.linkedin.com/in/chitra-thakre-3ba8b320a/" },
    { name: "Vikas Rudrapur", role: "Associate – Events & Programs", img: "/images/vikas.webp", linkedin: "https://www.linkedin.com/in/vikas-rudrapur-4b3516235/" },
    { name: "Shrinath Basapuri", role: "Account Officer", img: "/images/shreenath.webp", linkedin: "https://www.linkedin.com/in/shrinath-basapuri-bb8b26211/" },
    { name: "Chetan Gaonkar", role: "Associate – Media & Marketing", img: "/images/chetan.webp", linkedin: "https://www.linkedin.com/in/chetan-gaonkar-7b9958214/" },
    { name: "Anju Jamboti", role: "Associate – Admin", img: "/images/anju.webp", linkedin: "https://www.linkedin.com/in/anju-jamboti-059b16224/" },
  ];

  const partners = [
    { src: "/images/k_tech.webp", name: "KITS", label: "Govt. of Karnataka" },
    { src: "/images/kdem.webp", name: "KDEM", label: "Digital Mission" },
    { src: "/images/startup_karnataka_logo.webp", name: "Startup Karnataka", label: "Startup Initiative" },
    { src: "/images/itbt.webp", name: "ITBT Dept.", label: "Govt. of Karnataka" },
  ];

  const marqueeItems = [
    "🚀 Startup Incubation", "⚡ Innovation Programs", "🔬 Research Commercialization",
    "💡 Entrepreneurship Development", "🤝 Industry Partnerships", "🏆 NAIN PMU",
    "👩‍💼 Women Innovators", "🛸 Drone Technology", "🤖 Robotics Lab", "📡 IoT Centre",
    "🖨️ 3D Prototyping", "🌐 VTU Belagavi", "✨ TBI Navodaya",
  ];

  const socialLinks = [
    { href: "https://www.linkedin.com/company/vtu-vrif/", label: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
    { href: "https://www.instagram.com/vtu.vrif/", label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { href: "https://www.facebook.com/share/18RnGRPehh/", label: "Facebook", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
  ];

  return (
    <div className="flex flex-col min-h-screen relative" style={{ background: "#f0f4ff", color: "#0d1b3e" }}>
      <RocketCursor />

      {/* ═══ FIXED VRIF LOGO BACKGROUND — large, visible, static ═══ */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div style={{ transform: "rotate(0deg) scale(1)", opacity: 0.22 }}>
          <Image src="/images/vrif_logo_cropped.webp" alt="" width={1200} height={500}
            className="object-contain select-none"
            style={{ filter: "saturate(0.5) opacity(0.85)", maxWidth: "95vw" }}
            priority />
        </div>
      </div>

      {/* ═══ SCROLL-FOLLOWING 3D OBJECT ═══ */}
      <Floating3DObject />

      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <header className="sticky top-0 z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex items-center justify-between gap-4">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-4 cursor-pointer group flex-shrink-0">
            <Image src="/images/vrif_logo_cropped.webp" alt="VRIF Logo" width={280} height={80}
              className="object-contain transition-all"
              priority style={{ height: 72, width: "auto" }} />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeSection === link.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}>{link.label}</button>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-xl hover:bg-blue-600 hover:text-white text-blue-600 transition-all"
                  aria-label={s.label}>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/80 text-blue-600 shadow-sm">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-24 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-xl p-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className={`py-3 px-4 rounded-xl text-left font-semibold transition-colors ${
                  activeSection === link.id ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-blue-50"
                }`}>{link.label}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden hero-bg z-10">
        <div className="absolute inset-0 dot-pattern opacity-30" />

        {/* Gradient orbs */}
        <motion.div className="absolute top-16 right-20 w-80 h-80 rounded-full pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }} style={{ background: "radial-gradient(circle, #1a56db 0%, transparent 70%)" }} />
        <motion.div className="absolute bottom-20 left-10 w-60 h-60 rounded-full pointer-events-none"
          animate={{ scale: [1, 1.3, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }} style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full pt-8 pb-20 md:pt-12 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

            {/* Left: Text */}
            <motion.div style={{ y: heroTextY }} className="flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/80 text-blue-700 shadow-sm backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  Innovation & Entrepreneurship Arm of VTU Belagavi
                </span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                <div className="font-rajdhani text-7xl sm:text-8xl xl:text-[10rem] font-black leading-none tracking-tight"
                  style={{ background: "linear-gradient(135deg, #0d1b3e 0%, #1a56db 50%, #0ea5e9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  VRIF
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-[0.25em] mt-2">
                  Visvesvaraya Research & Innovation Foundation
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-black leading-snug text-slate-800">
                Transforming Students into<br />
                <span className="text-gradient-blue">Entrepreneurs & Innovators</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.26 }}
                className="text-base text-slate-500 leading-relaxed max-w-lg">
                A statewide innovation movement empowering engineering students to build startups, solve grassroots challenges, and create lasting impact.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.36 }}
                className="flex flex-wrap gap-4">
                <button onClick={() => scrollTo("programs")}
                  className="btn-primary px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer">
                  Explore Programs <ChevronRight className="w-4 h-4" />
                </button>
                <button onClick={() => scrollTo("contact")}
                  className="btn-outline px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer">
                  <Mail className="w-4 h-4" /> Contact Us
                </button>
              </motion.div>
            </motion.div>

            {/* Right: Innovation Scene */}
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="flex items-center justify-center w-full mt-8 lg:mt-0">
              <HeroAnimation />
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-blue-400 z-10">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-blue-400 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════ MARQUEE ═══════════════════ */}
      <div className="relative overflow-hidden py-4 border-y-2 border-blue-100 bg-white/70 backdrop-blur-[1px] z-10">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center text-xs font-bold text-blue-600 uppercase tracking-widest px-6">
              <span className="mr-6 text-blue-400 font-bold select-none">•</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════ IMPACT STATS ═══════════════════ */}
      <section className="py-24 relative z-10" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(240,244,255,0.4) 100%)", backdropFilter: "blur(1px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFloat3D>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">Impact at a Glance</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4">Our Numbers <span className="text-gradient-blue">Speak</span></h2>
            </div>
          </ScrollFloat3D>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <ScrollFloat3D key={i} delay={i * 0.06}>
                  <motion.div whileHover={{ scale: 1.05, y: -6 }}
                    className="card-3d bg-white rounded-3xl p-7 shadow-md text-center relative overflow-hidden group">
                    <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: stat.color + "12" }}>
                      <Icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                    <div className="stat-number mb-1" style={{ color: stat.color }}>
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                  </motion.div>
                </ScrollFloat3D>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section id="about" className="py-24 bg-transparent relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollFloat3D>
              <div>
                <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">About VRIF</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4 mb-6">
                  Karnataka&apos;s Premier<br /><span className="text-gradient-purple">Innovation Engine</span>
                </h2>
                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  The Visvesvaraya Research & Innovation Foundation (VRIF) is the Innovation & Entrepreneurship Arm of Visvesvaraya Technological University (VTU), Belagavi, registered as a Section 8 Company under the Companies Act 2013.
                </p>
                <p className="text-base text-slate-600 leading-relaxed mb-8">
                  VRIF fosters a culture of innovation, entrepreneurship, and research commercialization across Karnataka&apos;s engineering ecosystem — spanning 210+ VTU-affiliated colleges and over 5,000 students.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Startup Incubation", desc: "Full 12-month incubation cycle through TBI Navodaya" },
                    { title: "Tech Transfer", desc: "IP commercialization and patent licensing support" },
                    { title: "Industry Connect", desc: "Bridging students with industry mentors" },
                    { title: "Women Innovation", desc: "Dedicated She Innovates program" },
                  ].map((item, i) => (
                    <ScrollFloat3D key={i} delay={i * 0.08}>
                      <div className="p-4 rounded-2xl bg-blue-50">
                        <div className="text-sm font-black text-blue-700 mb-1">{item.title}</div>
                        <div className="text-xs text-slate-500 leading-snug">{item.desc}</div>
                      </div>
                    </ScrollFloat3D>
                  ))}
                </div>
              </div>
            </ScrollFloat3D>

            <ScrollFloat3D delay={0.15}>
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotateY: [0, 5, 0, -5, 0], rotateX: [0, 3, 0, -3, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}>
                  <div className="w-[360px] bg-white rounded-3xl p-8 shadow-2xl shadow-blue-100 relative overflow-hidden">
                    <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-4">Mission & Vision</h3>
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-blue-50">
                        <div className="text-xs font-black text-blue-700 uppercase tracking-wider mb-1">Mission</div>
                        <p className="text-sm text-slate-600 leading-snug">To catalyze innovation and entrepreneurship by bridging academic research with real-world impact.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-purple-50">
                        <div className="text-xs font-black text-purple-700 uppercase tracking-wider mb-1">Vision</div>
                        <p className="text-sm text-slate-600 leading-snug">To build Karnataka&apos;s most dynamic startup and innovation ecosystem from VTU&apos;s network of institutions.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollFloat3D>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════ CoEs ═══════════════════ */}
      <section id="infrastructure" className="py-24 relative z-10 bg-blue-50/30 backdrop-blur-[1px]">
        <div className="absolute inset-0 grid-pattern" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollFloat3D>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm">Infrastructure</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4">Centres of <span className="text-gradient-blue">Excellence</span></h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">Six advanced labs equipped with industry-grade tools for prototyping, testing, and innovating.</p>
            </div>
          </ScrollFloat3D>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coes.map((coe, i) => {
              const Icon = coe.icon;
              return (
                <ScrollFloat3D key={i} delay={i * 0.07}>
                  <motion.div whileHover={{ y: -10 }} className="coe-card rounded-3xl p-7 group h-full">
                    <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: coe.color + "15" }}>
                      <Icon className="w-7 h-7" style={{ color: coe.color }} />
                    </div>
                    <h3 className="text-base font-black text-slate-800 mb-3 leading-tight">{coe.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{coe.desc}</p>
                  </motion.div>
                </ScrollFloat3D>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════ PROGRAMS ═══════════════════ */}
      <section id="programs" className="py-24 bg-transparent relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ScrollFloat3D>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">VRIF Ecosystem</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4">Programs & <span className="text-gradient-purple">Initiatives</span></h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-sm">Six flagship programs from ideation to market-ready ventures.</p>
            </div>
          </ScrollFloat3D>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, i) => {
              const Icon = program.icon;
              return (
                <ScrollFloat3D key={i} delay={i * 0.06}>
                  <motion.div whileHover={{ y: -8 }}
                    className="program-card bg-white rounded-3xl p-7 border border-slate-100 shadow-md hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer h-full"
                    onClick={() => setSelectedProgram(program.id)}>
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: program.color }} />
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: program.bg }}>
                        <Icon className="w-6 h-6" style={{ color: program.color }} />
                      </div>
                    </div>
                    <h3 className="text-base font-black text-slate-800 mb-2">{program.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">{program.tagline}</p>
                    <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all" style={{ color: program.color }}>
                      <span>Learn More</span><ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </ScrollFloat3D>
              );
            })}
          </div>
        </div>
      </section>

      <ProgramDetailsModal programId={selectedProgram} onClose={() => setSelectedProgram(null)} />

      <hr className="section-divider" />

      {/* ═══════════════════ TEAM ═══════════════════ */}
      <section id="team" className="py-24 relative z-10 bg-blue-50/30 backdrop-blur-[1px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFloat3D>
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm">Leadership</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4">Leadership & <span className="text-gradient-blue">Team</span></h2>
            </div>
          </ScrollFloat3D>

          {/* Directors */}
          <div className="mb-14">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Board of Directors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {directors.map((d, i) => (
                <ScrollFloat3D key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -6 }} className="team-card rounded-3xl p-6 text-center">
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-blue-50 relative">
                      <Image src={d.img} alt={d.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <h4 className="text-sm font-black text-slate-800 leading-tight mb-1">{d.name}</h4>
                    <p className="text-xs text-slate-500 leading-snug">{d.role}</p>
                  </motion.div>
                </ScrollFloat3D>
              ))}
            </div>
          </div>

          {/* TBI Team */}
          <div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 text-center">TBI Team</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {tbiTeam.map((member, i) => (
                <ScrollFloat3D key={i} delay={i * 0.04}>
                  <motion.div whileHover={{ y: -6 }} className="team-card rounded-2xl p-5 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden bg-blue-50 relative">
                      <Image src={member.img} alt={member.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <h4 className="text-xs font-black text-slate-800 leading-tight mb-1">{member.name}</h4>
                    <p className="text-[10px] text-slate-500 leading-snug mb-3">{member.role}</p>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors hover:underline">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      LinkedIn
                    </a>
                  </motion.div>
                </ScrollFloat3D>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════ PARTNERS ═══════════════════ */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFloat3D>
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">Ecosystem Stakeholders</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4">Our Patron & <span className="text-gradient-blue">Partners</span></h2>
            </div>
          </ScrollFloat3D>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            <ScrollFloat3D>
              <motion.div whileHover={{ y: -8, scale: 1.04 }}
                className="p-7 rounded-3xl flex flex-col items-center text-center gap-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-200 animate-glow-pulse">
                <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full">★ Patron</span>
                <Image src="/images/vtu_logo.webp" alt="VTU Logo" width={56} height={56} className="object-contain" />
                <div>
                  <h4 className="text-sm font-black">VTU Belagavi</h4>
                  <p className="text-[10px] text-blue-200 uppercase tracking-widest font-bold mt-0.5">Patron University</p>
                </div>
              </motion.div>
            </ScrollFloat3D>
            {partners.map((p, i) => (
              <ScrollFloat3D key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -8, scale: 1.03 }}
                  className="partner-box p-6 rounded-3xl flex flex-col items-center text-center gap-4 h-full">
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Partner</span>
                  <div className="h-14 flex items-center justify-center w-full">
                    <Image src={p.src} alt={p.name} width={90} height={48} className="object-contain" style={{ maxHeight: 48, width: "auto", height: "auto" }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-700">{p.name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{p.label}</p>
                  </div>
                </motion.div>
              </ScrollFloat3D>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════ GALLERY ═══════════════════ */}
      <GallerySection />

      <hr className="section-divider" />

      {/* ═══════════════════ RESOURCES ═══════════════════ */}
      <section id="resources" className="py-20 relative z-10 bg-blue-50/30 backdrop-blur-[1px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFloat3D>
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm">Resources</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4">Resource <span className="text-gradient-blue">Centre</span></h2>
            </div>
          </ScrollFloat3D>
          <ScrollFloat3D delay={0.1}>
            <div className="max-w-xl mx-auto">
              <motion.div whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 shadow-xl shadow-blue-50 flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">VRIF Brochure</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">Official brochure — programs, infrastructure, team, and impact across Karnataka.</p>
                </div>
                <a href="/VTU_VRIF_Brochure.pdf" download
                  className="btn-primary px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer">
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </motion.div>
            </div>
          </ScrollFloat3D>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════ EVENTS — NEWSLETTER SUBSCRIBE ═══════════════════ */}
      <section className="py-20 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFloat3D>
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">Innovation Calendar</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4">Events & <span className="text-gradient-purple">Programs</span></h2>
            </div>
          </ScrollFloat3D>
          <ScrollFloat3D delay={0.1}>
            <SubscribeCard />
          </ScrollFloat3D>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section id="contact" className="py-20 relative z-10 bg-blue-50/30 backdrop-blur-[1px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollFloat3D>
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-extrabold px-4 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm">Get In Touch</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mt-4">Contact <span className="text-gradient-blue">VRIF</span></h2>
            </div>
          </ScrollFloat3D>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: MapPin, title: "Office Address", content: "Silver Jubilee Bhavan, VTU Campus,\nJnana Sangama, Machhe,\nBelagavi – 590018,\nKarnataka, India", color: "#1a56db", action: null },
              { icon: Mail, title: "General Enquiries", content: "ops@vtuvrif.com", color: "#7c3aed", action: "mailto:ops@vtuvrif.com" },
              { icon: Phone, title: "Phone", content: "+91 97394 44818\nMon–Fri, 9 AM – 6 PM IST", color: "#10b981", action: "tel:9739444818" },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollFloat3D key={i} delay={i * 0.1}>
                  <motion.div whileHover={{ y: -8 }}
                    className="bg-white rounded-3xl p-8 shadow-lg text-center flex flex-col items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: card.color }}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{card.title}</div>
                      {card.action ? (
                        <a href={card.action} className="text-base font-black hover:underline whitespace-pre-line" style={{ color: card.color }}>{card.content}</a>
                      ) : (
                        <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{card.content}</p>
                      )}
                    </div>
                  </motion.div>
                </ScrollFloat3D>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="bg-white/60 backdrop-blur-[2px] border-t border-blue-100 pt-14 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-5 flex flex-col gap-5">
              {/* Footer logos — NO borders, clean images, large */}
              <button onClick={() => scrollTo("home")} className="flex items-center gap-4 cursor-pointer w-fit group">
                <Image src="/images/vrif_logo_cropped.webp" alt="VRIF Logo" width={280} height={80}
                  className="object-contain" style={{ height: 72, width: "auto" }} />
              </button>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Visvesvaraya Research & Innovation Foundation (VRIF) — the innovation and entrepreneurship arm of VTU, Belagavi.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white transition-all"
                    aria-label={s.label}>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:col-span-3 flex flex-col gap-4">
              <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase">Quick Links</h4>
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <button key={link.id} onClick={() => scrollTo(link.id)}
                    className="text-slate-500 hover:text-blue-600 text-sm font-semibold text-left transition-colors">{link.label}</button>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-4">
              <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase">Office Location</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Silver Jubilee Bhavan, VTU Campus,<br />
                Jnana Sangama, Machhe,<br />
                Belagavi – 590018, Karnataka, India
              </p>
            </div>
          </div>
          <div className="border-t border-blue-50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              © {new Date().getFullYear()} Visvesvaraya Research & Innovation Foundation. All Rights Reserved.
            </div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Innovation Arm of VTU Belagavi
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
