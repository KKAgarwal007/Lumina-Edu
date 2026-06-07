"use client";

import { motion } from "framer-motion";
import { Star, GraduationCap, Zap } from "lucide-react";

export function MentorsHero() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)] mb-10">
      
      {/* Featured Mentor */}
      <motion.div 
        className="col-span-1 lg:col-span-2 row-span-2 bg-card border border-border rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-end min-h-[300px] lg:min-h-[400px]"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Background Image / Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transition-opacity duration-700 group-hover:opacity-50"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=600")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />

        <div className="relative z-10 space-y-6 max-w-xl">
          <div className="inline-flex items-center space-x-2 bg-card/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-border w-max">
            <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
            <span className="text-xs font-medium text-foreground">Top Mentor</span>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Dr. Elena Rostova
            </h2>
            <p className="text-lg text-muted-foreground">
              Staff Machine Learning Engineer @ DeepMind
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]">
              Book Session
            </button>
            <button className="bg-card/50 hover:bg-card border border-border backdrop-blur-sm px-6 py-3 rounded-xl font-medium text-foreground transition-all">
              View Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Tile 1 */}
      <motion.div 
        className="col-span-1 row-span-1 bg-card border border-border rounded-3xl p-6 flex flex-col items-center justify-center space-y-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#00D8FF]/10 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-[#00D8FF]" />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-foreground">1,200+</h3>
          <p className="text-sm text-muted-foreground mt-1">Active Mentors</p>
        </div>
      </motion.div>

      {/* Stats Tile 2 */}
      <motion.div 
        className="col-span-1 row-span-1 bg-card border border-border rounded-3xl p-6 flex flex-col items-center justify-center space-y-4"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
          <Zap className="w-6 h-6 text-purple-400" />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-foreground">4.9/5</h3>
          <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
        </div>
      </motion.div>
      
    </div>
  );
}
