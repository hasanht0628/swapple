"use client";

import { useState } from "react";
import { type BrandRecommendation } from "@/types/scan";
import { cn } from "@/lib/utils";

interface BrandRecommendationListProps {
  recommendations: BrandRecommendation[];
  itemId: string;
  scanId: string;
  initialSaved?: boolean;
  className?: string;
}

export function BrandRecommendationList({
  recommendations,
  itemId,
  scanId,
  initialSaved = false,
  className,
}: BrandRecommendationListProps) {
  const [savingIds, setSavingIds] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState(initialSaved);

  const handleSave = async (recommendation: BrandRecommendation) => {
    setSavingIds(prev => new Set(prev).add(recommendation.rank));

    try {
      const response = await fetch(`/api/scans/${scanId}/items/${itemId}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: recommendation.brand,
          product_name: recommendation.product_name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      const result = await response.json();
      setSaved(result.saved);
    } catch (error) {
      console.error("Save failed:", error);
      // You could add toast notifications for error here
    } finally {
      setSavingIds(prev => {
        const next = new Set(prev);
        next.delete(recommendation.rank);
        return next;
      });
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">
          Same item — {recommendations.length} ranked swaps you can save
        </h3>
        <p className="text-muted text-sm">
          Better options for your health priorities, ranked by our analysis
        </p>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const isSaving = savingIds.has(rec.rank);
          
          return (
            <div
              key={rec.rank}
              className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border"
            >
              {/* Rank badge */}
              <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm text-white font-bold">
                {rec.rank}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div>
                  <h4 className="font-medium">{rec.brand}</h4>
                  <p className="text-sm text-muted">{rec.product_name}</p>
                </div>

                <p className="text-sm text-foreground">
                  {rec.why_better}
                </p>

                {rec.tradeoffs && (
                  <p className="text-xs text-muted">
                    <span className="font-medium">Tradeoffs:</span> {rec.tradeoffs}
                  </p>
                )}
              </div>

              {/* Save button */}
              <button
                onClick={() => handleSave(rec)}
                disabled={isSaving || saved}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  saved
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isSaving ? "Saving..." : saved ? "✓ Saved" : "Save"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}