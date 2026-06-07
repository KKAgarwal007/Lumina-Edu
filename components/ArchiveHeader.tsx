"use client";

import { useState } from "react";
import clsx from "clsx";

const TABS = ["Courses", "Live Sessions", "Resources"];

export function ArchiveHeader() {
  const [activeTab, setActiveTab] = useState("Courses");

  return (
    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 mt-4">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
          Knowledge Archive
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Access your completed courses, past live sessions, and preserved resources. Review your learning journey and download certificates.
        </p>
      </div>

      <div className="flex items-center bg-card border border-border p-1.5 rounded-xl shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-5 py-2 text-sm font-medium rounded-lg transition-colors",
              activeTab === tab 
                ? "bg-border text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
