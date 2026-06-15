import { mapOffProduct, type OffProductShape } from "./mapOffProduct";
import type { EnrichedProductData } from "@/types/productData";

const OFF_BASE = "https://world.openfoodfacts.org/api/v2/product";
const OFF_SEARCH = "https://world.openfoodfacts.org/cgi/search.pl";
const OFF_HEADERS = { "User-Agent": "Swapple/1.0 (+https://swapple.app)" };
const OFF_CACHE = { revalidate: 60 * 60 * 24 };

/**
 * Open Food Facts lookup — best for barcoded packaged products.
 * https://world.openfoodfacts.org/api/v2/product/{barcode}
 */
export async function lookupOpenFoodFacts(
  barcode: string | null | undefined,
): Promise<EnrichedProductData | null> {
  if (!barcode) return null;

  try {
    const res = await fetch(`${OFF_BASE}/${encodeURIComponent(barcode)}.json`, {
      headers: OFF_HEADERS,
      next: OFF_CACHE,
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      status?: number;
      product?: OffProductShape;
    };

    if (json.status !== 1 || !json.product) return null;
    return mapOffProduct(json.product, barcode);
  } catch {
    return null;
  }
}

function normalizeForMatch(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function scoreOffMatch(
  product: OffProductShape,
  brand: string,
  productName: string,
): number {
  const brandNorm = normalizeForMatch(brand);
  const productNorm = normalizeForMatch(productName);
  const offBrand = normalizeForMatch(product.brands ?? "");
  const offName = normalizeForMatch(product.product_name ?? "");
  let score = 0;

  if (brandNorm && offBrand.includes(brandNorm)) score += 3;
  if (productNorm && offName.includes(productNorm)) score += 3;
  if (brandNorm && offName.includes(brandNorm)) score += 1;
  if (product.ingredients_text) score += 1;
  if (product.nutriments) score += 1;

  return score;
}

/**
 * Open Food Facts text search — used to resolve suggested brand swaps by name.
 * https://world.openfoodfacts.org/cgi/search.pl
 */
export async function searchOpenFoodFacts(args: {
  brand: string;
  productName: string;
}): Promise<EnrichedProductData | null> {
  const query = `${args.brand} ${args.productName}`.trim();
  if (!query) return null;

  try {
    const url = new URL(OFF_SEARCH);
    url.searchParams.set("action", "process");
    url.searchParams.set("json", "1");
    url.searchParams.set("page_size", "5");
    url.searchParams.set("search_terms", query);

    const res = await fetch(url, { headers: OFF_HEADERS, next: OFF_CACHE });
    if (!res.ok) return null;

    const json = (await res.json()) as { products?: OffProductShape[] };
    const candidates = json.products ?? [];
    if (candidates.length === 0) return null;

    const best = candidates
      .map((product) => ({
        product,
        score: scoreOffMatch(product, args.brand, args.productName),
      }))
      .sort((a, b) => b.score - a.score)[0];

    if (!best || best.score < 3) return null;
    return mapOffProduct(best.product);
  } catch {
    return null;
  }
}
