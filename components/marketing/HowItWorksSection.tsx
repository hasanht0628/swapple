import { IcArrow, IcBolt, IcGallery } from "@/components/icons";
import { MarketingWrap } from "./MarketingWrap";

const STEPS = [
  {
    number: "1",
    title: "Scan it",
    description:
      "Open the camera and point at a single product, a whole shelf, or the cart you're about to check out.",
    icon: <IcGallery s={26} sw={1.7} />,
  },
  {
    number: "2",
    title: "Get a verdict",
    description:
      "A clear Good, Caution, or Avoid — scored for the health goals you chose, with the one reason that matters most.",
    icon: <IcBolt s={26} sw={1.7} />,
  },
  {
    number: "3",
    title: "Swap up",
    description:
      "When something falls short, see the better-for-you brands on the same shelf, ranked just for you.",
    icon: <IcArrow s={26} sw={1.7} />,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section className="lp-sec white" id="how">
      <MarketingWrap>
        <div className="lp-sec-head center">
          <span className="lp-eyebrow">How it works</span>
          <h2 className="lp-display">
            Groceries, decoded in
            <br />
            three seconds flat
          </h2>
        </div>

        <div className="lp-steps">
          {STEPS.map((step) => (
            <div key={step.number} className="lp-step">
              <div className="lp-step-ic">{step.icon}</div>
              <div className="lp-step-n">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </MarketingWrap>
    </section>
  );
}
