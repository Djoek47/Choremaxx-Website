'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Glass nav bar floating over the purple background */}
      <div
        style={{
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <div className="container-page flex items-center justify-between gap-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <Image
              src="/brand/choremaxx-logo-mark.png"
              alt="ChoreMaxx"
              width={34}
              height={34}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              ChoreMaxx
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            {[
              { label: 'How it works', href: '/how-it-works' },
              { label: 'Features',     href: '/features'     },
              { label: 'Support',      href: '/support'      },
              { label: 'Download',     href: '/download'     },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/download" className="btn-outline text-sm py-2 px-5">
              Get the app
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              background: 'rgba(76,29,149,0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <nav className="container-page flex flex-col gap-5 py-6">
              {[
                { label: 'How it works', href: '/how-it-works' },
                { label: 'Features',     href: '/features'     },
                { label: 'Support',      href: '/support'      },
                { label: 'Download',     href: '/download'     },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-base font-medium text-white/80 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/download"
                className="btn-primary text-sm mt-2 self-start"
                onClick={() => setMobileOpen(false)}
              >
                Get the app
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
