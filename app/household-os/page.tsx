import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Household Operating System — ChoreMaxx',
  description:
    'ChoreMaxx is an AI household operating system that coordinates tasks, schedules, rewards, and family communication in one app.',
  canonical: 'https://mytikas73.com/household-os',
  openGraph: {
    title: 'AI Household Operating System — ChoreMaxx',
    description:
      'ChoreMaxx is an AI household operating system that coordinates tasks, schedules, rewards, and family communication in one app.',
    url: 'https://mytikas73.com/household-os',
    type: 'website',
  },
};

export default function HouseholdOS() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-balance">The Household Operating System</h1>

          <div className="space-y-8">
            <p className="text-lg text-light-text">
              ChoreMaxx is an AI household operating system that brings clarity, fairness, and momentum to every
              household. Like an OS for your home, it coordinates work, schedules, rewards, and communication in one
              calm place.
            </p>

            <div className="glass p-8 space-y-6">
              <div>
                <h2 className="mb-4">Core modules</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-dark-text mb-2">Home Dashboard</h3>
                    <p className="text-sm text-light-text">
                      Household momentum, today&apos;s work, Nova&apos;s briefing, and quick actions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-2">Tasks</h3>
                    <p className="text-sm text-light-text">
                      Create, assign, track, and complete work with difficulty levels, due dates, and photo proof.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-2">Plan (Calendar)</h3>
                    <p className="text-sm text-light-text">
                      All household events, tasks, itineraries, and pickups in one calendar view.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-2">Rewards</h3>
                    <p className="text-sm text-light-text">
                      XP system, reward shop, tier progression, leaderboards, and badges.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-2">Nova (AI)</h3>
                    <p className="text-sm text-light-text">
                      AI co-manager that sends briefings, suggests rebalancing, and recommends next steps.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h3 className="font-semibold text-dark-text mb-4">Why it&apos;s an OS</h3>
                <ul className="space-y-2 text-light-text text-sm">
                  <li>
                    <strong className="text-dark-text">Centralized:</strong> No jumping between apps. Everything is
                    here.
                  </li>
                  <li>
                    <strong className="text-dark-text">Interconnected:</strong> Tasks sync to calendar. Rewards connect
                    to XP. Everything flows.
                  </li>
                  <li>
                    <strong className="text-dark-text">Intelligent:</strong> Nova learns household patterns and suggests
                    improvements.
                  </li>
                  <li>
                    <strong className="text-dark-text">Fair:</strong> Rules engine ensures transparent, enforceable
                    expectations.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="mb-6">The problem it solves</h2>
              <div className="glass-dark p-8 space-y-4">
                <p className="text-light-text">
                  Modern households are chaotic. Chores live in text threads. Schedules are scattered. One person
                  usually carries the mental load. Tasks slip. Kids don&apos;t understand expectations. Fairness is
                  unclear.
                </p>
                <p className="text-light-text">
                  ChoreMaxx is the operating system that brings order. One system. One source of truth. Everyone
                  coordinated.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-6">Who benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-6 space-y-3">
                  <h3 className="font-semibold text-dark-text">Parents</h3>
                  <p className="text-sm text-light-text">
                    Stop nagging. Assign once, track always. See what&apos;s getting done.
                  </p>
                </div>
                <div className="glass p-6 space-y-3">
                  <h3 className="font-semibold text-dark-text">Kids</h3>
                  <p className="text-sm text-light-text">
                    Clear expectations, fair rewards, friendly competition.
                  </p>
                </div>
                <div className="glass p-6 space-y-3">
                  <h3 className="font-semibold text-dark-text">Roommates</h3>
                  <p className="text-sm text-light-text">
                    Shared household, clear responsibilities, no resentment.
                  </p>
                </div>
                <div className="glass p-6 space-y-3">
                  <h3 className="font-semibold text-dark-text">Blended families</h3>
                  <p className="text-sm text-light-text">
                    Multiple kids, schedules, expectations all in one system.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8">
              <h2 className="mb-6 text-dark-text">Ready to upgrade your household?</h2>
              <p className="text-light-text mb-6">
                ChoreMaxx is the OS your household has been waiting for. Coordination, fairness, and peace of mind in
                one app.
              </p>
              <div className="flex gap-4">
                <Link href="/download" className="btn-primary">
                  Get the app
                </Link>
                <Link href="/features" className="btn-text">
                  See all features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
