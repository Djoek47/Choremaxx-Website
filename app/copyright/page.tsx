import type { Metadata } from 'next';
import LegalDocument from '@/components/LegalDocument';

export const metadata: Metadata = {
  title: 'Copyright — ChoreMaxx',
  description: 'ChoreMaxx copyright and intellectual property information.',
  alternates: { canonical: 'https://www.choremaxx.app/copyright' },
  robots: 'index, follow',
};

export default function Copyright() {
  return (
    <LegalDocument title="Copyright & Intellectual Property">
      <p>
        © 2026 ChoreMaxx. All rights reserved.
      </p>

      <p>
        All product names, logos, trademarks, UI, and content associated with ChoreMaxx are owned by ChoreMaxx or its
        licensors and may not be copied, modified, or redistributed without permission.
      </p>

      <p>
        App Store® and Google Play™ are trademarks of their respective owners.
      </p>

      <h2>Contact</h2>
      <ul>
        <li>
          <strong>Copyright or trademark questions:</strong>{' '}
          <a href="mailto:privacy@choremaxx.app">privacy@choremaxx.app</a>
        </li>
        <li>
          <strong>Product support:</strong> <a href="mailto:support@choremaxx.app">support@choremaxx.app</a>
        </li>
      </ul>

      <p className="mt-8 text-sm text-muted">© 2026 ChoreMaxx. All rights reserved.</p>
    </LegalDocument>
  );
}
