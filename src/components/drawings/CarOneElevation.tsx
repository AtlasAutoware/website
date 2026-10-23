import { Balloon, Drawing, Label, Leader, TitleBlock } from "./parts";

/*
 * Drawing 1 (AA-D01): car one from the left, front to the left.
 * To scale at 1300 units per metre (wide) for the two sourced dimensions:
 *   wheelbase 0.33 m → 429 units; tyre diameter 0.109 m → 141.7 units
 *   (0.109 m is the tyre diameter).
 * OAK-D Pro at the top front with the RPLIDAR C1 on top behind it, as in the lab photo.
 * Everything else sits in one dashed zone: its positions are not sourced.
 */

const K = 1300; // units per metre
const R = (0.109 / 2) * K; // tyre radius, 70.85
const WB = 0.33 * K; // wheelbase, 429
const GROUND = 370;
const FX = 210; // front axle x
const RX = FX + WB; // rear axle x
const CY = GROUND - R;

/** Electronics on car one. The steering servo's model is left out until it is confirmed. */
const ELECTRONICS = [
  "Jetson Orin Nano Super",
  "Flipsky FSESC 6.7 Pro",
  "Castle Creations 1415 motor",
  "Steering servo",
  "LiPo drive pack",
  "UGREEN power bank",
];

function Wheel({ cx }: { cx: number }) {
  return (
    <g>
      <circle className="panel" cx={cx} cy={CY} r={R} />
      <circle className="ink" cx={cx} cy={CY} r={R} />
      <circle className="ink" cx={cx} cy={CY} r={40} />
      <circle className="ink" cx={cx} cy={CY} r={8} />
      <path className="hair" d={`M${cx - 14} ${CY} H${cx + 14} M${cx} ${CY - 14} V${CY + 14}`} />
    </g>
  );
}

/** The car itself, in wide units. Reused at 0.48 scale for the narrow version. */
function Car() {
  return (
    <g>
      {/* chassis rail and bumpers */}
      <rect className="ink" x={120} y={280} width={620} height={22} />
      <path className="ink" d="M120 282 L98 286 L92 306 L120 312" />
      <path className="ink" d="M740 282 L760 288 L760 304 L740 310" />
      {/* standoffs and deck */}
      <path className="ink" d="M300 214 V280 M560 214 V280" />
      <rect className="ink" x={150} y={206} width={560} height={8} />
      {/* electronics zone: positions schematic */}
      <rect className="ink dashed" x={316} y={146} width={228} height={128} />
      {/* OAK-D Pro on its riser, side profile */}
      <path className="ink" d="M193 156 V206" />
      <rect className="ink" x={178} y={118} width={30} height={38} />
      {/* RPLIDAR C1 on its mount: the one red element */}
      <path className="ink" d="M236 164 V206 M280 164 V206" />
      <rect className="ink" x={222} y={158} width={72} height={6} />
      <g>
        <rect className="accent" x={222} y={128} width={72} height={30} rx={4} />
        <rect className="accent" x={232} y={106} width={52} height={22} rx={8} />
      </g>
      <Wheel cx={FX} />
      <Wheel cx={RX} />
      <line className="hair" x1={40} y1={GROUND} x2={780} y2={GROUND} />
    </g>
  );
}

function Arrowhead({ x, y, dir }: { x: number; y: number; dir: 1 | -1 }) {
  return (
    <path className="hair" d={`M${x + dir * 6} ${y - 4} L${x} ${y} L${x + dir * 6} ${y + 4}`} />
  );
}

/** Horizontal dimension with extension lines and open arrowheads. */
function Dim({ x1, x2, y, from }: { x1: number; x2: number; y: number; from: number }) {
  return (
    <g>
      <line className="hair" x1={x1} y1={from} x2={x1} y2={y + 6} />
      <line className="hair" x1={x2} y1={from} x2={x2} y2={y + 6} />
      <line className="hair" x1={x1} y1={y} x2={x2} y2={y} />
      <Arrowhead x={x1} y={y} dir={1} />
      <Arrowhead x={x2} y={y} dir={-1} />
    </g>
  );
}

const S = 0.48; // narrow scale
const TX = -24.2;
const TY = -9.9;
const n = (x: number, y: number) => [x * S + TX, y * S + TY] as const;

