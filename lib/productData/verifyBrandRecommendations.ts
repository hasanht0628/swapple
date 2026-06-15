import { lookupRecommendationProduct } from "./lookupRecommendationProduct";
import {
  lookupIngredientsOnline,
  webLookupToEnriched,
} from "./onlineIngredientLookup";
import {
  buildVerifiedWhyBetter,
  validateSwapIngredients,
} from "./validateSwapIngredients";
import { withTimeout } from "./withTimeout";
import type { EnrichedProductData } from "@/types/productData";
import type {
  BrandRecommendation,
  OpenAIScanItem,
  OpenAIScanResponse,
  Verdict,
} from "@/types/scan";

const DB_LOOKUP_TIMEOUT_MS = 3000;

export interface VerifiedBrandRecommendation extends BrandRecommendation {
  ingredients_source?: "open_food_facts" | "usda" | "web";
  ingredients_text?: string | null;
  verification_confidence?: number;
  source_url?: string | null;
}

async function resolveSwapProduct(args: {
  brand: string;
  productName: string;
  allowWeb: boolean;
}): Promise<{
  enriched: EnrichedProductData | null;
  verificationConfidence: number;
  sourceUrl: string | null;
}> {
  try {
    const fromDb = await withTimeout(
      lookupRecommendationProduct({
        brand: args.brand,
        productName: args.productName,
      }),
      DB_LOOKUP_TIMEOUT_MS,
      "Recommendation DB lookup",
    );

    if (fromDb?.matched) {
      if (fromDb.ingredientsText) {
        return {
          enriched: fromDb,
          verificationConfidence:
            fromDb.source === "open_food_facts" ? 0.95 : 0.85,
          sourceUrl: null,
        };
      }
    }
  } catch {
    // fall through to optional web lookup
  }

  if (!args.allowWeb) {
    return { enriched: null, verificationConfidence: 0, sourceUrl: null };
  }

  try {
    const web = await lookupIngredientsOnline({
      brand: args.brand,
      productName: args.productName,
    });
    if (!web) {
      return { enriched: null, verificationConfidence: 0, sourceUrl: null };
    }

    return {
      enriched: webLookupToEnriched(web, args.brand, args.productName),
      verificationConfidence: web.verificationConfidence,
      sourceUrl: web.sourceUrl,
    };
  } catch {
    return { enriched: null, verificationConfidence: 0, sourceUrl: null };
  }
}

async function verifySingleRecommendation(args: {
  rec: BrandRecommendation;
  scanned: EnrichedProductData | undefined;
  priorities: string[];
  verdict: Verdict;
  allowWeb: boolean;
}): Promise<VerifiedBrandRecommendation | null> {
  const resolved = await resolveSwapProduct({
    brand: args.rec.brand,
    productName: args.rec.product_name,
    allowWeb: args.allowWeb,
  });

  if (!resolved.enriched?.ingredientsText) return null;

  const validation = validateSwapIngredients({
    scanned: args.scanned,
    swap: resolved.enriched,
    priorities: args.priorities,
    verdict: args.verdict,
  });

  if (!validation.pass) return null;

  const source = resolved.enriched.source;
  const ingredientsSource =
    source === "open_food_facts" || source === "usda" || source === "web"
      ? source
      : undefined;

  return {
    ...args.rec,
    why_better: buildVerifiedWhyBetter({
      brand: args.rec.brand,
      productName: args.rec.product_name,
      highlights: validation.highlights,
      originalWhyBetter: args.rec.why_better,
    }),
    ingredients_source: ingredientsSource,
    ingredients_text: resolved.enriched.ingredientsText,
    verification_confidence: resolved.verificationConfidence,
    source_url: resolved.sourceUrl,
  };
}

/**
 * Pass 3 — verify LLM brand recommendations against real ingredient data.
 * Drops swaps we cannot ground or that fail priority-aware checks.
 */
export async function verifyBrandRecommendations(args: {
  response: OpenAIScanResponse;
  priorities: string[];
  scannedByItemName: Map<string, EnrichedProductData | undefined>;
}): Promise<OpenAIScanResponse> {
  const items = await Promise.all(
    args.response.items.map(async (item) => {
      const verified = await verifyItemRecommendations({
        item,
        scanned: args.scannedByItemName.get(item.item_name),
        priorities: args.priorities,
      });
      return { ...item, brand_recommendations: verified };
    }),
  );

  return { ...args.response, items };
}

async function verifyItemRecommendations(args: {
  item: OpenAIScanItem;
  scanned: EnrichedProductData | undefined;
  priorities: string[];
}): Promise<VerifiedBrandRecommendation[]> {
  const sorted = [...args.item.brand_recommendations].sort(
    (a, b) => a.rank - b.rank,
  );

  const results = await Promise.all(
    sorted.map(async (rec) =>
      verifySingleRecommendation({
        rec,
        scanned: args.scanned,
        priorities: args.priorities,
        verdict: args.item.verdict,
        // Cap web fallback to rank-1 swap per item for latency control.
        allowWeb: rec.rank === 1,
      }),
    ),
  );

  return results
    .filter((rec): rec is VerifiedBrandRecommendation => rec != null)
    .map((rec, index) => ({ ...rec, rank: index + 1 }));
}
