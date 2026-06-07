"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { MentorCard } from "./MentorCard";
import clsx from "clsx";

const FILTER_TAGS = ["All", "React", "System Design", "AI & ML"];

export function MentorGrid({ initialMentors }: { initialMentors: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // We want to exclude the featured mentor from the grid list since she is in the Hero
  const gridMentors = useMemo(() => {
    return initialMentors.filter(m => !m.is_featured);
  }, [initialMentors]);

  const filteredMentors = useMemo(() => {
    return gridMentors.filter((mentor) => {
      const matchesSearch = 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === "All" || mentor.tags.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [gridMentors, searchQuery, activeFilter]);

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search mentors by name, role, or company..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-xl py-3 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {FILTER_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                activeFilter === tag 
                  ? "bg-primary/20 border-primary/50 text-primary-foreground" 
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-card-hover"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {filteredMentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
        {filteredMentors.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-card border border-border rounded-3xl">
            No mentors found matching your criteria.
          </div>
        )}
      </motion.div>
    </div>
  );
}
