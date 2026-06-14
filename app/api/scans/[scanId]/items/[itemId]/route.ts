import { NextResponse } from "next/server";
import { requireUserWithProfile, UnauthorizedError } from "@/lib/auth/requireUser";
import { serializeScanItem } from "@/lib/scans";
import type { ScanItemRow } from "@/types/database";

export const runtime = "nodejs";

/**
 * GET /api/scans/[scanId]/items/[itemId] — single item detail.
 * Gating: `good` items return full detail to everyone; `caution`/`avoid` return
 * full detail only to paid users (handled centrally by serializeScanItem).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ scanId: string; itemId: string }> },
) {
  try {
    const { user, profile, supabase } = await requireUserWithProfile();
    const { scanId, itemId } = await params;

    const { data: item, error } = await supabase
      .from("scan_items")
      .select("*")
      .eq("id", itemId)
      .eq("scan_id", scanId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (error) {
      return NextResponse.json({ error: "Failed to load item." }, { status: 500 });
    }
    if (!item) {
      return NextResponse.json({ error: "Item not found." }, { status: 404 });
    }

    return NextResponse.json({
      item: serializeScanItem(item as ScanItemRow, profile.subscription_status),
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
