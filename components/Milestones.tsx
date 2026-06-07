"use client";

import { motion } from "framer-motion";
import { icons, Award } from "lucide-react";

export function Milestones({ milestones = [] }: { milestones?: any[] }) {
  if (milestones.length === 0) {
    return (
      <motion.div 
        className="col-span-1 lg:col-span-2 row-span-1 bg-card border border-border border-dashed rounded-3xl p-6 flex flex-col items-center justify-center text-center"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Award className="w-8 h-8 text-muted-foreground mb-2 opacity-50" />
        <h3 className="text-sm font-medium text-foreground">No milestones yet.</h3>
        <p className="text-xs text-muted-foreground">Keep learning to earn your first badge!</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="col-span-1 lg:col-span-2 row-span-1 bg-card border border-border rounded-3xl p-6"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Recent Milestones</h3>
      <div className="flex flex-wrap gap-4">
        {milestones.map((m, i) => {
          const Icon = (icons as any)[m.icon_name] || Award;
          return (
            <div key={i} className="flex items-center space-x-3 bg-background/50 border border-border rounded-xl px-4 py-3">
              <Icon className={`w-5 h-5 ${m.color}`} />
              <span className="text-sm font-medium text-foreground">{m.label}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
