import { SYSTEM_PROMPT, buildAnalysisPrompt } from "@/lib/openai/prompts";
import type { EnrichedProductData } from "@/types/productData";

/**
 * Promptfoo prompt function for the Swapple pass-2 analysis call.
 *
 * It reuses the EXACT production prompt text (SYSTEM_PROMPT + buildAnalysisPrompt)
 * so evals stay in lockstep with what ships. Images are omitted here: this eval
 * targets the text-reasoning quality of the analysis pass using mock enriched
 * product data, which is deterministic and cheap to run.
 *
 * Each test case nests its inputs under a single `tc` object var. We do this on
 * purpose: promptfoo expands *top-level* array vars into a cartesian product of
 * test rows, which would split `priorities`/`items` into many bogus cases.
 * Nesting them inside one object keeps each case a single row.
 *
 * `tc` shape (see datasets/scanAnalysis.yaml):
 *   - priorities: string[]            user health priority ids (lib/priorities)
 *   - items: Array<{ item_name, brand_name?, barcode?, enriched? }>
 *   - expected_verdicts: string[]     consumed by the verdict assertion only
 */
export interface ScanTestCase {
  priorities?: string[];
  items?: Array<{
    item_name: string;
    brand_name?: string | null;
    barcode?: string | null;
    enriched?: EnrichedProductData;
  }>;
  expected_verdicts?: string[];
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export function scanAnalysisPrompt({
  vars,
}: {
  vars: { tc?: ScanTestCase };
}): ChatMessage[] {
  const tc = vars.tc ?? {};
  const priorities = Array.isArray(tc.priorities) ? tc.priorities : [];
  const items = tc.items ?? [];

  return [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: buildAnalysisPrompt({ priorities, items }) },
  ];
}
