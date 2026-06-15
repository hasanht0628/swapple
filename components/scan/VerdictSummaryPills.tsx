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

const PILL_CONFIG = {
  good: { className: "v-good", dot: "✓" },
  caution: { className: "v-caution", dot: "!" },
  avoid: { className: "v-avoid", dot: "×" },
} as const;

export function VerdictSummaryPills({ items, className }: VerdictSummaryPillsProps) {
  const counts = items.reduce<VerdictCount>(
    (acc, item) => {
      acc[item.verdict]++;
      return acc;
    },
    { good: 0, caution: 0, avoid: 0 },
  );

  const pills = [
    { verdict: "good" as const, count: counts.good },
    { verdict: "caution" as const, count: counts.caution },
    { verdict: "avoid" as const, count: counts.avoid },
  ];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {pills.map(({ verdict, count }) => {
        if (count === 0) return null;
        const config = PILL_CONFIG[verdict];

        return (
          <div key={verdict} className={cn("sw-verdict", config.className)}>
            <span className="dot">{config.dot}</span>
            {count} {verdict}
          </div>
        );
      })}
    </div>
  );
}
