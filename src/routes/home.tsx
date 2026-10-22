import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  MapPin,
  Route as RouteIcon,
  Car,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Backdrop, Eyebrow, SectionHeader } from "@/components/Section";
import { SponsorWall } from "@/components/SponsorWall";
import { FundraisingProgress } from "@/components/Fundraising";
import { Post28Thanks } from "@/components/Post28";

import rcCarPhoto from "@/assets/rc-car.png";
import carCutout from "@/assets/atlas-car-cutout.webp";
import buildPhoto from "@/assets/car-build-bench.webp";
import chassisPhoto from "@/assets/car-chassis-topdown.webp";
import teamPhoto from "@/assets/2025_Team.png";
import carV2Render from "@/assets/car-v2/car-front-left.webp";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      {
        property: "og:title",
        content: "Atlas Autoware — Building the Future of Autonomous Mobility",
      },
    ],
  }),
  component: HomePage,
});

/* ---------- Hero ---------- */

function Hero() {
  const chips = [
    { title: "Computer Vision", meta: "OpenCV · YOLO" },
    { title: "Embedded Systems", meta: "Jetson · Arduino" },
    { title: "Artificial Intelligence", meta: "PyTorch · TF" },
    { title: "Autonomous Driving", meta: "ROS · Sensor Fusion" },
    { title: "LiDAR lock", meta: "360° scan · 20 Hz" },
    { title: "32 fps vision", meta: "Stereo camera pipeline" },
    { title: "Path clear", meta: "Planner · obstacle-free" },
    { title: "~20 of us", meta: "on the team" },
    { title: "2 competitions", meta: "entered so far" },
    { title: "8th at IGVC 2022", meta: "against college teams" },
    { title: "Car #2", meta: "in the works now" },
  ];

  const [chipIdx, setChipIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setChipIdx((i) => (i + 1) % chips.length), 6400);
    return () => clearInterval(id);
  }, [chips.length]);
  const chip = chips[chipIdx];

  return (
    <section id="top" className="relative isolate min-h-screen pt-24 overflow-hidden">
      <Backdrop />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-20 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 aa-slide-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.04] text-ink">
            We're high schoolers
            <br />
            <span className="aa-gradient-text">building a car</span>
            <br />
            that drives itself.
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-ink-muted leading-relaxed">
            Atlas Autoware is a student team out of Northern Virginia. We started in a basement with
            a beat-up chassis and a pile of sensors, and we've been teaching it to drive ever since.
            No professional engineers, just us, after school and most weekends.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/donate" className="aa-btn aa-btn--primary">
              Chip In <ArrowRight aria-hidden="true" />
            </Link>
            <a href="#projects" className="aa-btn aa-btn--outline">
              Our Projects
            </a>
          </div>
        </div>

        {/* Cut-out car floating over a red halo, with a single rotating capability chip */}
        <div className="lg:col-span-6 relative min-h-[420px] md:h-[640px] flex items-center justify-center">
          <div className="relative w-full max-w-[720px] aspect-[4/3]">
            <div className="aa-hero-halo" aria-hidden="true" />
            <div className="aa-hero-ring" aria-hidden="true" />
            <div className="aa-hero-ring aa-hero-ring--dashed" aria-hidden="true" />
            <div className="aa-hero-floor" aria-hidden="true" />
            <div className="absolute inset-0 grid place-items-center">
              <div
                className="relative w-[92%] animate-float-slow"
                style={{ animationDuration: "3.2s" }}
              >
                <img
                  src={carCutout}
                  alt="Atlas One, our autonomous car"
                  width={862}
                  height={591}
                  className="aa-hero-car w-full h-auto"
                />
              </div>
            </div>

            <div
              className="absolute w-48 -bottom-12 left-2 md:-bottom-8 md:left-8 animate-float-slow"
              style={{ animationDuration: "3.2s" }}
            >
              <div
                key={chip.title}
                className="aa-card px-4 py-3 text-center aa-slide-up"
                aria-live="polite"
              >
                <div className="font-semibold text-sm text-ink truncate aa-display">
                  {chip.title}
                </div>
                <div className="text-xs text-ink-subtle mt-0.5 truncate">{chip.meta}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Logo cloud ---------- */

