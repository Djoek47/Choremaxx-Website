import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'ChoreMaxx Support & Help Center',
  description: 'Get help with ChoreMaxx. FAQ, contact, and troubleshooting.',
};

const faqs = [
  {
    q: 'How do I create a household?',
    a: 'Download ChoreMaxx, sign up with email or Apple/Google, name your household, choose your reward system, and invite members by code or QR code.',
  },
  {
    q: 'Do kids need their own email?',
    a: 'No. Admins create child profiles with just a name. Kids sign in on a shared device or with a simple PIN.',
  },
  {
    q: 'How do I delete my account?',
    a: 'In the app: Settings → Delete account. Or email privacy@choremaxx.app. We remove your data within 30 days.',
  },
  {
    q: 'What is Nova?',
    a: 'Nova is your AI co-manager. She sends daily briefings, suggests task rebalancing, and recommends next steps. You always approve changes.',
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
          <h2 className="text-white font-bold text-xl">Contact us</h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-white/45 uppercase tracking-widest mb-1">General</p>
              <a href="mailto:support@choremaxx.app" className="text-sm font-medium text-purple-300 hover:text-white transition-colors">
                support@choremaxx.app
              </a>
            </div>
            <div>
              <p className="text-xs text-white/45 uppercase tracking-widest mb-1">Privacy & data</p>
              <a href="mailto:privacy@choremaxx.app" className="text-sm font-medium text-purple-300 hover:text-white transition-colors">
                privacy@choremaxx.app
              </a>
            </div>
          </div>
          <div
            style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
            className="pt-5 flex flex-col gap-3"
          >
            <Link href="/privacy" className="chip self-start">Privacy Policy</Link>
            <Link href="/terms"   className="chip self-start">Terms of Service</Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-3 lg:col-span-2">
          <h2 className="text-white font-bold text-xl mb-2">Frequently asked questions</h2>
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="glass-tile p-5 cursor-pointer group"
            >
              <summary className="flex items-center justify-between gap-4 font-semibold text-white text-sm select-none list-none">
                <span>{q}</span>
                <svg
                  className="w-4 h-4 text-white/50 flex-shrink-0 group-open:rotate-180 transition-transform duration-200"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-sm text-white/60 leading-relaxed mt-4">{a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-white/80 text-sm leading-relaxed max-w-lg">
          Still need help? Send us a message. We are real people who care about your experience.
        </p>
        <a href="mailto:support@choremaxx.app" className="btn-primary flex-shrink-0">
          Email support
        </a>
      </div>
    </PageShell>
  );
}
