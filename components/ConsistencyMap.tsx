"use client";

import { motion } from "framer-motion";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export function ConsistencyMap({ profile, activityLogs = [] }: { profile: any, activityLogs?: any[] }) {
  // Realistic contribution graph: Days as Columns (7), Weeks as Rows (8)
  const columns = 7; // Mon - Sun
  const rows = 8; // Weeks
  
  const generateGrid = () => {
    const grid = [];
    let logIndex = 0;
    
    // If we have less than 56 logs, we pad the beginning with empty days 
    // to simulate a graph that ends on the most recent log.
    const totalCells = columns * rows;
    const paddingStart = Math.max(0, totalCells - activityLogs.length);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const currentCellIndex = (row * columns) + col;
        let intensity = 0;

        if (currentCellIndex >= paddingStart) {
          // We are in the range where we have data
          const log = activityLogs[logIndex];
          if (log) {
            intensity = log.intensity;
            logIndex++;
          }
        }
        
        grid.push({ row, col, intensity });
      }
    }
    return grid;
  };

  const mapData = generateGrid();

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0: return "bg-[#1A1A24] border border-border/20"; // Empty
      case 1: return "bg-purple-900/40 border border-purple-500/10";
      case 2: return "bg-purple-700/60 border border-purple-500/20";
      case 3: return "bg-purple-500/80 border border-purple-500/30";
      case 4: return "bg-purple-400 border border-purple-400/40 shadow-[0_0_8px_rgba(168,85,247,0.4)]";
      default: return "bg-[#1A1A24]";
    }
  };

  return (
    <motion.div 
      className="col-span-1 row-span-1 bg-card border border-border rounded-3xl p-6 relative overflow-hidden flex flex-col"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Activity Graph</h3>
        <span className="text-2xl font-bold text-foreground">{profile?.total_learning_hours || 0}h</span>
      </div>

      <div className="flex-1 flex flex-col w-full h-full">
        {/* Day Header */}
        <div className="grid grid-cols-7 gap-2 mb-2 w-full max-w-[280px] mx-auto">
          {DAYS.map((day, i) => (
            <span key={i} className="text-[10px] text-muted-foreground font-medium text-center">
              {day}
            </span>
          ))}
        </div>
        
        {/* Grid */}
        <div className="flex-1 flex items-start justify-center">
          <div 
            className="grid grid-cols-7 gap-2 w-full max-w-[280px]" 
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {mapData.map((cell, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (cell.row * 0.02) + (cell.col * 0.01), duration: 0.3 }}
                className={`aspect-square rounded-[4px] w-full ${getIntensityColor(cell.intensity)} transition-colors duration-500`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
