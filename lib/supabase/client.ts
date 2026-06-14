import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Browser-side Supabase client for use in Client Components.
 * Uses the public anon key — never the service-role key.
 * 
 * Safe for static generation - uses fallback values during build.
 */
export function createClient() {
  // During build, env vars may not be available, so use placeholder values
  // At runtime in the browser, the real env vars will be available
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://build-placeholder.supabase.co';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'build-placeholder-key';
  
  return createBrowserClient<Database>(url, anonKey);
}
