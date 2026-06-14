import { ResponsiveShell } from "@/components/layout/ResponsiveShell";
import { HeroSection } from "@/components/marketing/HeroSection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { PricingSection } from "@/components/marketing/PricingSection";
import { DisclaimerFooter } from "@/components/marketing/DisclaimerFooter";

export default function MarketingPage() {
  return (
    <ResponsiveShell variant="marketing">
      <main className="flex min-h-dvh flex-col justify-center p-6 lg:px-8 space-y-16 lg:space-y-24">
        <HeroSection />
        <FeatureGrid />
        <PricingSection />
        <DisclaimerFooter />
      </main>
    </ResponsiveShell>
  );
}
