import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState, type MouseEvent } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead, Row } from "@/components/Ledger";
import { SpecTable } from "@/components/SpecTable";
import { DefList } from "@/components/DefList";
import { SponsorWall } from "@/components/SponsorWall";
import { FundraisingProgress, SEASON_GOAL, SEASON_RAISED } from "@/components/Fundraising";
import { CONTACT_EMAIL, pageHead } from "@/lib/meta";
import {
  dateRange,
  loadFinance,
  longDate,
  shortDate,
  usd2,
  type FinanceSummary,
} from "@/lib/finance";
import { runtimeSecret } from "@/lib/runtime-env";

/** Reads the Spending dashboard in Notion on the server; never throws (falls back to the snapshot). */
const getFinance = createServerFn({ method: "GET" }).handler(async () =>
  loadFinance(runtimeSecret("NOTION_TOKEN")),
);

export const Route = createFileRoute("/donate")({
  head: () =>
    pageHead({
      path: "/donate",
      title: "Donate to Atlas Autoware",
      description: "PayPal, donor-advised fund, employer match or check. EIN 88-3747265.",
    }),
  loader: () => getFinance(),
  staleTime: 5 * 60 * 1000,
  component: DonatePage,
});

// PayPal ignores "amount" on hosted-button links (hosted_button_id=88VLJ6TS6554Q opened at $0), so
// the links address the account directly by merchant id, which does prefill the amount.
const PAYPAL =
  "https://www.paypal.com/donate?business=HQFCMZTVVTKWG&currency_code=USD&item_name=Atlas%20Autoware&amount=";
const PPGF = "https://www.paypal.com/fundraiser/charity/4692391";
const CONTACT = CONTACT_EMAIL;

const AMOUNTS = [25, 50, 100, 250, 500, 1000];
const DEFAULT_AMOUNT = "50";

const usd = (n: number) =>
  `$${n.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

/** A positive dollar amount with at most two decimals, or null. Accepts "$1,000" and "75.5". */
function parseAmount(raw: string): number | null {
  const cleaned = raw.trim().replace(/^\$/, "").replace(/,/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return n > 0 ? n : null;
}

const paypalHref = (amount: number) => `${PAYPAL}${encodeURIComponent(String(amount))}`;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function GiveForm() {
  const [preset, setPreset] = useState(DEFAULT_AMOUNT);
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const isCustom = useCustom && custom.trim() !== "";
  const amount = isCustom ? parseAmount(custom) : Number(preset);
  const showError = isCustom && amount === null;

  const blockInvalid = (event: MouseEvent<HTMLAnchorElement>) => {
    if (amount === null) event.preventDefault();
  };

  return (
    <div className="aa-card">
      <h3 className="aa-h3">Give with PayPal</h3>

      <fieldset className="mt-6 aa-amounts">
        <legend>Amount</legend>
        {AMOUNTS.map((n) => (
          <label key={n}>
            <input
              type="radio"
              name="amount"
              value={String(n)}
              checked={!isCustom && preset === String(n)}
              onChange={() => {
                setPreset(String(n));
                setUseCustom(false);
              }}
            />
            {usd(n)}
          </label>
        ))}
      </fieldset>

      <div className="mt-6 grid gap-2">
        <label htmlFor="custom-amount" className="aa-field-label">
          Or enter another amount, in US dollars
        </label>
        <input
          id="custom-amount"
          className="aa-field"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={custom}
          aria-invalid={showError ? true : undefined}
          aria-describedby={showError ? "custom-amount-error" : undefined}
          onChange={(event) => {
            setCustom(event.target.value);
            setUseCustom(true);
          }}
        />
        {showError ? (
          <p id="custom-amount-error" className="aa-error" role="alert">
            Enter an amount above $0, like 75 or 75.50.
          </p>
        ) : null}
      </div>

      {/* Keep the state notice and the checkbox below word for word. */}
      <div className="mt-6 aa-notice" role="note">
        Atlas Autoware is a registered 501(c)(3), but it is not yet registered to solicit charitable
        contributions in every state. We cannot accept donations from residents of California,
        Illinois, Mississippi, New Hampshire, New York, North Dakota, Oklahoma, Oregon, or Utah, or
        from outside the United States. If that includes you, please email{" "}
        <a href={`mailto:${CONTACT}`} className="aa-link">
          {CONTACT}
        </a>{" "}
        before giving.
      </div>

      {/* Kept as on the previous site: the box records the donor's confirmation and does not
          block the link. Whether it should gate the button is an open decision for the board. */}
      <label className="mt-6 aa-check">
        <input type="checkbox" />
        <span>I confirm I am a U.S. resident and not a resident of any state listed above.</span>
      </label>

      <a
        href={amount === null ? undefined : paypalHref(amount)}
        {...ext}
        role={amount === null ? "link" : undefined}
        aria-disabled={amount === null ? true : undefined}
        aria-describedby={amount === null ? "custom-amount-error" : undefined}
        tabIndex={amount === null ? 0 : undefined}
        onClick={blockInvalid}
        className="mt-6 aa-btn aa-btn--primary aa-btn--block"
      >
        {amount === null ? "Donate with PayPal" : `Donate ${usd(amount)} with PayPal`}
      </a>

      <p className="mt-6 aa-meta">
        You'll complete your donation on PayPal, and PayPal will email you a receipt. Atlas Autoware
        is a registered 501(c)(3) nonprofit, so your donation is tax-deductible. Our EIN is
        88-3747265.
      </p>
    </div>
  );
}

/* ---------- Spent so far: live from the Spending dashboard in Notion ---------- */

function SpentSoFar({ finance }: { finance: FinanceSummary }) {
  const bank = finance.balances[0];
  const meta = [dateRange(finance.since, finance.through)];
  if (bank) meta.push(`${usd2(bank.balance)} in the bank on ${shortDate(bank.asOf)}`);
  meta.push(finance.live ? "From our books, read live" : "From our books");
  return (
    <Row title="Spent so far" meta={meta}>
      <p className="aa-prose">
        Spent {longDate(finance.since)} to {longDate(finance.through)}, {usd2(finance.total)} in
        total:
      </p>
      <div className="mt-6">
        <SpecTable
          columns={["Item", "Amount"]}
          numericCols={[1]}
          rows={finance.categories.map((c) => [c.name, usd2(c.amount)])}
          caption={
            bank
              ? `Cash on hand: ${usd2(bank.balance)} in the bank on ${longDate(bank.asOf)}. Gifts are counted before PayPal's fee; the fee is the processing line above.`
              : "Gifts are counted before PayPal's fee; the fee is the processing line above."
          }
        />
      </div>
    </Row>
  );
}

