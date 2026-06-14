import type { SubscriptionStatus } from "@/types/database";
import type Stripe from "stripe";

/**
 * Subscription gating helpers shared by API routes and server components.
 */

/** Whether the user has an active paid entitlement. */
export function hasActiveSubscription(status: SubscriptionStatus): boolean {
  // `past_due` keeps access during Stripe's retry/grace window; `canceled`
  // and `free` do not.
  return status === "paid" || status === "past_due";
}

/**
 * Maps a Stripe subscription status string onto our internal enum.
 * Used by the webhook to keep profiles.subscription_status in sync.
 */
export function mapStripeStatus(
  stripeStatus: Stripe.Subscription.Status,
): SubscriptionStatus {
  switch (stripeStatus) {
    case "active":
    case "trialing":
      return "paid";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "incomplete_expired":
      return "canceled";
    default:
      // incomplete, paused, etc. — treat as free until resolved.
      return "free";
  }
}
