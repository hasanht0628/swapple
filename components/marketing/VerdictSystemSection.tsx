import { IcCheck } from "@/components/icons";
import { MarketingWrap } from "./MarketingWrap";

const VERDICTS = [
  {
    variant: "good" as const,
    title: "Good",
    description:
      "A genuinely solid pick for your goals. Toss it in the cart without a second thought.",
    icon: <IcCheck s={26} stroke="#fff" sw={2.4} />,
  },
  {
    variant: "caution" as const,
    title: "Caution",
    description:
      "Fine once in a while, but there's a catch worth knowing — and usually a cleaner option nearby.",
    icon: (
      <b style={{ fontSize: 26, lineHeight: 1, color: "#fff" }}>!</b>
    ),
  },
  {
    variant: "avoid" as const,
    title: "Avoid",
    description:
      "This one works against the goals you set. We'll show you a better brand on the same shelf.",
    icon: (
      <span
        style={{
          display: "block",
          width: 22,
          height: 3.5,
          background: "#fff",
          borderRadius: 3,
        }}
      />
    ),
  },
] as const;

export function VerdictSystemSection() {
  return (
    <section className="lp-sec" id="verdicts">
      <MarketingWrap>
        <div className="lp-sec-head">
          <span className="lp-eyebrow">The verdict system</span>
          <h2 className="lp-display">
            No mystery scores. Just
            <br />
            three honest answers.
          </h2>
          <p className="lp-sec-lead">
            Every product gets one of three calls — the same language a smart friend
            would use, never a number you have to decode.
          </p>
        </div>

        <div className="lp-verdicts">
          {VERDICTS.map((verdict) => (
            <div key={verdict.variant} className={`lp-vcard ${verdict.variant}`}>
              <div className="vdot">{verdict.icon}</div>
              <h3>{verdict.title}</h3>
              <p>{verdict.description}</p>
            </div>
          ))}
        </div>
      </MarketingWrap>
    </section>
  );
}
