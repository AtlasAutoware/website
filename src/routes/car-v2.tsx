import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead, Row } from "@/components/Ledger";
import { Figure } from "@/components/Figure";
import { SpecTable } from "@/components/SpecTable";
import { DefList } from "@/components/DefList";
import { CarTwoStack } from "@/components/drawings/CarTwoStack";
import { DriveBoardBlocks } from "@/components/drawings/DriveBoardBlocks";
import { POST28, Post28Badge } from "@/components/Post28";
import { pageHead } from "@/lib/meta";

import carFrontLeft from "@/assets/car-v2/car-front-left.webp";
import carExploded from "@/assets/car-v2/car-exploded.webp";
import carRearRight from "@/assets/car-v2/car-rear-right.webp";
import carSide from "@/assets/car-v2/car-side.webp";
import carTop from "@/assets/car-v2/car-top.webp";
import driveIso from "@/assets/car-v2/drive-iso.webp";
import brainIso from "@/assets/car-v2/brain-iso.webp";
import infantry29Patch from "@/assets/sponsors/29th-infantry-division.svg";

export const Route = createFileRoute("/car-v2")({
  head: () =>
    pageHead({
      path: "/car-v2",
      title: "Car two: two circuit boards we designed",
      description: "Renders and board specs for our second car.",
    }),
  component: CarV2Page,
});

// The pack itself sits off the board in a printed box; its protection chip is on the board.
const DRIVE_BOARD: [string, string][] = [
  ["Motor controller", "VESC-6 class: STM32F405, DRV8323RS, 12 × CSD18510Q5B"],
  ["Battery protection", "BQ7791508, for the 4S3P pack"],
  ["USB-C PD charging", "TPS25751D and BQ25798"],
  ["Main switch", "TPS48111, with soft start"],
  ["Also on the board", "USB hub, CP2102N, INA228, CAN, IMU"],
  ["Outputs", "Servo, fan, lidar"],
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
          meta={["Designed 27 Sep 2026", "Boards funded and being ordered"]}
          title="Car two puts the motor controller and the Jetson carrier on two circuit boards we designed."
        >
          <p className="aa-meta mt-6">
            The pictures here are renders from our design files. Parts we buy are simplified
            stand-ins.
          </p>
        </PageHead>

        <Row variant="wide">
          <Figure
            n={1}
            kind="render"
            caption="Render. Car two from the front left, on a simplified Slash 4x4 chassis."
          >
            <Render
              eager
              src={carFrontLeft}
              alt="Render of car two from the front left: a dark deck with side pods and a rear wing on a four-wheel chassis, the lidar in the nose, the camera on an arch above it, and a canopy with two antennas over the boards."
            />
          </Figure>
        </Row>

        <Row topic title="How it stacks">
          <Figure
            n={2}
            kind="drawing"
            caption="Car two from the side, exploded. The brain board stacks on the drive board through a 2×20 connector. Not to scale."
          >
            <CarTwoStack />
          </Figure>
        </Row>

        {/* Render grid: one 2/3 cell, two stacked 1/3 cells, one full-width cell. Never 2×2. */}
        <Row variant="wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 lg:row-span-2">
              <Figure
                n={3}
                kind="render"
                caption="Render. Exploded view: the boards and the canopy lifted off the deck to show how they stack."
              >
                <Render
                  src={carExploded}
                  alt="Exploded render of car two: the canopy, the brain board and the drive board lifted in a column above the deck, with the camera arch and side pods below."
                />
              </Figure>
            </div>
            <Figure
              n={4}
              kind="render"
              caption="Render. From the rear right, with the camera cable along the side pod."
            >
              <Render
                src={carRearRight}
                alt="Render of car two from the rear right, showing the rear wing, the canopy with two antennas and the camera cable running forward along the right side pod."
              />
            </Figure>
            <Figure
              n={5}
              kind="render"
              caption="Render. From the right side: the lidar sits low in the nose, the camera on the arch above it."
            >
              <Render
                src={carSide}
                alt="Render of car two from the right side, nose to the right: the lidar low in the nose, the camera on an arch above it, and the canopy over the boards in the middle."
              />
            </Figure>
            <div className="lg:col-span-3">
              <Figure
                n={6}
                kind="render"
                caption="Render. From above, nose to the right, with the round grille in the canopy."
              >
                <Render
                  crop="lg:aspect-[2/1] lg:object-cover"
                  src={carTop}
                  alt="Render of car two from above, nose to the right: the deck, the canopy with a round grille, the camera cable looping to the nose, and the four wheels."
                />
              </Figure>
            </div>
          </div>
        </Row>

        <Row topic title="Drive board" meta={["ATLAS-DRV-1", "140 × 90 mm, 6 layers"]}>
          <Figure
            n={7}
            kind="drawing"
            caption="What is on the drive board and how power flows from USB-C to the motor. The pack sits off the board, in a printed box. Not to scale."
          >
            <DriveBoardBlocks />
          </Figure>
          <div className="mt-12">
            <SpecTable columns={["Part", "Detail"]} rows={DRIVE_BOARD} />
          </div>
          <div className="mt-12">
            <Figure
              n={8}
              kind="render"
              caption="Render. The drive board, from our design files. Board renders from KiCad."
            >
              <img
                src={driveIso}
                alt="Render of the drive board from above at an angle: a green board with four large capacitors, a long stacking connector and more connectors along its edges."
                width={1800}
                height={1184}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </Figure>
          </div>
        </Row>

        <Row title="Brain board" meta={["ATLAS-BRN-1", "120 × 90 mm, 8 layers"]}>
          <p className="aa-prose">
            A fork of Antmicro's open-source Jetson Orin baseboard that carries a Jetson Orin Nano
            module. We added Power over Ethernet for the camera and a second Ethernet port (LAN7800)
            for the lidar. It stacks on the drive board through a 2×20 connector.
          </p>
          <div className="mt-12">
            <Figure
              n={9}
              kind="render"
              caption="Render. The brain board, from our design files, without the Jetson module. Board renders from KiCad."
            >
              <img
                src={brainIso}
                alt="Render of the brain board from above at an angle: a green carrier board with the long Jetson module socket in the middle and connectors along its edges; the module itself is not shown."
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
              { term: "Chassis", body: "Traxxas Slash 4x4 (6822)" },
              { term: "Motor", body: "Holmes Hobbies Puller Pro 540, 2200 kV" },
              {
                term: "Battery",
                body: "4S3P pack of 12 Molicel P28A cells in a printed box, about 121 Wh (calculated, not measured)",
              },
              { term: "Lidar", body: "SICK TiM561, donated by SICK" },
              { term: "Camera", body: "LUCID Triton TRI023S-C, donated by LUCID Vision Labs" },
              { term: "Printed parts", body: "25, in PETG-CF, printed on a Bambu Lab P1S" },
            ]}
          />
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

        <Row topic title="Paying for it" meta={["Nothing paid yet as of 23 Oct 2026"]}>
          <p className="aa-prose">
            The boards are funded and being ordered: Post 28's {amount} and about $700 we had on
            hand cover them. Nothing is paid yet as of 23 October 2026. Assembly takes about 30 to
            35 days after payment.
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
