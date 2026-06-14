import { NextResponse, type NextRequest } from "next/server";
import { requireUserWithProfile, UnauthorizedError } from "@/lib/auth/requireUser";
import { uploadScanImage, getScanImageUrl } from "@/lib/supabase/storage";
import { analyzeScan } from "@/lib/openai/analyzeScan";
import { MAX_ITEMS_PER_SCAN } from "@/lib/openai/prompts";
import { serializeScan, serializeScanItem } from "@/lib/scans";
import type { CreateScanResponse, ScanItemDTO } from "@/types/scan";
import type { ScanItemRow } from "@/types/database";

export const runtime = "nodejs";
// Vision + enrichment can take a while; allow a longer budget.
export const maxDuration = 60;

/**
 * POST /api/scans — multipart/form-data with one `image` field.
 * Full two-pass flow: upload -> insert scan -> identify -> enrich -> analyze ->
 * persist items -> return gated DTO.
 */
export async function POST(request: NextRequest) {
  try {
    const { user, profile, supabase } = await requireUserWithProfile();

    const formData = await request.formData();
    const image = formData.get("image");
    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "Missing `image` file field." },
        { status: 400 },
      );
    }

    // 1. Upload the image to Storage (retained indefinitely for eval).
    const { path } = await uploadScanImage(
      supabase,
      user.id,
      image,
      image.name || "scan.jpg",
    );

    // 2. Insert the scan row in `processing` state.
    const { data: scan, error: scanError } = await supabase
      .from("scans")
      .insert({ user_id: user.id, image_path: path, status: "processing" })
      .select("*")
      .single();
    if (scanError || !scan) {
      return NextResponse.json(
        { error: "Failed to create scan." },
        { status: 500 },
      );
    }

    try {
      // 3-5. Two-pass analysis with enrichment.
      const bytes = Buffer.from(await image.arrayBuffer());
      const { response, sourcesByItemName } = await analyzeScan({
        imageBytes: bytes,
        imageMime: image.type || "image/jpeg",
        priorities: profile.priorities,
      });

      const items = response.items.slice(0, MAX_ITEMS_PER_SCAN);

      // 6. Persist scan_items.
      const rowsToInsert = items.map((it) => ({
        scan_id: scan.id,
        user_id: user.id,
        item_name: it.item_name,
        brand_name: it.brand_name ?? null,
        verdict: it.verdict,
        free_reason: it.free_reason,
        general_principle: it.general_principle,
        detailed_reason: it.detailed_reason,
        priority_tradeoffs: it.priority_tradeoffs,
        brand_recommendations: it.brand_recommendations,
        product_data_source: sourcesByItemName.get(it.item_name) ?? "model",
        confidence: it.confidence,
      }));

      const { data: insertedItems, error: itemsError } = await supabase
        .from("scan_items")
        .insert(rowsToInsert)
        .select("*");
      if (itemsError || !insertedItems) {
        throw itemsError ?? new Error("Failed to insert scan items.");
      }

      // 7. Mark the scan completed + store the raw response for auditing.
      const imageUrl = await getScanImageUrl(supabase, path);
      const { data: updatedScan } = await supabase
        .from("scans")
        .update({
          status: "completed",
          item_count: insertedItems.length,
          raw_ai_response: response as unknown as Record<string, unknown>,
          image_url: imageUrl,
        })
        .eq("id", scan.id)
        .select("*")
        .single();

      const payload: CreateScanResponse = {
        scan: serializeScan(updatedScan ?? { ...scan, image_url: imageUrl }),
        items: (insertedItems as ScanItemRow[]).map(
          (row): ScanItemDTO =>
            serializeScanItem(row, profile.subscription_status),
        ),
      };
      return NextResponse.json(payload, { status: 201 });
    } catch (err) {
      // Mark the scan failed so the client can surface a retry.
      await supabase.from("scans").update({ status: "failed" }).eq("id", scan.id);
      console.error("Scan analysis failed:", err);
      return NextResponse.json(
        { error: "Scan analysis failed.", scanId: scan.id },
        { status: 502 },
      );
    }
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error("POST /api/scans error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}

/**
 * GET /api/scans — paginated recent scans for the home strip.
 * Query: ?limit=10&before=<ISO timestamp>
 */
export async function GET(request: NextRequest) {
  try {
    const { user, supabase } = await requireUserWithProfile();
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);
    const before = searchParams.get("before");

    let query = supabase
      .from("scans")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (before) query = query.lt("created_at", before);

    const { data, error } = await query;
    if (error) {
      return NextResponse.json(
        { error: "Failed to load scans." },
        { status: 500 },
      );
    }

    return NextResponse.json({ scans: (data ?? []).map(serializeScan) });
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
