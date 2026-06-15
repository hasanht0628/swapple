import type { EnrichedProductData, ProductNutrients } from "@/types/productData";

export interface OffNutriments {
  ["energy-kcal_100g"]?: number;
  proteins_100g?: number;
  fat_100g?: number;
  ["saturated-fat_100g"]?: number;
  carbohydrates_100g?: number;
  sugars_100g?: number;
  ["added-sugars_100g"]?: number;
  fiber_100g?: number;
  sodium_100g?: number;
}

export interface OffProductShape {
  product_name?: string;
  brands?: string;
  ingredients_text?: string;
  serving_size?: string;
  nova_group?: number;
  nutriscore_grade?: string;
  categories_tags?: string[];
  nutriments?: OffNutriments;
  code?: string;
}

function mapNutrients(nm: OffNutriments): ProductNutrients {
  return {
    energyKcal: nm["energy-kcal_100g"] ?? null,
    proteinG: nm.proteins_100g ?? null,
    fatG: nm.fat_100g ?? null,
    saturatedFatG: nm["saturated-fat_100g"] ?? null,
    carbohydratesG: nm.carbohydrates_100g ?? null,
    sugarsG: nm.sugars_100g ?? null,
    addedSugarsG: nm["added-sugars_100g"] ?? null,
    fiberG: nm.fiber_100g ?? null,
    sodiumMg: nm.sodium_100g != null ? nm.sodium_100g * 1000 : null,
  };
}

/** Maps an Open Food Facts product payload to our normalized enrichment shape. */
export function mapOffProduct(
  product: OffProductShape,
  barcode?: string | null,
): EnrichedProductData {
  const nm = product.nutriments ?? {};
  return {
    source: "open_food_facts",
    matched: true,
    itemName: product.product_name,
    brandName: product.brands ?? null,
    barcode: barcode ?? product.code ?? null,
    ingredientsText: product.ingredients_text ?? null,
    servingSize: product.serving_size ?? null,
    novaGroup: product.nova_group ?? null,
    nutriScore: product.nutriscore_grade ?? null,
    categories: product.categories_tags,
    nutrients: mapNutrients(nm),
    raw: product,
  };
}
