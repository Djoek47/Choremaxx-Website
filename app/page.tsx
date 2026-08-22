import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChoreMaxx — The chore app for families with standards',
  description:
    'Assign the work, track who actually did it, and make it worth doing. 150 ready-made chores, XP, streaks and weekly crowns. For families, not roommates.',
  openGraph: {
    title: "ChoreMaxx — Everyone knows what's theirs to do",
    description:
      'Parents assign. Kids complete. XP, streaks, crowns and rewards keep it honest. Free for 7 days.',
  },
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
function Section({
  children,
  className = '',
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section id={id} className={`section relative overflow-hidden ${className}`} style={style}>
      {children}
    </section>
  );
}

/* ─── What ChoreMaxx actually does ───────────────────────── */
const doesItems = [
  {
    emoji: '📋',
    label: 'Pick from 150 chores, not a blank text box',
    sub: 'Fifteen domains — kitchen, bathroom, laundry, pets, yard, car, homework and the rest. Tap what you want done instead of inventing chore names at 9pm.',
  },
  {
    emoji: '⚖️',
    label: 'Every task carries a weight',
    sub: "Emptying the dishwasher isn't scrubbing the tub. Harder work is worth more XP, so effort actually shows up in the standings.",
  },
  {
    emoji: '⏱️',
    label: 'One deadline everyone can see',
    sub: 'You set the household’s daily deadline. Daily, weekday, weekly and monthly tasks all land against it. Miss it and the task goes late; leave it overnight and it expires.',
  },
  {
    emoji: '📚',
    label: "Homework has its own tab",
    sub: "Because homework isn't a chore, and treating it like one never worked.",
  },
  {
    emoji: '🛒',
    label: 'The grocery list sorts itself',
    sub: 'Type "milk," it files under Dairy & Eggs. Type "steak," it goes to Meat & Seafood. Shop the list by aisle instead of walking the store three times.',
  },
];

/* ─── Points that mean something ─────────────────────────── */
const pointsItems = [
  {
    emoji: '⚡',
    label: 'Instant XP',
    sub: 'No waiting on a parent to log in and bless it. The kid finishes, taps, and the points land. You get notified and can ask for a photo afterward if something looks suspiciously clean.',
  },
  {
    emoji: '🔥',
    label: 'Streaks',
    sub: 'Daily and weekday tasks build a streak. Personal hygiene is tracked as a streak too, with no points attached, because brushing your teeth shouldn’t be a transaction.',
  },
  {
    emoji: '🌙',
    label: 'Late Credit',
    sub: 'Finished after the deadline but before midnight? Reduced XP, streak intact. Late is better than never, and the app says so.',
  },
  {
    emoji: '🛟',
    label: 'Streak Rescue',
    sub: "Miss a day and you can pay part of the week's XP to save the streak. Miss three, and it's gone. Nobody gets it back for free.",
  },
  {
    emoji: '🧳',
    label: 'Recess',
    sub: 'Going away? Freeze everything. Leave with a 12-day streak, come home with a 12-day streak.',
  },
];

/* ─── Rewards library samples ────────────────────────────── */
const rewardModes = [
  'XP only',
  'Allowance only',
  'XP plus rewards',
  'The full system',
];

const productScreenshots = [
  { src: '/screenshots/home.png', label: 'Home', alt: 'ChoreMaxx Home — Today dashboard' },
  { src: '/screenshots/plan.png', label: 'Plan', alt: 'ChoreMaxx Plan — smart trip routing' },
  { src: '/screenshots/shopping.png', label: 'Shopping', alt: 'ChoreMaxx Shopping — aisle-sorted list' },
  { src: '/screenshots/rewards.png', label: 'Rewards', alt: 'ChoreMaxx Rewards — privilege cards' },
  { src: '/screenshots/poppins-activity.png', label: 'Poppins', alt: 'ChoreMaxx Poppins Activity feed' },
];

