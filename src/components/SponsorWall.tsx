import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Row } from "@/components/Ledger";
import { POST28, Post28Badge } from "@/components/Post28";

import gmuLogo from "@/assets/sponsors/gmu.png";
import sickLogo from "@/assets/Sickimg.png";
import atlasGcLogo from "@/assets/atlas-gc.png";
import segmentsAiLogo from "@/assets/segments-ai-white.png";
import thundercatLogo from "@/assets/sponsors/thundercat.png";
import vspeLogo from "@/assets/sponsors/vspe.png";
import fleursDaveLogo from "@/assets/fleurs-dave.png";
import rabLogo from "@/assets/rab.png";
import bachtorockLogo from "@/assets/bachtorock.png";
import allgoLogo from "@/assets/AllgoRhythm_img.png";
import meanWellLogo from "@/assets/sponsors/mean-well.png";
import lucidLogo from "@/assets/sponsors/lucid.svg";
import andersonPowerLogo from "@/assets/sponsors/anderson-power-white.png";
import rc4wdLogo from "@/assets/sponsors/rc4wd.png";
import progressiveRcLogo from "@/assets/progressive-rc.png";
import pixyCamLogo from "@/assets/pixycam.png";
import hitecLogo from "@/assets/Hitc.png";
import openmvLogo from "@/assets/openmv.png";
import holmesHobbiesLogo from "@/assets/holmes-hobbies.png";
import orbbecLogo from "@/assets/orbbec-logo.png";
import injoraLogo from "@/assets/injora-logo.png";
import altitudeHobbiesLogo from "@/assets/altitude-hobbies.png";
import hakkoLogo from "@/assets/hakko.jpg";
import savoxLogo from "@/assets/savox.png";
import mcleanDentistryLogo from "@/assets/sponsors/mclean-family-dentistry.png";
import misumiLogo from "@/assets/sponsors/misumi.png";
import nvlxLabsLogo from "@/assets/sponsors/nvlx-labs.png";
import andonstarLogo from "@/assets/sponsors/andonstar.png";
import eloopLogo from "@/assets/sponsors/eloop.png";
import infantry29Patch from "@/assets/sponsors/29th-infantry-division.svg";
import somireddyLawLogo from "@/assets/sponsors/somireddy-law-group.png";
import cruisinOceanCityLogo from "@/assets/sponsors/cruisin-ocean-city.png";
import dinoLiteLogo from "@/assets/sponsors/dino-lite.png";
import triadEngineeringLogo from "@/assets/sponsors/triad-engineering.svg";
import cellsiteSolutionsLogo from "@/assets/sponsors/cellsite-solutions.png";
import yatesDesygnLogo from "@/assets/sponsors/yates-desygn.png";

type Sponsor = {
  name: string;
  /** Logo file. A sponsor without one can pass `badge` instead. */
  logo?: string;
  /** Drawn stand-in for a logo (used for the featured partner). */
  badge?: ReactNode;
  /** Where the sponsor is based, shown on the featured partner card. */
  place?: string;
  /** A sentence or two of thanks, shown on the featured partner card. */
  blurb?: string;
  href: string;
  /** Short tag under the logo, e.g. for in-kind hardware sponsors. */
  tag?: string;
  /** The sponsor's own logo is white-on-dark, so it sits on a dark panel instead of white. */
  darkPanel?: boolean;
};

type SponsorGroup = {
  id: "partner" | "lab" | "gold" | "silver" | "bronze";
  label: string;
  sponsors: Sponsor[];
};

const HARDWARE = "Hardware";

/**
 * The sponsor wall. Add a sponsor here once (logo file in src/assets/sponsors/) and it
 * shows up on both the home page and the donate page.
 */
