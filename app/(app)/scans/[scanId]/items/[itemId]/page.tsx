import Link from "next/link";
import { notFound } from "next/navigation";
import { VerdictBadge } from "@/components/scan/VerdictBadge";
import { LockedBrandCard } from "@/components/scan/LockedBrandCard";
import { BrandRecommendationList } from "@/components/scan/BrandRecommendationList";
import { requireUserWithProfile } from "@/lib/auth/requireUser";
import { isItemLocked } from "@/lib/verdicts";
import { type PriorityTradeoff, type Verdict } from "@/types/scan";

export const dynamic = 'force-dynamic';

interface ScanItemDetailPageProps {
  params: Promise<{ scanId: string; itemId: string }>;
}

export default async function ScanItemDetailPage({ params }: ScanItemDetailPageProps) {
  const { scanId, itemId } = await params;
  const { user, profile, supabase } = await requireUserWithProfile();

  // Fetch the scan item
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

  // Get total item count for navigation
  const { count: totalItems } = await supabase
    .from("scan_items")
    .select("*", { count: "exact", head: true })
    .eq("scan_id", scanId)
    .eq("user_id", user.id);

  // Get current item position
  const { data: previousItems } = await supabase
    .from("scan_items")
    .select("id")
    .eq("scan_id", scanId)
    .eq("user_id", user.id)
    .lt("created_at", scanItem.created_at);

  const currentPosition = (previousItems?.length || 0) + 1;

  const isLocked = isItemLocked(
    scanItem.verdict as Verdict,
    profile.subscription_status,
  );

  return (
    <main className="flex flex-col gap-6 lg:gap-8 p-6 lg:px-8">
      {/* Header with navigation */}
      <div className="flex items-center gap-4">
        <Link
          href={`/scans/${scanId}`}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-muted/50 transition-colors"
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        
        <div className="flex-1">
          <p className="text-sm lg:text-base text-muted">
            Result · {currentPosition} of {totalItems || 0}
          </p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start space-y-6 lg:space-y-0">
        {/* Left column - Image and basic info */}
        <div className="space-y-6">
          {/* Product image placeholder */}
          <div className="w-full h-48 lg:h-64 bg-muted/20 rounded-2xl flex items-center justify-center text-muted">
            <div className="text-center space-y-2">
              <div className="text-4xl lg:text-6xl">📦</div>
              <div className="text-xs lg:text-sm uppercase tracking-wide">Product Photo</div>
            </div>
          </div>

          {/* Verdict badge */}
          <div className="flex justify-center lg:justify-start">
            <VerdictBadge verdict={scanItem.verdict as "good" | "caution" | "avoid"} />
          </div>
          
          {/* Item details */}
          <div className="space-y-4">
            <div className="text-center lg:text-left space-y-2">
              <h1 className="text-xl lg:text-2xl font-bold">{scanItem.item_name}</h1>
              {scanItem.brand_name && (
                <p className="text-muted lg:text-lg">{scanItem.brand_name}</p>
              )}
            </div>

            <div className="bg-surface rounded-2xl p-4 lg:p-6 border border-border">
              <p className="text-sm lg:text-base leading-relaxed">{scanItem.free_reason}</p>
            </div>
          </div>
        </div>

        {/* Right column - Detailed content */}
        <div className="space-y-6 lg:space-y-8">
          {/* Detailed content - varies by verdict and subscription */}
          {scanItem.verdict === 'good' || !isLocked ? (
            <>
              {/* Detailed reason (always available for good, paid for others) */}
              {scanItem.detailed_reason ? (
                <div className="space-y-3 lg:space-y-4">
                  <h2 className="font-semibold lg:text-lg">Why this matters</h2>
                  <div className="bg-surface rounded-2xl p-4 lg:p-6 border border-border">
                    <p className="text-sm lg:text-base leading-relaxed">{scanItem.detailed_reason}</p>
                  </div>
                </div>
              ) : null}

              {/* Priority tradeoffs */}
              {scanItem.priority_tradeoffs && Array.isArray(scanItem.priority_tradeoffs) && scanItem.priority_tradeoffs.length > 0 ? (
                <div className="space-y-3 lg:space-y-4">
                  <h2 className="font-semibold lg:text-lg">Priority insights</h2>
                  <div className="space-y-3">
                    {(scanItem.priority_tradeoffs as PriorityTradeoff[]).map((tradeoff: PriorityTradeoff, i: number) => (
                      <div key={i} className="bg-surface rounded-xl p-3 lg:p-4 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-sm lg:text-base">{tradeoff.priority}</span>
                          <span className={`text-xs lg:text-sm px-2 py-1 rounded-full ${
                            tradeoff.impact === 'positive' ? 'bg-verdict-good-soft text-verdict-good' :
                            tradeoff.impact === 'negative' ? 'bg-verdict-avoid-soft text-verdict-avoid' :
                            'bg-verdict-caution-soft text-verdict-caution'
                          }`}>
                            {tradeoff.impact}
                          </span>
                        </div>
                        <p className="text-sm lg:text-base text-muted">{tradeoff.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Brand recommendations */}
              {scanItem.brand_recommendations && Array.isArray(scanItem.brand_recommendations) && scanItem.brand_recommendations.length > 0 ? (
                <BrandRecommendationList
                  recommendations={scanItem.brand_recommendations}
                  itemId={itemId}
                  scanId={scanId}
                  initialSavedRecommendationRank={scanItem.saved_recommendation_rank}
                />
              ) : null}
            </>
          ) : (
            /* Locked content for caution/avoid on free tier */
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