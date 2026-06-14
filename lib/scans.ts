import { isItemLocked } from "@/lib/verdicts";
import type { SubscriptionStatus, ScanItemRow, ScanRow } from "@/types/database";
import type {
  ScanItemDTO,
  ScanDTO,
  PriorityTradeoff,
  BrandRecommendation,
} from "@/types/scan";

/**
 * Serializes a persisted scan_item row into the client DTO, applying gating:
 *  - `good` items: always include detail fields.
 *  - `caution`/`avoid`: include detail fields only for paid users; otherwise
 *    omit detailed_reason / priority_tradeoffs / brand_recommendations.
 */
export function serializeScanItem(
  row: ScanItemRow,
  status: SubscriptionStatus,
): ScanItemDTO {
  const locked = isItemLocked(row.verdict, status);

  const base: ScanItemDTO = {
    id: row.id,
    item_name: row.item_name,
    brand_name: row.brand_name,
    verdict: row.verdict,
    free_reason: row.free_reason,
    general_principle: row.general_principle,
    saved: row.saved,
    swapped: row.swapped,
    locked,
  };

  if (locked) return base;

  return {
    ...base,
    detailed_reason: row.detailed_reason,
    priority_tradeoffs: (row.priority_tradeoffs as PriorityTradeoff[]) ?? [],
    brand_recommendations:
      (row.brand_recommendations as BrandRecommendation[]) ?? [],
  };
}

export function serializeScan(row: ScanRow): ScanDTO {
  return {
    id: row.id,
    image_url: row.image_url,
    status: row.status,
    item_count: row.item_count,
    created_at: row.created_at,
  };
}
