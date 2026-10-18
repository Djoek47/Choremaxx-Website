import type { ReactNode } from 'react';

import { Moji } from '@/components/Brand';

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
    <div className="relative" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Warm paper + a few Moji */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[420px] paper-dots pointer-events-none" style={{ maskImage: 'linear-gradient(#000, transparent)', WebkitMaskImage: 'linear-gradient(#000, transparent)' }} />
      <div aria-hidden className="absolute right-[6%] top-16 hidden lg:flex gap-4 pointer-events-none">
        {[['broom', -12, 0], ['sparkles', 8, 40], ['basket', -6, 8]].map(([m, r, y]) => (
          <span key={m as string} className="w-20 h-20 rounded-[24px] flex items-center justify-center floaty" style={{ background: 'var(--bgs)', ['--r' as string]: `${r}deg`, marginTop: y as number, boxShadow: '0 5px 0 var(--bd)' }}>
            <Moji name={m as string} size={44} />
          </span>
        ))}
      </div>

      {/* Page header */}
      <div
        className="container-page relative"
        style={{ paddingTop: '4rem', paddingBottom: '2.5rem', zIndex: 1 }}
      >
        <div className="flex flex-col gap-3 max-w-3xl">
          <h1 className="text-balance" style={{ color: 'var(--tx)' }}>{heading}</h1>
          {sub && (
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--txm)' }}>{sub}</p>
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
