import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'ChoreMaxx Features — Home, Tasks, Plan, Rewards, Poppins',
  description:
    'Explore every module of ChoreMaxx: Home, Tasks, Plan, Groceries, Rewards, Rankings, and Poppins AI.',
  alternates: { canonical: 'https://www.choremaxx.app/features' },
};

const features = [
  {
    label: 'Home',
    desc: 'Household command center. Today’s progress, member chips, streak, groceries, and the next plan — all at a glance.',
    screenshot: '/screenshots/home.png',
    screenshotAlt: 'ChoreMaxx Home — Today dashboard',
    details: [
      'Live completion %, streak, and XP',
      'Per-member progress chips',
      "Today’s task queue",
      'Groceries & Plan shortcuts',
      'Poppins activity notifications',
    ],
  },
  {
    label: 'Tasks',
    desc: 'Create, assign, track, and complete household work. Every task has difficulty, due date, assignee, and optional photo proof.',
    screenshot: null as string | null,
    screenshotAlt: '',
    details: [
      '150 chores across 15 domains',
      'Custom task creation',
      'Daily, weekday, weekly & monthly repeats',
      'Photo proof uploads',
      'Weighted difficulty & XP values',
    ],
  },
  {
    label: 'Plan',
    desc: 'Smart trip routing for school pickups, practices, and errands — with leave-by times and minutes saved.',
    screenshot: '/screenshots/plan.png',
    screenshotAlt: 'ChoreMaxx Plan — smart trip routing',
    details: [
      'Poppins smart-trip bundling',
      'Stop-by-stop itineraries',
      'Time saved vs. separate runs',
      'Start Trip in Maps',
      'Calendar & routines',
    ],
  },
  {
    label: 'Groceries',
    desc: 'Shared shopping lists sorted by aisle. Favorites, buy-again, and in-store walking order.',
    screenshot: '/screenshots/shopping.png',
    screenshotAlt: 'ChoreMaxx Shopping — aisle-sorted list',
    details: [
      'Shared household list',
      'Favorites & buy again',
      'Aisle / walking order',
      'Quantity & category tags',
      'Start shopping mode',
    ],
  },
  {
    label: 'Rewards & Rankings',
    desc: 'XP lands the second a task is marked complete — no approval queue. Streaks, Late Credit, Streak Rescue, and Recess keep it fair when life happens; the Week’s Crown and Monthly Sovereign settle who’s on top.',
    screenshot: '/screenshots/rewards.png',
    screenshotAlt: 'ChoreMaxx Rewards — privilege cards',
    details: [
      'Instant XP, no approval needed',
      'Custom reward shop — instant or approval-gated',
      'Weekly Crown & Monthly Sovereign',
      'Streaks, Late Credit & Streak Rescue',
      'Allowance tracking — never a payment app',
    ],
  },
  {
    label: 'Poppins AI',
    desc: 'Your household’s AI assistant — parents only. Ask it how something works, or tell it what you want done. It answers, and it acts. Kids don’t get access to it; kids get their tasks.',
    screenshot: '/screenshots/poppins-activity.png',
    screenshotAlt: 'ChoreMaxx Poppins Activity feed',
    details: [
      'Assign or reassign tasks by request',
      'Set reminders ahead of the deadline',
      'Answers questions about how ChoreMaxx works',
      'Admin-only — kids never see it',
      'You approve everything it changes',
    ],
  },
];
const roles = [
  {
    role: 'Admin',
    perms: [
      'Up to two per household',
      'Create & assign tasks',
      'Manage the reward shop',
      'Invite Sidekicks & approve requests',
    ],
  },
  {
    role: 'Sidekick',
    perms: [
      'Joins via a personal invite link',
      'Sees and completes their own tasks',
      'Earns XP the moment they tap Complete',
      'Can propose a reward for approval',
    ],
  },
];

export default function Features() {
  return (
    <PageShell heading="Features & modules" sub="Everything your household needs in one app.">
      <div className="flex flex-col gap-5 mb-16">
        {features.map(({ label, desc, details, screenshot, screenshotAlt }) => (
          <div key={label} className="glass-card p-8 flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              <h2 style={{ color: 'var(--color-text-primary)', fontSize: '1.2rem', fontWeight: 700 }}>{label}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {desc}
              </p>
              <div className="mt-2">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  What you get
                </p>
                <ul className="flex flex-col gap-2">
                  {details.map(d => (
                    <li
                      key={d}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: 'var(--color-primary)',
                          flexShrink: 0,
                          display: 'inline-block',
                        }}
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {screenshot && (
              <div
                className="mx-auto lg:mx-0 flex-shrink-0 overflow-hidden"
                style={{
                  width: 200,
                  borderRadius: 28,
                  border: '1px solid var(--color-glass-border)',
                  boxShadow: '0 12px 40px rgba(100,80,180,0.14)',
                  background: 'var(--color-glass)',
                }}
              >
                <Image
                  src={screenshot}
                  alt={screenshotAlt}
                  width={470}
                  height={1024}
                  className="w-full h-auto block"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
        Roles & permissions
      </h2>
      <p className="text-sm mb-6 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
        Two roles, no confusion. Admins run the household; Sidekicks do the work and earn the XP.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16 max-w-2xl">
        {roles.map(({ role, perms }) => (
          <div key={role} className="glass-tile p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
              {role}
            </h3>
            <ul className="flex flex-col gap-2">
              {perms.map(p => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Ready to try ChoreMaxx?
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/download" className="btn-primary">
            Download free
          </Link>
          <Link href="/how-it-works" className="btn-ghost">
            How it works
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
