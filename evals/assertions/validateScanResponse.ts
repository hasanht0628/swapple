import { scanResponseSchema } from "@/lib/openai/schema";

/**
 * Validates the model output against the SAME zod schema production uses
 * (lib/openai/schema.ts). This guarantees: valid JSON, required fields present,
 * verdict ∈ {good,caution,avoid}, impact ∈ {positive,mixed,negative},
 * confidence ∈ [0,1], etc. — i.e. it would pass parseScanResponse() in prod.
 */
export default function validateScanResponse(output: string) {
  let parsed: unknown;
  try {
    parsed = typeof output === "string" ? JSON.parse(output) : output;
  } catch (e) {
    return {
      pass: false,
      score: 0,
      reason: `Output is not valid JSON: ${(e as Error).message}`,
    };
  }

  const result = scanResponseSchema.safeParse(parsed);
  if (!result.success) {
    return {
      pass: false,
      score: 0,
      reason: `Schema validation failed: ${result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ")}`,
    };
  }

  if (result.data.items.length === 0) {
    return { pass: false, score: 0, reason: "No items returned" };
  }

  return {
    pass: true,
    score: 1,
    reason: `Valid scan response with ${result.data.items.length} item(s)`,
  };
}
