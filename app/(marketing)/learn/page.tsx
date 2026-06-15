import type { Metadata } from "next";
import Link from "next/link";
import { IcArrow, IcChevronLeft } from "@/components/icons";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { MarketingWrap } from "@/components/marketing/MarketingWrap";
import { ARTICLES, articlePath } from "@/lib/marketing/articles";
import { PRICING_CARDS_ENABLED } from "@/lib/featureFlags";

export const metadata: Metadata = {
  title: "The Swapple Guide — Learn to read any aisle",
  description:
    "Buying guides, cheat sheets, and label school from the Swapple editorial team.",
};

export default function LearnIndexPage() {
  return (
    <>
      <MarketingNav showPricing={PRICING_CARDS_ENABLED} />
      <main>
        <section className="ar-hero pb-16">
          <MarketingWrap>
            <Link href="/#articles" className="ar-back">
              <IcChevronLeft s={16} sw={2.2} />
              Back to home
            </Link>
            <span className="ar-tag">The Swapple Guide</span>
            <h1 className="ar-title">Learn to read any aisle like a pro</h1>
            <p className="ar-dek max-w-2xl">
              Buying guides, cheat sheets, and label school — independent,
              brand-free, and built for real grocery runs.
            </p>

            <div className="ar-rel-grid mt-12">
              {ARTICLES.map((article) => (
                <Link key={article.slug} href={articlePath(article.slug)} className="ar-rel-card">
                  <span className="ar-tag">{article.tag}</span>
                  <h4>{article.title}</h4>
                  <p>{article.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--grape)]">
                    Read article
                    <IcArrow s={16} sw={2.1} />
                  </span>
                </Link>
              ))}
            </div>
          </MarketingWrap>
        </section>
      </main>
      <MarketingFooter showPricing={PRICING_CARDS_ENABLED} />
    </>
  );
}
