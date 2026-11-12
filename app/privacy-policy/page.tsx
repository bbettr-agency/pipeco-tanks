import type { Metadata } from "next";
import type { ReactNode } from "react";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import { CookiePreferences } from "@/components/analytics/consent";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = createMetadata({
  title: "Privacy & Cookie Policy",
  description:
    "How Pipeco Tanks South Africa collects, uses and protects personal information through this website, including quotation enquiries, cookies and Meta Pixel tracking, in line with POPIA.",
  path: "/privacy-policy",
});

/* Callout for any statement that still needs PIPECO's confirmation — nothing
   legal is invented; these mark the gaps explicitly. */
function Confirm({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-[3px] border border-brass/35 bg-brass/[0.07] px-4 py-3 font-body text-sm leading-6 text-ink/75">
      <span className="font-semibold text-brass-dark">
        Awaiting PIPECO confirmation —{" "}
      </span>
      {children}
    </p>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-ink/10 pt-10">
      <h2 className="font-display text-2xl font-bold tracking-tight text-forest-base">
        {title}
      </h2>
      <div className="mt-4 space-y-4 font-body leading-7 text-ink/75">
        {children}
      </div>
    </section>
  );
}

const bullet =
  "relative pl-6 before:absolute before:left-0 before:top-[0.6rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brass before:content-['']";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHero
        variant="band"
        overline="Legal"
        title="Privacy & Cookie Policy"
        lead="How we collect, use and protect personal information through this website — including quotation enquiries, cookies and Meta Pixel tracking — in line with the Protection of Personal Information Act, 2013 (POPIA)."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Privacy & Cookie Policy", href: "/privacy-policy" },
        ]}
      />

      <section className="bg-paper">
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="font-body leading-7 text-ink/75">
              This policy explains how {siteConfig.businessName} (&ldquo;Pipeco&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information
              collected through this website. It applies to this website only.
            </p>
            <Confirm>
              the registered legal entity name, company registration number and
              any group/holding details that should appear here.
            </Confirm>
            <p className="mt-6 font-body text-sm text-graphite">
              Last updated:{" "}
              <span className="font-medium text-ink/70">
                to be set on publication (see confirmations below).
              </span>
            </p>

            <div className="mt-12 space-y-12">
              <Section id="collect" title="1. Information we collect">
                <p>
                  <span className="font-semibold text-forest-base">
                    Quotation enquiries.
                  </span>{" "}
                  When you submit the quote form, we collect the details you
                  provide:
                </p>
                <ul className="space-y-2">
                  {[
                    "Full name",
                    "Email address",
                    "Phone number",
                    "Selected tank type",
                    "Approximate capacity (optional)",
                    "Installation location",
                    "Project requirements",
                    "Your acknowledgement that we may contact you about the enquiry",
                  ].map((item) => (
                    <li key={item} className={bullet}>
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  These details are sent to our customer-relationship management
                  (CRM) system so our team can respond with a specification and
                  quotation.
                </p>
                <p>
                  <span className="font-semibold text-forest-base">
                    Website &amp; cookies.
                  </span>{" "}
                  We also process limited information through cookies and the
                  Meta Pixel — only where you have consented. See{" "}
                  <a
                    href="#cookies"
                    className="font-medium text-forest-base underline-offset-4 hover:text-brass-dark hover:underline"
                  >
                    Cookies &amp; tracking
                  </a>
                  .
                </p>
                <p>
                  We do not knowingly collect special personal information or the
                  personal information of children through this website.
                </p>
              </Section>

              <Section id="use" title="2. How we use your information">
                <ul className="space-y-2">
                  <li className={bullet}>
                    To respond to and manage your quotation enquiry — preparing a
                    specification and quotation and contacting you about it.
                  </li>
                  <li className={bullet}>
                    To keep records of enquiries for legitimate business purposes.
                  </li>
                </ul>
                <Confirm>
                  any additional purposes (for example marketing communications,
                  newsletters or remarketing audiences) you intend to rely on, and
                  the lawful basis for each under POPIA.
                </Confirm>
              </Section>

              <Section id="cookies" title="3. Cookies & tracking">
                <p>
                  <span className="font-semibold text-forest-base">
                    Consent preference (essential).
                  </span>{" "}
                  We store your cookie choice in your browser so we can remember
                  it. This is first-party and is not used for advertising.
                </p>
                <p>
                  <span className="font-semibold text-forest-base">
                    Meta Pixel (advertising &amp; measurement).
                  </span>{" "}
                  Only loaded if you accept. When accepted, the Meta Pixel (by
                  Meta Platforms Ireland) records a page-view and, when you submit
                  a quotation enquiry, a conversion (&ldquo;Lead&rdquo;) event, so
                  we can measure and improve our advertising. We have{" "}
                  <span className="font-medium text-forest-base">
                    disabled automatic advanced matching
                  </span>
                  , so we do not send your name, email address, phone number or
                  enquiry details to Meta — the Lead event uses a non-identifying
                  reference only. Meta may set its own cookies (such as{" "}
                  <code className="rounded bg-shell px-1 py-0.5 text-[0.85em]">
                    _fbp
                  </code>
                  ) when it is enabled, and Meta&rsquo;s own data policy governs
                  how Meta processes that information.
                </p>
                <p>
                  <span className="font-semibold text-forest-base">
                    Your choice.
                  </span>{" "}
                  You can accept or reject non-essential cookies on the banner,
                  and change your decision at any time using{" "}
                  <CookiePreferences className="font-medium text-forest-base underline underline-offset-4 hover:text-brass-dark" />{" "}
                  (also in the footer). If you reject, no Meta Pixel loads and no
                  advertising cookies are set. The website and the quote form work
                  either way.
                </p>
                <Confirm>
                  whether any other cookies or embedded third-party content (for
                  example maps, video or chat widgets) are used on the site, so
                  they can be listed here.
                </Confirm>
              </Section>

              <Section id="sharing" title="4. Sharing & third parties">
                <ul className="space-y-2">
                  <li className={bullet}>
                    <span className="font-semibold text-forest-base">
                      CRM provider —
                    </span>{" "}
                    your enquiry is stored in our CRM so our team can respond.
                  </li>
                  <li className={bullet}>
                    <span className="font-semibold text-forest-base">
                      Meta Platforms —
                    </span>{" "}
                    only the limited, non-identifying Pixel events described
                    above, and only with your consent.
                  </li>
                </ul>
                <p>We do not sell your personal information.</p>
                <Confirm>
                  the CRM provider&rsquo;s name and the country where enquiry data
                  is stored, and whether any cross-border transfer safeguards are
                  required under POPIA.
                </Confirm>
              </Section>

              <Section id="popia" title="5. POPIA & your rights">
                <p>
                  Under the Protection of Personal Information Act, 2013 (POPIA),
                  you have the right to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Be notified that we are collecting your information",
                    "Request access to the personal information we hold about you",
                    "Request correction or deletion of your information",
                    "Object to the processing of your information",
                    "Lodge a complaint with the Information Regulator (South Africa)",
                  ].map((item) => (
                    <li key={item} className={bullet}>
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  To exercise any of these rights, please contact us using the
                  details below. You may also contact the Information Regulator
                  (South Africa).
                </p>
                <Confirm>
                  the designated Information Officer (as required by POPIA) and
                  their contact details, and whether to publish the Information
                  Regulator&rsquo;s contact details directly on this page.
                </Confirm>
              </Section>

              <Section id="retention" title="6. Retention">
                <p>
                  We keep enquiry information for as long as necessary to respond
                  to your enquiry and for legitimate business and record-keeping
                  purposes, after which it is deleted or anonymised.
                </p>
                <Confirm>
                  the specific retention period(s) for quotation enquiries and CRM
                  records. No retention period is stated here until PIPECO
                  confirms it.
                </Confirm>
              </Section>

              <Section id="security" title="7. Security">
                <p>
                  We take reasonable, appropriate technical and organisational
                  measures to protect personal information against loss,
                  unauthorised access and misuse.
                </p>
                <Confirm>
                  the specific safeguards PIPECO wishes to describe. We make no
                  absolute security guarantee.
                </Confirm>
              </Section>

              <Section id="contact" title="8. Contact us">
                <p>
                  For any privacy question or to exercise your rights, contact{" "}
                  {siteConfig.businessName}:
                </p>
                <ul className="space-y-2">
                  <li className={bullet}>
                    Email:{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-medium text-forest-base underline-offset-4 hover:text-brass-dark hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className={bullet}>Phone: {siteConfig.phoneDisplay}</li>
                  <li className={bullet}>
                    Address: {siteConfig.address}, {siteConfig.locality},{" "}
                    {siteConfig.region}, {siteConfig.postalCode}
                  </li>
                </ul>
                <Confirm>
                  whether a dedicated privacy/Information Officer email should be
                  shown instead of the general sales address.
                </Confirm>
              </Section>

              <Section id="changes" title="9. Changes to this policy">
                <p>
                  We may update this policy from time to time. The current version
                  is always published on this page, with the &ldquo;last
                  updated&rdquo; date shown at the top.
                </p>
              </Section>
            </div>

            {/* Summary of outstanding confirmations */}
            <div className="mt-14 rounded-[6px] border border-brass/30 bg-brass/[0.05] p-6">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-brass-dark">
                Before publication — items requiring PIPECO / legal approval
              </h2>
              <ul className="mt-4 space-y-2 font-body text-sm leading-6 text-ink/75">
                {[
                  "Registered legal entity name and company registration number",
                  "Designated Information Officer and their contact details",
                  "Retention period(s) for enquiry and CRM records",
                  "CRM provider name, data location and any cross-border safeguards",
                  "Any additional processing purposes (e.g. marketing) and lawful basis",
                  "Any other cookies or third-party embeds in use",
                  "Security measures to describe (no absolute guarantees)",
                  "The “last updated” date on publication",
                  "Overall review and sign-off by PIPECO / their legal advisor",
                ].map((item) => (
                  <li key={item} className={bullet}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-body text-xs text-graphite">
                This page is a factual draft based on how the website actually
                works. It is not legal advice and should be reviewed and approved
                by PIPECO before the official domain goes live.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
