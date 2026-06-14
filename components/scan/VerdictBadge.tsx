import { cn } from "@/lib/utils";
import { type Verdict } from "@/types/scan";

interface VerdictBadgeProps {
  verdict: Verdict;
  className?: string;
}

const VERDICT_CONFIG = {
  good: {
    className: "bg-verdict-good text-white",
    label: "GOOD",
    icon: null,
  },
  caution: {
    className: "bg-verdict-caution text-white",
    label: "CAUTION", 
    icon: "⚠️",
  },
  avoid: {
    className: "bg-verdict-avoid text-white",
    label: "AVOID",
    icon: "⊖",
  },
} as const;

export function VerdictBadge({ verdict, className }: VerdictBadgeProps) {
  const config = VERDICT_CONFIG[verdict];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        config.className,
        className
      )}
    >
      {config.icon && <span className="text-sm">{config.icon}</span>}
      {config.label}
    </div>
  );
}