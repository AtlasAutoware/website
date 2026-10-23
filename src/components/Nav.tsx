import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import atlasLogo from "@/assets/atlas-logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Car one", to: "/the-car" },
  { label: "Car two", to: "/car-v2" },
  { label: "About", to: "/about" },
] as const;

/** Brand mark + wordmark. The disc mark is inverted in the dark theme (see .aa-brand). */
export function Brand() {
  return (
    <Link to="/" className="aa-brand">
      <img src={atlasLogo} alt="" width={32} height={32} />
      <span>Atlas Autoware</span>
    </Link>
  );
}

/** Dark is the default; the choice is stored under `aa-theme` and applied before paint in __root. */
function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("aa-theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable: the choice lasts for this page view only */
    }
    setIsDark(next);
  };

  return (
    <button
      type="button"
      className="aa-icon-btn"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close the menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Escape closes the menu and returns focus to the menu button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="aa-nav">
      <a href="#main" className="aa-skip">
        Skip to content
      </a>
      <div className="aa-nav__inner">
        <Brand />

        <nav className="aa-nav__links" aria-label="Main">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="aa-nav__link"
              activeOptions={{ exact: to === "/" }}
              activeProps={{ "aria-current": "page" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="aa-nav__actions">
          <ThemeToggle />
          <Link
            to="/donate"
            className="aa-btn aa-btn--primary aa-btn--sm aa-nav__donate"
            activeProps={{ "aria-current": "page" }}
          >
            Donate
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="aa-icon-btn aa-nav__menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="aa-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav id="aa-menu" className="aa-menu" aria-label="Menu" hidden={!menuOpen}>
        {navLinks.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className="aa-menu__link"
            activeOptions={{ exact: to === "/" }}
            activeProps={{ "aria-current": "page" }}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
