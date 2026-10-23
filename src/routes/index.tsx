import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Row } from "@/components/Ledger";
import { Figure } from "@/components/Figure";
import { SpecTable } from "@/components/SpecTable";
import { Notes } from "@/components/Notes";
import { DrivePipeline } from "@/components/drawings/DrivePipeline";
import { FundraisingProgress } from "@/components/Fundraising";
import { Post28Thanks } from "@/components/Post28";
import { SponsorWall } from "@/components/SponsorWall";
import { CONTACT_EMAIL, pageHead } from "@/lib/meta";
import carLab from "@/assets/atlas-car-lab.webp";

const JOIN_URL =
  "https://atlasautoware.notion.site/Atlas-Autoware-Join-the-Team-40052980035081a59f65e760824601e8";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: "Atlas Autoware: student-built self-driving race cars",
      description:
        "A student-run 501(c)(3) in Fairfax, Virginia, building 1/10-scale autonomous race cars.",
    }),
  component: HomePage,
});

/* ---------- Hero: the real car and real numbers, photo bleeding off the right edge ---------- */

function Hero() {
  return (
    <section className="aa-hero" aria-labelledby="hero-title">
      <div className="aa-hero__text">
        <h1 id="hero-title" className="aa-h1">
          We build <span className="whitespace-nowrap">1/10-scale</span>{" "}
          <span className="whitespace-nowrap">self-driving</span> race cars in Fairfax, Virginia.
        </h1>
        <p className="aa-lead">
          Atlas Autoware is a student-run 501(c)⁠(3). Car one runs on an NVIDIA Jetson Orin Nano
          Super and is driven from a browser while we bring its learned driving policy from
          simulation to the car. Car two is designed; its boards are funded and being ordered.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/the-car" className="aa-btn aa-btn--primary">
            How car one works
          </Link>
          <Link to="/donate" className="aa-btn aa-btn--secondary">
            Donate
          </Link>
        </div>
      </div>

      <div className="aa-hero__media">
        <Figure
          n={1}
          kind="photo"
          caption="Car one in the lab, with the OAK-D Pro camera and the lidar on top."
        >
          <img
            src={carLab}
            alt="Car one, a 1/10-scale Traxxas Slash, on a lab bench. A Luxonis OAK-D Pro camera faces forward on top of the electronics deck, with the round RPLIDAR C1 lidar behind it."
            width={1204}
            height={677}
            fetchPriority="high"
            decoding="async"
          />
        </Figure>
      </div>

      <div className="aa-hero__specs">
        <SpecTable
          rows={[
            ["Chassis", "Traxxas Slash, 1/10"],
            ["Computer", "NVIDIA Jetson Orin Nano Super"],
            ["Lidar", "Slamtec RPLIDAR C1, 360°, 10 Hz"],
            ["Camera", "Luxonis OAK-D Pro"],
            ["Status", "Driven from a browser; the learned policy has run in simulation only"],
          ]}
        />
      </div>
    </section>
  );
}

/* ---------- Founder's note ---------- */

function FounderNote() {
  return (
    <Row variant="headless" title="From the founder">
      <div className="aa-prose">
        {/* The IV 2026 clause is verified wording: keep it exact. */}
        <p>
          In June, at IEEE IV 2026 in Detroit, a hardware failure stopped the car before the finish,
          our first DNF. Over July and August we rebuilt car one around a VESC motor controller and
          a sensored motor. On 27 September we finished designing car two, and on 22 October
          American Legion Post 28 gave $2,060 for its two circuit boards. Next is a RoboRacer round
          in Boston.
        </p>
      </div>
      <p className="aa-meta mt-6">
        Eshan Iyer, Founder
        <br />
        <time dateTime="2026-10-23">23 Oct 2026</time>
      </p>
    </Row>
  );
}

/* ---------- Dated log, newest first ---------- */

