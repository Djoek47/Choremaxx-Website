import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChoreMaxx — AI Household Operating System',
  description:
    'Run your household together. AI-powered task management, rewards, and family coordination in one app.',
};

/* ── Icon components ─────────────────────────────────────── */
function TasksIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="16" height="2" rx="1" fill="rgba(255,255,255,0.80)" />
      <rect x="4" y="11" width="12" height="2" rx="1" fill="rgba(255,255,255,0.60)" />
      <rect x="4" y="16" width="14" height="2" rx="1" fill="rgba(255,255,255,0.60)" />
      <circle cx="22" cy="20" r="5" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" />
      <path d="M19.5 20l1.5 1.5 2.5-2.5" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function RewardsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4l2.5 5 5.5 0.8-4 3.9 0.9 5.5L14 16.5l-4.9 2.7 0.9-5.5L6 9.8l5.5-0.8z" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="7" width="18" height="16" rx="3" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" />
      <path d="M5 12h18" stroke="rgba(255,255,255,0.60)" strokeWidth="1.5" />
      <path d="M10 5v4M18 5v4" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="17" r="1.2" fill="rgba(255,255,255,0.70)" />
      <circle cx="14" cy="17" r="1.2" fill="rgba(255,255,255,0.70)" />
      <circle cx="18" cy="17" r="1.2" fill="rgba(255,255,255,0.70)" />
    </svg>
  );
}
function FamilyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="3.5" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" />
      <circle cx="19" cy="10" r="3.5" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" />
      <path d="M4 23c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 23c0-3.314 0.895-6 2-6 1.105 0 2 2.686 2 6" stroke="rgba(255,255,255,0.60)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function NovaIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="8" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" />
      <path d="M14 10v4l3 3" stroke="rgba(255,255,255,0.80)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="14" r="2" fill="rgba(255,255,255,0.30)" />
    </svg>
  );
}

