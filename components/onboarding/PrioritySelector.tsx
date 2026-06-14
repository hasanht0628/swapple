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
      // Remove if already selected
      newSelection = selectedIds.filter((id) => id !== priorityId);
    } else {
      // Add if not selected and under max limit
      if (selectedIds.length < MAX_PRIORITIES) {
        newSelection = [...selectedIds, priorityId];
      } else {
        // At max limit, don't add
        return;
      }
    }

    setSelectedIds(newSelection);
    onSelectionChange(newSelection);
  };


  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">What should we watch for you?</h1>
          <p className="text-muted text-sm">
            Pick 1–3 priorities. Every verdict gets tuned to your goals.{" "}
            <span className="font-medium text-primary">
              {selectedIds.length} selected
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
        <div className="text-center">
          <p className="text-xs text-muted">
            Maximum {MAX_PRIORITIES} priorities selected. Deselect one to choose another.
          </p>
        </div>
      )}
    </div>
  );
}