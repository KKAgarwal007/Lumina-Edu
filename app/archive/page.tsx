import { Suspense } from "react";
import { cookies } from "next/headers";
import { TopNav } from "@/components/TopNav";
import { ArchiveHeader } from "@/components/ArchiveHeader";
import { FeaturedArchive } from "@/components/FeaturedArchive";
import { ArchiveStats } from "@/components/ArchiveStats";
import { ArchiveGrid } from "@/components/ArchiveGrid";
import { createClient } from "@/utils/supabase/server";

export default async function ArchivePage() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const activeProfileId = cookieStore.get("active_profile_id")?.value;
  
  // Fetch active profile for stats
  let profile;
  if (activeProfileId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", activeProfileId).single();
    profile = data;
  } else {
    const { data } = await supabase.from("profiles").select("*").limit(1).single();
    profile = data;
  }

  // Fetch archived courses
  const { data: courses, error } = await supabase.from("archived_courses").select("*");

  const featuredCourse = courses?.find(c => c.is_featured);
  const regularCourses = courses?.filter(c => !c.is_featured) || [];

  return (
    <div className="min-h-full p-4 md:p-8 lg:p-10 w-full max-w-7xl mx-auto">
      <TopNav />
      
      <ArchiveHeader />

      {error || !courses ? (
        <div className="p-10 text-center text-muted-foreground border border-border rounded-3xl bg-card">
          No archived courses found. Please ensure the archived_courses SQL script was executed in Supabase.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
            {featuredCourse && <FeaturedArchive course={featuredCourse} />}
            <ArchiveStats profile={profile} />
          </div>
          
          <ArchiveGrid courses={regularCourses} />
        </div>
      )}
    </div>
  );
}
