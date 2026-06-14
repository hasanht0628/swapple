import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Root middleware: refreshes the Supabase session on every matched request and
 * applies auth + onboarding redirects (see lib/supabase/middleware.ts).
 */
export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     *  - _next/static, _next/image
     *  - favicon.ico, icons, images
     *  - the Stripe webhook (no session, verified by signature)
     *  - other static asset extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|api/stripe/webhook|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
