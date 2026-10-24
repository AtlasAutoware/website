import { DefList } from "@/components/DefList";

/** Season goal. Update `raised` here and both the home and donate pages follow. */
// Raised from 5,000 to 7,500 on Oct 22, 2026, after Post 28's gift took us past 5,000.
export const SEASON_GOAL = 7500;
// 2,979 + American Legion Post 28's 2,060 (check, Oct 22, 2026).
export const SEASON_RAISED = 5039;

/** The goal before Oct 22, 2026, marked with a tick on the bar. */
const EARLIER_GOAL = 5000;

/** Shown under the bar while we're still short of the goal. Set to "" to hide it. */
const PROGRESS_NOTE = "Post 28's $2,060 check on 22 October took us past our earlier $5,000 goal.";

/** Shown under the bar once the goal is reached. */
const GOAL_REACHED_NOTE =
  "We reached the goal. Thank you to everyone on our sponsor wall. Anything more goes to the same three things.";

type Item = { title: string; desc: string };

/** What the season's money pays for. */
const DEFAULT_ITEMS: Item[] = [
  {
    title: "Car two's boards and parts",
    desc: "The boards are funded and being ordered: Post 28's $2,060 and about $700 we had on hand cover them. Nothing is paid yet as of 23 October 2026.",
  },
  {
    title: "A training computer",
    desc: "A team computer to train our driving models.",
  },
  {
    title: "Travel",
    desc: "Getting the team and the car to our next competition, in spring 2027.",
  },
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const pctOf = (n: number, goal: number) => `${Math.min(100, (n / goal) * 100).toFixed(2)}%`;

export function FundraisingProgress({
  raised = SEASON_RAISED,
  goal = SEASON_GOAL,
  items = DEFAULT_ITEMS,
  compact = false,
}: {
  raised?: number;
  goal?: number;
  items?: Item[];
  compact?: boolean;
}) {
  const reached = raised >= goal;
  const showTick = EARLIER_GOAL < goal;
  const note = reached ? GOAL_REACHED_NOTE : PROGRESS_NOTE;
  return (
    <div>
      <p className="aa-progress-figure">
        <strong>{usd(raised)}</strong> raised of {usd(goal)}
      </p>
      <div
        className="mt-2 aa-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={Math.min(raised, goal)}
        aria-valuetext={`${usd(raised)} raised of a ${usd(goal)} goal`}
        aria-label="Season fundraising progress"
      >
        <div className="aa-progress__fill" style={{ width: pctOf(raised, goal) }} />
        {showTick ? (
          <span
            className="aa-progress__tick"
            style={{ left: pctOf(EARLIER_GOAL, goal) }}
            aria-hidden="true"
          />
        ) : null}
      </div>
      {showTick ? (
        <div className="aa-progress__scale">
          <span className="aa-progress__tick-label" style={{ left: pctOf(EARLIER_GOAL, goal) }}>
            Earlier goal {usd(EARLIER_GOAL)}
          </span>
        </div>
      ) : null}
      {!compact && note ? <p className="mt-6 aa-prose">{note}</p> : null}
      {items.length ? (
        <div className="mt-6">
          <DefList items={items.map((item) => ({ term: item.title, body: item.desc }))} />
        </div>
      ) : null}
    </div>
  );
}
