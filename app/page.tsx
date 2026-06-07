import { Suspense } from "react";
import { cookies } from "next/headers";
import { TopNav } from "@/components/TopNav";
import { HeroTile } from "@/components/HeroTile";
import { ActivityTile } from "@/components/ActivityTile";
import { CourseList } from "@/components/CourseList";
import { CourseSkeleton } from "@/components/CourseSkeleton";
import { ConsistencyMap } from "@/components/ConsistencyMap";
import { Milestones } from "@/components/Milestones";
import { ActionTiles } from "@/components/ActionTiles";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const activeProfileId = cookieStore.get("active_profile_id")?.value;
  
  const supabase = await createClient();
  
  let profile;
  
  if (activeProfileId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", activeProfileId).single();
    profile = data;
  } else {
    const { data } = await supabase.from("profiles").select("*").limit(1).single();
    profile = data;
  }

  if (!profile) {
    return <div className="p-10 text-center text-muted-foreground">No profiles found in database. Please run the SQL setup script.</div>;
  }

  // Fetch activity logs for the current profile
  const { data: activityLogs } = await supabase
    .from("activity_logs")
    .select("date, intensity")
    .eq("profile_id", profile.id)
    .order("date", { ascending: true });

  // Fetch milestones for the current profile
  const { data: milestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false });

  // Check if the user has any enrolled courses
  const { count: courseCount } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", profile.id);
    
  const hasCourses = (courseCount || 0) > 0;

  return (
    <div className="min-h-full p-4 md:p-8 lg:p-10 w-full max-w-7xl mx-auto">
      <TopNav />
      
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
        {/* Row 1 */}
        <HeroTile profile={profile} />
        <ActivityTile profile={profile} hasCourses={hasCourses} />
        
        {/* Row 2 */}
        <Suspense fallback={<CourseSkeleton />}>
          <CourseList profileId={profile.id} />
        </Suspense>
        <ConsistencyMap profile={profile} activityLogs={activityLogs || []} />
        
        {/* Row 3 */}
        <Milestones milestones={milestones || []} />
        <ActionTiles />
      </div>
    </div>
  );
}
