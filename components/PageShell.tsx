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
    <div style={{ background: '#F6F5FA', minHeight: '100vh' }}>
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="blob blob-purple"
        style={{ width: 500, height: 500, top: -120, right: -80, opacity: 0.45, position: 'absolute', pointerEvents: 'none' }}
      />
      <div
        aria-hidden
        className="blob blob-blue"
        style={{ width: 380, height: 380, bottom: 0, left: -100, opacity: 0.35, position: 'absolute', pointerEvents: 'none' }}
      />

      {/* Page header */}
      <div
        className="container-page relative"
        style={{ paddingTop: '4rem', paddingBottom: '2.5rem', zIndex: 1 }}
      >
        <div className="flex flex-col gap-3 max-w-3xl">
          <h1 className="text-balance" style={{ color: '#0F0E17' }}>{heading}</h1>
          {sub && (
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: '#8B8AA0' }}>{sub}</p>
          )}
        </div>
      </div>

      {/* Page body */}
      <div className="container-page relative" style={{ paddingTop: 0, paddingBottom: '5rem', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