function DonatePage() {
  const finance = Route.useLoaderData();
  const reached = SEASON_RAISED >= SEASON_GOAL;
  const title = reached
    ? `We passed our ${usd(SEASON_GOAL)} goal for this season.`
    : `We are raising ${usd(SEASON_GOAL)} for this season.`;
  const lead = reached
    ? `${usd(SEASON_RAISED)} is in. Anything more goes to car two's boards and parts, a computer to train our models, and travel to the next competition. No one is paid.`
    : `${usd(SEASON_RAISED)} is in. It pays for car two's boards and parts, a computer to train our models, and travel to the next competition. No one is paid.`;

  return (
    <>
      <Nav />
      <main id="main" className="aa-page">
        <PageHead title={title} lead={lead} meta={["EIN 88-3747265", "Tax-deductible"]} />

        <Row
          id="give"
          topic
          band
          sticky
          title="Where it goes"
          side={<FundraisingProgress compact />}
        >
          <GiveForm />
          <h3 className="mt-12 aa-h3">Why it matters</h3>
          {/* Team quote, verified Oct 2026: keep the words unchanged. */}
          <p className="mt-2 aa-prose">
            Last year a donor we'd never met covered our entry fee two days before the deadline. We
            wouldn't have competed without it. So, yeah, this stuff really matters to us.
          </p>
        </Row>

        <SpentSoFar finance={finance} />

        <Row
          title="Other ways to give"
          meta={["IRS name: AtlasAutoware (one word)", "EIN 88-3747265", "Fairfax, VA"]}
        >
          <DefList
            items={[
              {
                term: "Donor-advised fund",
                body: (
                  <>
                    Recommend a grant from Fidelity Charitable, Schwab (DAFgiving360), Vanguard
                    Charitable, or any other DAF. Search for AtlasAutoware or EIN 88-3747265.
                  </>
                ),
              },
              {
                term: "Employer matching",
                body: (
                  <>
                    Many employers double gifts through Benevity or YourCause. Look us up in your
                    company's giving portal by EIN 88-3747265.
                  </>
                ),
              },
              {
                term: "PayPal Giving Fund",
                body: (
                  <>
                    We're on PayPal Giving Fund, so you can raise money for us on Facebook,
                    Instagram, or GoFundMe. See{" "}
                    <a href={PPGF} {...ext} className="aa-link">
                      our Giving Fund page
                    </a>
                    .
                  </>
                ),
              },
              {
                term: "Mail a check",
                body: (
                  <>
                    {/* U+2011 non-breaking hyphen keeps "W-9" on one line. */}
                    Payable to Atlas Autoware, 3920 Green Look Court, Fairfax, VA 22033-2725. Need a{" "}
                    {"W\u20119"} or a receipt? Email{" "}
                    <a href={`mailto:${CONTACT}`} className="aa-link">
                      {CONTACT}
                    </a>
                    .
                  </>
                ),
              },
            ]}
          />
          <p className="mt-6 aa-prose">The state notice above applies to every way of giving.</p>
        </Row>

        <Row id="sponsoring" topic title="Sponsoring" meta={["W-9 and receipts on request"]}>
          <SpecTable
            stack
            columns={["Level", "Amount", "You get", "How to give"]}
            numericCols={[1]}
            rows={[
              [
                "Pit Crew",
                "$250",
                "Your name on our sponsor wall",
                <a
                  key="pc"
                  href={paypalHref(250)}
                  {...ext}
                  aria-label="Give $250 with PayPal"
                  className="aa-link"
                >
                  PayPal
                </a>,
              ],
              [
                "Co-Pilot",
                "$1,000",
                "The wall and your logo on the car",
                <a
                  key="cp"
                  href={paypalHref(1000)}
                  {...ext}
                  aria-label="Give $1,000 with PayPal"
                  className="aa-link"
                >
                  PayPal
                </a>,
              ],
              [
                "Title Partner",
                "$5,000",
                "Talk to us",
                <a key="tp" href={`mailto:${CONTACT}`} className="aa-link">
                  Email us
                </a>,
              ],
            ]}
          />
        </Row>

        <SponsorWall showCta={false} />
      </main>
      <Footer />
    </>
  );
}
