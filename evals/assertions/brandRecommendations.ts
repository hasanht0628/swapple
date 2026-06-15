import { getPriority, priorityLabel } from "@/lib/priorities";
import type { BrandRecommendation } from "@/types/scan";

interface ScanItemOutput {
  item_name?: string;
  brand_name?: string | null;
  brand_recommendations?: BrandRecommendation[];
}

interface BrandRecTestCase {
  priorities?: string[];
  items?: Array<{ item_name?: string; brand_name?: string | null }>;
  /** At least one recommendation must mention one of these (case-insensitive). */
  expected_swap_keywords?: string[];
  /** No recommendation text may contain any of these. */
  forbidden_swap_keywords?: string[];
  min_brand_recommendations?: number;
  max_brand_recommendations?: number;
}

const PLACEHOLDER_PATTERNS: RegExp[] = [
  /^better brand$/i,
  /^product name$/i,
  /^example brand$/i,
  /^unknown brand$/i,
  /^n\/a$/i,
  /^tbd$/i,
  /^generic product$/i,
  /^alternative product$/i,
];

const MIN_WHY_BETTER_LENGTH = 20;
const MIN_BRAND_LENGTH = 2;
const MIN_PRODUCT_NAME_LENGTH = 3;

function parseOutput(output: string): { items?: ScanItemOutput[] } | null {
  try {
    return typeof output === "string" ? JSON.parse(output) : (output as never);
  } catch {
    return null;
  }
}

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function recommendationBlob(rec: BrandRecommendation): string {
  return [rec.brand, rec.product_name, rec.why_better, rec.tradeoffs ?? ""]
    .filter(Boolean)
    .join(" ");
}

const PRIORITY_SYNONYMS: Record<string, string[]> = {
  heart_health: ["heart", "omega", "saturated", "sodium", "cholesterol", "fat"],
  blood_sugar: ["blood sugar", "glycemic", "sugar", "carb", "glucose", "fiber"],
  gut_health: [
    "gut",
    "microbiome",
    "probiotic",
    "culture",
    "fiber",
    "fermented",
    "prebiotic",
    "additive",
    "digest",
    "organic",
    "leafy",
    "greens",
  ],
  inflammation: [
    "inflammation",
    "inflammatory",
    "antioxidant",
    "omega",
    "oxidative",
    "nutrient",
  ],
  hormones: ["hormone", "endocrine", "soy", "seed oil"],
  weight_management: ["calorie", "satiety", "protein", "sugar", "weight", "density"],
  sustainability: ["sustainable", "organic", "certified", "packaging", "carbon", "sourcing"],
};

function textIncludesToken(text: string, token: string): boolean {
  const haystack = normalize(text);
  const needle = normalize(token);
  if (needle.length === 0) return false;
  if (haystack.includes(needle)) return true;
  if (needle.endsWith("s") && haystack.includes(needle.slice(0, -1))) return true;
  if (haystack.includes(`${needle}s`)) return true;
  return false;
}

function tokensForPriority(priorityId: string): string[] {
  const priority = getPriority(priorityId);
  const fromHint =
    priority?.promptHint
      .split(",")
      .map((part) => part.trim().toLowerCase())
      .filter(Boolean) ?? [];
  const synonyms = PRIORITY_SYNONYMS[priorityId] ?? [];
  return [
    priorityId.toLowerCase(),
    priorityLabel(priorityId).toLowerCase(),
    ...fromHint,
    ...synonyms,
  ];
}

function looksLikeSameProduct(
  rec: BrandRecommendation,
  scannedBrand: string | null | undefined,
  scannedName: string | null | undefined,
): boolean {
  const recBrand = normalize(rec.brand);
  const recProduct = normalize(rec.product_name);
  const itemBrand = scannedBrand ? normalize(scannedBrand) : "";
  const itemName = scannedName ? normalize(scannedName) : "";

  if (itemBrand && recBrand === itemBrand && recProduct.includes(itemName)) {
    return true;
  }
  if (itemName && recProduct === itemName && (!itemBrand || recBrand === itemBrand)) {
    return true;
  }
  return false;
}

function looksPlaceholder(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0) return true;
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(trimmed));
}

function matchesAnyKeyword(text: string, keywords: string[]): boolean {
  const haystack = normalize(text);
  return keywords.some((keyword) => haystack.includes(normalize(keyword)));
}

function containsForbiddenKeyword(text: string, keywords: string[]): string | null {
  const haystack = normalize(text);
  for (const keyword of keywords) {
    if (haystack.includes(normalize(keyword))) return keyword;
  }
  return null;
}

/**
 * Validates brand_recommendations quality:
 *  - count + rank ordering (production asks for 1–3 ranked swaps)
 *  - plausible, non-placeholder product names
 *  - not duplicating the scanned item
 *  - why_better ties to user priorities when priorities are set
 *  - case-specific expected / forbidden swap keywords from tc vars
 */
