"use client";

import { motion } from "framer-motion";
import { Award, Download, RotateCcw, Calendar } from "lucide-react";

export function FeaturedArchive({ course }: { course: any }) {
  return (
    <motion.div 
      className="col-span-1 lg:col-span-2 bg-card border border-border rounded-3xl p-6 relative overflow-hidden group flex flex-col md:flex-row gap-8"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image Container */}
      <div className="w-full md:w-2/5 aspect-square md:aspect-auto rounded-2xl overflow-hidden relative border border-border/50 shrink-0">
        <img 
          src={course.image_url} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md border border-border px-3 py-1.5 rounded-full flex items-center space-x-1.5">
          <Award className="w-3.5 h-3.5 text-[#00D8FF]" />
          <span className="text-xs font-medium text-foreground">Completed</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 justify-center py-2">
        <div className="flex items-center space-x-4 mb-3">
          <span className="px-2.5 py-1 text-[10px] font-medium bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-md">
            {course.level}
          </span>
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1.5" />
            {course.completed_date}
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
          {course.title}
        </h2>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-lg">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-4 mt-auto">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Certificate
          </button>
          <button className="bg-card hover:bg-card-hover border border-border px-5 py-2.5 rounded-xl text-sm font-medium text-foreground transition-all flex items-center">
            <RotateCcw className="w-4 h-4 mr-2" />
            Review Material
          </button>
        </div>
      </div>
    </motion.div>
  );
}
