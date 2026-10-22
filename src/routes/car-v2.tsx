import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Backdrop, Eyebrow, SectionHeader } from "@/components/Section";
import { SEASON_GOAL, SEASON_RAISED } from "@/components/Fundraising";
import { POST28, Post28Badge } from "@/components/Post28";

import carFrontLeft from "@/assets/car-v2/car-front-left.webp";
import carExploded from "@/assets/car-v2/car-exploded.webp";
import carRearRight from "@/assets/car-v2/car-rear-right.webp";
import carSide from "@/assets/car-v2/car-side.webp";
import carTop from "@/assets/car-v2/car-top.webp";
import driveIso from "@/assets/car-v2/drive-iso.webp";
import brainIso from "@/assets/car-v2/brain-iso.webp";
import infantry29Patch from "@/assets/sponsors/29th-infantry-division.svg";

export const Route = createFileRoute("/car-v2")({
  head: () => ({
    meta: [
      { title: "Car v2 · Atlas Autoware" },
      {
        name: "description",
        content:
          "Atlas Autoware's second car: two custom circuit boards, a built-in battery pack and a 3D-printed carbon-fiber kit, designed by students. Here is the whole car, assembled in renders.",
      },
      { property: "og:title", content: "Car v2 · Atlas Autoware" },
      {
        property: "og:description",
        content:
          "Our second self-driving race car, designed from scratch and assembled in one model: a custom motor controller and battery board, a custom Jetson carrier, a printed carbon-fiber kit and every cable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarV2Page,
});

function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="aa-card overflow-hidden">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="w-full h-auto"
      />
      <figcaption className="px-5 py-4 text-sm text-ink-muted leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}

function Hero() {
  return (
    <section className="relative isolate pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      <Backdrop />
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mx-auto text-center aa-slide-up">
          <Eyebrow>Car v2 · in design</Eyebrow>
          <h1 className="mt-3 text-5xl md:text-6xl font-bold tracking-tight leading-none aa-title-gradient">
            The next car
          </h1>
          <p className="mt-6 aa-lead md:text-xl mx-auto">
            Car one taught us what breaks. For car two we designed the electronics ourselves: a
            motor controller with a built-in battery pack, a custom carrier board for the NVIDIA
            Jetson, and a 3D-printed carbon-fiber kit that holds it all together.
          </p>
          <p className="mt-4 text-sm text-ink-subtle">
            These are renders straight from our design files, not photos. The parts we buy rather
            than make, like the chassis, lidar, camera and Jetson, are simplified stand-ins. We
            haven't ordered the parts yet, and that's what the fundraiser is for.
          </p>
          <a href="#on-the-car" className="aa-badge mt-6">
            <span className="aa-badge__dot" aria-hidden="true" />
            Backed by {POST28.shortName}
          </a>
        </div>

        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="aa-glow-orb -left-10 -top-10" aria-hidden="true" />
          <div className="relative rounded-2xl overflow-hidden border border-line shadow-[0_24px_80px_-24px_rgba(220,38,38,0.35)]">
            <img
              src={carFrontLeft}
              alt="Render of car v2 on its chassis: the printed carbon-fiber deck with side pods, bumper and rear wing, the lidar in the nose, the camera on an arch above it, and a canopy with two Wi-Fi antennas over the circuit boards"
              width={1800}
              height={1200}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="aa-band py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          className="max-w-3xl"
          eyebrow="The renders"
          title="Two boards, one stack, one printed kit."
          lead="The drive board sits on the deck, the Jetson board stacks on top of it, and a printed canopy covers both. Underneath is the Traxxas Slash 4x4 chassis, drawn here as a simplified stand-in."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <Figure
              src={carExploded}
              alt="Exploded render of car v2 with the drive board, the Jetson board and the canopy lifted above the deck to show how they stack"
              caption="Exploded view: the drive board, the Jetson board and the canopy lifted off the deck to show the stack."
              width={1800}
              height={1200}
            />
          </div>
          <Figure
            src={carRearRight}
            alt="Render of car v2 from the rear right"
            caption="From the back: the rear wing, the canopy with its two Wi-Fi antennas, and the camera cable running along the right side pod."
            width={1800}
            height={1200}
          />
          <Figure
            src={carSide}
            alt="Render of car v2 from the right side"
            caption="From the side. The lidar sits low in the nose and the camera rides on the arch above it."
            width={1800}
            height={1200}
          />
          <div className="md:col-span-2">
            <Figure
              src={carTop}
              alt="Render of car v2 from above, nose to the right"
              caption="From above, nose to the right. The Jetson's fan breathes through the grille in the canopy."
              width={1800}
              height={1200}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function WholeCar() {
  const facts = [
    { label: "Printed parts on the car", value: "25, mostly carbon-fiber PETG" },
    { label: "Cable runs in the model", value: "14, each one measured" },
    { label: "Overlaps in the final check", value: "0" },
    { label: "Battery", value: "12 × 18650 cells, about 121 Wh" },
    { label: "Everyday cables", value: "One USB-C, for charging and debugging" },
  ];
  const catches = [
    {
      n: "01",
      title: "The camera plug had nowhere to go",
      desc: "The camera's network jack points at the side of the car, 2 mm from the side pod, with the cooling fan right behind the wall. The fan moved forward, where it now lines up with the motor controller's power stage, and the pod got a slot for the plug.",
    },
    {
      n: "02",
      title: "A cable hole over a bolt",
      desc: "The hole for the steering servo's cable sat on top of the plate that joins two deck pieces, right around one of its bolts. It moved forward into the gap between that plate and a stiffening rib.",
    },
    {
      n: "03",
      title: "The last few parts",
      desc: "A canopy over the electronics, with mounts for two Wi-Fi antennas and a grille for the Jetson's fan, and a stand that holds the car with its wheels off the bench for motor tests.",
    },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="The whole car"
              title="Every part, down to the cables"
              lead="We put the whole car into one model: every printed part, both boards, the battery, the sensors, every plug and every cable run. A script checks every pair of parts for overlaps and measures each cable, so problems show up before anything is printed or ordered."
            />
          </div>
          <div className="lg:col-span-7">
            <dl className="aa-card overflow-hidden">
              {facts.map((f) => (
                <div key={f.label} className="aa-spec-row">
                  <dt className="aa-eyebrow !text-ink-subtle">{f.label}</dt>
                  <dd className="font-medium text-ink text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <p className="mt-16 aa-eyebrow">What putting it all together caught</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {catches.map((c) => (
            <div key={c.n} className="aa-card aa-card--hover p-6 md:p-8">
              <div className="aa-display text-3xl font-bold aa-gradient-text">{c.n}</div>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-3 aa-card__body">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Boards() {
  const drive = [
    "Motor controller (VESC-6 class) built right onto the board",
    "Built-in 4S battery pack with its own protection chip",
    "Charges from a single USB-C cable, which also handles debugging",
    "Soft-start power switch, plus supplies for the steering servo and the lidar",
  ];
  const brain = [
    "Carrier board for the NVIDIA Jetson Orin Nano",
    "Power over Ethernet for the camera",
    "A second Ethernet port just for the lidar",
    "Based on Antmicro's open-source Jetson Orin baseboard",
  ];
  return (
    <section className="aa-band py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="The electronics"
          title="We designed our own circuit boards."
          lead="Car one is a pile of off-the-shelf modules joined by a lot of wiring, and a hardware failure knocked it out of IV 2026. On car two, most of that wiring lives on two boards we laid out ourselves."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <BoardCard
            title="Drive board"
            size="140 × 90 mm, 6 layers"
            src={driveIso}
            alt="Render of the drive board with its four big capacitors, the stack socket and connectors"
            points={drive}
          />
          <BoardCard
            title="Brain board"
            size="120 × 90 mm, 8 layers"
            src={brainIso}
            alt="Render of the brain board, the carrier for the Jetson module; the module itself is not shown"
            points={brain}
          />
        </div>
        <p className="mt-8 text-sm text-ink-subtle">
          Board renders come from KiCad. A few parts have no 3D model and show up as bare pads, and
          the Jetson module and SSD plug in later, so they're not in the picture.
        </p>
      </div>
    </section>
  );
}

function BoardCard({
  title,
  size,
  src,
  alt,
  points,
}: {
  title: string;
  size: string;
  src: string;
  alt: string;
  points: string[];
}) {
  return (
    <div className="aa-card overflow-hidden">
      <img
        src={src}
        alt={alt}
        width={1800}
        height={1184}
        loading="lazy"
        className="w-full h-auto"
      />
      <div className="p-6 md:p-8">
        <div className="aa-eyebrow !text-ink-subtle">{size}</div>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">{title}</h3>
        <ul className="mt-5 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="aa-icon-tile aa-icon-tile--sm mt-0.5">
                <Check aria-hidden="true" />
              </span>
              <span className="text-sm text-ink-muted leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OnTheCar() {
  return (
    <section id="on-the-car" className="py-20 md:py-28 scroll-mt-16">
      <div className="mx-auto max-w-5xl px-6 grid gap-8">
        <div className="aa-card aa-partner p-6 md:p-10 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center">
          <div className="aa-sponsor__logo aa-partner__logo">
            <Post28Badge size="lg" />
          </div>
          <div>
            <SectionHeader
              eyebrow="On the car"
              title="Car two will carry Post 28's name."
              lead={`${POST28.fullName} in ${POST28.place}, gave $${POST28.amount.toLocaleString()} toward car two: the full amount we estimated the car would cost to build. The post marks its 100th anniversary this year, and its name goes on the car when we build it.`}
            />
            <p className="mt-4 text-sm text-ink-subtle">
              Thank you to Commander Michael Hoff and every member of Post 28.{" "}
              <a href={POST28.href} target="_blank" rel="noopener noreferrer" className="aa-link">
                Visit the post
              </a>
              .
            </p>
          </div>
        </div>
        <div className="aa-card p-8 md:p-12 grid gap-10 md:grid-cols-[auto_1fr] items-center">
          <img
            src={infantry29Patch}
            alt="The 29th Infantry Division shoulder patch: a blue and gray taeguk on a round olive-drab border"
            width={200}
            height={200}
            loading="lazy"
            className="mx-auto w-40 h-40 md:w-48 md:h-48"
          />
          <div>
            <SectionHeader
              eyebrow="Also on the car"
              title="Car two will wear the Blue and Gray."
              lead="John Lyon VFW Post 3150 in Arlington asked us to put the shoulder patch of the 29th Infantry Division on car two, and we will. The post's namesake, John Lyon, served in the 29th in World War I. The 29th is a National Guard division based in Northern Virginia. It formed from states that sent soldiers to both sides of the Civil War, which is where its nickname and the two halves of its patch come from."
            />
            <p className="mt-4 text-sm text-ink-subtle">
              The patch isn't in the renders above yet; it goes on the car when we build it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportCTA() {
  return (
    <section className="relative isolate py-20 md:py-28 overflow-hidden">
      <Backdrop dim />
      <div className="mx-auto max-w-7xl px-6 text-center">
        <SectionHeader
          center
          className="max-w-3xl"
          eyebrow="Help us build it"
          title="Help Us Turn Renders into a Real Car"
          lead={
            SEASON_RAISED >= SEASON_GOAL
              ? `Thanks to ${POST28.shortName} and every sponsor on our wall, we've passed our $${SEASON_GOAL.toLocaleString()} goal for the season. Car two's custom circuit boards alone cost about $2,000, so anything more goes toward its parts, a computer to train its AI models, and travel to our next competition. Every sponsor gets photo updates as it comes together.`
              : `Right now car two exists only as design files, and its custom circuit boards alone cost about $2,000. Thanks to ${POST28.shortName} and our other sponsors, we've raised $${SEASON_RAISED.toLocaleString()} of our $${SEASON_GOAL.toLocaleString()} goal this season, for its parts, a computer to train its AI models, and travel to our next competition. Every sponsor gets photo updates as it comes together.`
          }
        />
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/donate" className="aa-btn aa-btn--primary">
            Chip In <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/the-car" className="aa-btn aa-btn--outline">
            See Car One
          </Link>
        </div>
      </div>
    </section>
  );
}

function CarV2Page() {
  return (
    <div className="min-h-screen bg-base text-ink">
      <Nav />
      <main>
        <Hero />
        <Gallery />
        <WholeCar />
        <Boards />
        <OnTheCar />
        <SupportCTA />
      </main>
      <Footer />
    </div>
  );
}
