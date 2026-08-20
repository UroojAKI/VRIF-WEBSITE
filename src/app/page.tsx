"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion, AnimatePresence, useScroll, useTransform, useSpring, useInView,
} from "framer-motion";
import {
  Building2, GraduationCap, Users, Cpu, Lightbulb, UserCheck, Rocket,
  ChevronRight, ChevronLeft, Download, Mail, Phone, MapPin, Menu, X,
  Award, Zap, Target, Layers, Sparkles, ArrowRight, ArrowUp, Globe,
  TrendingUp, BookOpen, Star, Network,
} from "lucide-react";

import AnimatedCounter from "@/components/AnimatedCounter";
import ProgramDetailsModal from "@/components/ProgramDetailsModal";
import RocketCursor from "@/components/RocketCursor";
import BackgroundEngine from "@/components/BackgroundEngine";
import MarqueeStrip from "@/components/MarqueeStrip";
import CyclingTagline from "@/components/CyclingTagline";
import StatsCounter, { StatItem } from "@/components/StatsCounter";
import GalleryCounter, { GalleryCounterItem } from "@/components/GalleryCounter";
import IndexedCard from "@/components/IndexedCard";
import StartupCarousel from "@/components/StartupCarousel";
import ResearchPipeline from "@/components/ResearchPipeline";
import GlowingFeatureCards from "@/components/GlowingFeatureCards";
import LiquidGlassCtaFooter from "@/components/LiquidGlassCtaFooter";
import CareersSection from "@/components/CareersSection";
import YouTubeModal from "@/components/YouTubeModal";
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
   FloatingParticles — soft orbs in hero
────────────────────────────────────────────── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30 animate-pulse"
          style={{
            width: `${180 + i * 60}px`,
            height: `${180 + i * 60}px`,
            top: `${10 + i * 15}%`,
            left: `${(i * 22) % 85}%`,
            background:
              i % 3 === 0
                ? "linear-gradient(135deg, #1a56db 0%, #3b82f6 100%)"
                : i % 3 === 1
                ? "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
                : "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
            animationDuration: `${6 + i * 2}s`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   HeroCanvas — Three.js 3D Wireframe Icosahedron
────────────────────────────────────────────── */
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let renderer: any;
    let scene: any;
    let camera: any;
    let core: any;
    let nodes: any;
    let group: any;
    let rafId = 0;
    let particleField: any;
    let mouseX = 0;
    let mouseY = 0;
    let destroyed = false;

    const handleMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      if (!renderer || !camera) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = window.innerWidth;
      const h = canvas.parentElement?.offsetHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      if (group) {
        if (w < 1024) {
          group.position.x = 0;
          group.position.y = -1.2;
          group.scale.set(0.8, 0.8, 0.8);
        } else {
          group.position.x = 3.0;
          group.position.y = 0;
          group.scale.set(1.0, 1.0, 1.0);
        }
      }
    };

    import("three").then((THREE) => {
      if (destroyed || !canvasRef.current) return;

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 9;

      group = new THREE.Group();
      scene.add(group);

      const icoGeo = new THREE.IcosahedronGeometry(3.0, 1);
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0x1a56db,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      core = new THREE.Mesh(icoGeo, icoMat);
      group.add(core);

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", icoGeo.getAttribute("position"));
      const nodeMat = new THREE.PointsMaterial({ color: 0xf59e0b, size: 0.09 });
      nodes = new THREE.Points(nodeGeo, nodeMat);
      group.add(nodes);

      const outerGeo = new THREE.IcosahedronGeometry(4.2, 0);
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      group.add(new THREE.Mesh(outerGeo, outerMat));

      const pCount = 180;
      const pArr = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pArr[i * 3]     = (Math.random() - 0.5) * 22;
        pArr[i * 3 + 1] = (Math.random() - 0.5) * 14;
        pArr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pArr, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x93c5fd,
        size: 0.035,
        transparent: true,
        opacity: 0.55,
      });
      particleField = new THREE.Points(pGeo, pMat);
      scene.add(particleField);

      handleResize();
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouse);

      const animate = () => {
        if (destroyed) return;
        rafId = requestAnimationFrame(animate);

        core.rotation.y += 0.0022;
        core.rotation.x += 0.0009;
        nodes.rotation.y = core.rotation.y;
        nodes.rotation.x = core.rotation.x;
        particleField.rotation.y += 0.0004;

        group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.04;
        group.rotation.x += (-mouseY * 0.35 - group.rotation.x) * 0.04;

        renderer.render(scene, camera);
      };
      animate();
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

