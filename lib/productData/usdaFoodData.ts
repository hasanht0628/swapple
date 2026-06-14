import type {
  EnrichedProductData,
  ProductNutrients,
} from "@/types/productData";

/**
 * USDA FoodData Central search — best for raw produce / whole foods.
 * https://api.nal.usda.gov/fdc/v1/foods/search?api_key=...
 * Requires USDA_FDC_API_KEY (the free DEMO_KEY also works but is rate-limited).
 * Fails gracefully.
 */
const USDA_SEARCH = "https://api.nal.usda.gov/fdc/v1/foods/search";

// FDC nutrient numbers -> our normalized keys.
const NUTRIENT_MAP: Record<string, keyof ProductNutrients> = {
  "208": "energyKcal", // Energy (kcal)
  "203": "proteinG",
  "204": "fatG",
  "606": "saturatedFatG",
  "205": "carbohydratesG",
  "269": "sugarsG",
  "291": "fiberG",
  "307": "sodiumMg",
};

export async function lookupUsda(
  query: string,
): Promise<EnrichedProductData | null> {
  const apiKey = process.env.USDA_FDC_API_KEY;
  if (!apiKey || !query) return null;

  try {
    const url = new URL(USDA_SEARCH);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("query", query);
    url.searchParams.set("pageSize", "1");

    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      foods?: Array<{
        description?: string;
        brandName?: string;
        ingredients?: string;
        foodNutrients?: Array<{
          nutrientNumber?: string;
          value?: number;
          unitName?: string;
        }>;
      }>;
    };

    const food = json.foods?.[0];
    if (!food) return null;

    const nutrients: ProductNutrients = {};
    for (const n of food.foodNutrients ?? []) {
      const key = n.nutrientNumber && NUTRIENT_MAP[n.nutrientNumber];
      if (key && n.value != null) nutrients[key] = n.value;
    }

    return {
      source: "usda",
      matched: true,
      itemName: food.description,
      brandName: food.brandName ?? null,
      ingredientsText: food.ingredients ?? null,
      nutrients,
      raw: food,
    };
  } catch {
    return null;
  }
}
