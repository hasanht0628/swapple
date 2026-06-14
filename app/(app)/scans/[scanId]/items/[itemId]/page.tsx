// TODO(ui): Item detail — product photo, verdict badge, name, free reason.
// good items: full detail free. caution/avoid: locked brand-recs card + upsell
// for free tier (trust statement). Data: GET /api/scans/[scanId]/items/[itemId].
// See components/scan/LockedBrandCard.tsx + BrandRecommendationList.tsx.
export default async function ScanItemDetailPage({
  params,
}: {
  params: Promise<{ scanId: string; itemId: string }>;
}) {
  const { scanId, itemId } = await params;
  return (
    <main className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-black">Item detail</h1>
      <p className="text-xs text-muted">
        scanId: {scanId} · itemId: {itemId}
      </p>
      {/* PLACEHOLDER */}
    </main>
  );
}
