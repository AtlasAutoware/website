import { Box, Drawing, Note, TitleBlock, Wire } from "./parts";

/*
 * Drawing 4 (AA-D04): blocks on the ATLAS-DRV-1 drive board.
 * Power path: USB-C → TPS25751D (USB-C power delivery) → BQ25798 (charging) → BQ7791508 (battery
 *   protection) → TPS48111 (main switch, soft start) → bus → VESC-6-class ESC → Puller Pro 540.
 * The 4S3P pack of 12 Molicel P28A cells is not on the board: it sits in a printed box, wired to
 * the protection block, and is drawn dashed outside the board outline. Red: the pack.
 * USB hub, CP2102N, INA228, CAN and IMU are listed without connections, and the servo, fan and lidar
 * outputs without a source: our records name the parts, not how they are wired.
 * The board stacks under ATLAS-BRN-1 through a 2×20 connector.
 */

export function DriveBoardBlocks({ className }: { className?: string }) {
  return (
    <Drawing
      className={className}
      title="Blocks on the ATLAS-DRV-1 drive board"
      wide={{
        w: 736,
        h: 440,
        desc:
          "Block diagram of the ATLAS-DRV-1 drive board, 140 by 90 mm, 6 layers. Power enters at the USB-C port and passes through the TPS25751D for USB-C power delivery and the BQ25798 for charging to the BQ7791508 battery protection. " +
          "Off the board, drawn dashed in red, the 4S3P pack of 12 Molicel P28A cells sits in a printed box and is wired to the protection block. " +
          "From the protection block, the TPS48111 main switch with soft start feeds the bus to the VESC-6-class ESC (STM32F405, DRV8323RS and 12 CSD18510Q5B transistors), which drives the Holmes Hobbies Puller Pro 540 motor off the board. " +
          "Also on the board: a USB hub, CP2102N, INA228, CAN and an IMU, plus servo, fan and lidar outputs. The board stacks with the ATLAS-BRN-1 brain board through a 2×20 connector.",
        children: (
          <>
            {/* the board */}
            <rect className="ink" x={16} y={16} width={552} height={344} />
            <text x={32} y={42} fontWeight={600}>
              ATLAS-DRV-1 drive board
            </text>
            <Note x={32} y={60} text="140 × 90 mm, 6 layers" />

            {/* row 1: USB-C in to the battery protection */}
            <Box x={32} y={80} w={112} h={52} title={["USB-C port"]} />
            <Box x={168} y={80} w={112} title={["TPS25751D"]} sub={["power delivery"]} />
            <Box x={304} y={80} w={112} title={["BQ25798"]} sub={["charging"]} />
            <Box x={440} y={80} w={112} title={["BQ7791508"]} sub={["battery", "protection"]} />
            <Wire
              pts={[
                [144, 106],
                [168, 106],
              ]}
            />
            <Wire
              pts={[
                [280, 106],
                [304, 106],
              ]}
            />
            <Wire
              pts={[
                [416, 106],
                [440, 106],
              ]}
            />

            {/* row 2 */}
            <Box
              x={32}
              y={184}
              w={248}
              title={["Also on the board"]}
              sub={["USB hub, CP2102N, INA228,", "CAN, IMU"]}
            />
            <Box x={304} y={184} w={112} title={["Outputs"]} sub={["servo, fan,", "lidar"]} />
            <Box
              x={440}
              y={184}
              w={112}
              title={["TPS48111"]}
              sub={["main switch,", "soft start"]}
            />
            <Wire
              pts={[
                [496, 148],
                [496, 184],
              ]}
            />

            {/* row 3: bus to the ESC */}
            <Box
              x={304}
              y={280}
              w={248}
              title={["VESC-6-class ESC"]}
              sub={["STM32F405, DRV8323RS", "12× CSD18510Q5B"]}
            />
            <Wire
              pts={[
                [496, 252],
                [496, 280],
              ]}
            />
            <Note x={504} y={270} text="bus" />

            {/* off the board: the pack in its printed box, wired to the protection block */}
            <Box
              x={592}
              y={176}
              w={128}
              title={["4S3P pack"]}
              sub={["12 Molicel P28A", "in a printed box"]}
              dashed
              accent
            />
            <Wire
              pts={[
                [552, 132],
                [580, 132],
                [580, 210],
                [592, 210],
              ]}
              arrow={false}
            />
            <Box x={592} y={288} w={128} title={["Puller Pro 540"]} sub={["motor"]} />
            <Wire
              pts={[
                [552, 314],
                [592, 314],
              ]}
            />
            <rect className="ink" x={562} y={98} width={12} height={16} />
            <Wire
              pts={[
                [574, 106],
                [592, 106],
              ]}
              arrow={false}
            />
            <Box
              x={592}
              y={80}
              w={128}
              title={["ATLAS-BRN-1"]}
              sub={["brain board,", "2×20 connector"]}
            />

            <TitleBlock
              x={528}
              y={368}
              w={192}
              code="AA-D04"
              title="ATLAS-DRV-1 blocks"
              scale="Diagram"
            />
          </>
        ),
      }}
      narrow={{
        w: 360,
        h: 832,
        desc: "The same block diagram stacked vertically: the ATLAS-BRN-1 brain board above, joined through a 2×20 connector; then on the drive board the power path from the USB-C port through the TPS25751D, BQ25798, the BQ7791508 battery protection, the TPS48111 and the bus to the VESC-6-class ESC, which drives the Puller Pro 540 motor below the board. Beside the motor, off the board and drawn dashed in red, the 4S3P pack of 12 Molicel P28A cells in its printed box is wired to the protection block. Outputs and the other parts sit beside the chain.",
        children: (
          <>
            <Box x={192} y={8} w={152} title={["ATLAS-BRN-1"]} sub={["brain board"]} />
            <rect className="ink" x={8} y={84} width={344} height={564} />
            <rect className="ink" x={262} y={78} width={12} height={12} />
            <Wire
              pts={[
                [268, 78],
                [268, 60],
              ]}
              arrow={false}
            />
            <Note x={256} y={74} text="2×20 connector" anchor="end" />
            <text x={20} y={110} fontWeight={600}>
              ATLAS-DRV-1 drive board
            </text>
            <Note x={20} y={128} text="140 × 90 mm, 6 layers" />

            <Box x={24} y={148} w={176} h={52} title={["USB-C port"]} />
            <Box x={24} y={224} w={176} title={["TPS25751D"]} sub={["power delivery"]} />
            <Box x={24} y={300} w={176} title={["BQ25798"]} sub={["charging"]} />
            <Box x={24} y={376} w={176} title={["BQ7791508"]} sub={["battery protection"]} />
            <Box x={24} y={468} w={176} title={["TPS48111"]} sub={["main switch, soft start"]} />
            <Box
              x={24}
              y={560}
              w={176}
              title={["VESC-6-class ESC"]}
              sub={["STM32F405, DRV8323RS", "12× CSD18510Q5B"]}
            />
            <Wire
              pts={[
                [112, 200],
                [112, 224],
              ]}
            />
            <Wire
              pts={[
                [112, 276],
                [112, 300],
              ]}
            />
            <Wire
              pts={[
                [112, 352],
                [112, 376],
              ]}
            />
            <Wire
              pts={[
                [112, 428],
                [112, 468],
              ]}
            />
            <Wire
              pts={[
                [112, 520],
                [112, 560],
              ]}
            />
            <Note x={120} y={544} text="bus" />

            <Box x={216} y={224} w={128} title={["Outputs"]} sub={["servo, fan,", "lidar"]} />
            <Box
              x={216}
              y={316}
              w={128}
              title={["Also on", "the board"]}
              sub={["USB hub,", "CP2102N, INA228,", "CAN, IMU"]}
            />

            <Box x={24} y={672} w={176} title={["Puller Pro 540"]} sub={["motor"]} />
            <Box
              x={216}
              y={672}
              w={136}
              title={["4S3P pack"]}
              sub={["12 Molicel P28A", "in a printed box"]}
              dashed
              accent
            />
            <Wire
              pts={[
                [200, 402],
                [208, 402],
                [208, 706],
                [216, 706],
              ]}
              arrow={false}
            />
            <Wire
              pts={[
                [112, 628],
                [112, 672],
              ]}
            />
            <TitleBlock
              x={8}
              y={760}
              w={344}
              code="AA-D04"
              title="ATLAS-DRV-1 blocks"
              scale="Diagram"
            />
          </>
        ),
      }}
    />
  );
}
