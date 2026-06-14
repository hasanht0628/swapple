import Stripe from "stripe";

/**
 * Server-side Stripe client. Never import this in client components.
 * The secret key and price id come from env.
 */
let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeSingleton) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeSingleton = new Stripe(key, {
      // Pin to the account's default API version; omit to avoid drift.
      typescript: true,
    });
  }
  return stripeSingleton;
}

export const STRIPE_PRICE_ID = () => process.env.STRIPE_PRICE_ID ?? "";

export const SWAPPLE_PLUS = {
  name: "Swapple Plus",
  priceLabel: "$9 / month",
  description: "Unlimited brand picks tuned to your goals.",
} as const;
