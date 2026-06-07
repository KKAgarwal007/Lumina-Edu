import { Search, Bell } from "lucide-react";
import { NavTabs } from "./NavTabs";
import { ProfileDropdown } from "./ProfileDropdown";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function TopNav() {
  const supabase = await createClient();
  const { data: profiles } = await supabase.from("profiles").select("*").order("name");
  
  const cookieStore = await cookies();
  const activeProfileId = cookieStore.get("active_profile_id")?.value;
  
  const activeProfile = activeProfileId 
    ? profiles?.find(p => p.id === activeProfileId) 
    : profiles?.[0];

  return (
    <header className="flex items-center justify-between w-full pb-6 mb-4 border-b border-border/50 gap-4">
      <NavTabs />

      <div className="flex items-center space-x-4 ml-auto">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 bg-card border border-border rounded-full py-2 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors shrink-0">
          <Bell className="w-5 h-5" />
        </button>
        <ProfileDropdown profiles={profiles || []} activeProfile={activeProfile} />
      </div>
    </header>
  );
}
