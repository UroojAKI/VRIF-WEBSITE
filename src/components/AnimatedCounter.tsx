"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // e.g. "725+", "210+", "₹5 Lakh", "₹2.5 Lakh", "12-Month", "2396+"
  label?: string;
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Parse the number, prefix, and suffix
    // Matches numbers with potential decimals, rupee symbol, or trailing text like Lakh/Month/+
    const numberRegex = /(\d+(\.\d+)?)/;
    const match = value.match(numberRegex);
    
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[0]);
    const startIndex = value.indexOf(match[0]);
    const prefix = value.substring(0, startIndex);
    const suffix = value.substring(startIndex + match[0].length);

    let start = 0;
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = duration / frameRate;
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      // Easing out quadratic
      const progress = frame / totalFrames;
      const easedProgress = progress * (2 - progress);
      const currentNum = start + easedProgress * (targetNum - start);
      
      // Determine decimal places from original value
      const hasDecimal = match[0].includes(".");
      const formattedNum = hasDecimal 
        ? currentNum.toFixed(1) 
        : Math.round(currentNum).toString();

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setDisplayValue(value); // Ensure exact final value
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-bold tracking-tight">
      {displayValue}
    </span>
  );
}