const pricingPlans = [
  {
    name: 'Monthly',
    price: '$4.99',
    period: '/month',
    desc: '7 days free, then billed monthly through Apple.',
    features: [
      'Every member of the household',
      'All 150 chores across 15 domains',
      'XP, streaks, crowns and Streak Rescue',
      'Rewards, allowance tracking and the grocery list',
      'Poppins',
      'Cancel anytime',
    ],
    cta: 'Start 7 days free',
    highlight: false,
  },
  {
    name: 'Yearly',
    price: '$48',
    period: '/year',
    desc: '7 days free, then billed yearly through Apple. Everything above, two months cheaper.',
    features: [
      'Everything in Monthly',
      'Two months free vs. paying monthly',
      'Poppins',
      'Priority support',
      'Cancel anytime',
    ],
    cta: 'Start 7 days free',
    highlight: true,
    badge: 'Save 20%',
  },
];

const faqItems = [
  {
    q: 'Who can assign tasks?',
    a: 'Admins only — up to two per household. The paying admin decides who the second one is. Sidekicks complete their own tasks; nobody can mark someone else’s work as done.',
  },
  {
    q: 'Can my kid earn a reward without asking me?',
    a: 'Only if you set that reward to grant instantly, and only after the day’s tasks and homework are finished. Anything set to require approval still comes to you. Sidekicks can also propose a new reward occasionally — you decide whether it becomes real.',
  },
  {
    q: 'Does ChoreMaxx send money?',
    a: 'No. It’s not a payment platform and it never connects to your bank. Allowance is approved and recorded in the app; you pay your kid however you already do.',
  },
  {
    q: 'What happens if a task gets missed?',
    a: 'Finished after the deadline but before 11:59pm, it earns reduced XP and keeps the streak. After 11:59pm it expires and can’t be completed. Expired tasks sit in their own tab for a week, then clear out.',
  },
  {
    q: 'Do I have to check every completed chore?',
    a: 'No. XP lands when the kid taps Complete. If you want to verify, request a photo on that task. Homework proof can be set as required, per child.',
  },
  {
    q: 'Can I turn it off for a vacation?',
    a: 'Recess pauses tasks and freezes every streak where it stands.',
  },
  {
    q: 'Is my family’s data safe?',
    a: 'Household data is encrypted, we don’t sell it, and you can export or delete all of it from inside the app.',
  },
  {
    q: 'How much does it cost?',
    a: '7 days free, then $4.99/month or $48/year through Apple. Pricing and renewal terms are shown in-app before purchase.',
  },
];

