import OpenAI from "openai";
import type { EnrichedProductData } from "@/types/productData";
import { withTimeout } from "./withTimeout";

const WEB_LOOKUP_TIMEOUT_MS = 12000;

export interface WebIngredientLookupResult {
  source: "web";
  matched: true;
  ingredientsText: string;
  verificationConfidence: number;
  sourceUrl: string | null;
}

const INGREDIENT_EXTRACT_SCHEMA = {
  name: "web_ingredient_lookup",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      ingredients_text: { type: "string" },
      confidence: { type: "number" },
    },
    required: ["ingredients_text", "confidence"],
  },
} as const;

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

function extractSourceUrl(response: OpenAI.Responses.Response): string | null {
  for (const item of response.output) {
    if (item.type !== "message") continue;
    for (const content of item.content) {
      if (content.type !== "output_text") continue;
      for (const annotation of content.annotations ?? []) {
        if (annotation.type === "url_citation" && annotation.url) {
          return annotation.url;
        }
      }
    }
  }
  return null;
}

/**
 * When OFF/USDA miss (common for newer brands), use OpenAI Responses API with
 * the hosted `web_search` tool to find ingredient text from the web.
 */
export async function lookupIngredientsOnline(args: {
  brand: string;
  productName: string;
}): Promise<WebIngredientLookupResult | null> {
  const client = getOpenAIClient();
  if (!client) return null;

  const query = `${args.brand} ${args.productName}`.trim();
  if (!query) return null;

  const model =
    process.env.OPENAI_WEB_LOOKUP_MODEL ??
    process.env.OPENAI_EXTRACT_MODEL ??
    "gpt-4o-mini";

  try {
    const response = await withTimeout(
      client.responses.create({
        model,
        temperature: 0,
        include: ["web_search_call.action.sources"],
        tools: [{ type: "web_search", search_context_size: "low" }],
        tool_choice: "required",
        instructions:
          "You find packaged food ingredient lists from the web. Use web search, prefer official brand or retailer pages, and never invent ingredients.",
        input: `Find the ingredient list for this product: ${args.brand} — ${args.productName}.

Return JSON only:
- ingredients_text: comma-separated ingredients exactly as listed on the label or product page
- confidence: 0-1 for how sure you are this matches the named product

If you cannot find a reliable ingredient list, return ingredients_text as an empty string and confidence 0.`,
        text: {
          format: {
            type: "json_schema",
            name: INGREDIENT_EXTRACT_SCHEMA.name,
            strict: INGREDIENT_EXTRACT_SCHEMA.strict,
            schema: INGREDIENT_EXTRACT_SCHEMA.schema,
          },
        },
      }),
      WEB_LOOKUP_TIMEOUT_MS,
      "OpenAI web ingredient lookup",
    );

    const parsed = JSON.parse(response.output_text || "{}") as {
      ingredients_text?: string;
      confidence?: number;
    };

    const ingredientsText = parsed.ingredients_text?.trim() ?? "";
    const confidence = parsed.confidence ?? 0;

    if (ingredientsText.length < 8 || confidence < 0.55) return null;

    return {
      source: "web",
      matched: true,
      ingredientsText,
      verificationConfidence: confidence,
      sourceUrl: extractSourceUrl(response),
    };
  } catch {
    return null;
  }
}

/** Converts a web lookup result into EnrichedProductData for downstream checks. */
export function webLookupToEnriched(
  web: WebIngredientLookupResult,
  brand: string,
  productName: string,
): EnrichedProductData {
  return {
    source: "web",
    matched: true,
    itemName: productName,
    brandName: brand,
    ingredientsText: web.ingredientsText,
    raw: { sourceUrl: web.sourceUrl, confidence: web.verificationConfidence },
  };
}
