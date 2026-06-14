"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrioritySelector } from "@/components/onboarding/PrioritySelector";

export default function OnboardingPrioritiesPage() {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (selectedPriorities.length === 0) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priorities: selectedPriorities }),
      });

      if (!response.ok) {
        throw new Error("Failed to save priorities");
      }

      router.push("/onboarding/confirm");
    } catch (error) {
      console.error("Error saving priorities:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const canContinue = selectedPriorities.length >= 1 && selectedPriorities.length <= 3;

  return (
    <main className="flex min-h-dvh flex-col p-6">
      {/* Step indicator */}
      <div className="mb-8 text-center">
        <p className="text-sm text-primary font-medium uppercase tracking-wide">
          Step 2 / 3
        </p>
      </div>

      {/* Priority selector */}
      <div className="flex-1 flex flex-col justify-center">
        <PrioritySelector
          onSelectionChange={setSelectedPriorities}
        />
      </div>

      {/* Continue button */}
      <div className="pt-6">
        <button
          onClick={handleContinue}
          disabled={!canContinue || isSaving}
          className="w-full rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Saving..." : "Continue"}
        </button>
      </div>
    </main>
  );
}