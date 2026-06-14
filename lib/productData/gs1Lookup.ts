import type { EnrichedProductData } from "@/types/productData";

/**
 * GS1 barcode lookup — used when a barcode is known but Open Food Facts had no
 * record. GS1's Verified-by-GS1 / Digital Link APIs require a licensed API key,
 * so this is a thin, env-gated adapter that fails gracefully when unconfigured.
 *
 * Wire GS1_API_BASE + GS1_API_KEY to enable. Without them this is a no-op that
 * returns null, letting the waterfall fall through to the model fallback.
 */
export async function lookupGs1(
  barcode: string | null | undefined,
): Promise<EnrichedProductData | null> {
  const base = process.env.GS1_API_BASE;
  const key = process.env.GS1_API_KEY;
  if (!barcode || !base || !key) return null;

  try {
    const res = await fetch(
      `${base.replace(/\/$/, "")}/${encodeURIComponent(barcode)}`,
      {
        headers: { Authorization: `Bearer ${key}` },
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
      productName?: string;
      brandName?: string;
      gtin?: string;
    };
    if (!json.productName && !json.brandName) return null;

    return {
      source: "gs1",
      matched: true,
      itemName: json.productName,
      brandName: json.brandName ?? null,
      barcode: json.gtin ?? barcode,
      raw: json,
    };
  } catch {
    return null;
  }
}
