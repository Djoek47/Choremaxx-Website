import type { ReactNode } from 'react';

export default function PageShell({
  children,
  heading,
  sub,
}: {
  children: ReactNode;
  heading: string;
  sub?: string;
}) {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: 'var(--vh-full)', position: 'relative', overflowX: 'clip' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div
          className="blob blob-purple"
          style={{ width: 500, height: 500, top: -120, right: -80, opacity: 0.45, position: 'absolute' }}
        />
        <div
          className="blob blob-blue"
          style={{ width: 380, height: 380, bottom: 0, left: -100, opacity: 0.35, position: 'absolute' }}
        />
      </div>

      <div
        className="container-page relative"
        style={{ paddingTop: 'calc(5.5rem + var(--cm-header-y))', paddingBottom: '2.5rem', zIndex: 1 }}
      >
        <div className="flex flex-col gap-3 max-w-3xl min-w-0">
          <h1 className="text-balance" style={{ color: 'var(--color-text-primary)' }}>{heading}</h1>
          {sub ? (
            <p className="text-lg leading-relaxed max-w-2xl prose-measure" style={{ color: 'var(--color-text-muted)' }}>{sub}</p>
          ) : null}
        </div>
      </div>

      <div className="container-page relative min-w-0" style={{ paddingTop: 0, paddingBottom: '5rem', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
