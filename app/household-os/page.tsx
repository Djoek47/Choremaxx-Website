import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI Household Operating System — ChoreMaxx',
  description:
    'ChoreMaxx is an AI household OS that coordinates tasks, schedules, rewards, and family communication in one app.',
  alternates: { canonical: 'https://www.choremaxx.app/household-os' },
};

const modules = [
  {
    title: 'Home Dashboard',
    desc: "Household momentum, today's work, Poppins activity, and quick actions.",
  },
  {
    title: 'Tasks',
    desc: 'Create, assign, track, and complete work with difficulty levels and photo proof.',
  },
  {
    title: 'Plan',
    desc: 'Smart trip routing for school pickups, practices, and errands in one place.',
  },
  {
    title: 'Rewards',
    desc: 'XP system, reward shop, rankings, streaks, and badges.',
  },
  {
    title: 'Poppins AI',
    desc: 'AI co-manager: trip bundling, smart suggestions, load monitoring.',
  },
  {
    title: 'Groceries',
    desc: 'Shared shopping lists sorted by aisle, favorites, and buy-again.',
  },
];

const whoFor = [
  { label: 'Parents', desc: 'Stop nagging. Assign once, track always. See what is getting done.' },
  { label: 'Kids', desc: 'Clear expectations, fair rewards, friendly competition.' },
  { label: 'Roommates', desc: 'Shared household, clear responsibilities, no resentment.' },
  {
    label: 'Blended families',
    desc: 'Multiple kids, schedules, expectations all in one system.',
  },
];

export default function HouseholdOS() {
  return (
    <PageShell
      heading="The Household Operating System"
      sub="Coordinates work, schedules, rewards, and communication — like an OS for your home."
    >
      <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: '#3D3A4E' }}>
        ChoreMaxx brings clarity, fairness, and momentum to every household. One system, one source
        of truth, everyone coordinated.
      </p>

      <h2 className="font-bold text-2xl mb-5" style={{ color: '#0F0E17' }}>
        Core modules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {modules.map(({ title, desc }) => (
          <div key={title} className="glass-tile p-6 flex flex-col gap-2">
            <h3 className="font-semibold text-sm" style={{ color: '#0F0E17' }}>
              {title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: '#3D3A4E' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 mb-10">
        <h2 className="font-bold text-xl mb-5" style={{ color: '#0F0E17' }}>
          Why it is an OS
        </h2>
        <ul className="flex flex-col gap-3">
          {[
            ['Centralized', 'No jumping between apps. Everything is here.'],
            [
              'Interconnected',
              'Tasks sync to Plan. Rewards connect to XP. Everything flows.',
            ],
            [
              'Intelligent',
              'Poppins learns household patterns and suggests improvements.',
            ],
            ['Fair', 'Rules engine ensures transparent, enforceable expectations.'],
          ].map(([strong, rest]) => (
            <li
              key={strong}
              className="text-sm flex items-start gap-2"
              style={{ color: '#3D3A4E' }}
            >
              <span
                style={{ color: 'var(--color-primary)', fontWeight: 700, flexShrink: 0 }}
              >
                {strong}:
              </span>
              <span>{rest}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="font-bold text-2xl mb-5" style={{ color: '#0F0E17' }}>
        Who benefits
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {whoFor.map(({ label, desc }) => (
          <div key={label} className="glass-tile p-6 flex flex-col gap-2">
            <h3 className="font-semibold text-sm" style={{ color: '#0F0E17' }}>
              {label}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: '#3D3A4E' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-semibold" style={{ color: '#0F0E17' }}>
          Ready to upgrade your household?
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/download" className="btn-primary">
            Get the app
          </Link>
          <Link href="/features" className="btn-ghost">
            See all features
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
