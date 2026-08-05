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
      {/* Hero Section with Vibrant Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-40 -right-32 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
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
                  className="w-16 h-16 drop-shadow-lg"
                />
                <h1 className="text-balance text-dark-text">
                  Run your household<br />
                  <span className="bg-gradient-to-r from-primary via-pink-500 to-purple-600 bg-clip-text text-transparent">together</span>
                </h1>
                <p className="text-2xl text-light-text leading-relaxed max-w-xl">
                  AI-powered task management, rewards, and family coordination. One beautiful app to rule them all.
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
                iOS and Android • Download available now
              </p>
            </div>

            <div className="relative hidden lg:flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-3xl blur-2xl"></div>
              <div className="glass p-6 rounded-3xl transform hover:scale-105 transition-transform duration-300 relative z-10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6631-v9iwoCWH3W4q6dq7oB2z5HISd3Verm.png"
                  alt="ChoreMaxx App"
                  width={280}
                  height={560}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section with Gradient Background */}
      <section className="relative bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 right-0 w-96 h-96 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-balance text-dark-text">
              Household work shouldn&apos;t live in five apps and someone&apos;s head.
            </h2>
            <p className="text-xl text-light-text leading-relaxed">
              Unfinished chores, missed assignments, unfair distribution—and one person carrying it all. ChoreMaxx brings clarity, fairness, and momentum to every household.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-teal-50 relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="section-container relative z-10">
          <h2 className="text-center mb-20 text-balance text-dark-text">How it works</h2>

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
              <div key={i} className="glass p-8 space-y-6 transform hover:scale-105 transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-dark-text">{item.title}</h3>
                <p className="text-light-text leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="section-container relative z-10">
          <h2 className="text-center mb-20 text-balance text-dark-text">Everything you need</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Home', desc: 'Daily momentum, tasks, briefings' },
              { title: 'Tasks', desc: 'Assign, schedule, track, prove' },
              { title: 'Plan', desc: 'Calendar, events, itineraries' },
              { title: 'Rewards', desc: 'XP, badges, tiers, allowance' },
              { title: 'Nova', desc: 'AI co-manager briefings' },
            ].map((module, i) => (
              <div key={i} className="glass-sm p-6 text-center space-y-4 transform hover:scale-105 transition-transform duration-300">
                <h3 className="font-bold text-lg text-dark-text">{module.title}</h3>
                <p className="text-sm text-light-text leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute -top-40 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="section-container relative z-10">
          <h2 className="text-center mb-20 text-balance text-dark-text">Fairness, no chaos</h2>

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
              <div key={i} className="glass p-8 space-y-6 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-dark-text">{item.role}</h3>
                <ul className="space-y-4">
                  {item.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-4">
                      <span className="text-primary font-bold text-2xl flex-shrink-0">✓</span>
                      <span className="text-light-text text-lg">{feature}</span>
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

      {/* Final CTA with Gradient */}
      <section className="relative bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 opacity-20 mix-blend-multiply">
          <div className="absolute -bottom-40 right-0 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-10">
            <h2 className="text-balance text-white text-5xl md:text-6xl">Ready to run your household together?</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of families discovering calm household coordination.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link href="/download" className="px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get ChoreMaxx
              </Link>
              <Link href="/support" className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300">
                Get help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
