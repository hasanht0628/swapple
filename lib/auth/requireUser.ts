import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import type { ProfileRow } from "@/types/database";

export class UnauthorizedError extends Error {
  constructor(message = "Not authenticated") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Resolves the authenticated user in a Route Handler / Server Component.
 * Throws UnauthorizedError if there is no valid session — callers in API
 * routes should catch this and return a 401.
 */
export async function requireUser(): Promise<{
  user: User;
  supabase: Awaited<ReturnType<typeof createClient>>;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new UnauthorizedError();
  return { user, supabase };
}

/**
 * Like requireUser but also loads the user's profile row (priorities,
 * subscription_status, etc.). Used by the scan + gating flows.
 */
export async function requireUserWithProfile(): Promise<{
  user: User;
  profile: ProfileRow;
  supabase: Awaited<ReturnType<typeof createClient>>;
}> {
  const { user, supabase } = await requireUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    throw new UnauthorizedError("Profile not found");
  }

  return { user, profile: profile as ProfileRow, supabase };
}
