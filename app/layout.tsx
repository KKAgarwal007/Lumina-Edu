import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Lumina Edu | Student Dashboard",
  description: "Next-Gen Learning Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: profiles } = await supabase.from("profiles").select("*").order("name");
  
  const cookieStore = await cookies();
  const activeProfileId = cookieStore.get("active_profile_id")?.value;
  
  const activeProfile = activeProfileId 
    ? profiles?.find(p => p.id === activeProfileId) 
    : profiles?.[0];

  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex">
        <Sidebar profiles={profiles || []} activeProfile={activeProfile} />
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {children}
        </main>
      </body>
    </html>
  );
}
