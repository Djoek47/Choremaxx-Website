'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/* Routes shipped in the V2 redesign — they render their own SiteHeader/SiteFooter
 * (directly or via PageShellV2), so the legacy global chrome must stay hidden. */
const REDESIGN_ROUTES = new Set([
  '/',
  '/support',
  '/contact',
  '/about',
  '/privacy',
  '/terms',
  '/cookies',
  '/copyright',
  '/kids',
]);

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auth / invite bridges — full-bleed Apple-calm pages without marketing chrome.
  // V2 redesign routes render their own <SiteHeader>, so suppress this one there.
  if (
    pathname?.startsWith('/auth') ||
    pathname?.startsWith('/join') ||
    REDESIGN_ROUTES.has(pathname ?? '')
  ) {
    return null;
  }

  const navLinks = [
    { label: 'Features',     href: '/features'     },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Pricing',      href: '/#pricing'     },
    { label: 'About',        href: '/support'      },
  ];

  return (
    <header className="sticky top-0 z-50 pointer-events-none">
      {/* Floating pill nav — centered */}
      <div className="container-page py-4 flex items-center justify-between gap-4 pointer-events-auto">

        {/* Logo — left */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0"
          aria-label="ChoreMaxx home"
        >
          <span className="brand-logo w-7 h-7" role="img" aria-hidden="true" />
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: 'var(--color-secondary)' }}
          >
            chore<span style={{ color: 'var(--color-primary)' }}>maxx</span>
          </span>
        </Link>

        {/* Center nav pill — desktop */}
        <nav
          className="hidden md:flex items-center gap-1 nav-pill px-2 py-1.5"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--color-primary) 8%, transparent)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right CTA — desktop */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <Link href="/download" className="btn-primary text-sm py-2.5 px-5">
            Download on App Store
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl"
          style={{
            background: 'var(--color-glass)',
            border: '1px solid var(--color-glass-border)',
            color: 'var(--color-text-secondary)',
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden mx-4 mb-2 rounded-2xl p-5 flex flex-col gap-3 pointer-events-auto"
          style={{
            background: 'var(--color-glass)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid var(--color-glass-border)',
            boxShadow: '0 8px 32px rgba(100,80,160,0.12)',
          }}
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium px-3 py-2 rounded-xl transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/download"
            className="btn-primary text-sm mt-1"
            onClick={() => setMobileOpen(false)}
          >
            Download on App Store
          </Link>
        </div>
      )}
    </header>
  );
}
