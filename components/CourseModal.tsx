"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, BookOpen, CheckCircle } from "lucide-react";

export function CourseModal({ course, onClose }: { course: any, onClose: () => void }) {
  if (!course) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div 
          className="relative bg-card border border-border w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image Area */}
          <div className="h-48 relative overflow-hidden bg-[#1A1A24]">
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-background/50 hover:bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="absolute bottom-6 left-6 z-20 flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground tracking-tight">{course.title}</h2>
                <span className="text-sm font-medium text-primary">75% Completed</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-background/50 border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <Clock className="w-5 h-5 text-muted-foreground mb-2" />
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Last Studied</span>
                <span className="text-sm font-semibold text-foreground">Yesterday</span>
              </div>
              <div className="bg-background/50 border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <BookOpen className="w-5 h-5 text-muted-foreground mb-2" />
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Remaining</span>
                <span className="text-sm font-semibold text-foreground">5 Modules</span>
              </div>
              <div className="bg-background/50 border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-5 h-5 text-[#00D8FF] mb-2" />
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Status</span>
                <span className="text-sm font-semibold text-[#00D8FF]">In Progress</span>
              </div>
              <div className="bg-background/50 border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-foreground mb-1">12</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Hours</span>
                <span className="text-sm font-semibold text-foreground">Spent</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Dive deep into advanced React paradigms, exploring Server Components, Suspense, and complex state management strategies to build highly scalable applications.
            </p>

            <button className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]">
              Continue Learning
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
