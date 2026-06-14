import Link from "next/link";

export function PricingSection() {
  return (
    <section className="space-y-8 lg:space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-2xl lg:text-4xl font-bold">Simple, transparent pricing</h2>
        <p className="text-muted lg:text-lg">Start free, upgrade for unlimited brand recommendations</p>
      </div>

      <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 lg:max-w-4xl lg:mx-auto">
        {/* Free Plan */}
        <div className="bg-surface rounded-2xl p-6 lg:p-8 shadow-card">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl lg:text-2xl">Free</h3>
              <p className="text-3xl lg:text-4xl font-bold">$0</p>
            </div>
            <ul className="space-y-3 text-sm lg:text-base text-muted">
              <li>✓ Unlimited scans</li>
              <li>✓ Basic verdicts (good/caution/avoid)</li>
              <li>✓ Full detail on good items</li>
              <li>✓ Save and track swaps</li>
            </ul>
          </div>
        </div>

        {/* Swapple Plus */}
        <div className="bg-primary rounded-2xl p-6 lg:p-8 shadow-card text-primary-foreground relative overflow-hidden">
          <div className="absolute top-6 right-6">
            <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
              RECOMMENDED
            </span>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl lg:text-2xl">Swapple Plus</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl lg:text-5xl font-bold">$9</p>
                <span className="text-sm lg:text-base opacity-90">per month</span>
              </div>
            </div>
            <ul className="space-y-3 text-sm lg:text-base">
              <li>✓ Everything in Free</li>
              <li>✓ Detailed analysis on all items</li>
              <li>✓ Ranked brand recommendations</li>
              <li>✓ Priority tradeoff insights</li>
            </ul>
            <Link
              href="/sign-in"
              className="block w-full rounded-xl bg-white/20 backdrop-blur py-3 lg:py-4 text-center font-semibold transition-colors hover:bg-white/30"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}