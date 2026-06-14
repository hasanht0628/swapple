import Link from "next/link";

// TODO(ui): Onboarding intro (Step 1/3) — hero illustration with floating
// GOOD/AVOID badges, "SWAP UP." tagline, "Point. Scan. Swap up." copy, and a
// "Get started" CTA -> /onboarding/priorities. Include disclaimer subtext.
export default function OnboardingIntroPage() {
  return (
    <main className="flex flex-1 flex-col justify-between gap-6">
      <h1 className="text-3xl font-black">Point. Scan. Swap up.</h1>
      <Link
        href="/onboarding/priorities"
        className="rounded-2xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground"
      >
        Get started
      </Link>
    </main>
  );
}
