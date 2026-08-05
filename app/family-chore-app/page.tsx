import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Family Chore App — ChoreMaxx',
  description:
    'ChoreMaxx is the modern family chore app. Assign tasks, track completion, reward good behavior, and keep the household running smoothly.',
  canonical: 'https://mytikas73.com/family-chore-app',
  openGraph: {
    title: 'Family Chore App — ChoreMaxx',
    description:
      'ChoreMaxx is the modern family chore app. Assign tasks, track completion, reward good behavior, and keep the household running smoothly.',
    url: 'https://mytikas73.com/family-chore-app',
    type: 'website',
  },
};

export default function FamilyChoreApp() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-balance">Family Chore App for Modern Households</h1>

          <div className="space-y-8">
            <p className="text-lg text-light-text">
              ChoreMaxx is the family chore app that transforms household work into a fair, transparent, and
              rewarding experience. Assign chores, track who completes them, award points, and unlock real rewards
              your family actually wants.
            </p>

            <div className="glass p-8 space-y-6">
              <div>
                <h2 className="mb-4">Why families love ChoreMaxx</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Less arguing:</strong> Everyone sees the full task list and
                      what&apos;s been done
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Fairness:</strong> Difficult chores earn more points, easy
                      ones less
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Real rewards:</strong> Kids earn points to spend on screen
                      time, outings, or allowance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Proof system:</strong> Take a photo to prove the job is done
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Leaderboard:</strong> Friendly competition keeps everyone
                      motivated
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h3 className="font-semibold text-dark-text mb-4">Perfect for</h3>
                <ul className="space-y-2 text-light-text">
                  <li>• Families with kids who need motivation</li>
                  <li>• Parents wanting transparency and fairness</li>
                  <li>• Households with teenagers</li>
                  <li>• Roommates sharing a space</li>
                  <li>• Blended families juggling schedules</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="mb-6">How it works</h2>
              <div className="space-y-4">
                <div className="glass-sm p-6">
                  <h3 className="font-semibold text-dark-text mb-2">1. Create tasks</h3>
                  <p className="text-sm text-light-text">
                    Choose from 136+ pre-built chores or create your own. Set points, due dates, and who it&apos;s for.
                  </p>
                </div>
                <div className="glass-sm p-6">
                  <h3 className="font-semibold text-dark-text mb-2">2. Kids complete & upload proof</h3>
                  <p className="text-sm text-light-text">
                    Kids mark tasks done and upload a photo. Parents review and approve.
                  </p>
                </div>
                <div className="glass-sm p-6">
                  <h3 className="font-semibold text-dark-text mb-2">3. Earn and spend</h3>
                  <p className="text-sm text-light-text">
                    Points accumulate into badges and tiers. Redeem for real household rewards.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8">
              <h2 className="mb-6 text-dark-text">Better than sticky notes and allowance lists</h2>
              <p className="text-light-text mb-6">
                ChoreMaxx replaces the old approach: no more forgotten chores, unclear expectations, or arguments
                about fairness. Everything is visible. Everything is trackable. Everyone understands the system.
              </p>
              <div className="flex gap-4">
                <Link href="/download" className="btn-primary">
                  Get the app
                </Link>
                <Link href="/how-it-works" className="btn-text">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
