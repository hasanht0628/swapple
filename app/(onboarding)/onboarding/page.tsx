import Link from "next/link";
import { NON_MEDICAL_DISCLAIMER } from "@/lib/disclaimer";
import { VerdictBadge } from "@/components/scan/VerdictBadge";

export default function OnboardingIntroPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 p-6 text-center">
      {/* Logo */}
      <h1 className="text-3xl font-black">
        Swa<span className="text-primary">pp</span>le
      </h1>
      
      {/* Hero illustration area with floating badges */}
      <div className="relative w-full max-w-xs h-64 bg-muted/10 rounded-2xl flex items-center justify-center">
        {/* Placeholder for app hero illustration */}
        <div className="text-6xl opacity-50">📱</div>
        
        {/* Floating verdict badges */}
        <div className="absolute top-4 left-4">
          <VerdictBadge verdict="good" />
        </div>
        <div className="absolute bottom-6 right-4">
          <VerdictBadge verdict="avoid" />
        </div>
        
        {/* Small "APP HERO ILLUSTRATION" label */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted uppercase tracking-wide">
          App Hero Illustration
        </div>
      </div>
      
      {/* Tagline and copy */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted">
          SWAP UP.
        </h2>
        <div className="space-y-2">
          <h3 className="text-2xl font-black">Point.</h3>
          <p className="text-lg text-muted">Scan. Swap up.</p>
        </div>
      </div>
      
      {/* CTA */}
      <Link
        href="/onboarding/priorities"
        className="rounded-2xl bg-primary px-8 py-4 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Get started
      </Link>
      
      {/* Disclaimer */}
      <p className="text-xs text-muted leading-relaxed max-w-sm">
        {NON_MEDICAL_DISCLAIMER}
      </p>
    </main>
  );
}