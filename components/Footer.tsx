'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-surface-secondary border-t border-divider">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/brand/choremaxx-logo-mark.png"
                alt="ChoreMaxx"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold">
                <span className="text-dark-text">chore</span>
                <span className="text-primary">maxx</span>
              </span>
            </Link>
            <p className="text-sm text-muted">
              © 2026 ChoreMaxx. All rights reserved.
              <br />
              Made for happier homes.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-dark-text mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm hover:text-primary transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-sm hover:text-primary transition-colors">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-dark-text mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="text-sm hover:text-primary transition-colors">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="/kids" className="text-sm hover:text-primary transition-colors">
                  Kids & parental controls
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@choremaxx.app"
                  className="text-sm hover:text-primary transition-colors"
                >
                  support@choremaxx.app
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-dark-text mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="text-sm hover:text-primary transition-colors">
                  Copyright
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-divider pt-8 text-center">
          <p className="text-xs text-muted">
            mytikas73.com — Privacy first · Parental controls · Delete your data anytime
          </p>
        </div>
      </div>
    </footer>
  );
}