const sponsorGroups: SponsorGroup[] = [
  {
    // October 2026: $2,060 toward car two, the build estimate we quoted the post.
    id: "partner",
    label: "Car two partner",
    sponsors: [
      {
        name: POST28.fullName,
        badge: <Post28Badge size="lg" />,
        place: POST28.place,
        href: POST28.href,
        blurb: `In its 100th-anniversary year, Post 28 gave $${POST28.amount.toLocaleString("en-US")}, the full build estimate we sent the post for car two. It pays for car two's two circuit boards, and the post's name goes on the car.`,
      },
    ],
  },
  {
    id: "lab",
    label: "Lab sponsor",
    sponsors: [{ name: "George Mason University", logo: gmuLogo, href: "https://www.gmu.edu/" }],
  },
  {
    id: "gold",
    label: "Gold",
    sponsors: [{ name: "SICK", logo: sickLogo, href: "https://www.sick.com/us/en/" }],
  },
  {
    id: "silver",
    label: "Silver",
    sponsors: [
      { name: "Atlas General Contractors", logo: atlasGcLogo, href: "https://atlasgc.org/" },
      { name: "Segments.ai", logo: segmentsAiLogo, href: "https://segments.ai/" },
    ],
  },
  {
    id: "bronze",
    label: "Bronze",
    sponsors: [
      {
        name: "ThunderCat Technology",
        logo: thundercatLogo,
        href: "https://www.thundercattech.com/",
      },
      {
        name: "Virginia Society of Professional Engineers",
        logo: vspeLogo,
        href: "https://www.vspe.org/",
      },
      { name: "Fleurs d'Ave", logo: fleursDaveLogo, href: "https://www.fleursdave.com/" },
      {
        name: "Royal Auto Body of Sterling",
        logo: rabLogo,
        href: "https://www.royalautobodyofsterling.net/",
      },
      { name: "Bach to Rock", logo: bachtorockLogo, href: "https://www.bachtorock.com/" },
      { name: "AllgoRhythm", logo: allgoLogo, href: "https://gorhythms.com/" },
      {
        name: "McLean Family Dentistry",
        logo: mcleanDentistryLogo,
        href: "https://www.mcleanfamilydentistry.com/",
        darkPanel: true,
      },
      {
        name: "NVLX Labs",
        logo: nvlxLabsLogo,
        href: "https://www.nvlxlabs.com/",
        darkPanel: true,
      },
      { name: "eLoop", logo: eloopLogo, href: "https://www.eloopllc.com/" },
      {
        // The post asked for the 29th Infantry Division patch on car 2, so the patch stands in for a logo.
        name: "John Lyon VFW Post 3150",
        logo: infantry29Patch,
        href: "https://vfw3150.org/",
      },
      {
        name: "Somireddy Law Group",
        logo: somireddyLawLogo,
        href: "https://somireddylaw.com/",
      },
      {
        name: "Cruisin Ocean City",
        logo: cruisinOceanCityLogo,
        href: "https://cruisinoceancity.com/",
      },
      {
        name: "Triad Engineering",
        logo: triadEngineeringLogo,
        href: "https://triadeng.com/",
      },
      {
        name: "CellSite Solutions",
        logo: cellsiteSolutionsLogo,
        href: "https://www.cellsitesolutions.com/",
      },
      {
        name: "Yates Desygn",
        logo: yatesDesygnLogo,
        href: "https://yatesdesygn.com/",
      },
      {
        name: "LUCID Vision Labs",
        logo: lucidLogo,
        href: "https://thinklucid.com/",
        tag: HARDWARE,
      },
      {
        name: "MEAN WELL",
        logo: meanWellLogo,
        href: "https://www.meanwellusa.com/",
        tag: HARDWARE,
      },
      {
        name: "Anderson Power",
        logo: andersonPowerLogo,
        href: "https://www.andersonpower.com/",
        tag: HARDWARE,
        darkPanel: true,
      },
      { name: "RC4WD", logo: rc4wdLogo, href: "https://www.rc4wd.com/", tag: HARDWARE },
      {
        name: "Progressive RC",
        logo: progressiveRcLogo,
        href: "https://www.progressiverc.com/",
        tag: HARDWARE,
      },
      { name: "Pixy Cam", logo: pixyCamLogo, href: "https://pixycam.com/", tag: HARDWARE },
      { name: "Hitec RC", logo: hitecLogo, href: "https://hitecrcd.com/", tag: HARDWARE },
      { name: "OpenMV", logo: openmvLogo, href: "https://openmv.io/", tag: HARDWARE },
      {
        name: "Holmes Hobbies",
        logo: holmesHobbiesLogo,
        href: "https://holmeshobbies.com/",
        tag: HARDWARE,
      },
      { name: "Orbbec", logo: orbbecLogo, href: "https://www.orbbec.com/", tag: HARDWARE },
      { name: "INJORA", logo: injoraLogo, href: "https://www.injora.com/", tag: HARDWARE },
      {
        name: "Altitude Hobbies",
        logo: altitudeHobbiesLogo,
        href: "https://www.altitudehobbies.com/",
        tag: HARDWARE,
      },
      { name: "Hakko", logo: hakkoLogo, href: "https://www.hakkousa.com/", tag: HARDWARE },
      { name: "Savox", logo: savoxLogo, href: "https://www.teamsavox.com/", tag: HARDWARE },
      { name: "MISUMI", logo: misumiLogo, href: "https://us.misumi-ec.com/", tag: HARDWARE },
      { name: "Andonstar", logo: andonstarLogo, href: "https://andonstar.com/", tag: HARDWARE },
      {
        name: "Dino-Lite",
        logo: dinoLiteLogo,
        href: "https://www.dinolite.us/",
        tag: HARDWARE,
        darkPanel: true,
      },
    ],
  },
];

