'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { AppStoreBadge, Moji } from '@/components/Brand';
import { AppHomeScreen, Orb, Phone } from '@/components/Phone';

const DeadlineDemo = dynamic(() => import('@/components/home/DeadlineDemo'));
const SupportFaq = dynamic(() => import('@/components/support/SupportFaq'));

/* ─── Approved copy (word for word from the approved site) ─────────────────────────── */
const DOES = [
  { moji: 'broom', label: 'Pick from 150 chores, not a blank text box', sub: 'Fifteen domains — kitchen, bathroom, laundry, pets, yard, car, homework and the rest. Tap what you want done instead of inventing chore names at 9pm.' },
  { moji: 'trophy', label: 'Every task carries a weight', sub: 'Emptying the dishwasher isn’t scrubbing the tub. Harder work is worth more XP, so effort actually shows up in the standings.' },
  { moji: 'calendar', label: 'One deadline everyone can see', sub: 'You set the household’s daily deadline. Daily, weekday, weekly and monthly tasks all land against it. Miss it and the task goes late; leave it overnight and it expires.' },
  { moji: 'book', label: 'Homework has its own tab', sub: 'Because homework isn’t a chore, and treating it like one never worked.' },
  { moji: 'cart', label: 'The grocery list sorts itself', sub: 'Type “milk,” it files under Dairy & Eggs. Type “steak,” it goes to Meat & Seafood. Shop the list by aisle instead of walking the store three times.' },
];

const POINTS = [
  { moji: 'sparkles', label: 'Instant XP', sub: 'Your child finishes, taps, and the points land. You get notified and can ask for a photo afterward if something looks suspiciously clean.' },
  { moji: 'fire', label: 'Streaks', sub: 'Daily and weekday tasks build a streak. Personal hygiene is tracked as a streak too, with no points attached, because brushing your teeth shouldn’t be a transaction.' },
  { moji: 'crescent', label: 'Late Credit', sub: 'Finished after the deadline but before midnight? Reduced XP, streak intact. Late is better than never, and the app says so.' },
  { moji: 'medal', label: 'Streak Rescue', sub: 'Miss a day and you can pay part of the week’s XP to save the streak. Miss three, and it’s gone. Nobody gets it back for free.' },
  { moji: 'sunrise', label: 'Recess', sub: 'Going away? Freeze everything. Leave with a 12-day streak, come home with a 12-day streak.' },
];

const TROPHIES = [
  { moji: 'crown', title: 'The Week’s Crown', sub: 'Highest XP of the week' },
  { moji: 'medal', title: 'The Monthly Sovereign', sub: 'Highest XP of the month' },
  { moji: 'numbers', title: 'Champion’s Record', sub: 'Tasks done, on time vs. late' },
];

const BULLETS = [
  'Every member of the household',
  'All 150 chores across 15 domains',
  'XP, streaks, crowns and Streak Rescue',
  'Rewards, allowance tracking and the grocery list',
  'Poppins',
  'Cancel anytime',
];
const TIERS = [
  { title: 'Monthly', price: '$6.99', period: '/month', note: '7 days free, then billed monthly through Apple.', highlight: false, moji: 'seedling' },
  { title: 'Yearly', price: '$49.99', period: '/year', note: '7 days free, then billed yearly through Apple. Save vs monthly.', highlight: true, moji: 'crown' },
];

const INK = 'var(--tx)';
const INK_SOLID = 'var(--ink-deep)'; /* always-dark panels (selected cards, yearly price) */
const SOFT = 'var(--txs)';
const MUTED = 'var(--txm)';
const CORAL = 'var(--p)';
const PAPER = 'var(--bg)';
const CARD = 'var(--bgs)';
const TINT = ['var(--tint-1)', 'var(--tint-2)', 'var(--tint-3)', 'var(--tint-4)', 'var(--tint-5)'];

