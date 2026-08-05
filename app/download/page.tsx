import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download ChoreMaxx for iOS & Android',
  description: 'Get ChoreMaxx on your iPhone, iPad, or Android phone. Free to download, free to use.',
  canonical: 'https://mytikas73.com/download',
};

export default function Download() {
  return (
    <div className="min-h-screen bg-background">
      <section className="section-container">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <div>
            <h1 className="mb-4 text-balance">Download ChoreMaxx</h1>
            <p className="text-lg text-light-text">Available on iOS and Android. Coming to the app stores soon.</p>
          </div>

          <div className="glass p-12 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-dark-text">iOS</h2>
              <p className="text-light-text">
                Download from the Apple App Store. Join our TestFlight beta to try it first.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button disabled className="btn-primary opacity-50 cursor-not-allowed">
                  App Store (Coming soon)
                </button>
                <button disabled className="btn-secondary opacity-50 cursor-not-allowed">
                  Join TestFlight
                </button>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-dark-text">Android</h2>
                <p className="text-light-text">
                  Download from the Google Play Store. Early access available now.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button disabled className="btn-primary opacity-50 cursor-not-allowed">
                    Google Play (Coming soon)
                  </button>
                  <button disabled className="btn-secondary opacity-50 cursor-not-allowed">
                    Early access
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-dark p-8 space-y-4">
            <h2 className="text-2xl font-bold text-dark-text text-balance">What&apos;s included</h2>
            <ul className="space-y-3 text-left max-w-xl mx-auto">
              {[
                'Create unlimited households',
                'Invite family members for free',
                'Access all core features (Tasks, Plan, Rewards, Nova)',
                'Upload proof photos',
                'Push notifications',
                'No ads, ever',
                'Premium support (coming soon)',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-light-text">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-dark-text">Requirements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass p-6 text-center">
                <h4 className="font-semibold text-dark-text mb-3">iOS</h4>
                <p className="text-sm text-light-text">iOS 14 or later</p>
              </div>
              <div className="glass p-6 text-center">
                <h4 className="font-semibold text-dark-text mb-3">Android</h4>
                <p className="text-sm text-light-text">Android 12 or later</p>
              </div>
            </div>
          </div>

          <div className="border-t border-divider pt-8">
            <h3 className="text-lg font-semibold text-dark-text mb-4">Questions?</h3>
            <p className="text-light-text mb-6">
              Check out our help center or reach out to support.
            </p>
            <a href="/support" className="btn-text">
              Get help →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
