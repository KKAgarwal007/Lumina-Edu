import { createClient } from "@/utils/supabase/server";
import { BookOpen } from "lucide-react";

// Need a client wrapper for the staggered motion variants of the list
import { CourseListAnimator } from "./CourseListAnimator";

export async function CourseList({ profileId }: { profileId: string }) {
  const supabase = await createClient();
  
  // Fetch courses from Supabase for this specific profile
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("profile_id", profileId)
    .order("created_at", { ascending: true });

  if (error || !courses) {
    return <div className="p-10 text-center text-muted-foreground border border-border rounded-3xl bg-card">Failed to load courses. Please check your Supabase connection.</div>;
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-1 lg:col-span-2 row-span-1 bg-card border border-border border-dashed rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-border/50 flex items-center justify-center mb-2">
          <BookOpen className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground">No courses yet.</h3>
        <p className="text-muted-foreground max-w-sm">Start learning today by exploring our curriculum and enrolling in your first pathway.</p>
        <button className="mt-4 px-6 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl font-medium transition-colors">
          Explore Curriculum
        </button>
      </div>
    );
  }

  return <CourseListAnimator courses={courses} />;
}
