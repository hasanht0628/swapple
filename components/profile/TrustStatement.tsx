export function TrustStatement() {
  return (
    <section className="bg-surface rounded-2xl p-6 border border-border shadow-card">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-lg">🛡️</span>
          </div>
          <h2 className="font-semibold">About Swapple</h2>
        </div>

        <div className="space-y-3 text-sm">
          <p className="leading-relaxed">
            We never accept payment from brands. Your subscription is the only thing 
            that funds our rankings — so they answer to you.
          </p>
          
          <p className="text-muted leading-relaxed">
            Swapple provides nutritional food guidance only. This is not medical advice 
            and is not intended to diagnose, treat, cure, or prevent any disease or 
            health condition. Always consult a qualified healthcare professional before 
            making dietary changes related to a medical condition.
          </p>
        </div>
      </div>
    </section>
  );
}