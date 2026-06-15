import { MarketingNav } from "@/components/marketing/MarketingNav";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { VerdictSystemSection } from "@/components/marketing/VerdictSystemSection";
import { PersonalizationSection } from "@/components/marketing/PersonalizationSection";
import { ArticlesSection } from "@/components/marketing/ArticlesSection";
import { PricingSection } from "@/components/marketing/PricingSection";
import { CtaBand } from "@/components/marketing/CtaBand";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { PRICING_CARDS_ENABLED } from "@/lib/featureFlags";

export default function MarketingPage() {
  return (
    <>
      <MarketingNav showPricing={PRICING_CARDS_ENABLED} />
      <main id="top">
        <HeroSection />
        <HowItWorksSection />
        <VerdictSystemSection />
        <PersonalizationSection />
        <ArticlesSection />
        {PRICING_CARDS_ENABLED ? <PricingSection /> : null}
        <CtaBand />
      </main>
      <MarketingFooter showPricing={PRICING_CARDS_ENABLED} />
    </>
  );
}
