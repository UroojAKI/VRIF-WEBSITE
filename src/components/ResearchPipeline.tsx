"use client";

import React from "react";
import { Brain, FileText, Cpu, Building, Coins, Rocket, Globe, ArrowRight } from "lucide-react";
import IndexedCard from "./IndexedCard";

const PIPELINE_STEPS = [
  {
    index: 1,
    title: "Scientific Research",
    description: "Faculty & student researchers identify breakthroughs across 210+ engineering campuses.",
    badge: "Stage 01",
    icon: Brain,
    accentColor: "#3B82F6",
  },
  {
    index: 2,
    title: "IP Protection & Patenting",
    description: "VRIF IP Cell provides patent filing support, prior art search, and technology disclosures.",
    badge: "Stage 02",
    icon: FileText,
    accentColor: "#8B5CF6",
  },
  {
    index: 3,
    title: "Prototyping & Lab Validation",
    description: "Centres of Excellence supply lab infrastructure to build functional TRL 4-6 prototypes.",
    badge: "Stage 03",
    icon: Cpu,
    accentColor: "#06B6D4",
  },
  {
    index: 4,
    title: "Industry Collaboration",
    description: "Matching lab prototypes with industrial corporate partners for pilot testing and MoUs.",
    badge: "Stage 04",
    icon: Building,
    accentColor: "#F59E0B",
  },
  {
    index: 5,
    title: "Seed Grants & Funding",
    description: "Facilitating NAIN & K-Tech government grants up to ₹75 Lakhs for venture formation.",
    badge: "Stage 05",
    icon: Coins,
    accentColor: "#10B981",
  },
  {
    index: 6,
    title: "TBI Incubation & Spin-off",
    description: "TBI Navodaya provides co-working, legal incorporation, and dedicated mentorship.",
    badge: "Stage 06",
    icon: Rocket,
    accentColor: "#F43F5E",
  },
];

export default function ResearchPipeline() {
  return (
    <div className="w-full py-12">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-cyan-700 bg-cyan-100 border border-cyan-200 px-3 py-1 rounded-full mb-3">
          Commercialization Protocol
        </span>
        <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
          From Academic Lab to <span className="text-gradient-aurora">Global Market</span>
        </h3>
        <p className="text-slate-600 font-medium text-sm max-w-xl mx-auto mt-2">
          A structured 6-stage pipeline converting university research into commercial IP and high-growth startups.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PIPELINE_STEPS.map((step) => (
          <IndexedCard
            key={step.index}
            index={step.index}
            title={step.title}
            description={step.description}
            badge={step.badge}
            icon={step.icon}
            accentColor={step.accentColor}
            delay={step.index * 0.08}
          />
        ))}
      </div>
    </div>
  );
}
