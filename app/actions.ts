"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function switchUser(profileId: string) {
  const cookieStore = await cookies();
  cookieStore.set("active_profile_id", profileId, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  
  // Revalidate the dashboard to trigger a re-render with the new user's data
  revalidatePath("/");
}
