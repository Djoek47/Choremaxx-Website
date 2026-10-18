import type { CSSProperties, ReactNode } from 'react';

import { Moji } from '@/components/Brand';

/** An iPhone frame with the Dynamic Island; children are the screen. */
export function Phone({ children, width = 300, style, className = '' }: { children: ReactNode; width?: number; style?: CSSProperties; className?: string }) {
  const h = Math.round(width * 2.05);
  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height: h,
        borderRadius: width * 0.17,
        padding: width * 0.035,
        background: 'linear-gradient(145deg, #3A2A22, #120B08 45%, #2A1D17)',
        boxShadow: '0 0 0 1.5px #5C463B inset, 0 50px 90px -40px rgba(120,50,20,.55), 0 30px 50px -30px rgba(0,0,0,.45)',
        ...style,
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{ borderRadius: width * 0.14, background: '#FBF4EE' }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 z-30"
          style={{ top: width * 0.03, width: width * 0.32, height: width * 0.095, borderRadius: 99, background: '#000' }}
        />
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[9%] text-[11px] font-bold" style={{ height: width * 0.15, color: '#2A1A12' }}>
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="#2A1A12"><rect x="0" y="6" width="3" height="4" rx="1"/><rect x="4.3" y="4" width="3" height="6" rx="1"/><rect x="8.6" y="2" width="3" height="8" rx="1"/><rect x="12.9" y="0" width="3" height="10" rx="1"/></svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x=".5" y=".5" width="19" height="10" rx="3" stroke="#2A1A12" opacity=".5"/><rect x="2" y="2" width="14" height="7" rx="1.6" fill="#2A1A12"/><rect x="20.3" y="3.5" width="1.4" height="4" rx=".7" fill="#2A1A12" opacity=".5"/></svg>
          </span>
        </div>
        <div className="absolute inset-0" style={{ paddingTop: width * 0.15 }}>{children}</div>
      </div>
    </div>
  );
}

/** Nova's orb: a ball with a sloshing water line, like Poppin in the app. */
export function Orb({ size = 44 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="relative inline-block overflow-hidden flex-shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 32% 28%, #FFFFFF 0 10%, #FDE6D8 30%, #F6B79C 100%)',
        boxShadow: 'inset 0 -4px 10px rgba(168,65,31,.25), 0 8px 18px -8px rgba(216,90,48,.7)',
      }}
    >
      <span className="slosh absolute left-0" style={{ bottom: 0, width: '200%', height: '52%', animation: 'cm-slosh 3.2s linear infinite' }}>
        <svg viewBox="0 0 200 50" preserveAspectRatio="none" width="100%" height="100%">
          <path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V50 H0Z" fill="#D85A30" opacity=".9" />
        </svg>
      </span>
      <span className="absolute" style={{ top: '16%', left: '22%', width: '24%', height: '16%', borderRadius: '50%', background: 'rgba(255,255,255,.85)' }} />
    </span>
  );
}

/** The app's home screen for "The Johnsons". */
export function AppHomeScreen() {
  const tasks = [
    { moji: 'trashBag', t: 'Take Garbage', who: 'Alex', xp: 40, due: '1:00 PM', hot: true },
    { moji: 'shirt', t: 'Laundry', who: 'Sarah', xp: 80, due: 'Done', done: true },
    { moji: 'bed', t: 'Clean Room', who: 'Noah', xp: 60, due: '4:30 PM' },
    { moji: 'plant', t: 'Water Plants', who: 'Emma', xp: 20, due: '7:00 PM' },
  ];
  return (
    <div className="h-full flex flex-col gap-2.5 px-3.5 pb-4" style={{ fontSize: 12 }}>
      <div className="flex items-center justify-between pt-1">
        <div>
          <p style={{ fontSize: 10.5, color: '#8F7A6C', fontWeight: 600 }}>Good afternoon</p>
          <p style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.03em', color: '#2A1A12', lineHeight: 1.1 }}>The Johnsons</p>
        </div>
        <span className="flex -space-x-2">
          {['#F6B79C', '#FAC775', '#CFE3F7', '#F4C0D1'].map((c) => (
            <span key={c} className="w-6 h-6 rounded-full border-2 border-white" style={{ background: c }} />
          ))}
        </span>
      </div>

      <div className="rounded-[18px] p-3 flex items-center gap-2.5" style={{ background: '#2A1A12' }}>
        <Orb size={34} />
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: 10, color: '#FAC775', fontWeight: 700 }}>Nova</p>
          <p style={{ fontSize: 11, color: '#FFF3E6', lineHeight: 1.3 }}>Laundry completed! Sarah earned +80 XP</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { m: 'fire', v: '7', l: 'day streak' },
          { m: 'star', v: '1,250', l: 'Kids XP' },
          { m: 'trophy', v: '88%', l: 'goal' },
        ].map(({ m, v, l }) => (
          <div key={l} className="rounded-[14px] bg-white p-2 flex flex-col items-start" style={{ boxShadow: '0 6px 14px -10px rgba(120,60,30,.5)' }}>
            <Moji name={m} size={16} />
            <p style={{ fontWeight: 800, fontSize: 14, color: '#2A1A12', marginTop: 2 }}>{v}</p>
            <p style={{ fontSize: 9, color: '#8F7A6C' }}>{l}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12.5, fontWeight: 800, color: '#2A1A12', marginTop: 2 }}>Today</p>
      <div className="flex flex-col gap-1.5">
        {tasks.map(({ moji, t, who, xp, due, hot, done }) => (
          <div
            key={t}
            className="flex items-center gap-2.5 rounded-[14px] bg-white px-2.5 py-2"
            style={{ border: hot ? '1.5px solid #D85A30' : '1px solid rgba(120,70,40,.07)', opacity: done ? 0.6 : 1 }}
          >
            <span className="w-8 h-8 rounded-[10px] flex items-center justify-center" style={{ background: hot ? '#FBE3D6' : '#FBF4EE' }}>
              <Moji name={moji} size={20} />
            </span>
            <div className="flex-1 min-w-0">
              <p style={{ fontWeight: 700, color: '#2A1A12', textDecoration: done ? 'line-through' : 'none' }}>{t}</p>
              <p style={{ fontSize: 9.5, color: '#8F7A6C' }}>{who} · {due}</p>
            </div>
            <span className="rounded-full px-1.5 py-0.5" style={{ fontSize: 9.5, fontWeight: 800, background: '#FFF1D6', color: '#A8411F' }}>+{xp}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto mx-auto flex items-center gap-5 rounded-full bg-white px-5 py-2" style={{ boxShadow: '0 8px 20px -10px rgba(120,60,30,.5)' }}>
        {['home', 'calendar', 'star', 'cart'].map((m, i) => (
          <span key={m} style={{ opacity: i === 0 ? 1 : 0.45 }}><Moji name={m} size={18} /></span>
        ))}
      </div>
    </div>
  );
}
