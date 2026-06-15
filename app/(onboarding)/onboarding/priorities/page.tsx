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
    <main className="flex min-h-[calc(100dvh-36px)] flex-col py-6">
      <p className="sw-kicker mb-8 text-center text-primary">Step 2 / 3</p>

      <div className="flex flex-1 flex-col justify-center">
        <PrioritySelector onSelectionChange={setSelectedPriorities} />
      </div>

      <div className="pt-6">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue || isSaving}
          className="sw-btn sw-btn-primary"
        >
          {isSaving ? "Saving..." : "Continue"}
        </button>
      </div>
    </main>
  );
}
