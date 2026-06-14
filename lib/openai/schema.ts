import { z } from "zod";
import type { OpenAIScanResponse } from "@/types/scan";

/**
 * Structured-output contract for the OpenAI pass-2 analysis call.
 * We keep a zod schema (for runtime validation of the parsed JSON) and a
 * hand-written JSON schema (passed as response_format.json_schema). Keep both
 * in sync with types/scan.ts -> OpenAIScanResponse.
 */

export const priorityTradeoffSchema = z.object({
  priority: z.string(),
  impact: z.enum(["positive", "mixed", "negative"]),
  explanation: z.string(),
});

export const brandRecommendationSchema = z.object({
  rank: z.number().int(),
  brand: z.string(),
  product_name: z.string(),
  why_better: z.string(),
  tradeoffs: z.string().nullable().optional(),
});

export const scanItemSchema = z.object({
  item_name: z.string(),
  brand_name: z.string().nullable().optional(),
  verdict: z.enum(["good", "caution", "avoid"]),
  free_reason: z.string(),
  general_principle: z.string(),
  detailed_reason: z.string(),
  priority_tradeoffs: z.array(priorityTradeoffSchema),
  brand_recommendations: z.array(brandRecommendationSchema),
  confidence: z.number().min(0).max(1),
});

export const scanResponseSchema = z.object({
  items: z.array(scanItemSchema),
  image_summary: z.string().nullable().optional(),
  limitations: z.array(z.string()).optional(),
});

export function parseScanResponse(raw: unknown): OpenAIScanResponse {
  return scanResponseSchema.parse(raw) as OpenAIScanResponse;
}

/** Pass-1 identification schema: lightweight name/brand/barcode extraction. */
export const identifyResponseSchema = z.object({
  items: z.array(
    z.object({
      item_name: z.string(),
      brand_name: z.string().nullable().optional(),
      barcode: z.string().nullable().optional(),
    }),
  ),
});

/**
 * JSON Schema for OpenAI `response_format: { type: "json_schema" }`.
 * All properties are required and additionalProperties:false per OpenAI's
 * strict structured-output requirements; nullable fields use ["type","null"].
 */
export const SCAN_JSON_SCHEMA = {
  name: "swapple_scan",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            item_name: { type: "string" },
            brand_name: { type: ["string", "null"] },
            verdict: { type: "string", enum: ["good", "caution", "avoid"] },
            free_reason: { type: "string" },
            general_principle: { type: "string" },
            detailed_reason: { type: "string" },
            priority_tradeoffs: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  priority: { type: "string" },
                  impact: {
                    type: "string",
                    enum: ["positive", "mixed", "negative"],
                  },
                  explanation: { type: "string" },
                },
                required: ["priority", "impact", "explanation"],
              },
            },
            brand_recommendations: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  rank: { type: "integer" },
                  brand: { type: "string" },
                  product_name: { type: "string" },
                  why_better: { type: "string" },
                  tradeoffs: { type: ["string", "null"] },
                },
                required: [
                  "rank",
                  "brand",
                  "product_name",
                  "why_better",
                  "tradeoffs",
                ],
              },
            },
            confidence: { type: "number" },
          },
          required: [
            "item_name",
            "brand_name",
            "verdict",
            "free_reason",
            "general_principle",
            "detailed_reason",
            "priority_tradeoffs",
            "brand_recommendations",
            "confidence",
          ],
        },
      },
      image_summary: { type: ["string", "null"] },
      limitations: { type: "array", items: { type: "string" } },
    },
    required: ["items", "image_summary", "limitations"],
  },
} as const;

/** JSON Schema for the pass-1 identification call. */
export const IDENTIFY_JSON_SCHEMA = {
  name: "swapple_identify",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            item_name: { type: "string" },
            brand_name: { type: ["string", "null"] },
            barcode: { type: ["string", "null"] },
          },
          required: ["item_name", "brand_name", "barcode"],
        },
      },
    },
    required: ["items"],
  },
} as const;
