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

      router.replace("/home");
      router.refresh();
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100dvh-36px)] flex-col py-6">
      <p className="sw-kicker mb-8 text-center text-primary">Step 3 / 3</p>

      <div className="flex flex-1 flex-col justify-center space-y-8">
        <div className="space-y-4 text-center">
          <div className="text-4xl">✨</div>
          <h1 className="sw-h1">You&apos;re all set!</h1>
          <p className="sw-sub">
            Ready to start making better food choices with personalized guidance.
          </p>
        </div>

        <div className="space-y-4">
          <div className="sw-card space-y-4 p-6">
            <h2 className="sw-h2">Before we start</h2>
            <p className="text-sm leading-relaxed text-ink-2">{NON_MEDICAL_DISCLAIMER}</p>

            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={disclaimerAccepted}
                onChange={(e) => setDisclaimerAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
              />
              <span className="text-sm font-semibold">I understand and agree to these terms</span>
            </label>
          </div>

          <div className="sw-card p-6">
            <label className="flex cursor-pointer items-center justify-between">
              <div className="space-y-1">
                <h3 className="sw-h2 text-base">Get notifications</h3>
                <p className="text-sm text-ink-2">
                  Updates about new features and nutrition tips
                </p>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          type="button"
          onClick={handleStartScanning}
          disabled={!disclaimerAccepted || isCompleting}
          className="sw-btn sw-btn-primary"
        >
          {isCompleting ? "Setting up..." : "Start scanning"}
        </button>
      </div>
    </main>
  );
}
