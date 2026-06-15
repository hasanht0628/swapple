export function TrustStatement() {
  return (
    <section className="sw-card p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-lg">
            🛡️
          </div>
          <h2 className="sw-h2">About Swapple</h2>
        </div>

        <div className="space-y-3 text-sm">
          <p className="leading-relaxed">
            We never accept payment from brands. Your subscription is the only thing that funds our
            rankings — so they answer to you.
          </p>

          <p className="leading-relaxed text-ink-2">
            Swapple provides nutritional food guidance only. This is not medical advice and is not
            intended to diagnose, treat, cure, or prevent any disease or health condition. Always
            consult a qualified healthcare professional before making dietary changes related to a
            medical condition.
          </p>
        </div>
      </div>
    </section>
  );
}
