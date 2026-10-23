import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead, Row } from "@/components/Ledger";
import { CONTACT_EMAIL, pageHead } from "@/lib/meta";

const UPDATED = "October 18, 2026";
const CONTACT = CONTACT_EMAIL;

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      path: "/privacy",
      title: "Privacy Policy · Atlas Autoware",
      description:
        "How Atlas Autoware handles information on atlasautoware.org, in donations and email, and on the team's JupyterHub at jupyter.atlasautoware.org.",
    }),
  component: PrivacyPage,
});

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Mail() {
  return (
    <a href={`mailto:${CONTACT}`} className="aa-link">
      {CONTACT}
    </a>
  );
}

function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="aa-page">
        <PageHead
          title="Privacy Policy"
          meta={[`Last updated ${UPDATED}`]}
          lead={
            <>
              Atlas Autoware is a student-run 501(c)(3) nonprofit (EIN 88-3747265) in Fairfax,
              Virginia. This page explains what information we handle on our website, when you
              donate or email us, and on our team's JupyterHub, and what we do with it.
            </>
          }
        />

        <Row variant="headless">
          <div className="aa-prose">
            <Block id="short" title="The short version">
              <ul>
                <li>We don't sell, rent or trade anyone's information, and we don't run ads.</li>
                <li>Our website has no sign-up forms and no advertising or tracking cookies.</li>
                <li>Donations go through PayPal. We never see or store card or bank details.</li>
                <li>
                  Team members who sign in to our JupyterHub with Google share their email address
                  with us. We use it only to let them in.
                </li>
              </ul>
            </Block>

            <Block id="website" title="Our website (atlasautoware.org)">
              <p>
                You can read everything on atlasautoware.org without giving us any information. The
                site is served through Cloudflare, which, like any web host, processes the technical
                details every visit involves (such as your IP address and browser type) to deliver
                the site and protect it from abuse.
              </p>
              <p>
                If you switch between the light and dark theme, your browser remembers that choice
                in its own local storage. It never leaves your device. The site loads its fonts from
                Google Fonts, so your browser contacts Google's servers to download them.
              </p>
            </Block>

            <Block id="donations" title="Donations, sponsorships and email">
              <p>
                Online donations are completed on PayPal, under PayPal's own privacy policy. PayPal
                tells us the donor's name, email address and the amount so we can thank you and send
                a receipt. If you mail a check, we see the information printed on it.
              </p>
              <p>
                When you email us, sponsor us or donate, we keep your name, organization and email
                address to reply, send receipts and tax acknowledgments, list sponsors who asked to
                be recognized on our sponsor wall, and send occasional updates. To stop getting
                updates, reply to any of them or write to <Mail />.
              </p>
            </Block>

            <Block id="jupyterhub" title="Our team's JupyterHub (jupyter.atlasautoware.org)">
              <p>
                jupyter.atlasautoware.org is a private workspace where Atlas Autoware team members
                write code and train machine-learning models on our own computers. It is open only
                to people an Atlas Autoware administrator has added.
              </p>
              <p>
                <strong>Sign-in with Google.</strong> When you sign in, Google shares your email
                address and an account identifier with us (the "openid" and "email" permissions). We
                don't ask for your name, contacts, files, calendar or any other Google data. We use
                your email address only to check that you're on the team's list and to name your
                account and workspace.
              </p>
              <p>
                <strong>What the hub keeps.</strong> Your email address, when you signed in and when
                your workspace last ran, and the files and notebooks you create. These are stored on
                Atlas Autoware's own servers in Fairfax, Virginia, and are visible to Atlas Autoware
                administrators who run the hub. Files you put in the shared team folder are visible
                to the whole team.
              </p>
              <p>
                <strong>What we don't do.</strong> We don't sell or share information from Google
                with anyone, use it for advertising, or use it to train AI models. Atlas Autoware's
                use and transfer of information received from Google APIs adheres to the{" "}
                <a
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aa-link"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
              <p>
                <strong>Leaving the team.</strong> When someone leaves, an administrator removes
                their account. To have your account and files deleted sooner, or to get a copy of
                your files first, write to <Mail />. You can also remove Atlas Autoware's access
                from your Google account at any time at{" "}
                <a
                  href="https://myaccount.google.com/connections"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aa-link"
                >
                  myaccount.google.com/connections
                </a>
                .
              </p>
            </Block>

            <Block id="security" title="How we protect information">
              <p>
                The hub is reached only over HTTPS. Each team member's workspace runs separately,
                and workspaces are walled off from the rest of our network. Only Atlas Autoware
                administrators can manage accounts. No system is perfectly secure, but we keep what
                we collect to a minimum.
              </p>
            </Block>

            <Block id="students" title="Students">
              <p>
                Atlas Autoware is run by high-school students. Our website and hub are not directed
                to children under 13, and we don't knowingly collect information from them. If you
                think a child under 13 has given us information, write to <Mail /> and we will
                delete it.
              </p>
            </Block>

            <Block id="changes" title="Changes and contact">
              <p>
                If we change this policy, we'll update this page and the date at the top. Questions
                or requests about your information: <Mail />.
              </p>
            </Block>
          </div>
        </Row>
      </main>
      <Footer />
    </>
  );
}
