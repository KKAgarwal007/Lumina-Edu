"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { switchUser } from "@/app/actions";

export function ProfileDropdown({ profiles, activeProfile }: { profiles: any[], activeProfile: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 overflow-hidden border border-border hover:border-primary/50 transition-colors focus:outline-none"
      >
        {activeProfile ? (
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeProfile.avatar_url || activeProfile.name}&backgroundColor=transparent`} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-card" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-xl p-2 shadow-xl"
          >
            <p className="text-xs font-medium text-muted-foreground px-2 py-1 mb-1">Switch Profile</p>
            {profiles.map(p => (
              <button 
                key={p.id}
                onClick={async () => {
                  setIsOpen(false);
                  await switchUser(p.id);
                }}
                className={clsx(
                  "w-full flex items-center p-2 rounded-lg text-left transition-colors",
                  p.id === activeProfile?.id ? "bg-primary/20 text-primary-foreground" : "hover:bg-card-hover text-muted-foreground"
                )}
              >
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.avatar_url || p.name}&backgroundColor=transparent`} alt="Avatar" className="w-6 h-6 rounded-full bg-border mr-2" />
                <span className="text-sm truncate">{p.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
