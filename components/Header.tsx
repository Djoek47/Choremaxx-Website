'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Image
            src="/brand/choremaxx-logo-mark.png"
            alt=""
            width={28}
            height={28}
            className="w-7 h-7"
          />
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: '#0F0E17' }}
          >
            chore<span style={{ color: '#5B8CFF' }}>maxx</span>
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
              style={{ color: '#3D3A4E' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(91,140,255,0.08)')}
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
          style={{ background: 'rgba(255,255,255,0.80)', border: '1px solid rgba(200,195,230,0.45)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <svg className="w-5 h-5" fill="none" stroke="#3D3A4E" strokeWidth={2} viewBox="0 0 24 24">
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
            border: '1px solid rgba(200,195,230,0.45)',
            boxShadow: '0 8px 32px rgba(100,80,160,0.12)',
          }}
        >
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium px-3 py-2 rounded-xl transition-colors"
              style={{ color: '#3D3A4E' }}
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
