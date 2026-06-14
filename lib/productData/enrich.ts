import { lookupOpenFoodFacts } from "./openFoodFacts";
import { lookupUsda } from "./usdaFoodData";
import { lookupGs1 } from "./gs1Lookup";
import type { EnrichedProductData, IdentifiedItem } from "@/types/productData";

/**
 * Enrichment waterfall for a single identified item:
 *   1. Open Food Facts (by barcode)
 *   2. USDA FoodData Central (by name)
 *   3. GS1 barcode lookup (by barcode)
 *   4. Model fallback — returns an unmatched record so the model uses its own
 *      knowledge in pass 2.
 *
 * Always resolves (never throws); each step fails gracefully to the next.
 */
export async function enrichItem(
  item: IdentifiedItem,
): Promise<EnrichedProductData> {
  const off = await lookupOpenFoodFacts(item.barcode);
  if (off?.matched) return off;

  const usda = await lookupUsda(item.item_name);
  if (usda?.matched) return usda;

  const gs1 = await lookupGs1(item.barcode);
  if (gs1?.matched) return gs1;

  return {
    source: "model",
    matched: false,
    itemName: item.item_name,
    brandName: item.brand_name ?? null,
    barcode: item.barcode ?? null,
  };
}

/** Enriches a list of identified items in parallel, preserving order. */
export async function enrichItems(
  items: IdentifiedItem[],
): Promise<EnrichedProductData[]> {
  return Promise.all(items.map((item) => enrichItem(item)));
}
