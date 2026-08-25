import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Notice — ChoreMaxx',
  description: 'What this site stores in your browser, and why.',
  alternates: { canonical: 'https://www.choremaxx.app/cookies' },
};

import LegalBody, { LegalFoot, LegalH2, LegalLead, LegalP } from '@/components/site/LegalBody';
import PageShellV2 from '@/components/site/PageShellV2';

export default function CookiesPage() {
  return (
    <PageShellV2 kicker="Legal" heading="Cookie Notice" sub="What this site stores in your browser, and why.">
      <LegalBody>
        <LegalLead>We use essential cookies and local storage needed to run this site—things like session management, theme preferences, and authentication tokens.</LegalLead>
        <LegalP>If we add analytics or other non-essential tracking tools in the future, we will disclose them here and ask for your consent first.</LegalP>
        <LegalP>For privacy questions, contact <a href="mailto:privacy@choremaxx.app">privacy@choremaxx.app</a>.</LegalP>
        <LegalFoot />
      </LegalBody>
    </PageShellV2>
  );
}
