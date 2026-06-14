import { NextResponse, type NextRequest } from "next/server";
import { requireUserWithProfile, UnauthorizedError } from "@/lib/auth/requireUser";
import { getStripe } from "@/lib/billing/stripe";

export const runtime = "nodejs";

/**
 * POST /api/stripe/portal — creates a Stripe Customer Portal session so the user
 * can manage/cancel their Swapple Plus subscription. Powers "Manage plan".
 */
export async function POST(request: NextRequest) {
  try {
    const { profile } = await requireUserWithProfile();

    if (!profile.stripe_customer_id) {
      return NextResponse.json(
        { error: "No subscription to manage." },
        { status: 400 },
      );
    }

    const stripe = getStripe();
    const origin =
      request.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      new URL(request.url).origin;

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}/profile`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error("Stripe portal error:", err);
    return NextResponse.json(
      { error: "Failed to create portal session." },
      { status: 500 },
    );
  }
}
