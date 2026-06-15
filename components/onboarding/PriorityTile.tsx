import { cn } from "@/lib/utils";
import { type Priority } from "@/lib/priorities";
import { getPriorityIcon } from "@/lib/priorities/icons";
import { IcCheck } from "@/components/icons";

interface PriorityTileProps {
  priority: Priority;
  isSelected: boolean;
  onToggle: () => void;
}

export function PriorityTile({ priority, isSelected, onToggle }: PriorityTileProps) {
  const Icon = getPriorityIcon(priority.id);

  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full rounded-2xl border-2 p-4 text-left transition-all relative",
        "flex flex-col items-center gap-3 min-h-[120px] justify-center",
        isSelected
          ? "border-primary bg-primary text-primary-foreground shadow-lg"
          : "border-border bg-surface hover:border-primary/50 hover:shadow-md"
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white/20 rounded-full p-1">
          <IcCheck s={16} sw={2.6} />
        </div>
      )}

      <div className="flex items-center justify-center">
        {Icon ? <Icon s={28} /> : null}
      </div>

      <span className={cn(
        "font-medium text-sm text-center",
        isSelected ? "text-primary-foreground" : "text-foreground"
      )}>
        {priority.label}
      </span>
    </button>
  );
}
