import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead, Row } from "@/components/Ledger";
import { CONTACT_EMAIL, pageHead } from "@/lib/meta";

const ADOPTED = "October 25, 2026";

export const Route = createFileRoute("/nondiscrimination")({
  head: () =>
    pageHead({
      path: "/nondiscrimination",
      title: "Non-Discrimination Policy · Atlas Autoware",
      description:
        "Atlas Autoware's non-discrimination policy, adopted by its board of directors and binding on every member, volunteer and program.",
    }),
  component: NondiscriminationPage,
});

function NondiscriminationPage() {
  return (
    <>
      <Nav />
      <main id="main" className="aa-page">
        <PageHead
          title="Non-Discrimination Policy"
          meta={[`Adopted by the board of directors on ${ADOPTED}`]}
          lead={
            <>
              Atlas Autoware is a student-run 501(c)(3) nonprofit (EIN 88-3747265) in Fairfax,
              Virginia. This policy applies to everything we do and to everyone who takes part in
              it.
            </>
          }
        />

        <Row variant="headless">
          <div className="aa-prose">
            <section id="policy">
              <h2>Policy</h2>
              <p>
                Atlas Autoware does not discriminate on the basis of race, color, religion, national
                origin, ancestry, sex, gender, gender identity or expression, sexual orientation,
                age, disability, genetic information, veteran status, or any other characteristic
                protected by federal, Virginia or local law.
              </p>
              <p>
                This applies to membership in Atlas Autoware and the TJ Self-Driving Cars club, to
                the selection of officers and directors, to volunteers, to the students and members
                of the public we serve through our programs and outreach, and to the sponsors and
                vendors we work with.
              </p>
              <p>
                Every member, officer, director and volunteer is expected to follow this policy. We
                do not tolerate harassment on any of the grounds above, and we treat a report of
                discrimination or harassment seriously and without retaliation against the person
                who raised it.
              </p>
            </section>

            <section id="reports">
              <h2>Reporting a concern</h2>
              <p>
                Anyone who believes this policy has been violated can write to the board at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="aa-link">
                  {CONTACT_EMAIL}
                </a>
                . Concerns involving the TJ Self-Driving Cars club at school may also be raised with
                the club's faculty sponsor at TJHSST.
              </p>
            </section>

            <section id="adoption">
              <h2>Adoption</h2>
              <p>
                This policy was adopted by resolution of the Atlas Autoware board of directors on{" "}
                {ADOPTED}. It is published at atlasautoware.org/nondiscrimination and will be
                updated on this page if it changes.
              </p>
            </section>
          </div>
        </Row>
      </main>
      <Footer />
    </>
  );
}
