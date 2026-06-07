import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  tags: string[];
  avatar_seed: string;
}

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
      }}
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-3xl p-6 flex flex-col h-full group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 overflow-hidden flex-shrink-0 border-2 border-background shadow-lg">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.avatar_seed}&backgroundColor=transparent`} 
            alt={mentor.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="flex items-center space-x-1 bg-background/50 px-2 py-1 rounded-full border border-border">
          <Star className="w-3.5 h-3.5 text-[#00D8FF]" />
          <span className="text-xs font-medium text-foreground">{mentor.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="space-y-1 mb-4 flex-1">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {mentor.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {mentor.role} @ {mentor.company}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {mentor.tags.map(tag => (
          <span 
            key={tag}
            className="px-2.5 py-1 text-[10px] font-medium bg-background border border-border rounded-md text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <button className="w-full py-2.5 rounded-xl border border-border bg-card-hover hover:bg-border text-sm font-medium text-foreground transition-colors mt-auto">
        Book Session
      </button>
    </motion.div>
  );
}
