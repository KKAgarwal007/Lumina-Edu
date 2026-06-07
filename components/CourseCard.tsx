"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    progress: number;
    icon_name: string;
    level: string;
  };
  index?: number;
  onClick?: () => void;
}

export function CourseCard({ course, index = 0, onClick }: CourseCardProps) {
  // Setup dynamic icon
  const IconComponent = (LucideIcons as any)[course.icon_name] || LucideIcons.BookOpen;
  
  // Animation state for progress bar
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Try to determine pill color based on level string
  let levelColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  const courseLevel = course.level || ""; // Fallback if level is missing from DB
  
  if (courseLevel.toLowerCase().includes("advanced")) {
    levelColor = "bg-purple-500/10 text-purple-400 border-purple-500/20";
  } else if (courseLevel.toLowerCase().includes("beginner")) {
    levelColor = "bg-[#00D8FF]/10 text-[#00D8FF] border-[#00D8FF]/20";
  }

  useEffect(() => {
    // Delay slightly to ensure entrance animation plays first, then animate progress
    const timer = setTimeout(() => {
      setAnimatedProgress(course.progress);
    }, 500 + index * 100);
    return () => clearTimeout(timer);
  }, [course.progress, index]);

  return (
    <motion.div
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ 
        scale: 1.02, 
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="group relative bg-card border border-border hover:border-primary/50 rounded-3xl p-5 flex flex-col justify-between overflow-hidden transition-colors cursor-pointer"
    >
      {/* Background subtle gradient mesh / grain */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="w-10 h-10 rounded-xl bg-background/50 border border-border flex items-center justify-center">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground bg-background/50 px-2 py-1 rounded-md border border-border">
          {course.progress}%
        </span>
      </div>

      <div className="relative z-10 space-y-3">
        <h3 className="font-semibold text-foreground text-sm leading-tight">
          {course.title}
        </h3>
        
        {/* Progress Bar Container */}
        <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${animatedProgress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
