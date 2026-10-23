import { Box, Drawing, Note, TitleBlock, Wire } from "./parts";

/*
 * Drawing 2 (AA-D02): how car one is driven.
 * - Sensors: RPLIDAR C1 (10 Hz, 720 bins); OAK-D Pro (colour camera, 200 Hz IMU).
 * - Velocity EKF fuses the IMU and wheel odometry at 200 Hz (so the lidar does not feed it).
 * - Learned policy inputs: camera, lidar bird's-eye image, proprioception; outputs speed and steer at 10 Hz.
 *   It has run in simulation only, so it and its edge are dashed.
 * - Browser web pilot with a 250 ms neutral watchdog drives the car today.
 * - YOLOv8n-640 detector: 5.41 ms mean in TensorRT FP16. Its consumer is not drawn, so no out-edge.
 * - The steering command goes to the servo with no driver drawn. The MPC is left out of this view.
 * - Timing strip, to scale: one ~100 ms period (10.08 Hz, 89–104 ms measured), slices 5.41 ms and 1.84 ms.
 */

/* Timing strip geometry: x0 + ms * scale. */
function Strip({
  x0,
  y,
  scale,
  compact,
}: {
  x0: number;
  y: number;
  scale: number;
  compact: boolean;
}) {
  const at = (ms: number) => x0 + ms * scale;
  const laneLabelX = x0 + 32;
  return (
    <g>
      <text x={x0} y={y} fontWeight={600}>
        One control period, about 100 ms
      </text>
      <text className="t2" x={x0} y={y + 16}>
        Measured on the car&apos;s Jetson, 25 W
      </text>
      {/* the 100 ms frame */}
      <rect
        className="hair"
        x={at(0)}
        y={y + 28}
        width={at(100) - at(0)}
        height={compact ? 64 : 44}
      />
      {/* measured period range 89–104 ms */}
      <path
        className="hair dashed"
        d={`M${at(89)} ${y + 28} V${y + (compact ? 104 : 84)} M${at(104)} ${y + 28} V${y + (compact ? 104 : 84)}`}
      />
      {/* the slices: the one red group */}
      <g>
        <rect className="accent" x={at(0)} y={y + 36} width={5.41 * scale} height={12} />
        <rect
          className="accent"
          x={at(0)}
          y={y + (compact ? 64 : 56)}
          width={1.84 * scale}
          height={12}
        />
      </g>
      <text x={laneLabelX} y={y + 46}>
        {compact ? "YOLOv8n: 5.41 ms" : "YOLOv8n, TensorRT FP16: 5.41 ms"}
      </text>
      <text x={laneLabelX} y={y + (compact ? 74 : 66)}>
        {compact ? "Policy, CPU: 1.84 ms" : "Policy, ONNX on CPU: 1.84 ms (0.25 ms in TensorRT)"}
      </text>
      {compact ? (
        <text className="t2" x={laneLabelX} y={y + 88}>
          0.25 ms in TensorRT
        </text>
      ) : null}
      {/* axis */}
      <g>
        <line
          className="hair"
          x1={at(0)}
          y1={y + (compact ? 104 : 84)}
          x2={at(110)}
          y2={y + (compact ? 104 : 84)}
        />
        {[0, 50, 100].map((ms) => (
          <line
            key={ms}
            className="hair"
            x1={at(ms)}
            y1={y + (compact ? 104 : 84)}
            x2={at(ms)}
            y2={y + (compact ? 110 : 90)}
          />
        ))}
        <Note x={at(0)} y={y + (compact ? 124 : 104)} text="0" />
        <Note x={at(50)} y={y + (compact ? 124 : 104)} text="50" anchor="middle" />
        <Note x={at(100)} y={y + (compact ? 124 : 104)} text="100 ms" anchor="middle" />
      </g>
      <Note x={(at(89) + at(104)) / 2} y={y + 24} text="89–104 ms" anchor="middle" />
    </g>
  );
}

function Legend({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line className="ink" x1={x} y1={y} x2={x + 24} y2={y} />
      <Note x={x + 32} y={y + 4} text="on the car today" />
      <line className="ink dashed" x1={x} y1={y + 24} x2={x + 24} y2={y + 24} />
      <Note x={x + 32} y={y + 28} text="simulation only" />
    </g>
  );
}

