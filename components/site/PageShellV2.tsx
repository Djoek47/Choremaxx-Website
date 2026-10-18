'use client';

/**
 * Simple content page (About). The site-wide Header and Footer come from
 * app/layout.tsx, like every other page, so this shell only draws the title
 * block and the content column with the shared page margins.
 */
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
    <div style={{ background: 'var(--bg)', overflowX: 'clip' }}>
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div
            className="cm-hero-blob"
            style={{
              position: 'absolute', top: -260, right: -160, width: 660, height: 660, borderRadius: '50%',
              filter: 'blur(90px)',
              background: 'radial-gradient(circle, color-mix(in srgb,var(--p) 22%,transparent) 0%, transparent 70%)',
            }}
          />
        </div>
        <div
          className="container-page"
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14, paddingTop: 'clamp(36px, 8vw, 96px)', paddingBottom: 40 }}
        >
          {kicker ? (
            <p style={{ margin: 0, fontSize: 11.5, fontWeight: 650, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--p)' }}>{kicker}</p>
          ) : null}
          <h1 style={{ margin: 0, fontSize: 'clamp(34px,4.6vw,62px)', fontWeight: 700, letterSpacing: '-.045em', lineHeight: 1.04, color: 'var(--tx)', textWrap: 'balance' }}>
            {heading}
          </h1>
          {sub ? <p style={{ margin: 0, maxWidth: 620, fontSize: 'clamp(16px, 2.2vw, 18px)', lineHeight: 1.6, color: 'var(--txm)' }}>{sub}</p> : null}
          {stamp ? <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--txm)' }}>{stamp}</p> : null}
        </div>
      </section>

      <section className="container-page about-body" style={{ paddingBottom: 'clamp(64px, 10vw, 112px)' }}>
        {children}
      </section>
    </div>
  );
}
