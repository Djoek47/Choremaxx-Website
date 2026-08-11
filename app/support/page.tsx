import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'ChoreMaxx Support & Help Center',
  description: 'Get help with ChoreMaxx. FAQ, contact, and troubleshooting.',
  alternates: { canonical: 'https://www.choremaxx.app/support' },
};

const faqs = [
  {
    q: 'How do I create a household?',
    a: 'Download ChoreMaxx, sign up with email or Apple/Google, name your household, choose your reward system, and invite members by code, link, or QR.',
  },
  {
    q: 'Do kids need their own email?',
    a: 'No. Admins create child profiles with just a name. Kids sign in on a shared device or with a simple PIN.',
  },
  {
    q: 'What is Poppins?',
    a: 'Poppins is your AI co-manager. It monitors schedules, GPS patterns, streaks, and rewards in the background, then suggests trip bundles and task rebalances. You always approve changes.',
  },
  {
    q: 'How do rewards and rankings work?',
    a: 'Members earn XP for completed tasks. XP unlocks badges, climbs the rankings, and can be spent in the reward shop on privileges you configure — screen time, outing choices, allowance, and more.',
  },
  {
    q: 'How do I delete my account?',
    a: 'In the app: Settings → Delete account. Or email privacy@choremaxx.app. We remove your data within 30 days.',
  },
  {
    q: 'Is my data sold?',
    a: 'No, never. We do not sell personal data. You own your data and can export or delete it at any time.',
  },
  {
    q: 'Can I have multiple households?',
    a: 'Yes. You can create a household, join one as a member, or both. Switch between them in settings.',
  },
  {
    q: 'What happens if someone leaves the household?',
    a: 'An admin can remove members. Their past tasks and XP remain on record. They can always be re-invited.',
  },
];

export default function Support() {
  return (
    <PageShell heading="Support & help" sub="We read every message and respond within 24 hours.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Contact card */}
        <div className="glass-card p-8 flex flex-col gap-5 lg:col-span-1">
          <h2 className="font-bold text-xl" style={{ color: 'var(--color-text-primary)' }}>
            Contact us
          </h2>
          <div className="flex flex-col gap-4">
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: 'var(--color-text-muted)' }}
              >
                General
              </p>
              <a
                href="mailto:support@choremaxx.app"
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--color-primary)' }}
              >
                support@choremaxx.app
              </a>
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Privacy & data
              </p>
              <a
                href="mailto:privacy@choremaxx.app"
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--color-primary)' }}
              >
                privacy@choremaxx.app
              </a>
            </div>
          </div>
          <div
            style={{ borderTop: '1px solid rgba(200,190,230,0.35)' }}
            className="pt-5 flex flex-col gap-3"
          >
            <Link href="/privacy" className="chip self-start">
              Privacy Policy
            </Link>
            <Link href="/terms" className="chip self-start">
              Terms of Service
            </Link>
            <Link href="/kids" className="chip self-start">
              Kids & parental controls
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-3 lg:col-span-2">
          <h2 className="font-bold text-xl mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Frequently asked questions
          </h2>
          {faqs.map(({ q, a }) => (
            <details key={q} className="glass-tile p-5 cursor-pointer group">
              <summary
                className="flex items-center justify-between gap-4 font-semibold text-sm select-none list-none"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <span>{q}</span>
                <svg
                  className="w-4 h-4 flex-shrink-0 group-open:rotate-180 transition-transform duration-200"
                  style={{ color: 'var(--color-text-muted)' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--color-text-secondary)' }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
          Still need help? Send us a message. We are real people who care about your experience.
        </p>
        <a href="mailto:support@choremaxx.app" className="btn-primary flex-shrink-0">
          Email support
        </a>
      </div>
    </PageShell>
  );
}
