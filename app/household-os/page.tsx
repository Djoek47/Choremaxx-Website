import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI Household Operating System — ChoreMaxx',
  description:
    'ChoreMaxx is an AI household OS that coordinates tasks, schedules, rewards, and family communication in one app.',
  canonical: 'https://mytikas73.com/household-os',
};

const modules = [
  { title: 'Home Dashboard',  desc: 'Household momentum, today\'s work, Nova briefing, and quick actions.' },
  { title: 'Tasks',           desc: 'Create, assign, track, and complete work with difficulty levels and photo proof.' },
  { title: 'Plan',            desc: 'All household events, tasks, and itineraries in one calendar view.' },
  { title: 'Rewards',         desc: 'XP system, reward shop, tier progression, leaderboards, and badges.' },
  { title: 'Nova AI',         desc: 'AI co-manager: daily briefings, smart suggestions, load monitoring.' },
];

const whoFor = [
  { label: 'Parents',        desc: 'Stop nagging. Assign once, track always. See what is getting done.' },
  { label: 'Kids',           desc: 'Clear expectations, fair rewards, friendly competition.' },
  { label: 'Roommates',      desc: 'Shared household, clear responsibilities, no resentment.' },
  { label: 'Blended families', desc: 'Multiple kids, schedules, expectations all in one system.' },
];

export default function HouseholdOS() {
  return (
    <PageShell
      heading="The Household Operating System"
      sub="Coordinates work, schedules, rewards, and communication — like an OS for your home."
    >
      {/* Intro */}
      <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
        ChoreMaxx brings clarity, fairness, and momentum to every household. One system, one source of truth,
        everyone coordinated.
      </p>

      {/* Core modules */}
      <h2 className="text-white font-bold text-2xl mb-5">Core modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {modules.map(({ title, desc }) => (
          <div key={title} className="glass-tile p-6 flex flex-col gap-2">
            <h3 className="text-white font-semibold text-sm">{title}</h3>
            <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Why it is an OS */}
      <div className="glass-card p-8 mb-10">
        <h2 className="text-white font-bold text-xl mb-5">Why it is an OS</h2>
        <ul className="flex flex-col gap-3">
          {[
            ['Centralized',   'No jumping between apps. Everything is here.'],
            ['Interconnected','Tasks sync to calendar. Rewards connect to XP. Everything flows.'],
            ['Intelligent',   'Nova learns household patterns and suggests improvements.'],
            ['Fair',          'Rules engine ensures transparent, enforceable expectations.'],
          ].map(([strong, rest]) => (
            <li key={strong} className="text-sm text-white/65 flex items-start gap-2">
              <span style={{ color: 'rgba(196,181,253,0.90)', fontWeight: 700, flexShrink: 0 }}>{strong}:</span>
              <span>{rest}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Who benefits */}
      <h2 className="text-white font-bold text-2xl mb-5">Who benefits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {whoFor.map(({ label, desc }) => (
          <div key={label} className="glass-tile p-6 flex flex-col gap-2">
            <h3 className="text-white font-semibold text-sm">{label}</h3>
            <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white font-semibold">Ready to upgrade your household?</p>
        <div className="flex gap-3">
          <Link href="/download" className="btn-primary">Get the app</Link>
          <Link href="/features" className="btn-outline">See all features</Link>
        </div>
      </div>
    </PageShell>
  );
}
