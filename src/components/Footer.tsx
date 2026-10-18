import { Link } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Brand } from "@/components/Nav";

export function Footer() {
  return (
    <footer className="aa-footer">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 mb-3 max-w-sm text-sm leading-relaxed text-ink-subtle">
            A student-led autonomous vehicle team based in Northern Virginia, made up of students
            from TJHSST. We design, build, and program our self-driving car from the ground up.
          </p>
          <p className="text-xs text-ink-subtle">
            A 501(c)(3) nonprofit organization · EIN 88-3747265
          </p>
        </div>

        <div>
          <p className="aa-footer__head">Explore</p>
          <div className="aa-footer__links">
            <Link to="/home">Home</Link>
            <Link to="/the-car">The Car</Link>
            <Link to="/car-v2">Car v2</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/donate" hash="sponsors">
              Our Sponsors
            </Link>
          </div>
        </div>

        <div>
          <p className="aa-footer__head">Connect</p>
          <div className="aa-footer__links">
            <a href="mailto:contact@atlasautoware.org">
              <Mail aria-hidden="true" /> contact@atlasautoware.org
            </a>
            <a
              href="https://www.instagram.com/atlasautoware/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram aria-hidden="true" /> Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/100594298/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin aria-hidden="true" /> LinkedIn
            </a>
            <a href="https://github.com/AtlasAutoware" target="_blank" rel="noopener noreferrer">
              <Github aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-6 py-5 text-xs leading-relaxed text-ink-subtle">
          © {new Date().getFullYear()} Atlas Autoware ·{" "}
          <Link to="/privacy" className="aa-link">
            Privacy Policy
          </Link>{" "}
          · Not affiliated with, endorsed by, or sponsored by the Autoware Foundation.
        </p>
      </div>
    </footer>
  );
}
