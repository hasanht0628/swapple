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
        <h2 className="font-semibold">Saved swaps</h2>
        <div className="text-center py-8 text-muted">
          <div className="text-4xl mb-4">📝</div>
          <div className="space-y-2">
            <p className="font-medium">No saved swaps yet</p>
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
      <h2 className="font-semibold">Saved swaps</h2>
      <div className="space-y-3">
        {savedSwaps.map((swap) => {
          const productName =
            swap.saved_recommendation?.product_name ?? swap.item_name;

          return (
            <div
              key={swap.id}
              className="bg-surface rounded-2xl p-4 shadow-card"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center text-muted text-xs">
                  📦
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{productName}</h3>
                  <p className="text-sm text-muted truncate">
                    was {swap.item_name}
                  </p>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                  <span>✓</span>
                  <span>{swap.swapped ? "Swapped" : "Saved"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
