import type { EnrichedProductData } from "@/types/productData";

/**
 * Open Food Facts lookup — best for barcoded packaged products.
 * https://world.openfoodfacts.org/api/v2/product/{barcode}
 * No API key required. Fails gracefully (returns null on miss/error).
 */
const OFF_BASE = "https://world.openfoodfacts.org/api/v2/product";

interface OffNutriments {
  ["energy-kcal_100g"]?: number;
  proteins_100g?: number;
  fat_100g?: number;
  ["saturated-fat_100g"]?: number;
  carbohydrates_100g?: number;
  sugars_100g?: number;
  ["added-sugars_100g"]?: number;
  fiber_100g?: number;
  sodium_100g?: number; // grams
}

export async function lookupOpenFoodFacts(
  barcode: string | null | undefined,
): Promise<EnrichedProductData | null> {
  if (!barcode) return null;

  try {
    const res = await fetch(
      `${OFF_BASE}/${encodeURIComponent(barcode)}.json`,
      {
        headers: { "User-Agent": "Swapple/1.0 (+https://swapple.app)" },
        // OFF data is stable; allow short caching.
        next: { revalidate: 60 * 60 * 24 },
      },
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
      status?: number;
      product?: {
        product_name?: string;
        brands?: string;
        ingredients_text?: string;
        serving_size?: string;
        nova_group?: number;
        nutriscore_grade?: string;
        categories_tags?: string[];
        nutriments?: OffNutriments;
      };
    };

    if (json.status !== 1 || !json.product) return null;

    const p = json.product;
    const nm = p.nutriments ?? {};

    return {
      source: "open_food_facts",
      matched: true,
      itemName: p.product_name,
      brandName: p.brands ?? null,
      barcode,
      ingredientsText: p.ingredients_text ?? null,
      servingSize: p.serving_size ?? null,
      novaGroup: p.nova_group ?? null,
      nutriScore: p.nutriscore_grade ?? null,
      categories: p.categories_tags,
      nutrients: {
        energyKcal: nm["energy-kcal_100g"] ?? null,
        proteinG: nm.proteins_100g ?? null,
        fatG: nm.fat_100g ?? null,
        saturatedFatG: nm["saturated-fat_100g"] ?? null,
        carbohydratesG: nm.carbohydrates_100g ?? null,
        sugarsG: nm.sugars_100g ?? null,
        addedSugarsG: nm["added-sugars_100g"] ?? null,
        fiberG: nm.fiber_100g ?? null,
        sodiumMg: nm.sodium_100g != null ? nm.sodium_100g * 1000 : null,
      },
      raw: json.product,
    };
  } catch {
    return null;
  }
}
