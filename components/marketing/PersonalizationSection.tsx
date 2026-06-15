import Link from "next/link";
import { IcArrow } from "@/components/icons";
import { PRIORITY_ICONS_BY_LABEL } from "@/lib/priorities/icons";
import { MarketingWrap } from "./MarketingWrap";

const GOALS = [
  { label: "Heart health", accent: true },
  { label: "Blood sugar", accent: false },
  { label: "Gut health", accent: true },
  { label: "Inflammation", accent: false },
  { label: "Hormones", accent: false },
  { label: "Sustainability", accent: false },
] as const;

export function PersonalizationSection() {
  return (
    <section className="lp-sec white" id="personalization">
      <MarketingWrap>
        <div className="lp-split">
          <div>
            <span className="lp-eyebrow">Tuned to you</span>
            <h2 className="lp-display">
              The same cereal isn&apos;t
              <br />
              &quot;good&quot; for everyone
            </h2>
            <p className="lp-sec-lead">
              Pick the goals that matter to you and every verdict re-weights itself.
              Watching blood sugar? That granola drops to Caution. Chasing more fiber?
              Your verdicts reward it.
            </p>
            <Link href="/sign-in" className="lp-btn lp-btn-dark lp-split-cta">
              Set your goals
              <IcArrow s={18} sw={2} />
            </Link>
          </div>

          <div className="lp-prio-grid">
            {GOALS.map((goal) => {
              const Icon = PRIORITY_ICONS_BY_LABEL[goal.label];
              return (
                <div
                  key={goal.label}
                  className={`lp-prio${goal.accent ? " accent" : ""}`}
                >
                  <div className="pic">{Icon ? <Icon s={22} /> : null}</div>
                  <b>{goal.label}</b>
                </div>
              );
            })}
          </div>
        </div>
      </MarketingWrap>
    </section>
  );
}
