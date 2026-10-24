import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead, Row } from "@/components/Ledger";
import { Figure } from "@/components/Figure";
import { SpecTable } from "@/components/SpecTable";
import { Notes } from "@/components/Notes";
import { DefList } from "@/components/DefList";
import { CarOneElevation } from "@/components/drawings/CarOneElevation";
import { DrivePipeline } from "@/components/drawings/DrivePipeline";
import { pageHead } from "@/lib/meta";

import carPhoto from "@/assets/atlas-car-lab.webp";

export const Route = createFileRoute("/the-car")({
  head: () =>
    pageHead({
      path: "/the-car",
      title: "Car one: a Traxxas Slash on a Jetson Orin Nano Super",
      description: "Parts, software, on-car timings and races for our first car.",
    }),
  component: TheCarPage,
});

// The steering servo's model is left out until it is confirmed.
const PARTS: [string, string][] = [
  ["Chassis", "Traxxas Slash, 1/10; wheelbase 0.33 m"],
  ["Motor", "Castle Creations 1415, 2400 Kv, sensored"],
  ["Controller", "Flipsky FSESC 6.7 Pro (VESC 6.06)"],
  ["Steering", "Servo, up to 0.36 rad"],
  ["Computer", "Jetson Orin Nano Super, 25 W; JetPack 7.2.1, ROS 2 Jazzy"],
  ["Lidar", "Slamtec RPLIDAR C1: 360°, 10 Hz, 720 bins"],
  ["Camera", "Luxonis OAK-D Pro: RGB stream, 200 Hz IMU"],
  ["Power", "4S 9000 mAh LiPo; UGREEN 20,000 mAh bank for the computer"],
  ["Wireless", "Its own “AtlasCar” hotspot since 5 Oct 2026"],
];

const TIMINGS: string[][] = [
  ["Learned policy", "ONNX Runtime, CPU, 4 threads", "1.84 ms", "—"],
  ["Learned policy", "TensorRT FP16", "0.25 ms", "—"],
  ["YOLOv8n-640 detector", "TensorRT FP16", "5.41 ms", "6.04 ms"],
];

