'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 shadow-lg relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-amber-900/30 mix-blend-overlay pointer-events-none" />
      
      <nav className="section-container flex items-center justify-between gap-8 relative z-10">
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="relative">
            <Image
              src="/brand/choremaxx-logo-mark.png"
              alt="ChoreMaxx"
              width={36}
              height={36}
              className="w-9 h-9 drop-shadow-lg"
            />
          </div>
          <span className="text-2xl font-bold text-white drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300" style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 -1px 0 rgba(255,255,255,0.2)'
          }}>
            ChoreMaxx
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <Link
            href="/how-it-works"
            className="text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 drop-shadow-md"
          >
            How it works
          </Link>
          <Link
            href="/features"
            className="text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 drop-shadow-md"
          >
            Features
          </Link>
          <Link
            href="/support"
            className="text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 drop-shadow-md"
          >
            Support
          </Link>
          <Link
            href="/download"
            className="text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 drop-shadow-md"
          >
            Download
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/privacy" className="text-xs font-medium text-white/80 hover:text-white transition-all drop-shadow-md">
            Privacy
          </Link>
          <Link href="/download" className="px-6 py-2 bg-white text-amber-700 font-bold rounded-full hover:shadow-xl transition-all duration-300 drop-shadow-lg">
            Get the app
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white drop-shadow-md relative z-20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gradient-to-b from-orange-600 to-amber-700 border-b border-amber-800/50 md:hidden shadow-xl">
            <div className="section-container flex flex-col gap-4 py-6">
              <Link href="/how-it-works" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">
                How it works
              </Link>
              <Link href="/features" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/support" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">
                Support
              </Link>
              <Link href="/download" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">
                Download
              </Link>
              <Link href="/privacy" className="text-xs text-white/70 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/download" className="px-6 py-2 bg-white text-amber-700 font-bold rounded-full hover:shadow-lg transition-all w-full text-center">
                Get the app
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
