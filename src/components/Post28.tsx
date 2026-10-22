import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/Section";

/**
 * American Legion Quantico-Buck Keyes Post 28 (Triangle, VA) gave $2,060 toward car two in
 * October 2026, the build estimate we quoted in our Sept 29 ask to Commander Michael Hoff.
 * Shared here so the home page, the sponsor wall and the car-v2 page say the same thing.
 */
export const POST28 = {
  shortName: "American Legion Post 28",
  // No-break space keeps "Post 28" together when the name wraps.
  fullName: "American Legion Quantico–Buck Keyes Post 28",
  place: "Triangle, Virginia",
  href: "https://www.valegionpost28.org/",
  amount: 2060,
} as const;

/**
 * A type-only badge that stands in for a logo. We don't use the Legion emblem until the post
 * sends a file and says it's fine to use it.
 */
export function Post28Badge({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <div
      className={`aa-legion-badge ${size === "lg" ? "aa-legion-badge--lg" : ""}`}
      role="img"
      aria-label={POST28.fullName}
    >
      <span className="aa-legion-badge__top">The American Legion</span>
      <span className="aa-legion-badge__num">Post 28</span>
      <span className="aa-legion-badge__rule" />
      <span className="aa-legion-badge__sub">Quantico&ndash;Buck Keyes &middot; Triangle, VA</span>
    </div>
  );
}

/** Home-page thank-you card. */
export function Post28Thanks() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="aa-card aa-partner p-5 md:p-6 grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center">
          <div className="aa-sponsor__logo aa-partner__logo">
            <Post28Badge size="lg" />
          </div>
          <div className="md:pr-4">
            <Eyebrow>Thank you &middot; October 2026</Eyebrow>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-ink">
              American Legion Post 28 is backing car two.
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              {POST28.fullName} in {POST28.place}, gave ${POST28.amount.toLocaleString()} toward our
              second car: the full amount we estimated it would cost to build. It came in the year
              the post marks its 100th anniversary, and it took us past our $5,000 goal for the
              season. Thank you to Commander Michael Hoff and every member of Post 28.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/car-v2" hash="on-the-car" className="aa-btn aa-btn--primary">
                See Car Two <ArrowRight aria-hidden="true" />
              </Link>
              <a
                href={POST28.href}
                target="_blank"
                rel="noopener noreferrer"
                className="aa-btn aa-btn--outline"
              >
                Visit Post 28 <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