function Logo({ sponsor, className = "" }: { sponsor: Sponsor; className?: string }) {
  return (
    <div
      className={`aa-sponsor__logo ${sponsor.darkPanel ? "aa-sponsor__logo--dark" : ""} ${className}`}
    >
      {/* The name is printed next to the logo inside the same link, so the image is decorative. */}
      {sponsor.logo ? <img src={sponsor.logo} alt="" loading="lazy" /> : sponsor.badge}
    </div>
  );
}

function SponsorTile({ sponsor, large = false }: { sponsor: Sponsor; large?: boolean }) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`aa-sponsor ${large ? "aa-sponsor--lg" : ""}`}
    >
      <Logo sponsor={sponsor} />
      <div className="aa-sponsor__meta">
        <p className="aa-sponsor__name">{sponsor.name}</p>
        {sponsor.tag ? <span className="aa-sponsor__tag">{sponsor.tag}</span> : null}
      </div>
    </a>
  );
}

/** Wide card for the featured partner, with a line or two of thanks. */
function PartnerFeature({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className="aa-partner grid gap-6 items-center md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <Logo sponsor={sponsor} className="aa-partner__logo" />
      <div>
        <p className="aa-partner__name">{sponsor.name}</p>
        {sponsor.place ? <p className="aa-meta">{sponsor.place}</p> : null}
        {sponsor.blurb ? <p className="mt-6 aa-prose">{sponsor.blurb}</p> : null}
      </div>
    </a>
  );
}

function Group({ group, children }: { group: SponsorGroup; children: ReactNode }) {
  return (
    <div className="grid gap-4 content-start">
      <h3 className={`aa-sponsor-group__label aa-sponsor-group--${group.id}`}>
        <span className="aa-sponsor-group__dot" aria-hidden="true" />
        {group.label}
      </h3>
      {children}
    </div>
  );
}

const SPONSOR_COUNT = sponsorGroups.reduce((n, g) => n + g.sponsors.length, 0);

export function SponsorWall({ showCta = true }: { showCta?: boolean }) {
  const byId = Object.fromEntries(sponsorGroups.map((g) => [g.id, g])) as Record<
    SponsorGroup["id"],
    SponsorGroup
  >;

  return (
    <Row
      id="sponsors"
      topic
      variant="wide"
      title="Our sponsors"
      meta={[`${SPONSOR_COUNT} on the wall`]}
    >
      {showCta ? (
        <div>
          <Link to="/donate" hash="sponsoring" className="aa-btn aa-btn--secondary">
            Become a sponsor
          </Link>
        </div>
      ) : null}

      {byId.partner.sponsors.length ? (
        <div className={showCta ? "mt-12" : undefined}>
          <Group group={byId.partner}>
            {byId.partner.sponsors.map((s) => (
              <PartnerFeature key={s.name} sponsor={s} />
            ))}
          </Group>
        </div>
      ) : null}

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-6">
        {[byId.lab, byId.gold].map((group) => (
          <Group key={group.id} group={group}>
            {group.sponsors.map((s) => (
              <SponsorTile key={s.name} sponsor={s} large />
            ))}
          </Group>
        ))}
      </div>

      <div className="mt-12">
        <Group group={byId.silver}>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            {byId.silver.sponsors.map((s) => (
              <SponsorTile key={s.name} sponsor={s} large />
            ))}
          </div>
        </Group>
      </div>

      <div className="mt-12">
        <Group group={byId.bronze}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {byId.bronze.sponsors.map((s) => (
              <SponsorTile key={s.name} sponsor={s} />
            ))}
          </div>
        </Group>
      </div>
    </Row>
  );
}
