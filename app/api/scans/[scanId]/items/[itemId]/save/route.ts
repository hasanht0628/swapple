import { NextResponse } from "next/server";
import { requireUser, UnauthorizedError } from "@/lib/auth/requireUser";
import { type BrandRecommendation } from "@/types/scan";

export const runtime = "nodejs";

/**
 * POST /api/scans/[scanId]/items/[itemId]/save — saves a specific ranked
 * recommendation and records a tracker event ('saved' | 'unsaved').
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ scanId: string; itemId: string }> },
) {
  try {
    const { user, supabase } = await requireUser();
    const { scanId, itemId } = await params;

    let body: { rank?: number };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    if (typeof body.rank !== "number") {
      return NextResponse.json({ error: "rank is required." }, { status: 400 });
    }

    const { data: item, error } = await supabase
      .from("scan_items")
      .select("id, saved, saved_recommendation_rank, brand_recommendations")
      .eq("id", itemId)
      .eq("scan_id", scanId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (error || !item) {
      return NextResponse.json({ error: "Item not found." }, { status: 404 });
    }

    const recommendations =
      (item.brand_recommendations as BrandRecommendation[]) ?? [];
    const recommendation = recommendations.find((rec) => rec.rank === body.rank);
    if (!recommendation) {
      return NextResponse.json(
        { error: "Recommendation not found." },
        { status: 404 },
      );
    }

    const togglingOff =
      item.saved && item.saved_recommendation_rank === body.rank;
    const nextSaved = !togglingOff;

    const { error: updateError } = await supabase
      .from("scan_items")
      .update(
        togglingOff
          ? {
              saved: false,
              saved_recommendation_rank: null,
              saved_recommendation: null,
            }
          : {
              saved: true,
              saved_recommendation_rank: body.rank,
              saved_recommendation: recommendation,
            },
      )
      .eq("id", itemId);
    if (updateError) {
      return NextResponse.json({ error: "Failed to update." }, { status: 500 });
    }

    await supabase.from("tracker_events").insert({
      user_id: user.id,
      scan_item_id: itemId,
      event_type: nextSaved ? "saved" : "unsaved",
    });

    return NextResponse.json({
      saved: nextSaved,
      saved_recommendation_rank: nextSaved ? body.rank : null,
    });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
