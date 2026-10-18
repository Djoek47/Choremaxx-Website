import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — ChoreMaxx',
  description: 'Support, privacy requests, press or partnerships. We reply within 24 hours.',
  alternates: { canonical: 'https://www.choremaxx.app/contact' },
};

import ContactFormV2 from '@/components/forms/ContactFormV2';
import PageShellV2 from '@/components/site/PageShellV2';

const DESKS = [
  { title: 'Support', body: 'Something broken, or a question about how the app behaves.', mail: 'support@choremaxx.app' },
  { title: 'Privacy & data', body: 'Access, export or deletion requests, and copyright questions.', mail: 'privacy@choremaxx.app' },
];

const card: React.CSSProperties = {
  padding: 28, borderRadius: 26, background: 'var(--gl)', border: '1px solid var(--glb)',
  backdropFilter: 'blur(26px)', boxShadow: 'var(--shadow)',
  display: 'flex', flexDirection: 'column', gap: 9,
};

export default function ContactPage() {
  return (
    <PageShellV2
      kicker="Company"
      heading="Contact us"
      sub="Support, privacy requests, press or partnerships — pick the right desk and we will come back to you."
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {DESKS.map((d) => (
            <div key={d.title} style={card}>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 650, letterSpacing: '-.02em', color: 'var(--tx)' }}>{d.title}</p>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--txm)' }}>{d.body}</p>
              <a href={`mailto:${d.mail}`} style={{ fontSize: 14, fontWeight: 650 }}>{d.mail}</a>
            </div>
          ))}
          <div style={card}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 650, letterSpacing: '-.02em', color: 'var(--tx)' }}>Response time</p>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--txm)' }}>
              We read every message and respond within 24 hours, usually sooner.
            </p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 650, color: 'var(--tx)' }}>Montr&eacute;al, Canada</p>
          </div>
        </div>

        <div style={{ ...card, padding: 34, borderRadius: 30, gap: 18 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>Send us a message</h2>
            <p style={{ margin: '7px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--txm)' }}>
              Goes to support@choremaxx.app. For a product idea, use{' '}
              <a href="/suggest">Suggest an improvement</a> instead.
            </p>
          </div>
          <ContactFormV2 kind="support" messageLabel="Message" messagePlaceholder="As much detail as you have." />
        </div>
      </div>
    </PageShellV2>
  );
}