/* ═══════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>

      {/* ── 1. HERO ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, color-mix(in srgb, var(--color-primary) 12%, var(--color-bg)) 0%, var(--color-bg) 45%, color-mix(in srgb, var(--color-primary) 8%, var(--color-bg)) 100%)',
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
                Built for real families with high standards
              </div>

              <h1 className="text-balance">
                Your house doesn&apos;t<br />
                run itself.<br />
                Your <span style={{ color: 'var(--color-primary)' }}>kids</span> do.
              </h1>

              <p className="text-lg" style={{ color: 'var(--color-text-secondary)', maxWidth: 440 }}>
                ChoreMaxx hands out the work, tracks who actually did it, and makes it worth doing.
                You stay in charge — the app just stops the arguing.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/download" className="btn-primary gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Start 7 days free
                </Link>
                <Link href="/how-it-works" className="btn-ghost gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  See how it works
                </Link>
              </div>

              {/* Honest, small proof line — no invented numbers */}
              <p className="text-sm" style={{ color: 'var(--color-text-muted)', letterSpacing: '-0.01em' }}>
                Built in Montréal. Version 1 is live on the App Store.
              </p>
            </div>

            {/* Right: one composition — phone + two floating surfaces */}
            <div
              className="flex-1 relative hidden lg:flex items-center justify-center"
              style={{ minHeight: 620 }}
            >
              {/* Soft depth behind the device */}
              <div
                aria-hidden
                className="absolute"
                style={{
                  width: 320,
                  height: 520,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, color-mix(in srgb, var(--color-primary) 18%, transparent) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  zIndex: 0,
                }}
              />

              {/* Device — hardware-like frame */}
              <div
                className="relative z-10 hero-device"
                style={{
                  width: 268,
                  borderRadius: 36,
                  padding: 10,
                  background: 'color-mix(in srgb, var(--color-text-primary) 92%, transparent)',
                  boxShadow:
                    '0 40px 80px rgba(15, 14, 23, 0.22), 0 8px 24px rgba(15, 14, 23, 0.12), inset 0 0 0 1px rgba(255,255,255,0.12)',
                }}
              >
                <div
                  style={{
                    borderRadius: 28,
                    overflow: 'hidden',
                    background: 'var(--color-bg)',
                  }}
                >
                  <Image
                    src="/screenshots/home.png"
                    alt="ChoreMaxx app — Today dashboard with household tasks, groceries, and plan"
                    width={470}
                    height={1024}
                    className="w-full h-auto block"
                    priority
                  />
                </div>
              </div>

              {/* Float 1 — Grocery (left) */}
              <aside
                className="hero-float hero-float-grocery"
                style={{ left: 0, top: '18%', width: 188 }}
                aria-label="Grocery list preview"
              >
                <p className="hero-float-label">Grocery</p>
                <ul className="hero-float-list">
                  {[
                    { item: 'Milk', done: true },
                    { item: 'Eggs', done: true },
                    { item: 'Bread', done: false },
                    { item: 'Bananas', done: false },
                  ].map(({ item, done }) => (
                    <li key={item} className={done ? 'is-done' : undefined}>
                      <span className="hero-check" aria-hidden>
                        {done ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        ) : null}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Float 2 — Poppins (right) */}
              <aside
                className="hero-float hero-float-poppins"
                style={{ right: 0, top: '22%', width: 204 }}
                aria-label="Poppins activity preview"
              >
                <div className="hero-float-row">
                  <span className="hero-float-mark" aria-hidden>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </span>
                  <span className="hero-float-label" style={{ marginBottom: 0 }}>Poppins</span>
                  <span className="hero-float-time">now</span>
                </div>
                <p className="hero-float-title">Laundry completed</p>
                <p className="hero-float-meta">Sarah · +80 XP</p>
              </aside>

              {/* Quiet metric — bottom, single line of truth */}
              <aside
                className="hero-float hero-float-metric"
                style={{ left: 'calc(50% - 110px)', bottom: 12, width: 220 }}
                aria-label="Household XP"
              >
                <div className="hero-metric">
                  <div>
                    <p className="hero-float-label">Kids XP</p>
                    <p className="hero-metric-value">1,250</p>
                  </div>
                  <div className="hero-metric-divider" aria-hidden />
                  <div>
                    <p className="hero-float-label">Streak</p>
                    <p className="hero-metric-status">12 days</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM ──────────────────────────────── */}
      <Section style={{ background: 'var(--color-bg-soft)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-page py-4">
          <div className="section-heading">
            <h2 className="text-balance">The chore chart lasted eleven days</h2>
            <p className="text-base max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
              You wrote it out. You taped it to the fridge. Then someone &ldquo;already did that one,&rdquo;
              someone else swears it wasn&apos;t theirs, and by the second week you&apos;re doing the dishes
              yourself again. The chart wasn&apos;t the problem. Nothing was keeping score.
            </p>
          </div>
        </div>
      </Section>

      {/* ── 3. WHAT CHOREMAXX ACTUALLY DOES ─────────────── */}
      <Section>
        <div className="container-page">
          <div className="section-heading">
            <h2 className="text-balance">Assign it once. It holds.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {doesItems.map(({ emoji, label, sub }) => (
              <div key={label} className="glass-tile p-6 flex items-start gap-4">
                <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }} aria-hidden>{emoji}</span>
                <div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>{label}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 3b. APP SURFACES ────────────────────────────── */}
      <Section style={{ background: 'var(--color-bg-soft)' }}>
        <div className="container-page">
          <div className="section-heading">
            <h2 className="text-balance">See It In The App</h2>
            <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
              Home, Plan, Shopping, Rewards, and Poppins — real product screens.
            </p>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory justify-start lg:justify-center">
            {productScreenshots.map(({ src, label, alt }) => (
              <div key={label} className="flex flex-col items-center gap-3 flex-shrink-0 snap-center" style={{ width: 180 }}>
                <div
                  className="overflow-hidden w-full"
                  style={{
                    borderRadius: 28,
                    border: '1px solid var(--color-glass-border)',
                    boxShadow: '0 12px 40px rgba(100,80,180,0.12)',
                    background: 'var(--color-glass)',
                  }}
                >
                  <Image src={src} alt={alt} width={470} height={1024} className="w-full h-auto block" />
                </div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 4. POINTS THAT MEAN SOMETHING ───────────────── */}
      <Section>
        <div className="container-page">
          <div className="section-heading">
            <h2 className="text-balance">XP hits the second they tap Complete</h2>
            <p className="text-base max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
              No waiting on a parent to log in and bless it. The kid finishes, taps, and the points land.
              You get notified and can ask for a photo afterward if something looks suspiciously clean.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {pointsItems.map(({ emoji, label, sub }) => (
              <div key={label} className="glass-tile p-5 flex flex-col items-center text-center gap-3">
                <span style={{ fontSize: '1.5rem' }} aria-hidden>{emoji}</span>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{label}</p>
                <p className="text-xs leading-snug" style={{ color: 'var(--color-text-muted)' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 5. COMPETITION ──────────────────────────────── */}
      <Section style={{ background: 'var(--color-bg-soft)' }}>
        <div className="container-page">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-80 flex-shrink-0">
              <h2 className="text-balance mb-4">Somebody wins the week</h2>
              <p className="text-base mb-6" style={{ color: 'var(--color-text-muted)' }}>
                Only one kid? They compete against their own best week. That&apos;s usually harder.
              </p>
              <Link href="/features" className="btn-ghost text-sm px-5 py-2.5 inline-flex items-center gap-2">
                See Rankings
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="flex-1 flex flex-wrap gap-4 justify-center">
              {[
                { icon: '👑', label: "The Week's Crown", val: 'Highest XP of the week' },
                { icon: '🏅', label: 'The Monthly Sovereign', val: 'Highest XP of the month' },
                { icon: '📊', label: "Champion's Record", val: 'Tasks done, on time vs. late' },
              ].map(({ icon, label, val }) => (
                <div key={label} className="glass-tile px-5 py-4 flex items-center gap-4" style={{ minWidth: 240 }}>
                  <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{label}</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 6. REWARDS & ALLOWANCE ──────────────────────── */}
      <Section>
        <div className="container-page">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Left text */}
            <div className="lg:w-80 flex-shrink-0">
              <h2 className="text-balance mb-4">You decide what the work is worth</h2>
              <p className="text-base mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Run it however your house runs. Pick from the reward library or mint your own —
                extra screen time, choosing dinner, a later bedtime. Set each one to grant instantly
                or require your approval.
              </p>
              <p className="text-sm leading-relaxed p-4 rounded-xl" style={{
                color: 'var(--color-text-secondary)',
                background: 'color-mix(in srgb, var(--color-primary) 6%, var(--color-bg-card))',
                border: '1px solid color-mix(in srgb, var(--color-primary) 18%, transparent)',
              }}>
                <strong style={{ color: 'var(--color-text-primary)' }}>About allowance, plainly:</strong>{' '}
                ChoreMaxx is not a payment app. It never touches your bank, and no money moves through
                it. You approve an amount, the app records it, and you settle up the way you already do.
              </p>
            </div>

            {/* Reward modes */}
            <div className="flex-1 flex flex-wrap gap-4 justify-center">
              {rewardModes.map(mode => (
                <div key={mode} className="glass-tile px-6 py-4 text-center" style={{ minWidth: 160 }}>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{mode}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 7. POPPINS ───────────────────────────────────── */}
      <Section style={{ background: 'var(--color-bg-soft)' }}>
        <div className="container-page">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-balance mb-4">Poppins does the admin so you don&apos;t</h2>
              <p className="text-base mb-4 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                Poppins is the AI built into ChoreMaxx, and it&apos;s yours — parents only. Ask it anything
                about how the app works, or just tell it what you want: assign Saturday&apos;s yard work,
                move a task to Noah, remind everyone thirty minutes before the deadline.
              </p>
              <p className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                It answers, and it acts. Kids don&apos;t get access to it. Kids get their tasks.
              </p>
            </div>
            <div
              className="glass-card p-7 flex-shrink-0"
              style={{ width: 320 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="hero-float-mark" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </span>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Poppins</p>
              </div>
              <p className="text-sm italic leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                &ldquo;Assigned Saturday yard work to Noah and moved Sunday dishes to Emma. Reminder set
                for 30 minutes before tonight&apos;s deadline.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 8. HOUSE RULES ──────────────────────────────── */}
      <Section>
        <div className="container-page max-w-3xl mx-auto text-center">
          <h2 className="text-balance mb-4">The rules are written down, and everyone can read them</h2>
          <p className="text-base mb-8" style={{ color: 'var(--color-text-muted)' }}>
            Every mechanic in ChoreMaxx — how XP is earned, when things expire, what breaks a streak,
            how crowns are won — lives on one screen. Thirty-six rules, seven chapters, no mystery.
            There are two versions: the Admin version, and a Sidekick version written for a nine-year-old.
            When your kid says the app cheated them, you both open the same page.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="chip">Admin version</span>
            <span className="chip">Sidekick version</span>
          </div>
        </div>
      </Section>

      {/* ── 9. WHO IT'S FOR ─────────────────────────────── */}
      <Section style={{ background: 'var(--color-bg-soft)' }}>
        <div className="container-page">
          <div className="section-heading">
            <h2 className="text-balance">Families. That&apos;s the whole list.</h2>
            <p className="text-base max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
              ChoreMaxx is built for parents and the kids who live with them. We took out the
              roommate mode, the coworking mode, and everything else that made it a general task app.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <div className="glass-tile p-6 flex flex-col items-center text-center gap-3" style={{ border: '1.5px solid color-mix(in srgb, var(--color-primary) 40%, transparent)', background: 'color-mix(in srgb, var(--color-primary) 6%, transparent)' }}>
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary)' }}
              >
                <Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" size={20} />
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Admins</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Two maximum, so authority is clear. Assign tasks, approve rewards, run the household.
              </p>
            </div>
            <div className="glass-tile p-6 flex flex-col items-center text-center gap-3">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(100,80,180,0.07)', color: 'var(--color-primary)' }}
              >
                <Icon d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" size={20} />
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Sidekicks</p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                A personal invite link, one per kid, expires in a week — they&apos;re in the second
                they tap it. Best for kids old enough to be responsible for something.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 10. PRICING ─────────────────────────────────── */}
      <Section id="pricing">
        <div className="container-page">
          <div className="section-heading">
            <h2>One price. Everyone in the house.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>{name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold" style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}>{price}</span>
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{period}</span>
                  </div>
                  <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
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

      {/* ── 11. FAQ ──────────────────────────────────────── */}
      <Section style={{ background: 'var(--color-bg-soft)' }}>
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
                <summary className="flex items-center justify-between text-sm font-semibold list-none" style={{ color: 'var(--color-text-primary)' }}>
                  {q}
                  <svg className="w-5 h-5 flex-shrink-0 ml-4 transition-transform group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 12. FINAL CTA ───────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28"
        style={{ background: 'linear-gradient(160deg, color-mix(in srgb, var(--color-primary) 14%, var(--color-bg)) 0%, var(--color-bg) 55%, color-mix(in srgb, var(--color-primary) 8%, var(--color-bg)) 100%)' }}
      >
        <div className="blob blob-purple" style={{ width: 500, height: 500, top: -100, left: -100, opacity: 0.50 }} />
        <div className="blob blob-blue"   style={{ width: 400, height: 400, bottom: -80, right: -80, opacity: 0.45 }} />
        <Ring size={440} style={{ top: -100, right: -120, opacity: 0.30 }} />

        <div className="container-page relative z-10 flex flex-col items-center text-center gap-8">
          <h2 className="text-balance text-5xl md:text-6xl" style={{ maxWidth: 620 }}>
            Everyone knows what&apos;s theirs to do.
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-text-muted)', maxWidth: 420 }}>
            Seven days free. No card until you&apos;ve seen whether it holds.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/download" className="btn-primary gap-2 px-8 py-4 text-base">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Get ChoreMaxx on the App Store
            </Link>
            <Link href="/how-it-works" className="btn-ghost gap-2 px-8 py-4 text-base">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              See how it works
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