function Check({ on, color = '#2E9E74' }: { on: boolean; color?: string }) {
  return (
    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200" style={{ border: `2px solid ${on ? color : 'var(--track)'}` , background: on ? color : 'var(--bgs)' }}>
      {on && (
        <svg className="pop" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
      )}
    </span>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

const card = { background: CARD, border: '1px solid var(--bd)', boxShadow: '0 4px 0 var(--bd)' };

/* A small live picture of each "What ChoreMaxx does" point. Visual only, no new copy. */
function DoesDemo({ i }: { i: number }) {
  const [groc, setGroc] = useState([true, false, false, false]);
  const [picked, setPicked] = useState<string[]>(['broom', 'pan']);
  if (i === 0)
    return (
      <div className="grid grid-cols-4 gap-2.5">
        {['broom', 'pan', 'shirt', 'bed', 'paw', 'plant', 'car', 'trashBag', 'shower', 'toothbrush', 'sofa', 'tools'].map((m) => {
          const on = picked.includes(m);
          return (
            <button
              key={m}
              aria-pressed={on}
              aria-label={m}
              onClick={() => setPicked((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]))}
              className="relative aspect-square rounded-[18px] flex items-center justify-center transition-all duration-200 active:translate-y-[2px]"
              style={{ background: on ? 'var(--pl)' : CARD, border: `2px solid ${on ? CORAL : 'transparent'}`, boxShadow: on ? '0 3px 0 var(--p-d)' : '0 4px 0 var(--bd)' }}
            >
              <Moji name={m} size={34} />
              {on && <span className="absolute top-1.5 right-1.5 pop"><Check on color={CORAL} /></span>}
            </button>
          );
        })}
      </div>
    );
  if (i === 1)
    return (
      <div className="flex flex-col gap-2">
        {([['pan', 20, 30], ['shirt', 40, 55], ['shower', 80, 100]] as const).map(([m, xp, w]) => (
          <div key={m} className="flex items-center gap-3 rounded-[16px] px-3 py-3" style={card}>
            <Moji name={m} size={28} />
            <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: '#F4E9E0' }}>
              <div className="h-full rounded-full" style={{ width: `${w}%`, background: 'linear-gradient(90deg, #EF9F27, #D85A30)' }} />
            </div>
            <span className="rounded-full px-2.5 py-0.5 text-xs font-extrabold" style={{ background: 'color-mix(in srgb, var(--gold) 22%, var(--bgs))', color: 'var(--p-d)' }}>+{xp} XP</span>
          </div>
        ))}
      </div>
    );
  if (i === 2)
    return (
      <div className="flex justify-center">
        <div className="relative w-44 h-44 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#D85A30 0 72%, #F4E9E0 72% 100%)' }}>
          <div className="w-36 h-36 rounded-full bg-white flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold" style={{ color: INK, letterSpacing: '-0.04em' }}>8:00</span>
            <span className="text-sm font-bold" style={{ color: MUTED }}>PM</span>
          </div>
        </div>
      </div>
    );
  if (i === 3)
    return (
      <div className="grid grid-cols-3 gap-3">
        {['school', 'book', 'numbers'].map((m, k) => (
          <span key={m} className="aspect-square rounded-[22px] bg-white flex items-center justify-center" style={{ boxShadow: '0 4px 0 rgba(120,70,40,.08)', transform: `rotate(${(k - 1) * 4}deg)` }}><Moji name={m} size={48} /></span>
        ))}
      </div>
    );
  return (
    <div className="flex flex-col gap-1.5">
      {([['milk', 'Milk'], ['egg', 'Eggs'], ['bread', 'Bread'], ['carrot', 'Carrots']] as const).map(([m, t], k) => (
        <button
          key={t}
          onClick={() => setGroc((g) => g.map((v, j) => (j === k ? !v : v)))}
          className="flex items-center gap-3 rounded-[16px] px-3 py-2.5 text-left transition-transform active:scale-[.98]"
          style={card}
        >
          <Check on={groc[k]} />
          <Moji name={m} size={22} />
          <span className="flex-1 text-sm font-bold" style={{ color: groc[k] ? MUTED : INK, textDecoration: groc[k] ? 'line-through' : 'none' }}>{t}</span>
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function HomeClient() {
  const [does, setDoes] = useState(0);
  const [heroGroc, setHeroGroc] = useState([true, true, false, false]);
  const [xpRef, xpSeen] = useInView<HTMLDivElement>();

  return (
    <div className="home-shell" style={{ background: PAPER, color: INK }}>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        <div aria-hidden className="absolute inset-0 paper-dots" style={{ maskImage: 'radial-gradient(ellipse at 70% 40%, #000 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, #000 0%, transparent 70%)' }} />
        <div aria-hidden className="blob blob-purple" style={{ width: 520, height: 520, top: -160, right: -60, opacity: 0.55 }} />
        <div aria-hidden className="blob blob-blue" style={{ width: 380, height: 380, bottom: -80, left: -120, opacity: 0.45 }} />

        <div className="container-page relative z-10" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-6">
            <div className="flex-1 flex flex-col gap-7 max-w-xl">
              <div className="chip self-start hero-in" style={{ animationDelay: '.05s' }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--pl)' }}><Moji name="heartHome" size={16} /></span>
                Built for real families with high standards
              </div>

              <h1 className="text-balance hero-in" style={{ animationDelay: '.12s' }}>
                Your house. Your{' '}
                <span className="whitespace-nowrap">
                  <span className="relative inline-block" style={{ color: CORAL }}>
                    rules
                    <svg aria-hidden className="absolute left-0 -bottom-2 w-full" height="14" viewBox="0 0 200 14" preserveAspectRatio="none">
                      <path d="M3 9 C 50 2, 120 2, 197 8" stroke="#FAC775" strokeWidth="6" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                  .
                </span>{' '}
                Actually followed.
              </h1>

              <p className="text-lg hero-in" style={{ color: SOFT, maxWidth: 470, animationDelay: '.2s' }}>
                With ChoreMaxx, hand out the work, track who actually did it, and make it worth doing. You stay in charge — the app just stops the arguing.
              </p>

              <div className="flex flex-wrap items-center gap-4 hero-in" style={{ animationDelay: '.28s' }}>
                <Link href="/download" className="btn-primary" style={{ padding: '1rem 1.6rem' }}>
                  <span className="sm:hidden">Start free</span>
                  <span className="hidden sm:inline">Start 7 days free</span>
                </Link>
                <Link href="/#deadline" className="btn-ghost" style={{ padding: '1rem 1.5rem' }}>
                  See how it works
                </Link>
              </div>
            </div>

            {/* The app in a phone, with live widgets around it */}
            <div className="flex-1 relative flex items-center justify-center w-full" style={{ minHeight: 640 }}>
              <div aria-hidden className="absolute rounded-full" style={{ width: 460, height: 460, background: 'radial-gradient(circle, #FAC77588, #FAC77500 70%)' }} />
              <div className="hero-in relative z-10" style={{ animationDelay: '.25s', ['--r' as string]: '-2deg' }}>
                <Phone width={300}>
                  <AppHomeScreen />
                </Phone>
              </div>

              <div className="glass-card p-4 absolute hidden md:block hero-in" style={{ width: 178, zIndex: 20, left: '-3%', top: 30, animationDelay: '.5s', ['--r' as string]: '-4deg' }}>
                <p className="text-sm font-extrabold mb-2 flex items-center gap-1.5" style={{ color: INK }}><Moji name="cart" size={18} />Grocery List</p>
                {['Milk', 'Eggs', 'Bread', 'Bananas'].map((item, i) => (
                  <button key={item} onClick={() => setHeroGroc((g) => g.map((v, j) => (j === i ? !v : v)))} className="flex w-full items-center gap-2 py-1 text-left">
                    <Check on={heroGroc[i]} />
                    <span className="text-sm font-medium" style={{ color: heroGroc[i] ? MUTED : INK, textDecoration: heroGroc[i] ? 'line-through' : 'none' }}>{item}</span>
                  </button>
                ))}
              </div>

              <div className="glass-card p-4 absolute hidden md:block hero-in" style={{ width: 200, zIndex: 20, right: '-5%', top: 90, animationDelay: '.62s', ['--r' as string]: '3deg' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Orb size={26} />
                  <span className="text-sm font-extrabold" style={{ color: CORAL }}>Poppins</span>
                  <span className="text-xs ml-auto" style={{ color: MUTED }}>now</span>
                </div>
                <p className="text-sm" style={{ color: INK }}>Laundry completed!</p>
                <p className="text-sm" style={{ color: '#2E9E74', fontWeight: 700 }}>Sarah earned +80 XP</p>
              </div>

              <div className="glass-card p-4 absolute hidden md:block hero-in" style={{ width: 168, zIndex: 20, left: '0%', bottom: 60, animationDelay: '.74s', ['--r' as string]: '2deg' }}>
                <p className="text-xs font-bold mb-1 flex items-center gap-1.5" style={{ color: MUTED }}><Moji name="fire" size={16} />Streaks</p>
                <p className="text-3xl font-extrabold" style={{ color: INK, letterSpacing: '-0.04em' }}>12 days</p>
              </div>

              <div className="glass-card p-4 absolute hidden md:block hero-in" style={{ width: 186, zIndex: 20, right: '-4%', bottom: 110, animationDelay: '.86s', ['--r' as string]: '-3deg' }}>
                <p className="text-xs font-bold mb-1 flex items-center gap-1.5" style={{ color: MUTED }}><Moji name="crown" size={16} />The Week&rsquo;s Crown</p>
                <p className="text-base font-extrabold" style={{ color: INK }}>Liam leads</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: CARD }}>
        <div className="container-page max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <div aria-hidden className="relative w-28 h-28 rounded-[30px] flex items-center justify-center" style={{ background: PAPER, transform: 'rotate(-4deg)', boxShadow: '0 5px 0 var(--bd)' }}>
            <Moji name="calendar" size={60} />
            <span className="absolute -right-3 -top-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold text-white" style={{ background: CORAL, boxShadow: '0 3px 0 var(--p-d)' }}>11</span>
          </div>
          <h2 className="text-balance">The chore chart lasted eleven days</h2>
          <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
            You wrote it out. You taped it to the fridge. Then someone &ldquo;already did that one,&rdquo; someone else swears it wasn&rsquo;t theirs,
            and by the second week you&rsquo;re doing the dishes yourself again. The chart wasn&rsquo;t the problem. Nothing was keeping score.
          </p>
        </div>
      </section>

      {/* ── WHAT IT DOES ─────────────────────────────────────────────────── */}
      <section id="does" className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">What ChoreMaxx does</p>
            <h2 className="text-balance">Assign it once. It holds.</h2>
          </div>
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-8 items-stretch">
            <div className="flex flex-col gap-3" role="tablist" aria-label="What ChoreMaxx does">
              {DOES.map(({ moji, label, sub }, i) => {
                const on = does === i;
                return (
                  <button
                    key={label}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setDoes(i)}
                    className="text-left rounded-[22px] p-5 flex items-start gap-4 transition-all duration-200"
                    style={{
                      background: on ? INK_SOLID : CARD,
                      border: `1px solid ${on ? INK_SOLID : 'var(--bd)'}`,
                      boxShadow: on ? '0 5px 0 var(--ink-deep), 0 24px 40px -20px color-mix(in srgb, var(--ink-deep) 55%, transparent)' : '0 4px 0 var(--bd)',
                      transform: on ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <span className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0" style={{ background: on ? 'var(--ink-panel)' : TINT[i] }}>
                      <Moji name={moji} size={28} />
                    </span>
                    <span>
                      <span className="block text-base font-extrabold" style={{ color: on ? 'var(--cream)' : INK }}>{label}</span>
                      <span className="block text-sm leading-relaxed mt-1" style={{ color: on ? 'var(--cream-mute)' : MUTED }}>{sub}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="relative rounded-[32px] p-6 md:p-10 flex flex-col justify-center overflow-hidden" style={{ background: `linear-gradient(160deg, ${TINT[does]}, var(--grad-end))`, border: '1px solid color-mix(in srgb, var(--p) 22%, transparent)', minHeight: 420, transition: 'background .4s' }}>
              <div aria-hidden className="absolute inset-0 paper-dots opacity-60" />
              <div key={does} className="relative hero-in" style={{ animationDuration: '.45s' }}>
                <DoesDemo i={does} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEADLINE (the approved site's interactive demo) ───────────────── */}
      <section id="deadline" className="section" style={{ background: CARD }}>
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Try it right here</p>
            <h2 className="text-balance mb-4">One deadline. Three ways the night can end.</h2>
            <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
              You set the household&rsquo;s daily deadline. Pick when Liam actually taps Complete and watch what the app does about it — full XP,
              Late Credit, or an expired task and a broken streak he has to buy back.
            </p>
          </div>
          <DeadlineDemo />
        </div>
      </section>

      {/* ── POINTS ───────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Points that mean something</p>
            <h2 className="text-balance mb-4">XP hits the second they tap Complete</h2>
            <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
              No waiting on a parent to log in and bless it. Your child finishes, taps, and the points land. You get notified and can ask for a photo afterward if something looks suspiciously clean.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {POINTS.map(({ moji, label, sub }, i) => (
              <div key={label} className="rounded-[26px] p-6 flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1" style={{ ...card, boxShadow: '0 5px 0 var(--bd)' }}>
                <span className="w-12 h-12 rounded-[16px] flex items-center justify-center" style={{ background: TINT[i] }}><Moji name={moji} size={28} /></span>
                <p className="text-base font-extrabold" style={{ color: INK }}>{label}</p>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TROPHIES ─────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: INK }}>
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="text-balance mb-5" style={{ color: 'var(--cream)' }}>Somebody wins the week</h2>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--cream-mute)' }}>
                The Week&rsquo;s Crown goes to the highest XP of the week. The Monthly Sovereign takes the month. Gold, silver, bronze — and a Champion&rsquo;s Record anyone in the house can open: tasks completed, how many were on time, how many were late.
              </p>
              <p className="text-lg leading-relaxed mt-4" style={{ color: 'var(--cream-mute)' }}>
                Only one child? They compete against their own best week. That&rsquo;s usually harder.
              </p>
            </div>
            <div ref={xpRef} className="flex flex-col gap-4">
              {TROPHIES.map(({ moji, title, sub }, i) => (
                <div key={title} className="rounded-[26px] px-6 py-5 flex items-center gap-5 transition-transform hover:-translate-y-1" style={{ background: 'var(--ink-panel)', border: '1px solid var(--ink-panel-2)', transform: `rotate(${(i - 1) * 1.2}deg)` }}>
                  <span className="w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0" style={{ background: 'var(--ink-panel-2)' }}><Moji name={moji} size={34} /></span>
                  <div className="flex-1">
                    <p className={`text-xl font-extrabold ${i === 0 ? 'sweep-text' : ''}`} style={i === 0 ? { letterSpacing: '-0.02em' } : { color: 'var(--cream)', letterSpacing: '-0.02em' }}>{title}</p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--cream-mute)' }}>{sub}</p>
                  </div>
                  {i === 0 && (
                    <div aria-hidden className="hidden sm:block w-24 h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--ink-panel-2)' }}>
                      <div className="h-full rounded-full" style={{ width: xpSeen ? '78%' : '0%', transition: 'width 1.4s cubic-bezier(.2,.8,.2,1)', background: 'linear-gradient(90deg, #D85A30, #EF9F27, #FAC775)' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REWARDS ──────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-page">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
            <div>
              <p className="eyebrow mb-3">Rewards &amp; allowance</p>
              <h2 className="text-balance mb-5">You decide what the work is worth</h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: MUTED }}>
                Run it however your house runs. XP only. Allowance only. XP plus rewards. Or the full system.
              </p>
              <p className="text-lg leading-relaxed mb-4" style={{ color: MUTED }}>
                Pick from the reward library or mint your own — extra screen time, choosing dinner, a later bedtime, whatever actually motivates your child. Set each one to grant instantly or require your approval.
              </p>
              <p className="text-lg leading-relaxed mb-4" style={{ color: MUTED }}>
                Once the day&rsquo;s tasks and homework are done, a Sidekick can hold to request a reward. Before that, the button just tells them to go finish.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
                About allowance, plainly: ChoreMaxx is not a payment app. It never touches your bank, and no money moves through it. You approve an amount, the app records it, and you settle up the way you already do.
              </p>
            </div>
            <div aria-hidden className="relative rounded-[34px] p-8 overflow-hidden" style={{ background: '#FFEBCB' }}>
              <div className="absolute inset-0 paper-dots opacity-70" />
              <div className="relative grid grid-cols-3 gap-4">
                {['gift', 'pizza', 'clapper', 'ball', 'gem', 'star'].map((m, k) => (
                  <span key={m} className="aspect-square rounded-[24px] bg-white flex items-center justify-center floaty" style={{ boxShadow: '0 5px 0 #C98C1C55', ['--r' as string]: `${((k * 7) % 5 - 2) * 3}deg`, animationDelay: `${k * 0.4}s` }}>
                    <Moji name={m} size={44} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POPPINS ──────────────────────────────────────────────────────── */}
      <section id="poppins" className="section" style={{ background: CARD }}>
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="eyebrow mb-3">Poppins</p>
              <h2 className="text-balance mb-5">Poppins does the admin so you don&rsquo;t</h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: MUTED }}>
                Poppins is the AI built into ChoreMaxx, and it&rsquo;s yours — parents only. Ask it anything about how the app works, or just tell it
                what you want: assign Saturday&rsquo;s yard work, move a task to Noah, remind everyone thirty minutes before the deadline.
              </p>
              <p className="text-lg font-extrabold" style={{ color: INK, letterSpacing: '-0.02em' }}>
                It answers, and it acts. Kids don&rsquo;t get access to it. Kids get their tasks.
              </p>
            </div>
            <div className="rounded-[32px] p-8" style={{ background: INK, boxShadow: '0 6px 0 var(--ink-deep), 0 40px 60px -30px color-mix(in srgb, var(--ink-deep) 55%, transparent)' }}>
              <div className="flex items-center gap-3 mb-5">
                <Orb size={44} />
                <p className="text-lg font-extrabold" style={{ color: 'var(--cream)' }}>Poppins</p>
                <span className="ml-auto text-xs font-bold rounded-full px-3 py-1" style={{ background: 'var(--ink-panel)', color: 'var(--gold)' }}>Parents only</span>
              </div>
              <p className="text-lg leading-relaxed italic" style={{ color: '#F3E3D6' }}>
                &ldquo;Assigned Saturday yard work to Noah and moved Sunday dishes to Emma. Reminder set for 30 minutes before tonight&rsquo;s deadline.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOUSE RULES ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-page">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start max-w-5xl">
            <span aria-hidden className="w-24 h-24 rounded-[28px] bg-white flex items-center justify-center" style={{ boxShadow: '0 5px 0 var(--bd)', transform: 'rotate(-5deg)' }}><Moji name="book" size={54} /></span>
            <div>
              <h2 className="text-balance mb-5">The rules are written down, and everyone can read them</h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: MUTED }}>
                Every mechanic in ChoreMaxx — how XP is earned, when things expire, what breaks a streak, how crowns are won — lives on one screen. Thirty-six rules, seven chapters, no mystery.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
                There are two versions. The Admin version, and a Sidekick version written for a nine-year-old. When your child says the app cheated them, you both open the same page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO ──────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: CARD }}>
        <div className="container-page">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start max-w-5xl">
            <span aria-hidden className="w-24 h-24 rounded-[28px] flex items-center justify-center" style={{ background: 'var(--pl)', boxShadow: '0 5px 0 color-mix(in srgb, var(--p) 28%, transparent)', transform: 'rotate(4deg)' }}><Moji name="heartHome" size={54} /></span>
            <div>
              <h2 className="text-balance mb-5">Families. That&rsquo;s the whole list.</h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: MUTED }}>
                ChoreMaxx is built for parents and the kids who live with them. We took out the roommate mode, the coworking mode, and everything else that made it a general task app.
              </p>
              <p className="text-lg leading-relaxed mb-4" style={{ color: MUTED }}>
                Two admins maximum, so authority is clear. Everyone else joins as a Sidekick with a personal invite link — one per child, expires in a week, and they&rsquo;re in the second they tap it.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
                Best for kids old enough to be responsible for something. If you&rsquo;re still in bottles and naps, come back in a few years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="section">
        <div className="container-page">
          <div className="section-heading">
            <p className="eyebrow">Pricing</p>
            <h2>One price. Everyone in the house.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
            {TIERS.map(({ title, price, period, note, highlight, moji }) => (
              <div
                key={title}
                className="rounded-[30px] p-8 flex flex-col gap-6 relative"
                style={highlight ? { background: INK_SOLID, boxShadow: '0 6px 0 var(--ink-deep), 0 40px 60px -30px color-mix(in srgb, var(--ink-deep) 55%, transparent)' } : { ...card, boxShadow: '0 5px 0 var(--bd)' }}
              >
                {highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-extrabold text-white whitespace-nowrap" style={{ background: CORAL, boxShadow: '0 3px 0 var(--p-d)' }}>Save 20%</span>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-10 h-10 rounded-[13px] flex items-center justify-center" style={{ background: highlight ? 'var(--ink-panel)' : 'var(--pl)' }}><Moji name={moji} size={24} /></span>
                    <p className="text-base font-extrabold" style={{ color: highlight ? 'var(--gold)' : INK }}>{title}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold" style={{ color: highlight ? 'var(--cream)' : INK, letterSpacing: '-0.05em' }}>{price}</span>
                    <span className="text-sm" style={{ color: highlight ? 'var(--cream-mute)' : MUTED }}>{period}</span>
                  </div>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: highlight ? 'var(--cream-mute)' : MUTED }}>{note}</p>
                </div>
                <ul className="flex flex-col gap-3 flex-1">
                  {BULLETS.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: highlight ? 'var(--cream)' : SOFT }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: highlight ? CORAL : '#2E9E7422' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={highlight ? '#fff' : '#2E9E74'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/download" className={highlight ? 'btn-primary' : 'btn-ghost'}>Start 7 days free</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="section" style={{ background: CARD }}>
        <div className="container-page max-w-3xl mx-auto">
          <div className="section-heading">
            <h2>Frequently asked questions</h2>
          </div>
          <SupportFaq />
        </div>
      </section>

      {/* ── CLOSE ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28" style={{ background: CORAL }}>
        <div aria-hidden className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.14) 1.4px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        {[
          ['broom', '8%', '18%', -14, 64], ['basket', '86%', '14%', 10, 70], ['star', '14%', '72%', 8, 52],
          ['trophy', '80%', '70%', -8, 66], ['plant', '30%', '8%', 6, 44], ['gift', '66%', '84%', -6, 48],
        ].map(([m, x, y, r, s]) => (
          <span key={m as string} aria-hidden className="absolute hidden md:block floaty" style={{ left: x as string, top: y as string, ['--r' as string]: `${r}deg`, animationDelay: `${(r as number) / 10}s` }}>
            <Moji name={m as string} size={s as number} />
          </span>
        ))}
        <div className="container-page relative z-10 flex flex-col items-center text-center gap-7">
          <h2 className="text-balance text-5xl md:text-6xl" style={{ maxWidth: 680, color: '#fff' }}>Everyone knows what&rsquo;s theirs to do.</h2>
          <p className="text-lg" style={{ color: 'color-mix(in srgb, #fff 88%, var(--pl))', maxWidth: 440 }}>Seven days free. No card until you&rsquo;ve seen whether it holds.</p>
          <AppStoreBadge href="https://apps.apple.com/app/id6796850110" large />
        </div>
      </section>
    </div>
  );
}
