// TODO(ui): Results list — "CART SCAN" label + "⚡ Rescan", "N items found",
// "Ranked for ..." subtitle, verdict summary pills, item rows with badges and
// "🔒 See better brands" link for caution/avoid. Data: GET /api/scans/[scanId].
// See components/scan/ScanItemCard.tsx, VerdictBadge.tsx, VerdictSummaryPills.tsx.
export default async function ScanResultsPage({
  params,
}: {
  params: Promise<{ scanId: string }>;
}) {
  const { scanId } = await params;
  return (
    <main className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-black">Scan results</h1>
      <p className="text-xs text-muted">scanId: {scanId}</p>
      {/* PLACEHOLDER */}
    </main>
  );
}
