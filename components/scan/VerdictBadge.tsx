import { cn } from "@/lib/utils";
import { type Verdict } from "@/types/scan";

interface VerdictBadgeProps {
  verdict: Verdict;
  className?: string;
}

const VERDICT_CONFIG = {
  good: {
    className: "v-good",
    label: "Good",
    dot: "✓",
  },
  caution: {
    className: "v-caution",
    label: "Caution",
    dot: "!",
  },
  avoid: {
    className: "v-avoid",
    label: "Avoid",
    dot: "×",
  },
} as const;

export function VerdictBadge({ verdict, className }: VerdictBadgeProps) {
  const config = VERDICT_CONFIG[verdict];

  return (
    <div className={cn("sw-verdict", config.className, className)}>
      <span className="dot">{config.dot}</span>
      {config.label}
    </div>
  );
}