export function CarOneElevation({ className }: { className?: string }) {
  const [nFX] = n(FX, 0);
  const [nRX] = n(RX, 0);
  const nR = R * S;
  const [, nGround] = n(0, GROUND);
  return (
    <Drawing
      className={className}
      full
      title="Car one, left side elevation"
      wide={{
        w: 1040,
        h: 440,
        desc:
          "Side view of car one, a Traxxas Slash, front to the left. Wheelbase 0.33 metres and wheel diameter 0.109 metres are drawn to scale and dimensioned. " +
          "A Luxonis OAK-D Pro camera sits at the top front on a riser, with a Slamtec RPLIDAR C1 lidar (360 degrees, 10 Hz) on top behind it, drawn in red. " +
          "Below them is the deck. A dashed zone marks the electronics, whose positions are schematic: Jetson Orin Nano Super, Flipsky FSESC 6.7 Pro, Castle Creations 1415 motor, steering servo, LiPo drive pack and UGREEN power bank.",
        children: (
          <>
            <Car />
            {/* OAK-D Pro */}
            <Leader
              pts={[
                [186, 118],
                [186, 56],
                [152, 56],
              ]}
            />
            <Label x={146} y={60} anchor="end" lines={["Luxonis OAK-D Pro", "camera with IMU"]} />
            {/* RPLIDAR C1 */}
            <Leader
              pts={[
                [270, 106],
                [270, 56],
                [304, 56],
              ]}
            />
            <Label x={310} y={60} lines={["Slamtec RPLIDAR C1", "360°, 10 Hz"]} />
            {/* deck */}
            <Leader
              pts={[
                [150, 210],
                [112, 210],
              ]}
            />
            <Label x={106} y={214} anchor="end" lines={["Deck"]} />
            {/* electronics zone → list */}
            <Leader
              pts={[
                [544, 170],
                [788, 170],
              ]}
            />
            <line className="hair" x1={788} y1={86} x2={788} y2={242} />
            <Label x={800} y={100} strong lines={["Electronics", "positions schematic"]} />
            {ELECTRONICS.map((item, i) => (
              <text key={item} x={800} y={142 + 20 * i}>
                {item}
              </text>
            ))}
            {/* chassis */}
            <Leader
              pts={[
                [760, 296],
                [788, 296],
              ]}
            />
            <Label x={800} y={300} lines={["Traxxas Slash chassis", "1/10 scale"]} />
            {/* dimensions */}
            <Dim x1={FX - R} x2={FX + R} y={392} from={CY} />
            <Label x={FX - R - 8} y={396} anchor="end" lines={["Ø 0.109 m"]} />
            <Dim x1={FX} x2={RX} y={420} from={CY + 14} />
            <Label x={(FX + RX) / 2} y={414} anchor="middle" lines={["Wheelbase 0.33 m"]} />
            <TitleBlock
              x={800}
              y={360}
              w={232}
              code="AA-D01"
              title="Car one, left side"
              scale="Wheelbase and wheels to scale"
            />
          </>
        ),
      }}
      narrow={{
        w: 360,
        h: 304,
        desc: "Side view of car one, front to the left, with numbered markers explained in the key below. Wheelbase 0.33 metres and wheel diameter 0.109 metres are drawn to scale. The lidar is drawn in red.",
        children: (
          <>
            <g transform={`translate(${TX} ${TY}) scale(${S})`}>
              <Car />
            </g>
            <Balloon x={30} y={22} n={1} to={n(186, 120)} />
            <Balloon x={150} y={18} n={2} to={n(284, 106)} />
            <Balloon x={296} y={24} n={3} to={n(544, 150)} />
            <Balloon x={22} y={88} n={4} to={n(150, 210)} />
            <Balloon x={340} y={100} n={5} to={n(756, 292)} />
            {/* dimensions */}
            <Dim x1={nFX - nR} x2={nFX + nR} y={nGround + 16} from={nGround - nR + 4} />
            <text x={nFX + nR + 8} y={nGround + 21}>
              Ø 0.109 m
            </text>
            <Dim x1={nFX} x2={nRX} y={nGround + 44} from={nGround + 4} />
            <text x={(nFX + nRX) / 2} y={nGround + 38} textAnchor="middle">
              Wheelbase 0.33 m
            </text>
            <TitleBlock
              x={8}
              y={232}
              w={344}
              code="AA-D01"
              title="Car one, left side"
              scale="Wheelbase and wheels to scale"
            />
          </>
        ),
      }}
      keyItems={[
        "Luxonis OAK-D Pro camera with IMU",
        "Slamtec RPLIDAR C1 lidar, 360°, 10 Hz (red)",
        "Electronics, positions schematic: Jetson Orin Nano Super, Flipsky FSESC 6.7 Pro, Castle Creations 1415 motor, steering servo, LiPo drive pack, UGREEN power bank",
        "Deck",
        "Traxxas Slash chassis, 1/10 scale",
      ]}
    />
  );
}
