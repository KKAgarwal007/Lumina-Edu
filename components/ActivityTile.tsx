"use client";

import { motion } from "framer-motion";

export function ActivityTile({ profile, hasCourses = true }: { profile: any, hasCourses?: boolean }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = hasCourses ? profile.weekly_growth : 0;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // We need to re-trigger the animation if profile changes. 
  // framer-motion key attribute on the SVG/circle is useful for this, or just letting animate handle the tween.
  // Tweening is better.

  return (
    <motion.div 
      className="col-span-1 row-span-2 bg-card border border-border rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h3 className="text-sm font-medium text-muted-foreground self-start mb-6 w-full">Weekly Growth</h3>
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-border"
          />
          {/* Progress Circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            cx="96"
            cy="96"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            className="text-[#00D8FF] drop-shadow-[0_0_8px_rgba(0,216,255,0.5)]"
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[#00D8FF]">{progress > 0 ? `+${progress}` : progress}%</span>
          <span className="text-xs text-muted-foreground mt-1">vs last week</span>
        </div>
      </div>
    </motion.div>
  );
}
