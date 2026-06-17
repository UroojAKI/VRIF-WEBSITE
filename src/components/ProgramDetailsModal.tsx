"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Lightbulb, Compass, Zap, Target, Briefcase, Layers, TrendingUp, CheckCircle } from "lucide-react";

interface Program {
  id: string;
  title: string;
  tagline: string;
  objectives?: string[];
  outcomes?: string[];
  journeySteps?: string[] | { title: string; desc: string; list?: string[] }[];
  focusAreas?: string[];
  responsibilities?: string[];
  benefits?: string[];
  whatStartupsReceive?: string[];
  focusSectors?: string[];
  vision?: string;
  goal?: string;
  impact?: string[];
  color: string;
}

interface ProgramDetailsModalProps {
  programId: string | null;
  onClose: () => void;
}

const programsData: Program[] = [
  {
    id: "vinyasa",
    title: "VINYASA",
    tagline: "Nurturing Innovation & Entrepreneurship Across Karnataka",
    color: "from-blue-500 to-cyan-500",
    objectives: [
      "Foster innovation culture",
      "Promote design thinking",
      "Encourage prototype development",
      "Enable industry-academia collaboration",
      "Develop entrepreneurial mindset"
    ],
    outcomes: [
      "Faculty Development Programs",
      "Innovation Challenges",
      "Industry Mentorship",
      "SDG Aligned Projects",
      "Skill Development Initiatives",
      "Innovation Ecosystem Building"
    ]
  },
  {
    id: "samshodhana",
    title: "SAMSHODHANA",
    tagline: "Skill | Research | Innovate | Enterprise",
    color: "from-purple-500 to-indigo-600",
    journeySteps: [
      {
        title: "Stage 1: Skill Development",
        desc: "Equipping participants with advanced capabilities in critical technical and business domains.",
        list: ["Artificial Intelligence", "Data Science", "Blockchain", "IoT", "Product Design", "Entrepreneurship"]
      },
      {
        title: "Stage 2: Research & Problem Identification",
        desc: "Fostering standard research methodologies to pinpoint real-world, industry-linked problem statements that are ripe for disruption."
      },
      {
        title: "Stage 3: Innovation Development",
        desc: "Active development, venture building, and market validation of technologies.",
        list: ["Prototype Building", "Validation", "Investor Interactions", "Market Testing", "Venture Creation Support"]
      }
    ],
    impact: [
      "Innovation-driven mindset development",
      "Product and prototype creation",
      "Industry-linked problem solving",
      "Entrepreneurial venture formation",
      "Research commercialization opportunities"
    ]
  },
  {
    id: "she-innovates",
    title: "SHE INNOVATES",
    tagline: "Empowering Women to Lead Innovation",
    color: "from-pink-500 to-rose-500",
    vision: "To create a thriving ecosystem where women innovators become leaders, entrepreneurs, and changemakers.",
    focusAreas: [
      "Women Entrepreneurship Development",
      "Innovation Training Programs",
      "Leadership Development",
      "Startup Ideation Support",
      "Mentorship & Networking",
      "Investor Exposure"
    ],
    journeySteps: [
      { title: "Step 1", desc: "Skill Building" },
      { title: "Step 2", desc: "Domain-Specific Research" },
      { title: "Step 3", desc: "Prototype Development" },
      { title: "Step 4", desc: "Validation & Market Exposure" },
      { title: "Step 5", desc: "Startup Formation Support" }
    ]
  },
  {
    id: "nain-pmu",
    title: "NAIN PMU",
    tagline: "New Age Innovation Network – Project Monitoring Unit",
    color: "from-amber-500 to-orange-600",
    responsibilities: [
      "Program Monitoring",
      "Student Innovation Support",
      "Prototype Development Facilitation",
      "Industry Linkages",
      "Mentorship Coordination",
      "Innovation Ecosystem Development"
    ],
    benefits: [
      "Funding support for innovative projects",
      "Prototype development assistance",
      "Intellectual Property support",
      "Commercialization opportunities",
      "Startup creation pathways"
    ]
  },
  {
    id: "launchpad",
    title: "VRIF LAUNCHPAD",
    tagline: "Transforming Ideas into Market-Ready Products",
    color: "from-emerald-500 to-teal-600",
    benefits: [
      "Expert Mentorship",
      "Product Development Guidance",
      "Market Validation Support",
      "Industry Connect",
      "Investor Readiness",
      "Prototype Grant Assistance"
    ],
    outcomes: [
      "MVP Development",
      "Product Validation",
      "Startup Formation",
      "Industry Adoption Opportunities",
      "Incubation Readiness"
    ]
  },
  {
    id: "tbi-navodaya",
    title: "TBI NAVODAYA",
    tagline: "Building Startups Through Structured Incubation",
    color: "from-violet-600 to-purple-800",
    goal: "To build the next generation of high-impact startups emerging from Karnataka.",
    whatStartupsReceive: [
      "Structured Incubation",
      "Mentorship Network",
      "Funding Facilitation",
      "Infrastructure Access",
      "Market & Industry Connections"
    ],
    focusSectors: [
      "Agriculture & Allied Technologies",
      "DeepTech",
      "AI & Machine Learning",
      "IoT",
      "Robotics",
      "Drones",
      "Manufacturing",
      "Sustainability",
      "Climate Technologies",
      "Emerging Technologies"
    ]
  }
];