function LogoCloud() {
  const items = [
    "ROS",
    "OpenCV",
    "PyTorch",
    "TensorFlow",
    "YOLO",
    "Jetson",
    "Raspberry Pi",
    "Arduino",
    "Docker",
    "Python",
    "C++",
    "Git",
  ];
  const row = [...items, ...items];
  return (
    <section className="aa-band py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-8">
        <p className="text-center aa-eyebrow !text-ink-subtle">
          Powered by an open, professional stack
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />
        <div className="flex gap-14 animate-marquee w-max" aria-hidden="true">
          {row.map((t, i) => (
            <div
              key={i}
              className="aa-display text-2xl font-semibold text-ink-subtle/70 whitespace-nowrap"
            >
              {t}
            </div>
          ))}
        </div>
        <p className="sr-only">{items.join(", ")}</p>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  const features = [
    {
      icon: Eye,
      title: "It looks around",
      desc: "The LiDAR and cameras feed in, and the code stitches them into a picture of what's out there: lanes, cones, curbs, whatever's in the way.",
    },
    {
      icon: RouteIcon,
      title: "It picks a line",
      desc: "Then it works out where to actually go (the smoothest, safest path through the mess in front of it) and keeps re-checking that call constantly.",
    },
    {
      icon: Car,
      title: "It actually drives",
      desc: "Last part: turning that plan into real steering, gas, and brakes. This is the bit we spent the most weekends tuning so it doesn't drive like a robot.",
    },
  ];
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-line">
              <img
                src={buildPhoto}
                alt="Our car taken apart on the bench, with the Jetson, motor and deck plates laid out"
                loading="lazy"
                className="w-full h-full object-cover aspect-[5/6]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-base/50 via-transparent to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow="Who we are"
              title="Honestly? We're just a bunch of kids who got obsessed."
            />
            <p className="mt-6 text-ink-muted leading-relaxed">
              We're all students at Thomas Jefferson High School for Science and Technology
              (TJHSST). When we started, none of us knew how to make a self-driving car. We learned
              through trial and error, reading research papers we barely understood, and spending
              countless late nights in the lab.
            </p>
            <p className="mt-4 text-ink-muted">Here's roughly how our car thinks:</p>

            <div className="mt-8 grid sm:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} className="aa-card aa-card--hover p-6">
                  <div className="aa-icon-tile">
                    <f.icon aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 aa-card__body">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Recent Event ---------- */

function RecentEvent() {
  return (
    <section className="pb-20 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="aa-card p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
          <div className="shrink-0 w-24 h-28 rounded-xl bg-elevated border border-line text-center flex flex-col items-center justify-center">
            <div className="aa-eyebrow">Jun</div>
            <div className="aa-display text-4xl font-bold text-ink leading-none mt-1">22</div>
            <div className="text-xs text-ink-subtle mt-1">2026</div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-ink">
              IEEE Intelligent Vehicles Symposium 2026
            </h3>
            <p className="mt-3 text-ink-muted leading-relaxed max-w-2xl">
              We made it to IV 2026 in Detroit, but a hardware failure stopped the car before we
              could finish. Our first DNF. Rough, but we learned a ton, and we're already prepping
              for our next RoboRacer round in Boston.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-ink-subtle">
              <MapPin className="w-4 h-4 text-brand-text" aria-hidden="true" />
              Detroit, Michigan · June 22–25
            </div>
          </div>
          <a
            href="https://ieee-iv.org/2026/"
            target="_blank"
            rel="noopener noreferrer"
            className="aa-btn aa-btn--outline shrink-0"
          >
            Event Details <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Why we do this ---------- */

function WhyWeDoThis() {
  const points = [
    {
      title: "Real hardware, real consequences",
      desc: "Actual LiDAR and cameras, not just a screen.",
    },
    {
      title: "Older kids teach the new ones",
      desc: "Nobody's born knowing ROS. You pick it up from whoever's been here longer.",
    },
    {
      title: "Show up curious, that's it",
      desc: "We've taught total beginners. If you're willing to be confused for a while, you'll be fine.",
    },
  ];
  return (
    <section className="aa-band py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-line aspect-[4/3]">
            <img
              src={chassisPhoto}
              alt="Top-down view of the chassis, wired up"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-surface/40 via-transparent to-transparent" />
          </div>
        </div>
        <div className="lg:col-span-6">
          <SectionHeader
            eyebrow="Why we do this"
            title={
              <>
                You learn a lot more
                <br />
                when the thing is real.
              </>
            }
          />
          <p className="mt-6 text-ink-muted leading-relaxed">
            A simulator is one thing. A 100-pound car that'll actually drive into a cone if you mess
            up the math is another. We wanted the real version: the soldering, the dead batteries,
            the "why is it turning left" debugging at 11pm. That's the stuff you remember.
          </p>
          <ul className="mt-8 space-y-5">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="aa-icon-tile aa-icon-tile--sm mt-0.5">
                  <Check aria-hidden="true" />
                </span>
                <div>
                  <div className="font-semibold text-ink">{p.title}</div>
                  <div className="mt-1 text-sm text-ink-muted leading-relaxed">{p.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */

function Projects() {
  const projects = [
    {
      img: rcCarPhoto as string | null,
      title: "Atlas One",
      desc: "Our first car. It sees the road through cameras, figures out where the lane actually is, and steers to stay in it - all running live on a Jetson Nano.",
      to: "/the-car",
      cta: "Meet Atlas One",
    },
    {
      img: carV2Render as string | null,
      title: "Atlas Two",
      desc: "In design now: two circuit boards we laid out ourselves, a built-in battery pack and a 3D-printed carbon-fiber kit, backed by American Legion Post 28. The picture is a render from our design files.",
      to: "/car-v2",
      cta: "See the renders",
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-28 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="What we build"
          title="Projects Shipped by Our Members"
          lead="Our members design, build, and test the vehicle systems using computer vision, machine learning, sensors, and embedded hardware."
        />

        <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative aa-card aa-card--hover aa-card--lift overflow-hidden"
            >
              {p.img ? (
                <div className="aspect-[4/3] overflow-hidden bg-elevated">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden bg-elevated flex items-center justify-center">
                  <div className="absolute inset-0 aa-dot-grid" aria-hidden="true" />
                  <Car className="relative w-12 h-12 text-ink-subtle" aria-hidden="true" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold tracking-tight text-ink">
                  <Link to={p.to} className="after:absolute after:inset-0">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 aa-card__body">{p.desc}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text">
                  {p.cta} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */

function Team() {
  return (
    <section id="team" className="aa-band py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Team"
          title={
            <>
              The Team Behind <span className="whitespace-nowrap">Atlas Autoware</span>
            </>
          }
        />
        <div className="mt-14 flex justify-center">
          <img
            src={teamPhoto}
            alt="The Atlas Autoware team"
            loading="lazy"
            className="w-full max-w-4xl h-auto rounded-2xl border border-line"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- The awkward part + fundraising ---------- */

function AwkwardPart() {
  return (
    <section className="relative isolate py-20 md:py-24 overflow-hidden">
      <Backdrop dim />
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Eyebrow>The awkward part</Eyebrow>
        <h2 className="mt-3 aa-section-title aa-title-gradient max-w-4xl mx-auto">
          This stuff is expensive,
          <br />
          and we're, you know, in high school.
        </h2>
        <p className="mt-6 aa-lead mx-auto">
          A single LiDAR costs more than most of our parents would like. Add cameras, a decent GPU,
          spare parts we keep breaking, and gas money to drive to competitions. It adds up fast. If
          you can spare anything, it genuinely keeps us running.
        </p>
        <div className="mt-9 flex flex-wrap justify-center items-center gap-4">
          <Link to="/donate" className="aa-btn aa-btn--primary">
            Help Us Out <ArrowRight aria-hidden="true" />
          </Link>
          <a href="#projects" className="aa-btn aa-btn--outline">
            See What We Built First
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  return (
    <section id="join" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <SectionHeader center eyebrow="Contact" title="Questions? Get in Touch" />
        <p className="mt-6 aa-lead mx-auto">
          Reach out if you have any questions about our program, or anything else. Email us at{" "}
          <a href="mailto:contact@atlasautoware.org" className="aa-link">
            contact@atlasautoware.org
          </a>{" "}
          and follow our Instagram{" "}
          <a
            href="https://www.instagram.com/atlasautoware/"
            target="_blank"
            rel="noopener noreferrer"
            className="aa-link"
          >
            @atlasautoware
          </a>{" "}
          for updates.
        </p>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export function HomePage() {
  return (
    <div className="min-h-screen bg-base text-ink">
      <Nav />
      <main>
        <Hero />
        <Post28Thanks />
        <LogoCloud />
        <About />
        <RecentEvent />
        <WhyWeDoThis />
        <Projects />
        <Team />
        <AwkwardPart />
        <section className="pb-20 md:pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <FundraisingProgress />
          </div>
        </section>
        <SponsorWall />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
