"use client";

import { motion } from "framer-motion";
import { PlayCircle, Video, HelpCircle } from "lucide-react";

const actions = [
  { label: "Continue Lesson", icon: PlayCircle },
  { label: "Join Live Session", icon: Video },
  { label: "Take Practice Quiz", icon: HelpCircle }
];

export function ActionTiles() {
  return (
    <div className="col-span-1 lg:col-span-1 row-span-1 flex flex-row gap-3 h-full w-full">
      {actions.map((action, i) => (
        <motion.button
          key={i}
          className="flex-1 bg-card border border-border hover:bg-card-hover rounded-3xl p-3 flex flex-col items-center justify-center space-y-3 transition-colors"
          whileHover={{ scale: 1.05, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <action.icon className="w-6 h-6 text-primary shrink-0" />
          <span className="text-[10px] xl:text-xs font-medium text-muted-foreground text-center leading-tight">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
