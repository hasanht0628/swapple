import { NextResponse } from "next/server";
import { requireUserWithProfile, UnauthorizedError } from "@/lib/auth/requireUser";
import { serializeScan, serializeScanItem } from "@/lib/scans";
import type { ScanItemRow, ScanRow } from "@/types/database";
import type { CreateScanResponse } from "@/types/scan";

export const runtime = "nodejs";

/**
 * GET /api/scans/[scanId] — results list for a single scan, with the same
 * verdict-based gating applied to each item.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ scanId: string }> },
) {
  try {
    const { user, profile, supabase } = await requireUserWithProfile();
    const { scanId } = await params;

    const { data: scan, error: scanError } = await supabase
      .from("scans")
      .select("*")
      .eq("id", scanId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (scanError) {
      return NextResponse.json({ error: "Failed to load scan." }, { status: 500 });
    }
    if (!scan) {
      return NextResponse.json({ error: "Scan not found." }, { status: 404 });
    }

    const { data: items, error: itemsError } = await supabase
      .from("scan_items")
      .select("*")
      .eq("scan_id", scanId)
      .order("created_at", { ascending: true });
    if (itemsError) {
      return NextResponse.json({ error: "Failed to load items." }, { status: 500 });
    }

    const payload: CreateScanResponse = {
      scan: serializeScan(scan as ScanRow),
      items: (items as ScanItemRow[]).map((row) =>
        serializeScanItem(row, profile.subscription_status),
      ),
    };
    return NextResponse.json(payload);
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
