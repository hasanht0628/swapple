import { cn } from "@/lib/utils";
import { type Priority } from "@/lib/priorities";

interface PriorityTileProps {
  priority: Priority;
  isSelected: boolean;
  onToggle: () => void;
}

// Simple icon mapping for the priorities
const PRIORITY_ICONS = {
  heart: "💜",
  droplet: "🩸", 
  sprout: "🌱",
  flame: "🔥",
  "venus-and-mars": "⚖️",
  scale: "⚖️",
  leaf: "🌿",
} as const;

export function PriorityTile({ priority, isSelected, onToggle }: PriorityTileProps) {
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
      {/* Checkmark for selected state */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white/20 rounded-full p-1">
          <svg
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      
      {/* Icon */}
      <div className="text-2xl">
        {PRIORITY_ICONS[priority.icon as keyof typeof PRIORITY_ICONS] || "📊"}
      </div>
      
      {/* Label */}
      <span className={cn(
        "font-medium text-sm text-center",
        isSelected ? "text-primary-foreground" : "text-foreground"
      )}>
        {priority.label}
      </span>
    </button>
  );
}