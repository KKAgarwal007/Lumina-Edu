"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export function ArchiveCard({ course }: { course: any }) {
  // Try to determine pill color based on level string roughly matching the reference image colors
  let levelColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";
  if (course.level.toLowerCase().includes("intermediate")) {
    levelColor = "bg-[#00D8FF]/10 text-[#00D8FF] border-[#00D8FF]/20";
  } else if (course.level.toLowerCase().includes("beginner")) {
    levelColor = "bg-blue-600/10 text-blue-500 border-blue-600/20";
  } else if (course.level.toLowerCase().includes("ethics")) {
    levelColor = "bg-orange-500/10 text-orange-400 border-orange-500/20";
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
      }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-3xl p-5 flex flex-col h-full group"
    >
      <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-5 relative border border-border/50">
        <img 
          src={course.image_url} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="mb-3">
          <span className={`px-2.5 py-1 text-[10px] font-medium border rounded-full ${levelColor}`}>
            {course.level}
          </span>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-xs text-muted-foreground mt-auto mb-6">
          {course.completed_date}
        </p>

        <button className="w-full py-2.5 rounded-xl border border-border bg-background hover:bg-card-hover text-sm font-medium text-foreground transition-colors flex items-center justify-center">
          <Eye className="w-4 h-4 mr-2 text-muted-foreground" />
          View Details
        </button>
      </div>
    </motion.div>
  );
}
