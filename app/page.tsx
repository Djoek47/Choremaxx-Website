import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChoreMaxx — AI Household Operating System',
  description:
    'AI organizes chores, shopping, schedules and responsibilities so everyone knows exactly what to do.',
};

/* ─── Inline SVG icons ────────────────────────────────────── */
function Icon({ d, size = 22 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* ─── Glass floating ring decoration ─────────────────────── */
function Ring({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden
      className="ring-deco"
      style={{
        width: size,
        height: size,
        border: '9px solid rgba(180,160,240,0.22)',
        boxShadow: 'inset 0 0 50px rgba(160,130,255,0.14), 0 0 60px rgba(140,110,255,0.12)',
        ...style,
      }}
    />
  );
}

/* ─── Section wrapper ─────────────────────────────────────── */
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`section relative overflow-hidden ${className}`}>
      {children}
    </section>
  );
}

/* ─── Feature icons (thin stroke, primary-colored) ────────── */
const featureItems = [
  {
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
    label: 'Poppins AI',
    sub: 'Natural conversations. Real results.',
  },
  {
    icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
    label: 'Smart Scheduling',
    sub: 'Automatically plan the perfect week.',
  },
  {
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    label: 'Shared Tasks',
    sub: 'Everyone knows what to do and when.',
  },
  {
    icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z',
    label: 'Grocery & Lists',
    sub: 'Smart lists that update themselves.',
  },
  {
    icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
    label: 'Rewards & XP',
    sub: 'Motivate with rewards, XP and achievements.',
  },
  {
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    label: 'Household Insights',
    sub: 'Understand your home with powerful insights.',
  },
];

