'use client';

import { useEffect, useRef, useState } from 'react';

const SCREENS = [
  { label: 'Home', src: '/screenshots/home.webp', fallback: '/screenshots/home.png', alt: 'ChoreMaxx Home — Today dashboard' },
  { label: 'Plan', src: '/screenshots/plan.webp', fallback: '/screenshots/plan.png', alt: 'ChoreMaxx Plan — smart trip routing' },
  { label: 'Shopping', src: '/screenshots/shopping.webp', fallback: '/screenshots/shopping.png', alt: 'ChoreMaxx Shopping — aisle-sorted list' },
  { label: 'Rewards', src: '/screenshots/rewards.webp', fallback: '/screenshots/rewards.png', alt: 'ChoreMaxx Rewards — privilege cards' },
  { label: 'Poppins', src: '/screenshots/poppins-activity.webp', fallback: '/screenshots/poppins-activity.png', alt: 'ChoreMaxx Poppins Activity feed' },
] as const;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function HeroPhone() {
  const [tab, setTab] = useState<string>('Home');
  const [p, setP] = useState(0);
  const tilt = useRef<HTMLDivElement | null>(null);

  /* Scroll progress drives the three float cards. */
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 800;
      setP(clamp01(window.scrollY / (vh * 0.8)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* Pointer tilt on the handset. */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = tilt.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      if (Math.abs(dx) > 2.5 || Math.abs(dy) > 2.5) return;
      el.style.transform = `rotateY(${(dx * 10).toFixed(2)}deg) rotateX(${(-dy * 7).toFixed(2)}deg)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const seg = (a: number, b: number) => clamp01((p - a) / (b - a));
  const shift = p * 96; // parallax travel in px

  const done = (t: number) => t > 0.5;
  const bread = seg(0.06, 0.42);
  const bananas = seg(0.26, 0.62);
  const swap = seg(0.18, 0.56);
  const count = seg(0.42, 0.66);
  const bar = 74 + 26 * seg(0.3, 0.64);

  const glass: React.CSSProperties = {
    position: 'absolute', zIndex: 20, padding: '15px 16px', borderRadius: 22,
    background: 'color-mix(in srgb, var(--card) 90%, transparent)',
    backdropFilter: 'blur(28px) saturate(165%)', border: '1px solid var(--glb)', boxShadow: 'var(--shadow)',
  };

  const row = (label: string, t: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 550 }}>
      <span
        style={{
          width: 15, height: 15, borderRadius: 999, flexShrink: 0, display: 'grid', placeItems: 'center',
          background: done(t) ? '#5BD6BD' : 'transparent',
          border: `1.5px solid ${done(t) ? '#5BD6BD' : 'var(--bd)'}`,
        }}
      >
        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" style={{ opacity: done(t) ? 1 : 0 }} aria-hidden="true">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span style={{ textDecoration: 'line-through', textDecorationColor: t > 0.65 ? 'var(--txm)' : 'transparent', color: t > 0.65 ? 'var(--txm)' : 'var(--tx)' }}>
        {label}
      </span>
    </div>
  );

  return (
    <div
      className="cm-hero-phone"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 660,
        perspective: 1400,
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div className="cm-hero-phone-inner" style={{ position: 'relative', width: 320, maxWidth: '100%', flexShrink: 0 }}>
        <div
          ref={tilt}
          style={{
            position: 'relative', zIndex: 10, width: '100%', maxWidth: 320, margin: '0 auto', padding: 11, borderRadius: 52, transformStyle: 'preserve-3d',
            background: 'linear-gradient(150deg, color-mix(in srgb,var(--tx) 92%,transparent), color-mix(in srgb,var(--tx) 70%,transparent))',
            boxShadow: '0 50px 100px rgba(15,14,23,.26), 0 10px 30px rgba(15,14,23,.14), inset 0 0 0 1px rgba(255,255,255,.14)',
            transition: 'transform .35s cubic-bezier(.22,1,.36,1)',
          }}
        >
          <div style={{ position: 'relative', borderRadius: 42, overflow: 'hidden', background: 'var(--bgs)', aspectRatio: '470 / 1024' }}>
            {SCREENS.map((s) => {
              if (tab !== s.label) return null;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.label}
                  src={s.src}
                  alt={s.alt}
                  fetchPriority={s.label === 'Home' ? 'high' : undefined}
                  loading={s.label === 'Home' ? 'eager' : 'lazy'}
                  style={{
                    position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%', objectFit: 'cover',
                  }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.endsWith('.webp')) img.src = s.fallback;
                  }}
                />
              );
            })}
            <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 96, height: 26, borderRadius: 999, background: 'rgba(10,10,14,.86)' }} />
          </div>
        </div>

        {/* Grocery */}
        <div style={{ ...glass, top: 44, left: -206, width: 182, transform: `translateY(${-shift}px)` }} className="cm-float">
          <p style={{ margin: '0 0 10px', fontSize: 10.5, fontWeight: 650, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--txm)' }}>Grocery · by aisle</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {row('Milk', 1)}
            {row('Eggs', 1)}
            {row('Bread', bread)}
            {row('Bananas', bananas)}
          </div>
        </div>

        {/* Poppins */}
        <div style={{ ...glass, top: 88, right: -224, width: 200, transform: `translateY(${-shift * 0.6}px)` }} className="cm-float">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
            <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--p)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 650, color: 'var(--p)' }}>Poppins</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--txm)' }}>now</span>
          </div>
          <div style={{ position: 'relative', minHeight: 40 }}>
            <div style={{ opacity: 1 - swap, transform: `translateY(${-16 * swap}px)` }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--tx)', lineHeight: 1.3 }}>Laundry completed</p>
              <p style={{ margin: '6px 0 0', fontSize: 12.5, color: 'var(--txm)' }}>Sarah · +80 XP</p>
            </div>
            <div style={{ position: 'absolute', inset: 0, opacity: swap, transform: `translateY(${16 * (1 - swap)}px)` }}>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--tx)', lineHeight: 1.3 }}>Dishwasher loaded</p>
              <p style={{ margin: '6px 0 0', fontSize: 12.5, color: 'var(--txm)' }}>Liam · +40 XP</p>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div style={{ ...glass, bottom: 112, left: -196, width: 176, transform: `translateY(${-shift * 1.25}px)` }} className="cm-float">
          <p style={{ margin: '0 0 4px', fontSize: 10.5, fontWeight: 650, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--txm)' }}>Streak</p>
          <p style={{ margin: 0, display: 'flex', alignItems: 'baseline', fontSize: 34, fontWeight: 700, letterSpacing: '-.045em', color: 'var(--tx)', lineHeight: 1 }}>
            <span style={{ position: 'relative', display: 'inline-grid' }}>
              <span style={{ gridArea: '1/1', opacity: 1 - count, transform: `translateY(${-14 * count}px)` }}>12</span>
              <span style={{ gridArea: '1/1', opacity: count, color: 'var(--p)', transform: `translateY(${14 * (1 - count)}px)` }}>13</span>
            </span>
            <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--txm)', marginLeft: 4 }}>days</span>
          </p>
          <div style={{ marginTop: 10, height: 5, borderRadius: 999, background: 'var(--pl)' }}>
            <div style={{ height: '100%', borderRadius: 999, background: 'var(--p)', width: `${bar}%` }} />
          </div>
        </div>
      </div>

      {/* Screen tabs — in flow below the mockup (tab-strip never wraps) */}
      <div
        className="tab-strip cm-hero-tabs"
        style={{
          padding: 6,
          borderRadius: 999,
          background: 'var(--bg)',
          border: '1px solid var(--bd)',
          boxShadow: 'var(--shadow)',
        }}
      >
        {SCREENS.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setTab(s.label)}
            style={{
              border: 'none', cursor: 'pointer', fontFamily: 'inherit', borderRadius: 999,
              fontWeight: 600, transition: 'background .25s, color .25s',
              background: tab === s.label ? 'var(--p)' : 'transparent',
              color: tab === s.label ? '#fff' : 'var(--txs)',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1180px) { .cm-float { display: none; } }
        @media (max-width: 560px) {
          .cm-hero-phone { min-height: auto !important; padding-bottom: 8px; }
          .cm-hero-phone-inner { width: min(280px, 100%) !important; }
        }
      `}</style>
    </div>
  );
}
