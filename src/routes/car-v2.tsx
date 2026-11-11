import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead, Row } from "@/components/Ledger";
import { Figure } from "@/components/Figure";
import { SpecTable } from "@/components/SpecTable";
import { DefList } from "@/components/DefList";
import { POST28, Post28Badge } from "@/components/Post28";
import { pageHead } from "@/lib/meta";

import carFrontLeft from "@/assets/car-v2/car-front-left.webp";
import carExploded from "@/assets/car-v2/car-exploded.webp";
import carRearRight from "@/assets/car-v2/car-rear-right.webp";
import carSide from "@/assets/car-v2/car-side.webp";
import carTop from "@/assets/car-v2/car-top.webp";
import powerIso from "@/assets/car-v2/power-iso.webp";
import infantry29Patch from "@/assets/sponsors/29th-infantry-division.svg";

export const Route = createFileRoute("/car-v2")({
  head: () =>
    pageHead({
      path: "/car-v2",
      title: "Car 1 v2: car one rebuilt, with one circuit board we designed",
      description: "Renders and specs for car 1 v2, the rebuild of our car.",
    }),
  component: CarV2Page,
});

// Stage 1 leaves the charging modules and the camera regulator off the board; they are not listed.
const POWER_BOARD: [string, string][] = [
  ["E-stop", "A hardware loop into an AND gate, with no firmware in the path"],
  ["Main switch", "Motor-bus switch with precharge"],
  ["Supervisor", "Raspberry Pi Pico"],
  ["Feeds", "Jetson, lidar, camera, servo, fan"],
  ["Laptop debugging", "USB hub: the Jetson, the ESC and the serial console on one cable"],
  ["Assembly", "Soldered by hand by students at school"],
];

/** A render: 1800 × 1200 from the design files. Bought parts are simplified stand-ins. */
function Render({
  src,
  alt,
  eager,
  crop,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  /** Extra layout classes, e.g. a wide crop for the full-width top view. */
  crop?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={1800}
      height={1200}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={["block h-auto w-full", crop].filter(Boolean).join(" ")}
    />
  );
}

