"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { NON_MEDICAL_DISCLAIMER } from "@/lib/disclaimer";

export default function OnboardingConfirmPage() {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  const handleStartScanning = async () => {
    if (!disclaimerAccepted) return;

    setIsCompleting(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          onboarding_complete: true,
          disclaimer_accepted: true,
          notifications_enabled: notificationsEnabled,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete onboarding");
      }

      // Invalidate the client router cache so middleware re-evaluates against
      // the now-completed profile, then leave the onboarding flow for good.
      router.replace("/home");
      router.refresh();
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <main className="flex min-h-dvh flex-col p-6">
      {/* Step indicator */}
      <div className="mb-8 text-center">
        <p className="text-sm text-primary font-medium uppercase tracking-wide">
          Step 3 / 3
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        {/* Success message */}
        <div className="text-center space-y-4">
          <div className="text-4xl">✨</div>
          <h1 className="text-2xl font-bold">You&apos;re all set!</h1>
          <p className="text-muted">
            Ready to start making better food choices with personalized guidance.
          </p>
        </div>

        {/* Disclaimer acceptance */}
        <div className="space-y-4">
          <div className="bg-surface rounded-2xl p-6 border border-border space-y-4">
            <h2 className="font-semibold">Before we start</h2>
            <p className="text-sm text-muted leading-relaxed">
              {NON_MEDICAL_DISCLAIMER}
            </p>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={disclaimerAccepted}
                onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary bg-surface border-border rounded focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-sm font-medium">
                I understand and agree to these terms
              </span>
            </label>
          </div>

          {/* Optional notifications */}
          <div className="bg-surface rounded-2xl p-6 border border-border">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="space-y-1">
                <h3 className="font-semibold">Get notifications</h3>
                <p className="text-sm text-muted">
                  Updates about new features and nutrition tips
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Start button */}
      <div className="pt-6">
        <button
          onClick={handleStartScanning}
          disabled={!disclaimerAccepted || isCompleting}
          className="w-full rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCompleting ? "Setting up..." : "Start scanning"}
        </button>
      </div>
    </main>
  );
}