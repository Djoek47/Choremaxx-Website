import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Download ChoreMaxx for iOS & Android',
  description: 'Get ChoreMaxx on your iPhone, iPad, or Android phone. Free to download, free to use.',
  alternates: { canonical: 'https://www.choremaxx.app/download' },
};

const included = [
  'Create unlimited households',
  'Invite family members for free',
  'Access all core features: Home, Tasks, Plan, Rewards, Poppins',
  'Upload photo proof for chores',
  'Push notifications',
  'No ads, ever',
];

export default function Download() {
  return (
    <PageShell
      heading="Download ChoreMaxx"
      sub="Available on iOS and Android. Coming to the app stores soon."
    >
      {/* Platform cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {/* iOS */}
        <div className="glass-card p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
                color: 'var(--color-primary)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            <h2 className="font-bold text-xl" style={{ color: 'var(--color-text-primary)' }}>
              iOS
            </h2>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            iOS 14 or later. Join our TestFlight beta to try it first.
          </p>
          <div className="flex flex-col gap-3">
            <button disabled className="btn-primary opacity-50 cursor-not-allowed text-sm">
              App Store — coming soon
            </button>
            <button disabled className="btn-ghost opacity-50 cursor-not-allowed text-sm">
              Join TestFlight beta
            </button>
          </div>
        </div>

        {/* Android */}
        <div className="glass-card p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
                color: 'var(--color-primary)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24A11.46 11.46 0 0012 8.25c-1.53 0-2.98.3-4.29.84L5.83 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C3.97 11.05 2.25 13.87 2 17.25h20c-.25-3.38-1.97-6.2-4.4-7.77zM7.5 15a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm9 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
              </svg>
            </div>
            <h2 className="font-bold text-xl" style={{ color: 'var(--color-text-primary)' }}>
              Android
            </h2>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Android 12 or later. Early access available soon.
          </p>
          <div className="flex flex-col gap-3">
            <button disabled className="btn-primary opacity-50 cursor-not-allowed text-sm">
              Google Play — coming soon
            </button>
            <button disabled className="btn-ghost opacity-50 cursor-not-allowed text-sm">
              Early access
            </button>
          </div>
        </div>
      </div>

      {/* Included features */}
      <div className="glass-card p-8 mb-10">
        <h2 className="font-bold text-xl mb-6" style={{ color: 'var(--color-text-primary)' }}>
          What is included — free
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {included.map(item => (
            <li
              key={item}
              className="flex items-center gap-3 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'color-mix(in srgb, var(--color-primary) 14%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-primary) 35%, transparent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'var(--color-primary)',
                }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Help link */}
      <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
        Questions?{' '}
        <Link
          href="/support"
          className="font-medium transition-colors"
          style={{ color: 'var(--color-primary)' }}
        >
          Visit our help center
        </Link>
      </p>
    </PageShell>
  );
}
