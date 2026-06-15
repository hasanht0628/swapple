import Link from "next/link";
import { IcCheck } from "@/components/icons";
import { MarketingWrap } from "./MarketingWrap";

export function PricingSection() {
  return (
    <section id="pricing" className="marketing-section bg-surface">
      <MarketingWrap>
        <div className="mx-auto max-w-2xl text-center">
          <span className="marketing-eyebrow">Pricing</span>
          <h2 className="marketing-display mt-3.5 text-[clamp(1.875rem,4vw,2.75rem)]">
            Verdicts are free.
            <br />
            Forever.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Upgrade only when you want the ranked brand swaps. No ads, no sponsored
            results, either way.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-background p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">Free</p>
            <p className="marketing-display mt-2 text-5xl">$0</p>
            <p className="mt-1 text-sm text-muted">Everything you need to shop smarter</p>
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <IcCheck s={19} sw={2.3} className="shrink-0" />
                Unlimited scans &amp; verdicts
              </li>
              <li className="flex items-start gap-2.5">
                <IcCheck s={19} sw={2.3} className="shrink-0" />
                Personalized to your goals
              </li>
              <li className="flex items-start gap-2.5">
                <IcCheck s={19} sw={2.3} className="shrink-0" />
                Full Swapple Guide library
              </li>
            </ul>
            <Link
              href="/sign-in"
              className="mt-8 flex w-full items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold transition-colors hover:bg-background"
            >
              Get started
            </Link>
          </div>

          <div className="relative rounded-3xl bg-primary p-8 text-primary-foreground shadow-[0_20px_50px_rgba(124,58,237,0.25)]">
            <span className="absolute right-6 top-6 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              Most popular
            </span>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-90">Plus</p>
            <p className="marketing-display mt-2 text-5xl">
              $9<small className="text-lg font-semibold opacity-80"> / month</small>
            </p>
            <p className="mt-1 text-sm opacity-80">For people who want the better swap</p>
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <IcCheck s={19} sw={2.3} className="shrink-0" />
                Everything in Free
              </li>
              <li className="flex items-start gap-2.5">
                <IcCheck s={19} sw={2.3} className="shrink-0" />
                Ranked brand swaps for every item
              </li>
              <li className="flex items-start gap-2.5">
                <IcCheck s={19} sw={2.3} className="shrink-0" />
                Pantry score &amp; swap tracker
              </li>
              <li className="flex items-start gap-2.5">
                <IcCheck s={19} sw={2.3} className="shrink-0" />
                Cancel anytime
              </li>
            </ul>
            <Link
              href="/sign-in"
              className="mt-8 flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/90"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </MarketingWrap>
    </section>
  );
}
