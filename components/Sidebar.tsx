"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart2, 
  Users, 
  Settings,
  HelpCircle,
  LogOut,
  ChevronUp
} from "lucide-react";
import clsx from "clsx";
import { switchUser } from "@/app/actions";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Curriculum", icon: BookOpen },
  { name: "Insights", icon: BarChart2 },
  { name: "Community", icon: Users },
  { name: "Settings", icon: Settings },
];

export function Sidebar({ profiles, activeProfile }: { profiles: any[], activeProfile: any }) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border flex justify-around p-4">
        {navItems.slice(0, 4).map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className={clsx(
              "flex flex-col items-center justify-center space-y-1 relative",
              activeItem === item.name ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px]">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Desktop / Tablet Sidebar */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 border-r border-border h-screen sticky top-0 bg-background/50 backdrop-blur-xl z-40">
        <div className="p-6 flex items-center justify-center lg:justify-start">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 hidden lg:block">
            Lumina Edu
          </h1>
          <div className="lg:hidden w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-400" />
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => {
            const isActive = activeItem === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={clsx(
                  "w-full flex items-center p-3 rounded-xl transition-colors relative group",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 bg-card border border-border rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <div className="relative z-10 flex items-center justify-center lg:justify-start w-full">
                  <item.icon className="w-5 h-5 lg:mr-3" />
                  <span className="hidden lg:block text-sm font-medium">{item.name}</span>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="p-4 space-y-4">
          <div className="hidden lg:block">
            <button className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-sm font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              Upgrade to Pro
            </button>
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center justify-center lg:justify-start p-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle className="w-5 h-5 lg:mr-3" />
              <span className="hidden lg:block text-sm font-medium">Support</span>
            </button>
          </div>
          
          {/* Profile Switcher moved to TopNav */}
        </div>
      </aside>
    </>
  );
}