export default function brandRecommendations(
  output: string,
  context: { vars?: { tc?: BrandRecTestCase } },
) {
  const parsed = parseOutput(output);
  if (!parsed) {
    return { pass: false, score: 0, reason: "Output is not valid JSON" };
  }

  const tc = context.vars?.tc ?? {};
  const minRecs = tc.min_brand_recommendations ?? 1;
  const maxRecs = tc.max_brand_recommendations ?? 3;
  const scannedItems = tc.items ?? [];
  const items = parsed.items ?? [];

  if (items.length === 0) {
    return { pass: false, score: 0, reason: "No items returned" };
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const scanned = scannedItems[i];
    const recs = item.brand_recommendations ?? [];
    const itemLabel = item.item_name ?? `item ${i + 1}`;

    if (recs.length < minRecs || recs.length > maxRecs) {
      return {
        pass: false,
        score: 0,
        reason: `"${itemLabel}" returned ${recs.length} brand_recommendations; expected ${minRecs}–${maxRecs}`,
      };
    }

    const ranks = recs.map((rec) => rec.rank).sort((a, b) => a - b);
    const expectedRanks = recs.map((_, idx) => idx + 1);
    if (ranks.some((rank, idx) => rank !== expectedRanks[idx])) {
      return {
        pass: false,
        score: 0,
        reason: `"${itemLabel}" brand_recommendations ranks must be 1..n without gaps; got [${ranks.join(", ")}]`,
      };
    }

    const seenProducts = new Set<string>();
    for (const rec of recs) {
      if (looksPlaceholder(rec.brand) || looksPlaceholder(rec.product_name)) {
        return {
          pass: false,
          score: 0,
          reason: `"${itemLabel}" has placeholder brand/product_name: "${rec.brand}" / "${rec.product_name}"`,
        };
      }

      if (
        rec.brand.trim().length < MIN_BRAND_LENGTH ||
        rec.product_name.trim().length < MIN_PRODUCT_NAME_LENGTH
      ) {
        return {
          pass: false,
          score: 0,
          reason: `"${itemLabel}" recommendation "${rec.brand} ${rec.product_name}" looks too short to be a real product`,
        };
      }

      if (rec.why_better.trim().length < MIN_WHY_BETTER_LENGTH) {
        return {
          pass: false,
          score: 0,
          reason: `"${itemLabel}" recommendation rank ${rec.rank} why_better is too brief to explain the swap`,
        };
      }

      if (looksLikeSameProduct(rec, scanned?.brand_name, scanned?.item_name)) {
        return {
          pass: false,
          score: 0,
          reason: `"${itemLabel}" recommendation "${rec.brand} ${rec.product_name}" duplicates the scanned product`,
        };
      }

      const productKey = `${normalize(rec.brand)}::${normalize(rec.product_name)}`;
      if (seenProducts.has(productKey)) {
        return {
          pass: false,
          score: 0,
          reason: `"${itemLabel}" has duplicate recommendations for "${rec.brand} ${rec.product_name}"`,
        };
      }
      seenProducts.add(productKey);

      const forbidden = tc.forbidden_swap_keywords ?? [];
      if (forbidden.length > 0) {
        const productText = `${rec.brand} ${rec.product_name}`;
        const hit = containsForbiddenKeyword(productText, forbidden);
        if (hit) {
          return {
            pass: false,
            score: 0,
            reason: `"${itemLabel}" recommendation "${rec.brand} ${rec.product_name}" contains forbidden swap keyword "${hit}"`,
          };
        }
      }
    }

    const priorityIds = tc.priorities ?? [];
    if (priorityIds.length > 0) {
      const wantedTokens = priorityIds.flatMap(tokensForPriority);
      const priorityReferenced = recs.some((rec) => {
        const text = recommendationBlob(rec);
        return wantedTokens.some((token) => textIncludesToken(text, token));
      });
      if (!priorityReferenced) {
        return {
          pass: false,
          score: 0,
          reason: `"${itemLabel}" brand_recommendations do not explain swaps in terms of user priorities (${priorityIds.join(", ")})`,
        };
      }
    }

    const expectedKeywords = tc.expected_swap_keywords ?? [];
    if (expectedKeywords.length > 0) {
      const matchedExpected = recs.some((rec) =>
        matchesAnyKeyword(recommendationBlob(rec), expectedKeywords),
      );
      if (!matchedExpected) {
        return {
          pass: false,
          score: 0,
          reason: `"${itemLabel}" brand_recommendations did not match any expected swap keywords [${expectedKeywords.join(", ")}]`,
        };
      }
    }
  }

  return {
    pass: true,
    score: 1,
    reason: "Brand recommendations are plausible, priority-aligned, and match case-specific swap expectations",
  };
}
