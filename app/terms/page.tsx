import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — ChoreMaxx',
  description: 'The agreement that covers your ChoreMaxx account and household.',
  alternates: { canonical: 'https://www.choremaxx.app/terms' },
};

import LegalBody, { LegalFoot, LegalH2, LegalLead, LegalP } from '@/components/site/LegalBody';
import PageShellV2 from '@/components/site/PageShellV2';

export default function TermsPage() {
  return (
    <PageShellV2 kicker="Legal" heading="Terms of Service" sub="The agreement that covers your ChoreMaxx account and household." stamp="Last updated 10 August 2026">
      <LegalBody>
        <LegalLead>By creating a Choremaxx account or using the app, you agree to these Terms.</LegalLead>

        <LegalH2>The service</LegalH2>
        <LegalP>
          Choremaxx helps <strong style={{ color: 'var(--tx)', fontWeight: 650 }}>families</strong> coordinate tasks, groceries, calendar events,
          rewards, and AI briefings through Poppins. Features may change as we ship updates. Shipping product is families-only (no roommate mode).
        </LegalP>

        <LegalH2>Accounts &amp; households</LegalH2>
        <LegalP>You must provide accurate account information.</LegalP>
        <LegalP>Household Owners and Admins are responsible for invites, roles, and content shared in the household.</LegalP>
        <LegalP>Children using Choremaxx should do so under an adult guardian who manages permissions.</LegalP>

        <LegalH2>Acceptable use</LegalH2>
        <LegalP>Do not misuse Choremaxx to harass others, break the law, attempt unauthorized access, or abuse AI features. We may suspend accounts that violate these Terms.</LegalP>

        <LegalH2>AI / Poppins</LegalH2>
        <LegalP>Poppins suggestions are assistive. Consequential household changes should be reviewed by humans. AI output may be imperfect.</LegalP>

        <LegalH2>Subscriptions &amp; billing</LegalH2>
        <LegalP>
          Paid plans (when offered): <strong style={{ color: 'var(--tx)', fontWeight: 650 }}>7-day free trial</strong>, then{' '}
          <strong style={{ color: 'var(--tx)', fontWeight: 650 }}>$4.99/month</strong> or <strong style={{ color: 'var(--tx)', fontWeight: 650 }}>$48/year</strong>{' '}
          (+ tax via Apple). Pricing and renewal terms are shown in-app before purchase. App Store purchases follow Apple&rsquo;s refund policies.
          Allowance tracking in Choremaxx never sends or transfers money — parents use <strong style={{ color: 'var(--tx)', fontWeight: 650 }}>Mark as paid</strong>.
        </LegalP>

        <LegalH2>Disclaimer</LegalH2>
        <LegalP>Choremaxx is provided &ldquo;as is&rdquo; without warranties of uninterrupted availability. To the extent permitted by law, liability is limited to amounts paid for the service in the prior 12 months (or zero if free).</LegalP>

        <LegalH2>Contact</LegalH2>
        <LegalP><a href="mailto:support@choremaxx.app">support@choremaxx.app</a></LegalP>

        <LegalFoot />
      </LegalBody>
    </PageShellV2>
  );
}
