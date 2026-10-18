'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { AppleLogo, Logo } from '@/components/Brand';
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
    <header className="sticky top-0 z-50 pointer-events-none" style={{ background: "linear-gradient(#FBF4EEee, #FBF4EE00)" }}>
      {/* Floating pill nav — centered */}
      <div className="container-page py-4 flex items-center justify-between gap-4 pointer-events-auto">

        {/* Logo — left */}
        <Logo />

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
              style={{ color: '#5A4438' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(216,90,48,0.10)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right CTA — desktop */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <PaletteDots />
          <Link href="/download" className="btn-primary text-sm py-2.5 px-5">
            <AppleLogo size={16} color="#fff" />
            Download on App Store
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(200,160,135,0.45)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="#5A4438" strokeWidth={2} viewBox="0 0 24 24">
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
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(200,160,135,0.45)',
            boxShadow: '0 8px 32px rgba(120,60,30,0.12)',
          }}
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium px-3 py-2 rounded-xl transition-colors"
              style={{ color: '#5A4438' }}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="px-1 pt-1"><PaletteDots /></div>
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
