// Render scripts/og.svg to public/og.png (1200×630) with Playwright.
// Usage (from website/): npm i --no-save playwright@1.57.0 && node scripts/og.mjs
// Set CHROMIUM_PATH to use a specific Chromium binary instead of Playwright's own.
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const svg = await readFile(join(here, "og.svg"), "utf8");
const out = join(here, "..", "public", "og.png");

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Space+Grotesk:wght@700&display=block" />
    <style>html, body { margin: 0; background: #030305; } svg { display: block; }</style>
  </head>
  <body>${svg}</body>
</html>`;

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(html, { waitUntil: "domcontentloaded" });

// Wait for the web fonts, but never longer than 10 s (offline or blocked: system fonts).
const fontsReady = await Promise.race([
  page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([
      document.fonts.load('700 72px "Space Grotesk"'),
      document.fonts.load('400 28px "Inter"'),
    ]);
    return (
      document.fonts.check('700 72px "Space Grotesk"') && document.fonts.check('400 28px "Inter"')
    );
  }),
  new Promise((resolve) => setTimeout(() => resolve(false), 10_000)),
]);
const webFontsLoaded = await page.evaluate(() =>
  [...document.fonts].some((f) => f.family.includes("Space Grotesk") && f.status === "loaded"),
);
if (!fontsReady || !webFontsLoaded) {
  console.warn(
    "og.mjs: Google Fonts did not load (offline?); rendering with installed system fonts.",
  );
}

await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log(`og.mjs: wrote ${out}`);
