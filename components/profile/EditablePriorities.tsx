"use client";

import { useState } from "react";
import { priorityLabel } from "@/lib/priorities";
import { PrioritySelector } from "../onboarding/PrioritySelector";

interface EditablePrioritiesProps {
  initialPriorities: string[];
  onSave: (priorities: string[]) => Promise<void>;
}

export function EditablePriorities({
  initialPriorities,
  onSave,
}: EditablePrioritiesProps) {
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
          <h2 className="font-semibold">Edit your priorities</h2>
          <button
            onClick={handleCancel}
            className="text-sm text-muted hover:text-foreground"
          >
            Cancel
          </button>
        </div>

        <PrioritySelector
          initialSelection={selectedPriorities}
          onSelectionChange={setSelectedPriorities}
        />

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving || selectedPriorities.length === 0}
            className="flex-1 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Your priorities</h2>
        <div className="flex items-center gap-3">
          {initialPriorities.length < 3 && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-primary hover:underline"
            >
              + Add
            </button>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-primary hover:underline"
          >
            Edit
          </button>
        </div>
      </div>

      {initialPriorities.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎯</div>
          <div className="space-y-2">
            <p className="font-medium text-muted">No priorities set</p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-primary hover:underline"
            >
              Add your first priority
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {initialPriorities.map((priorityId) => (
            <div
              key={priorityId}
              className="inline-flex items-center gap-2 px-3 py-2 bg-primary-soft rounded-full text-sm font-medium"
            >
              <span>{priorityLabel(priorityId)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}