import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — ChoreMaxx',
  description: 'Why ChoreMaxx exists, and what we believe about household work.',
  alternates: { canonical: 'https://www.choremaxx.app/about' },
};

import Link from 'next/link';

import { MarkHouse, MarkLock, MarkPin, MarkTile } from '@/components/marks/Marks';
import PageShellV2 from '@/components/site/PageShellV2';

const CARDS = [
  { Mark: MarkPin, title: 'Built in Montréal', body: 'A small team shipping directly to the App Store, with no outside product roadmap to satisfy.' },
  { Mark: MarkHouse, title: 'Families only', body: 'We removed roommate mode and every general-purpose task feature. One audience, done properly.' },
  { Mark: MarkLock, title: 'No ads, no data sales', body: 'The subscription is the business model. Household data is encrypted and never sold.' },
];

const BELIEFS = [
  ['Effort should be visible.', 'Emptying the dishwasher is not scrubbing the tub. Every task carries a weight, so the standings reflect what people actually did.'],
  ['The rules belong to everyone.', 'Every mechanic is written down on one screen, in an Admin version and a version a nine-year-old can read. Nobody gets to claim the app cheated them.'],
  ['Parents stay in charge.', 'Poppins proposes and acts on your instruction, never on its own initiative. Sidekicks get their tasks, not the controls.'],
  ['Money stays out of it.', 'ChoreMaxx is not a payment app. It records what you owe and you settle up the way you already do.'],
];

const card: React.CSSProperties = {
  padding: 34, borderRadius: 30,
  background: 'color-mix(in srgb, var(--bg) 92%, var(--tx))',
  border: '1px solid var(--bd)',
  boxShadow: 'var(--shadow)',
  display: 'flex', flexDirection: 'column', gap: 18,
};

export default function AboutPage() {
  return (
    <PageShellV2
      kicker="Company"
      heading="We built the part the chore chart was missing"
      sub="ChoreMaxx is the chore app for families with standards — assign the work, record who did it, and make it worth doing."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={card}>
          <p style={{ margin: 0, fontSize: 20, lineHeight: 1.55, fontWeight: 600, letterSpacing: '-.02em', color: 'var(--tx)' }}>
            ChoreMaxx started the way most household software does: with a chore chart that stopped working by the second week.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: 'var(--txm)' }}>
            The chart wasn&rsquo;t the problem. Nothing was keeping score. Who did what, who did more, and what any of it was worth all lived in
            somebody&rsquo;s memory, which meant it lived in an argument. So we built the part that was missing — a system that records the work,
            weights it honestly, and holds a deadline without anyone raising their voice.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: 'var(--txm)' }}>
            Version 1 is live on the App Store. It is deliberately narrow: families, not roommates or teams. Admins assign, Sidekicks complete,
            and the app is the neutral party in between.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 16 }}>
          {CARDS.map(({ Mark, title, body }) => (
            <div key={title} style={{ ...card, padding: 26, borderRadius: 24, gap: 10 }}>
              <MarkTile><Mark /></MarkTile>
              <p style={{ margin: '6px 0 0', fontSize: 15.5, fontWeight: 650, letterSpacing: '-.02em', color: 'var(--tx)' }}>{title}</p>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--txm)' }}>{body}</p>
            </div>
          ))}
        </div>

        <div style={card}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>What we believe</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {BELIEFS.map(([lead, rest]) => (
              <p key={lead} style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: 'var(--txm)' }}>
                <strong style={{ color: 'var(--tx)', fontWeight: 650 }}>{lead}</strong> {rest}
              </p>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: '30px 34px', borderRadius: 30, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
            background: 'linear-gradient(140deg, color-mix(in srgb,var(--p) 92%,#000) 0%, var(--p) 100%)',
            boxShadow: '0 1px 0 rgba(255,255,255,.28) inset, 0 20px 50px color-mix(in srgb,var(--p) 32%,transparent)',
          }}
        >
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-.03em', color: '#fff' }}>
              Press, partnerships or a question we haven&rsquo;t answered?
            </p>
            <p style={{ margin: '7px 0 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,.84)' }}>
              We read everything that comes in and reply within 24 hours.
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              flexShrink: 0, padding: '14px 26px', borderRadius: 999, background: '#fff', color: 'var(--pd)',
              fontSize: 14.5, fontWeight: 700, boxShadow: '0 8px 24px rgba(0,0,0,.16)',
            }}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </PageShellV2>
  );
}
