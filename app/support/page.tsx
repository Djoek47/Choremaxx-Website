import type { Metadata } from 'next';
import Link from 'next/link';

import ContactFormV2 from '@/components/forms/ContactFormV2';
import PageShell from '@/components/PageShell';
import SupportFaq from '@/components/support/SupportFaq';

export const metadata: Metadata = {
  title: 'Support — ChoreMaxx',
  description: 'Help with ChoreMaxx. We read every message and respond within 24 hours.',
  alternates: { canonical: 'https://www.choremaxx.app/support' },
};

export default function SupportPage() {
  return (
    <PageShell heading="Support & help" sub="We read every message and respond within 24 hours.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div
          className="rounded-[30px] p-8 flex flex-col gap-5"
          style={{ background: 'var(--gl)', border: '1px solid var(--bd)', boxShadow: 'var(--shadow)' }}
        >
          <div>
            <h2 className="text-xl font-extrabold" style={{ color: 'var(--tx)', letterSpacing: '-0.03em' }}>
              Send a message
            </h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--txm)' }}>
              Bugs, billing questions, or anything that needs a human. Delivered to support@choremaxx.app.
            </p>
          </div>
          <ContactFormV2 kind="support" />
          <div className="pt-4" style={{ borderTop: '1px solid var(--bd)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--txm)' }}>
              Or email{' '}
              <a href="mailto:support@choremaxx.app" style={{ color: 'var(--p)', fontWeight: 650 }}>
                support@choremaxx.app
              </a>
              {' · '}
              <a href="mailto:privacy@choremaxx.app" style={{ color: 'var(--p)', fontWeight: 650 }}>
                privacy@choremaxx.app
              </a>
              {' · '}
              <Link href="/suggest" style={{ color: 'var(--p)', fontWeight: 650 }}>
                Suggest an improvement
              </Link>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-extrabold mb-4" style={{ color: 'var(--tx)', letterSpacing: '-0.03em' }}>
            Frequently asked questions
          </h2>
          <SupportFaq />
        </div>
      </div>
    </PageShell>
  );
}
