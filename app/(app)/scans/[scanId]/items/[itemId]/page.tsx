import Link from "next/link";
import { notFound } from "next/navigation";
import { IcChevronLeft } from "@/components/icons";
import { VerdictBadge } from "@/components/scan/VerdictBadge";
import { LockedBrandCard } from "@/components/scan/LockedBrandCard";
import { BrandRecommendationList } from "@/components/scan/BrandRecommendationList";
import { requireUserWithProfile } from "@/lib/auth/requireUser";
import { isItemLocked } from "@/lib/verdicts";
import { type PriorityTradeoff, type Verdict } from "@/types/scan";

export const dynamic = "force-dynamic";

interface ScanItemDetailPageProps {
  params: Promise<{ scanId: string; itemId: string }>;
}

export default async function ScanItemDetailPage({ params }: ScanItemDetailPageProps) {
  const { scanId, itemId } = await params;
  const { user, profile, supabase } = await requireUserWithProfile();

  const { data: scanItem } = await supabase
    .from("scan_items")
    .select("*")
    .eq("id", itemId)
    .eq("scan_id", scanId)
    .eq("user_id", user.id)
    .single();

  if (!scanItem) {
    notFound();
  }

  const { count: totalItems } = await supabase
    .from("scan_items")
    .select("*", { count: "exact", head: true })
    .eq("scan_id", scanId)
    .eq("user_id", user.id);

  const { data: previousItems } = await supabase
    .from("scan_items")
    .select("id")
    .eq("scan_id", scanId)
    .eq("user_id", user.id)
    .lt("created_at", scanItem.created_at);

  const currentPosition = (previousItems?.length || 0) + 1;

  const isLocked = isItemLocked(scanItem.verdict as Verdict, profile.subscription_status);

  return (
    <main className="flex flex-col gap-6 pb-4">
      <div className="flex items-center gap-4">
        <Link
          href={`/scans/${scanId}`}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-[inset_0_0_0_1.5px_var(--color-border)] transition-colors hover:bg-background-deep"
        >
          <IcChevronLeft s={20} sw={2} />
        </Link>

        <p className="sw-sub text-sm">
          Result · {currentPosition} of {totalItems || 0}
        </p>
      </div>

      <div className="space-y-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 lg:space-y-0">
        <div className="space-y-6">
          <div className="sw-ph h-48 w-full lg:h-64">
            <span>Product Photo</span>
          </div>

          <div className="flex justify-center lg:justify-start">
            <VerdictBadge verdict={scanItem.verdict as "good" | "caution" | "avoid"} />
          </div>

          <div className="space-y-4">
            <div className="space-y-1 text-center lg:text-left">
              <h1 className="sw-h2">{scanItem.item_name}</h1>
              {scanItem.brand_name && (
                <p className="text-ink-2 lg:text-base">{scanItem.brand_name}</p>
              )}
            </div>

            <div className="sw-card p-4 lg:p-6">
              <p className="text-sm leading-relaxed lg:text-base">{scanItem.free_reason}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {scanItem.verdict === "good" || !isLocked ? (
            <>
              {scanItem.detailed_reason ? (
                <div className="space-y-3">
                  <h2 className="sw-h2">Why this matters</h2>
                  <div className="sw-card p-4 lg:p-6">
                    <p className="text-sm leading-relaxed lg:text-base">
                      {scanItem.detailed_reason}
                    </p>
                  </div>
                </div>
              ) : null}

              {scanItem.priority_tradeoffs &&
              Array.isArray(scanItem.priority_tradeoffs) &&
              scanItem.priority_tradeoffs.length > 0 ? (
                <div className="space-y-3">
                  <h2 className="sw-h2">Priority insights</h2>
                  <div className="space-y-3">
                    {(scanItem.priority_tradeoffs as PriorityTradeoff[]).map(
                      (tradeoff: PriorityTradeoff, i: number) => (
                        <div key={i} className="sw-card p-3 lg:p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="text-sm font-bold lg:text-base">
                              {tradeoff.priority}
                            </span>
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-semibold lg:text-sm ${
                                tradeoff.impact === "positive"
                                  ? "bg-verdict-good-soft text-verdict-good"
                                  : tradeoff.impact === "negative"
                                    ? "bg-verdict-avoid-soft text-verdict-avoid"
                                    : "bg-verdict-caution-soft text-verdict-caution"
                              }`}
                            >
                              {tradeoff.impact}
                            </span>
                          </div>
                          <p className="text-sm text-ink-2 lg:text-base">{tradeoff.explanation}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ) : null}

              {scanItem.brand_recommendations &&
              Array.isArray(scanItem.brand_recommendations) &&
              scanItem.brand_recommendations.length > 0 ? (
                <BrandRecommendationList
                  recommendations={scanItem.brand_recommendations}
                  itemId={itemId}
                  scanId={scanId}
                  initialSavedRecommendationRank={scanItem.saved_recommendation_rank}
                />
              ) : null}
            </>
          ) : (
            <LockedBrandCard
              verdictType={scanItem.verdict as "caution" | "avoid"}
              brandCount={3}
            />
          )}
        </div>
      </div>
    </main>
  );
}
