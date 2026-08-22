import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Family Chore App — ChoreMaxx',
  description:
    'ChoreMaxx is the modern family chore app. Assign tasks, track completion, reward good behavior, and keep the household running smoothly.',
  alternates: { canonical: 'https://www.choremaxx.app/family-chore-app' },
};

const whyLoveIt = [
  ['Less arguing', 'Everyone sees the full task list and what has been done'],
  ['Fairness', 'Difficult chores earn more points, easy ones less'],
  ['Real rewards', 'Kids earn points to spend on screen time, outings, or allowance'],
  ['Proof system', 'Take a photo to prove the job is done'],
  ['Leaderboard', 'Friendly competition keeps everyone motivated'],
];

const howSteps = [
  {
    n: '01',
    title: 'Create tasks',
    body: 'Choose from 150 pre-built chores across 15 domains, or create your own. Set XP, due dates, and assignee.',
  },
  {
    n: '02',
    title: 'Complete and upload proof',
    body: 'Kids mark tasks done and upload a photo. Parents review and approve.',
  },
  {
    n: '03',
    title: 'Earn and spend',
    body: 'Points accumulate into badges and rankings. Redeem for real household rewards.',
  },
];

export default function FamilyChoreApp() {
  return (
    <PageShell
      heading="Family Chore App for Modern Households"
      sub="Transforms household work into a fair, transparent, and rewarding experience."
    >
      <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--color-text-secondary)' }}>
        Assign chores, track who completes them, award points, and unlock real rewards your family
        actually wants. No more sticky notes, forgotten tasks, or arguments about fairness.
      </p>

      <h2 className="font-bold text-2xl mb-5" style={{ color: 'var(--color-text-primary)' }}>
        Why families love ChoreMaxx
      </h2>
      <div className="glass-card p-8 mb-10">
        <ul className="flex flex-col gap-4">
          {whyLoveIt.map(([strong, rest]) => (
            <li
              key={strong}
              className="flex items-start gap-3 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
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
                <strong className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  {strong}:
                </strong>{' '}
                {rest}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="font-bold text-2xl mb-5" style={{ color: 'var(--color-text-primary)' }}>
        How it works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        {howSteps.map(({ n, title, body }) => (
          <div key={n} className="glass-tile p-6 flex flex-col gap-3">
            <span
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'color-mix(in srgb, var(--color-primary) 22%, transparent)',
                lineHeight: 1,
              }}
            >
              {n}
            </span>
            <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
              {title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-semibold max-w-sm" style={{ color: 'var(--color-text-primary)' }}>
          Better than sticky notes and allowance lists.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/download" className="btn-primary">
            Get the app
          </Link>
          <Link href="/how-it-works" className="btn-ghost">
            Learn more
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
