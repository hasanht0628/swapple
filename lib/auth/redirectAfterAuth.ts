import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Redirects to onboarding or home based on profile completion,
 * mirroring the logic in /auth/callback.
 */
export async function getPostAuthPath(
  supabase: SupabaseClient<Database>,
): Promise<"/onboarding" | "/home"> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "/home";
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("onboarding_complete")
    .eq("id", user.id)
    .maybeSingle();

  return profile?.onboarding_complete ? "/home" : "/onboarding";
}
