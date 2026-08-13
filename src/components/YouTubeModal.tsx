"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ExternalLink } from "lucide-react";

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function YouTubeModal({ isOpen, onClose }: YouTubeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-none">
                  VTU VRIF Innovation Story
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Official Overview &amp; Incubation Impact
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://youtu.be/LYUKhSnSG3s"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200 transition-colors"
              >
                Open in YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Responsive 16:9 Video Frame */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src="https://www.youtube.com/embed/LYUKhSnSG3s?autoplay=1&rel=0"
              title="VTU VRIF Official Video"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-medium">
            <span>Visvesvaraya Technological University — Belagavi, Karnataka</span>
            <span className="text-blue-600 font-bold">Research • Incubation • Commercialization</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