export function DrivePipeline({ className }: { className?: string }) {
  return (
    <Drawing
      className={className}
      title="How car one is driven"
      wide={{
        w: 736,
        h: 488,
        desc:
          "Block diagram. The Slamtec RPLIDAR C1 (10 Hz, 720 bins) sends a bird's-eye image, and the Luxonis OAK-D Pro sends its camera image, to the learned policy. " +
          "The OAK-D Pro also feeds its camera to a YOLOv8n car detector (5.41 ms) and its IMU to a velocity EKF at 200 Hz, which also takes wheel odometry from the Flipsky FSESC 6.7 Pro and passes the car's motion to the policy. " +
          "Two sources produce the drive command of speed and steering: the browser web pilot with a 250 millisecond watchdog, which drives the car today, and the learned policy (1.46 million parameters, 10 Hz), drawn dashed because it has run in simulation only. " +
          "Steering goes to the steering servo; speed goes to the FSESC 6.7 Pro and the Castle Creations 1415 motor. " +
          "A to-scale strip shows one control period of about 100 ms (89 to 104 ms measured), with the 5.41 ms detector and 1.84 ms policy compute times marked in red.",
        children: (
          <>
            {/* column A: sensors */}
            <Box x={16} y={24} w={136} title={["RPLIDAR C1"]} sub={["10 Hz, 720 bins"]} />
            <Box x={16} y={112} w={136} title={["OAK-D Pro"]} sub={["camera; IMU 200 Hz"]} />
            {/* column B */}
            <Box x={192} y={112} w={144} title={["YOLOv8n detector"]} sub={["5.41 ms, TensorRT"]} />
            <Box x={192} y={200} w={144} title={["Velocity EKF"]} sub={["200 Hz"]} />
            {/* column C: the two command sources */}
            <Box
              x={376}
              y={16}
              w={168}
              title={["Learned policy"]}
              sub={["simulation only", "1.46 M parameters"]}
              dashed
            />
            <Box
              x={376}
              y={200}
              w={168}
              title={["Browser web pilot"]}
              sub={["today; 250 ms watchdog"]}
            />
            {/* column D: actuation */}
            <Box x={584} y={24} w={136} h={52} title={["Steering servo"]} />
            <Box x={584} y={112} w={136} title={["Drive command"]} sub={["speed and steering"]} />
            <Box x={584} y={200} w={136} title={["FSESC 6.7 Pro"]} sub={["VESC 6.06"]} />
            <Box
              x={584}
              y={288}
              w={136}
              title={["Castle 1415 motor"]}
              sub={["2400 Kv, sensored"]}
            />

            {/* sensor edges */}
            <Wire
              pts={[
                [152, 32],
                [376, 32],
              ]}
            />
            <Note x={164} y={26} text="bird's-eye image" />
            <Wire
              pts={[
                [152, 124],
                [172, 124],
                [172, 52],
                [376, 52],
              ]}
            />
            <Note x={184} y={46} text="camera" />
            <Wire
              pts={[
                [152, 148],
                [192, 148],
              ]}
            />
            <Wire
              pts={[
                [84, 164],
                [84, 226],
                [192, 226],
              ]}
            />
            <Note x={92} y={200} text="IMU" />
            <Wire
              pts={[
                [336, 226],
                [356, 226],
                [356, 72],
                [376, 72],
              ]}
            />
            <Note x={364} y={150} text="motion" />
            {/* command sources → drive command */}
            <Wire
              pts={[
                [544, 40],
                [564, 40],
                [564, 128],
                [584, 128],
              ]}
              dashed
            />
            <Note x={558} y={104} text="10 Hz" anchor="end" />
            <Wire
              pts={[
                [544, 226],
                [568, 226],
                [568, 148],
                [584, 148],
              ]}
            />
            {/* actuation */}
            <Wire
              pts={[
                [652, 112],
                [652, 76],
              ]}
            />
            <Note x={660} y={98} text="steer" />
            <Wire
              pts={[
                [652, 164],
                [652, 200],
              ]}
            />
            <Note x={660} y={186} text="speed" />
            <Wire
              pts={[
                [652, 252],
                [652, 288],
              ]}
            />
            {/* wheel odometry back to the EKF */}
            <Wire
              pts={[
                [600, 252],
                [600, 268],
                [264, 268],
                [264, 252],
              ]}
            />
            <Note x={272} y={284} text="wheel odometry" />

            <Legend x={16} y={300} />
            <Strip x0={16} y={372} scale={4.4} compact={false} />
            <TitleBlock
              x={528}
              y={400}
              w={192}
              code="AA-D02"
              title="How car one is driven"
              scale="Diagram; timing strip to scale"
            />
          </>
        ),
      }}
      narrow={{
        w: 360,
        h: 752,
        desc:
          "The same block diagram stacked vertically: sensors at the top, then the detector and velocity EKF, the learned policy (dashed, simulation only), the browser web pilot and the drive command, then the steering servo, FSESC 6.7 Pro and motor, with wheel odometry returning to the EKF. " +
          "Below it, a to-scale strip of one control period of about 100 ms with the 5.41 ms detector and 1.84 ms policy times in red.",
        children: (
          <>
            <Box x={16} y={16} w={152} title={["RPLIDAR C1"]} sub={["10 Hz, 720 bins"]} />
            <Box x={192} y={16} w={152} title={["OAK-D Pro"]} sub={["camera; IMU 200 Hz"]} />
            <Box x={40} y={100} w={128} title={["YOLOv8n"]} sub={["5.41 ms"]} />
            <Box x={192} y={100} w={152} title={["Velocity EKF"]} sub={["200 Hz"]} />
            <Box
              x={16}
              y={184}
              w={328}
              title={["Learned policy, simulation only"]}
              sub={["1.46 M parameters"]}
              dashed
            />
            <Box x={16} y={268} w={152} title={["Drive command"]} sub={["speed and steering"]} />
            <Box
              x={192}
              y={268}
              w={152}
              title={["Browser web pilot"]}
              sub={["today", "250 ms watchdog"]}
            />
            <Box x={16} y={368} w={152} h={52} title={["Steering servo"]} />
            <Box x={192} y={368} w={152} title={["FSESC 6.7 Pro"]} sub={["VESC 6.06"]} />
            <Box
              x={192}
              y={452}
              w={152}
              title={["Castle 1415 motor"]}
              sub={["2400 Kv, sensored"]}
            />

            <Wire
              pts={[
                [28, 68],
                [28, 184],
              ]}
            />
            <Note x={36} y={88} text="bird's-eye image" />
            <Wire
              pts={[
                [192, 42],
                [180, 42],
                [180, 184],
              ]}
            />
            <Wire
              pts={[
                [180, 126],
                [168, 126],
              ]}
            />
            <Note x={188} y={176} text="camera" />
            <Wire
              pts={[
                [268, 68],
                [268, 100],
              ]}
            />
            <Note x={276} y={88} text="IMU" />
            <Wire
              pts={[
                [268, 152],
                [268, 184],
              ]}
            />
            <Note x={276} y={176} text="motion" />
            <Wire
              pts={[
                [92, 236],
                [92, 268],
              ]}
              dashed
            />
            <Note x={100} y={258} text="10 Hz" />
            <Wire
              pts={[
                [192, 294],
                [168, 294],
              ]}
            />
            <Wire
              pts={[
                [60, 320],
                [60, 368],
              ]}
            />
            <Note x={68} y={348} text="steer" />
            <Wire
              pts={[
                [128, 320],
                [128, 352],
                [268, 352],
                [268, 368],
              ]}
            />
            <Note x={200} y={348} text="speed" />
            <Wire
              pts={[
                [268, 420],
                [268, 452],
              ]}
            />
            <Wire
              pts={[
                [344, 394],
                [352, 394],
                [352, 126],
                [344, 126],
              ]}
            />
            <Note x={344} y={440} text="odometry" anchor="end" />

            <Legend x={16} y={468} />
            <Strip x0={16} y={540} scale={2.9} compact />
            <TitleBlock
              x={8}
              y={680}
              w={344}
              code="AA-D02"
              title="How car one is driven"
              scale="Diagram; timing strip to scale"
            />
          </>
        ),
      }}
    />
  );
}
