import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How ChoreMaxx Works — Run Your Household Together',
  description:
    'Learn how ChoreMaxx helps households coordinate tasks, rewards, and family time in one calm place.',
  canonical: 'https://mytikas73.com/how-it-works',
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-balance">How ChoreMaxx works</h1>

          <div className="space-y-12">
            <div>
              <h2 className="mb-6">The flow</h2>
              <div className="glass p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-dark-text font-semibold">1. Create your household</h3>
                  <p className="text-light-text">
                    Sign up with email or Apple/Google. Name your household. Choose whether you want meritocracy
                    (varied XP) or equity (same XP per chore). Invite family members by code, link, or QR code.
                    Children don&apos;t need their own email—admins create profiles for them.
                  </p>
                </div>

                <div className="border-t border-divider pt-6">
                  <h3 className="text-dark-text font-semibold mb-4">2. Assign work</h3>
                  <p className="text-light-text">
                    From the Home screen, create tasks or pull from the library of 136+ household chores pre-built
                    with XP values. Set due dates, difficulty, who it&apos;s for, and whether proof is needed. Tasks
                    repeat daily, weekly, or on custom schedules. Assign to a specific person or make it available.
                  </p>
                </div>

                <div className="border-t border-divider pt-6">
                  <h3 className="text-dark-text font-semibold mb-4">3. Track completion</h3>
                  <p className="text-light-text">
                    When someone completes a task, they mark it done. If proof is required, they upload a photo.
                    Parents/admins review and approve. Completed tasks award XP immediately. The leaderboard updates
                    live.
                  </p>
                </div>

                <div className="border-t border-divider pt-6">
                  <h3 className="text-dark-text font-semibold mb-4">4. Earn and celebrate</h3>
                  <p className="text-light-text">
                    XP accumulates into streaks and unlocks badges (Week Warrior, Team Player, Clean Sweep). As
                    members reach 100 XP milestones, they climb the tier ladder—from Medal to Star to Cup to Shield
                    to Laurel to Crown. Celebrations are encouraged.
                  </p>
                </div>

                <div className="border-t border-divider pt-6">
                  <h3 className="text-dark-text font-semibold mb-4">5. Redeem rewards</h3>
                  <p className="text-light-text">
                    Parents/admins stock a reward shop with real household incentives: screen time, outing choices,
                    allowance payouts, or privileges. Members spend XP on what matters to them. Earning is fair.
                    Spending is transparent.
                  </p>
                </div>

                <div className="border-t border-divider pt-6">
                  <h3 className="text-dark-text font-semibold mb-4">6. Let Nova help</h3>
                  <p className="text-light-text">
                    Nova is your AI co-manager. Every morning, she delivers a brief: who&apos;s overloaded, what&apos;s
                    overdue, what itineraries are on today, and what work is coming up. She suggests task reassignments
                    when the load gets uneven. You review and approve changes. Nova never acts alone.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8">
              <h2 className="mb-6">Key features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Calendar view', desc: 'See all events, tasks, and itineraries in one place.' },
                  {
                    title: 'Grocery list',
                    desc: 'Mark items missing, build lists, sync with Apple Reminders.',
                  },
                  {
                    title: 'Push notifications',
                    desc: 'Reminders for tasks, approvals needed, and daily briefings.',
                  },
                  {
                    title: 'Proof system',
                    desc: 'Photo upload for chores that need verification.',
                  },
                  {
                    title: 'Live leaderboard',
                    desc: 'See this week&apos;s rankings—friendly competition.',
                  },
                  {
                    title: 'Export data',
                    desc: 'Anytime. Your data belongs to you.',
                  },
                ].map((feature, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="font-semibold text-dark-text">{feature.title}</h3>
                    <p className="text-sm text-light-text">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6">Who&apos;s it for?</h2>
              <p className="text-light-text mb-6">
                ChoreMaxx works for any household—families with kids, roommates, multigenerational homes, or blended
                families. The key is that everyone needs structure, fairness, and a break from the mental load.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    scenario: 'Families',
                    description:
                      'Parents assign chores, kids earn rewards. Everyone sees what&apos;s fair. Stress goes down.',
                  },
                  {
                    scenario: 'Roommates',
                    description:
                      'Share household work without resentment. Clear expectations, equal tracking, transparent completion.',
                  },
                  {
                    scenario: 'Blended families',
                    description:
                      'Multiple kids, multiple homes, different schedules. One system that keeps everyone coordinated.',
                  },
                ].map((item, i) => (
                  <div key={i} className="glass p-6 space-y-3">
                    <h3 className="font-semibold text-dark-text">{item.scenario}</h3>
                    <p className="text-sm text-light-text">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface border-2 border-divider rounded-lg p-8 space-y-4">
              <h2 className="text-balance">The goal</h2>
              <p className="text-light-text">
                ChoreMaxx isn&apos;t about perfection. It&apos;s about bringing clarity and fairness to household work
                so no one person carries it all. Less arguing. More time together. That&apos;s the point.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
