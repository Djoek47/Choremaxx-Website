'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { AppStoreBadge, Logo } from '@/components/Brand';
import PaletteDots from '@/components/theme/PaletteDots';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auth / invite bridges stay full-bleed without marketing chrome (avoids Referer leaks).
  if (pathname?.startsWith('/auth') || pathname?.startsWith('/join')) {
    return null;
  }

  const navLinks = [
    { label: 'Features',     href: '/features'     },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Pricing',      href: '/#pricing'     },
    { label: 'About',        href: '/support'      },
  ];

  return (
    <header className="site-header sticky top-0 z-50 pointer-events-none">
      <div className="container-page py-4 flex items-center justify-between gap-4 pointer-events-auto">
        <Logo />

        <nav
          className="hidden md:flex items-center gap-1 nav-pill px-2 py-1.5"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="nav-link px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <PaletteDots />
          <AppStoreBadge />
        </div>

        <button
          className="md:hidden menu-toggle p-2 rounded-xl"
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

      {mobileOpen && (
        <div className="mobile-menu md:hidden mx-4 mb-2 rounded-2xl p-5 flex flex-col gap-3 pointer-events-auto">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="nav-link text-sm font-medium px-3 py-2 rounded-xl transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="px-1 pt-1"><PaletteDots /></div>
          <AppStoreBadge className="self-start" />
        </div>
      )}
    </header>
  );
}