function TheCarPage() {
  return (
    <>
      <Nav />
      <main id="main" className="aa-page">
        <PageHead
          title="Car one is a Traxxas Slash running ROS 2 Jazzy on a Jetson Orin Nano Super."
          lead={
            <>
              It carries a Slamtec RPLIDAR C1, a Luxonis OAK-D Pro and a Flipsky FSESC 6.7 Pro. In
              July and August 2026 we rebuilt it around that motor controller and a sensored motor.
              Since 5 October it runs its own Wi-Fi hotspot, and we drive it from a browser.
            </>
          }
        />

        <Row variant="split" title="Parts">
          <Figure
            n={1}
            kind="photo"
            caption="Car one in the lab, with the OAK-D Pro camera and the lidar on top."
          >
            <img
              src={carPhoto}
              alt="Car one on a lab bench, seen from the front: a Traxxas Slash with a black front bumper and knobby tires, a wooden deck full of wiring, and the OAK-D Pro camera mounted in front of the round RPLIDAR C1 on top."
              width={1204}
              height={677}
              className="block h-auto w-full lg:aspect-[4/3] lg:object-cover lg:object-[45%_50%]"
            />
          </Figure>
          <SpecTable columns={["Part", "Detail"]} caption="As of October 2026" rows={PARTS} />
        </Row>

        <Row topic variant="wide" title="Where everything sits">
          <Figure
            n={2}
            kind="drawing"
            caption="Car one from the left side. Wheelbase and wheels to scale. Positions inside the deck are schematic."
          >
            <CarOneElevation />
          </Figure>
        </Row>

        <Row topic title="Software" meta={["ROS 2 Jazzy", "149 unit tests pass"]}>
          <p className="aa-prose">
            A velocity EKF fuses the IMU and wheel odometry at 200 Hz. A raceline MPC plans the
            line, with automatic emergency braking and an IMU traction governor behind it. Lidar
            opponent tracking and a YOLOv8 car detector watch for other cars. Today we drive the car
            with the web pilot, a browser controller with a 250 ms watchdog that returns the car to
            neutral.
          </p>
          <p className="aa-prose mt-6">
            Our public code is at{" "}
            <a href="https://github.com/AtlasAutoware" className="aa-link">
              github.com/AtlasAutoware
            </a>
            .
          </p>
          <div className="mt-12">
            <Figure
              n={3}
              kind="drawing"
              caption="How the car is meant to drive. The browser web pilot drives it today. The learned-policy path is dashed because it has run only in simulation. Timings measured on the car's Jetson."
            >
              <DrivePipeline />
            </Figure>
          </div>
        </Row>

        <Row
          topic
          title="The paper"
          meta={["23 Sep 2026", "Eshan Iyer", "Results in simulation only"]}
        >
          <p className="aa-prose">
            <cite>
              AtlasAutoware: Real-Time On-Vehicle Neural Network Inference for Autonomous 1/10-Scale
              Racing
            </cite>
            , Eshan Iyer, TJHSST Computer Systems Research Lab Senior Research, 23 September 2026.
          </p>
          <p className="aa-prose mt-6">
            <strong>
              Every result from the learned policy below is from simulation. The learned policy has
              not driven the car on the floor. Wheels-off bench testing is next.
            </strong>
          </p>
          <p className="aa-prose mt-6">
            The learned policy has about 1.46 million parameters and was distilled from a planning
            expert. It reads the camera, a bird's-eye image of the lidar scan, the car's own motion
            and an instruction, and picks a speed and steering angle 10 times a second.
          </p>
          <p className="aa-prose mt-6">
            The paper's main finding came from an audit: the deployed policy's outputs were in the
            wrong order. As deployed, it scored 0% success and 2.6% route progress. After the fixes,
            plain behavior cloning reached 10.2% success (95% CI 7.5–13.1) and 67.0% route progress
            over 3 seeds.
          </p>
          <div className="mt-6">
            <DefList
              items={[
                {
                  term: "25 Sep 2026, 1 seed",
                  body: "With a route hint, a point 2 m ahead on the planned route: 88% success.",
                },
                {
                  term: "5 Oct 2026, 5 seeds",
                  body: "92.0% mean success. The best seed reached 99.3% success with 0.7% collisions on the standard simulation set, and 100% on a map it had not seen. With the camera perturbed: 75%.",
                },
              ]}
            />
          </div>
          <p className="aa-prose mt-6">
            The detector has one class, car. We trained it on 4,907 public CC BY 4.0 images plus our
            own negative frames; it scores mAP50 0.983.
          </p>
          <div className="mt-12">
            <SpecTable
              stack
              columns={["Network", "Runtime", "Mean", "p99"]}
              numericCols={[2, 3]}
              rows={TIMINGS}
              caption={
                <>
                  Measured on the car's Jetson Orin Nano Super in 25 W mode. The whole stack holds
                  about 10 Hz (10.08 Hz, periods of 89–104 ms). The learned policy has only driven
                  in simulation so far.
                </>
              }
            />
          </div>
        </Row>

        <Row topic title="Races and what is next">
          <Notes
            items={[
              {
                date: "2026-11-30",
                label: "30 Nov 2026",
                title: "Senior Research Presentation 2",
              },
              {
                date: "2026-11-14",
                label: "By 14 Nov 2026",
                title: "The policy runs on the car at up to 0.6 m/s",
                body: "Wheels-off bench tests come first.",
              },
              {
                date: "2026-10-05",
                label: "5 Oct 2026",
                title: "Auto-calibration run",
                body: "The car calibrated itself on an unattended run down a hallway. The same day it started running its own hotspot.",
              },
              {
                date: "2026-10-05",
                label: "5–6 Oct 2026",
                title: "Senior Research Presentation 1",
                body: "8 of 9 tasks complete.",
              },
              {
                date: "2026-09-23",
                label: "23 Sep 2026",
                title: "We declined IROS 2026",
                body: "We could not fund the trip to the RoboRacer race at IROS 2026 in Pittsburgh, 27–30 September, so we did not go.",
              },
              {
                date: "2026-07",
                label: "Jul–Aug 2026",
                title: "Car one rebuilt",
                body: "We rebuilt it around a VESC motor controller and a sensored motor.",
              },
              {
                // Wording verified by the team (Oct 2026): keep it exact.
                date: "2026-06-22",
                label: "22–25 Jun 2026",
                title: "IEEE IV 2026, Detroit",
                body: "A hardware failure stopped the car before the finish, our first DNF.",
              },
            ]}
          />
          <p className="aa-prose mt-6">Our next competition is in spring 2027.</p>
        </Row>
      </main>
      <Footer />
    </>
  );
}
