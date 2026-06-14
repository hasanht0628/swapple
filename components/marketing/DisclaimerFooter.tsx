import { NON_MEDICAL_DISCLAIMER } from "@/lib/disclaimer";

export function DisclaimerFooter() {
  return (
    <footer className="mt-12 pt-8 border-t border-border">
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-muted mb-2">
            🛡️ We never accept payment from brands
          </p>
          <p className="text-xs text-muted leading-relaxed">
            Your subscription is the only thing that funds our rankings — so they answer to you.
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted leading-relaxed">
            {NON_MEDICAL_DISCLAIMER}
          </p>
        </div>
        
        <div className="text-center pt-4">
          <p className="text-xs text-muted">
            © 2026 Swapple. Made for better nutrition decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}