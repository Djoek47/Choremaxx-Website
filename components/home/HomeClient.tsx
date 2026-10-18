'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { AppStoreBadge, Moji } from '@/components/Brand';
import { AppHomeScreen, Orb, Phone } from '@/components/Phone';

/* ─── Approved copy (unchanged) ─────────────────────────────────────────────── */
const featureItems = [
  { moji: 'sparkles', label: 'AI Assistant', sub: 'Natural conversations. Real results.' },
  { moji: 'calendar', label: 'Smart Scheduling', sub: 'Automatically plan the perfect week.' },
  { moji: 'heartHome', label: 'Shared Tasks', sub: 'Everyone knows what to do and when.' },
  { moji: 'cart', label: 'Grocery & Lists', sub: 'Smart lists that update themselves.' },
  { moji: 'star', label: 'Rewards & XP', sub: 'Motivate with rewards, XP and achievements.' },
  { moji: 'numbers', label: 'Household Insights', sub: 'Understand your home with powerful insights.' },
];

const householdModes = [
  { label: 'Parents', sub: 'For families with kids', moji: 'heartHome', tint: '#FBE3D6' },
  { label: 'Couples', sub: 'Build better habits together', moji: 'heart', tint: '#FBDDE6' },
  { label: 'Caretakers', sub: 'Care made simple', moji: 'bouquet', tint: '#E4E1F8' },
  { label: 'Students', sub: 'Stay on top of tasks', moji: 'school', tint: '#FFEBCB' },
  { label: 'Kids', sub: 'Fun & responsibility', moji: 'ball', tint: '#DDF1E7' },
];

const timelineItems = [
  { time: '9:00 AM', label: 'Breakfast', person: 'Mom', moji: 'pan' },
  { time: '10:30 AM', label: 'Laundry', person: 'Sarah', moji: 'shirt' },
  { time: '1:00 PM', label: 'Take Garbage', person: 'Alex', moji: 'trashBag' },
  { time: '4:30 PM', label: 'Clean Room', person: 'Noah', moji: 'bed' },
  { time: '7:00 PM', label: 'Water Plants', person: 'Emma', moji: 'plant' },
];


const pricingPlans = [
  { name: 'Free trial', price: 0, desc: '7 days free for the whole household.', features: ['Chores, XP and rewards', 'Family calendar and holidays', 'Smart Trips and groceries', 'Cancel anytime'], cta: 'Start free', highlight: false, moji: 'seedling' },
  { name: 'Yearly', price: 49.99, desc: 'About $4.17 a month. Save 40%.', features: ['Everything in the trial', 'Poppin AI with monthly tokens', 'Every Sidekick and shared screen', 'Cancel anytime'], cta: 'Try it free for 7 days', highlight: true, badge: 'Save 40%', moji: 'crown' },
  { name: 'Monthly', price: 6.99, desc: 'Flexible month to month.', features: ['Everything in the trial', 'Poppin AI with monthly tokens', 'Cancel anytime'], cta: 'Try it free for 7 days', highlight: false, moji: 'home' },
];

const faqItems = [
  { q: 'How does the AI Assistant work?', a: 'Nova uses advanced AI to understand your household patterns, suggest optimal task assignments, and proactively remind members — all through natural conversation.' },
  { q: 'Who is ChoreMaxx for?', a: 'Families. One adult subscribes and the whole household is covered — co-parents, kids’ Sidekick profiles, and shared screens.' },
  { q: 'Is my data secure?', a: 'Yes. Household data is stored securely with encryption in transit and at rest. We never sell your data. You can export or delete everything at any time from within the app.' },
  { q: 'Can I customize tasks and rewards?', a: 'Yes — create any task with custom names, difficulty, frequency, and XP value. Rewards are fully configurable by household admins.' },
];

const INK = '#2A1A12';
const SOFT = '#5A4438';
const MUTED = '#8F7A6C';
const CORAL = '#D85A30';

