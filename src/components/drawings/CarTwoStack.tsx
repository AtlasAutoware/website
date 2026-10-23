import { Balloon, Drawing, Label, Leader, TitleBlock } from "./parts";

/*
 * Drawing 3 (AA-D03): car two, exploded side view, traced from car-side.webp (nose to the right).
 * Parts: Traxxas Slash 4x4 (simplified); 25 printed PETG-CF parts;
 * ATLAS-DRV-1 drive board (140 × 90 mm, 6 layers); below it, off the board, the 4S3P pack of
 * 12 Molicel P28A in a printed box; the 2×20 connector the boards stack through; ATLAS-BRN-1 brain board (120 × 90 mm, 8 layers)
 * carrying a Jetson Orin Nano module; SICK TiM561 lidar in the nose; LUCID Triton TRI023S-C on the arch.
 * Holmes Hobbies Puller Pro 540 and the pack are dashed envelopes: their positions are not sourced.
 * Red: both boards. Not to scale.
 */

function Car({ inlineConnectorLabel }: { inlineConnectorLabel: boolean }) {
  return (
    <g>
      {/* chassis: Slash 4x4, simplified */}
      <rect className="ink" x={60} y={420} width={356} height={16} />
      <path className="ink" d="M150 392 V420 M330 392 V420" />
      <rect className="ink" x={40} y={384} width={400} height={8} />
      <rect className="ink dashed" x={172} y={396} width={60} height={22} />
      {/* printed enclosure on the deck */}
      <rect className="ink" x={150} y={340} width={180} height={44} />
      {[170, 196, 222, 248, 274, 300].map((x) => (
        <rect key={x} className="hair" x={x} y={352} width={12} height={16} />
      ))}
      {/* SICK TiM561 in the nose */}
      <rect className="ink" x={372} y={344} width={44} height={40} />
      <rect className="ink" x={378} y={322} width={32} height={22} rx={4} />
      <line className="hair" x1={378} y1={333} x2={410} y2={333} />
      {/* front bumper */}
      <path className="ink" d="M416 352 H428 V404 H416" />
      {/* arch with the LUCID Triton and lens */}
      <rect className="ink" x={348} y={292} width={10} height={92} />
      <rect className="ink" x={348} y={284} width={56} height={8} />
      <rect className="ink" x={368} y={258} width={36} height={26} />
      <rect className="ink" x={404} y={262} width={26} height={18} />
      <path className="hair" d="M412 262 V280 M420 262 V280" />
      {/* explode guides */}
      <path className="hair dashed" d="M150 102 V340 M330 102 V340" />
      {/* lid (printed) */}
      <rect className="ink" x={150} y={96} width={180} height={6} />
      {/* Jetson Orin Nano module */}
      <rect className="ink" x={200} y={124} width={80} height={20} />
      <line className="hair" x1={208} y1={132} x2={272} y2={132} />
      {/* 2×20 connector */}
      <rect className="ink" x={226} y={166} width={28} height={22} />
      {inlineConnectorLabel ? (
        <g>
          <line className="hair" x1={254} y1={177} x2={334} y2={177} />
          <text x={338} y={182}>
            2×20 connector
          </text>
        </g>
      ) : null}
      {/* pack, position schematic */}
      <rect className="ink dashed" x={172} y={216} width={136} height={28} />
      {/* both boards: the one red group */}
      <g>
        <rect className="accent" x={160} y={144} width={160} height={6} />
        <rect className="accent" x={150} y={204} width={180} height={6} />
      </g>
      {/* wheels */}
      {[110, 350].map((cx) => (
        <g key={cx}>
          <circle className="panel" cx={cx} cy={438} r={50} />
          <circle className="ink" cx={cx} cy={438} r={50} />
          <circle className="ink" cx={cx} cy={438} r={30} />
          <circle className="ink" cx={cx} cy={438} r={6} />
        </g>
      ))}
      <line className="hair" x1={16} y1={488} x2={456} y2={488} />
    </g>
  );
}

const S = 0.8;
const TX = -8;
const TY = -52.8;
const n = (x: number, y: number) => [x * S + TX, y * S + TY] as const;

