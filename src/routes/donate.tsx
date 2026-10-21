import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Heart,
  Landmark,
  Mail,
  Package,
  Plane,
  Share2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Backdrop, Eyebrow, SectionHeader } from "@/components/Section";
import { SponsorWall } from "@/components/SponsorWall";
import { FundraisingProgress, SEASON_GOAL } from "@/components/Fundraising";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Support Atlas Autoware" },
      {
        name: "description",
        content:
          "Support Atlas Autoware — a student-led autonomous vehicle team. Donate or become a sponsor.",
      },
      { property: "og:title", content: "Support Atlas Autoware" },
      { property: "og:description", content: "Help keep our autonomous vehicle team running." },
    ],
  }),
  component: DonatePage,
});

const PAYPAL = "https://www.paypal.com/donate?hosted_button_id=88VLJ6TS6554Q&amount=";
const PPGF = "https://www.paypal.com/fundraiser/charity/4692391";

function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState("$50");
  const [customAmount, setCustomAmount] = useState("50");

  const donationOptions = [
    { amount: "$50", label: "gets us a camera" },
    { amount: "$150", label: "replaces parts we broke" },
    { amount: "$500", label: "covers a trip to compete" },
    { amount: "$2,000", label: "goes toward our next LiDAR" },
  ];

  const buys = [
    {
      icon: Package,
      title: "Parts",
      desc: "Sensors, the GPU, and replacements for the stuff we inevitably fry.",
    },
    {
      icon: Plane,
      title: "Getting to competitions",
      desc: "Vans, gas, entry fees. Turns out moving a car across states isn't free.",
    },
    {
      icon: Wrench,
      title: "Tools",
      desc: "The boring-but-essential stuff: a soldering iron that works, spare cables, batteries.",
    },
  ];

  const seasonTiers = [
    {
      amount: "$250",
      title: "Pit Crew",
      benefits: ["Name on our supporters wall", "Season recap newsletter", "Our heartfelt thanks"],
      primary: false,
      buttonLabel: "Choose Pit Crew",
    },
    {
      amount: "$1,000",
      title: "Co-Pilot",
      benefits: [
        "Everything in Pit Crew",
        "Logo on the car & website",
        "Invite to our demo day",
        "Quarterly progress updates",
      ],
      primary: true,
      buttonLabel: "Choose Co-Pilot",
    },
    {
      amount: "$5,000",
      title: "Title Partner",
      benefits: [
        "Everything in Co-Pilot",
        "Premier logo placement",
        "Named on competition livery",
        "A visit with the team & car",
      ],
      primary: false,
      buttonLabel: "Talk to Us",
    },
  ];

  const paypalAmount =
    selectedAmount === "custom" ? customAmount || "0" : selectedAmount.replace(/[^0-9.]/g, "");

  return (
    <div className="min-h-screen bg-base text-ink">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative isolate pt-32 md:pt-40 pb-20 overflow-hidden">
          <Backdrop />
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="aa-slide-up">
              <Eyebrow>Support us</Eyebrow>
              <h1 className="mt-4 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] text-ink">
                Thanks for even
                <span className="block aa-gradient-text pb-1">considering this.</span>
              </h1>
              <p className="mx-auto mt-8 aa-lead">
                We're a high school team, so we don't have a budget. We have whatever people are
                kind enough to give us. Right now we're trying to raise{" "}
                <span className="font-semibold text-brand-text">
                  ${SEASON_GOAL.toLocaleString()}
                </span>{" "}
                to get to our next competition, build a second, better car, and buy a computer to
                train its AI. No salaries, no overhead, we promise.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted">
                <ShieldCheck className="w-4 h-4 text-brand-text" aria-hidden="true" />
                Registered 501(c)(3) nonprofit · EIN 88-3747265 · tax-deductible
              </div>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {donationOptions.map((option) => (
                <div key={option.amount} className="aa-card aa-card--hover p-7 text-left">
                  <div className="aa-display text-4xl font-bold aa-gradient-text">
                    {option.amount}
                  </div>
                  <p className="mt-3 text-sm text-ink-muted">{option.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Goal */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <FundraisingProgress
              items={[
                {
                  title: "Travel to competitions",
                  desc: "Getting the team and the car to our next RoboRacer round in Boston.",
                },
                {
                  title: "Car #2",
                  desc: "A second car with custom circuit boards we designed ourselves. The boards alone cost about $2,000. See the renders on the Car v2 page.",
                },
                {
                  title: "Training computer",
                  desc: "A dedicated computer to train our cars' AI models.",
                },
              ]}
            />
          </div>
        </section>

        {/* Give */}
        <section id="give" className="aa-band py-20 md:py-24 scroll-mt-16">
          <div className="mx-auto max-w-6xl px-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <SectionHeader eyebrow="Pick an amount" title="Whatever Works for You" />
              <p className="mt-4 text-sm text-ink-subtle">Select an amount</p>
              <div
                className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3"
                role="group"
                aria-label="Donation amount"
              >
                {["$25", "$50", "$100", "$250", "$500", "$1,000"].map((amount) => {
                  const isActive = selectedAmount === amount;
                  return (
                    <button
                      type="button"
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      aria-pressed={isActive}
                      className={`aa-display rounded-xl border px-6 py-4 text-lg font-bold transition ${
                        isActive
                          ? "border-transparent bg-gradient-to-br from-brand to-brand-dark text-on-brand shadow-[0_4px_20px_rgba(220,38,38,0.25)]"
                          : "border-line bg-base text-ink hover:border-[var(--aa-red-border)] hover:text-brand-text"
                      }`}
                    >
                      {amount}
                    </button>
                  );
                })}
              </div>

              <div
                className={`mt-6 aa-card p-6 ${selectedAmount === "custom" ? "!border-[var(--aa-red-border)]" : ""}`}
              >
                <label htmlFor="custom-amount" className="block text-sm font-medium text-ink">
                  Or enter a custom amount
                </label>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-elevated px-4 py-3 border border-line focus-within:border-[var(--aa-red-border)]">
                  <span className="aa-display text-lg font-bold text-ink-muted">$</span>
                  <input
                    id="custom-amount"
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(event) => {
                      setCustomAmount(event.target.value);
                      setSelectedAmount("custom");
                    }}
                    className="aa-display w-full border-0 bg-transparent text-right text-2xl font-bold text-ink outline-none placeholder:text-ink-subtle"
                  />
                </div>

                <div className="mt-6 rounded-xl border border-[var(--aa-red-border-soft)] bg-[var(--aa-red-dim)] p-4 text-sm leading-relaxed text-ink">
                  Atlas Autoware is a registered 501(c)(3), but it is not yet registered to solicit
                  charitable contributions in every state. We cannot accept donations from residents
                  of California, Illinois, Mississippi, New Hampshire, New York, North Dakota,
                  Oklahoma, Oregon, or Utah, or from outside the United States. If that includes
                  you, please email{" "}
                  <a href="mailto:contact@atlasautoware.org" className="aa-link">
                    contact@atlasautoware.org
                  </a>{" "}
                  before giving.
                </div>

                <label className="mt-4 flex items-start gap-3 text-sm text-ink">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--aa-red)]" />
                  <span>
                    I confirm I am a U.S. resident and not a resident of any state listed above.
                  </span>
                </label>

                <a
                  href={`${PAYPAL}${encodeURIComponent(paypalAmount)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 aa-btn aa-btn--primary aa-btn--block !py-4 !text-base"
                >
                  <Heart aria-hidden="true" /> Give to Atlas Autoware
                </a>

                <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
                  You'll complete your donation on PayPal, and PayPal will email you a receipt.
                  Atlas Autoware is a registered 501(c)(3) nonprofit, so your donation is
                  tax-deductible. Our EIN is 88-3747265.
                </p>
              </div>
            </div>

            <div className="relative aa-card p-8 overflow-hidden self-start">
              <div className="aa-glow-orb -right-20 -top-20" aria-hidden="true" />
              <h3 className="relative text-2xl font-bold text-ink">What It Actually Buys</h3>
              <p className="relative mt-3 text-sm leading-7 text-ink-muted">
                No overhead, nobody gets paid. It all goes to the car and getting it places.
              </p>
              <div className="relative mt-8 space-y-5">
                {buys.map((b) => (
                  <div key={b.title} className="flex gap-4 items-start">
                    <span className="aa-icon-tile">
                      <b.icon aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{b.title}</p>
                      <p className="mt-1 text-sm text-ink-muted">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <figure className="relative mt-8 rounded-xl border border-line bg-elevated p-6">
                <blockquote className="text-sm italic text-ink-muted leading-relaxed">
                  "Last year a donor we'd never met covered our entry fee two days before the
                  deadline. We wouldn't have competed without it. So, yeah, this stuff really
                  matters to us."
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-brand-text">
                  The team
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* More ways to give */}
        <section id="more-ways" className="py-20 md:py-24 scroll-mt-16">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              center
              eyebrow="Other ways to give"
              title="DAFs, Matching Gifts, and Checks"
              lead="If PayPal isn't how you give, these all reach us too. Our IRS name is AtlasAutoware (one word), EIN 88-3747265, Fairfax, VA."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="aa-card p-7 text-left">
                <span className="aa-icon-tile">
                  <Landmark aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">Donor-advised fund</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Recommend a grant from Fidelity Charitable, Schwab (DAFgiving360), Vanguard
                  Charitable, or any other DAF. Search for{" "}
                  <span className="font-semibold text-ink">AtlasAutoware</span> or EIN 88-3747265.
                </p>
              </div>
              <div className="aa-card p-7 text-left">
                <span className="aa-icon-tile">
                  <Building2 aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">Employer matching</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Many employers double gifts through Benevity or YourCause. Look us up in your
                  company's giving portal by EIN 88-3747265.
                </p>
              </div>
              <div className="aa-card p-7 text-left">
                <span className="aa-icon-tile">
                  <Share2 aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">Start a fundraiser</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  We're on PayPal Giving Fund, so you can raise money for us on Facebook, Instagram,
                  or GoFundMe.
                </p>
                <a
                  href={PPGF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold aa-link"
                >
                  Our Giving Fund page <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
              <div className="aa-card p-7 text-left">
                <span className="aa-icon-tile">
                  <Mail aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">Mail a check</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Payable to Atlas Autoware, 3920 Green Look Court, Fairfax, VA 22033-2725. Need a
                  W-9 or a receipt? Email{" "}
                  <a href="mailto:contact@atlasautoware.org" className="aa-link">
                    contact@atlasautoware.org
                  </a>
                  .
                </p>
              </div>
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ink-subtle">
              The state notice in the giving section above applies to every way of giving.
            </p>
          </div>
        </section>

        <SponsorWall />

        {/* Season tiers */}
        <section id="season" className="py-20 md:py-24 scroll-mt-16">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              center
              eyebrow="For companies & families"
              title="Or Sponsor Us for the Season"
              lead="If you want to do something bigger, here's roughly how we say thanks. Happy to tweak any of it, just talk to us."
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {seasonTiers.map((tier) => {
                const href =
                  tier.buttonLabel === "Talk to Us"
                    ? "mailto:contact@atlasautoware.org"
                    : `${PAYPAL}${encodeURIComponent(tier.amount.replace(/[^0-9.]/g, ""))}`;
                const external = !href.startsWith("mailto:");
                return (
                  <div
                    key={tier.title}
                    className={`aa-card aa-tier min-h-[380px] ${tier.primary ? "aa-tier--featured" : ""}`}
                  >
                    <p className="aa-eyebrow">{tier.title}</p>
                    <div className="mt-3 flex items-baseline gap-2">
                      <p className="aa-display text-4xl font-bold text-ink">{tier.amount}</p>
                      <span className="text-xs font-semibold text-ink-subtle">/season</span>
                    </div>
                    <ul className="aa-tier__list mt-6">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit}>
                          <Check aria-hidden="true" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`aa-btn aa-btn--block ${tier.primary ? "aa-btn--primary" : "aa-btn--outline"}`}
                      >
                        {tier.buttonLabel}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Other ways to help */}
        <section className="relative isolate py-20 md:py-28 overflow-hidden">
          <Backdrop dim />
          <div className="mx-auto max-w-7xl px-6 text-center">
            <SectionHeader
              center
              className="max-w-3xl"
              eyebrow="Not into donating? No worries"
              title="Money Isn't the Only Thing That Helps"
              lead="Got old sensors or a spare GPU collecting dust? Know your way around ROS and have a few hours? Work somewhere with a STEM program? Any of those would honestly help us as much as a check."
            />
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a href="mailto:contact@atlasautoware.org" className="aa-btn aa-btn--primary">
                Contact Us <ArrowRight aria-hidden="true" />
              </a>
              <Link to="/the-car" className="aa-btn aa-btn--outline">
                See the Car
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
