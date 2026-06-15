import Link from "next/link";
import { IcChevron, IcLock } from "@/components/icons";
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
        <div className="flex-shrink-0 w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center text-muted text-xs">
          📦
        </div>

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
              <IcLock s={14} />
              <span>See better brands</span>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 text-muted">
          <IcChevron s={20} sw={2} />
        </div>
      </div>
    </Link>
  );
}
