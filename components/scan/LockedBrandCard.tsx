import Link from "next/link";
import { IcLock, IcShield } from "@/components/icons";

interface LockedBrandCardProps {
  verdictType: "caution" | "avoid";
  brandCount?: number;
}

export function LockedBrandCard({
  verdictType,
  brandCount = 3,
}: LockedBrandCardProps) {
  const trustStatement = "We never accept payment from brands. Your subscription is the only thing that funds our rankings — so they answer to you.";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface border border-border p-6 space-y-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-surface backdrop-blur-sm" />

      <div className="relative z-10 flex justify-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <IcLock s={24} />
        </div>
      </div>

      <div className="relative z-10 text-center space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">
            Top-ranked brands for your goals
          </h3>
          <p className="text-muted text-sm">
            See the {brandCount} {verdictType === "avoid" ? "alternatives" : "better picks"} ranked for your health priorities
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/profile"
            className="block w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Upgrade to Swapple Plus
          </Link>

          <p className="flex items-start justify-center gap-1.5 text-xs text-muted leading-relaxed">
            <IcShield s={14} className="mt-0.5 shrink-0" />
            {trustStatement}
          </p>
        </div>
      </div>

      <div className="absolute top-6 left-6 right-6 space-y-3 opacity-30">
        {Array.from({ length: brandCount }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-border">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white font-bold">
              {i + 1}
            </div>
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-muted rounded" />
              <div className="h-3 bg-muted/50 rounded w-3/4" />
            </div>
            <div className="w-16 h-8 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