function ListSection({ title, items, icon: Icon, color }: { title: string; items: string[]; icon: React.ElementType; color: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
        <Icon className="w-5 h-5" style={{ color }} /> {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProgramDetailsModal({ programId, onClose }: ProgramDetailsModalProps) {
  const program = programsData.find((p) => p.id === programId);

  return (
    <AnimatePresence>
      {programId && program && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl border border-blue-100 shadow-2xl shadow-blue-100 z-10 flex flex-col"
          >
            {/* Top colored bar */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${program.color} rounded-t-3xl`} />

            {/* Header */}
            <div className="p-6 sm:p-8 flex items-start justify-between border-b border-blue-50">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 w-fit">Program Details</span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">{program.title}</h2>
                <p className="text-slate-500 text-sm sm:text-base font-medium">{program.tagline}</p>
              </div>
              <button onClick={onClose}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-colors text-slate-400 hover:text-red-500 flex-shrink-0 ml-4"
                aria-label="Close modal">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col gap-8">
              {/* Vision / Goal */}
              {(program.vision || program.goal) && (
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${program.color} rounded-l-2xl`} />
                  <h4 className="text-[10px] uppercase tracking-widest text-blue-500 font-black mb-1 ml-2">
                    {program.vision ? "Vision Statement" : "Strategic Goal"}
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic ml-2">
                    &ldquo;{program.vision || program.goal}&rdquo;
                  </p>
                </div>
              )}

              {/* Journey Steps */}
              {program.journeySteps && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-500" /> Program Journey Steps
                  </h3>
                  <div className="flex flex-col gap-5 relative pl-7 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
                    {program.journeySteps.map((step, idx) => {
                      const isObj = typeof step === "object" && step !== null;
                      const title = isObj ? (step as any).title : `Stage ${idx + 1}`;
                      const desc = isObj ? (step as any).desc : step;
                      const list = isObj ? (step as any).list : null;
                      return (
                        <div key={idx} className="relative">
                          <div className={`absolute -left-7 transform translate-x-[1px] w-4 h-4 rounded-full border-2 border-white bg-gradient-to-r ${program.color} shadow-md`} />
                          <div className="flex flex-col gap-1.5">
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">{title}</h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl">{desc}</p>
                            {list && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {list.map((item: string, i: number) => (
                                  <span key={i} className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 border border-blue-100 text-blue-700">{item}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {program.objectives && <ListSection title="Core Objectives" items={program.objectives} icon={Target} color="#3b82f6" />}
                {program.outcomes && <ListSection title="Key Outcomes" items={program.outcomes} icon={Award} color="#f59e0b" />}
                {program.focusAreas && <ListSection title="Focus Areas" items={program.focusAreas} icon={Lightbulb} color="#ec4899" />}
                {program.responsibilities && <ListSection title="PMU Responsibilities" items={program.responsibilities} icon={Compass} color="#f97316" />}
                {program.benefits && <ListSection title="Ecosystem Benefits" items={program.benefits} icon={Zap} color="#eab308" />}
                {program.whatStartupsReceive && <ListSection title="What Startups Receive" items={program.whatStartupsReceive} icon={Briefcase} color="#6366f1" />}
                {program.impact && <ListSection title="Program Impact" items={program.impact} icon={TrendingUp} color="#8b5cf6" />}
                {program.focusSectors && (
                  <div className="flex flex-col gap-4 md:col-span-2">
                    <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-teal-500" /> Focus Technology Sectors
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {program.focusSectors.map((sector, i) => (
                        <div key={i} className="px-3 py-2 rounded-xl bg-blue-50 border border-blue-100 hover:border-blue-300 transition-colors flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color}`} />
                          <span className="text-xs text-slate-700 font-semibold">{sector}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-blue-50 flex justify-end rounded-b-3xl">
              <button onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-md cursor-pointer">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
