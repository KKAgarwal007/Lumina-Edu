import { Suspense } from "react";
import { TopNav } from "@/components/TopNav";
import { MentorsHero } from "@/components/MentorsHero";
import { MentorGrid } from "@/components/MentorGrid";
import { createClient } from "@/utils/supabase/server";

export default async function MentorsPage() {
  const supabase = await createClient();
  
  // Fetch mentors from Supabase
  const { data: mentors, error } = await supabase
    .from("mentors")
    .select("*")
    .order("rating", { ascending: false });

  return (
    <div className="min-h-full p-4 md:p-8 lg:p-10 w-full max-w-7xl mx-auto">
      <TopNav />
      
      <div className="mb-10 mt-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-8">
          Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-[#00D8FF]">Guide.</span>
        </h1>
        
        <MentorsHero />
      </div>

      {error || !mentors ? (
        <div className="p-10 text-center text-muted-foreground border border-border rounded-3xl bg-card">
          No mentors found. Please ensure the mentors SQL script was executed in Supabase.
        </div>
      ) : (
        <Suspense fallback={<div className="h-96 animate-pulse bg-card rounded-3xl" />}>
          <MentorGrid initialMentors={mentors} />
        </Suspense>
      )}
    </div>
  );
}
