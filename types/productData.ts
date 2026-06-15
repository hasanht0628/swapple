/**
 * Contracts for the product-data enrichment waterfall.
 * See lib/productData/* — Open Food Facts -> USDA -> GS1 -> model fallback.
 */

export type ProductDataSource =
  | "open_food_facts"
  | "usda"
  | "gs1"
  | "web"
  | "model";

/**
 * Normalized, source-agnostic product facts that we feed into the OpenAI
 * pass-2 analysis prompt. Every field is optional because each upstream source
 * populates a different subset and enrichment must fail gracefully.
 */
export interface EnrichedProductData {
  source: ProductDataSource;
  matched: boolean;
  itemName?: string;
  brandName?: string | null;
  barcode?: string | null;
  ingredientsText?: string | null;
  servingSize?: string | null;
  novaGroup?: number | null;
  nutriScore?: string | null;
  /** Per-100g (or per-serving when only that is available) nutrient values. */
  nutrients?: ProductNutrients;
  categories?: string[];
  /** Anything source-specific we want preserved for auditing. */
  raw?: unknown;
}

export interface ProductNutrients {
  energyKcal?: number | null;
  proteinG?: number | null;
  fatG?: number | null;
  saturatedFatG?: number | null;
  carbohydratesG?: number | null;
  sugarsG?: number | null;
  addedSugarsG?: number | null;
  fiberG?: number | null;
  sodiumMg?: number | null;
}

/** Minimal identification produced by OpenAI pass 1, fed into enrichment. */
export interface IdentifiedItem {
  item_name: string;
  brand_name?: string | null;
  barcode?: string | null;
}
