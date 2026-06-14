// TODO(ui): Onboarding priorities (Step 2/3) — 2-column grid of priority tiles
// from lib/priorities.ts with a live "N selected" counter (1-3). Persist via
// PATCH /api/profile, then -> /onboarding/confirm.
// See components/onboarding/PrioritySelector.tsx + PriorityTile.tsx.
export default function OnboardingPrioritiesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Step 2 / 3
      </p>
      <h1 className="text-2xl font-black">What should we watch for you?</h1>
      {/* PLACEHOLDER: PrioritySelector goes here. */}
    </main>
  );
}
