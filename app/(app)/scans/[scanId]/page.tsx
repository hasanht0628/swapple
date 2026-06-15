import Link from "next/link";
import { notFound } from "next/navigation";
import { VerdictSummaryPills } from "@/components/scan/VerdictSummaryPills";
import { ScanItemCard } from "@/components/scan/ScanItemCard";
import { priorityLabel } from "@/lib/priorities";
import { requireUserWithProfile } from "@/lib/auth/requireUser";
import { serializeScanItem } from "@/lib/scans";
import type { ScanItemDTO } from "@/types/scan";
import type { ScanItemRow } from "@/types/database";

export const dynamic = "force-dynamic";

interface ScanResultsPageProps {
  params: Promise<{ scanId: string }>;
}

export default async function ScanResultsPage({ params }: ScanResultsPageProps) {
  const { scanId } = await params;
  const { user, profile, supabase } = await requireUserWithProfile();

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

  const items: ScanItemDTO[] = (scanItems || []).map((item) =>
    serializeScanItem(item as ScanItemRow, profile.subscription_status),
  );

  const priorities = profile.priorities || [];
  const priorityLabels = priorities.map(priorityLabel);

  return (
    <main className="flex flex-col gap-6 pb-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="sw-kicker">Cart Scan</p>
          <Link
            href="/capture"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            <span>⚡</span>
            Rescan
          </Link>
        </div>

        <div className="space-y-2">
          <h1 className="sw-h1 text-center lg:text-left">
            {items.length} item{items.length !== 1 ? "s" : ""} found
          </h1>
          {priorities.length > 0 && (
            <p className="sw-sub text-center lg:text-left">
              Ranked for <strong className="text-foreground">{priorityLabels.join(" & ")}</strong>
            </p>
          )}
        </div>

        <VerdictSummaryPills items={items} />
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <ScanItemCard key={item.id} item={item} scanId={scanId} showLockHint={true} />
        ))}
      </div>

      {items.length === 0 && (
        <div className="py-12 text-center text-muted">
          <div className="mb-4 text-4xl">🔍</div>
          <p className="sw-h2 mb-2">No items found</p>
          <p className="sw-sub text-sm">
            Try taking another photo with better lighting or closer to the products.
          </p>
        </div>
      )}
    </main>
  );
}
