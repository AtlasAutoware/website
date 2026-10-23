import { Box, Drawing, Note, TitleBlock, Wire } from "./parts";

/*
 * Drawing 5 (AA-D05): how Atlas Autoware fits together.
 * - TJHSST school program: the Computer Systems Research Lab (CSRL) and the TJ Self-Driving Cars club,
 *   which has a faculty sponsor (not named).
 * - Eshan Iyer founded the club and Atlas Autoware, a 501(c)(3).
 * - George Mason University is the lab sponsor; track work is planned at a GMU lab.
 * - Sponsors and donors: 36 entries on the sponsor wall (sponsorGroups in SponsorWall.tsx); cash and donated hardware.
 * - Car two's circuit boards are funded by Post 28's gift and funds on hand.
 * Red: the Atlas node.
 */

export function OrgDiagram({ className }: { className?: string }) {
  return (
    <Drawing
      className={className}
      title="How Atlas Autoware fits together"
      wide={{
        w: 736,
        h: 420,
        desc:
          "Diagram. Eshan Iyer, founder, founded both the TJ Self-Driving Cars club and Atlas Autoware, a 501(c)(3) nonprofit, drawn in red. " +
          "At TJHSST, the school program is the Computer Systems Research Lab (CSRL) and the TJ Self-Driving Cars club, which has a faculty sponsor; it connects to Atlas Autoware. " +
          "Atlas Autoware plans track work at a lab of George Mason University, its lab sponsor. Sponsors and donors, 36 on the sponsor wall, give cash and donated hardware. " +
          "Car two's circuit boards are funded by American Legion Post 28's gift and funds on hand.",
        children: (
          <>
            {/* TJHSST group */}
            <rect className="hair" x={16} y={112} width={232} height={208} />
            <text x={32} y={136} fontWeight={600}>
              TJHSST
            </text>
            <Box x={32} y={152} w={184} title={["Computer Systems", "Research Lab (CSRL)"]} />
            <Box
              x={32}
              y={228}
              w={184}
              title={["TJ Self-Driving", "Cars club"]}
              sub={["faculty sponsor"]}
            />

            <Box x={312} y={24} w={160} title={["Eshan Iyer"]} sub={["founder"]} />
            <Box
              x={312}
              y={128}
              w={160}
              title={["Atlas Autoware"]}
              sub={["501(c)(3) nonprofit"]}
              accent
            />
            <Box x={312} y={300} w={160} title={["Car two's", "circuit boards"]} />
            <Box
              x={576}
              y={24}
              w={144}
              title={["George Mason", "University"]}
              sub={["lab sponsor"]}
            />
            <Box
              x={576}
              y={224}
              w={144}
              title={["Sponsors and", "donors"]}
              sub={["36 on the wall"]}
            />

            {/* Eshan founded the club and Atlas */}
            <Wire
              pts={[
                [312, 50],
                [232, 50],
                [232, 263],
                [216, 263],
              ]}
            />
            <Note x={244} y={44} text="founded" />
            <Wire
              pts={[
                [392, 76],
                [392, 128],
              ]}
            />
            <Note x={400} y={106} text="founded" />
            {/* school program ↔ Atlas */}
            <Wire
              pts={[
                [248, 155],
                [312, 155],
              ]}
              arrow={false}
            />
            <Note x={256} y={172} text="school" />
            <Note x={256} y={186} text="program" />
            {/* Atlas → GMU */}
            <Wire
              pts={[
                [472, 160],
                [648, 160],
                [648, 94],
              ]}
            />
            <Note x={488} y={136} text="track work planned" />
            <Note x={488} y={150} text="at a GMU lab" />
            {/* sponsors → Atlas */}
            <Wire
              pts={[
                [576, 252],
                [440, 252],
                [440, 180],
              ]}
            />
            <Note x={452} y={228} text="cash and" />
            <Note x={452} y={242} text="donated hardware" />
            {/* Atlas → car two's boards */}
            <Wire
              pts={[
                [360, 180],
                [360, 300],
              ]}
            />
            <Note x={352} y={222} text="funded by" anchor="end" />
            <Note x={352} y={236} text="Post 28's gift" anchor="end" />
            <Note x={352} y={250} text="and funds" anchor="end" />
            <Note x={352} y={264} text="on hand" anchor="end" />

            <TitleBlock
              x={528}
              y={340}
              w={192}
              code="AA-D05"
              title="How Atlas fits together"
              scale="Diagram"
            />
          </>
        ),
      }}
      narrow={{
        w: 360,
        h: 670,
        desc: "The same diagram stacked vertically: Eshan Iyer at the top, founding the TJ Self-Driving Cars club and Atlas Autoware; the TJHSST school program with the CSRL and the club; Atlas Autoware in red; George Mason University and the sponsors and donors below it; and car two's circuit boards, funded by Post 28's gift and funds on hand, at the bottom.",
        children: (
          <>
            <Box x={96} y={16} w={168} title={["Eshan Iyer"]} sub={["founder"]} />
            <rect className="hair" x={8} y={100} width={344} height={124} />
            <text x={24} y={124} fontWeight={600}>
              TJHSST
            </text>
            <Box x={24} y={136} w={152} title={["Computer", "Systems Research", "Lab (CSRL)"]} />
            <Box
              x={192}
              y={136}
              w={144}
              title={["TJ Self-Driving", "Cars club"]}
              sub={["faculty sponsor"]}
            />
            <Box
              x={96}
              y={264}
              w={168}
              title={["Atlas Autoware"]}
              sub={["501(c)(3) nonprofit"]}
              accent
            />
            <Box
              x={8}
              y={392}
              w={164}
              title={["George Mason", "University"]}
              sub={["lab sponsor"]}
            />
            <Box
              x={188}
              y={392}
              w={164}
              title={["Sponsors and", "donors"]}
              sub={["36 on the wall"]}
            />
            <Box x={96} y={516} w={168} title={["Car two's", "circuit boards"]} />

            <Wire
              pts={[
                [240, 68],
                [240, 136],
              ]}
            />
            <Note x={248} y={92} text="founded" />
            <Wire
              pts={[
                [96, 42],
                [16, 42],
                [16, 290],
                [96, 290],
              ]}
            />
            <Note x={24} y={36} text="founded" />
            <Wire
              pts={[
                [180, 224],
                [180, 264],
              ]}
              arrow={false}
            />
            <Note x={188} y={248} text="school program" />
            <Wire
              pts={[
                [136, 316],
                [136, 392],
              ]}
            />
            <Note x={128} y={346} text="track work planned" anchor="end" />
            <Note x={128} y={360} text="at a GMU lab" anchor="end" />
            <Wire
              pts={[
                [260, 392],
                [260, 316],
              ]}
            />
            <Note x={268} y={338} text="cash and" />
            <Note x={268} y={352} text="donated" />
            <Note x={268} y={366} text="hardware" />
            <Wire
              pts={[
                [180, 316],
                [180, 516],
              ]}
            />
            <Note x={188} y={488} text="funded by Post 28's gift" />
            <Note x={188} y={502} text="and funds on hand" />

            <TitleBlock
              x={8}
              y={596}
              w={344}
              code="AA-D05"
              title="How Atlas fits together"
              scale="Diagram"
            />
          </>
        ),
      }}
    />
  );
}
