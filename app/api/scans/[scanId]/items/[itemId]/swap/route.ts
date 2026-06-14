import { NextResponse } from "next/server";
import { requireUser, UnauthorizedError } from "@/lib/auth/requireUser";

export const runtime = "nodejs";

/**
 * POST /api/scans/[scanId]/items/[itemId]/swap — toggles `swapped` on the item
 * and records a tracker event ('swapped' | 'unswapped'). Powers the Tracker
 * "Swaps made" stat and the "Saved swaps" list.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ scanId: string; itemId: string }> },
) {
  try {
    const { user, supabase } = await requireUser();
    const { scanId, itemId } = await params;

    const { data: item, error } = await supabase
      .from("scan_items")
      .select("id, swapped")
      .eq("id", itemId)
      .eq("scan_id", scanId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (error || !item) {
      return NextResponse.json({ error: "Item not found." }, { status: 404 });
    }

    const nextSwapped = !item.swapped;
    const { error: updateError } = await supabase
      .from("scan_items")
      .update({ swapped: nextSwapped })
      .eq("id", itemId);
    if (updateError) {
      return NextResponse.json({ error: "Failed to update." }, { status: 500 });
    }

    await supabase.from("tracker_events").insert({
      user_id: user.id,
      scan_item_id: itemId,
      event_type: nextSwapped ? "swapped" : "unswapped",
    });

    return NextResponse.json({ swapped: nextSwapped });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
