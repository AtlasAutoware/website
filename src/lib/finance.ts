/*
 * The "Spent so far" figures on /donate, read live from the Spending dashboard in Notion
 * (Operations > Spending dashboard). Two data sources feed it:
 *   - Transactions: every movement of money since 17 Jul 2026. Amount is signed. The site uses
 *     only the money-out rows, summed by Category. No row, vendor or donor leaves Notion.
 *   - Balances: one row per account. Rows with "Show on website" ticked appear as cash on hand.
 *
 * The Worker needs the secret NOTION_TOKEN (an internal Notion integration with read access to
 * the Spending dashboard page). Without it, or when Notion cannot be reached, the page shows the
 * snapshot below, which is updated by hand when the live feed is unavailable for a while.
 */

export const TRANSACTIONS_DS = "861da3d6-a4f4-4576-98c6-58815e102812";
export const BALANCES_DS = "e3ce45aa-a9c4-41a5-b21d-0422cf3723e4";
export const SEASON_START = "2026-07-17";

const NOTION_VERSION = "2025-09-03";
const CACHE_MS = 15 * 60 * 1000;

export type FinanceCategory = { name: string; amount: number };
export type FinanceBalance = { account: string; balance: number; asOf: string };
export type FinanceSummary = {
  /** First and last transaction dates covered, ISO. */
  since: string;
  through: string;
  /** Money out, as a positive number. */
  total: number;
  categories: FinanceCategory[];
  balances: FinanceBalance[];
  /** When the figures were read from Notion, ISO; "snapshot" for the built-in fallback. */
  fetchedAt: string;
  live: boolean;
};

/** Public names for the Notion categories. Anything not listed keeps its Notion name. */
const PUBLIC_NAMES: Record<string, string> = {
  "Training computer": "Parts for the training computer",
  "Car parts and repairs": "Car parts and repairs",
  "Program fee": "Program fee",
  "Software and services": "Software and services",
  "Payment fees": "Payment processing fees",
  "Not yet categorized": "Other",
};

/** Categories that never show: money in, and orders that were cancelled and refunded. */
const HIDDEN = new Set(["Donation", "Cancelled order"]);

/** Figures read from Notion on 24 Oct 2026; shown when the live feed is unavailable. */
export const SNAPSHOT: FinanceSummary = {
  since: SEASON_START,
  through: "2026-10-23",
  total: 2442.96,
  categories: [
    { name: "Parts for the training computer", amount: 1346.21 },
    { name: "Car parts and repairs", amount: 644.34 },
    { name: "Other", amount: 275.5 },
    { name: "Software and services", amount: 67.06 },
    { name: "Payment processing fees", amount: 59.85 },
    { name: "Program fee", amount: 50 },
  ],
  balances: [{ account: "Bank checking (U.S. Bank)", balance: 2812.18, asOf: "2026-10-23" }],
  fetchedAt: "2026-10-24T13:00:00Z",
  live: false,
};

/* ---------- Notion rows → summary (pure, unit-testable) ---------- */

type NotionPage = { properties: Record<string, NotionProperty> };
type NotionProperty = {
  type: string;
  number?: number | null;
  checkbox?: boolean;
  select?: { name: string } | null;
  date?: { start: string } | null;
  title?: { plain_text: string }[];
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export function summarize(
  transactions: NotionPage[],
  balances: NotionPage[],
  fetchedAt: string,
): FinanceSummary {
  const byCategory = new Map<string, number>();
  let through = SEASON_START;
  let since = "";
  for (const page of transactions) {
    const p = page.properties;
    const amount = p.Amount?.number ?? 0;
    const direction = p.Direction?.select?.name;
    const category = p.Category?.select?.name ?? "Not yet categorized";
    const date = p.Date?.date?.start ?? "";
    if (date) {
      if (date > through) through = date;
      if (!since || date < since) since = date;
    }
    if (direction !== "Out" || HIDDEN.has(category)) continue;
    const name = PUBLIC_NAMES[category] ?? category;
    byCategory.set(name, (byCategory.get(name) ?? 0) + Math.abs(amount));
  }
  const categories = [...byCategory]
    .map(([name, amount]) => ({ name, amount: round2(amount) }))
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);
  const total = round2(categories.reduce((s, c) => s + c.amount, 0));

  const shown: FinanceBalance[] = [];
  for (const page of balances) {
    const p = page.properties;
    if (!p["Show on website"]?.checkbox) continue;
    const balance = p.Balance?.number;
    const asOf = p["As of"]?.date?.start;
    const account = p.Account?.title?.map((t) => t.plain_text).join("") ?? "";
    if (balance === null || balance === undefined || !asOf || !account) continue;
    shown.push({ account, balance: round2(balance), asOf });
  }

  return {
    since: since || SEASON_START,
    through,
    total,
    categories,
    balances: shown,
    fetchedAt,
    live: true,
  };
}

/* ---------- Notion fetch with a 15-minute memory cache ---------- */

async function queryAll(
  token: string,
  dataSource: string,
  filter?: unknown,
): Promise<NotionPage[]> {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSource}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page_size: 100,
        ...(filter ? { filter } : {}),
        ...(cursor ? { start_cursor: cursor } : {}),
      }),
    });
    if (!res.ok) throw new Error(`Notion ${res.status} for ${dataSource}`);
    const data = (await res.json()) as {
      results: NotionPage[];
      has_more: boolean;
      next_cursor: string | null;
    };
    pages.push(...data.results);
    cursor = data.has_more && data.next_cursor ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

let cached: { at: number; value: FinanceSummary } | undefined;
let inflight: Promise<FinanceSummary> | undefined;

/** The current figures: live from Notion when a token is set, else the last good read, else the snapshot. */
export async function loadFinance(token: string | undefined): Promise<FinanceSummary> {
  if (!token) return cached?.value ?? SNAPSHOT;
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.value;
  if (!inflight) {
    inflight = (async () => {
      try {
        const [transactions, balances] = await Promise.all([
          queryAll(token, TRANSACTIONS_DS, {
            property: "Direction",
            select: { equals: "Out" },
          }),
          queryAll(token, BALANCES_DS),
        ]);
        const value = summarize(transactions, balances, new Date().toISOString());
        cached = { at: Date.now(), value };
        return value;
      } catch (error) {
        console.error("finance: Notion read failed", error);
        // Keep serving the last good read for a while rather than hammering Notion.
        if (cached) cached.at = Date.now() - CACHE_MS + 60_000;
        return cached?.value ?? SNAPSHOT;
      } finally {
        inflight = undefined;
      }
    })();
  }
  return inflight;
}

/* ---------- Formatting shared by the page ---------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parts(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { y, m, d };
}

/** "23 Oct 2026" */
export function shortDate(iso: string): string {
  const { y, m, d } = parts(iso);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "23 October 2026" */
export function longDate(iso: string): string {
  const { y, m, d } = parts(iso);
  return `${d} ${MONTHS_LONG[m - 1]} ${y}`;
}

/** "17 Jul – 23 Oct 2026" (same year) or "17 Jul 2026 – 3 Jan 2027". */
export function dateRange(fromIso: string, toIso: string): string {
  const a = parts(fromIso);
  const b = parts(toIso);
  if (a.y === b.y) return `${a.d} ${MONTHS[a.m - 1]} – ${b.d} ${MONTHS[b.m - 1]} ${b.y}`;
  return `${shortDate(fromIso)} – ${shortDate(toIso)}`;
}

export const usd2 = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
