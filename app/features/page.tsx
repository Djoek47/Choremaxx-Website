import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChoreMaxx Features — Tasks, Plan, Rewards, Nova',
  description: 'Explore every module of ChoreMaxx: Home, Tasks, Plan, Rewards, Nova, and Groceries.',
  canonical: 'https://mytikas73.com/features',
};

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-balance">Features & modules</h1>

          <div className="space-y-12">
            {[
              {
                title: 'Home',
                icon: '🏠',
                description:
                  'Your household command center. See today&apos;s tasks, household momentum (XP earned this month), Nova&apos;s morning briefing, quick actions, and a snapshot of who needs help.',
                details: [
                  'Live household momentum score',
                  'Today&apos;s work at a glance',
                  'Nova AI briefing',
                  'Quick task actions',
                  'Trending urgencies',
                ],
              },
              {
                title: 'Tasks',
                icon: '✓',
                description:
                  'Create, assign, track, and complete household work. Every task has difficulty, due date, assignee, and optional photo proof.',
                details: [
                  '136+ pre-built household chores',
                  'Custom task creation',
                  'Repeat schedules (daily, weekly, custom)',
                  'Photo proof uploads',
                  'Difficulty levels & XP values',
                  'Filter by person, category, or status',
                ],
              },
              {
                title: 'Plan',
                icon: '📅',
                description:
                  'Calendar view of all household events, tasks, itineraries, and school pickups in one place. Plan ahead together.',
                details: [
                  'Month and week view',
                  'Color-coded event types',
                  'Itinerary builder',
                  'Sync with Apple Calendar / Google Calendar',
                  'Location-aware reminders',
                ],
              },
              {
                title: 'Rewards',
                icon: '🏆',
                description:
                  'Store, shop, tiers, and leaderboards. Members earn XP and spend it on real household rewards you create.',
                details: [
                  'XP system (meritocracy or equity)',
                  'Reward shop with custom incentives',
                  'Tier progression (12 levels)',
                  'Live leaderboard (weekly, monthly, all-time)',
                  'Achievement badges (8 types)',
                  'Streak tracking',
                ],
              },
              {
                title: 'Nova',
                icon: '✨',
                description:
                  'Your AI household co-manager. She sends daily briefings, suggests task rebalancing, and recommends what to do next—but you always approve.',
                details: [
                  'Morning briefing (status, urgencies, tips)',
                  'Load balancing suggestions',
                  'Predictive recommendations',
                  'Natural language chat interface',
                  'Privacy-first: runs on-device when possible',
                ],
              },
              {
                title: 'Groceries',
                icon: '🛒',
                description:
                  'Built-in low/missing item tracking. Mark items as needed, add to lists, track purchases. Reachable from Home or Settings.',
                details: [
                  'Add low/missing items',
                  'Shared grocery list',
                  'Quantity tracking',
                  'Checked/unchecked states',
                  'Export to Apple Reminders',
                ],
              },
            ].map((feature, i) => (
              <div key={i} className="glass p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-dark-text">{feature.title}</h2>
                    <p className="text-light-text mt-2">{feature.description}</p>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <h3 className="font-semibold text-dark-text mb-4">What you get:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {feature.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-primary font-bold mt-0.5">→</span>
                        <span className="text-light-text">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 glass-dark p-8 space-y-6">
            <h2 className="text-balance">Roles & permissions</h2>
            <p className="text-light-text">
              ChoreMaxx adapts to every household structure. Here&apos;s how:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  role: 'Owner',
                  perms: [
                    'Create household',
                    'Manage all invites',
                    'Delete household',
                    'View all settings',
                  ],
                },
                {
                  role: 'Admin Parent',
                  perms: [
                    'Create & assign tasks',
                    'Manage reward shop',
                    'Approve completions & proofs',
                    'Invite new members',
                    'View leaderboard',
                  ],
                },
                {
                  role: 'Adult Member',
                  perms: [
                    'See household tasks',
                    'Complete assigned tasks',
                    'Request one-off tasks',
                    'Earn & spend XP',
                    'Access calendar & groceries',
                  ],
                },
                {
                  role: 'Child',
                  perms: [
                    'See your tasks',
                    'Mark tasks complete',
                    'Upload proof photos',
                    'View XP & badges',
                    'Check leaderboard',
                  ],
                },
              ].map((roleInfo, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="font-semibold text-dark-text">{roleInfo.role}</h3>
                  <ul className="space-y-2">
                    {roleInfo.perms.map((perm, j) => (
                      <li key={j} className="text-sm text-light-text flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{perm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-balance">Privacy & control</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Data is yours',
                  desc: 'Export anytime. Delete account anytime. No data sales. Ever.',
                },
                {
                  title: 'Parental controls',
                  desc: 'Admins control child invites, reward approvals, and notification settings.',
                },
                {
                  title: 'Transparent tracking',
                  desc: 'All completions, XP, and proofs are visible to admins. No hidden work.',
                },
              ].map((item, i) => (
                <div key={i} className="glass p-6 text-center space-y-3">
                  <h3 className="font-semibold text-dark-text">{item.title}</h3>
                  <p className="text-sm text-light-text">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
