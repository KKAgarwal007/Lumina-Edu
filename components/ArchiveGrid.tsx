"use client";

import { motion } from "framer-motion";
import { ArchiveCard } from "./ArchiveCard";

export function ArchiveGrid({ courses }: { courses: any[] }) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
      {courses.map(course => (
        <ArchiveCard key={course.id} course={course} />
      ))}
    </motion.div>
  );
}
