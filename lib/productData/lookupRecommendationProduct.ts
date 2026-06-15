import { searchOpenFoodFacts } from "./openFoodFacts";
import { lookupUsda } from "./usdaFoodData";
import type { EnrichedProductData } from "@/types/productData";

/**
 * Resolves a suggested brand swap via OFF text search, then USDA name search.
 * Used in Pass 3 verification — separate from scanned-item enrichment.
 */
export async function lookupRecommendationProduct(args: {
  brand: string;
  productName: string;
}): Promise<EnrichedProductData | null> {
  const off = await searchOpenFoodFacts(args);
  if (off?.matched) return off;

  const usda = await lookupUsda(`${args.brand} ${args.productName}`.trim());
  if (usda?.matched) return usda;

  return null;
}
