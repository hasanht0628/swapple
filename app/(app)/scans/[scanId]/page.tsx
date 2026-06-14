import Link from "next/link";
import { notFound } from "next/navigation";
import { VerdictSummaryPills } from "@/components/scan/VerdictSummaryPills";
import { ScanItemCard } from "@/components/scan/ScanItemCard";
import { priorityLabel } from "@/lib/priorities";
import { requireUserWithProfile } from "@/lib/auth/requireUser";
import { type ScanItemDTO, type PriorityTradeoff, type BrandRecommendation } from "@/types/scan";

export const dynamic = 'force-dynamic';

interface ScanResultsPageProps {
  params: Promise<{ scanId: string }>;
}

export default async function ScanResultsPage({ params }: ScanResultsPageProps) {
  const { scanId } = await params;
  const { user, profile, supabase } = await requireUserWithProfile();

  // Fetch scan and items
  const { data: scan } = await supabase
    .from("scans")
    .select("*")
    .eq("id", scanId)
    .eq("user_id", user.id)
    .single();

  if (!scan) {
    notFound();
  }

  const { data: scanItems } = await supabase
    .from("scan_items")
    .select("*")
    .eq("scan_id", scanId)
    .eq("user_id", user.id)
    .order("created_at");

  const items: ScanItemDTO[] = (scanItems || []).map(item => ({
    id: item.id,
    item_name: item.item_name,
    brand_name: item.brand_name,
    verdict: item.verdict as "good" | "caution" | "avoid",
    free_reason: item.free_reason,
    general_principle: item.general_principle,
    detailed_reason: item.detailed_reason,
    priority_tradeoffs: item.priority_tradeoffs as PriorityTradeoff[],
    brand_recommendations: item.brand_recommendations as BrandRecommendation[],
    saved: item.saved,
    swapped: item.swapped,
    locked: profile.subscription_status !== 'paid' && item.verdict !== 'good',
  }));

  const priorities = profile.priorities || [];
  const priorityLabels = priorities.map(priorityLabel);

  return (
    <main className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted uppercase tracking-wide">
            Cart Scan
          </div>
          <Link
            href="/capture"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <span>⚡</span>
            Rescan
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black">
            {items.length} item{items.length !== 1 ? 's' : ''} found
          </h1>
          {priorities.length > 0 && (
            <p className="text-muted">
              Ranked for <strong>{priorityLabels.join(' & ')}</strong>
            </p>
          )}
        </div>

        {/* Summary pills */}
        <VerdictSummaryPills items={items} />
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {items.map((item) => (
          <ScanItemCard
            key={item.id}
            item={item}
            scanId={scanId}
            showLockHint={true}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-muted">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-lg font-medium mb-2">No items found</p>
          <p className="text-sm">
            Try taking another photo with better lighting or closer to the products.
          </p>
        </div>
      )}
    </main>
  );
}