function Check({ on, color = '#2E9E74' }: { on: boolean; color?: string }) {
  return (
    <span
      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
      style={{ border: `2px solid ${on ? color : '#E6D3C6'}`, background: on ? color : '#fff' }}
    >
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

/* ─── Feature demos: one live mini-screen per feature ─────────────────────── */
function FeatureDemo({ i }: { i: number }) {
  const [groc, setGroc] = useState([true, true, false, false]);
  if (i === 0)
    return (
      <div className="flex flex-col gap-3">
        <div className="self-end max-w-[80%] rounded-[18px] rounded-br-md px-4 py-2.5 text-sm text-white" style={{ background: CORAL }}>Who should take the garbage out today?</div>
        <div className="flex items-end gap-2 max-w-[88%]">
          <Orb size={30} />
          <div className="rounded-[18px] rounded-bl-md bg-white px-4 py-3 text-sm" style={{ color: INK, boxShadow: '0 8px 20px -14px rgba(120,60,30,.5)' }}>
            Alex is free at 1:00 PM and hasn&apos;t had it this week. Want me to assign it?
            <div className="mt-2.5 flex gap-2">
              <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: CORAL, boxShadow: '0 2px 0 #A8411F' }}>Assign Alex</span>
              <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ background: '#FBF4EE', color: SOFT }}>Not now</span>
            </div>
          </div>
        </div>
      </div>
    );
  if (i === 1)
    return (
      <div className="grid grid-cols-7 gap-1.5">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, k) => (
          <div key={k} className="flex flex-col gap-1.5 items-stretch">
            <span className="text-center text-xs font-bold" style={{ color: k === 2 ? CORAL : MUTED }}>{d}</span>
            {[0, 1, 2].map((r) =>
              (k + r) % 3 !== 1 ? (
                <span key={r} className="h-9 rounded-[10px] flex items-center justify-center" style={{ background: ['#FBE3D6', '#DDEBFA', '#FFEBCB'][(k + r) % 3] }}>
                  <Moji name={['broom', 'pan', 'plant', 'shirt', 'cart', 'paw', 'bed'][(k * 3 + r) % 7]} size={18} />
                </span>
              ) : (
                <span key={r} className="h-9 rounded-[10px]" style={{ border: '1.5px dashed #EBD9CD' }} />
              ),
            )}
          </div>
        ))}
      </div>
    );
  if (i === 2)
    return (
      <div className="flex flex-col gap-2">
        {timelineItems.slice(1, 5).map(({ label, person, moji }, k) => (
          <div key={label} className="flex items-center gap-3 rounded-[16px] bg-white px-3 py-2.5" style={{ boxShadow: '0 6px 16px -12px rgba(120,60,30,.5)' }}>
            <Moji name={moji} size={22} />
            <span className="flex-1 text-sm font-bold" style={{ color: INK }}>{label}</span>
            <span className="rounded-full px-2.5 py-0.5 text-xs font-bold" style={{ background: ['#FBE3D6', '#DDEBFA', '#FFEBCB', '#E4E1F8'][k], color: SOFT }}>{person}</span>
          </div>
        ))}
      </div>
    );
  if (i === 3)
    return (
      <div className="flex flex-col gap-1.5">
        {[['Milk', 'milk'], ['Eggs', 'egg'], ['Bread', 'bread'], ['Bananas', 'banana']].map(([item, m], k) => (
          <button
            key={item}
            onClick={() => setGroc((g) => g.map((v, j) => (j === k ? !v : v)))}
            className="flex items-center gap-3 rounded-[16px] bg-white px-3 py-2.5 text-left transition-transform active:scale-[.98]"
            style={{ boxShadow: '0 6px 16px -12px rgba(120,60,30,.5)' }}
          >
            <Check on={groc[k]} />
            <Moji name={m} size={22} />
            <span className="text-sm font-bold" style={{ color: groc[k] ? MUTED : INK, textDecoration: groc[k] ? 'line-through' : 'none' }}>{item}</span>
          </button>
        ))}
        <p className="text-xs mt-1 pl-1" style={{ color: MUTED }}>Tap an item to tick it off.</p>
      </div>
    );
  if (i === 4)
    return (
      <div className="flex flex-col items-center gap-3 py-2">
        <div className="relative">
          <Moji name="trophy" size={72} className="floaty" />
          <Moji name="sparkles" size={26} style={{ position: 'absolute', right: -18, top: -6 }} />
        </div>
        <p className="text-4xl font-extrabold sweep-text" style={{ letterSpacing: '-0.04em' }}>+120 XP</p>
        <div className="flex gap-2">
          {['fire', 'medal', 'gem', 'crown'].map((m) => (
            <span key={m} className="w-11 h-11 rounded-[14px] bg-white flex items-center justify-center" style={{ boxShadow: '0 6px 16px -10px rgba(120,60,30,.5)' }}><Moji name={m} size={24} /></span>
          ))}
        </div>
      </div>
    );
  return (
    <div className="flex items-end justify-between gap-2 h-40 px-1">
      {[
        ['Mom', 82, '#D85A30'],
        ['Sarah', 64, '#EF9F27'],
        ['Alex', 48, '#378ADD'],
        ['Noah', 70, '#7F77DD'],
        ['Emma', 38, '#2E9E74'],
      ].map(([n, v, c]) => (
        <div key={n as string} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
          <span className="text-xs font-bold" style={{ color: INK }}>{v}%</span>
          <span className="w-full rounded-[10px] transition-all duration-700" style={{ height: `${v}%`, background: c as string, boxShadow: `0 3px 0 ${c}99` }} />
          <span className="text-xs" style={{ color: MUTED }}>{n}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function HomeClient() {
  const [feature, setFeature] = useState(0);
  const [mode, setMode] = useState(0);
  const [done, setDone] = useState<boolean[]>([true, true, false, false, false]);
  const [heroGroc, setHeroGroc] = useState([true, true, false, false]);
  const [xpRef, xpSeen] = useInView<HTMLDivElement>();

  const doneCount = done.filter(Boolean).length;
  const nowIdx = done.findIndex((d) => !d);

  return (
    <div style={{ background: '#FBF4EE' }}>
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        <div aria-hidden className="absolute inset-0 paper-dots" style={{ maskImage: 'radial-gradient(ellipse at 70% 40%, #000 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, #000 0%, transparent 70%)' }} />
        <div aria-hidden className="blob blob-purple" style={{ width: 520, height: 520, top: -160, right: -60, opacity: 0.55 }} />
        <div aria-hidden className="blob blob-blue" style={{ width: 380, height: 380, bottom: -80, left: -120, opacity: 0.45 }} />

        <div className="container-page relative z-10" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-6">
            <div className="flex-1 flex flex-col gap-7 max-w-xl">
              <div className="chip self-start hero-in" style={{ animationDelay: '.05s' }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#FBE3D6' }}><Moji name="sparkles" size={16} /></span>
                AI Household Operating System
              </div>

              <h1 className="text-balance hero-in" style={{ animationDelay: '.12s' }}>
                Finally.<br />
                A Home That<br />
                Runs{' '}
                <span className="relative inline-block" style={{ color: CORAL }}>
                  Itself.
                  <svg aria-hidden className="absolute left-0 -bottom-2 w-full" height="14" viewBox="0 0 200 14" preserveAspectRatio="none">
                    <path d="M3 9 C 50 2, 120 2, 197 8" stroke="#FAC775" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-lg hero-in" style={{ color: SOFT, maxWidth: 440, animationDelay: '.2s' }}>
                AI organizes chores, shopping, schedules and responsibilities so everyone knows exactly what to do.
              </p>

              <div className="flex flex-wrap items-center gap-4 hero-in" style={{ animationDelay: '.28s' }}>
                <AppStoreBadge large />
                <Link href="/how-it-works" className="btn-ghost gap-2" style={{ padding: '1rem 1.5rem' }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: CORAL }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  Watch Demo
                </Link>
              </div>

              <p className="text-sm font-bold hero-in" style={{ color: MUTED, animationDelay: '.36s' }}>
                Free for 7 days · Cancel anytime
              </p>
            </div>

            {/* Right: real app screen in a phone, with live widgets around it */}
            <div className="flex-1 relative flex items-center justify-center w-full" style={{ minHeight: 640 }}>
              <div aria-hidden className="absolute rounded-full" style={{ width: 460, height: 460, background: 'radial-gradient(circle, #FAC77588, #FAC77500 70%)' }} />
              <div className="hero-in relative z-10" style={{ animationDelay: '.25s', ['--r' as string]: '-2deg' }}>
                <Phone width={300}>
                  <AppHomeScreen />
                </Phone>
              </div>

              {/* Grocery List — tappable */}
              <div className="glass-card p-4 absolute hidden md:block hero-in" style={{ width: 178, zIndex: 20, left: '-3%', top: 30, animationDelay: '.5s', ['--r' as string]: '-4deg' }}>
                <p className="text-sm font-extrabold mb-2 flex items-center gap-1.5" style={{ color: INK }}><Moji name="cart" size={18} />Grocery List</p>
                {['Milk', 'Eggs', 'Bread', 'Bananas'].map((item, i) => (
                  <button key={item} onClick={() => setHeroGroc((g) => g.map((v, j) => (j === i ? !v : v)))} className="flex w-full items-center gap-2 py-1 text-left">
                    <Check on={heroGroc[i]} />
                    <span className="text-sm font-medium" style={{ color: heroGroc[i] ? MUTED : INK, textDecoration: heroGroc[i] ? 'line-through' : 'none' }}>{item}</span>
                  </button>
                ))}
              </div>

              {/* AI Assistant */}
              <div className="glass-card p-4 absolute hidden md:block hero-in" style={{ width: 200, zIndex: 20, right: '-5%', top: 90, animationDelay: '.62s', ['--r' as string]: '3deg' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Orb size={26} />
                  <span className="text-sm font-extrabold" style={{ color: CORAL }}>AI Assistant</span>
                  <span className="text-xs ml-auto" style={{ color: MUTED }}>now</span>
                </div>
                <p className="text-sm" style={{ color: INK }}>Laundry completed!</p>
                <p className="text-sm" style={{ color: '#2E9E74', fontWeight: 700 }}>Sarah earned +80 XP</p>
              </div>

              {/* Kids XP */}
              <div className="glass-card p-4 absolute hidden md:block hero-in" style={{ width: 168, zIndex: 20, left: '0%', bottom: 60, animationDelay: '.74s', ['--r' as string]: '2deg' }}>
                <p className="text-xs font-bold mb-1 flex items-center gap-1.5" style={{ color: MUTED }}><Moji name="star" size={16} />Kids XP</p>
                <p className="text-3xl font-extrabold" style={{ color: INK, letterSpacing: '-0.04em' }}>1,250</p>
                <p className="text-xs" style={{ color: MUTED }}>Total XP</p>
              </div>

              {/* Energy Harmony */}
              <div className="glass-card p-4 absolute hidden md:block hero-in" style={{ width: 178, zIndex: 20, right: '-4%', bottom: 110, animationDelay: '.86s', ['--r' as string]: '-3deg' }}>
                <p className="text-xs font-bold mb-0.5" style={{ color: INK }}>Energy Harmony</p>
                <p className="text-base font-extrabold" style={{ color: '#2E9E74' }}>High</p>
                <svg width="140" height="40" viewBox="0 0 130 40" fill="none" className="mt-1">
                  <path d="M0 25 Q25 10 50 20 T100 15 T130 22 V40 H0Z" fill="#2E9E7422" />
                  <path d="M0 25 Q25 10 50 20 T100 15 T130 22" stroke="#2E9E74" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURES — pick one, see it working ─────────────────────── */}
      <section className="section">
        <div className="container-page">
          <div className="section-heading">
            <h2 className="text-balance">Everything Your Home Needs</h2>
          </div>
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-stretch">
            <div className="grid grid-cols-2 gap-3" role="tablist" aria-label="Features">
              {featureItems.map(({ moji, label, sub }, i) => {
                const on = feature === i;
                return (
                  <button
                    key={label}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setFeature(i)}
                    className="text-left rounded-[22px] p-5 flex flex-col gap-3 transition-all duration-200"
                    style={{
                      background: on ? INK : '#FFFFFF',
                      border: `1px solid ${on ? INK : 'rgba(120,70,40,.08)'}`,
                      boxShadow: on ? '0 5px 0 #000, 0 24px 40px -20px rgba(42,26,18,.6)' : '0 4px 0 rgba(120,70,40,.08)',
                      transform: on ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <span className="w-12 h-12 rounded-[16px] flex items-center justify-center" style={{ background: on ? '#3D2A20' : '#FBF4EE' }}>
                      <Moji name={moji} size={28} />
                    </span>
                    <span className="text-base font-extrabold" style={{ color: on ? '#FFF3E6' : INK }}>{label}</span>
                    <span className="text-sm leading-snug" style={{ color: on ? '#D9C3B4' : MUTED }}>{sub}</span>
                  </button>
                );
              })}
            </div>
            <div className="relative rounded-[32px] p-6 md:p-10 flex flex-col overflow-hidden" style={{ background: 'linear-gradient(160deg, #FCEADF, #FFF7EC)', border: '1px solid rgba(216,90,48,.12)', minHeight: 380 }}>
              <div aria-hidden className="absolute inset-0 paper-dots opacity-60" />
              <div className="relative flex items-center gap-3 mb-7">
                <span className="w-11 h-11 rounded-[14px] bg-white flex items-center justify-center" style={{ boxShadow: '0 4px 0 rgba(120,70,40,.1)' }}><Moji name={featureItems[feature].moji} size={26} /></span>
                <div>
                  <p className="text-xl font-extrabold" style={{ color: INK, letterSpacing: '-0.02em' }}>{featureItems[feature].label}</p>
                  <p className="text-sm" style={{ color: MUTED }}>{featureItems[feature].sub}</p>
                </div>
              </div>
              <div key={feature} className="relative flex-1 flex flex-col justify-center hero-in" style={{ animationDuration: '.45s' }}>
                <FeatureDemo i={feature} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. HOUSEHOLD MODES ────────────────────────────────────────── */}
      <section className="section" style={{ background: '#FFFFFF' }}>
        <div className="container-page">
          <div className="section-heading">
            <h2 className="text-balance">Built For Every Type of Home</h2>
            <p className="text-base" style={{ color: MUTED }}>Choose the mode that fits your household.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {householdModes.map(({ label, sub, moji, tint }, i) => {
              const on = mode === i;
              return (
                <button
                  key={label}
                  onClick={() => setMode(i)}
                  aria-pressed={on}
                  className="relative rounded-[24px] p-5 pt-6 flex flex-col items-center text-center gap-2.5 transition-all duration-200"
                  style={{
                    background: on ? tint : '#FFFFFF',
                    border: `2px solid ${on ? CORAL : 'rgba(120,70,40,.08)'}`,
                    boxShadow: on ? '0 5px 0 #A8411F' : '0 4px 0 rgba(120,70,40,.08)',
                    transform: on ? 'translateY(-3px)' : 'none',
                  }}
                >
                  {on && (
                    <span className="absolute top-2.5 right-2.5 pop"><Check on color={CORAL} /></span>
                  )}
                  <span className="w-16 h-16 rounded-[20px] flex items-center justify-center transition-transform duration-300" style={{ background: on ? '#FFFFFF' : tint, transform: on ? 'rotate(-6deg) scale(1.06)' : 'none' }}>
                    <Moji name={moji} size={36} />
                  </span>
                  <span className="text-base font-extrabold" style={{ color: INK }}>{label}</span>
                  <span className="text-xs" style={{ color: MUTED }}>{sub}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. CHORE TIMELINE — tap to complete ───────────────────────── */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            <div className="lg:w-80 flex-shrink-0">
              <h2 className="text-balance mb-4">See Your Day, Stay In Sync</h2>
              <p className="text-base mb-6" style={{ color: MUTED }}>A beautiful timeline everyone can follow and update.</p>
              <Link href="/features" className="btn-ghost text-sm">
                Explore All Tasks
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="flex-1 w-full overflow-x-auto pb-2">
              <div className="relative min-w-[680px] pt-2">
                                <div className="grid grid-cols-5 gap-4">
                  {timelineItems.map(({ time, label, person, moji }, i) => {
                    const isDone = done[i];
                    const isNow = i === nowIdx;
                    return (
                      <div key={label} className="flex flex-col items-center gap-3">
                        <p className="text-xs font-bold" style={{ color: isNow ? CORAL : MUTED }}>{time}</p>
                        <button
                          onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                          aria-pressed={isDone}
                          aria-label={`${label}, ${person}${isDone ? ', done' : ''}`}
                          className="w-full rounded-[22px] p-4 flex flex-col items-center gap-2 text-center transition-all duration-200 active:translate-y-[3px]"
                          style={{
                            background: isNow ? CORAL : '#FFFFFF',
                            border: `1px solid ${isNow ? CORAL : 'rgba(120,70,40,.08)'}`,
                            boxShadow: isNow ? '0 5px 0 #A8411F, 0 18px 30px -14px rgba(216,90,48,.6)' : '0 4px 0 rgba(120,70,40,.08)',
                            opacity: isDone ? 0.72 : 1,
                          }}
                        >
                          <span className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{ background: isNow ? '#FFFFFF33' : '#FBF4EE' }}>
                            <Moji name={moji} size={26} />
                          </span>
                          <p className="text-sm font-extrabold" style={{ color: isNow ? '#FFF' : INK, textDecoration: isDone ? 'line-through' : 'none' }}>{label}</p>
                          <p className="text-xs" style={{ color: isNow ? 'rgba(255,255,255,.8)' : MUTED }}>{person}</p>
                        </button>
                        <span className="relative w-full flex items-center justify-center h-5">
                          {i > 0 && <span className="absolute right-1/2 h-1.5 transition-colors duration-300" style={{ left: -8, background: isDone || isNow ? CORAL : '#EBD9CD' }} />}
                          {i < 4 && <span className="absolute left-1/2 h-1.5 transition-colors duration-300" style={{ right: -8, background: isDone ? CORAL : '#EBD9CD' }} />}
                          <span className="relative z-10 w-5 h-5 rounded-full transition-colors duration-300" style={{ background: isDone || isNow ? CORAL : '#E6D3C6', border: '3px solid #FBF4EE' }} />
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm mt-5 text-center" style={{ color: MUTED }}>{doneCount} of 5 done today. Tap a card to tick it off.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. REWARDS / XP ───────────────────────────────────────────── */}
      <section className="section" style={{ background: '#2A1A12' }}>
        <div className="container-page">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            <div className="lg:w-80 flex-shrink-0">
              <h2 className="text-balance mb-4" style={{ color: '#FFF3E6' }}>Make Chores Worth It</h2>
              <p className="text-base mb-6" style={{ color: '#D9C3B4' }}>Positive habits. Real rewards. A happier home.</p>
              <Link href="/features" className="btn-primary text-sm">
                See Rewards
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div ref={xpRef} className="flex-1 flex flex-wrap gap-5 items-center justify-center">
              <div className="relative rounded-[30px] p-8 flex flex-col gap-4 overflow-hidden" style={{ minWidth: 300, background: '#3A2820', border: '1px solid #4E382D' }}>
                <Moji name="trophy" size={90} style={{ position: 'absolute', right: -10, top: -8, opacity: 0.95, transform: 'rotate(12deg)' }} />
                <p className="text-sm" style={{ color: '#D9C3B4' }}>You earned</p>
                <p className="text-6xl font-extrabold sweep-text" style={{ letterSpacing: '-0.05em' }}>+120 XP</p>
                <p className="text-sm font-bold" style={{ color: '#5FD3A3' }}>Great job!</p>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span style={{ color: '#D9C3B4' }}>1,250 / 2,000 XP</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: '#4E382D' }}>
                    <div className="h-full rounded-full" style={{ width: xpSeen ? '62.5%' : '0%', transition: 'width 1.4s cubic-bezier(.2,.8,.2,1)', background: 'linear-gradient(90deg, #D85A30, #EF9F27, #FAC775)' }} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { moji: 'fire', label: 'Daily Streak', val: '7 days in a row' },
                  { moji: 'trophy', label: 'Top Contributor', val: 'This week' },
                  { moji: 'medal', label: 'Family Goal', val: '88% completed' },
                ].map(({ moji, label, val }, i) => (
                  <div key={label} className="rounded-[20px] px-5 py-3.5 flex items-center gap-4 transition-transform hover:-translate-y-1" style={{ minWidth: 230, background: '#3A2820', border: '1px solid #4E382D', transform: `rotate(${(i - 1) * 1.5}deg)` }}>
                    <span className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{ background: '#4E382D' }}><Moji name={moji} size={26} /></span>
                    <div>
                      <p className="text-sm font-extrabold" style={{ color: '#FFF3E6' }}>{label}</p>
                      <p className="text-xs" style={{ color: '#D9C3B4' }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PRICING ────────────────────────────────────────────────── */}
      <section id="pricing" className="section" style={{ background: '#FFFFFF' }}>
        <div className="container-page">
          <div className="section-heading">
            <h2>Simple pricing. Free for 7 days.</h2>
            <p className="text-base max-w-xl" style={{ color: MUTED }}>One subscription covers the whole household. Cancel anytime in your Apple ID settings.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {pricingPlans.map(({ name, price, desc, features, cta, highlight, badge, moji }) => {
              const shown = price === 0 ? '$0' : `$${price.toFixed(2)}`;
              const period = name === 'Yearly' ? '/year' : name === 'Monthly' ? '/month' : ' for 7 days';
              return (
                <div
                  key={name}
                  className="rounded-[30px] p-8 flex flex-col gap-6 relative"
                  style={
                    highlight
                      ? { background: INK, boxShadow: '0 6px 0 #000, 0 40px 60px -30px rgba(42,26,18,.6)', transform: 'translateY(-10px)' }
                      : { background: '#FBF4EE', border: '1px solid rgba(120,70,40,.08)', boxShadow: '0 5px 0 rgba(120,70,40,.08)' }
                  }
                >
                  {badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 rounded-full text-xs font-extrabold text-white whitespace-nowrap" style={{ background: CORAL, boxShadow: '0 3px 0 #A8411F' }}>{badge}</span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-10 h-10 rounded-[13px] flex items-center justify-center" style={{ background: highlight ? '#3D2A20' : '#FFFFFF' }}><Moji name={moji} size={24} /></span>
                      <p className="text-base font-extrabold" style={{ color: highlight ? '#FAC775' : INK }}>{name}</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold" style={{ color: highlight ? '#FFF3E6' : INK, letterSpacing: '-0.05em' }}>{shown}</span>
                      <span className="text-sm" style={{ color: highlight ? '#D9C3B4' : MUTED }}>{period}</span>
                    </div>
                    <p className="text-sm mt-2" style={{ color: highlight ? '#D9C3B4' : MUTED }}>{desc}</p>
                  </div>
                  <ul className="flex flex-col gap-3 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: highlight ? '#FFF3E6' : SOFT }}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: highlight ? CORAL : '#2E9E7422' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={highlight ? '#fff' : '#2E9E74'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/download" className={highlight ? 'btn-primary' : 'btn-ghost'}>{cta}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-page max-w-3xl mx-auto">
          <div className="section-heading">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqItems.map(({ q, a }) => (
              <details key={q} className="group rounded-[22px] bg-white px-7 py-5 cursor-pointer transition-shadow open:shadow-[0_5px_0_rgba(216,90,48,.25)]" style={{ border: '1px solid rgba(120,70,40,.08)', boxShadow: '0 4px 0 rgba(120,70,40,.07)' }}>
                <summary className="flex items-center justify-between text-base font-extrabold list-none [&::-webkit-details-marker]:hidden" style={{ color: INK }}>
                  {q}
                  <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-200 group-open:rotate-45 group-open:bg-[#D85A30]" style={{ background: '#FBF4EE' }}>
                    <svg className="w-4 h-4 group-open:stroke-white" viewBox="0 0 24 24" fill="none" stroke={CORAL} strokeWidth="3"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
                  </span>
                </summary>
                <p className="text-base mt-4 leading-relaxed" style={{ color: SOFT }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ─────────────────────────────────────────────── */}
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
        <div className="container-page relative z-10 flex flex-col items-center text-center gap-8">
          <h2 className="text-balance text-5xl md:text-7xl" style={{ maxWidth: 680, color: '#FFFFFF' }}>Ready For A Better Home?</h2>
          <p className="text-lg" style={{ color: '#FFE7DA', maxWidth: 420 }}>Free for 7 days, then $6.99/month or $49.99/year.</p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <AppStoreBadge large />
            <Link href="/how-it-works" className="btn-ghost gap-2" style={{ padding: '1rem 1.6rem', boxShadow: '0 4px 0 #A8411F' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={CORAL}><path d="M8 5v14l11-7z" /></svg>
              Watch Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
