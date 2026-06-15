import Link from "next/link";
import {
  IcBolt,
  IcCheck,
  IcHeart,
  IcGut,
  IcShield,
} from "@/components/icons";
import {
  IOSDevice,
  IOS_DEVICE_WIDTH,
  IOS_DEVICE_HEIGHT,
} from "@/components/ios";
import { MarketingWrap } from "./MarketingWrap";

const PHONE_SCALE = 235 / IOS_DEVICE_WIDTH;

function PhoneMockup() {
  return (
    <div className="lp-phone-stage">
      <div
        className="lp-blob"
        style={{
          width: 240,
          height: 240,
          background: "oklch(0.85 0.09 312 / .55)",
          top: 40,
          right: 10,
        }}
        aria-hidden
      />
      <div
        className="lp-blob"
        style={{
          width: 200,
          height: 200,
          background: "oklch(0.88 0.08 150 / .5)",
          bottom: 30,
          left: 0,
        }}
        aria-hidden
      />

      <div
        className="lp-phone-ios"
        style={{
          width: IOS_DEVICE_WIDTH * PHONE_SCALE,
          height: IOS_DEVICE_HEIGHT * PHONE_SCALE,
        }}
      >
        <div
          className="lp-phone-ios-scale"
          style={{
            width: IOS_DEVICE_WIDTH,
            height: IOS_DEVICE_HEIGHT,
            transform: `scale(${PHONE_SCALE})`,
            transformOrigin: "top left",
          }}
        >
          <IOSDevice style={{ background: "var(--cream)" }}>
            <div className="lp-phone-content">
              <div className="lp-phone-top">
                <div className="sw-kicker lp-phone-kicker">Tuesday · June 14</div>
                <div className="sw-h1 lp-phone-greeting">Hi, Maya 👋</div>
                <div className="lp-phone-chips">
                  <span className="sw-chip">
                    <IcHeart s={16} stroke="var(--grape)" />
                    Heart health
                  </span>
                  <span className="sw-chip">
                    <IcGut s={16} stroke="var(--grape)" />
                    Gut health
                  </span>
                </div>
              </div>
              <div className="lp-phone-scan-area">
                <div className="lp-phone-scan-btn">
                  <IcBolt s={46} stroke="#fff" sw={1.6} />
                  <div className="lp-phone-scan-label">Scan</div>
                </div>
                <div className="sw-muted lp-phone-scan-hint">
                  Point at any product or your cart
                </div>
              </div>
            </div>
          </IOSDevice>
        </div>
      </div>

      <div
        className="lp-float"
        style={{ top: 55, left: -10, transform: "rotate(-4deg)" }}
        aria-hidden
      >
        <div className="em" style={{ background: "var(--good-bg)", color: "var(--good)" }}>
          <IcCheck s={20} sw={2.4} />
        </div>
        <div>
          <div className="t1">Greek yogurt</div>
          <div className="t2">Good · high protein</div>
        </div>
      </div>

      <div
        className="lp-float"
        style={{ bottom: 45, right: -12, transform: "rotate(4deg)" }}
        aria-hidden
      >
        <div className="em" style={{ background: "var(--avoid-bg)", color: "var(--avoid)" }}>
          <span
            style={{
              display: "block",
              width: 10,
              height: 2.5,
              background: "currentColor",
              borderRadius: 2,
            }}
          />
        </div>
        <div>
          <div className="t1">Honey-oat cereal</div>
          <div className="t2">Avoid · 18g added sugar</div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="lp-hero">
      <MarketingWrap className="lp-hero-grid">
        <div>
          <span className="lp-eyebrow">Your pocket food expert</span>
          <h1 className="lp-display">
            Point. Scan.
            <br />
            <span className="pop">Swap up.</span>
          </h1>
          <p className="lp-hero-sub">
            Snap any product, shelf, or full cart and get an instant buy-or-avoid
            verdict tuned to <em>your</em> health goals — plus a better swap when
            you need one.
          </p>

          <div className="lp-hero-cta">
            <Link
              href="/sign-in"
              className="lp-btn lp-btn-primary lp-btn-lg text-primary-foreground"
            >
              Get started
            </Link>
            <Link href="/sign-in" className="lp-btn lp-btn-ghost lp-btn-lg">
              Sign in
            </Link>
          </div>

          <div className="lp-hero-chips">
            <span className="sw-verdict v-good">
              <span className="dot">
                <IcCheck s={11} stroke="#fff" />
              </span>
              Good
            </span>
            <span className="sw-verdict v-caution">
              <span className="dot">
                <b style={{ fontSize: 12, lineHeight: 1, color: "#fff" }}>!</b>
              </span>
              Caution
            </span>
            <span className="sw-verdict v-avoid">
              <span className="dot">
                <span
                  style={{
                    display: "block",
                    width: 8,
                    height: 2,
                    background: "#fff",
                    borderRadius: 2,
                  }}
                />
              </span>
              Avoid
            </span>
          </div>

          <div className="lp-hero-note">
            <IcShield s={17} />
            Independent &amp; ad-free — we&apos;re paid by you, never by brands.
          </div>
        </div>

        <PhoneMockup />
      </MarketingWrap>
    </section>
  );
}
