import { NextResponse, type NextRequest } from "next/server";
import { requireUserWithProfile, UnauthorizedError } from "@/lib/auth/requireUser";
import { getStripe, STRIPE_PRICE_ID } from "@/lib/billing/stripe";

export const runtime = "nodejs";

/**
 * POST /api/stripe/checkout — creates a Stripe Checkout Session for Swapple Plus
 * ($9/mo) and returns the hosted checkout URL. Reuses/creates a Stripe customer
 * tied to the profile.
 */
export async function POST(request: NextRequest) {
  try {
    const { user, profile, supabase } = await requireUserWithProfile();

    const priceId = STRIPE_PRICE_ID();
    if (!priceId) {
      return NextResponse.json(
        { error: "Billing is not configured (missing STRIPE_PRICE_ID)." },
        { status: 500 },
      );
    }

    const stripe = getStripe();
    const origin =
      request.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      new URL(request.url).origin;

    // Ensure a Stripe customer exists for this profile.
    let customerId = profile.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile.email ?? user.email ?? undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/profile?checkout=success`,
      cancel_url: `${origin}/profile?checkout=cancelled`,
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 },
    );
  }
}
