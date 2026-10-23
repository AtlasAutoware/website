import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import { CarGlyph } from "@/components/drawings/CarGlyph";
import { Footer } from "@/components/Footer";
import { PageHead } from "@/components/Ledger";
import { Nav } from "@/components/Nav";
import { SITE_URL } from "@/lib/meta";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <>
      <Nav />
      <main id="main" className="aa-page aa-status">
        <PageHead title="Page not found" lead="There is nothing at this address.">
          <CarGlyph className="aa-status__glyph" />
          <div className="aa-status__actions">
            <Link to="/" className="aa-btn aa-btn--primary">
              Go to the home page
            </Link>
          </div>
        </PageHead>
      </main>
      <Footer />
    </>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <>
      <Nav />
      <main id="main" className="aa-page aa-status">
        <PageHead title="Something went wrong" lead="This page did not load.">
          <div className="aa-status__actions">
            <button
              type="button"
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="aa-btn aa-btn--primary"
            >
              Reload
            </button>
            <Link to="/" className="aa-btn aa-btn--secondary">
              Home
            </Link>
          </div>
        </PageHead>
      </main>
      <Footer />
    </>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Site-wide tags only; each route adds its own title, description, og:url and canonical
  // through pageHead() in lib/meta.ts. The title here is the fallback for the 404 page.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#030305" },
      { title: "Atlas Autoware" },
      { property: "og:site_name", content: "Atlas Autoware" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/og.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Line drawing of a 1/10-scale race car with the words Atlas Autoware",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og.png` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const THEME_SCRIPT = `try{if(localStorage.getItem("aa-theme")==="light"){document.documentElement.classList.remove("dark")}}catch(e){}`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Dark is the default; apply a saved light preference before paint so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