export function CarTwoStack({ className }: { className?: string }) {
  return (
    <Drawing
      className={className}
      title="Car two, exploded side view"
      wide={{
        w: 736,
        y: 80,
        h: 448,
        desc:
          "Exploded side view of car two, nose to the right, not to scale. From the top: a printed lid; the ATLAS-BRN-1 brain board (120 by 90 mm, 8 layers) carrying a Jetson Orin Nano module; the 2×20 connector; " +
          "the ATLAS-DRV-1 drive board (140 by 90 mm, 6 layers); below it, off the board, the 4S3P pack of 12 Molicel P28A cells in a printed box, drawn dashed because its position is schematic; then the printed enclosure on the deck. Both boards are drawn in red. " +
          "In the nose is the SICK TiM561 lidar, with the LUCID Triton TRI023S-C camera on an arch above it. The chassis is a simplified Traxxas Slash 4x4, with the Holmes Hobbies Puller Pro 540 motor as a dashed envelope. " +
          "The 25 printed parts are PETG-CF.",
        children: (
          <>
            <Car inlineConnectorLabel />
            {/* printed parts: bracket to lid and enclosure */}
            <path className="hair" d="M150 99 H136 V362 H150" />
            <Leader
              pts={[
                [136, 230],
                [132, 230],
              ]}
            />
            <Label x={128} y={226} anchor="end" lines={["PETG-CF printed"]} />
            <text x={128} y={244} textAnchor="end">
              parts, 25 in all
            </text>
            {/* right column */}
            <Leader
              pts={[
                [280, 128],
                [440, 128],
                [440, 112],
                [472, 112],
              ]}
            />
            <Label x={480} y={116} lines={["Jetson Orin Nano module"]} />
            <Leader
              pts={[
                [320, 147],
                [472, 147],
              ]}
            />
            <Label
              x={480}
              y={152}
              strong
              lines={["ATLAS-BRN-1 brain board", "120 × 90 mm, 8 layers"]}
            />
            <Leader
              pts={[
                [330, 207],
                [472, 207],
              ]}
            />
            <Label
              x={480}
              y={211}
              strong
              lines={["ATLAS-DRV-1 drive board", "140 × 90 mm, 6 layers"]}
            />
            <Leader
              pts={[
                [308, 236],
                [448, 236],
                [448, 252],
                [472, 252],
              ]}
            />
            <Label
              x={480}
              y={256}
              lines={["4S3P pack, 12 Molicel P28A", "printed box, position schematic"]}
            />
            <Leader
              pts={[
                [430, 271],
                [456, 271],
                [456, 300],
                [472, 300],
              ]}
            />
            <Label x={480} y={304} lines={["LUCID Triton TRI023S-C", "on the arch"]} />
            <Leader
              pts={[
                [410, 326],
                [464, 326],
                [464, 348],
                [472, 348],
              ]}
            />
            <Label x={480} y={352} lines={["SICK TiM561 lidar"]} />
            <Leader
              pts={[
                [416, 428],
                [472, 428],
              ]}
            />
            <Label x={480} y={432} lines={["Traxxas Slash 4x4", "simplified"]} />
            <Leader
              pts={[
                [202, 418],
                [202, 500],
                [212, 500],
              ]}
            />
            <Label x={218} y={504} lines={["Puller Pro 540 motor, position schematic"]} />
            <TitleBlock
              x={536}
              y={456}
              w={192}
              code="AA-D03"
              title="Car two, exploded"
              scale="Not to scale"
            />
          </>
        ),
      }}
      narrow={{
        w: 360,
        h: 464,
        desc: "The same exploded side view of car two with numbered markers explained in the key below. Both boards are drawn in red; the pack and motor are dashed because their positions are schematic.",
        children: (
          <>
            <g transform={`translate(${TX} ${TY}) scale(${S})`}>
              <Car inlineConnectorLabel={false} />
            </g>
            <Balloon x={300} y={36} n={1} to={n(320, 147)} />
            <Balloon x={300} y={80} n={2} to={n(254, 177)} />
            <Balloon x={300} y={120} n={3} to={n(330, 207)} />
            <Balloon x={56} y={150} n={4} to={n(150, 362)} />
            <Balloon x={346} y={186} n={5} to={n(430, 278)} />
            <Balloon x={346} y={226} n={6} to={n(412, 330)} />
            <Balloon x={196} y={372} n={7} to={n(212, 418)} />
            <Balloon x={346} y={296} n={8} to={n(416, 430)} />
            <TitleBlock
              x={8}
              y={392}
              w={344}
              code="AA-D03"
              title="Car two, exploded"
              scale="Not to scale"
            />
          </>
        ),
      }}
      keyItems={[
        "ATLAS-BRN-1 brain board (red) with the Jetson Orin Nano module",
        "2×20 connector the two boards stack through",
        "ATLAS-DRV-1 drive board (red); below it, the 4S3P pack of 12 Molicel P28A in a printed box (dashed: position schematic)",
        "PETG-CF printed parts, 25 in all",
        "LUCID Triton TRI023S-C camera on the arch",
        "SICK TiM561 lidar",
        "Holmes Hobbies Puller Pro 540 motor (dashed: position schematic)",
        "Traxxas Slash 4x4, simplified",
      ]}
    />
  );
}
