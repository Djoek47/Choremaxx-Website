import type { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Download ChoreMaxx for iOS & Android',
  description: 'Get ChoreMaxx on your iPhone, iPad, or Android phone. Free to download, free to use.',
};

const included = [
  'Create unlimited households',
  'Invite family members for free',
  'Access all core features: Tasks, Plan, Rewards, Nova',
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
            <div className="glass-tile p-3 w-12 h-12 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M15.5 1c-1.2 1.3-2 3-1.8 4.8 1.6.1 3.2-.9 4.2-2.1C19 2.4 19.7.8 19.5-.1c-1.5.1-3 1-4 2.1z" fill="rgba(255,255,255,0.80)" />
                <path d="M19.5 7.5c-1.9-2.4-4.6-2.3-5.5-2.3-1.1 0-2.2.3-3.1.6-1.4.5-2.6.5-3.5 0C5.5 4.7 2 5.5.5 9c-1.5 3.5-.3 9.1 2 12 1 1.3 2.3 2.5 4 2.5 1.1 0 1.9-.3 2.7-.6.9-.3 1.7-.5 2.8-.5 1.1 0 1.8.2 2.7.5.8.3 1.6.6 2.7.6 1.7 0 3-1.2 4-2.5 1-1.4 1.5-2.9 1.8-4.5-1.2-.5-3.5-1.9-3.7-5z" fill="rgba(255,255,255,0.80)" />
              </svg>
            </div>
            <h2 className="text-white font-bold text-xl">iOS</h2>
          </div>
          <p className="text-sm text-white/65">iOS 14 or later. Join our TestFlight beta to try it first.</p>
          <div className="flex flex-col gap-3">
            <button disabled className="btn-primary opacity-50 cursor-not-allowed text-sm">
              App Store — coming soon
            </button>
            <button disabled className="btn-outline opacity-50 cursor-not-allowed text-sm">
              Join TestFlight beta
            </button>
          </div>
        </div>

        {/* Android */}
        <div className="glass-card p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="glass-tile p-3 w-12 h-12 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M2 16.5A2 2 0 010 14.5v-7A2 2 0 012 5.5h18a2 2 0 012 2v7a2 2 0 01-2 2H2zM5.5 19h11M8 22V19M14 22V19" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="7" cy="11" r="1" fill="rgba(255,255,255,0.80)" />
                <circle cx="15" cy="11" r="1" fill="rgba(255,255,255,0.80)" />
              </svg>
            </div>
            <h2 className="text-white font-bold text-xl">Android</h2>
          </div>
          <p className="text-sm text-white/65">Android 12 or later. Early access available now.</p>
          <div className="flex flex-col gap-3">
            <button disabled className="btn-primary opacity-50 cursor-not-allowed text-sm">
              Google Play — coming soon
            </button>
            <button disabled className="btn-outline opacity-50 cursor-not-allowed text-sm">
              Early access
            </button>
          </div>
        </div>
      </div>

      {/* Included features */}
      <div className="glass-card p-8 mb-10">
        <h2 className="text-white font-bold text-xl mb-6">What is included — free</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {included.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-white/70">
              <span
                style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'rgba(167,139,250,0.30)',
                  border: '1px solid rgba(167,139,250,0.55)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 4.5l2 2 4-4" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Help link */}
      <p className="text-sm text-white/45 text-center">
        Questions?{' '}
        <Link href="/support" className="text-purple-300 hover:text-white transition-colors">
          Visit our help center
        </Link>
      </p>
    </PageShell>
  );
}
