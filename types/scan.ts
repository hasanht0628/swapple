/**
 * App-level scan + OpenAI response contracts.
 * The OpenAI structured-output shape is mirrored in lib/openai/schema.ts as a
 * zod schema + JSON schema; keep the two in sync.
 */

export type Verdict = "good" | "caution" | "avoid";

export interface PriorityTradeoff {
  priority: string;
  impact: "positive" | "mixed" | "negative";
  explanation: string;
}

export interface BrandRecommendation {
  rank: number;
  brand: string;
  product_name: string;
  why_better: string;
  tradeoffs?: string | null;
}

/** Per-item shape returned by the OpenAI pass-2 analysis call. */
export interface OpenAIScanItem {
  item_name: string;
  brand_name?: string | null;
  verdict: Verdict;
  /** One-line, always visible to everyone. */
  free_reason: string;
  /** General nutrition principle, e.g. "Look for wild-caught". Always free. */
  general_principle: string;
  /** Full breakdown — free for `good`, paid for `caution`/`avoid`. */
  detailed_reason: string;
  priority_tradeoffs: PriorityTradeoff[];
  brand_recommendations: BrandRecommendation[];
  confidence: number;
}

export interface OpenAIScanResponse {
  items: OpenAIScanItem[];
  image_summary?: string;
  limitations?: string[];
}

/** A scan row joined with its persisted items, as returned by the API. */
export interface ScanItemDTO {
  id: string;
  item_name: string;
  brand_name?: string | null;
  verdict: Verdict;
  free_reason: string;
  general_principle: string;
  /** Present for `good` items always; omitted for caution/avoid on free tier. */
  detailed_reason?: string | null;
  priority_tradeoffs?: PriorityTradeoff[];
  brand_recommendations?: BrandRecommendation[];
  saved: boolean;
  swapped: boolean;
  /** true = the paid wall applies to this item for the current viewer. */
  locked: boolean;
}

export interface ScanDTO {
  id: string;
  image_url: string | null;
  status: "processing" | "completed" | "failed";
  item_count: number | null;
  created_at: string;
}

export interface CreateScanResponse {
  scan: ScanDTO;
  items: ScanItemDTO[];
}
