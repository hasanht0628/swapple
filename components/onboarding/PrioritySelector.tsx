"use client";

import { useState } from "react";
import { PRIORITIES, MAX_PRIORITIES } from "@/lib/priorities";
import { PriorityTile } from "./PriorityTile";
import { cn } from "@/lib/utils";

interface PrioritySelectorProps {
  initialSelection?: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  className?: string;
}

export function PrioritySelector({
  initialSelection = [],
  onSelectionChange,
  className,
}: PrioritySelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelection);

  const handleToggle = (priorityId: string) => {
    let newSelection: string[];

    if (selectedIds.includes(priorityId)) {
      newSelection = selectedIds.filter((id) => id !== priorityId);
    } else {
      if (selectedIds.length < MAX_PRIORITIES) {
        newSelection = [...selectedIds, priorityId];
      } else {
        return;
      }
    }

    setSelectedIds(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="sw-h1">What should we watch for you?</h1>
          <p className="sw-sub mx-auto max-w-2xl text-sm">
            Pick 1–3 priorities. Every verdict gets tuned to your goals.{" "}
            <span className="font-semibold text-primary">{selectedIds.length} selected</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {PRIORITIES.map((priority) => (
            <PriorityTile
              key={priority.id}
              priority={priority}
              isSelected={selectedIds.includes(priority.id)}
              onToggle={() => handleToggle(priority.id)}
            />
          ))}
        </div>
      </div>

      {selectedIds.length === MAX_PRIORITIES && (
        <p className="text-center text-xs text-muted">
          Maximum {MAX_PRIORITIES} priorities selected. Deselect one to choose another.
        </p>
      )}
    </div>
  );
}