const LOG = [
  {
    date: "2026-10-22",
    label: "22 Oct 2026",
    title: "Post 28's check",
    body: "American Legion Post 28 gave $2,060 for car two's circuit boards. We raised our season goal to $7,500.",
    href: "/car-v2#names",
  },
  {
    date: "2026-09-29",
    label: "29 Sep 2026",
    title: "Board files for car two",
    body: "We generated the manufacturing files for both of car two's circuit boards and sent Post 28 a build estimate.",
    href: "/car-v2",
  },
  {
    date: "2026-09-27",
    label: "27 Sep 2026",
    title: "Car two designed",
    body: "We finished the design and sent our September newsletter.",
    href: "/email/2026-09-car2/newsletter.html",
  },
  {
    date: "2026-09-23",
    label: "23 Sep 2026",
    title: "Paper finished",
    body: "“AtlasAutoware: Real-Time On-Vehicle Neural Network Inference for Autonomous 1/10-Scale Racing”, senior research in the TJHSST Computer Systems Research Lab.",
    byline: "Eshan Iyer",
  },
  {
    date: "2026-07",
    label: "Jul–Aug 2026",
    title: "Car one rebuilt",
    body: "We rebuilt it around a Flipsky FSESC 6.7 Pro motor controller and a sensored Castle Creations 1415 motor.",
    href: "/the-car",
  },
  {
    // Wording verified by the team (Oct 2026): keep it exact.
    date: "2026-06-22",
    label: "22–25 Jun 2026",
    title: "IEEE IV 2026, Detroit",
    body: "A hardware failure stopped the car before the finish, our first DNF.",
    href: "https://ieee-iv.org/2026/",
  },
  {
    // Wording verified by the team (Oct 2026): keep it exact.
    date: "2022",
    label: "2022",
    title: "8th at IGVC",
    body: "Against college teams.",
  },
];

/* ---------- Page ---------- */

function HomePage() {
  return (
    <>
      <Nav />
      <main id="main" className="aa-page">
        <Hero />

        <FounderNote />

        <Post28Thanks />

        <Row title="Log" meta={["Newest first"]}>
          <Notes items={LOG} />
        </Row>

        <Row
          topic
          title="How the car is meant to drive"
          side={
            <p>
              When the learned policy runs, it reads the lidar, camera and the car's own motion and
              picks a speed and steering angle ten times a second. On the car's Jetson it takes 1.84
              ms per step. So far it has driven only in simulation; wheels-off bench tests are next.
            </p>
          }
        >
          <Figure
            n={2}
            kind="drawing"
            caption="One control step, from sensors to motor and steering. Timings measured on the car's Jetson; the policy has not yet driven the car on the floor."
          >
            <DrivePipeline />
          </Figure>
        </Row>

        <Row title="Two cars">
          <SpecTable
            stack
            even
            columns={["", "Car one", "Car two"]}
            caption="As of October 2026"
            rows={[
              [
                "Status",
                "Rebuilt Jul–Aug 2026",
                "Designed 27 Sep 2026; boards funded and being ordered",
              ],
              ["Chassis", "Traxxas Slash", "Traxxas Slash 4x4"],
              ["Motor", "Castle Creations 1415", "Holmes Hobbies Puller Pro 540"],
              [
                "Computer",
                "Jetson Orin Nano Super",
                "Jetson Orin Nano on our own carrier board, forked from Antmicro's open-source baseboard",
              ],
              ["Lidar", "Slamtec RPLIDAR C1", "SICK TiM561, donated by SICK"],
              ["Camera", "Luxonis OAK-D Pro", "LUCID Triton TRI023S-C, donated by LUCID"],
              ["Power", "LiPo plus a power bank", "Built-in 4S3P pack, 12 Molicel P28A cells"],
            ]}
          />
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/the-car" className="aa-link">
              Car one in detail
            </Link>
            <Link to="/car-v2" className="aa-link">
              Car two in detail
            </Link>
          </p>
        </Row>

        <Row topic band title="This season" meta={["Goal raised to $7,500 on 22 Oct 2026"]}>
          <FundraisingProgress />
          <div className="mt-6">
            <Link to="/donate" className="aa-btn aa-btn--primary">
              Donate
            </Link>
          </div>
        </Row>

        <Row variant="headless" title="Any TJHSST student can join">
          <p className="aa-prose">
            We meet 8th period, Wednesday B block. Questions:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="aa-link">
              {CONTACT_EMAIL}
            </a>{" "}
            or{" "}
            <a href="tel:+17033573347" className="aa-link whitespace-nowrap">
              703-357-3347
            </a>
            .
          </p>
          <div className="mt-6">
            <a href={JOIN_URL} className="aa-btn aa-btn--primary" rel="noopener noreferrer">
              Join the team
            </a>
          </div>
        </Row>

        <SponsorWall />
      </main>
      <Footer />
    </>
  );
}
