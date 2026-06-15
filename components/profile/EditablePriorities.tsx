"use client";

import { useState } from "react";
import { IcStar } from "@/components/icons";
import { priorityLabel } from "@/lib/priorities";
import { getPriorityIcon } from "@/lib/priorities/icons";
import { PrioritySelector } from "../onboarding/PrioritySelector";

interface EditablePrioritiesProps {
  initialPriorities: string[];
  onSave: (priorities: string[]) => Promise<void>;
}

export function EditablePriorities({ initialPriorities, onSave }: EditablePrioritiesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPriorities, setSelectedPriorities] = useState(initialPriorities);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(selectedPriorities);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save priorities:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setSelectedPriorities(initialPriorities);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="sw-h2">Edit your priorities</h2>
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm font-semibold text-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>

        <PrioritySelector
          initialSelection={selectedPriorities}
          onSelectionChange={setSelectedPriorities}
        />

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || selectedPriorities.length === 0}
          className="sw-btn sw-btn-primary disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="sw-h2">Your priorities</h2>
        <div className="flex items-center gap-3">
          {initialPriorities.length < 3 && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-sm font-semibold text-primary hover:underline"
            >
              + Add
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Edit
          </button>
        </div>
      </div>

      {initialPriorities.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mb-4 flex justify-center text-primary">
            <IcStar s={40} />
          </div>
          <div className="space-y-2">
            <p className="font-bold text-muted">No priorities set</p>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Add your first priority
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {initialPriorities.map((priorityId) => {
            const Icon = getPriorityIcon(priorityId);
            return (
              <span key={priorityId} className="sw-chip inline-flex items-center gap-1.5">
                {Icon ? <Icon s={14} /> : null}
                {priorityLabel(priorityId)}
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}
