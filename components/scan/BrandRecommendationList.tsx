"use client";

import { useState } from "react";
import { type BrandRecommendation } from "@/types/scan";
import { cn } from "@/lib/utils";

interface BrandRecommendationListProps {
  recommendations: BrandRecommendation[];
  itemId: string;
  scanId: string;
  initialSavedRecommendationRank?: number | null;
  className?: string;
}

export function BrandRecommendationList({
  recommendations,
  itemId,
  scanId,
  initialSavedRecommendationRank = null,
  className,
}: BrandRecommendationListProps) {
  const [savingIds, setSavingIds] = useState<Set<number>>(new Set());
  const [savedRecommendationRank, setSavedRecommendationRank] = useState<number | null>(
    initialSavedRecommendationRank,
  );

  const handleSave = async (recommendation: BrandRecommendation) => {
    setSavingIds((prev) => new Set(prev).add(recommendation.rank));

    try {
      const response = await fetch(`/api/scans/${scanId}/items/${itemId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rank: recommendation.rank }),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      const result = await response.json();
      setSavedRecommendationRank(result.saved_recommendation_rank ?? null);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setSavingIds((prev) => {
        const next = new Set(prev);
        next.delete(recommendation.rank);
        return next;
      });
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <h3 className="sw-h2">Same item — {recommendations.length} ranked swaps you can save</h3>
        <p className="sw-sub text-sm">
          Better options for your health priorities, ranked by our analysis
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const isSaving = savingIds.has(rec.rank);
          const isSaved = savedRecommendationRank === rec.rank;

          return (
            <div
              key={rec.rank}
              className="sw-card flex items-start gap-4 p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {rec.rank}
              </div>

              <div className="min-w-0 flex-1 space-y-2">
                <div>
                  <h4 className="font-bold">{rec.brand}</h4>
                  <p className="text-sm text-ink-2">{rec.product_name}</p>
                </div>

                <p className="text-sm">{rec.why_better}</p>

                {rec.ingredients_source && (
                  <p className="text-xs text-muted">
                    {rec.ingredients_source === "web"
                      ? "Ingredients sourced from web lookup"
                      : rec.ingredients_source === "open_food_facts"
                        ? "Ingredients verified via Open Food Facts"
                        : "Ingredients verified via USDA"}
                  </p>
                )}

                {rec.tradeoffs && (
                  <p className="text-xs text-muted">
                    <span className="font-semibold">Tradeoffs:</span> {rec.tradeoffs}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleSave(rec)}
                disabled={isSaving || isSaved}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isSaved
                    ? "bg-verdict-good-soft text-verdict-good"
                    : "bg-primary text-primary-foreground hover:brightness-105",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                {isSaving ? "Saving..." : isSaved ? "✓ Saved" : "Save"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
