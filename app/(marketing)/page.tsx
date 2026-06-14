import { MobileShell } from "@/components/layout/MobileShell";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { PricingSection } from "@/components/marketing/PricingSection";
import { DisclaimerFooter } from "@/components/marketing/DisclaimerFooter";

export default function MarketingPage() {
  return (
    <MobileShell>
      <main className="flex min-h-dvh flex-col justify-center p-6 space-y-16">
        <HeroSection />
        <FeatureGrid />
        <PricingSection />
        <DisclaimerFooter />
      </main>
    </MobileShell>
  );
}
