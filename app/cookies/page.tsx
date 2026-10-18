import type { Metadata } from 'next';
import LegalDocument from '@/components/LegalDocument';

export const metadata: Metadata = {
  title: 'Cookie Notice — ChoreMaxx',
  description: 'ChoreMaxx cookie and storage notice.',
  alternates: { canonical: 'https://www.choremaxx.app/cookies' },
  robots: 'index, follow',
};

export default function Cookies() {
  return (
    <LegalDocument title="Cookie Notice">
      <p>
        We use essential cookies and local storage needed to run this site—things like session management, theme
        preferences, and authentication tokens.
      </p>

      <p>
        If we add analytics or other non-essential tracking tools in the future, we will disclose them here and ask
        for your consent first.
      </p>

      <p>
        For privacy questions, contact <a href="mailto:privacy@choremaxx.app">privacy@choremaxx.app</a>.
      </p>

      <p className="mt-8 text-sm text-muted">© 2026 ChoreMaxx. All rights reserved.</p>
    </LegalDocument>
  );
}
