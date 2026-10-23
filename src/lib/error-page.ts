/**
 * Static fallback served when server rendering itself fails, so it cannot rely on the app's
 * stylesheet. Colours and type mirror the --aa-* tokens in styles.css (dark by default,
 * light when the visitor chose it with the theme toggle).
 */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="utf-8" />
    <title>Something went wrong | Atlas Autoware</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <script>try{if(localStorage.getItem("aa-theme")==="light"){document.documentElement.classList.remove("dark")}}catch(e){}</script>
    <style>
      :root { --bg: #ffffff; --text: #0f172a; --muted: #475569; --subtle: #64748b; --border: rgba(0,0,0,.08); color-scheme: light; }
      .dark { --bg: #030305; --text: #f8fafc; --muted: #94a3b8; --subtle: #7c8799; --border: rgba(255,255,255,.07); color-scheme: dark; }
      * { box-sizing: border-box; }
      body { margin: 0; background: var(--bg); color: var(--text); font: 16px/26px Inter, ui-sans-serif, system-ui, -apple-system, sans-serif; }
      main { max-width: 1152px; margin: 0 auto; padding: 96px 20px; }
      h1 { margin: 0; font: 700 36px/40px "Space Grotesk", ui-sans-serif, system-ui, sans-serif; letter-spacing: -0.01em; }
      p { margin: 24px 0 0; font-size: 18px; line-height: 29px; max-width: 672px; }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
      .btn { display: inline-flex; align-items: center; padding: 10px 18px; border-radius: 8px; border: 1px solid transparent; font: 600 14px/20px Inter, ui-sans-serif, system-ui, sans-serif; text-decoration: none; cursor: pointer; }
      .primary { background: #dc2626; border-color: #dc2626; color: #ffffff; }
      .primary:hover { background: #b91c1c; border-color: #b91c1c; }
      .secondary { background: transparent; border-color: var(--subtle); color: var(--text); }
      .secondary:hover { border-color: var(--text); }
      :focus-visible { outline: 2px solid #dc2626; outline-offset: 3px; }
      @media (min-width: 768px) { main { padding: 128px 32px; } h1 { font-size: 48px; line-height: 52px; } }
    </style>
  </head>
  <body>
    <main>
      <h1>Something went wrong</h1>
      <p>This page did not load. Reload it, or go to the home page.</p>
      <div class="actions">
        <button type="button" class="btn primary" onclick="location.reload()">Reload</button>
        <a class="btn secondary" href="/">Home</a>
      </div>
    </main>
  </body>
</html>`;
}