const householdModes = [
  { label: 'Parents',    sub: 'For families with kids',       iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
  { label: 'Roommates',  sub: 'Share and split tasks',        iconPath: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
  { label: 'Couples',    sub: 'Build better habits together', iconPath: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
  { label: 'Caretakers', sub: 'Care made simple',             iconPath: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
  { label: 'Students',   sub: 'Stay on top of tasks',         iconPath: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5' },
  { label: 'Kids',       sub: 'Fun & responsibility',         iconPath: 'M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z' },
];

const timelineItems = [
  { time: '9:00 AM',   label: 'Breakfast',    person: 'Mom',   active: false },
  { time: '10:30 AM',  label: 'Laundry',      person: 'Sarah', active: false },
  { time: '1:00 PM',   label: 'Take Garbage', person: 'Alex',  active: true  },
  { time: '4:30 PM',   label: 'Clean Room',   person: 'Noah',  active: false },
  { time: '7:00 PM',   label: 'Water Plants', person: 'Emma',  active: false },
];

const testimonials = [
  {
    quote: '"ChoreMaxx made our chaotic house feel calm. Everyone finally pulls their weight!"',
    name: 'Jessica M.',
    role: 'Mom of 3',
  },
  {
    quote: '"As roommates, this app is a game changer. No more awkward reminders!"',
    name: 'Daniel K.',
    role: 'College Student',
  },
  {
    quote: '"The AI suggestions are incredibly helpful. It knows what we need."',
    name: 'Alex T.',
    role: 'Working Professional',
  },
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'For small households getting started.',
    features: ['Up to 5 members', 'Basic task management', 'Grocery list', 'Mobile app access'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$4.99',
    period: '/month',
    desc: 'Advanced features for growing homes.',
    features: ['Unlimited members', 'Poppins AI', 'Advanced scheduling', 'Rewards & XP', 'Priority support'],
    cta: 'Start Free Trial',
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Family',
    price: '$8.99',
    period: '/month',
    desc: 'Everything in Premium, plus more.',
    features: ['Multi-home management', 'Advanced insights', 'Custom rewards', 'Early access to new features'],
    cta: 'Start Free Trial',
    highlight: false,
  },
];

const faqItems = [
  { q: 'How does Poppins work?',     a: 'Poppins uses advanced AI to understand your household patterns, bundle trips, suggest optimal task assignments, and proactively remind members — all through natural conversation. You always approve changes.' },
  { q: 'Can I use ChoreMaxx with roommates?', a: 'Absolutely. ChoreMaxx has a dedicated Roommates mode with equal role management, fair task distribution tracking, and split-responsibility tools.' },
  { q: 'Is my data secure?',                  a: 'Yes. All household data is encrypted end-to-end. We never sell your data. You can export or delete everything at any time from within the app.' },
  { q: 'Can I customize tasks and rewards?',  a: 'Yes — create any task with custom names, difficulty, frequency, and XP value. Rewards are fully configurable by household admins.' },
];

/* ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ background: '#F6F5FA' }}>

      {/* ── 1. HERO ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #EDE9FB 0%, #F6F5FA 40%, #EAF0FF 100%)',
        }}
      >
        {/* Ambient blobs */}
        <div className="blob blob-purple" style={{ width: 600, height: 600, top: -150, right: -100, opacity: 0.6 }} />
        <div className="blob blob-blue"   style={{ width: 400, height: 400, bottom: 0, left: -80, opacity: 0.5 }} />
        <div className="blob blob-pink"   style={{ width: 300, height: 300, top: '30%', left: '35%', opacity: 0.4 }} />

        {/* Floating rings — matching reference 3D glass objects */}
        <Ring size={520} style={{ top: -140, right: -160, opacity: 0.40, transform: 'rotate(-18deg)' }} />
        <Ring size={340} style={{ bottom: -60, left: -80,  opacity: 0.28, transform: 'rotate(22deg)'  }} />
        <Ring size={200} style={{ top: '38%', right: '6%', opacity: 0.22, transform: 'rotate(45deg)'  }} />

        <div className="container-page relative z-10" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

            {/* Left: headline + CTA */}
            <div className="flex-1 flex flex-col gap-7 max-w-xl">

              {/* Eyebrow chip */}
              <div className="chip self-start">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                AI Household Operating System
              </div>

              <h1 className="text-balance">
                Finally.<br />
                A Home That<br />
                Runs{' '}
                <span style={{ color: 'var(--color-primary)' }}>Itself.</span>
              </h1>

              <p className="text-lg" style={{ color: '#3D3A4E', maxWidth: 440 }}>
                AI organizes chores, shopping, schedules and responsibilities so everyone knows exactly what to do.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/download" className="btn-primary gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on App Store
                </Link>
                <Link href="/how-it-works" className="btn-ghost gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Demo
                </Link>
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                      style={{ background: `hsl(${250 + i * 20},60%,75%)` }} />
                  ))}
                </div>
                <div>
                  <span style={{ color: '#FFD166', fontSize: '0.875rem', fontWeight: 700 }}>4.9 ★★★★★</span>
                  <span className="text-sm ml-2" style={{ color: '#8B8AA0' }}>Loved by 50,000+ families</span>
                </div>
              </div>
            </div>

            {/* Right: phone mockup + floating widget cards */}
            <div className="flex-1 relative hidden lg:flex items-center justify-center" style={{ minHeight: 580 }}>

              {/* Main phone card */}
              <div
                className="relative z-10"
                style={{
                  width: 280,
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(35px)',
                  WebkitBackdropFilter: 'blur(35px)',
                  borderRadius: 40,
                  border: '1px solid rgba(255,255,255,0.85)',
                  boxShadow: '0 24px 80px rgba(100,80,200,0.18), 0 4px 16px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6631-v9iwoCWH3W4q6dq7oB2z5HISd3Verm.png"
                  alt="ChoreMaxx app — The Johnsons household dashboard"
                  width={280}
                  height={560}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Floating widget: Grocery List */}
              <div className="glass-card p-4 absolute left-0 top-8" style={{ width: 165, zIndex: 20 }}>
                <p className="text-xs font-semibold mb-2" style={{ color: '#0F0E17' }}>Grocery List</p>
                {['Milk', 'Eggs', 'Bread', 'Bananas'].map((item, i) => (
                  <div key={item} className="flex items-center gap-2 py-0.5">
                    <div className="w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: i < 2 ? '#5BD6BD' : '#C986FF', background: i < 2 ? 'rgba(91,214,189,0.15)' : 'transparent' }}>
                      {i < 2 && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#5BD6BD" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-xs" style={{ color: i < 2 ? '#8B8AA0' : '#0F0E17', textDecoration: i < 2 ? 'line-through' : 'none' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Floating widget: AI Assistant */}
              <div className="glass-card p-4 absolute right-0 top-12" style={{ width: 185, zIndex: 20 }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-primary), #C986FF)' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>Poppins</span>
                  <span className="text-xs ml-auto" style={{ color: '#8B8AA0' }}>now</span>
                </div>
                <p className="text-xs" style={{ color: '#0F0E17' }}>Laundry completed!</p>
                <p className="text-xs" style={{ color: '#5BD6BD', fontWeight: 600 }}>Sarah earned +80 XP</p>
              </div>

              {/* Floating widget: Kids XP */}
              <div className="glass-card p-4 absolute left-0 bottom-20" style={{ width: 160, zIndex: 20 }}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#8B8AA0' }}>Kids XP</p>
                <p className="text-3xl font-bold" style={{ color: '#0F0E17', letterSpacing: '-0.03em' }}>1,250</p>
                <p className="text-xs" style={{ color: '#8B8AA0' }}>Total XP</p>
              </div>

              {/* Floating widget: Energy Harmony */}
              <div className="glass-card p-4 absolute right-0 bottom-16" style={{ width: 170, zIndex: 20 }}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#0F0E17' }}>Energy Harmony</p>
                <p className="text-sm font-bold" style={{ color: '#5BD6BD' }}>High</p>
                <svg width="130" height="40" viewBox="0 0 130 40" fill="none" className="mt-1">
                  <path d="M0 25 Q25 10 50 20 T100 15 T130 22" stroke="#5BD6BD" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST LOGOS ──────────────────────────────── */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid rgba(200,190,230,0.20)', borderBottom: '1px solid rgba(200,190,230,0.20)' }}>
        <div className="container-page py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: '#8B8AA0' }}>
            Trusted by families worldwide
          </p>
          <div className="flex items-center justify-center flex-wrap gap-10">
            {['Forbes', 'TechCrunch', 'Yahoo!', 'Product Hunt', 'The Verge'].map(name => (
              <span key={name} className="text-base font-bold" style={{ color: '#C0BBDA' }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FEATURES GRID ────────────────────────────── */}
      <Section>
        <div className="container-page">
          <div className="section-heading">
            <h2 className="text-balance">Everything Your Home Needs</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {featureItems.map(({ icon, label, sub }) => (
              <div key={label} className="glass-tile p-5 flex flex-col items-center text-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'color-mix(in srgb, var(--color-primary) 10%, transparent)', color: 'var(--color-primary)' }}
                >
                  <Icon d={icon} size={22} />
                </div>
                <p className="text-sm font-semibold" style={{ color: '#0F0E17' }}>{label}</p>
                <p className="text-xs leading-snug" style={{ color: '#8B8AA0' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 4. HOUSEHOLD MODES ──────────────────────────── */}
      <Section style={{ background: '#FFFFFF' }}>
        <div className="container-page">
          <div className="section-heading">
            <h2 className="text-balance">Built For Every Type of Home</h2>
            <p className="text-base" style={{ color: '#8B8AA0' }}>Choose the mode that fits your household.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {householdModes.map(({ label, sub, iconPath }, i) => (
              <div
                key={label}
                className="glass-tile p-5 flex flex-col items-center text-center gap-3 cursor-pointer"
                style={i === 0 ? { border: '1.5px solid color-mix(in srgb, var(--color-primary) 40%, transparent)', background: 'color-mix(in srgb, var(--color-primary) 6%, transparent)' } : {}}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ background: i === 0 ? 'color-mix(in srgb, var(--color-primary) 12%, transparent)' : 'rgba(100,80,180,0.07)', color: 'var(--color-primary)' }}
                >
                  <Icon d={iconPath} size={20} />
                </div>
                <p className="text-sm font-semibold" style={{ color: '#0F0E17' }}>{label}</p>
                <p className="text-xs" style={{ color: '#8B8AA0' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 5. CHORE TIMELINE ───────────────────────────── */}
      <Section>
        <div className="container-page">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            <div className="lg:w-72 flex-shrink-0">
              <h2 className="text-balance mb-4">See Your Day, Stay In Sync</h2>
              <p className="text-base mb-6" style={{ color: '#8B8AA0' }}>
                A beautiful timeline everyone can follow and update.
              </p>
              <Link href="/features" className="btn-ghost text-sm px-5 py-2.5 inline-flex items-center gap-2">
                Explore All Tasks
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="flex-1 overflow-x-auto">
              <div className="flex items-start gap-4 min-w-max pb-4">
                {timelineItems.map(({ time, label, person, active }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-3"
                    style={{ width: 130 }}
                  >
                    <p className="text-xs font-semibold" style={{ color: active ? 'var(--color-primary)' : '#8B8AA0' }}>{time}</p>
                    <div
                      className="w-full rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
                      style={{
                        background: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.80)',
                        border: `1px solid ${active ? 'var(--color-primary)' : 'rgba(200,190,230,0.35)'}`,
                        boxShadow: active ? '0 8px 32px color-mix(in srgb, var(--color-primary) 30%, transparent)' : '0 2px 12px rgba(100,80,180,0.06)',
                      }}
                    >
                      <p className="text-sm font-semibold" style={{ color: active ? '#FFF' : '#0F0E17' }}>{label}</p>
                      <p className="text-xs" style={{ color: active ? 'rgba(255,255,255,0.75)' : '#8B8AA0' }}>{person}</p>
                    </div>
                    {/* Timeline dot */}
                    <div className="w-3 h-3 rounded-full" style={{ background: active ? 'var(--color-primary)' : '#C0BBDA' }} />
                  </div>
                ))}
              </div>
              {/* Timeline line */}
              <div className="h-px mt-1" style={{ background: 'linear-gradient(90deg, var(--color-primary) 28%, #C0BBDA 28%)' }} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── 6. REWARDS / XP ─────────────────────────────── */}
      <Section style={{ background: '#FFFFFF' }}>
        <div className="container-page">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Left text */}
            <div className="lg:w-80 flex-shrink-0">
              <h2 className="text-balance mb-4">Make Chores Worth It</h2>
              <p className="text-base mb-6" style={{ color: '#8B8AA0' }}>
                Positive habits. Real rewards. A happier home.
              </p>
              <Link href="/features" className="btn-ghost text-sm px-5 py-2.5 inline-flex items-center gap-2">
                See Rewards
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>

            {/* XP card */}
            <div className="flex-1 flex flex-wrap gap-5 items-center justify-center">
              <div
                className="glass-card p-7 flex flex-col gap-4"
                style={{ minWidth: 260 }}
              >
                <p className="text-sm" style={{ color: '#8B8AA0' }}>You earned</p>
                <p className="text-5xl font-extrabold" style={{ color: 'var(--color-primary)', letterSpacing: '-0.04em' }}>+120 XP</p>
                <p className="text-sm font-semibold" style={{ color: '#5BD6BD' }}>Great job!</p>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: '#8B8AA0' }}>1,250 / 2,000 XP</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)' }}>
                    <div className="h-full rounded-full" style={{ width: '62.5%', background: 'linear-gradient(90deg, var(--color-primary), #C986FF)' }} />
                  </div>
                </div>
              </div>

              {/* Achievement cards */}
              <div className="flex flex-col gap-4">
                {[
                  { icon: '🔥', label: 'Daily Streak', val: '7 days in a row' },
                  { icon: '🏆', label: 'Top Contributor', val: 'This week'      },
                  { icon: '🎯', label: 'Family Goal',     val: '88% completed' },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="glass-tile px-5 py-3 flex items-center gap-4" style={{ minWidth: 200 }}>
                    <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#0F0E17' }}>{label}</p>
                      <p className="text-xs" style={{ color: '#8B8AA0' }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 7. TESTIMONIALS ─────────────────────────────── */}
      <Section>
        <div className="container-page">
          <div className="section-heading">
            <h2>What Families Are Saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role }) => (
              <div key={name} className="glass-card p-8 flex flex-col gap-5">
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                  <path d="M0 20V12C0 5.373 4.477 1.12 13.43 0l1.14 2.286C9.143 3.428 6.857 6.095 6.286 10H12V20H0zm16 0V12C16 5.373 20.477 1.12 29.43 0L30.57 2.286C25.143 3.428 22.857 6.095 22.286 10H28V20H16z" fill="var(--color-primary)" opacity="0.20" />
                </svg>
                <p className="text-base leading-relaxed" style={{ color: '#3D3A4E' }}>{quote}</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 27%, transparent), #C986FF44)' }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#0F0E17' }}>{name}</p>
                    <p className="text-xs" style={{ color: '#8B8AA0' }}>{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 8. PRICING ──────────────────────────────────── */}
      <Section id="pricing" style={{ background: '#FFFFFF' }}>
        <div className="container-page">
          <div className="section-heading">
            <h2>Simple Pricing, For Every Home</h2>
            {/* Monthly / Yearly toggle */}
            <div className="flex items-center gap-2 mt-2">
              <div
                className="flex items-center gap-1 p-1 rounded-full"
                style={{ background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)', border: '1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)' }}
              >
                <span className="px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: 'var(--color-primary)', color: '#FFF' }}>Monthly</span>
                <span className="px-4 py-1.5 rounded-full text-sm font-medium" style={{ color: '#8B8AA0' }}>
                  Yearly
                  <span className="ml-1.5 text-xs px-2 py-0.5 rounded-full" style={{ background: '#5BD6BD', color: '#FFF' }}>Save 20%</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map(({ name, price, period, desc, features, cta, highlight, badge }) => (
              <div
                key={name}
                className="glass-card p-8 flex flex-col gap-6 relative"
                style={highlight ? {
                  border: '1.5px solid var(--color-primary)',
                  boxShadow: '0 8px 40px color-mix(in srgb, var(--color-primary) 20%, transparent)',
                } : {}}
              >
                {badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: 'var(--color-primary)' }}>{badge}</span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#8B8AA0' }}>{name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold" style={{ color: '#0F0E17', letterSpacing: '-0.03em' }}>{price}</span>
                    <span className="text-sm" style={{ color: '#8B8AA0' }}>{period}</span>
                  </div>
                  <p className="text-sm mt-2" style={{ color: '#8B8AA0' }}>{desc}</p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: '#3D3A4E' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5BD6BD" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/download"
                  className={highlight ? 'btn-primary text-center' : 'btn-ghost text-center'}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 9. FAQ ──────────────────────────────────────── */}
      <Section>
        <div className="container-page max-w-3xl mx-auto">
          <div className="section-heading">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqItems.map(({ q, a }) => (
              <details
                key={q}
                className="glass-card px-7 py-5 cursor-pointer group"
                style={{ listStyle: 'none' }}
              >
                <summary className="flex items-center justify-between text-sm font-semibold list-none" style={{ color: '#0F0E17' }}>
                  {q}
                  <svg className="w-5 h-5 flex-shrink-0 ml-4 transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="#8B8AA0" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: '#8B8AA0' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 10. FINAL CTA ───────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28"
        style={{ background: 'linear-gradient(160deg, #EDE9FB 0%, #F0F4FF 60%, #EAF5F2 100%)' }}
      >
        <div className="blob blob-purple" style={{ width: 500, height: 500, top: -100, left: -100, opacity: 0.50 }} />
        <div className="blob blob-blue"   style={{ width: 400, height: 400, bottom: -80, right: -80, opacity: 0.45 }} />
        <Ring size={440} style={{ top: -100, right: -120, opacity: 0.30 }} />

        <div className="container-page relative z-10 flex flex-col items-center text-center gap-8">
          <h2 className="text-balance text-5xl md:text-6xl" style={{ maxWidth: 620 }}>
            Ready For A Better Home?
          </h2>
          <p className="text-lg" style={{ color: '#8B8AA0', maxWidth: 400 }}>
            Join thousands of families getting organized with ChoreMaxx today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/download" className="btn-primary gap-2 px-8 py-4 text-base">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on App Store
            </Link>
            <Link href="/how-it-works" className="btn-ghost gap-2 px-8 py-4 text-base">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
