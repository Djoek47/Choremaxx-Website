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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-surface-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-balance">
                  <span className="text-dark-text">Run your household</span>
                  <br />
                  <span className="text-primary">together.</span>
                </h1>
                <p className="text-xl text-light-text leading-relaxed">
                  The AI Household Operating System — tasks, plan, rewards, and Nova in one calm place.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/download" className="btn-primary text-center sm:text-left">
                  Get the app
                </Link>
                <Link href="/how-it-works" className="btn-secondary text-center sm:text-left">
                  How it works
                </Link>
              </div>

              <p className="text-sm text-muted">
                Available on iOS and Android • Download coming soon
              </p>
            </div>

            <div className="relative hidden lg:block">
              <div className="glass p-4 rounded-2xl">
                <Image
                  src="/brand/choremaxx-logo-mark.png"
                  alt="ChoreMaxx App"
                  width={300}
                  height={600}
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-surface">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-balance">
              Household work shouldn&apos;t live in five apps and someone&apos;s head.
            </h2>
            <p className="text-lg text-light-text leading-relaxed">
              Unfinished chores, missed assignments, unfair distribution—and one person carrying it all. ChoreMaxx
              brings clarity, fairness, and momentum to every household.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background">
        <div className="section-container">
          <h2 className="text-center mb-16 text-balance">How it works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div key={i} className="glass p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-dark-text">{item.title}</h3>
                <p className="text-light-text">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-surface">
        <div className="section-container">
          <h2 className="text-center mb-16 text-balance">Everything you need</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Home', desc: 'Daily momentum, tasks, briefings' },
              { title: 'Tasks', desc: 'Assign, schedule, track, prove' },
              { title: 'Plan', desc: 'Calendar, events, itineraries' },
              { title: 'Rewards', desc: 'XP, badges, tiers, allowance' },
              { title: 'Nova', desc: 'AI co-manager briefings' },
            ].map((module, i) => (
              <div key={i} className="glass-sm p-6 text-center space-y-3">
                <h3 className="font-semibold text-dark-text">{module.title}</h3>
                <p className="text-sm text-light-text">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="bg-background">
        <div className="section-container">
          <h2 className="text-center mb-16 text-balance">Fairness, no chaos</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div key={i} className="glass p-8 space-y-6">
                <h3 className="text-xl font-semibold text-dark-text">{item.role}</h3>
                <ul className="space-y-3">
                  {item.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span className="text-light-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-surface py-16 md:py-20 border-t border-divider">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-balance">Privacy-first. Always.</h2>
            <p className="text-lg text-light-text">
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
      <section className="bg-gradient-to-b from-background to-surface py-16 md:py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-balance">Ready to run your household together?</h2>
            <p className="text-lg text-light-text">
              Join thousands of families discovering calm household coordination.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download" className="btn-primary">
                Get ChoreMaxx
              </Link>
              <Link href="/support" className="btn-secondary">
                Get help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
