<div align="center">

# About Atlas Autoware

Atlas Autoware is a student-run 501(c)(3) nonprofit in Fairfax, Virginia. We design, build and program 1/10-scale self-driving race cars.

## Donate?

See [atlasautoware.org/donate](https://atlasautoware.org/donate) or contact us at contact@atlasautoware.org.

---

**Built by Atlas Autoware students**

</div>

## Working on the site

The site is a [TanStack Start](https://tanstack.com/start) app (React 19, Vite, Tailwind CSS 4,
TypeScript). Pages live in `src/routes/`, shared components in `src/components/`, the technical
drawings in `src/components/drawings/`, and all styles and colour tokens in `src/styles.css`.

```sh
npm install
npm run dev      # dev server; Vite prints the local URL
npm run build    # output in dist/
npm run lint     # eslint
npx tsc --noEmit # type check
```

It deploys on Vercel: `vercel.json` serves the static files from `dist/client` and sends every
other request to the server handler in `api/index.ts`.

## Social preview image

`public/og.png` (1200×630) is the Open Graph / Twitter image linked from `src/routes/__root.tsx`.
It is rendered from `scripts/og.svg`; the car in it is the same drawing as
`src/components/drawings/CarGlyph.tsx`, so change both together. Playwright is not a project
dependency, so install it for the run without saving it:

```sh
npm i --no-save playwright@1.57.0 && npx playwright install chromium
node scripts/og.mjs
CHROMIUM_PATH=/path/to/chrome node scripts/og.mjs   # or use a Chromium you already have
```

The script loads Inter and Space Grotesk from Google Fonts; if they cannot be reached it prints a
warning and falls back to installed system fonts. Commit the resulting `public/og.png`.

## The "Spent so far" figures on /donate

They are read live from the Spending dashboard in Notion (Operations > Spending dashboard), by the
server function in `src/routes/donate.tsx` through `src/lib/finance.ts`: money out summed by
Category from the Transactions data source, and any Balances row with "Show on website" ticked.
Results are cached in the Worker for 15 minutes, and only category totals and the balance leave
Notion. The Worker reads the secret `NOTION_TOKEN` (an internal Notion integration with read
access to that page; set it under the Worker's Settings > Variables and Secrets). Without the
secret, or when Notion cannot be reached, the page shows `SNAPSHOT` from `src/lib/finance.ts`;
refresh that snapshot by hand if the live feed is off for long.
