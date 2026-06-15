import Link from "next/link";
import { MarketingWrap } from "./MarketingWrap";

interface MarketingNavProps {
  showPricing?: boolean;
}

export function MarketingNav({ showPricing = false }: MarketingNavProps) {
  return (
    <header className="lp-nav">
      <MarketingWrap className="lp-nav-in">
        <Link href="/" className="lp-logo">
          Swa<b>pp</b>le
        </Link>

        <nav className="lp-nav-links">
          <a href="/#how">How it works</a>
          <a href="/#verdicts">Verdicts</a>
          <Link href="/learn">Learn</Link>
          {showPricing ? <a href="/#pricing">Pricing</a> : null}
        </nav>

        <div className="lp-nav-cta">
          <Link href="/sign-in" className="lp-btn lp-btn-ghost">
            Sign in
          </Link>
          <Link href="/sign-in" className="lp-btn lp-btn-primary text-primary-foreground">
            Get started
          </Link>
        </div>
      </MarketingWrap>
    </header>
  );
}
