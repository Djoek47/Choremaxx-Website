import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'How ChoreMaxx Works — Run Your Household Together',
  description: 'Learn how ChoreMaxx helps households coordinate tasks, rewards, and family time.',
};

const flow = [
  {
    n: '01',
    title: 'Create your household',
    body: 'Sign up with email or Apple/Google. Name your household. Choose meritocracy or equity rewards. Invite family members by code, link, or QR code. Children do not need their own email.',
  },
  {
    n: '02',
    title: 'Assign work',
    body: 'Create tasks or pull from 136+ pre-built household chores. Set due dates, difficulty, assignee, and whether proof is needed. Tasks repeat daily, weekly, or on custom schedules.',
  },
  {
    n: '03',
    title: 'Track completion',
    body: 'Mark tasks done. If proof is required, upload a photo. Parents review and approve. XP awards instantly. The leaderboard updates live.',
  },
  {
    n: '04',
    title: 'Earn and celebrate',
    body: 'XP builds streaks and unlocks badges. Members climb the 12-tier ladder from Medal to Crown. Celebrations encouraged.',
  },
  {
    n: '05',
    title: 'Redeem rewards',
    body: 'Admins stock a reward shop with real incentives: screen time, outing choices, allowance, privileges. Members spend XP on what matters to them.',
  },
  {
    n: '06',
    title: 'Let Nova help',
    body: 'Nova delivers a morning brief: who is overloaded, what is overdue, what is coming up. She suggests task reassignments. You review and approve. Nova never acts alone.',
  },
];

const whoFor = [
  { label: 'Families',         desc: 'Parents assign chores, kids earn rewards. Everyone sees what is fair. Stress goes down.' },
  { label: 'Roommates',        desc: 'Share household work without resentment. Clear expectations, transparent completion.' },
  { label: 'Blended families', desc: 'Multiple kids, multiple homes, different schedules. One system to coordinate.' },
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
          <div key={n} className="glass-card p-7 flex flex-col gap-4">
            <span
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'rgba(255,255,255,0.10)',
                lineHeight: 1,
              }}
            >
              {n}
            </span>
            <h3 className="text-white font-bold text-base">{title}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Who it's for */}
      <h2 className="text-white text-2xl font-bold mb-6">Who is it for?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {whoFor.map(({ label, desc }) => (
          <div key={label} className="glass-tile p-6 flex flex-col gap-3">
            <h3 className="text-white font-semibold">{label}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Goal card */}
      <div className="glass-card p-10 flex flex-col gap-4">
        <h2 className="text-white text-2xl font-bold">The goal</h2>
        <p className="text-white/65 leading-relaxed max-w-2xl">
          ChoreMaxx is not about perfection. It is about bringing clarity and fairness to household work so no
          one person carries it all. Less arguing. More time together.
        </p>
        <div className="flex gap-4 mt-2">
          <Link href="/download" className="btn-primary">Get the app</Link>
          <Link href="/support"  className="btn-outline">Questions?</Link>
        </div>
      </div>
    </PageShell>
  );
}
