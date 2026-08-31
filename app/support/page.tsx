import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support — ChoreMaxx',
  description: 'Help with ChoreMaxx. We read every message and respond within 24 hours.',
  alternates: { canonical: 'https://www.choremaxx.app/support' },
};

import ContactFormV2 from '@/components/forms/ContactFormV2';
import SupportFaq from '@/components/support/SupportFaq';
import PageShellV2 from '@/components/site/PageShellV2';

export default function SupportPage() {
  return (
    <PageShellV2 kicker="Company" heading="Support & help" sub="We read every message and respond within 24 hours.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 20, alignItems: 'start' }}>
        <div
          className="cm-glass"
          style={{
            padding: 30, borderRadius: 30,
            background: 'color-mix(in srgb, var(--bg) 92%, var(--tx))',
            border: '1px solid var(--bd)',
            boxShadow: 'var(--shadow)',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 21, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>Contact us</h2>
          <ContactFormV2 kind="support" />
          <div style={{ paddingTop: 18, borderTop: '1px solid var(--bd)' }}>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--txm)' }}>
              Or email <a href="mailto:support@choremaxx.app">support@choremaxx.app</a> ·{' '}
              <a href="mailto:privacy@choremaxx.app">privacy@choremaxx.app</a>
            </p>
          </div>
        </div>

        <div>
          <h2 style={{ margin: '0 0 16px', fontSize: 21, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>
            Frequently asked questions
          </h2>
          <SupportFaq />
        </div>
      </div>
    </PageShellV2>
  );
}
