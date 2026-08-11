import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'How ChoreMaxx Works — Run Your Household Together',
  description:
    'Learn how ChoreMaxx helps households coordinate tasks, groceries, plans, rewards, and Poppins AI — from setup to streaks in minutes.',
  alternates: { canonical: 'https://www.choremaxx.app/how-it-works' },
};

const flow = [
  {
    n: '01',
    title: 'Create your household',
    body: 'Sign up with email or Apple/Google. Name your household, invite family by code, link, or QR. Kids do not need their own email — admins create child profiles with a name and optional PIN.',
  },
  {
    n: '02',
    title: 'Assign today’s work',
    body: 'Create tasks or pull from 100+ pre-built household chores. Set due dates, assignees, difficulty, and whether photo proof is needed. Repeat daily, weekly, or on a custom schedule.',
  },
  {
    n: '03',
    title: 'Track completion live',
    body: 'Everyone sees what is theirs. Mark tasks done, upload proof when required, and watch XP and streaks update instantly across Home, Tasks, and Rankings.',
  },
  {
    n: '04',
    title: 'Plan trips & errands',
    body: 'Poppins bundles school pickups, practices, and grocery runs into smart trips — with leave-by times, stop order, and minutes saved versus running them separately.',
  },
  {
    n: '05',
    title: 'Earn and celebrate',
    body: 'XP builds streaks and unlocks badges. Members climb the rankings, redeem real rewards from the shop, and keep the household motivated without nagging.',
  },
  {
    n: '06',
    title: 'Let Poppins help',
    body: 'Poppins monitors schedules, GPS patterns, streaks, and rewards in the background. It suggests rebalances and trip bundles — you always approve before anything changes.',
  },
];

const whoFor = [
  {
    label: 'Families',
    desc: 'Parents assign chores, kids earn rewards. Everyone sees what is fair. Less arguing, more done.',
  },
  {
    label: 'Roommates',
    desc: 'Share household work without resentment. Clear expectations, transparent completion.',
  },
  {
    label: 'Blended households',
    desc: 'Multiple kids, multiple homes, different schedules. One calm system to coordinate.',
  },
];

export default function HowItWorks() {
  return (
    <PageShell
      heading="How ChoreMaxx works"
      sub="From setup to streaks in under ten minutes."
    >
      {/* Flow steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
        {flow.map(({ n, title, body }) => (
          <div key={n} className="glass-card p-7 flex flex-col gap-3">
            <span
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'color-mix(in srgb, var(--color-primary) 22%, transparent)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              {n}
            </span>
            <h3 className="font-bold text-base" style={{ color: '#0F0E17' }}>
              {title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#3D3A4E' }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      {/* Who it's for */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#0F0E17' }}>
        Who is it for?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {whoFor.map(({ label, desc }) => (
          <div key={label} className="glass-tile p-6 flex flex-col gap-3">
            <h3 className="font-semibold" style={{ color: '#0F0E17' }}>
              {label}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#3D3A4E' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Goal card */}
      <div className="glass-card p-10 flex flex-col gap-4">
        <h2 className="text-2xl font-bold" style={{ color: '#0F0E17' }}>
          The goal
        </h2>
        <p className="leading-relaxed max-w-2xl" style={{ color: '#3D3A4E' }}>
          ChoreMaxx is not about perfection. It is about bringing clarity and fairness to household
          work so no one person carries it all. Less arguing. More time together.
        </p>
        <div className="flex flex-wrap gap-4 mt-2">
          <Link href="/download" className="btn-primary">
            Get the app
          </Link>
          <Link href="/features" className="btn-ghost">
            Explore features
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
