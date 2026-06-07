"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform, animate } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";

export function HeroTile({ profile }: { profile: any }) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const controls = animate(0, profile?.streak || 0, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(value) {
        setStreak(Math.round(value));
      }
    });
    return () => controls.stop();
  }, [profile?.streak]);

  return (
    <motion.div 
      className="col-span-1 lg:col-span-2 row-span-2 bg-card border border-border rounded-3xl p-8 relative overflow-hidden group"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Decorative large flame icon in the background */}
      <Flame className="absolute -right-8 -bottom-8 w-64 h-64 text-primary/5 group-hover:text-primary/10 transition-colors duration-500" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-background/50 px-4 py-2 rounded-full border border-border w-max">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">{streak} Day Streak</span>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Welcome back, {profile?.name?.split(' ')[0] || "Student"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              You're making excellent progress in System Design. Ready to tackle today's module?
            </p>
          </div>
        </div>

        <button className="mt-8 inline-flex items-center space-x-2 bg-card-hover border border-border hover:bg-border px-6 py-3 rounded-xl transition-colors w-max group/btn">
          <span className="font-medium text-foreground">View Learning Path</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover/btn:text-foreground group-hover/btn:translate-x-1 transition-all" />
        </button>
      </div>
    </motion.div>
  );
}
