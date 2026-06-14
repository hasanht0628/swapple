import { type ScanItemDTO } from "@/types/scan";
import { cn } from "@/lib/utils";

interface VerdictSummaryPillsProps {
  items: ScanItemDTO[];
  className?: string;
}

interface VerdictCount {
  good: number;
  caution: number;
  avoid: number;
}

export function VerdictSummaryPills({ items, className }: VerdictSummaryPillsProps) {
  const counts = items.reduce<VerdictCount>(
    (acc, item) => {
      acc[item.verdict]++;
      return acc;
    },
    { good: 0, caution: 0, avoid: 0 }
  );

  const pills = [
    { verdict: "good", count: counts.good, color: "bg-verdict-good" },
    { verdict: "caution", count: counts.caution, color: "bg-verdict-caution" },
    { verdict: "avoid", count: counts.avoid, color: "bg-verdict-avoid" },
  ] as const;

  return (
    <div className={cn("flex gap-2", className)}>
      {pills.map(({ verdict, count, color }) => {
        if (count === 0) return null;
        
        return (
          <div
            key={verdict}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-white",
              color
            )}
          >
            <span>{count}</span>
            <span>{verdict}</span>
          </div>
        );
      })}
    </div>
  );
}