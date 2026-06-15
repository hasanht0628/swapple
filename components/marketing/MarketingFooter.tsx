import Link from "next/link";
import { NON_MEDICAL_DISCLAIMER } from "@/lib/disclaimer";
import { MarketingWrap } from "./MarketingWrap";

interface MarketingFooterProps {
  showPricing?: boolean;
}

export function MarketingFooter({ showPricing = false }: MarketingFooterProps) {
  return (
    <footer className="lp-foot">
      <MarketingWrap>
        <div className="lp-foot-grid">
          <div>
            <Link href="/" className="lp-foot-logo">
              Swa<b>pp</b>le
            </Link>
            <p>
              The pocket food expert that answers to you — never to brands. Point,
              scan, swap up.
            </p>
          </div>

          <div>
            <h4>Product</h4>
            <ul>
              <li>
                <a href="/#how">How it works</a>
              </li>
              <li>
                <a href="/#verdicts">Verdicts</a>
              </li>
              {showPricing ? (
                <li>
                  <a href="/#pricing">Pricing</a>
                </li>
              ) : null}
              <li>
                <Link href="/sign-in">Get started</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Learn</h4>
            <ul>
              <li>
                <Link href="/learn">The Swapple Guide</Link>
              </li>
              <li>
                <Link href="/learn">Buying guides</Link>
              </li>
              <li>
                <Link href="/learn">Label school</Link>
              </li>
              <li>
                <Link href="/learn">Cheat sheets</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <span>Our pledge</span>
              </li>
              <li>
                <span>How we score</span>
              </li>
              <li>
                <span>Privacy</span>
              </li>
              <li>
                <span>Contact</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="lp-foot-disclaimer">{NON_MEDICAL_DISCLAIMER}</p>

        <div className="lp-foot-base">
          <span>© 2026 Swapple, Inc. Independent &amp; never paid by brands.</span>
          <span>Made for people who read the label.</span>
        </div>
      </MarketingWrap>
    </footer>
  );
}
