import { Cpu, Plane, Wrench } from "lucide-react";
import { Eyebrow } from "@/components/Section";

/** Season goal. Update `raised` here and both the home and donate pages follow. */
export const SEASON_GOAL = 5000;
// 2,979 + American Legion Post 28's 2,060 (Oct 22, 2026).
export const SEASON_RAISED = 5039;

/** Shown under the bar once the goal is reached. Raise SEASON_GOAL and it goes away. */
const GOAL_REACHED_NOTE =
  "American Legion Quantico–Buck Keyes Post 28 gave $2,060 for car two and took us past the goal. Thank you, Post 28! Anything more still goes to the three things below.";

const ITEM_ICONS = [Plane, Wrench, Cpu];

const DEFAULT_ITEMS = [
  { title: "Getting to competitions", desc: "Travel, gas, and entry fees to events like IV 2026." },
  {
    title: "Building Atlas Two - 2nd Car",
    desc: "A second car with better sensors and faster compute. Its custom circuit boards alone cost about $2,000.",
  },
  {
    title: "Training computer",
    desc: "A dedicated computer to train our cars' AI models.",
  },
];

export function FundraisingProgress({
  raised = SEASON_RAISED,
  goal = SEASON_GOAL,
  items = DEFAULT_ITEMS,
}: {
  raised?: number;
  goal?: number;
  items?: Array<{ title: string; desc: string }>;
}) {
  const pct = Math.min(100, (raised / goal) * 100);
  const reached = raised >= goal;
  return (
    <div className="aa-card p-8 md:p-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <Eyebrow>{reached ? "Season goal reached" : "Our goal this season"}</Eyebrow>
          <h3 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink">
            {reached ? (
              <>
                We passed our <span className="aa-gradient-text">${goal.toLocaleString()}</span>{" "}
                goal
              </>
            ) : (
              <>
                Help us raise <span className="aa-gradient-text">${goal.toLocaleString()}</span>
              </>
            )}
          </h3>
        </div>
        <div className="md:text-right">
          <div className="aa-display text-4xl md:text-5xl font-bold aa-gradient-text">
            ${raised.toLocaleString()}
          </div>
          <div className="text-sm text-ink-subtle mt-1">
            {reached
              ? `raised this season, goal $${goal.toLocaleString()}`
              : `of $${goal.toLocaleString()} raised so far`}
          </div>
        </div>
      </div>
      <div
        className="mt-8 aa-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={Math.min(raised, goal)}
        aria-valuetext={`$${raised.toLocaleString()} raised of a $${goal.toLocaleString()} goal`}
        aria-label="Season fundraising progress"
      >
        <div style={{ width: `${pct}%` }} />
      </div>
      {reached ? (
        <p className="mt-4 text-sm text-ink-muted leading-relaxed">{GOAL_REACHED_NOTE}</p>
      ) : null}
      <div className={`mt-8 grid gap-6 ${items.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {items.map((item, i) => {
          const Icon = ITEM_ICONS[Math.min(i, ITEM_ICONS.length - 1)];
          return (
            <div key={item.title} className="flex gap-4">
              <span className="aa-icon-tile">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <div className="font-semibold text-ink">{item.title}</div>
                <div className="text-sm text-ink-muted mt-1">{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
