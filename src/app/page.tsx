"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  Building2,
  GraduationCap,
  Users,
  Cpu,
  Lightbulb,
  UserCheck,
  Rocket,
  ChevronRight,
  ChevronLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Award,
  Zap,
  Target,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowUp,
  Globe,
  Shield,
  TrendingUp,
  BookOpen,
  Star,
  FlaskConical,
  Microscope,
  CircuitBoard,
  Network,
  Compass,
} from "lucide-react";

import AnimatedCounter from "@/components/AnimatedCounter";
import ProgramDetailsModal from "@/components/ProgramDetailsModal";
import RocketCursor from "@/components/RocketCursor";
import galleryData from "./gallery_data.json";

/* ──────────────────────────────────────────────────
   ScrollFloat3D — scroll-triggered 3D entry
──────────────────────────────────────────────────── */
function ScrollFloat3D({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 50, rotateX: 15 }
      }
      transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] as const }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────
   MagneticCard — 3D mouse-parallax tilt wrapper
──────────────────────────────────────────────────── */
function MagneticCard({
  children,
  className = "",
  intensity = 12,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isResetting, setIsResetting] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / (rect.height / 2)) * -intensity;
      const ry = ((e.clientX - cx) / (rect.width / 2)) * intensity;
      ref.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
      ref.current.style.boxShadow = `${ry * -1.5}px ${rx * 1.5}px 40px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.15)`;
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    setIsResetting(true);
    ref.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    ref.current.style.boxShadow = "";
    setTimeout(() => setIsResetting(false), 500);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-card ${isResetting ? "resetting" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────
   AuroraBackground — floating atmospheric blobs
──────────────────────────────────────────────────── */
function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="aurora-orb-1 absolute w-[800px] h-[800px] -top-64 -left-64 opacity-[0.12]"
      />
      <div
        className="aurora-orb-2 absolute w-[600px] h-[600px] -bottom-32 -right-32 opacity-[0.10]"
      />
      <div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────
   Floating3DObject — scroll-driven gyroscope
──────────────────────────────────────────────────── */
function Floating3DObject() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 4000], [-50, 250]);
  const springY = useSpring(y, { stiffness: 40, damping: 25 });
  const rotateX = useTransform(scrollY, [0, 4000], [0, 360]);
  const rotateY = useTransform(scrollY, [0, 4000], [0, -720]);
  const rotateZ = useTransform(scrollY, [0, 4000], [0, 540]);
  const springX = useSpring(rotateX, { stiffness: 45, damping: 20 });
  const springYRot = useSpring(rotateY, { stiffness: 45, damping: 20 });
  const springZ = useSpring(rotateZ, { stiffness: 45, damping: 20 });

  return (
    <motion.div
      style={{ y: springY }}
      className="fixed right-[4%] top-[25%] pointer-events-none w-32 h-32 md:w-44 md:h-44 opacity-[0.25] z-[1]"
    >
      <div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          style={{ rotateY: springYRot, transformStyle: "preserve-3d" }}
          className="absolute inset-0 border-[2px] border-blue-400/40 rounded-full flex items-center justify-center"
        >
          <motion.div
            style={{ rotateX: springX, transformStyle: "preserve-3d" }}
            className="w-[85%] h-[85%] border-[2px] border-violet-400/40 rounded-full flex items-center justify-center"
          >
            <motion.div
              style={{ rotateZ: springZ }}
              className="w-[80%] h-[80%] border border-cyan-400/35 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_0_20px_#f59e0b]"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
            style={{
              top: "50%",
              left: "50%",
              transformStyle: "preserve-3d",
              animation: `orbit-${i} ${8 + i * 4}s linear infinite`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────
   HeroAnimation — Innovation Launch Engine
──────────────────────────────────────────────────── */
function HeroAnimation() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] aspect-square flex items-center justify-center mx-auto">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-2xl" />

      {/* Outer rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[95%] h-[95%] rounded-full border-2 border-dashed border-blue-400/20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-violet-400/20"
      />

      {/* Tilted 3D rings */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(60deg) rotateY(-15deg)",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-[90%] h-[90%] border border-cyan-400/40 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[70%] h-[70%] border border-violet-500/35 rounded-full"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_#8b5cf6]" />
        </motion.div>
      </div>

      {/* Central VRIF hub */}
      <div className="z-10 text-center relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-dashed border-blue-400/40"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-[140px] h-[140px] sm:w-[176px] sm:h-[176px] rounded-full border border-violet-400/30"
        />
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 20px rgba(59,130,246,0.3)",
              "0 0 60px rgba(59,130,246,0.7), 0 0 30px rgba(6,182,212,0.3)",
              "0 0 20px rgba(59,130,246,0.3)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center border border-blue-500/30 animate-tilt-3d p-3.5 z-10"
        >
          <Image
            src="/images/vrif_logo_cropped.webp"
            alt="VRIF Logo"
            width={140}
            height={56}
            className="object-contain w-[90%] h-[90%]"
            style={{ width: "90%", height: "auto" }}
            priority
          />
        </motion.div>
        {[0, 1, 2].map((n) => (
          <motion.div
            key={n}
            className="absolute inset-0 m-auto rounded-full border border-blue-400/20 pointer-events-none"
            style={{ width: 90, height: 90 }}
            animate={{ scale: [1, 3.5], opacity: [0.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: n * 1.3, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Floating Nodes */}
      <motion.div
        animate={{ y: [-12, 12, -12], x: [-6, 6, -6], rotate: [12, 8, 12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-[8%] z-20 flex flex-col items-center gap-1.5"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/40 hover-glow-blue">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <span className="text-[10px] font-black text-blue-400 neon-badge px-2.5 py-0.5 rounded-full uppercase tracking-wider">Launch</span>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[6%] top-[22%] z-20 flex flex-col items-center gap-1.5"
      >
        <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center shadow-md hover-glow-gold">
          <Lightbulb className="w-7 h-7 text-amber-400" />
        </div>
        <span className="text-[10px] font-black text-amber-400 neon-badge-gold px-2 py-0.5 rounded-full uppercase tracking-wider">Ideate</span>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8], x: [-4, 4, -4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute left-[15%] bottom-[10%] z-20 flex flex-col items-center gap-1.5"
      >
        <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center shadow-md hover-glow-green">
          <TrendingUp className="w-7 h-7 text-emerald-400" />
        </div>
        <span className="text-[10px] font-black text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}>Scale</span>
      </motion.div>

      <motion.div
        animate={{ y: [-8, 8, -8], x: [4, -4, -4] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute right-[8%] bottom-[18%] z-20 flex flex-col items-center gap-1.5"
      >
        <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center shadow-md hover-glow-indigo">
          <Network className="w-7 h-7 text-indigo-400" />
        </div>
        <span className="text-[10px] font-black text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)" }}>Connect</span>
      </motion.div>

      {/* Connective Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400">
        <motion.line x1="80" y1="110" x2="200" y2="200" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5,5" className="animate-stroke-flow opacity-40" />
        <motion.line x1="320" y1="80" x2="200" y2="200" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5,5" className="animate-stroke-flow opacity-45" />
        <motion.line x1="100" y1="320" x2="200" y2="200" stroke="#10b981" strokeWidth="1" strokeDasharray="5,5" className="animate-stroke-flow opacity-40" />
        <motion.line x1="330" y1="290" x2="200" y2="200" stroke="#6366f1" strokeWidth="1" strokeDasharray="5,5" className="animate-stroke-flow opacity-40" />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   SubscribeCard
──────────────────────────────────────────────────── */
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
    <div className="max-w-xl mx-auto rounded-3xl p-8 text-center relative overflow-hidden shimmer-card"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 pointer-events-none" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-violet-900/50 border border-violet-500/30 text-violet-400 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-white mb-2">Stay Updated with VRIF</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-sm mx-auto">
          Subscribe to our newsletter for updates on bootcamps, hackathons, incubation cohorts, and mentoring events.
        </p>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-emerald-400 font-bold text-sm py-3.5 px-6 rounded-2xl"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}
          >
            🎉 Thank you! You&apos;ve successfully subscribed to our newsletter.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm text-slate-200 placeholder-slate-500"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl text-white text-sm font-bold transition-all cursor-pointer whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 4px 20px rgba(139,92,246,0.4)" }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   Tab constants
──────────────────────────────────────────────────── */
const tabOrder = ["overview", "labs", "programs", "team", "gallery", "contact"];

const tabVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    scale: 0.88,
    z: -200,
    rotateY: direction > 0 ? 8 : -8,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    z: 0,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 28,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    scale: 0.88,
    z: -200,
    rotateY: direction > 0 ? -8 : 8,
    transition: {
      duration: 0.35,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  }),
};

/* ──────────────────────────────────────────────────
   HOME COMPONENT
──────────────────────────────────────────────────── */
export default function Home() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [prevTab, setPrevTab] = useState("overview");
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll({ container: containerRef });

  const heroTextY = useTransform(scrollY, [0, 500], [0, -50]);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const direction = tabOrder.indexOf(activeTab) - tabOrder.indexOf(prevTab);

  // Scroll listener
  useEffect(() => {
    const handleScrollerScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setShowBackToTop(target.scrollTop > 400);
    };
    const scroller = containerRef.current;
    if (scroller) scroller.addEventListener("scroll", handleScrollerScroll);
    return () => {
      if (scroller) scroller.removeEventListener("scroll", handleScrollerScroll);
    };
  }, [activeTab]);

  // Keyboard lightbox navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight")
        setLightboxIndex((lightboxIndex + 1) % galleryData.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex(
          (lightboxIndex - 1 + galleryData.length) % galleryData.length
        );
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    let targetTab = id;
    if (id === "home" || id === "about") targetTab = "overview";
    if (id === "infrastructure") targetTab = "labs";
    if (id === "resources") targetTab = "contact";
    setPrevTab(activeTab);
    setActiveTab(targetTab);
    setTimeout(() => {
      if (containerRef.current)
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const showMore = () => {
    if (visibleCount === 6) {
      setVisibleCount(galleryData.length);
    } else {
      setVisibleCount(6);
      if (containerRef.current)
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null)
      setLightboxIndex(
        (lightboxIndex - 1 + galleryData.length) % galleryData.length
      );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null)
      setLightboxIndex((lightboxIndex + 1) % galleryData.length);
  };

  /* ── DATA ── */
  const navLinks = [
    { id: "overview", label: "Overview" },
    { id: "labs", label: "Labs" },
    { id: "programs", label: "Programs" },
    { id: "team", label: "Team" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  const coes = [
    { title: "Robotics Lab", desc: "Custom actuators, controllers, and development boards for industrial automation testing.", icon: Cpu, color: "#3b82f6" },
    { title: "Data Centre", desc: "High-performance compute clusters for processing heavy machine learning models.", icon: Layers, color: "#8b5cf6" },
    { title: "IoT Centre of Excellence", desc: "Testing beds for sensor networks, connectivity protocols, and hardware-software validation.", icon: Globe, color: "#06b6d4" },
    { title: "Drone Technology CoE", desc: "Autopilot controllers, carbon layouts, telemetry rigs, and flight validation toolkits.", icon: Rocket, color: "#f59e0b" },
    { title: "3D Printing & Rapid Prototyping", desc: "Industrial additive manufacturing printers supporting PLA, ABS, Nylon, and custom polymers.", icon: Zap, color: "#10b981" },
    { title: "Advanced Product Development", desc: "Multi-axis machinery, tooling labs, and testing racks supporting development lifecycles.", icon: Target, color: "#f43f5e" },
  ];

  const programs = [
    { id: "vinyasa", name: "VINYASA", tagline: "Nurturing Innovation & Entrepreneurship", icon: Sparkles, color: "#3b82f6", glowClass: "hover-glow-blue" },
    { id: "samshodhana", name: "SAMSHODHANA", tagline: "Skill | Research | Innovate | Enterprise", icon: BookOpen, color: "#8b5cf6", glowClass: "hover-glow-purple" },
    { id: "she-innovates", name: "SHE INNOVATES", tagline: "Empowering Women to Lead Innovation", icon: Star, color: "#ec4899", glowClass: "hover-glow-purple" },
    { id: "nain-pmu", name: "NAIN PMU", tagline: "New Age Innovation Network", icon: Globe, color: "#f59e0b", glowClass: "hover-glow-gold" },
    { id: "launchpad", name: "VRIF LAUNCHPAD", tagline: "Transforming Ideas into Market-Ready Products", icon: Rocket, color: "#10b981", glowClass: "hover-glow-green" },
    { id: "tbi-navodaya", name: "TBI NAVODAYA", tagline: "Building Startups Through Structured Incubation", icon: TrendingUp, color: "#6366f1", glowClass: "hover-glow-indigo" },
  ];

  const stats = [
    { value: "5000+", label: "Students Engaged", icon: GraduationCap, color: "#3b82f6" },
    { value: "2396+", label: "Students in Vinyasa", icon: Users, color: "#8b5cf6" },
    { value: "5000+", label: "Women Engaged", icon: Star, color: "#ec4899" },
    { value: "100+", label: "Female Founders", icon: UserCheck, color: "#f43f5e" },
    { value: "90+", label: "Prototypes Built", icon: Cpu, color: "#06b6d4" },
    { value: "50+", label: "Startups Supported", icon: Rocket, color: "#10b981" },
    { value: "210+", label: "Colleges Reached", icon: Building2, color: "#6366f1" },
    { value: "725+", label: "Faculty Trained", icon: GraduationCap, color: "#f59e0b" },
    { value: "₹5 Lakh", label: "NAIN Project Funding", icon: Award, color: "#8b5cf6" },
    { value: "₹2.5 Lakh", label: "Launchpad MVP Grant", icon: Zap, color: "#3b82f6" },
    { value: "12 Month", label: "Structured Incubation", icon: Target, color: "#10b981" },
    { value: "6", label: "Centres of Excellence", icon: Layers, color: "#06b6d4" },
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

  /* ── RENDER ── */
  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{ background: "#020817", color: "#e2e8f0" }}
    >
      {/* Scroll Progress Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      <RocketCursor />
      <AuroraBackground />
      <Floating3DObject />

      {/* Fixed VRIF Logo Background */}
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <div style={{ transform: "rotate(0deg) scale(1)", opacity: 0.06 }}>
          <Image
            src="/images/vrif_logo_cropped.webp"
            alt=""
            width={1200}
            height={500}
            className="object-contain select-none"
            style={{ filter: "saturate(0.3) brightness(2)", maxWidth: "95vw" }}
            priority
          />
        </div>
      </div>

      {/* ═══════════════════ NAVBAR ═══════════════════ */}
      <header className="sticky top-0 z-50 nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex items-center justify-between gap-4">
          <button
            onClick={() => scrollTo("overview")}
            className="flex items-center gap-4 cursor-pointer group flex-shrink-0"
          >
            <Image
              src="/images/vrif_logo_cropped.webp"
              alt="VRIF Logo"
              width={280}
              height={80}
              className="object-contain transition-all"
              priority
              style={{ height: 72, width: "auto" }}
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === link.id
                    ? "text-white shadow-md"
                    : "text-slate-400 hover:text-blue-400"
                }`}
                style={
                  activeTab === link.id
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.15))",
                        border: "1px solid rgba(59,130,246,0.4)",
                        boxShadow: "0 0 15px rgba(59,130,246,0.2)",
                      }
                    : {}
                }
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-400 hover:text-blue-400 transition-all hover:bg-blue-500/10"
                  aria-label={s.label}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-400 hover:text-blue-400"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed top-24 inset-x-0 z-40 p-6 flex flex-col gap-3"
            style={{
              background: "rgba(2,8,23,0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(59,130,246,0.15)",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`py-3 px-4 rounded-xl text-left font-semibold transition-colors ${
                  activeTab === link.id
                    ? "text-blue-400"
                    : "text-slate-400 hover:text-blue-400"
                }`}
                style={
                  activeTab === link.id
                    ? { background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.3)" }
                    : {}
                }
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════ PORTAL DASHBOARD ═══════════ */}
      <main className="portal-container z-10">
        <div className="perspective-container max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              ref={containerRef}
              className="portal-content-scroll w-full h-full px-4 sm:px-6 lg:px-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
              {activeTab === "overview" && (
                <>
                  {/* HERO */}
                  <section
                    id="home"
                    className="relative min-h-[calc(100vh-140px)] flex items-center overflow-hidden hero-bg z-10 pt-8 pb-12"
                  >
                    <div className="absolute inset-0 dot-pattern opacity-20" />

                    {/* Atmospheric orbs */}
                    <motion.div
                      className="absolute top-16 right-20 w-80 h-80 rounded-full pointer-events-none"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
                      transition={{ duration: 8, repeat: Infinity }}
                      style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)", filter: "blur(30px)" }}
                    />
                    <motion.div
                      className="absolute bottom-20 left-10 w-60 h-60 rounded-full pointer-events-none"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
                      transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                      style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)", filter: "blur(40px)" }}
                    />

                    <div className="relative w-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

                        {/* Left: Text */}
                        <motion.div style={{ y: heroTextY }} className="flex flex-col gap-6">
                          {/* Badge */}
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                          >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase neon-badge">
                              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                              Innovation &amp; Entrepreneurship Arm of VTU Belagavi
                            </span>
                          </motion.div>

                          {/* Heading — word reveal */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            style={{ perspective: "600px" }}
                          >
                            <h1
                              className="font-rajdhani text-7xl sm:text-8xl xl:text-[10rem] font-black leading-none tracking-tight text-gradient-cosmos"
                            >
                              VRIF
                            </h1>
                            <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-[0.25em] mt-2">
                              Visvesvaraya Research &amp; Innovation Foundation
                            </div>
                          </motion.div>

                          <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.18 }}
                            className="text-2xl sm:text-3xl lg:text-4xl font-black leading-snug text-white"
                          >
                            Transforming Students into<br />
                            <span className="text-gradient-blue">Entrepreneurs &amp; Innovators</span>
                          </motion.h2>

                          <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.26 }}
                            className="text-base text-slate-400 leading-relaxed max-w-lg"
                          >
                            A statewide innovation movement empowering engineering students to build
                            startups, solve grassroots challenges, and create lasting impact.
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.36 }}
                            className="flex flex-wrap gap-4"
                          >
                            <button
                              onClick={() => scrollTo("programs")}
                              className="btn-primary px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                            >
                              Explore Programs <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => scrollTo("contact")}
                              className="btn-outline px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                            >
                              <Mail className="w-4 h-4" /> Contact Us
                            </button>
                          </motion.div>

                          {/* Quick stats strip */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-4 pt-2"
                          >
                            {[
                              { val: "210+", label: "Colleges" },
                              { val: "5000+", label: "Students" },
                              { val: "50+", label: "Startups" },
                              { val: "6", label: "CoEs" },
                            ].map((item) => (
                              <div key={item.label} className="flex flex-col items-center">
                                <span className="text-xl font-black font-rajdhani neon-text-blue">{item.val}</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{item.label}</span>
                              </div>
                            ))}
                          </motion.div>
                        </motion.div>

                        {/* Right: Innovation Scene */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1.2, delay: 0.3 }}
                          className="flex items-center justify-center w-full mt-8 lg:mt-0"
                        >
                          <HeroAnimation />
                        </motion.div>
                      </div>
                    </div>
                  </section>

                  {/* MARQUEE */}
                  <div
                    className="relative overflow-hidden py-4 border-y marquee-fade-mask my-8"
                    style={{
                      borderColor: "rgba(59,130,246,0.15)",
                      background: "rgba(59,130,246,0.04)",
                    }}
                  >
                    <div className="flex gap-0 animate-marquee whitespace-nowrap">
                      {[...marqueeItems, ...marqueeItems].map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center text-xs font-bold text-blue-400 uppercase tracking-widest px-6"
                        >
                          <span className="mr-6 text-blue-600 font-bold select-none">•</span>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* IMPACT STATS */}
                  <section className="py-16 relative z-10">
                    <div className="text-center mb-14">
                      <span className="text-xs uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full neon-badge">
                        Impact at a Glance
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
                        Our Numbers <span className="text-gradient-blue">Speak</span>
                      </h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                      {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                          <ScrollFloat3D key={i} delay={i * 0.06}>
                            <MagneticCard>
                              <div
                                className="stat-card rounded-3xl p-6 text-center relative overflow-hidden group cursor-default"
                                style={{ "--stat-color": stat.color } as React.CSSProperties}
                              >
                                {/* Glow ring top */}
                                <div
                                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                                />
                                <div
                                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                                  style={{ background: stat.color + "15", border: `1px solid ${stat.color}30` }}
                                >
                                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                                </div>
                                <div className="stat-number mb-1" style={{ color: stat.color }}>
                                  <AnimatedCounter value={stat.value} />
                                </div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                                  {stat.label}
                                </div>
                              </div>
                            </MagneticCard>
                          </ScrollFloat3D>
                        );
                      })}
                    </div>
                  </section>

                  <hr className="section-divider" />

                  {/* ABOUT */}
                  <section id="about" className="py-16 bg-transparent relative z-10 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                      <ScrollFloat3D>
                        <div>
                          <span className="text-xs uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full neon-badge">
                            About VRIF
                          </span>
                          <h2 className="text-4xl sm:text-5xl font-black text-white mt-4 mb-6">
                            Karnataka&apos;s Premier<br />
                            <span className="text-gradient-purple">Innovation Engine</span>
                          </h2>
                          <p className="text-base text-slate-400 leading-relaxed mb-6">
                            The Visvesvaraya Research &amp; Innovation Foundation (VRIF) is the Innovation &amp; Entrepreneurship Arm of Visvesvaraya Technological University (VTU), Belagavi, registered as a Section 8 Company under the Companies Act 2013.
                          </p>
                          <p className="text-base text-slate-400 leading-relaxed mb-8">
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
                                <div
                                  className="p-4 rounded-2xl h-full flex flex-col justify-between"
                                  style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.15)" }}
                                >
                                  <div className="text-sm font-black text-blue-400 mb-1">{item.title}</div>
                                  <div className="text-xs text-slate-500 leading-snug">{item.desc}</div>
                                </div>
                              </ScrollFloat3D>
                            ))}
                          </div>
                        </div>
                      </ScrollFloat3D>

                      <ScrollFloat3D delay={0.15}>
                        <div className="flex justify-center">
                          <MagneticCard intensity={8}>
                            <motion.div
                              animate={{ rotateY: [0, 5, 0, -5, 0], rotateX: [0, 3, 0, -3, 0] }}
                              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              <div
                                className="w-[340px] rounded-3xl p-8 shadow-2xl relative overflow-hidden shimmer-card"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                              >
                                <div className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center shadow-xl" style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}>
                                  <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-black text-white mb-4">Mission &amp; Vision</h3>
                                <div className="space-y-4">
                                  <div className="p-4 rounded-xl" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
                                    <div className="text-xs font-black text-blue-400 uppercase tracking-wider mb-1">Mission</div>
                                    <p className="text-sm text-slate-400 leading-snug">To catalyze innovation and entrepreneurship by bridging academic research with real-world impact.</p>
                                  </div>
                                  <div className="p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}>
                                    <div className="text-xs font-black text-violet-400 uppercase tracking-wider mb-1">Vision</div>
                                    <p className="text-sm text-slate-400 leading-snug">To build Karnataka&apos;s most dynamic startup and innovation ecosystem from VTU&apos;s network of institutions.</p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </MagneticCard>
                        </div>
                      </ScrollFloat3D>
                    </div>
                  </section>
                </>
              )}

              {/* ═══════════════ LABS TAB ═══════════════ */}
              {activeTab === "labs" && (
                <section id="infrastructure" className="py-16 relative z-10">
                  <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" />
                  <ScrollFloat3D>
                    <div className="text-center mb-16">
                      <span className="text-xs uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full neon-badge">
                        Infrastructure
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
                        Centres of <span className="text-gradient-blue">Excellence</span>
                      </h2>
                      <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                        Six advanced labs equipped with industry-grade tools for prototyping, testing, and innovating.
                      </p>
                    </div>
                  </ScrollFloat3D>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coes.map((coe, i) => {
                      const Icon = coe.icon;
                      return (
                        <ScrollFloat3D key={i} delay={i * 0.07}>
                          <MagneticCard>
                            <div className="coe-card rounded-3xl p-7 group h-full hover-glow-blue">
                              <div
                                className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                style={{ background: coe.color + "18", border: `1px solid ${coe.color}30` }}
                              >
                                <Icon className="w-7 h-7" style={{ color: coe.color }} />
                              </div>
                              <h3 className="text-base font-black text-white mb-3 leading-tight">{coe.title}</h3>
                              <p className="text-sm text-slate-400 leading-relaxed">{coe.desc}</p>
                            </div>
                          </MagneticCard>
                        </ScrollFloat3D>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ═══════════════ PROGRAMS TAB ═══════════════ */}
              {activeTab === "programs" && (
                <section id="programs" className="py-16 bg-transparent relative z-10 overflow-hidden">
                  <ScrollFloat3D>
                    <div className="text-center mb-16">
                      <span className="text-xs uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full neon-badge-purple">
                        VRIF Ecosystem
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
                        Programs &amp; <span className="text-gradient-purple">Initiatives</span>
                      </h2>
                      <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm">
                        Six flagship programs from ideation to market-ready ventures.
                      </p>
                    </div>
                  </ScrollFloat3D>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program, i) => {
                      const Icon = program.icon;
                      return (
                        <ScrollFloat3D key={i} delay={i * 0.06}>
                          <MagneticCard>
                            <div
                              className={`program-card rounded-3xl p-7 transition-all relative overflow-hidden group cursor-pointer h-full shimmer-card ${program.glowClass}`}
                              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                              onClick={() => setSelectedProgram(program.id)}
                            >
                              <div
                                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
                                style={{ background: program.color }}
                              />
                              <div className="flex items-start justify-between mb-5">
                                <div
                                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                                  style={{ background: program.color + "18", border: `1px solid ${program.color}30` }}
                                >
                                  <Icon className="w-6 h-6" style={{ color: program.color }} />
                                </div>
                              </div>
                              <h3 className="text-base font-black text-white mb-2">{program.name}</h3>
                              <p className="text-sm text-slate-400 leading-relaxed mb-4">{program.tagline}</p>
                              <div
                                className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all mt-auto"
                                style={{ color: program.color }}
                              >
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </MagneticCard>
                        </ScrollFloat3D>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* ═══════════════ TEAM TAB ═══════════════ */}
              {activeTab === "team" && (
                <section id="team" className="py-16 relative z-10">
                  <ScrollFloat3D>
                    <div className="text-center mb-16">
                      <span className="text-xs uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full neon-badge">
                        Leadership
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
                        Leadership &amp; <span className="text-gradient-blue">Team</span>
                      </h2>
                    </div>
                  </ScrollFloat3D>

                  {/* Directors */}
                  <div className="mb-14">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Board of Directors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                      {directors.map((d, i) => (
                        <ScrollFloat3D key={i} delay={i * 0.1}>
                          <MagneticCard>
                            <div className="team-card rounded-3xl p-6 text-center hover-glow-blue h-full">
                              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden relative" style={{ border: "2px solid rgba(59,130,246,0.3)" }}>
                                <Image src={d.img} alt={d.name} fill className="object-cover" sizes="80px" />
                              </div>
                              <h4 className="text-base font-black text-white leading-snug">{d.name}</h4>
                              <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wider">{d.role}</p>
                            </div>
                          </MagneticCard>
                        </ScrollFloat3D>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="mb-16">
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Execution Team</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {tbiTeam.map((member, i) => (
                        <ScrollFloat3D key={i} delay={i * 0.06}>
                          <MagneticCard intensity={8}>
                            <div className="team-card rounded-3xl p-5 text-center hover-glow-purple h-full">
                              <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden relative" style={{ border: "2px solid rgba(139,92,246,0.3)" }}>
                                <Image src={member.img} alt={member.name} fill className="object-cover" sizes="64px" />
                              </div>
                              <h4 className="text-sm font-bold text-white leading-tight">{member.name}</h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1 uppercase tracking-wider leading-snug min-h-[32px]">{member.role}</p>
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3.5 inline-flex items-center justify-center p-2 rounded-xl transition-all mx-auto cursor-pointer text-blue-400 hover:text-white"
                                style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
                                aria-label={`${member.name} LinkedIn`}
                              >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                              </a>
                            </div>
                          </MagneticCard>
                        </ScrollFloat3D>
                      ))}
                    </div>
                  </div>

                  {/* Partners */}
                  <div>
                    <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Ecosystem Partners</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {partners.map((p, i) => (
                        <ScrollFloat3D key={i} delay={i * 0.08}>
                          <MagneticCard>
                            <div className="partner-box p-6 rounded-3xl flex flex-col items-center text-center gap-4 h-full hover-glow-blue">
                              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Partner</span>
                              <div className="h-14 flex items-center justify-center w-full">
                                <Image
                                  src={p.src}
                                  alt={p.name}
                                  width={90}
                                  height={48}
                                  className="object-contain"
                                  style={{ maxHeight: 48, width: "auto", height: "auto", filter: "brightness(1.3) saturate(0.8)" }}
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-300">{p.name}</h4>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{p.label}</p>
                              </div>
                            </div>
                          </MagneticCard>
                        </ScrollFloat3D>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* ═══════════════ GALLERY TAB ═══════════════ */}
              {activeTab === "gallery" && (
                <section id="gallery" className="py-16 relative z-10 bg-transparent">
                  <ScrollFloat3D>
                    <div className="text-center mb-16">
                      <span className="text-xs uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full neon-badge">
                        Visual Insights
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
                        VRIF <span className="text-gradient-blue">Gallery</span>
                      </h2>
                      <p className="text-sm text-slate-400 max-w-md mx-auto mt-4 leading-relaxed">
                        Explore snapshots from our workshops, innovation labs, and ecosystem activities across Karnataka.
                      </p>
                    </div>
                  </ScrollFloat3D>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {galleryData.slice(0, visibleCount).map((img, i) => (
                      <ScrollFloat3D key={i} delay={(i % 3) * 0.05}>
                        <motion.div
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group hover-glow-blue"
                          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
                          onClick={() => setLightboxIndex(i)}
                        >
                          <Image
                            src={img.src}
                            alt={`VRIF Gallery Image ${i + 1}`}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-108 group-hover:brightness-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div>
                              <span className="text-white text-xs font-bold uppercase tracking-wider block">View Photo</span>
                              <span className="text-slate-400 text-[10px] mt-0.5 block">{i + 1} / {galleryData.length}</span>
                            </div>
                          </div>
                          {/* Corner accent */}
                          <div
                            className="absolute top-3 right-3 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: "#3b82f6", boxShadow: "0 0 8px #3b82f6" }}
                          />
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
                </section>
              )}

              {/* ═══════════════ CONTACT TAB ═══════════════ */}
              {activeTab === "contact" && (
                <>
                  {/* Resources */}
                  <section id="resources" className="py-16 relative z-10">
                    <div className="text-center mb-12">
                      <span className="text-xs uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full neon-badge">
                        Resources
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
                        Resource <span className="text-gradient-blue">Centre</span>
                      </h2>
                    </div>
                    <div className="max-w-xl mx-auto">
                      <MagneticCard>
                        <div
                          className="rounded-3xl p-8 flex flex-col items-center text-center gap-6 shimmer-card"
                          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)", boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}>
                            <Download className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-white mb-2">VRIF Brochure</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">Official brochure — programs, infrastructure, team, and impact across Karnataka.</p>
                          </div>
                          <a
                            href="/VTU_VRIF_Brochure.pdf"
                            download
                            className="btn-primary px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                          >
                            <Download className="w-4 h-4" /> Download PDF
                          </a>
                        </div>
                      </MagneticCard>
                    </div>
                  </section>

                  <hr className="section-divider" />

                  {/* Subscribe */}
                  <section className="py-16 bg-transparent relative z-10">
                    <div className="text-center mb-10">
                      <span className="text-xs uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full neon-badge-purple">
                        Innovation Calendar
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
                        Events &amp; <span className="text-gradient-purple">Programs</span>
                      </h2>
                    </div>
                    <SubscribeCard />
                  </section>

                  <hr className="section-divider" />

                  {/* Contact */}
                  <section id="contact" className="py-16 relative z-10">
                    <div className="text-center mb-14">
                      <span className="text-xs uppercase tracking-widest font-extrabold px-4 py-1.5 rounded-full neon-badge">
                        Get In Touch
                      </span>
                      <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
                        Contact <span className="text-gradient-blue">VRIF</span>
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      {[
                        {
                          icon: MapPin,
                          title: "Office Address",
                          content: "Silver Jubilee Bhavan, VTU Campus,\nJnana Sangama, Machhe,\nBelagavi – 590018,\nKarnataka, India",
                          color: "#3b82f6",
                          action: null,
                          glowClass: "hover-glow-blue",
                        },
                        {
                          icon: Mail,
                          title: "General Enquiries",
                          content: "ops@vtuvrif.com",
                          color: "#8b5cf6",
                          action: "mailto:ops@vtuvrif.com",
                          glowClass: "hover-glow-purple",
                        },
                        {
                          icon: Phone,
                          title: "Phone",
                          content: "+91 97394 44818\nMon–Fri, 9 AM – 6 PM IST",
                          color: "#10b981",
                          action: "tel:9739444818",
                          glowClass: "hover-glow-green",
                        },
                      ].map((card, i) => {
                        const Icon = card.icon;
                        return (
                          <ScrollFloat3D key={i} delay={i * 0.1}>
                            <MagneticCard>
                              <div
                                className={`rounded-3xl p-8 text-center flex flex-col items-center gap-5 ${card.glowClass}`}
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                              >
                                <div
                                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
                                  style={{ background: card.color, boxShadow: `0 0 20px ${card.color}60` }}
                                >
                                  <Icon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                  <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                    {card.title}
                                  </div>
                                  {card.action ? (
                                    <a
                                      href={card.action}
                                      className="text-base font-black hover:underline whitespace-pre-line"
                                      style={{ color: card.color }}
                                    >
                                      {card.content}
                                    </a>
                                  ) : (
                                    <p className="text-sm text-slate-400 whitespace-pre-line leading-relaxed">
                                      {card.content}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </MagneticCard>
                          </ScrollFloat3D>
                        );
                      })}
                    </div>
                  </section>

                  {/* Footer */}
                  <footer
                    className="pt-14 pb-8 relative z-10 mt-12 rounded-3xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 px-6">
                      <div className="md:col-span-5 flex flex-col gap-5">
                        <button
                          onClick={() => scrollTo("overview")}
                          className="flex items-center gap-4 cursor-pointer w-fit group"
                        >
                          <Image
                            src="/images/vrif_logo_cropped.webp"
                            alt="VRIF Logo"
                            width={280}
                            height={80}
                            className="object-contain"
                            style={{ height: 72, width: "auto" }}
                          />
                        </button>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                          Visvesvaraya Research &amp; Innovation Foundation (VRIF) — the innovation and entrepreneurship arm of VTU, Belagavi.
                        </p>
                        <div className="flex items-center gap-3">
                          {socialLinks.map((s, i) => (
                            <a
                              key={i}
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl text-slate-500 hover:text-blue-400 transition-all"
                              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                              aria-label={s.label}
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d={s.path} />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-3 flex flex-col gap-4">
                        <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase">Quick Links</h4>
                        <div className="flex flex-col gap-2.5">
                          {navLinks.map((link) => (
                            <button
                              key={link.id}
                              onClick={() => scrollTo(link.id)}
                              className="text-slate-500 hover:text-blue-400 text-sm font-semibold text-left transition-colors"
                            >
                              {link.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-4 flex flex-col gap-4">
                        <h4 className="text-xs font-black tracking-widest text-slate-500 uppercase">Office Location</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          Silver Jubilee Bhavan, VTU Campus,<br />
                          Jnana Sangama, Machhe,<br />
                          Belagavi – 590018, Karnataka, India
                        </p>
                      </div>
                    </div>
                    <div
                      className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-6"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <div className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                        © {new Date().getFullYear()} Visvesvaraya Research &amp; Innovation Foundation. All Rights Reserved.
                      </div>
                      <div className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
                        Innovation Arm of VTU Belagavi
                      </div>
                    </div>
                  </footer>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Program Details Modal */}
      <ProgramDetailsModal
        programId={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(2,8,23,0.95)", backdropFilter: "blur(20px)" }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              className="absolute top-6 right-6 p-3 rounded-full text-white transition-all cursor-pointer"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              onClick={() => setLightboxIndex(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 p-3 rounded-full text-white transition-all cursor-pointer z-10"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "#0d1b3e" }}
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
              <div
                className="absolute bottom-6 left-6 text-white text-xs font-bold px-4 py-2 rounded-full"
                style={{ background: "rgba(2,8,23,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {lightboxIndex + 1} / {galleryData.length}
              </div>
              <div className="absolute top-4 right-4 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                ← → to navigate • Esc to close
              </div>
            </motion.div>
            <button
              className="absolute right-4 p-3 rounded-full text-white transition-all cursor-pointer z-10"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 30 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl text-blue-400 cursor-pointer transition-colors duration-200"
            style={{
              background: "rgba(2,8,23,0.9)",
              border: "1px solid rgba(59,130,246,0.3)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 20px rgba(59,130,246,0.2)",
            }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
