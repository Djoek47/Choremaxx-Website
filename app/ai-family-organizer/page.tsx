import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI Family Organizer — ChoreMaxx with Nova',
  description:
    'Nova is your AI family organizer. Daily briefings, smart task suggestions, and household insights.',
  canonical: 'https://mytikas73.com/ai-family-organizer',
};

const novaFeatures = [
  ['Daily briefing',    "What is on today, what is overdue, what is coming up, household status"],
  ['Load monitoring',   'Notices when one person has too much work'],
  ['Smart suggestions', 'Recommends task reassignments to keep things fair'],
  ['Chat interface',    'Ask Nova questions. Get household insights.'],
  ['Learns over time',  'Gets smarter as it learns your family\'s habits'],
];

const howItWorks = [
  { title: 'You set the baseline',    body: 'ChoreMaxx already has your tasks, schedules, and XP values. Nova reads from that foundation.' },
  { title: 'Nova observes patterns',  body: 'She sees who completes what, when bottlenecks happen, and when work piles up on one person.' },
  { title: 'She makes suggestions',   body: 'Nova proposes task swaps or recommends pausing a category. You review and approve.' },
  { title: 'You stay in control',     body: 'Nova never makes changes alone. Every suggestion goes to parents/admins first.' },
];

export default function AIFamilyOrganizer() {
  return (
    <PageShell
      heading="Nova: Your AI Family Organizer"
      sub="Daily briefings, smart task suggestions, and household insights that keep everyone coordinated."
    >
      <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
        Every morning, Nova sends a briefing. She notices when someone is overloaded, suggests task adjustments, and
        learns your household patterns. You stay in control — the mental load gets lighter.
      </p>

      {/* What Nova does */}
      <h2 className="text-white font-bold text-2xl mb-5">What Nova does</h2>
      <div className="glass-card p-8 mb-10">
        <ul className="flex flex-col gap-4">
          {novaFeatures.map(([strong, rest]) => (
            <li key={strong} className="flex items-start gap-3 text-sm text-white/65">
              <span
                style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(167,139,250,0.25)',
                  border: '1px solid rgba(167,139,250,0.55)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 4.5l2 2 4-4" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span><strong className="text-white/90 font-semibold">{strong}:</strong> {rest}</span>
            </li>
          ))}
        </ul>

        {/* Sample briefing */}
        <div
          style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
          className="mt-8 pt-6"
        >
          <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Sample briefing from Nova</p>
          <p
            className="text-sm text-white/65 italic leading-relaxed p-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            Good morning, Sarah. Your household momentum is strong — 87 XP earned this month. Two tasks are
            overdue. James has 5 tasks due today — you might reassign one to keep it fair. Soccer pickup is at
            3pm. Two grocery items are marked low.
          </p>
        </div>
      </div>

      {/* How it works */}
      <h2 className="text-white font-bold text-2xl mb-5">How it works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {howItWorks.map(({ title, body }) => (
          <div key={title} className="glass-tile p-6 flex flex-col gap-2">
            <h3 className="text-white font-semibold text-sm">{title}</h3>
            <p className="text-xs text-white/60 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-semibold mb-1">Not a replacement. An assistant.</p>
          <p className="text-sm text-white/60">Privacy-first · Bias-aware · Transparent</p>
        </div>
        <div className="flex gap-3">
          <Link href="/download" className="btn-primary">Try ChoreMaxx & Nova</Link>
          <Link href="/features" className="btn-outline">All features</Link>
        </div>
      </div>
    </PageShell>
  );
}
