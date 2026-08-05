import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChoreMaxx Support & Help Center',
  description: 'Get help with ChoreMaxx. FAQ, contact, and troubleshooting.',
  canonical: 'https://mytikas73.com/support',
};

export default function Support() {
  const faqs = [
    {
      q: "How do I create a household?",
      a: "Download ChoreMaxx, sign up with email or Apple/Google, name your household, choose your reward system (meritocracy or equity), and invite members by code or QR code.",
    },
    {
      q: "Do kids need their own email?",
      a: "No. Admins create child profiles with just a name. Kids sign in on a shared device or with a simple PIN. They don't need an email address.",
    },
    {
      q: "How do I delete my account?",
      a: "In the app: Settings → Delete account. Or email privacy@choremaxx.app. We'll remove your personal data within 30 days. Household-shared content may remain for other members.",
    },
    {
      q: "What is Nova?",
      a: "Nova is your AI co-manager. She sends daily briefings about household status, suggests task rebalancing when someone is overloaded, and recommends next steps. You always review and approve changes.",
    },
    {
      q: "Is my data sold?",
      a: "No, never. We don't sell personal data. We use Supabase for storage and OpenAI for Nova. Both are bound by strict confidentiality. You own your data and can export or delete it anytime.",
    },
    {
      q: "Can I have multiple households?",
      a: "Yes. You can create a household, join one as an invited member, or both. Switch between households in settings.",
    },
    {
      q: "What happens if someone leaves the household?",
      a: "An admin can remove members. Their past tasks and XP remain in the record. If you leave, you can always be re-invited.",
    },
    {
      q: "Where can I get help?",
      a: "Email support@choremaxx.app or privacy@choremaxx.app for privacy questions. We typically respond within 24 hours.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-balance">Support & help</h1>

          <div className="space-y-12">
            {/* Contact */}
            <div className="glass p-8 space-y-4">
              <h2 className="text-2xl font-bold text-dark-text">Contact us</h2>
              <p className="text-light-text">
                Have a question or need help? Reach out. We read every message.
              </p>
              <div className="space-y-2">
                <p className="text-light-text">
                  <strong className="text-dark-text">General support:</strong>
                  <br />
                  <a href="mailto:support@choremaxx.app" className="text-primary hover:opacity-70">
                    support@choremaxx.app
                  </a>
                </p>
                <p className="text-light-text">
                  <strong className="text-dark-text">Privacy & data:</strong>
                  <br />
                  <a href="mailto:privacy@choremaxx.app" className="text-primary hover:opacity-70">
                    privacy@choremaxx.app
                  </a>
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="mb-6 text-balance">Frequently asked questions</h2>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="glass p-6 group cursor-pointer transition-all duration-200"
                  >
                    <summary className="flex items-center justify-between font-semibold text-dark-text select-none">
                      <span>{faq.q}</span>
                      <span className="text-primary group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="text-light-text mt-4 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Trust */}
            <div className="glass-dark p-8 space-y-4">
              <h2 className="text-2xl font-bold text-dark-text">We&apos;re here for you</h2>
              <p className="text-light-text">
                ChoreMaxx is built for real households. We listen to feedback, fix bugs quickly, and keep your data
                safe. If something isn&apos;t working, let us know.
              </p>
            </div>

            {/* Legal links */}
            <div className="border-t border-divider pt-8">
              <h3 className="font-semibold text-dark-text mb-4">Legal</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a href="/privacy" className="btn-secondary">
                  Privacy Policy
                </a>
                <a href="/terms" className="btn-secondary">
                  Terms of Service
                </a>
                <a href="/copyright" className="btn-secondary">
                  Copyright
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
