import Link from "next/link";
import { type ScanItemDTO } from "@/types/scan";
import { VerdictBadge } from "./VerdictBadge";
import { cn } from "@/lib/utils";

interface ScanItemCardProps {
  item: ScanItemDTO;
  scanId: string;
  className?: string;
  showLockHint?: boolean;
}

export function ScanItemCard({
  item,
  scanId,
  className,
  showLockHint = true,
}: ScanItemCardProps) {
  const showsLockTeaser = 
    showLockHint && 
    item.locked && 
    (item.verdict === "caution" || item.verdict === "avoid");

  return (
    <Link
      href={`/scans/${scanId}/items/${item.id}`}
      className={cn("block", className)}
    >
      <div className="flex items-center gap-4 p-4 bg-surface rounded-2xl border border-border hover:shadow-md transition-shadow">
        {/* Placeholder thumbnail */}
        <div className="flex-shrink-0 w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center text-muted text-xs">
          📦
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-medium truncate">
                {item.item_name}
              </h3>
              {item.brand_name && (
                <p className="text-sm text-muted truncate">
                  {item.brand_name}
                </p>
              )}
            </div>
            <VerdictBadge verdict={item.verdict} className="flex-shrink-0" />
          </div>

          <p className="text-sm text-muted line-clamp-2">
            {item.free_reason}
          </p>

          {showsLockTeaser && (
            <div className="flex items-center gap-1 text-xs text-primary">
              <span>🔒</span>
              <span>See better brands</span>
            </div>
          )}
        </div>

        {/* Chevron */}
        <div className="flex-shrink-0 text-muted">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}