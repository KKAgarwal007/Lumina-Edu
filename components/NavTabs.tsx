"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
  { name: "Pathways", href: "/" },
  { name: "Mentors", href: "/mentors" },
  { name: "Archive", href: "/archive" }
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-6 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={clsx(
              "text-sm font-medium pb-2 transition-colors relative whitespace-nowrap",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.name}
            {isActive && (
              <span className="absolute left-0 right-0 -bottom-0.5 md:bottom-0 h-[2px] bg-primary rounded-t-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