/* ── Decorative 3-D ring (pure CSS/SVG) ─────────────────── */
function Ring({ size, top, left, right, bottom, rotate = 0, opacity = 0.3 }: {
  size: number; top?: string; left?: string; right?: string; bottom?: string; rotate?: number; opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width:  size,
        height: size,
        top,    left,    right,   bottom,
        borderRadius: '50%',
        border: '10px solid rgba(200,170,255,0.28)',
        boxShadow: 'inset 0 0 40px rgba(180,140,255,0.18), 0 0 60px rgba(140,100,255,0.18)',
        transform: `rotate(${rotate}deg)`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ── Module tiles data ───────────────────────────────────── */
const modules = [
  { label: 'Tasks',    icon: <TasksIcon />,    desc: 'Assign, track, prove done'      },
  { label: 'Rewards',  icon: <RewardsIcon />,  desc: 'XP, badges, tiers, allowance'   },
  { label: 'Plan',     icon: <CalendarIcon />, desc: 'Calendar, events, itineraries'  },
  { label: 'Family',   icon: <FamilyIcon />,   desc: 'Roles, kids, roommates'         },
  { label: 'Nova AI',  icon: <NovaIcon />,     desc: 'Briefings & smart suggestions'  },
];

const steps = [
  {
    n: '01',
    title: 'Create your household',
    body: 'Name your space, choose a reward style, and invite family members by code or QR.',
  },
  {
    n: '02',
    title: 'Assign what matters today',
    body: 'Set tasks, due dates, and difficulty levels. Kids earn XP. Parents track momentum live.',
  },
  {
    n: '03',
    title: 'Earn, celebrate, stay balanced',
    body: 'Watch streaks grow, unlock badges, and reach tiers. Nova re-balances work automatically.',
  },
];

const roles = [
  {
    title: 'Parents & Admins',
    items: ['Create and manage households', 'Assign tasks to any member', 'Review photo completions', 'Approve and grant rewards'],
  },
  {
    title: 'Kids',
    items: ['See your task queue', 'Request one-off tasks', 'Earn XP and badges', 'Climb the leaderboard'],
  },
  {
    title: 'Roommates',
    items: ['Equal shared household', 'Your own private tasks', 'Track fair contributions', 'No drama, just data'],
  },
];

/* ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="page-bg">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Decorative blobs */}
        <div className="blob-1" style={{ top: '-120px', right: '-80px', opacity: 0.5 }} />
        <div className="blob-2" style={{ bottom: '0', left: '-100px', opacity: 0.4 }} />
        <div className="blob-3" style={{ top: '40%', left: '40%', opacity: 0.35 }} />

        {/* Floating rings — like the reference 3-D objects */}
        <Ring size={500} top="-120px" right="-180px" rotate={-20} opacity={0.35} />
        <Ring size={360} bottom="-80px" left="-100px" rotate={15} opacity={0.25} />
        <Ring size={220} top="30%" right="8%" rotate={45} opacity={0.20} />

        <div
          className="container-page relative z-10"
          style={{ paddingTop: '7rem', paddingBottom: '5rem' }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left column — headline + CTA */}
            <div className="flex-1 flex flex-col gap-8 max-w-2xl">
              <div className="flex flex-col gap-5">
                <div className="chip self-start">AI Household OS</div>

                <h1 className="text-balance">
                  Run your household{' '}
                  <span style={{ color: 'rgba(216,180,254,1)' }}>together.</span>
                </h1>

                <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                  ChoreMaxx combines AI-powered task management, family rewards, and smart scheduling
                  into one beautiful app — so every household member knows exactly what to do.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/download" className="btn-primary">
                  Get the app
                </Link>
                <Link href="/how-it-works" className="btn-outline">
                  See how it works
                </Link>
              </div>

              <p className="text-sm text-white/40">Available on iOS and Android</p>
            </div>

            {/* Right column — glass card with app preview */}
            <div className="flex-shrink-0 hidden lg:flex items-center justify-center relative">
              <div
                className="glass-card p-5 flex flex-col gap-4"
                style={{ width: 320, position: 'relative', zIndex: 2 }}
              >
                {/* Mini stat row inside the glass card */}
                <div className="flex gap-3">
                  <div className="glass-tile flex-1 p-3 text-center">
                    <p className="text-2xl font-bold text-white">43</p>
                    <p className="text-xs text-white/60 mt-0.5">Tasks today</p>
                  </div>
                  <div className="glass-tile flex-1 p-3 text-center">
                    <p className="text-2xl font-bold text-white">1,992</p>
                    <p className="text-xs text-white/60 mt-0.5">XP earned</p>
                  </div>
                  <div className="glass-tile flex-1 p-3 text-center">
                    <p className="text-2xl font-bold text-white">31</p>
                    <p className="text-xs text-white/60 mt-0.5">Day streak</p>
                  </div>
                </div>

                {/* App screenshot */}
                <div style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6631-v9iwoCWH3W4q6dq7oB2z5HISd3Verm.png"
                    alt="ChoreMaxx app interface"
                    width={280}
                    height={400}
                    className="w-full h-auto"
                    style={{ display: 'block' }}
                  />
                </div>

                {/* Mini label */}
                <p className="text-xs text-white/50 text-center">
                  Your household · Today
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MODULES GRID ──────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="blob-2" style={{ top: '-60px', right: '10%', opacity: 0.25 }} />

        <div className="container-page relative z-10">
          <div className="flex flex-col items-center gap-4 mb-14 text-center">
            <p className="text-sm font-semibold text-white/50 uppercase tracking-widest">
              Everything in one place
            </p>
            <h2 className="text-balance">Five modules. One household.</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {modules.map(({ label, icon, desc }) => (
              <div
                key={label}
                className="glass-tile flex flex-col items-center gap-3 p-5 text-center cursor-default"
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-white/55 leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="blob-1" style={{ bottom: '-100px', left: '-80px', opacity: 0.30 }} />
        <Ring size={420} top="-80px" right="-100px" rotate={30} opacity={0.18} />

        <div className="container-page relative z-10">
          <div className="flex flex-col items-center gap-4 mb-14 text-center">
            <p className="text-sm font-semibold text-white/50 uppercase tracking-widest">Simple setup</p>
            <h2 className="text-balance">Up and running in minutes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map(({ n, title, body }) => (
              <div key={n} className="glass-card p-8 flex flex-col gap-5">
                <span
                  style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: 'rgba(255,255,255,0.12)',
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {n}
                </span>
                <h3 className="text-white font-bold text-lg">{title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES ─────────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="blob-2" style={{ top: 0, right: '-60px', opacity: 0.25 }} />

        <div className="container-page relative z-10">
          <div className="flex flex-col items-center gap-4 mb-14 text-center">
            <p className="text-sm font-semibold text-white/50 uppercase tracking-widest">Built for everyone</p>
            <h2 className="text-balance">Fairness, no chaos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map(({ title, items }) => (
              <div key={title} className="glass-card p-8 flex flex-col gap-6">
                <h3 className="text-white font-bold text-xl">{title}</h3>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: 'rgba(167,139,250,0.35)',
                          border: '1px solid rgba(167,139,250,0.60)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5l2 2 4-4" stroke="rgba(255,255,255,0.90)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIVACY STRIP ─────────────────────────────────── */}
      <section className="section relative">
        <div className="container-page">
          <div
            className="glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
          >
            <div className="flex flex-col gap-3 max-w-xl">
              <h2 className="text-white text-2xl font-bold">Privacy-first. Always.</h2>
              <p className="text-white/65 text-sm leading-relaxed">
                Your household data belongs to your household — never sold, never shared.
                Parental controls built in. Delete your account and all data at any time.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/privacy" className="chip">Privacy Policy</Link>
              <Link href="/terms"   className="chip">Terms</Link>
              <Link href="/kids"    className="chip">Kids Controls</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div className="blob-1" style={{ top: '-80px', left: '30%', opacity: 0.35 }} />
        <Ring size={600} top="-200px" right="-200px" rotate={-10} opacity={0.20} />

        <div className="container-page relative z-10 flex flex-col items-center text-center gap-8">
          <p className="text-sm font-semibold text-white/50 uppercase tracking-widest">Ready?</p>
          <h2 className="text-balance text-5xl md:text-6xl font-extrabold text-white" style={{ maxWidth: 700 }}>
            Your household is waiting.
          </h2>
          <p className="text-white/65 text-lg max-w-md leading-relaxed">
            Join thousands of families running happier homes with ChoreMaxx.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/download" className="btn-primary px-10 py-4 text-base">
              Download free
            </Link>
            <Link href="/support" className="btn-outline px-10 py-4 text-base">
              Talk to us
            </Link>
          </div>
          <p className="text-xs text-white/35">iOS and Android · Free to start · No credit card required</p>
        </div>
      </section>

    </div>
  );
}
