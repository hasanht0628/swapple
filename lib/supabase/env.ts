/**
 * Resolves the public Supabase URL + key from environment variables.
 *
 * NEXT_PUBLIC_* values are inlined at build time, so a missing/empty key
 * silently produces requests with no `apikey` header — which Supabase rejects
 * with "No API key found in request". We fail loudly instead so the
 * misconfiguration is obvious during development.
 *
 * Both the canonical `NEXT_PUBLIC_SUPABASE_ANON_KEY` and the newer
 * `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` names are accepted (anon preferred).
 */
export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Set it in .env.local and restart the dev server.",
    );
  }
  return url;
}

export function getSupabaseAnonKey(): string {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY). " +
        "Set it in .env.local and restart the dev server.",
    );
  }
  return key;
}
