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
      className="cm-site-header"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: 'var(--cm-header-y) var(--cm-page-x) 18px',
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
        className="cm-desktop-nav cm-header-glass"
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
        <div className="cm-header-palette">
          <PaletteDots />
        </div>
        <Link
          href="https://apps.apple.com/app/id6796850110"
          className="cm-header-cta"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 999,
            background: 'linear-gradient(180deg, color-mix(in srgb,#fff 18%,var(--p)) 0%, var(--p) 60%)',
            color: '#fff', fontSize: 13.5, fontWeight: 600,
            boxShadow: '0 1px 0 rgba(255,255,255,.35) inset, 0 6px 22px color-mix(in srgb,var(--p) 42%,transparent)',
          }}
        >
          <span className="cm-cta-long">Get it on the App Store</span>
          <span className="cm-cta-short">App Store</span>
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
          className="cm-menu-glass"
          style={{
            flexBasis: '100%', marginTop: 10, pointerEvents: 'auto', padding: 18, borderRadius: 26,
            background: 'var(--gl)', border: '1px solid var(--glb)', backdropFilter: 'blur(32px) saturate(190%)',
            boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: 6,
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="cm-mobile-nav-link"
              style={{ padding: '12px 16px', borderRadius: 14, fontSize: 15, fontWeight: 600, color: 'var(--txs)', minHeight: 44, display: 'flex', alignItems: 'center' }}
            >
              {l.label}
            </Link>
          ))}
          <div className="cm-mobile-palette" style={{ padding: '8px 16px', display: 'none' }}>
            <PaletteDots />
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .cm-cta-short { display: none; }
        @media (max-width: 1000px) {
          .cm-desktop-nav { display: none !important; }
          .cm-burger { display: grid !important; }
          .cm-header-palette { display: none !important; }
          .cm-mobile-palette { display: block !important; }
        }
        @media (max-width: 480px) {
          .cm-cta-long { display: none; }
          .cm-cta-short { display: inline; }
        }
      `}</style>
    </header>
  );
}
