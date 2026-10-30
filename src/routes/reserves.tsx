import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead, Row } from "@/components/Ledger";
import { CONTACT_EMAIL, pageHead } from "@/lib/meta";

const EFFECTIVE = "October 30, 2026";

export const Route = createFileRoute("/reserves")({
  head: () =>
    pageHead({
      path: "/reserves",
      title: "Reserves Policy · Atlas Autoware",
      description:
        "Atlas Autoware's reserves policy: how much the nonprofit aims to keep on hand, when reserves can be used, and how they are reported.",
    }),
  component: ReservesPage,
});

function ReservesPage() {
  return (
    <>
      <Nav />
      <main id="main" className="aa-page">
        <PageHead
          title="Reserves Policy"
          meta={[`Effective ${EFFECTIVE}`]}
          lead={
            <>
              Atlas Autoware is a student-run 501(c)(3) nonprofit (EIN 88-3747265) in Fairfax,
              Virginia. This policy explains how we keep money on hand so that an unexpected cost
              doesn't stop the program.
            </>
          }
        />

        <Row variant="headless">
          <div className="aa-prose">
            <section id="target">
              <h2>Target</h2>
              <p>
                Atlas Autoware aims to hold an unrestricted reserve equal to at least three months
                of average operating expenses, building toward that target over time. Gifts
                restricted by a donor to a specific purpose don't count toward the reserve.
              </p>
            </section>

            <section id="use">
              <h2>Using the reserve</h2>
              <p>
                The reserve may be used only for an unexpected shortfall or to finish a program
                already committed. The President and Treasurer must both approve any use and report
                it to the board. If the reserve is used, we aim to rebuild it within 12 months.
              </p>
            </section>

            <section id="reporting">
              <h2>Reporting</h2>
              <p>
                The Treasurer reports the reserve balance to the board each year as part of the
                Treasurer's Report. Questions about this policy can go to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="aa-link">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </section>

            <section id="changes">
              <h2>Changes</h2>
              <p>
                This policy took effect on {EFFECTIVE}. It is published at
                atlasautoware.org/reserves and will be updated on this page if it changes.
              </p>
            </section>
          </div>
        </Row>
      </main>
      <Footer />
    </>
  );
}
