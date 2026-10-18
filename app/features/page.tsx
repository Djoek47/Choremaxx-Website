import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { AppleLogo, Moji } from '@/components/Brand';

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
  { role: 'Owner',        perms: ['Create household', 'Manage all invites', 'Delete household', 'View all settings'] },
  { role: 'Admin Parent', perms: ['Create & assign tasks', 'Manage reward shop', 'Approve completions', 'Invite new members'] },
  { role: 'Adult Member', perms: ['See household tasks', 'Complete assigned tasks', 'Request one-off tasks', 'Earn & spend XP'] },
  { role: 'Child',        perms: ['See your tasks', 'Mark tasks complete', 'Upload proof photos', 'View XP & badges'] },
];

const look: Record<string, { moji: string; tint: string; deep: string; art: string[] }> = {
  Tasks:       { moji: 'broom',    tint: '#FBE3D6', deep: '#D85A30', art: ['broom', 'trashBag', 'shirt', 'bed', 'toothbrush', 'tools'] },
  Plan:        { moji: 'calendar', tint: '#DDEBFA', deep: '#378ADD', art: ['calendar', 'car', 'school', 'sunrise', 'clapper', 'pizza'] },
  Rewards:     { moji: 'trophy',   tint: '#FFEBCB', deep: '#C98C1C', art: ['trophy', 'medal', 'gem', 'crown', 'fire', 'gift'] },
  'Nova AI':   { moji: 'sparkles', tint: '#E4E1F8', deep: '#7F77DD', art: ['sparkles', 'poppins', 'star', 'mic', 'book', 'check'] },
  Home:        { moji: 'heartHome', tint: '#FBDDE6', deep: '#C0476E', art: ['heartHome', 'sofa', 'plant', 'paw', 'candle', 'home'] },
  Groceries:   { moji: 'cart',     tint: '#DDF1E7', deep: '#2E9E74', art: ['cart', 'milk', 'bread', 'apple', 'cheese', 'carrot'] },
};
const roleMoji: Record<string, string> = { Owner: 'crown', 'Admin Parent': 'heartHome', 'Adult Member': 'star', Child: 'ball' };

export default function Features() {
  return (
    <PageShell heading="Features & modules" sub="Everything your household needs in one app.">
      <div className="flex flex-col gap-6 mb-20">
        {features.map(({ label, desc, details }, i) => {
          const l = look[label];
          return (
            <section key={label} className={`rounded-[34px] overflow-hidden grid md:grid-cols-[1.25fr_1fr] bg-white ${i % 2 ? 'md:[direction:rtl]' : ''}`} style={{ border: '1px solid rgba(120,70,40,.08)', boxShadow: '0 5px 0 rgba(120,70,40,.07)' }}>
              <div className="p-8 md:p-11 flex flex-col gap-5 [direction:ltr]">
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-[18px] flex items-center justify-center" style={{ background: l.tint }}><Moji name={l.moji} size={32} /></span>
                  <h2 style={{ fontSize: '2rem' }}>{label}</h2>
                </div>
                <p className="text-lg leading-relaxed" style={{ color: '#5A4438', maxWidth: 520 }}>{desc}</p>
                <ul className="flex flex-wrap gap-2 mt-1" aria-label="What you get">
                  {details.map(d => (
                    <li key={d} className="flex items-center gap-2 text-sm font-semibold rounded-full px-3.5 py-1.5" style={{ background: '#FBF4EE', color: '#5A4438' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={l.deep} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div aria-hidden className="relative min-h-[240px] flex items-center justify-center [direction:ltr]" style={{ background: l.tint }}>
                <div className="absolute inset-0 paper-dots opacity-70" />
                <div className="relative grid grid-cols-3 gap-3.5">
                  {l.art.map((m, k) => (
                    <span key={m} className="w-[72px] h-[72px] rounded-[22px] bg-white flex items-center justify-center transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-3" style={{ boxShadow: `0 5px 0 ${l.deep}33`, transform: `rotate(${((k * 7) % 5 - 2) * 2.5}deg)` }}>
                      <Moji name={m} size={40} />
                    </span>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <h2 className="mb-8">Roles & permissions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {roles.map(({ role, perms }) => (
          <div key={role} className="rounded-[26px] bg-white p-6 flex flex-col gap-4" style={{ border: '1px solid rgba(120,70,40,.08)', boxShadow: '0 5px 0 rgba(120,70,40,.07)' }}>
            <span className="w-12 h-12 rounded-[16px] flex items-center justify-center" style={{ background: '#FBF4EE' }}><Moji name={roleMoji[role]} size={28} /></span>
            <h3>{role}</h3>
            <ul className="flex flex-col gap-2.5">
              {perms.map(p => (
                <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: '#5A4438' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FBE3D6' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D85A30" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-[34px] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: '#D85A30' }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.14) 1.4px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        <p className="relative text-3xl font-extrabold" style={{ color: '#fff', letterSpacing: '-0.03em' }}>Ready to try ChoreMaxx?</p>
        <Link href="/download" className="relative btn-ghost" style={{ boxShadow: '0 4px 0 #A8411F' }}><AppleLogo size={16} />Download free</Link>
      </div>
    </PageShell>
  );
}
