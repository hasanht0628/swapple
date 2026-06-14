/**
 * Verdict metadata + the central gating rule.
 *
 * Gating: `good` items are always fully free. `caution`/`avoid` items expose
 * only free_reason + general_principle to free users; detailed_reason,
 * priority_tradeoffs and brand_recommendations are paid-only.
 */
import type { SubscriptionStatus } from "@/types/database";
import type { Verdict } from "@/types/scan";

export interface VerdictMeta {
  id: Verdict;
  label: string;
  /** Tailwind token references for the UI agent. */
  bgVar: string;
  softBgVar: string;
  icon: string;
}

export const VERDICTS: Record<Verdict, VerdictMeta> = {
  good: {
    id: "good",
    label: "GOOD",
    bgVar: "--color-verdict-good",
    softBgVar: "--color-verdict-good-soft",
    icon: "check-circle",
  },
  caution: {
    id: "caution",
    label: "CAUTION",
    bgVar: "--color-verdict-caution",
    softBgVar: "--color-verdict-caution-soft",
    icon: "alert-triangle",
  },
  avoid: {
    id: "avoid",
    label: "AVOID",
    bgVar: "--color-verdict-avoid",
    softBgVar: "--color-verdict-avoid-soft",
    icon: "minus-circle",
  },
};

export function isPaid(status: SubscriptionStatus): boolean {
  return status === "paid";
}

/**
 * Whether the detail fields (detailed_reason, priority_tradeoffs,
 * brand_recommendations) should be hidden from this viewer for this verdict.
 *
 * `good` -> never locked. `caution`/`avoid` -> locked unless paid.
 */
export function isItemLocked(
  verdict: Verdict,
  status: SubscriptionStatus,
): boolean {
  if (verdict === "good") return false;
  return !isPaid(status);
}
