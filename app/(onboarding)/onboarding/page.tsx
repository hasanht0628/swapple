import Link from "next/link";
import { NON_MEDICAL_DISCLAIMER } from "@/lib/disclaimer";
import { VerdictBadge } from "@/components/scan/VerdictBadge";

export default function OnboardingIntroPage() {
  return (
    <main className="flex min-h-[calc(100dvh-36px)] flex-col items-center justify-center gap-8 py-8 text-center">
      <h1 className="sw-h1">
        <Link href="/home" className="hover:opacity-80">
          Swa<span className="text-primary">pp</span>le
        </Link>
      </h1>

      <div className="sw-ph relative h-64 w-full max-w-xs">
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-40">
          📱
        </div>
        <div className="absolute top-4 left-4">
          <VerdictBadge verdict="good" />
        </div>
        <div className="absolute right-4 bottom-6">
          <VerdictBadge verdict="avoid" />
        </div>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2">App Hero Illustration</span>
      </div>

      <div className="space-y-4">
        <p className="sw-kicker text-primary">Swap up.</p>
        <div className="space-y-1">
          <h2 className="sw-h1">Point.</h2>
          <p className="font-display text-lg text-ink-2">Scan. Swap up.</p>
        </div>
      </div>

      <Link href="/onboarding/priorities" className="sw-btn sw-btn-primary !w-auto px-10">
        Get started
      </Link>

      <p className="max-w-sm text-xs leading-relaxed text-muted">{NON_MEDICAL_DISCLAIMER}</p>
    </main>
  );
}
