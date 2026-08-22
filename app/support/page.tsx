import type { Metadata } from 'next';
import Link from 'next/link';

import ContactForm from '@/components/ContactForm';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'ChoreMaxx Support & Help Center',
  description: 'Get help with ChoreMaxx. FAQ, contact form, and troubleshooting.',
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
    a: 'Poppins is the AI built into ChoreMaxx, and it’s parents-only. Ask it how something works, or tell it what you want — assign Saturday’s yard work, move a task, remind everyone before the deadline. It answers, and it acts. Kids don’t get access to it.',
  },
  {
    q: 'How do rewards and rankings work?',
    a: 'Members earn XP the moment they tap Complete. XP builds streaks, wins the Week’s Crown and Monthly Sovereign, and can be spent in the reward shop on privileges you configure — screen time, outing choices, allowance, and more.',
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
        <div className="glass-card p-8 flex flex-col gap-5 lg:col-span-1">
          <h2 className="font-bold text-xl" style={{ color: 'var(--color-text-primary)' }}>
            Contact us
          </h2>
          <ContactForm
            kind="support"
            submitLabel="Send message"
            messageLabel="How can we help?"
            messagePlaceholder="Describe the issue — app version or device helps."
          />
          <div
            style={{ borderTop: '1px solid var(--color-border)' }}
            className="pt-5 flex flex-col gap-3"
          >
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Or email{' '}
              <a href="mailto:support@choremaxx.app" style={{ color: 'var(--color-primary)' }}>
                support@choremaxx.app
              </a>
              {' · '}
              <a href="mailto:privacy@choremaxx.app" style={{ color: 'var(--color-primary)' }}>
                privacy@choremaxx.app
              </a>
            </p>
            <Link href="/suggest" className="chip self-start">
              Share a suggestion
            </Link>
            <Link href="/privacy" className="chip self-start">
              Privacy Policy
            </Link>
            <Link href="/terms" className="chip self-start">
              Terms of Service
            </Link>
          </div>
        </div>

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
    </PageShell>
  );
}
