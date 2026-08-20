"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  IndianRupee,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Building,
  Sparkles,
  ArrowRight,
  FileText,
} from "lucide-react";

export interface JobPosition {
  id: string;
  title: string;
  category: "NAIN PMU" | "Incubation Ops" | "Documentation & Finance";
  stipend?: string;
  qualification: string;
  experience: string;
  location: string;
  responsibilities: string[];
  keyHighlights: string[];
}

export const JOB_POSITIONS: JobPosition[] = [
  {
    id: "dia",
    title: "District Innovation Associate (DIA)",
    category: "NAIN PMU",
    stipend: "₹25,000 / Month",
    qualification: "Any Degree with minimum 1 year relevant experience",
    experience: "1 Year",
    location: "Silver Jubilee Bhavan, VTU Belagavi",
    keyHighlights: ["KITS Approved Role", "Ecosystem Development", "Student Tracking"],
    responsibilities: [
      "Coordination: Schedule workshops, KITS Monitoring Committee meetings, and IIC sessions.",
      "Tracking & Compliance: Monitor student project progress (6-month timeline) and ensure timely document submission to KITS/PMU.",
      "Marketing & Ecosystem: Manage social media, website updates, promotional material, and build partner/NGO collaborations.",
      "Administration: Organize regular reviews and execute tasks assigned by KITS.",
    ],
  },
  {
    id: "mis-executive",
    title: "MIS Executive",
    category: "Documentation & Finance",
    stipend: "₹15,000 / Month",
    qualification: "PUC OR Any Degree with hands-on documentation experience",
    experience: "Hands-on Experience",
    location: "Silver Jubilee Bhavan, VTU Belagavi",
    keyHighlights: ["Financial Compliance", "Project Proofing", "Reporting"],
    responsibilities: [
      "Deviation Proofs: Detailed justifications for any project deviations along with KITS approvals.",
      "Project Status: Collect self-declarations of milestone or project completion from incubatees.",
      "Financial Proofs: Match all supporting invoices, bills, and payment receipts with bank statements.",
      "Event Reports: File post-event completion reports and participant logs.",
      "Progress Reports: Prepare half-yearly and yearly reports covering project milestones, awards, patents, and M&As.",
    ],
  },
  {
    id: "program-manager",
    title: "Program Manager (NAIN PMU Project)",
    category: "NAIN PMU",
    stipend: "As per KITS Norms",
    qualification: "Graduate / Post Graduate in Engineering, Management or Sciences",
    experience: "10 Years",
    location: "Silver Jubilee Bhavan, VTU Belagavi",
    keyHighlights: ["Leadership Role", "KITS Coordination", "Operational Strategy"],
    responsibilities: [
      "Lead overall NAIN program execution across state-wide engineering institutions.",
      "Manage operational governance, budget allocations, and inter-departmental coordination.",
      "Serve as the primary liaison between VTU VRIF and Karnataka Innovation & Technology Society (KITS).",
      "Oversee milestone evaluations, policy compliance, and incubator performance metrics.",
    ],
  },
  {
    id: "pa-mentor",
    title: "Program Associate — Mentor & Capacity Development",
    category: "Incubation Ops",
    stipend: "As per KITS Norms",
    qualification: "Graduate in relevant discipline",
    experience: "1–3 Years",
    location: "Silver Jubilee Bhavan, VTU Belagavi",
    keyHighlights: ["Mentor Onboarding", "Bootcamps", "Capacity Building"],
    responsibilities: [
      "Manage mentor onboarding and maintain the VRIF expert mentor directory.",
      "Organize startup support programs, technical bootcamps, and founder masterclasses.",
      "Coordinate student-founder 1-on-1 mentoring sessions and track feedback.",
      "Develop capacity-building frameworks for regional incubators across Karnataka.",
    ],
  },
  {
    id: "pa-market",
    title: "Program Associate — Market & Partnerships",
    category: "Incubation Ops",
    stipend: "As per KITS Norms",
    qualification: "Graduate in Business, Marketing or Technology",
    experience: "5 Years",
    location: "Silver Jubilee Bhavan, VTU Belagavi",
    keyHighlights: ["Investor Connect", "Branding", "Corporate MoU"],
    responsibilities: [
      "Lead market partnerships, corporate accelerator MoUs, and industry tie-ups.",
      "Drive investor engagement, seed grant networking, and venture capital pitches.",
      "Direct VRIF branding, media outreach, digital presence, and startup success stories.",
      "Facilitate market access and customer discovery trials for incubated startups.",
    ],
  },
  {
    id: "pa-operations",
    title: "Program Associate — Operations",
    category: "Incubation Ops",
    stipend: "As per KITS Norms",
    qualification: "Graduate in Engineering or Management",
    experience: "5 Years",
    location: "Silver Jubilee Bhavan, VTU Belagavi",
    keyHighlights: ["Lab Infrastructure", "Incubatee Support", "Facility Ops"],
    responsibilities: [
      "Coordinate day-to-day incubation center facilities, prototyping equipment, and maker spaces.",
      "Manage mentor schedules, incubatee desk allocations, and infrastructure logistics.",
      "Organize state-level hackathons, technology expos, and evaluation panels.",
      "Ensure safety, compliance, and operational readiness across all VRIF lab facilities.",
    ],
  },
  {
    id: "accounts-associate",
    title: "Accounts Associate",
    category: "Documentation & Finance",
    stipend: "As per KITS Norms",
    qualification: "Degree in Commerce / Accounting / Finance (B.Com / M.Com / BBA)",
    experience: "2–5 Years",
    location: "Silver Jubilee Bhavan, VTU Belagavi",
    keyHighlights: ["Grant Accounting", "Audit Compliance", "Financial Disbursal"],
    responsibilities: [
      "Manage financial accounts, grant disbursals, vendor invoices, and statutory ledgers.",
      "Prepare monthly utility statements, bank reconciliations, and financial audit documentation.",
      "Ensure strict compliance with KITS financial guidelines and VTU accounting protocols.",
      "Coordinate external audit visits and maintain transparent utilization certificates.",
    ],
  },
];

