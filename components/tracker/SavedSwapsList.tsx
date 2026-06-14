"use client";

import { useState, useEffect } from "react";
import { type ScanItemDTO } from "@/types/scan";

interface SavedSwap extends ScanItemDTO {
  scan_id: string;
  original_product?: string;
}

export function SavedSwapsList() {
  const [savedSwaps, setSavedSwaps] = useState<SavedSwap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedSwaps() {
      try {
        // In a real app, this would be a dedicated endpoint for saved items
        // For now, we'll show placeholder data
        setIsLoading(false);
        // Placeholder - empty for now
        setSavedSwaps([]);
      } catch (error) {
        console.error("Failed to fetch saved swaps:", error);
        setIsLoading(false);
      }
    }

    fetchSavedSwaps();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="font-semibold">Saved swaps</h2>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface rounded-2xl p-4 shadow-card animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted/20 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted/20 rounded w-3/4" />
                  <div className="h-3 bg-muted/20 rounded w-1/2" />
                </div>
                <div className="w-16 h-6 bg-muted/20 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
        {savedSwaps.map((swap) => (
          <div
            key={swap.id}
            className="bg-surface rounded-2xl p-4 shadow-card"
          >
            <div className="flex items-center gap-4">
              {/* Placeholder thumbnail */}
              <div className="flex-shrink-0 w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center text-muted text-xs">
                📦
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">
                  {swap.item_name}
                </h3>
                {swap.brand_name && (
                  <p className="text-sm text-muted truncate">
                    {swap.brand_name}
                  </p>
                )}
                {swap.original_product && (
                  <p className="text-xs text-muted">
                    was {swap.original_product}
                  </p>
                )}
              </div>

              {/* Status badge */}
              {swap.swapped ? (
                <div className="flex items-center gap-1 px-2 py-1 bg-verdict-good-soft text-verdict-good text-xs font-medium rounded-full">
                  <span>✓</span>
                  <span>Swapped</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 bg-muted/20 text-muted text-xs font-medium rounded-full">
                  <span>📌</span>
                  <span>Saved</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}