/* ──────────────────────────────────────────────
   HeroAnimation — left-side orbital SVG
────────────────────────────────────────────── */
function HeroAnimation() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[360px] aspect-square flex items-center justify-center mx-auto">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-2xl" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[95%] h-[95%] rounded-full border-2 border-dashed border-blue-200/40" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-violet-200/30" />
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateY(-15deg)" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-[90%] h-[90%] border border-cyan-400/40 rounded-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
        </motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[70%] h-[70%] border border-violet-400/30 rounded-full">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_10px_#8b5cf6]" />
        </motion.div>
      </div>
      <motion.div
        animate={{ scale: [1, 1.08, 1], boxShadow: ["0 0 20px rgba(59,130,246,0.2)", "0 0 50px rgba(59,130,246,0.5)", "0 0 20px rgba(59,130,246,0.2)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/[0.08] backdrop-blur-sm flex items-center justify-center border border-blue-500/30 z-10 p-3.5"
      >
        <Image src="/images/vrif_logo_cropped.webp" alt="VRIF" width={140} height={56} className="object-contain w-full h-auto" priority />
      </motion.div>
      {[0, 1, 2].map((n) => (
        <motion.div key={n} className="absolute inset-0 m-auto rounded-full border border-blue-300/25 pointer-events-none"
          style={{ width: 90, height: 90 }}
          animate={{ scale: [1, 3.5], opacity: [0.4, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: n * 1.3, ease: "easeOut" }} />
      ))}

      {[
        { icon: Rocket, color: "#1a56db", bg: "#dbeafe", label: "Launch", style: { top: "8%", right: "5%" }, anim: { y: [-10, 10, -10] } },
        { icon: Lightbulb, color: "#f59e0b", bg: "#fef3c7", label: "Ideate", style: { left: "2%", top: "22%" }, anim: { y: [8, -8, 8] } },
        { icon: TrendingUp, color: "#10b981", bg: "#d1fae5", label: "Scale", style: { left: "12%", bottom: "10%" }, anim: { y: [6, -6, 6] } },
        { icon: Network, color: "#6366f1", bg: "#ede9fe", label: "Connect", style: { right: "5%", bottom: "18%" }, anim: { y: [-8, 8, -8] } },
      ].map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div key={i} animate={item.anim} transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            className="absolute z-20 flex flex-col items-center gap-1"
            style={item.style}>
            <div className="w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center" style={{ background: item.bg, border: `1.5px solid ${item.color}30` }}>
              <Icon className="w-6 h-6" style={{ color: item.color }} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full text-white" style={{ background: item.color, opacity: 0.9 }}>{item.label}</span>
          </motion.div>
        );
      })}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400">
        {[["80 110", "200 200", "#f59e0b"], ["320 80", "200 200", "#1a56db"], ["100 320", "200 200", "#10b981"], ["330 290", "200 200", "#6366f1"]].map(([pts, end, color], i) => (
          <line key={i} x1={pts.split(" ")[0]} y1={pts.split(" ")[1]} x2="200" y2="200"
            stroke={color} strokeWidth="1" strokeDasharray="5,5" className="animate-stroke-flow" style={{ opacity: 0.35 }} />
        ))}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MotionBanner — parallax twin-row scroll
────────────────────────────────────────────── */
function MotionBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const row1 = ["🚀 Startup Incubation", "⚡ Innovation Programs", "🔬 Research Commercialization", "💡 Entrepreneurship Development", "🤝 Industry Partnerships"];
  const row2 = ["🏆 NAIN PMU", "👩‍💼 Women Innovators", "🛸 Drone Technology", "🤖 Robotics Lab", "📡 IoT Centre", "🖨️ 3D Prototyping", "✨ TBI Navodaya"];
  return (
    <div ref={ref} className="overflow-hidden py-10 my-2 relative z-10">
      <motion.div style={{ x: x1 }} className="flex gap-4 mb-4 whitespace-nowrap">
        {[...row1, ...row1, ...row1].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest text-blue-300 bg-blue-500/10 border border-blue-500/20 flex-shrink-0">{item}</span>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className="flex gap-4 whitespace-nowrap">
        {[...row2, ...row2, ...row2].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest text-purple-300 bg-purple-500/10 border border-purple-500/20 flex-shrink-0">{item}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SiteFooter
────────────────────────────────────────────── */
function SiteFooter({
  navLinks,
  socialLinks,
  scrollTo,
}: {
  navLinks: { id: string; label: string }[];
  socialLinks: { href: string; label: string; path: string }[];
  scrollTo: (id: string) => void;
}) {
  return (
    <footer id="footer" className="bg-slate-950/80 backdrop-blur-md border-t border-white/10 pt-14 pb-8 mt-20 rounded-t-3xl text-slate-300 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5 flex flex-col gap-5">
            <button onClick={() => scrollTo("home")} className="cursor-pointer flex-shrink-0 w-fit">
              <Image src="/images/vrif_logo_cropped.webp" alt="VRIF Logo" width={280} height={80} className="object-contain brightness-200" style={{ height: 72, width: "auto" }} />
            </button>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Visvesvaraya Research &amp; Innovation Foundation (VRIF) — the innovation and entrepreneurship arm of VTU, Belagavi.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-blue-600 text-slate-300 hover:text-white transition-all border border-white/10" aria-label={s.label}>
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
                  className="text-slate-400 hover:text-white text-sm font-semibold text-left transition-colors">{link.label}</button>
              ))}
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-black tracking-widest text-slate-400 uppercase">Office Location</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Silver Jubilee Bhavan, VTU Campus,<br />Jnana Sangama, Machhe,<br />Belagavi – 590018, Karnataka, India
            </p>
            <div className="flex flex-col gap-1 mt-1">
              <a href="mailto:ops@vtuvrif.com" className="text-sm font-bold text-blue-400 hover:underline">ops@vtuvrif.com</a>
              <a href="tel:9739444818" className="text-sm font-bold text-slate-400 hover:text-white">+91 97394 44818</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Visvesvaraya Research &amp; Innovation Foundation. All Rights Reserved.
          </div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Innovation Arm of VTU Belagavi
          </div>
        </div>
      </div>
    </footer>
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
    <div className="max-w-xl mx-auto bg-slate-900/90 rounded-3xl p-8 border border-white/10 shadow-2xl text-center relative overflow-hidden backdrop-blur-xl">
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
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
    { id: "about",          label: "About" },
    { id: "infrastructure", label: "Labs" },
    { id: "programs",       label: "Programs" },
    { id: "careers",        label: "Careers" },
    { id: "team",           label: "Team" },
    { id: "gallery",        label: "Gallery" },
    { id: "contact",        label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://youtu.be/LYUKhSnSG3s",                 label: "YouTube",   path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    { href: "https://www.linkedin.com/company/vtu-vrif/",    label: "LinkedIn",   path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
    { href: "https://www.instagram.com/vtu.vrif/",           label: "Instagram",  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { href: "https://www.facebook.com/share/18RnGRPehh/",   label: "Facebook",  path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
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
    { id: "vinyasa",      name: "VINYASA",        tagline: "Nurturing Innovation & Entrepreneurship",          icon: Sparkles,   color: "#3B82F6", bg: "rgba(59,130,246,0.1)", glowClass: "hover-glow-blue" },
    { id: "samshodhana",  name: "SAMSHODHANA",    tagline: "Skill | Research | Innovate | Enterprise",         icon: BookOpen,   color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", glowClass: "hover-glow-purple" },
    { id: "she-innovates",name: "SHE INNOVATES",  tagline: "Empowering Women to Lead Innovation",              icon: Star,       color: "#EC4899", bg: "rgba(236,72,153,0.1)", glowClass: "hover-glow-purple" },
    { id: "nain-pmu",     name: "NAIN PMU",        tagline: "New Age Innovation Network",                       icon: Globe,      color: "#F59E0B", bg: "rgba(245,158,11,0.1)", glowClass: "hover-glow-gold" },
    { id: "launchpad",    name: "VRIF LAUNCHPAD",  tagline: "Transforming Ideas into Market-Ready Products",   icon: Rocket,     color: "#10B981", bg: "rgba(16,185,129,0.1)", glowClass: "hover-glow-green" },
    { id: "tbi-navodaya", name: "TBI NAVODAYA",    tagline: "Building Startups Through Structured Incubation", icon: TrendingUp, color: "#6366F1", bg: "rgba(99,102,241,0.1)", glowClass: "hover-glow-indigo" },
  ];

  const directors = [
    { name: "Dr. S. Vidyashankar",  role: "Vice-Chancellor, VTU & Chairman, VRIF",        img: "/images/vc_vidyashankar.webp" },
    { name: "Dr. Prasad Rampure",   role: "Registrar, VTU — Board of Directors",           img: "/images/registrar.webp" },
    { name: "Dr. Ujwal Urubail",    role: "Registrar (Evaluation) — Board of Directors",   img: "/images/ujwal.webp" },
  ];

  const tbiTeam = [
    { name: "Santosh Ittanagi",   role: "Chief Executive Officer",                           img: "/images/santosh.webp",    linkedin: "https://www.linkedin.com/in/santosh-ittanagi-96944011a/" },
    { name: "Absar Patel",        role: "Operations Manager",                                 img: "/images/absar.webp",      linkedin: "https://www.linkedin.com/in/absar-patel-8b2196169/" },
    { name: "Chetan Haragabal",   role: "Incubation Manager (Outreach & Market Content)",    img: "/images/chetan_h.webp",   linkedin: "https://www.linkedin.com/in/chetan-haragabal-ab8705268/" },
    { name: "Chitra Thakre",      role: "Incubation Manager (Mentor Connect & Facility)",    img: "/images/chitra.webp",     linkedin: "https://www.linkedin.com/in/chitra-thakre-3ba8b320a/" },
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
    <div className="flex flex-col min-h-screen relative font-sans bg-[#070B14] text-slate-100">
      {/* Global Canvas Dynamic Background Engine */}
      <BackgroundEngine />

      {/* Interactive Rocket Cursor with Particle Flames */}
      <RocketCursor />

      {/* Scroll progress bar */}
      <motion.div className="scroll-progress-bar bg-blue-600" style={{ scaleX }} />

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl px-5 py-3 border border-white/[0.08] shadow-md flex items-center justify-between gap-4">
          <button onClick={() => scrollTo("home")} className="cursor-pointer flex-shrink-0">
            <Image src="/images/vrif_logo_cropped.webp" alt="VRIF Logo" width={260} height={70}
              className="object-contain" priority style={{ height: 48, width: "auto" }} />
          </button>

          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 text-slate-300 hover:text-blue-400 hover:bg-white/[0.06] cursor-pointer">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex items-center gap-1.5">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
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
          <section id="home" className="relative min-h-[calc(100vh-96px)] flex items-center py-12 overflow-hidden">
            <HeroCanvas />
            <FloatingParticles />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                {/* Left */}
                <div className="flex flex-col gap-6">
                  {/* Endorsement badge */}
                  <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-500/10 border border-blue-500/20 text-blue-300 w-fit">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Innovation &amp; Entrepreneurship Arm of Visvesvaraya Technological University (VTU)</span>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                    <h1 className="font-rajdhani text-7xl sm:text-8xl xl:text-[9rem] font-black leading-none tracking-tight text-gradient-blue">
                      {["V","R","I","F"].map((ch, i) => (
                        <span key={i} className="word-reveal" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>{ch}</span>
                      ))}
                    </h1>
                    <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-[0.25em] mt-2">
                      Visvesvaraya Research &amp; Innovation Foundation
                    </div>
                  </motion.div>

                  {/* Cycling Tagline */}
                  <div className="text-left">
                    <CyclingTagline
                      words={[
                        "Deep Tech Acceleration.",
                        "Research to Market Action.",
                        "210+ Engineering Campuses.",
                        "Karnataka's Innovation Engine.",
                      ]}
                      className="text-xl sm:text-2xl font-extrabold text-slate-900"
                    />
                  </div>

                  <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug text-slate-100">
                    Transforming academic research into<br />
                    <span className="text-gradient-purple">Global Ventures &amp; Startups</span>
                  </motion.h2>

                  <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
                    className="text-base text-slate-400 leading-relaxed max-w-lg font-medium">
                    A statewide innovation ecosystem empowering engineering students, researchers, and founders across 210+ VTU colleges to build real-world deep-tech solutions.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }}
                    className="flex flex-wrap gap-4">
                    <button onClick={() => scrollTo("programs")}
                      className="btn-primary px-7 py-3.5 rounded-2xl font-extrabold text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/30">
                      Explore Programs <ChevronRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => scrollTo("contact")}
                      className="px-7 py-3.5 rounded-2xl font-extrabold text-sm flex items-center gap-2 cursor-pointer bg-white/[0.07] text-slate-100 hover:bg-white/[0.12] transition-colors shadow-md border border-white/[0.12]">
                      <Mail className="w-4 h-4" /> Apply for Incubation
                    </button>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-6 pt-2">
                    {[{ val: "210+", label: "Colleges" }, { val: "5000+", label: "Students" }, { val: "50+", label: "Startups" }, { val: "6", label: "CoEs" }].map((s) => (
                      <div key={s.label} className="flex flex-col items-center">
                        <span className="text-xl font-black font-rajdhani text-blue-400">{s.val}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{s.label}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right */}
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="flex items-center justify-center mt-8 lg:mt-0">
                  <HeroAnimation />
                </motion.div>
              </div>
            </div>
          </section>

          {/* ───── MARQUEE STRIP ───── */}
          {/* Marquee Strip with clean margin spacing */}
          <div className="relative z-10 my-10 sm:my-16">
            <MarqueeStrip
              topRow={[
                "⚡ Deep Tech Acceleration",
                "🎨 210+ Engineering Campuses",
                "🔋 TBI Navodaya Incubation",
                "🛰️ Commercialization Engine",
                "🧊 Seed Funding & Grants",
              ]}
              bottomRow={[
                "🏆 NAIN PMU",
                "👩‍💼 She Innovates Cohort",
                "🛸 Drone Technology CoE",
                "🤖 Robotics & Automation Lab",
                "✨ 50+ Portfolio Startups",
              ]}
            />
          </div>

          {/* ───── STATS / IMPACT COUNTER ───── */}
          <section id="stats" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal className="text-center mb-10">
                <span className="text-xs uppercase tracking-widest text-blue-300 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block">
                  Impact at a Glance
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-100 mt-4">
                  Our Numbers <span className="text-gradient-blue">Speak</span>
                </h2>
              </ScrollReveal>
              <StatsCounter stats={statItems} />
            </div>
          </section>

          <hr className="section-divider border-slate-200 my-8" />

          {/* ───── ABOUT ───── */}
          <section id="about" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <ScrollReveal>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-blue-300 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block">About VRIF</span>
                    <h2 className="text-4xl sm:text-5xl font-black text-slate-100 mt-4 mb-6 leading-tight">
                      Karnataka&apos;s Premier<br /><span className="text-gradient-purple">Innovation Engine</span>
                    </h2>
                    <p className="text-base text-slate-300 leading-relaxed mb-5 font-medium">
                      The Visvesvaraya Research &amp; Innovation Foundation (VRIF) is the Innovation &amp; Entrepreneurship Arm of VTU, Belagavi, registered as a Section 8 Company under the Companies Act 2013.
                    </p>
                    <p className="text-base text-slate-400 leading-relaxed mb-8 font-medium">
                      VRIF fosters a culture of innovation, entrepreneurship, and research commercialization across Karnataka&apos;s engineering ecosystem — spanning 210+ VTU-affiliated colleges.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { title: "Startup Incubation",  desc: "Full 12-month incubation cycle through TBI Navodaya" },
                        { title: "Tech Transfer",        desc: "IP commercialization and patent licensing support" },
                        { title: "Industry Connect",     desc: "Bridging students with industry mentors" },
                        { title: "Women Innovation",     desc: "Dedicated She Innovates program for female founders" },
                      ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 0.08}>
                          <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] h-full hover:border-blue-500/30 transition-all">
                            <div className="text-sm font-extrabold text-blue-400 mb-1">{item.title}</div>
                            <div className="text-xs text-slate-400 font-medium leading-snug">{item.desc}</div>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <MagneticCard intensity={6}>
                    <div className="bg-white/[0.05] rounded-3xl p-8 border border-white/[0.08] h-full">
                      <div className="w-14 h-14 rounded-2xl mb-5 flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#2563EB,#4f46e5)" }}>
                        <Layers className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-100 mb-5">Mission &amp; Vision</h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                          <div className="text-xs font-extrabold text-blue-400 uppercase tracking-wider mb-1">Mission</div>
                          <p className="text-sm text-slate-300 font-medium leading-snug">To catalyze innovation and entrepreneurship by bridging academic research with real-world impact.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                          <div className="text-xs font-extrabold text-purple-400 uppercase tracking-wider mb-1">Vision</div>
                          <p className="text-sm text-slate-300 font-medium leading-snug">To build Karnataka&apos;s most dynamic startup and innovation ecosystem from VTU&apos;s network of institutions.</p>
                        </div>
                      </div>
                    </div>
                  </MagneticCard>
                </ScrollReveal>
              </div>
            </div>
          </section>

          <hr className="section-divider" />

          {/* ───── LABS / CENTRES OF EXCELLENCE ───── */}
          <section id="infrastructure" className="py-16 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <ScrollReveal className="text-center mb-14">
                <span className="text-xs uppercase tracking-widest text-blue-300 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block">Infrastructure</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-100 mt-4">
                  Centres of <span className="text-gradient-blue">Excellence</span>
                </h2>
                <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed font-medium">
                  Six advanced labs equipped with industry-grade tools for prototyping, testing, and innovating.
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coes.map((coe, i) => {
                  const Icon = coe.icon;
                  return (
                    <ScrollReveal key={i} delay={i * 0.07}>
                      <MagneticCard>
                        <div className="coe-card rounded-3xl p-7 group h-full">
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                              style={{ background: coe.color + "18", border: `1px solid ${coe.color}35` }}>
                              <Icon className="w-6 h-6" style={{ color: coe.color }} />
                            </div>
                            <span className="font-rajdhani text-3xl font-black text-blue-400 transition-colors">{coe.n}</span>
                          </div>
                          <h3 className="text-base font-extrabold text-slate-100 mb-2 leading-tight">{coe.title}</h3>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed">{coe.desc}</p>
                        </div>
                      </MagneticCard>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Glowing Feature Cards */}
              <GlowingFeatureCards />
            </div>
          </section>

          <hr className="section-divider" />

          {/* ───── PROGRAMS ───── */}
          <section id="programs" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal className="text-center mb-14">
                <span className="text-xs uppercase tracking-widest text-purple-300 font-extrabold px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block">VRIF Ecosystem</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-100 mt-4">
                  Programs &amp; <span className="text-gradient-purple">Initiatives</span>
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program, i) => {
                  const Icon = program.icon;
                  return (
                    <ScrollReveal key={i} delay={i * 0.06}>
                      <MagneticCard>
                        <div
                          className="program-card bg-white/[0.04] rounded-3xl p-7 border border-white/[0.08] hover:border-white/[0.15] transition-all relative overflow-hidden group cursor-pointer h-full"
                          onClick={() => setSelectedProgram(program.id)}>
                          <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl" style={{ background: program.color }} />
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: program.bg }}>
                            <Icon className="w-6 h-6" style={{ color: program.color }} />
                          </div>
                          <h3 className="text-base font-extrabold text-slate-100 mb-2">{program.name}</h3>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed mb-4">{program.tagline}</p>
                          <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all mt-auto" style={{ color: program.color }}>
                            <span>Learn More</span><ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </MagneticCard>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Research Commercialization Pipeline */}
              <div className="mt-20">
                <ResearchPipeline />
              </div>
            </div>
          </section>



          <hr className="section-divider" />

          {/* ───── TEAM & PARTNERS ───── */}
          <section id="team" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal className="text-center mb-14">
                <span className="text-xs uppercase tracking-widest text-blue-300 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block">People</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-100 mt-4">
                  Leadership &amp; <span className="text-gradient-blue">Team</span>
                </h2>
              </ScrollReveal>

              {/* Board of directors */}
              <div className="mb-16">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Board of Directors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {directors.map((d, i) => (
                    <ScrollReveal key={i} delay={i * 0.1}>
                      <MagneticCard intensity={6}>
                        <div className="team-card rounded-3xl p-6 text-center h-full">
                          <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden relative ring-2 ring-blue-500/40">
                            <Image src={d.img} alt={d.name} fill className="object-cover" sizes="96px" />
                          </div>
                          <h4 className="text-base font-extrabold text-slate-100 mb-1">{d.name}</h4>
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider leading-snug">{d.role}</p>
                        </div>
                      </MagneticCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Execution team */}
              <div className="mb-14">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 text-center">Execution Team</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                  {tbiTeam.map((m, i) => (
                    <ScrollReveal key={i} delay={i * 0.05}>
                      <MagneticCard intensity={6}>
                        <div className="team-card rounded-3xl p-5 text-center h-full">
                          <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden relative ring-2 ring-purple-500/40">
                            <Image src={m.img} alt={m.name} fill className="object-cover" sizes="64px" />
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-100 leading-tight">{m.name}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold mt-1 uppercase tracking-wider leading-snug min-h-[28px]">{m.role}</p>
                          <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center justify-center p-2 rounded-xl bg-white/[0.07] hover:bg-blue-600 text-blue-400 hover:text-white transition-all cursor-pointer border border-white/[0.1]" aria-label={`${m.name} LinkedIn`}>
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                          </a>
                        </div>
                      </MagneticCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Partners */}
              <div>
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 text-center">Ecosystem Partners</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto justify-items-center">
                  {partners.map((p, i) => (
                    <ScrollReveal key={i} delay={i * 0.08} className="w-full">
                      <MagneticCard className="w-full">
                        <div className="partner-box p-6 rounded-3xl flex flex-col items-center text-center gap-4 h-full w-full">
                          <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">Partner</span>
                          <div className="h-14 flex items-center justify-center w-full">
                            <Image src={p.src} alt={p.name} width={120} height={50} className="object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity" style={{ width: "auto", height: "auto" }} />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-100">{p.name}</h4>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">{p.label}</p>
                          </div>
                        </div>
                      </MagneticCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="section-divider" />

          {/* ───── GALLERY COUNTER CAROUSEL ───── */}
          <section id="gallery" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal className="text-center mb-10">
                <span className="text-xs uppercase tracking-widest text-blue-300 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block">Visual Insights</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-100 mt-4">
                  Life Inside <span className="text-gradient-blue">VRIF</span>
                </h2>
                <p className="text-sm text-slate-400 max-w-md mx-auto mt-4 leading-relaxed font-medium">
                  Interactive gallery showcasing our innovation labs, hackathons, and ecosystem milestones.
                </p>
              </ScrollReveal>

              {/* Fraction Counter Gallery Slider */}
              <GalleryCounter items={galleryItems} />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-12">
                {galleryData.slice(0, visibleCount).map((img, i) => (
                  <ScrollReveal key={i} delay={(i % 3) * 0.05}>
                    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group shadow-md border border-white/[0.08]"
                      onClick={() => setLightboxIndex(i)}>
                      <Image src={img.src} alt={`VRIF Gallery ${i + 1}`} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">{i + 1} / {galleryData.length}</span>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
              {galleryData.length > 6 && (
                <div className="text-center mt-10">
                  <button onClick={() => setVisibleCount(visibleCount === 6 ? galleryData.length : 6)}
                    className="btn-outline px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer mx-auto">
                    {visibleCount === 6 ? "View All Photos" : "Collapse Gallery"}
                    <ChevronRight className={`w-4 h-4 transition-transform ${visibleCount > 6 ? "rotate-90" : ""}`} />
                  </button>
                </div>
              )}
            </div>
          </section>

          <hr className="section-divider border-slate-200 my-8" />

          {/* ───── RESOURCES ───── */}
          <section id="resources" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-xl mx-auto">
                <ScrollReveal>
                  <MagneticCard intensity={5}>
                    <div className="bg-white/[0.05] rounded-3xl p-8 border border-white/[0.08] flex flex-col items-center text-center gap-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg,#2563EB,#4f46e5)" }}>
                        <Download className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-100 mb-2">VRIF Brochure</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">Official brochure — programs, infrastructure, team, and impact across Karnataka.</p>
                      </div>
                      <a href="/VTU_VRIF_Brochure.pdf" download className="btn-primary px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25">
                        <Download className="w-4 h-4" /> Download PDF
                      </a>
                    </div>
                  </MagneticCard>
                </ScrollReveal>
              </div>
            </div>
          </section>

          <hr className="section-divider border-slate-200 my-8" />

          {/* ───── SUBSCRIBE ───── */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal className="text-center mb-10">
                <span className="text-xs uppercase tracking-widest text-purple-300 font-extrabold px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block">Innovation Calendar</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-100 mt-4">
                  Events &amp; <span className="text-gradient-purple">Programs</span>
                </h2>
              </ScrollReveal>
              <SubscribeCard />
            </div>
          </section>

          <hr className="section-divider border-slate-200 my-8" />

          {/* ───── CAREERS ───── */}
          <CareersSection />

          <hr className="section-divider border-slate-200 my-8" />

          {/* ───── CONTACT ───── */}
          <section id="contact" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal className="text-center mb-14">
                <span className="text-xs uppercase tracking-widest text-blue-300 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block">Get In Touch</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-100 mt-4">
                  Contact <span className="text-gradient-blue">VRIF</span>
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: MapPin, title: "Office Address", content: "Silver Jubilee Bhavan, VTU Campus,\nJnana Sangama, Machhe,\nBelagavi – 590018,\nKarnataka, India", color: "#3B82F6", action: null },
                  { icon: Mail,   title: "General Enquiries", content: "ops@vtuvrif.com",           color: "#8B5CF6", action: "mailto:ops@vtuvrif.com" },
                  { icon: Phone,  title: "Phone",            content: "+91 97394 44818\nMon–Fri, 9 AM – 6 PM IST", color: "#10B981", action: "tel:9739444818" },
                ].map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <ScrollReveal key={i} delay={i * 0.1}>
                      <MagneticCard>
                        <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 shadow-xl text-center flex flex-col items-center gap-5 border border-white/[0.08] hover:border-white/20 h-full">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: card.color }}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{card.title}</div>
                            {card.action ? (
                              <a href={card.action} className="text-base font-black hover:underline whitespace-pre-line" style={{ color: card.color }}>{card.content}</a>
                            ) : (
                              <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">{card.content}</p>
                            )}
                          </div>
                        </div>
                      </MagneticCard>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <LiquidGlassCtaFooter />
        </main>

      {/* YouTube Modal */}
      <YouTubeModal isOpen={isYtModalOpen} onClose={() => setIsYtModalOpen(false)} />

      {/* Program modal */}
      <ProgramDetailsModal programId={selectedProgram} onClose={() => setSelectedProgram(null)} />

      {/* Gallery lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}>
            <button className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              onClick={() => setLightboxIndex(null)}>
              <X className="w-6 h-6" />
            </button>
            <button className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer z-10"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryData.length) % galleryData.length); }}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <motion.div key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10"
              onClick={(e) => e.stopPropagation()}>
              <Image src={galleryData[lightboxIndex].src} alt={`VRIF Gallery ${lightboxIndex + 1}`}
                fill className="object-contain" sizes="(max-width:1024px) 100vw, 1024px" priority />
              <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full border border-white/10">
                {lightboxIndex + 1} / {galleryData.length} &nbsp;·&nbsp; ← → to navigate
              </div>
            </motion.div>
            <button className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer z-10"
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
            className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-slate-900/80 hover:bg-blue-600 text-blue-400 hover:text-white border border-white/20 shadow-2xl backdrop-blur-md cursor-pointer transition-colors duration-200"
            aria-label="Back to top">
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
