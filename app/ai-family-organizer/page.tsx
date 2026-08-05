import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Family Organizer — ChoreMaxx with Nova',
  description:
    'Nova is your AI family organizer. Daily briefings, smart task suggestions, and household insights that keep everyone coordinated.',
  canonical: 'https://mytikas73.com/ai-family-organizer',
  openGraph: {
    title: 'AI Family Organizer — ChoreMaxx with Nova',
    description:
      'Nova is your AI family organizer. Daily briefings, smart task suggestions, and household insights that keep everyone coordinated.',
    url: 'https://mytikas73.com/ai-family-organizer',
    type: 'website',
  },
};

export default function AIFamilyOrganizer() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-balance">Nova: Your AI Family Organizer</h1>

          <div className="space-y-8">
            <p className="text-lg text-light-text">
              Nova is the AI co-manager built into ChoreMaxx. Every morning, she sends a briefing. She notices when
              someone is overloaded. She suggests task adjustments. She learns your household patterns. You stay in
              control, but the mental load gets lighter.
            </p>

            <div className="glass p-8 space-y-6">
              <div>
                <h2 className="mb-4">What Nova does</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Daily briefing:</strong> What&apos;s on today, what&apos;s
                      overdue, what&apos;s coming up, household status
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Load monitoring:</strong> Notices when one person has too much
                      work
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Smart suggestions:</strong> Recommends task reassignments to
                      keep things fair
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Chat interface:</strong> Ask Nova questions. Get household
                      insights.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-light-text">
                      <strong className="text-dark-text">Learns over time:</strong> Nova gets smarter as she learns
                      your family&apos;s habits
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h3 className="font-semibold text-dark-text mb-4">Sample briefing from Nova</h3>
                <div className="bg-surface-secondary rounded-lg p-4 text-sm text-light-text italic">
                  Good morning, Sarah. Your household momentum is strong · 87 XP earned this month. Two tasks are
                  overdue. James has 5 tasks due today—you might reassign one to keep it fair. Soccer pickup is at
                  3pm. Two grocery items are marked low. This week's rankings are tight—David is catching up to you.
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-6">How it works</h2>
              <div className="space-y-4">
                <div className="glass-sm p-6">
                  <h3 className="font-semibold text-dark-text mb-2">You set the baseline</h3>
                  <p className="text-sm text-light-text">
                    ChoreMaxx already has your tasks, schedules, and XP values. Nova reads from that foundation.
                  </p>
                </div>
                <div className="glass-sm p-6">
                  <h3 className="font-semibold text-dark-text mb-2">Nova observes patterns</h3>
                  <p className="text-sm text-light-text">
                    She sees who completes what, when bottlenecks happen, and when work piles up on one person.
                  </p>
                </div>
                <div className="glass-sm p-6">
                  <h3 className="font-semibold text-dark-text mb-2">She makes suggestions</h3>
                  <p className="text-sm text-light-text">
                    Nova proposes task swaps or recommends pausing a category. You review and approve.
                  </p>
                </div>
                <div className="glass-sm p-6">
                  <h3 className="font-semibold text-dark-text mb-2">You stay in control</h3>
                  <p className="text-sm text-light-text">
                    Nova never makes changes alone. Every suggestion goes to parents/admins for review first.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-dark p-8">
              <h2 className="mb-6 text-dark-text">Not a replacement. An assistant.</h2>
              <p className="text-light-text mb-6">
                Nova is not designed to replace human judgment. She&apos;s designed to reduce the mental load—catching
                things you might miss, highlighting patterns, and suggesting tweaks. You decide what actually changes.
              </p>
              <ul className="space-y-2 text-light-text text-sm mb-6">
                <li>
                  <strong className="text-dark-text">Privacy-first:</strong> Nova data stays in your household.
                </li>
                <li>
                  <strong className="text-dark-text">Bias-aware:</strong> You set the rules Nova follows.
                </li>
                <li>
                  <strong className="text-dark-text">Transparent:</strong> You see how Nova reaches conclusions.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-balance">Questions about Nova?</h2>
              <p className="text-light-text">
                Check our <Link href="/support" className="btn-text inline">FAQ</Link> or email{' '}
                <a href="mailto:support@choremaxx.app" className="btn-text inline">support@choremaxx.app</a>.
              </p>

              <div className="flex gap-4 pt-4">
                <Link href="/download" className="btn-primary">
                  Try ChoreMaxx & Nova
                </Link>
                <Link href="/features" className="btn-secondary">
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
