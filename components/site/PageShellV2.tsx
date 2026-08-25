'use client';

import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

export default function PageShellV2({
  kicker,
  heading,
  sub,
  stamp,
  children,
}: {
  kicker?: string;
  heading: string;
  sub?: string;
  stamp?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SiteHeader />

      <section style={{ position: 'relative', padding: '150px 32px 44px', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute', top: -260, right: -160, width: 660, height: 660, borderRadius: '50%',
              filter: 'blur(90px)', animation: 'cmDrift 30s ease-in-out infinite alternate',
              background: 'radial-gradient(circle, color-mix(in srgb,var(--p) 22%,transparent) 0%, transparent 70%)',
            }}
          />
        </div>
        <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {kicker ? (
            <p style={{ margin: 0, fontSize: 11.5, fontWeight: 650, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--p)' }}>{kicker}</p>
          ) : null}
          <h1 style={{ margin: 0, fontSize: 'clamp(34px,4.6vw,62px)', fontWeight: 700, letterSpacing: '-.045em', lineHeight: 1.02, color: 'var(--tx)', textWrap: 'balance' }}>
            {heading}
          </h1>
          {sub ? <p style={{ margin: 0, maxWidth: 620, fontSize: 18, lineHeight: 1.6, color: 'var(--txm)' }}>{sub}</p> : null}
          {stamp ? <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--txm)' }}>{stamp}</p> : null}
        </div>
      </section>

      <section style={{ padding: '0 32px 110px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>{children}</div>
      </section>

      <SiteFooter />
    </div>
  );
}
