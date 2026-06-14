"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NotificationsToggleProps {
  initialEnabled: boolean;
  onToggle: (enabled: boolean) => Promise<void>;
}

export function NotificationsToggle({
  initialEnabled,
  onToggle,
}: NotificationsToggleProps) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    const newValue = !enabled;
    
    try {
      await onToggle(newValue);
      setEnabled(newValue);
    } catch (error) {
      console.error("Failed to update notifications:", error);
      // Revert on error
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="bg-surface rounded-2xl p-6 border border-border shadow-card">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="font-semibold">Notifications</h2>
          <p className="text-muted text-sm">
            Get updates about new features and tips
          </p>
        </div>

        <button
          onClick={handleToggle}
          disabled={isUpdating}
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
            enabled ? "bg-primary" : "bg-muted"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
              enabled ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>
    </section>
  );
}