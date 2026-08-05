import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'ChoreMaxx Features — Tasks, Plan, Rewards, Nova',
  description: 'Explore every module of ChoreMaxx: Tasks, Plan, Rewards, Nova, and more.',
};

const features = [
  {
    label: 'Tasks',
    desc: 'Create, assign, track, and complete household work. Every task has difficulty, due date, assignee, and optional photo proof.',
    details: ['136+ pre-built household chores', 'Custom task creation', 'Repeat schedules', 'Photo proof uploads', 'Difficulty levels & XP values'],
  },
  {
    label: 'Plan',
    desc: 'Calendar view of all household events, tasks, and itineraries in one place.',
    details: ['Month and week view', 'Color-coded event types', 'Itinerary builder', 'Calendar sync', 'Location-aware reminders'],
  },
  {
    label: 'Rewards',
    desc: 'Store, shop, tiers, and leaderboards. Members earn XP and spend it on real household rewards.',
    details: ['XP system', 'Custom reward shop', 'Tier progression (12 levels)', 'Live leaderboard', 'Achievement badges', 'Streak tracking'],
  },
  {
    label: 'Nova AI',
    desc: 'Your AI co-manager. Daily briefings, task rebalancing, and smart recommendations — you always approve.',
    details: ['Morning briefing', 'Load balancing suggestions', 'Predictive recommendations', 'Natural language chat', 'Privacy-first on-device mode'],
  },
  {
    label: 'Home',
    desc: 'Household command center. Momentum score, task queue, Nova briefing, and quick actions at a glance.',
    details: ['Live momentum score', "Today's tasks at a glance", 'Nova AI briefing', 'Quick task actions', 'Urgency tracking'],
  },
  {
    label: 'Groceries',
    desc: 'Built-in low/missing item tracking. Shared lists, purchase tracking, Apple Reminders export.',
    details: ['Add low/missing items', 'Shared grocery list', 'Quantity tracking', 'Checked/unchecked states', 'Export to Apple Reminders'],
  },
];

const roles = [
  {
    role: 'Owner',
    perms: ['Create household', 'Manage all invites', 'Delete household', 'View all settings'],
  },
  {
    role: 'Admin Parent',
    perms: ['Create & assign tasks', 'Manage reward shop', 'Approve completions', 'Invite new members'],
  },
  {
    role: 'Adult Member',
    perms: ['See household tasks', 'Complete assigned tasks', 'Request one-off tasks', 'Earn & spend XP'],
  },
  {
    role: 'Child',
    perms: ['See your tasks', 'Mark tasks complete', 'Upload proof photos', 'View XP & badges'],
  },
];

export default function Features() {
  return (
    <PageShell
      heading="Features & modules"
      sub="Everything your household needs in one app."
    >
      {/* Feature cards */}
      <div className="flex flex-col gap-5 mb-16">
        {features.map(({ label, desc, details }) => (
          <div key={label} className="glass-card p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-3">
              <h2 className="text-white text-xl font-bold">{label}</h2>
              <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.12)' }} className="pl-8 flex-1 hidden md:block">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">What you get</p>
              <ul className="flex flex-col gap-2">
                {details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm text-white/70">
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(167,139,250,0.80)', flexShrink: 0 }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Roles grid */}
      <h2 className="text-white text-2xl font-bold mb-6">Roles & permissions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {roles.map(({ role, perms }) => (
          <div key={role} className="glass-tile p-6 flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm">{role}</h3>
            <ul className="flex flex-col gap-2">
              {perms.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs text-white/65">
                  <span style={{ color: 'rgba(167,139,250,0.90)', fontWeight: 700 }}>✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white text-lg font-semibold">Ready to try ChoreMaxx?</p>
        <Link href="/download" className="btn-primary">Download free</Link>
      </div>
    </PageShell>
  );
}
