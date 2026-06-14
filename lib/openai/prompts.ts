import { NON_MEDICAL_DISCLAIMER } from "@/lib/disclaimer";
import { priorityLabel, getPriority } from "@/lib/priorities";
import type { EnrichedProductData } from "@/types/productData";

export const MAX_ITEMS_PER_SCAN = 10;

/**
 * System prompt shared by both passes. Embeds the non-medical disclaimer so the
 * model's guidance always stays in the nutrition lane.
 */
export const SYSTEM_PROMPT = `You are Swapple, a nutritional food analysis assistant.
You analyze food products from a photo and return structured nutritional guidance personalized to the user's health priorities.
You provide food and nutritional information only — not medical advice.
${NON_MEDICAL_DISCLAIMER}
Do not diagnose, treat, recommend against medical care, or make medical claims.
Be concrete and practical. Base verdicts on ingredients, processing level, and nutrient profile.
Return only valid JSON matching the provided schema.`;

/** Pass-1 user instruction: identify distinct food items in the image. */
export function buildIdentifyPrompt(): string {
  return `Identify each distinct food or beverage product visible in this image.
Return up to ${MAX_ITEMS_PER_SCAN} items. For each, give a concise item_name, the brand_name if legible (else null), and the barcode digits if clearly readable (else null).
Do not analyze or rank them yet — only identify.`;
}

function formatEnriched(data: EnrichedProductData | undefined): string {
  if (!data || !data.matched) return "No external product data found.";
  const n = data.nutrients ?? {};
  const parts: string[] = [`source=${data.source}`];
  if (data.brandName) parts.push(`brand=${data.brandName}`);
  if (data.ingredientsText) parts.push(`ingredients="${data.ingredientsText}"`);
  if (data.novaGroup != null) parts.push(`nova=${data.novaGroup}`);
  if (data.nutriScore) parts.push(`nutriscore=${data.nutriScore}`);
  if (n.energyKcal != null) parts.push(`kcal=${n.energyKcal}`);
  if (n.sugarsG != null) parts.push(`sugars_g=${n.sugarsG}`);
  if (n.addedSugarsG != null) parts.push(`added_sugars_g=${n.addedSugarsG}`);
  if (n.saturatedFatG != null) parts.push(`sat_fat_g=${n.saturatedFatG}`);
  if (n.sodiumMg != null) parts.push(`sodium_mg=${n.sodiumMg}`);
  if (n.fiberG != null) parts.push(`fiber_g=${n.fiberG}`);
  if (n.proteinG != null) parts.push(`protein_g=${n.proteinG}`);
  return parts.join("; ");
}

/**
 * Pass-2 user instruction: analyze each identified item with its enriched data,
 * tuned to the user's priorities.
 */
export function buildAnalysisPrompt(args: {
  priorities: string[];
  items: Array<{
    item_name: string;
    brand_name?: string | null;
    barcode?: string | null;
    enriched?: EnrichedProductData;
  }>;
}): string {
  const priorityLines = args.priorities.length
    ? args.priorities
        .map((id) => {
          const p = getPriority(id);
          return `- ${priorityLabel(id)}${p ? ` (focus: ${p.promptHint})` : ""}`;
        })
        .join("\n")
    : "- General healthfulness (no specific priorities selected)";

  const itemBlocks = args.items
    .map((item, i) => {
      return `Item ${i + 1}: ${item.item_name}${
        item.brand_name ? ` — ${item.brand_name}` : ""
      }${item.barcode ? ` (barcode ${item.barcode})` : ""}
  Product data: ${formatEnriched(item.enriched)}`;
    })
    .join("\n");

  return `The user's health priorities are:
${priorityLines}

Analyze each of the following ${args.items.length} item(s). Rank every item with a verdict of "good", "caution", or "avoid" relative to the user's priorities.

For EVERY item provide:
- free_reason: one concise sentence (shown to all users).
- general_principle: a short, transferable nutrition rule (e.g. "Look for wild-caught").
- detailed_reason: a fuller explanation (2-4 sentences).
- priority_tradeoffs: one entry per relevant user priority with impact and explanation.
- brand_recommendations: 1-3 concretely better real products (ranked). For "good" items frame these as "other great options". Only recommend products you are reasonably confident exist.
- confidence: 0-1.

Items:
${itemBlocks}`;
}
