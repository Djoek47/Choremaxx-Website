import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI Family Organizer — ChoreMaxx with Poppins',
  description:
    'Poppins is your AI family organizer. Smart trip bundling, task suggestions, and household insights.',
  alternates: { canonical: 'https://www.choremaxx.app/ai-family-organizer' },
};

const poppinsFeatures = [
  [
    'Smart trip bundling',
    'Bundles school pickups, practices, and errands into optimised trips that save real time',
  ],
  ['Load monitoring', 'Notices when one person has too much work'],
  ['Smart suggestions', 'Recommends task reassignments to keep things fair'],
  ['Background awareness', 'Monitors schedules, GPS patterns, streaks & rewards quietly'],
  ['Learns over time', "Gets smarter as it learns your family's habits"],
];

const howItWorks = [
  {
    title: 'You set the baseline',
    body: 'ChoreMaxx already has your tasks, schedules, and XP values. Poppins reads from that foundation.',
  },
  {
    title: 'Poppins observes patterns',
    body: 'It sees who completes what, when bottlenecks happen, and when work piles up on one person.',
  },
  {
    title: 'It makes suggestions',
    body: 'Poppins proposes trip bundles or task swaps. You review and approve.',
  },
  {
    title: 'You stay in control',
    body: 'Poppins never makes changes alone. Every suggestion goes to parents/admins first.',
  },
];

export default function AIFamilyOrganizer() {
  return (
    <PageShell
      heading="Poppins: Your AI Family Organizer"
      sub="Smart trip bundling, task suggestions, and household insights that keep everyone coordinated."
    >
      <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: '#3D3A4E' }}>
        Poppins monitors schedules, GPS patterns, streaks, and rewards in the background. It notices
        when someone is overloaded, bundles errands into smarter trips, and learns your household
        patterns. You stay in control — the mental load gets lighter.
      </p>

      <h2 className="font-bold text-2xl mb-5" style={{ color: '#0F0E17' }}>
        What Poppins does
      </h2>
      <div className="glass-card p-8 mb-10">
        <ul className="flex flex-col gap-4">
          {poppinsFeatures.map(([strong, rest]) => (
            <li
              key={strong}
              className="flex items-start gap-3 text-sm"
              style={{ color: '#3D3A4E' }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'color-mix(in srgb, var(--color-primary) 14%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-primary) 35%, transparent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--color-primary)',
                }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <strong className="font-semibold" style={{ color: '#0F0E17' }}>
                  {strong}:
                </strong>{' '}
                {rest}
              </span>
            </li>
          ))}
        </ul>

        <div
          style={{ borderTop: '1px solid rgba(200,190,230,0.35)' }}
          className="mt-8 pt-6"
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: '#8B8AA0' }}
          >
            Sample from Poppins
          </p>
          <p
            className="text-sm italic leading-relaxed p-4 rounded-xl"
            style={{
              color: '#3D3A4E',
              background: 'color-mix(in srgb, var(--color-primary) 6%, #FFFFFF)',
              border: '1px solid color-mix(in srgb, var(--color-primary) 18%, transparent)',
            }}
          >
            I&apos;ve analysed your calendar and errands. I&apos;ve bundled 3 optimised trips that
            can save you 2h 20m this week. Leave by 2:50 for the after-school run — 3 stops, about 42
            minutes.
          </p>
        </div>
      </div>

      <h2 className="font-bold text-2xl mb-5" style={{ color: '#0F0E17' }}>
        How it works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {howItWorks.map(({ title, body }) => (
          <div key={title} className="glass-tile p-6 flex flex-col gap-2">
            <h3 className="font-semibold text-sm" style={{ color: '#0F0E17' }}>
              {title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: '#3D3A4E' }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-semibold mb-1" style={{ color: '#0F0E17' }}>
            Not a replacement. An assistant.
          </p>
          <p className="text-sm" style={{ color: '#8B8AA0' }}>
            Privacy-first · Bias-aware · Transparent
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/download" className="btn-primary">
            Try ChoreMaxx & Poppins
          </Link>
          <Link href="/features" className="btn-ghost">
            All features
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
