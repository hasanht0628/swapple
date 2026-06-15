import { type BrandRecommendation } from "@/types/scan";

export interface SavedSwapItem {
  id: string;
  item_name: string;
  saved_recommendation: BrandRecommendation | null;
  swapped: boolean;
}

interface SavedSwapsListProps {
  savedSwaps: SavedSwapItem[];
}

export function SavedSwapsList({ savedSwaps }: SavedSwapsListProps) {
  if (savedSwaps.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="sw-h2">Saved swaps</h2>
        <div className="py-8 text-center text-muted">
          <div className="mb-4 text-4xl">📝</div>
          <div className="space-y-2">
            <p className="font-bold">No saved swaps yet</p>
            <p className="text-sm">
              When you save better alternatives from scan results, they&apos;ll appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="sw-h2">Saved swaps</h2>
      <div className="space-y-3">
        {savedSwaps.map((swap) => {
          const productName = swap.saved_recommendation?.product_name ?? swap.item_name;

          return (
            <div key={swap.id} className="sw-card p-4">
              <div className="sw-row !py-0">
                <div className="thumb sw-ph">
                  <span>Photo</span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-bold">{productName}</h3>
                  <p className="truncate text-sm text-ink-2">was {swap.item_name}</p>
                </div>

                <span className="sw-verdict v-good shrink-0">
                  <span className="dot">✓</span>
                  {swap.swapped ? "Swapped" : "Saved"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
