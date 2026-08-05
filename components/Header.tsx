'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
      <nav className="section-container flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/brand/choremaxx-logo-mark.png"
            alt="ChoreMaxx"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-dark-text to-primary bg-clip-text text-transparent">
            ChoreMaxx
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <Link
            href="/how-it-works"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/support"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Support
          </Link>
          <Link
            href="/download"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Download
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/privacy" className="btn-text text-xs">
            Privacy
          </Link>
          <Link href="/download" className="btn-primary text-sm">
            Get the app
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
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
          <div className="absolute top-full left-0 right-0 bg-surface border-b border-divider md:hidden">
            <div className="section-container flex flex-col gap-4 py-4">
              <Link href="/how-it-works" className="text-sm font-medium">
                How it works
              </Link>
              <Link href="/features" className="text-sm font-medium">
                Features
              </Link>
              <Link href="/support" className="text-sm font-medium">
                Support
              </Link>
              <Link href="/download" className="text-sm font-medium">
                Download
              </Link>
              <Link href="/privacy" className="text-xs text-muted">
                Privacy
              </Link>
              <Link href="/download" className="btn-primary text-sm w-full">
                Get the app
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
