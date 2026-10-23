import { Link } from "@tanstack/react-router";
import { Brand } from "@/components/Nav";
import { CONTACT_EMAIL } from "@/lib/meta";

const JOIN_URL =
  "https://atlasautoware.notion.site/Atlas-Autoware-Join-the-Team-40052980035081a59f65e760824601e8";

export function Footer() {
  return (
    <footer className="aa-footer">
      <div className="aa-footer__grid">
        <div className="aa-footer__about">
          <Brand />
          <p>
            A student-run 501(c)(3) nonprofit in Fairfax, Virginia, building{" "}
            <span className="whitespace-nowrap">1/10-scale</span> self-driving race cars.
          </p>
          <address>
            Atlas Autoware
            <br />
            3920 Green Look Court
            <br />
            Fairfax, VA 22033-2725
          </address>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="aa-link">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        <ul className="aa-footer__links" aria-label="Elsewhere">
          <li>
            <a href="https://github.com/AtlasAutoware" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/100594298/" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
          </li>
          <li>
            <a href={JOIN_URL} rel="noopener noreferrer">
              Join the team
            </a>
          </li>
          <li>
            <Link to="/donate" hash="sponsors">
              Our sponsors
            </Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
        </ul>
      </div>
      <div className="aa-footer__legal">
        <p>
          © {new Date().getFullYear()} Atlas Autoware. A 501(c)(3) nonprofit, EIN{" "}
          <span className="whitespace-nowrap">88-3747265</span>. Not affiliated with, endorsed by,
          or sponsored by the Autoware Foundation.
        </p>
      </div>
    </footer>
  );
}
