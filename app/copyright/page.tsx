import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copyright — ChoreMaxx',
  description: 'Who owns what, and where to write about it.',
  alternates: { canonical: 'https://www.choremaxx.app/copyright' },
};

import LegalBody, { LegalFoot, LegalH2, LegalLead, LegalP } from '@/components/site/LegalBody';
import PageShellV2 from '@/components/site/PageShellV2';

export default function CopyrightPage() {
  return (
    <PageShellV2 kicker="Legal" heading="Copyright & Intellectual Property" sub="Who owns what, and where to write about it.">
      <LegalBody>
        <LegalLead>&copy; 2026 ChoreMaxx. All rights reserved.</LegalLead>
        <LegalP>All product names, logos, trademarks, UI, and content associated with ChoreMaxx are owned by ChoreMaxx or its licensors and may not be copied, modified, or redistributed without permission.</LegalP>
        <LegalP>App Store&reg; and Google Play&trade; are trademarks of their respective owners.</LegalP>

        <LegalH2>Contact</LegalH2>
        <LegalP><strong style={{ color: 'var(--tx)', fontWeight: 650 }}>Copyright or trademark questions:</strong> <a href="mailto:privacy@choremaxx.app">privacy@choremaxx.app</a></LegalP>
        <LegalP><strong style={{ color: 'var(--tx)', fontWeight: 650 }}>Product support:</strong> <a href="mailto:support@choremaxx.app">support@choremaxx.app</a></LegalP>

        <LegalFoot />
      </LegalBody>
    </PageShellV2>
  );
}
