import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/Section";

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
import infantry29Patch from "@/assets/sponsors/29th-infantry-division.svg";
import somireddyLawLogo from "@/assets/sponsors/somireddy-law-group.png";
import cruisinOceanCityLogo from "@/assets/sponsors/cruisin-ocean-city.png";
import dinoLiteLogo from "@/assets/sponsors/dino-lite.png";

type Sponsor = {
  name: string;
  logo: string;
  href: string;
  /** Short tag under the logo, e.g. for in-kind hardware sponsors. */
  tag?: string;
  /** The sponsor's own logo is white-on-dark, so it sits on a dark panel instead of white. */
  darkPanel?: boolean;
};

type SponsorGroup = {
  id: "lab" | "gold" | "silver" | "bronze";
  label: string;
  sponsors: Sponsor[];
};

const HARDWARE = "Hardware";

/**
 * The sponsor wall. Add a sponsor here once (logo file in src/assets/sponsors/) and it
 * shows up on both the home page and the donate page.
 */
export const sponsorGroups: SponsorGroup[] = [
  {
    id: "lab",
    label: "Lab Sponsor",
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
      {
        // The post's namesake, John Lyon, served in the 29th Infantry Division in WWI; the
        // post asked for the division's patch on car 2, so the patch stands in for a logo.
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

function SponsorTile({ sponsor, large = false }: { sponsor: Sponsor; large?: boolean }) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`aa-card aa-card--hover aa-card--lift aa-sponsor ${large ? "aa-sponsor--lg" : ""}`}
    >
      <div className={`aa-sponsor__logo ${sponsor.darkPanel ? "aa-sponsor__logo--dark" : ""}`}>
        <img src={sponsor.logo} alt={sponsor.name} loading="lazy" />
      </div>
      <div className="aa-sponsor__meta">
        <p className="aa-sponsor__name">{sponsor.name}</p>
        {sponsor.tag ? <span className="aa-sponsor__tag">{sponsor.tag}</span> : null}
      </div>
    </a>
  );
}

function GroupLabel({ group }: { group: SponsorGroup }) {
  return (
    <h3 className={`aa-sponsor-group__label aa-sponsor-group--${group.id} mb-4`}>
      <span className="aa-sponsor-group__dot" aria-hidden="true" />
      {group.label}
    </h3>
  );
}

export function SponsorWall({ showCta = true }: { showCta?: boolean }) {
  const byId = Object.fromEntries(sponsorGroups.map((g) => [g.id, g])) as Record<
    SponsorGroup["id"],
    SponsorGroup
  >;

  return (
    <section id="sponsors" className="aa-band py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Our sponsors"
          title="The Sponsors Behind the Build"
          lead="Every part, every trip, every race is made possible by the people and companies below."
        />
        {showCta ? (
          <div className="mt-6 text-center">
            <Link to="/donate" hash="season" className="aa-btn aa-btn--outline">
              Become a Sponsor <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        ) : null}

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {[byId.lab, byId.gold].map((group) => (
            <div key={group.id}>
              <GroupLabel group={group} />
              {group.sponsors.map((s) => (
                <SponsorTile key={s.name} sponsor={s} large />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12">
          <GroupLabel group={byId.silver} />
          <div className="grid gap-5 sm:grid-cols-2">
            {byId.silver.sponsors.map((s) => (
              <SponsorTile key={s.name} sponsor={s} large />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <GroupLabel group={byId.bronze} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {byId.bronze.sponsors.map((s) => (
              <SponsorTile key={s.name} sponsor={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
