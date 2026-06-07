"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CourseCard } from "./CourseCard";
import { CourseModal } from "./CourseModal";

interface CourseListAnimatorProps {
  courses: any[];
}

export function CourseListAnimator({ courses }: CourseListAnimatorProps) {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <>
      <motion.div 
        className="col-span-1 lg:col-span-2 row-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courses.map((course, i) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            index={i} 
            onClick={() => setSelectedCourse(course)} 
          />
        ))}
      </motion.div>

      <CourseModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </>
  );
}
