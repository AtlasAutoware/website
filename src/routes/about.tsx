import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead, Row } from "@/components/Ledger";
import { Figure } from "@/components/Figure";
import { Notes } from "@/components/Notes";
import { DefList } from "@/components/DefList";
import { OrgDiagram } from "@/components/drawings/OrgDiagram";
import { CONTACT_EMAIL, pageHead } from "@/lib/meta";

const JOIN_URL =
  "https://atlasautoware.notion.site/Atlas-Autoware-Join-the-Team-40052980035081a59f65e760824601e8";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "About Atlas Autoware",
      description: "Who runs it, how it connects to TJHSST, its history and how to join.",
    }),
  component: AboutPage,
});

const GOVERNANCE = [
  { term: "Legal name", body: "AtlasAutoware. We go by Atlas Autoware." },
  { term: "Formed", body: "Virginia nonstock corporation, 5 Aug 2022." },
  {
    term: "Tax status",
    body: "501(c)⁠(3) public charity under 509(a)(2). IRS determination letter dated 26 Aug 2022; listed in IRS Pub 78.",
  },
  { term: "EIN", body: "88-3747265" },
  { term: "Filings", body: "Fiscal year July to June. Files Form 990-N." },
  {
    term: "PayPal Giving Fund",
    body: (
      <>
        Listed as a{" "}
        <a
          href="https://www.paypal.com/fundraiser/charity/4692391"
          className="aa-link"
          rel="noopener noreferrer"
        >
          confirmed charity
        </a>
        .
      </>
    ),
  },
  { term: "Paperwork", body: "W-9 and receipts on request." },
];

const PROGRAM = [
  {
    term: "TJHSST Computer Systems Research Lab",
    body: "Senior research on car one runs here, including Eshan Iyer's paper of 23 Sep 2026.",
  },
  {
    term: "TJ Self-Driving Cars club",
    body: "The club at TJHSST through which members work on the cars. Eshan Iyer is its president.",
  },
  {
    term: "George Mason University",
    body: "Our lab sponsor. There is no permanent loop track at school yet, so we plan our track work at a GMU lab.",
  },
];

const TOOLS = [
  { term: "Circuit boards", body: "KiCad" },
  { term: "Car software", body: "ROS 2, VESC Tool, Python, C++, Docker" },
  { term: "Machine learning", body: "PyTorch and Ultralytics, ONNX Runtime, TensorRT" },
  {
    term: "Compute",
    body: "The team JupyterHub (one RTX A4500) and the TJ CSL cluster",
  },
  {
    term: "Bench",
    body: "A Hakko soldering station, Andonstar and Dino-Lite microscopes, and a Bambu Lab P1S that prints car two's parts in PETG-CF",
  },
];

const HISTORY = [
  {
    date: "2022-08-05",
    label: "5 Aug 2022",
    title: "Incorporated in Virginia",
    body: "Founded by Manav Gagvani and Adi Desai as a nonstock corporation. The IRS exemption is effective the same day.",
  },
  {
    date: "2022-08-26",
    label: "26 Aug 2022",
    title: "IRS determination letter",
    body: "A 501(c)⁠(3) public charity under 509(a)(2).",
  },
  {
    // Wording verified by the team (Oct 2026): keep it exact.
    date: "2022",
    label: "2022",
    title: "8th at IGVC 2022",
    body: "Against college teams.",
  },
  {
    date: "2024",
    label: "2024",
    title: "A car that followed a wall",
    body: "An earlier TJHSST Senior Research project left the 1/10-scale car following a hallway wall.",
  },
  {
    // Wording verified by the team (Oct 2026): keep it exact.
    date: "2026-06-22",
    label: "22–25 Jun 2026",
    title: "IEEE IV 2026 in Detroit",
    body: "A hardware failure stopped the car before the finish, our first DNF.",
    href: "https://ieee-iv.org/2026/",
  },
  {
    date: "2026-07",
    label: "Jul–Aug 2026",
    title: "Car one rebuilt",
    body: "Around a VESC motor controller and a sensored motor.",
    href: "/the-car",
  },
  {
    date: "2026-09-23",
    label: "23 Sep 2026",
    title: "Research paper finished",
    body: "“AtlasAutoware: Real-Time On-Vehicle Neural Network Inference for Autonomous 1/10-Scale Racing.”",
    byline: "Eshan Iyer",
  },
  {
    date: "2026-09-27",
    label: "27 Sep 2026",
    title: "Car two designed",
    href: "/car-v2",
  },
  {
    date: "2026-10-22",
    label: "22 Oct 2026",
    title: "American Legion Post 28's gift",
    body: "$2,060 for car two's circuit boards.",
    href: "/car-v2#names",
  },
];

