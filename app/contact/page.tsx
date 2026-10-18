import type { Metadata } from 'next';
import Link from 'next/link';

import ContactFormV2 from '@/components/forms/ContactFormV2';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Contact — ChoreMaxx',
  description: 'Support, privacy requests, press or partnerships. We reply within 24 hours.',
  alternates: { canonical: 'https://www.choremaxx.app/contact' },
};

const DESKS = [
  { title: 'Support', body: 'Something broken, or a question about how the app behaves.', mail: 'support@choremaxx.app' },
  { title: 'Privacy & data', body: 'Access, export or deletion requests, and copyright questions.', mail: 'privacy@choremaxx.app' },
];

export default function ContactPage() {
  return (
    <PageShell
      heading="Contact us"
      sub="Support, privacy requests, press or partnerships — pick the right desk and we will come back to you."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-4">
          {DESKS.map((d) => (
            <div
              key={d.title}
              className="rounded-[26px] p-7 flex flex-col gap-2"
              style={{ background: 'var(--gl)', border: '1px solid var(--bd)', boxShadow: 'var(--shadow)' }}
            >
              <p className="text-base font-extrabold" style={{ color: 'var(--tx)' }}>{d.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--txm)' }}>{d.body}</p>
              <a href={`mailto:${d.mail}`} className="text-sm font-bold" style={{ color: 'var(--p)' }}>{d.mail}</a>
            </div>
          ))}
          <div
            className="rounded-[26px] p-7 flex flex-col gap-2"
            style={{ background: 'var(--gl)', border: '1px solid var(--bd)', boxShadow: 'var(--shadow)' }}
          >
            <p className="text-base font-extrabold" style={{ color: 'var(--tx)' }}>Response time</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--txm)' }}>
              We read every message and respond within 24 hours, usually sooner.
            </p>
            <p className="text-sm font-bold" style={{ color: 'var(--tx)' }}>Montréal, Canada</p>
          </div>
        </div>

        <div
          className="rounded-[30px] p-8 flex flex-col gap-5"
          style={{ background: 'var(--gl)', border: '1px solid var(--bd)', boxShadow: 'var(--shadow)' }}
        >
          <div>
            <h2 className="text-xl font-extrabold" style={{ color: 'var(--tx)', letterSpacing: '-0.03em' }}>
              Send us a message
            </h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--txm)' }}>
              Goes to support@choremaxx.app. For a product idea, use{' '}
              <Link href="/suggest" style={{ color: 'var(--p)', fontWeight: 650 }}>
                Suggest an improvement
              </Link>{' '}
              instead.
            </p>
          </div>
          <ContactFormV2 kind="support" messageLabel="Message" messagePlaceholder="As much detail as you have." />
        </div>
      </div>
    </PageShell>
  );
}
