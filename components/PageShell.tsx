/**
 * PageShell — wraps every secondary page in the deep-purple background
 * with decorative blobs, matching the design system.
 */

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
    <div className="page-bg" style={{ minHeight: '100vh' }}>
      {/* Ambient blobs */}
      <div className="blob-1" aria-hidden style={{ top: -120, right: -80, opacity: 0.40 }} />
      <div className="blob-2" aria-hidden style={{ bottom: 0, left: -100, opacity: 0.30 }} />

      {/* Page header */}
      <div
        className="container-page"
        style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}
      >
        <div className="flex flex-col gap-3 max-w-3xl">
          <h1 className="text-balance text-white">{heading}</h1>
          {sub && <p className="text-white/65 text-lg leading-relaxed max-w-2xl">{sub}</p>}
        </div>
      </div>

      {/* Page body */}
      <div className="container-page" style={{ paddingTop: 0, paddingBottom: '5rem' }}>
        {children}
      </div>
    </div>
  );
}
