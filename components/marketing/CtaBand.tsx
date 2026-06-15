import Link from "next/link";
import { MarketingWrap } from "./MarketingWrap";

export function CtaBand() {
  return (
    <section className="lp-cta" id="get">
      <MarketingWrap className="lp-cta-in">
        <h2>
          Shop like you&apos;ve got a
          <br />
          dietitian in your pocket.
        </h2>
        <p>Free to use on the web. Your first verdict is three seconds away.</p>
        <div className="lp-cta-btns">
          <Link href="/sign-in" className="lp-btn lp-btn-white lp-btn-lg">
            Get started
          </Link>
          <Link href="/sign-in" className="lp-btn lp-btn-cta-ghost lp-btn-lg">
            Sign in
          </Link>
        </div>
      </MarketingWrap>
    </section>
  );
}
