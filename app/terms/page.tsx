import type { Metadata } from 'next';
import LegalDocument from '@/components/LegalDocument';

export const metadata: Metadata = {
  title: 'Terms of Service — ChoreMaxx',
  description: 'ChoreMaxx terms of service.',
  alternates: { canonical: 'https://www.choremaxx.app/terms' },
  robots: 'index, follow',
};

export default function Terms() {
  return (
    <LegalDocument title="Terms of Service" lastUpdated="2026-07-20">
      <p>
        By creating a Choremaxx account or using the app, you agree to these Terms.
      </p>

      <h2>The service</h2>
      <p>
        Choremaxx helps households coordinate tasks, groceries, calendar events, rewards, and AI briefings through
        Nova. Features may change as we ship updates.
      </p>

      <h2>Accounts & households</h2>
      <ul>
        <li>You must provide accurate account information.</li>
        <li>
          Household Owners and Admins are responsible for invites, roles, and content shared in the household.
        </li>
        <li>
          Children using Choremaxx should do so under an adult guardian who manages permissions.
        </li>
      </ul>

      <h2>Acceptable use</h2>
      <p>
        Do not misuse Choremaxx to harass others, break the law, attempt unauthorized access, or abuse AI features.
        We may suspend accounts that violate these Terms.
      </p>

      <h2>AI / Nova</h2>
      <p>
        Nova suggestions are assistive. Consequential household changes should be reviewed by humans. AI output may
        be imperfect.
      </p>

      <h2>Subscriptions & billing</h2>
      <p>
        If paid plans are offered, pricing and renewal terms will be shown in-app or on choremaxx.app before purchase.
        App Store purchases follow Apple's refund policies.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Choremaxx is provided "as is" without warranties of uninterrupted availability. To the extent permitted by
        law, liability is limited to amounts paid for the service in the prior 12 months (or zero if free).
      </p>

      <h2>Contact</h2>
      <p>
        <a href="mailto:support@choremaxx.app">support@choremaxx.app</a>
      </p>

      <p className="mt-8 text-sm text-muted">© 2026 Choremaxx. All rights reserved.</p>
    </LegalDocument>
  );
}
