import Link from "next/link";
import { NON_MEDICAL_DISCLAIMER } from "@/lib/disclaimer";

// TODO(ui): Public marketing landing page — hero ("Point. Scan. Swap up."),
// feature grid, pricing ($9/mo Swapple Plus), trust statement, sign-in CTA.
// See components/marketing/* and the plan's "Onboarding intro" / landing spec.
export default function MarketingPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-shell flex-col justify-center gap-6 p-6">
      <h1 className="text-3xl font-black tracking-tight">
        Swa<span className="text-primary">pp</span>le
      </h1>
      <p className="text-lg font-semibold">Point. Scan. Swap up.</p>
      <Link
        href="/sign-in"
        className="rounded-2xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground"
      >
        Get started
      </Link>
      <p className="text-xs text-muted">{NON_MEDICAL_DISCLAIMER}</p>
    </main>
  );
}
