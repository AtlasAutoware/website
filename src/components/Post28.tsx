import { Link } from "@tanstack/react-router";
import { Row } from "@/components/Ledger";

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
      <span className="aa-legion-badge__sub">
        <span className="whitespace-nowrap">Quantico&ndash;Buck Keyes</span> &middot;{" "}
        <span className="whitespace-nowrap">Triangle, VA</span>
      </span>
    </div>
  );
}

/** Home-page thank-you row. */
export function Post28Thanks() {
  return (
    <Row title="Car two has a sponsor" meta={["22 Oct 2026"]}>
      <div className="aa-partner grid gap-6 items-center md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="aa-sponsor__logo aa-partner__logo">
          <Post28Badge size="lg" />
        </div>
        <div>
          <p className="aa-partner__name">{POST28.fullName}</p>
          <p className="aa-meta">{POST28.place}</p>
          <p className="mt-4 aa-prose">
            The post gave ${POST28.amount.toLocaleString("en-US")} for car two, the full build
            estimate we sent it on 29 September. It pays for car two&rsquo;s two circuit boards.
            2026 is the post&rsquo;s 100th-anniversary year, and its name goes on car two. Thank you
            to Commander Michael Hoff and the members of Post 28.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/car-v2" hash="names" className="aa-btn aa-btn--primary">
              See car two
            </Link>
            <a
              href={POST28.href}
              target="_blank"
              rel="noopener noreferrer"
              className="aa-btn aa-btn--secondary"
            >
              Visit Post 28
            </a>
          </div>
        </div>
      </div>
    </Row>
  );
}