function CarV2Page() {
  const amount = `$${POST28.amount.toLocaleString("en-US")}`;
  return (
    <>
      <Nav />
      <main id="main" className="aa-page">
        <PageHead
          meta={["Redesigned 9 Nov 2026", "Nothing ordered or built yet"]}
          title="Car two is now car 1 v2: car one rebuilt on a four-wheel-drive chassis, with one circuit board that students solder by hand."
        >
          <p className="aa-meta mt-6">
            We have one car, so the car we called car two is a rebuild of car one, not a second car.
            The pictures here are renders from our design files. Parts we buy are simplified
            stand-ins. The battery, its protection board, the fuse and the cables are not drawn yet.
          </p>
        </PageHead>

        <Row variant="wide">
          <Figure
            n={1}
            kind="render"
            caption="Render. Car 1 v2 from the front left, on a simplified Slash 4x4 chassis."
          >
            <Render
              eager
              src={carFrontLeft}
              alt="Render of car 1 v2 from the front left: a dark deck with side pods on a four-wheel chassis, a round lidar low in the nose, a bar-shaped stereo camera on an arch above it, and a flat canopy over the Jetson computer."
            />
          </Figure>
        </Row>

        {/* Render grid: one 2/3 cell, two stacked 1/3 cells, one full-width cell. Never 2×2. */}
        <Row variant="wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 lg:row-span-2">
              <Figure
                n={2}
                kind="render"
                caption="Render. Exploded view. The power board sits on the deck, the Jetson on its carrier sits on a printed tray above it, and a canopy covers both. The power board is drawn bare here; figure 6 shows its parts."
              >
                <Render
                  src={carExploded}
                  alt="Exploded render of car 1 v2: the canopy, the Jetson on its tray and the power board lifted in a column above the deck, with the camera arch, the lidar and the side pods below."
                />
              </Figure>
            </div>
            <Figure n={3} kind="render" caption="Render. From the rear right.">
              <Render
                src={carRearRight}
                alt="Render of car 1 v2 from the rear right, showing the E-stop bracket on the tail, the motor controller on the rear deck, the canopy over the Jetson and the camera on its arch at the front."
              />
            </Figure>
            <Figure
              n={4}
              kind="render"
              caption="Render. From the right side: the lidar sits low in the nose, the camera on the arch above it."
            >
              <Render
                src={carSide}
                alt="Render of car 1 v2 from the right side, nose to the right: the lidar low in the nose, the camera on an arch above it, and the canopy over the Jetson in the middle."
              />
            </Figure>
            <div className="lg:col-span-3">
              <Figure n={5} kind="render" caption="Render. From above, nose to the right.">
                <Render
                  crop="lg:aspect-[2/1] lg:object-cover"
                  src={carTop}
                  alt="Render of car 1 v2 from above, nose to the right: the deck, the canopy with its vent grille, the motor controller behind it, the camera and lidar at the nose, and the four wheels."
                />
              </Figure>
            </div>
          </div>
        </Row>

        <Row topic title="Power board" meta={["ATLAS-PWR-1", "130 × 84 mm, 4 layers"]}>
          <p className="aa-prose">
            This is the only board we designed for the car. It switches the motor's power, cuts it
            when the E-stop opens, and feeds the Jetson, the sensors and the servo from one battery.
            The Jetson stays on NVIDIA's developer-kit carrier and the motor controller is one we
            already own.
          </p>
          <div className="mt-12">
            <SpecTable columns={["Part", "Detail"]} rows={POWER_BOARD} />
          </div>
          <div className="mt-12">
            <Figure
              n={6}
              kind="render"
              caption="Render. The power board with its parts, from our design files. Board render from KiCad."
            >
              <img
                src={powerIso}
                alt="Render of the power board from above at an angle: a dark green board with three blue capacitors and a row of upright transistors along the back, a long two-row header along the front, and smaller parts and connectors across the rest."
                width={1800}
                height={1184}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </Figure>
          </div>
        </Row>

        <Row title="What else goes on it">
          <DefList
            items={[
              { term: "Chassis", body: "Traxxas Slash 4x4" },
              { term: "Motor", body: "Holmes Hobbies Puller Pro 540, 2200 kV" },
              { term: "Servo", body: "INJORA INJS235" },
              { term: "Motor controller", body: "Flipsky FSESC, running VESC firmware" },
              {
                term: "Computer",
                body: "Jetson Orin Nano on NVIDIA's developer-kit carrier",
              },
              { term: "Lidar", body: "Slamtec RPLIDAR C1, moved over from car one" },
              { term: "Camera", body: "Luxonis OAK-D Pro, moved over from car one" },
              {
                term: "Battery",
                body: "One 4S LiPo behind a smart BMS and a 100 A fuse",
              },
              { term: "Printed parts", body: "PETG-CF, printed on a Bambu Lab P1S" },
            ]}
          />
          <p className="aa-prose mt-6">
            The SICK TiM561 lidar that SICK donated and the LUCID Triton camera that LUCID Vision
            Labs donated are kept for a later upgrade. Their mounts use the same holes as the mounts
            on the car now, so they can be swapped in later.
          </p>
        </Row>

        <Row title="The September design">
          <p className="aa-prose">
            The first design, finished on 27 September 2026, put the motor controller and the Jetson
            carrier on two boards of our own (ATLAS-DRV-1 and ATLAS-BRN-1). We set it aside in
            October to cut the cost of the boards. Its files are kept.
          </p>
        </Row>

        <Row id="names" topic title="Names on the car">
          <div className="aa-partner grid items-center gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="aa-sponsor__logo aa-partner__logo">
              <Post28Badge size="lg" />
            </div>
            <div>
              <p className="aa-partner__name">{POST28.fullName}</p>
              <p className="aa-meta">{POST28.place}</p>
              <p className="aa-prose mt-6">
                The post gave {amount}, exactly the build estimate we sent the post on 29 September.
                It pays for car two's two circuit boards. 2026 is the post's 100th-anniversary year,
                and its name goes on car two. Thank you to Commander Michael Hoff.
              </p>
              <p className="mt-6">
                <a href={POST28.href} target="_blank" rel="noopener noreferrer" className="aa-link">
                  Visit Post 28
                </a>
              </p>
            </div>
          </div>
          <div className="mt-12 grid items-center gap-6 md:grid-cols-[auto_1fr]">
            <img
              src={infantry29Patch}
              alt="The 29th Infantry Division shoulder patch: a blue and gray taeguk inside an olive-drab ring."
              width={120}
              height={120}
              loading="lazy"
              className="h-24 w-24"
            />
            <p className="aa-prose">
              At John Lyon VFW Post 3150's request, car two will also carry the 29th Infantry
              Division patch.
            </p>
          </div>
        </Row>

        <Row topic title="Paying for it" meta={["Nothing ordered or paid as of 9 Nov 2026"]}>
          <p className="aa-prose">
            Post 28 gave {amount} for this car's circuit boards. The redesign needs one board
            instead of two. Nothing has been ordered or paid for as of 9 November 2026.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/donate" className="aa-btn aa-btn--primary">
              Donate
            </Link>
            <Link to="/the-car" className="aa-btn aa-btn--secondary">
              See car one
            </Link>
          </div>
        </Row>
      </main>
      <Footer />
    </>
  );
}
