import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChoreMaxx — AI Household Operating System',
  description:
    'Run your household together. AI-powered task management, rewards, and family coordination in one calm place.',
  openGraph: {
    title: 'ChoreMaxx — AI Household Operating System',
    description:
      'Run your household together. AI-powered task management, rewards, and family coordination in one calm place.',
    url: 'https://mytikas73.com',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Soft Pastel Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-100/40 via-pink-50 to-blue-100/40">
        {/* Soft wavy organic shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-32 opacity-60" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d8a5d8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffc9d1" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M0,80 Q300,40 600,80 T1200,80 L1200,0 L0,0 Z" fill="url(#wave1)" />
            <path d="M0,120 Q300,80 600,120 T1200,120 L1200,60 Q600,100 0,60 Z" fill="#e8d5e8" opacity="0.25" />
          </svg>
        </div>

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Image
                  src="/brand/choremaxx-logo-mark.png"
                  alt="ChoreMaxx"
                  width={64}
                  height={64}
                  className="w-14 h-14"
                />
                <h1 className="text-balance text-dark-text leading-tight">
                  Run your household together
                </h1>
                <p className="text-xl text-light-text leading-relaxed max-w-xl">
                  AI-powered task management, rewards, and family coordination in one calm place.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/download" className="btn-primary">
                  Get the app
                </Link>
                <Link href="/how-it-works" className="btn-secondary">
                  See how it works
                </Link>
              </div>

              <p className="text-sm text-muted">
                Available on iOS and Android
              </p>
            </div>

            <div className="relative hidden lg:flex items-center justify-center">
              <div className="glass p-4 rounded-3xl shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6631-v9iwoCWH3W4q6dq7oB2z5HISd3Verm.png"
                  alt="ChoreMaxx App"
                  width={240}
                  height={480}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative bg-gradient-to-r from-pink-50/50 via-purple-50/30 to-blue-50/50 py-20 md:py-28">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-balance text-dark-text">
              Household work shouldn&apos;t live in five apps and someone&apos;s head.
            </h2>
            <p className="text-lg text-light-text leading-relaxed">
              Unfinished chores, missed assignments, unfair distribution. ChoreMaxx brings clarity, fairness, and momentum to every household.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden py-20 md:py-28">
        <div className="section-container">
          <h2 className="text-center mb-16 text-balance text-dark-text">How it works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Create your household',
                description: 'Name your space, choose your reward style, and invite family by code or QR.',
              },
              {
                step: '2',
                title: 'Assign what matters today',
                description:
                  'Set tasks, due dates, difficulty levels. Kids earn XP. Parents track momentum in real time.',
              },
              {
                step: '3',
                title: 'Earn, celebrate, stay balanced',
                description:
                  'Watch streaks build, unlock badges, reach tiers. Nova suggests adjustments when work gets uneven.',
              },
            ].map((item, i) => (
              <div key={i} className="glass p-7 space-y-4 transform hover:shadow-2xl transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-dark-text">{item.title}</h3>
                <p className="text-light-text text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-gradient-to-b from-pink-50/40 to-white py-20 md:py-28">
        <div className="section-container">
          <h2 className="text-center mb-16 text-balance text-dark-text">Everything you need</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { title: 'Home', desc: 'Daily momentum, tasks, briefings' },
              { title: 'Tasks', desc: 'Assign, schedule, track, prove' },
              { title: 'Plan', desc: 'Calendar, events, itineraries' },
              { title: 'Rewards', desc: 'XP, badges, tiers, allowance' },
              { title: 'Nova', desc: 'AI co-manager briefings' },
            ].map((module, i) => (
              <div key={i} className="glass-sm p-5 text-center space-y-3 hover:shadow-lg transition-all duration-300">
                <h3 className="font-semibold text-dark-text">{module.title}</h3>
                <p className="text-xs text-light-text leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="relative bg-gradient-to-b from-blue-50/40 to-white py-20 md:py-28">
        <div className="section-container">
          <h2 className="text-center mb-16 text-balance text-dark-text">Fairness, no chaos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                role: 'Parents & Admins',
                features: ['Create households', 'Manage roles', 'Review completions', 'Approve rewards'],
              },
              {
                role: 'Kids',
                features: ['See your tasks', 'Request one-offs', 'Earn rewards', 'Check your rank'],
              },
              {
                role: 'Roommates',
                features: ['Shared household', 'Your own tasks', 'Earn together', 'Keep it fair'],
              },
            ].map((item, i) => (
              <div key={i} className="glass p-7 space-y-5 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-dark-text">{item.role}</h3>
                <ul className="space-y-3">
                  {item.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                      <span className="text-light-text text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative bg-white py-16 md:py-20 border-t border-divider">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-balance text-dark-text">Privacy-first. Always.</h2>
            <p className="text-lg text-light-text leading-relaxed">
              Your household data stays yours. Parental controls built in. Delete your account anytime.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/privacy" className="btn-text">
                Privacy Policy
              </Link>
              <span className="hidden sm:inline text-divider">•</span>
              <Link href="/terms" className="btn-text">
                Terms of Service
              </Link>
              <span className="hidden sm:inline text-divider">•</span>
              <Link href="/kids" className="btn-text">
                Kids & Parental Controls
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-blue-100/50 py-20 md:py-28 overflow-hidden">
        {/* Soft wavy shape */}
        <svg className="absolute top-0 left-0 w-full h-20 opacity-40" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,30 Q300,10 600,30 T1200,30 L1200,0 L0,0 Z" fill="#d8a5d8" opacity="0.3" />
        </svg>
        
        <div className="section-container relative z-10 pt-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-balance text-dark-text text-4xl md:text-5xl">Ready to run your household together?</h2>
            <p className="text-lg text-light-text leading-relaxed">
              Join thousands of families discovering calm household coordination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/download" className="btn-primary px-8 py-3">
                Get ChoreMaxx
              </Link>
              <Link href="/support" className="btn-secondary px-8 py-3">
                Get help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
