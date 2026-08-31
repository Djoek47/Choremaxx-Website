'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className="cm-site-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: 'var(--cm-header-y) var(--cm-page-x) 14px',
        isolation: 'isolate',
      }}
    >
      <div
        className="cm-header-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0, zIndex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" width={30} height={30} style={{ display: 'block' }} />
          <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--sec)' }}>
            chore<span style={{ color: 'var(--p)' }}>maxx</span>
          </span>
        </Link>

        <nav
          className="cm-desktop-nav cm-header-glass"
          style={{
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            padding: 5,
            borderRadius: 999,
            background: 'var(--gl)',
            border: '1px solid var(--glb)',
            backdropFilter: 'blur(32px) saturate(190%)',
            boxShadow: 'var(--spec), 0 4px 24px rgba(60,40,90,.10)',
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: '10px 16px',
                borderRadius: 999,
                fontSize: 13.5,
                fontWeight: 550,
                color: 'var(--txs)',
                whiteSpace: 'nowrap',
                minHeight: 40,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, marginLeft: 'auto' }}>
          <div className="cm-header-palette">
            <PaletteDots />
          </div>
          <Link
            href="https://apps.apple.com/app/id6796850110"
            className="cm-header-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '10px 18px',
              borderRadius: 999,
              background: 'linear-gradient(180deg, color-mix(in srgb,#fff 18%,var(--p)) 0%, var(--p) 60%)',
              color: '#fff',
              fontSize: 13.5,
              fontWeight: 600,
              boxShadow: '0 1px 0 rgba(255,255,255,.35) inset, 0 6px 22px color-mix(in srgb,var(--p) 42%,transparent)',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="cm-cta-long">Get it on the App Store</span>
            <span className="cm-cta-short">App Store</span>
          </Link>
          <button
            type="button"
            className="cm-burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            style={{
              display: 'none',
              width: 42,
              height: 42,
              borderRadius: 14,
              placeItems: 'center',
              cursor: 'pointer',
              background: 'var(--bg)',
              border: '1px solid var(--bd)',
              color: 'var(--txs)',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="cm-menu-backdrop"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 0,
              border: 'none',
              padding: 0,
              margin: 0,
              background: 'color-mix(in srgb, var(--tx) 45%, transparent)',
              cursor: 'pointer',
            }}
          />
          <nav
            className="cm-mobile-menu"
            aria-label="Mobile"
            style={{
              position: 'relative',
              zIndex: 1,
              marginTop: 12,
              maxWidth: 1280,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 12,
              borderRadius: 22,
              background: 'var(--bg)',
              border: '1px solid var(--bd)',
              boxShadow: '0 18px 44px color-mix(in srgb, var(--tx) 28%, transparent)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 14,
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--tx)',
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center',
                  background: 'transparent',
                }}
              >
                {l.label}
              </Link>
            ))}
            <div style={{ padding: '10px 12px 6px', borderTop: '1px solid var(--bd)', marginTop: 4 }}>
              <PaletteDots size={16} />
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