export default function CareersSection() {
  const [expandedId, setExpandedId] = useState<string | null>("dia");
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", "NAIN PMU", "Incubation Ops", "Documentation & Finance"];

  const filteredJobs =
    activeTab === "All"
      ? JOB_POSITIONS
      : JOB_POSITIONS.filter((j) => j.category === activeTab);

  return (
    <section id="careers" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-blue-300 font-extrabold px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-3">
            Join the Innovation Movement
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Careers &amp; Open Positions at <span className="text-blue-400">VRIF</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed font-medium">
            Be part of Karnataka&apos;s premier university incubation network. All recruitments are conducted as per guidelines approved by the <strong className="text-slate-200">Karnataka Innovation and Technology Society (KITS)</strong>.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "bg-white/[0.07] text-slate-300 hover:bg-white/[0.12] border border-white/[0.1]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Job Cards List */}
        <div className="space-y-4 max-w-4xl mx-auto mb-14">
          {filteredJobs.map((job) => {
            const isExpanded = expandedId === job.id;
            return (
              <div
                key={job.id}
                className="bg-white/[0.04] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : job.id)}
                  className="w-full p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.03] transition-colors"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                        {job.category}
                      </span>
                      {job.stipend && (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" /> {job.stipend}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-100">{job.title}</h3>
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-blue-600" /> {job.qualification}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-600" /> Exp: {job.experience}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-blue-400 hover:text-blue-300 hidden sm:inline-block">
                      {isExpanded ? "Hide Details" : "View Details & Apply"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/[0.06] bg-white/[0.02] p-6 space-y-6"
                    >
                      {/* Highlights */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {job.keyHighlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-xs font-semibold text-slate-300 bg-white/[0.07] px-3 py-1 rounded-lg border border-white/[0.1]"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>

                      {/* Responsibilities */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
                          Role &amp; Key Responsibilities:
                        </h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((r, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed font-medium">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Location & Instructions */}
                        <div className="bg-white/[0.05] p-4 rounded-xl border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-medium text-slate-400">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                            <span>Location: <strong className="text-slate-200">{job.location}</strong></span>
                          </div>
                        <div className="flex items-center gap-3">
                          <a
                            href={`mailto:ops@vtuvrif.com?cc=vrif@vtu.ac.in&subject=Application for ${encodeURIComponent(job.title)}`}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                          >
                            <Mail className="w-3.5 h-3.5" /> Email Resume (ops@vtuvrif.com)
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Application Instructions Box */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-3xl p-8 max-w-4xl mx-auto shadow-xl border border-blue-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-blue-300 bg-blue-800/60 px-3 py-1 rounded-full border border-blue-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Official Application Notice
              </div>
              <h3 className="text-2xl font-extrabold text-white">Ready to apply for VRIF positions?</h3>
              <p className="text-slate-300 text-sm max-w-xl font-medium leading-relaxed">
                Eligible candidates can email their CV / Resume along with educational qualification certificates to <strong className="text-white">ops@vtuvrif.com</strong> (cc: <strong className="text-white">vrif@vtu.ac.in</strong> / <strong className="text-white">vrif.tbi@gmail.com</strong>).
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="mailto:ops@vtuvrif.com?cc=vrif@vtu.ac.in,vrif.tbi@gmail.com&subject=Job Application - VRIF VTU"
                className="px-6 py-3.5 rounded-2xl bg-white text-blue-900 font-extrabold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Mail className="w-4 h-4 text-blue-600" /> Email Resume to ops@vtuvrif.com
              </a>
              <div className="text-center text-xs text-blue-200 font-medium">
                Helpline: <a href="tel:08312405468" className="hover:underline text-white font-bold">0831-2405468</a> / <a href="tel:917259318233" className="hover:underline text-white font-bold">+91 72593 18233</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
