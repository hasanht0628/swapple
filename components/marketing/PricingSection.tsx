import Link from "next/link";

export function PricingSection() {
  return (
    <section className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Simple, transparent pricing</h2>
        <p className="text-muted">Start free, upgrade for unlimited brand recommendations</p>
      </div>

      <div className="space-y-4">
        {/* Free Plan */}
        <div className="bg-surface rounded-2xl p-6 shadow-card">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Free</h3>
              <p className="text-2xl font-bold">$0</p>
            </div>
            <ul className="space-y-2 text-sm text-muted">
              <li>✓ Unlimited scans</li>
              <li>✓ Basic verdicts (good/caution/avoid)</li>
              <li>✓ Full detail on good items</li>
              <li>✓ Save and track swaps</li>
            </ul>
          </div>
        </div>

        {/* Swapple Plus */}
        <div className="bg-primary rounded-2xl p-6 shadow-card text-primary-foreground relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
              RECOMMENDED
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Swapple Plus</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">$9</p>
                <span className="text-sm opacity-90">per month</span>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li>✓ Everything in Free</li>
              <li>✓ Detailed analysis on all items</li>
              <li>✓ Ranked brand recommendations</li>
              <li>✓ Priority tradeoff insights</li>
            </ul>
            <Link
              href="/sign-in"
              className="block w-full rounded-xl bg-white/20 backdrop-blur py-3 text-center font-semibold transition-colors hover:bg-white/30"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}