import OpenAI from "openai";
import {
  SYSTEM_PROMPT,
  buildIdentifyPrompt,
  buildAnalysisPrompt,
  MAX_ITEMS_PER_SCAN,
} from "./prompts";
import {
  SCAN_JSON_SCHEMA,
  IDENTIFY_JSON_SCHEMA,
  parseScanResponse,
  identifyResponseSchema,
} from "./schema";
import { enrichItems } from "@/lib/productData/enrich";
import type { OpenAIScanResponse } from "@/types/scan";
import type { IdentifiedItem, EnrichedProductData } from "@/types/productData";

const VISION_MODEL = process.env.OPENAI_SCAN_MODEL ?? "gpt-4o";

let clientSingleton: OpenAI | null = null;
function getClient(): OpenAI {
  if (!clientSingleton) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
    clientSingleton = new OpenAI({ apiKey });
  }
  return clientSingleton;
}

/** Builds a data URL for the vision input from raw image bytes. */
export function toDataUrl(bytes: Buffer | Uint8Array, mime = "image/jpeg"): string {
  const base64 = Buffer.from(bytes).toString("base64");
  return `data:${mime};base64,${base64}`;
}

/**
 * Pass 1 — identify distinct items in the image (names, brands, barcodes).
 */
export async function identifyItems(imageDataUrl: string): Promise<IdentifiedItem[]> {
  const client = getClient();
  const completion = await client.chat.completions.create({
    model: VISION_MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          { type: "text", text: buildIdentifyPrompt() },
          { type: "image_url", image_url: { url: imageDataUrl } },
        ],
      },
    ],
    response_format: { type: "json_schema", json_schema: IDENTIFY_JSON_SCHEMA },
  });

  const content = completion.choices[0]?.message?.content ?? "{}";
  const parsed = identifyResponseSchema.parse(JSON.parse(content));
  return parsed.items.slice(0, MAX_ITEMS_PER_SCAN);
}

/**
 * Pass 2 — analyze identified items with enriched product data, tuned to the
 * user's priorities. Returns the validated structured response.
 */
export async function analyzeItems(args: {
  imageDataUrl: string;
  priorities: string[];
  items: Array<IdentifiedItem & { enriched?: EnrichedProductData }>;
}): Promise<OpenAIScanResponse> {
  const client = getClient();
  const completion = await client.chat.completions.create({
    model: VISION_MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: buildAnalysisPrompt({
              priorities: args.priorities,
              items: args.items,
            }),
          },
          { type: "image_url", image_url: { url: args.imageDataUrl } },
        ],
      },
    ],
    response_format: { type: "json_schema", json_schema: SCAN_JSON_SCHEMA },
  });

  const content = completion.choices[0]?.message?.content ?? "{}";
  return parseScanResponse(JSON.parse(content));
}

export interface AnalyzeScanResult {
  response: OpenAIScanResponse;
  /** Per-item enrichment sources, aligned by item_name for persistence. */
  sourcesByItemName: Map<string, string>;
}

/**
 * Full two-pass orchestration:
 *   1. identify items from the image
 *   2. enrich each item (OFF -> USDA -> GS1 -> model)
 *   3. analyze with enriched context
 *
 * Throws on hard failures; enrichment itself fails gracefully per item.
 */
export async function analyzeScan(args: {
  imageBytes: Buffer | Uint8Array;
  imageMime?: string;
  priorities: string[];
}): Promise<AnalyzeScanResult> {
  const imageDataUrl = toDataUrl(args.imageBytes, args.imageMime ?? "image/jpeg");

  const identified = await identifyItems(imageDataUrl);

  const enriched = await enrichItems(identified);
  const itemsForAnalysis = identified.map((item, i) => ({
    ...item,
    enriched: enriched[i],
  }));

  const response = await analyzeItems({
    imageDataUrl,
    priorities: args.priorities,
    items: itemsForAnalysis,
  });

  const sourcesByItemName = new Map<string, string>();
  itemsForAnalysis.forEach((it) => {
    if (it.enriched) sourcesByItemName.set(it.item_name, it.enriched.source);
  });

  return { response, sourcesByItemName };
}
