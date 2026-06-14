import { NON_MEDICAL_DISCLAIMER } from "@/lib/disclaimer";

// TODO(ui): Onboarding confirm (Step 3/3) — "You're all set", show the
// non-medical disclaimer with an explicit "I understand" acknowledgement and an
// optional notifications opt-in. On "Start scanning" PATCH /api/profile to set
// onboarding_complete=true + disclaimer_accepted_at, then -> /home.
export default function OnboardingConfirmPage() {
  return (
    <main className="flex flex-1 flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Step 3 / 3
      </p>
      <h1 className="text-2xl font-black">You’re all set</h1>
      <p className="text-xs text-muted">{NON_MEDICAL_DISCLAIMER}</p>
      {/* PLACEHOLDER: disclaimer acknowledgement + notifications toggle + CTA. */}
    </main>
  );
}
