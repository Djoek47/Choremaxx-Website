'use client';

import Link from 'next/link';
import { useState } from 'react';

import PaletteDots from '@/components/theme/PaletteDots';
import { usePalette } from '@/components/theme/PaletteProvider';

const LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/support', label: 'Support' },
];

export default function SiteHeader() {
  const { logo } = usePalette();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '18px 32px',
        display: 'flex', alignItems: 'center', gap: 20, pointerEvents: 'none', flexWrap: 'wrap',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, pointerEvents: 'auto', flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={30} height={30} style={{ display: 'block' }} />
        <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--sec)' }}>
          chore<span style={{ color: 'var(--p)' }}>maxx</span>
        </span>
      </Link>

      <nav
        className="cm-desktop-nav"
        style={{
          margin: '0 auto', display: 'flex', alignItems: 'center', gap: 2, padding: 5, borderRadius: 999,
          background: 'var(--gl)', border: '1px solid var(--glb)', backdropFilter: 'blur(32px) saturate(190%)',
          boxShadow: 'var(--spec), 0 4px 24px rgba(60,40,90,.10)', pointerEvents: 'auto',
        }}
      >
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{ padding: '7px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 550, color: 'var(--txs)', whiteSpace: 'nowrap' }}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, pointerEvents: 'auto', flexShrink: 0, marginLeft: 'auto' }}>
        <PaletteDots />
        <Link
          href="https://apps.apple.com/app/id6796850110"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 999,
            background: 'linear-gradient(180deg, color-mix(in srgb,#fff 18%,var(--p)) 0%, var(--p) 60%)',
            color: '#fff', fontSize: 13.5, fontWeight: 600,
            boxShadow: '0 1px 0 rgba(255,255,255,.35) inset, 0 6px 22px color-mix(in srgb,var(--p) 42%,transparent)',
          }}
        >
          Get it on the App Store
        </Link>
        <button
          type="button"
          className="cm-burger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          style={{
            display: 'none', width: 42, height: 42, borderRadius: 14, placeItems: 'center', cursor: 'pointer',
            background: 'var(--gl)', border: '1px solid var(--glb)', color: 'var(--txs)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {open ? (
        <div
          style={{
            flexBasis: '100%', marginTop: 10, pointerEvents: 'auto', padding: 18, borderRadius: 26,
            background: 'var(--gl)', border: '1px solid var(--glb)', backdropFilter: 'blur(32px) saturate(190%)',
            boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: 6,
          }}
        >
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ padding: '11px 14px', borderRadius: 14, fontSize: 15, fontWeight: 600, color: 'var(--txs)' }}>
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}

      <style jsx>{`
        @media (max-width: 1000px) {
          .cm-desktop-nav { display: none !important; }
          .cm-burger { display: grid !important; }
        }
      `}</style>
    </header>
  );
}
