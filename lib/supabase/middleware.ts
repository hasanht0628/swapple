import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

/**
 * Refreshes the Supabase auth session on every request and applies route
 * protection / onboarding redirects. Invoked from the root middleware.ts.
 *
 * Redirect logic:
 *  - signed out + on a protected route  -> /sign-in
 *  - signed in + onboarding incomplete  -> /onboarding (unless already there)
 *  - otherwise                          -> allow
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: do not run code between createServerClient and getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/auth");

  // API routes must never be redirected to an HTML page. They enforce their own
  // auth via requireUser() and return JSON (401, etc). Redirecting them breaks
  // fetch() calls: a 307 is transparently followed to an HTML route that returns
  // 200, so the client sees `response.ok` and assumes success while the request
  // (e.g. PATCH /api/profile during onboarding) never actually runs.
  const isApiRoute = pathname.startsWith("/api");

  // Signed-out users may only access public routes.
  if (!user && !isPublicRoute && !isApiRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // Signed-in users that haven't completed onboarding get routed there.
  if (
    user &&
    !isPublicRoute &&
    !isApiRoute &&
    !pathname.startsWith("/onboarding")
  ) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_complete")
      .eq("id", user.id)
      .maybeSingle();

    if (profile && !profile.onboarding_complete) {
      const url = request.nextUrl.clone();
      url.pathname = "/onboarding";
      return NextResponse.redirect(url);
    }
  }

  // Must return the supabaseResponse so refreshed auth cookies are persisted.
  return supabaseResponse;
}