const CONTACT = [
  {
    term: "Email",
    body: (
      <a href={`mailto:${CONTACT_EMAIL}`} className="aa-link">
        {CONTACT_EMAIL}
      </a>
    ),
  },
  {
    term: "Phone",
    body: (
      <a href="tel:+17033573347" className="aa-link whitespace-nowrap">
        703-357-3347
      </a>
    ),
  },
  {
    term: "Mail",
    body: (
      <>
        Atlas Autoware
        <br />
        3920 Green Look Court
        <br />
        Fairfax, VA 22033-2725
      </>
    ),
  },
  {
    term: "GitHub",
    body: (
      <a href="https://github.com/AtlasAutoware" className="aa-link" rel="noopener noreferrer">
        github.com/AtlasAutoware
      </a>
    ),
  },
  {
    term: "LinkedIn",
    body: (
      <a
        href="https://www.linkedin.com/company/100594298/"
        className="aa-link"
        rel="noopener noreferrer"
      >
        Atlas Autoware on LinkedIn
      </a>
    ),
  },
];

function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="aa-page">
        <PageHead
          title={
            <>
              Atlas Autoware is a <span className="whitespace-nowrap">student-run</span> 501(c)⁠(3)
              in Fairfax, Virginia.
            </>
          }
          lead="It was founded by Manav Gagvani and Adi Desai and incorporated in Virginia in August 2022. Its president is Eshan Iyer, a TJHSST senior. At Thomas Jefferson High School for Science and Technology our work runs through the Computer Systems Research Lab and the TJ Self-Driving Cars club. No one is paid."
        />

        {/* Inverted ledger: governance facts fill the side column beside the org drawing. */}
        <Row
          title="How it fits together"
          side={
            <div className="mt-6">
              <DefList items={GOVERNANCE} />
            </div>
          }
        >
          <Figure
            n={1}
            kind="drawing"
            caption="How Atlas Autoware, TJHSST, George Mason University and our sponsors connect."
          >
            <OrgDiagram />
          </Figure>
          <div className="aa-prose mt-6">
            <p>
              A three-member student board governs the nonprofit. The TJ Self-Driving Cars club has
              a faculty sponsor at TJHSST.
            </p>
            <p>
              Atlas Autoware is not affiliated with, endorsed by, or sponsored by the Autoware
              Foundation.
            </p>
          </div>
        </Row>

        <Row topic title="The program">
          <DefList items={PROGRAM} />
        </Row>

        <Row title="Join the team">
          <p className="aa-prose">
            The club is open to any TJHSST student, and older members teach newer ones. We meet 8th
            period, Wednesday B block.
          </p>
          <div className="mt-6">
            <a href={JOIN_URL} className="aa-btn aa-btn--primary" rel="noopener noreferrer">
              Join the team
            </a>
          </div>
        </Row>

        <Row title="What you work with">
          <DefList items={TOOLS} />
        </Row>

        <Row
          topic
          title="History"
          // Wording verified by the team (Oct 2026): keep it exact.
          meta={[
            "~20 of us on the team",
            "2 competitions entered so far",
            "Next: a RoboRacer round in Boston",
          ]}
        >
          <Notes items={HISTORY} />
        </Row>

        <Row topic title="Giving">
          <p className="aa-prose">
            Gifts are tax-deductible. You can give by PayPal, through the PayPal Giving Fund, from a
            donor-advised fund, with an employer match or by check. The donate page has the details
            and the state notice that applies to each of them.
          </p>
          <div className="mt-6">
            <Link to="/donate" className="aa-btn aa-btn--primary">
              Donate
            </Link>
          </div>
        </Row>

        <Row title="Contact">
          <DefList items={CONTACT} />
        </Row>
      </main>
      <Footer />
    </>
  );
}
