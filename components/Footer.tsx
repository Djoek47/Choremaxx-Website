'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-800 via-orange-700 to-amber-700 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-orange-600/20 mix-blend-overlay pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pt-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Image
                src="/brand/choremaxx-logo-mark.png"
                alt="ChoreMaxx"
                width={36}
                height={36}
                className="w-8 h-8 drop-shadow-lg"
              />
              <span className="text-lg font-bold text-white drop-shadow-lg group-hover:drop-shadow-xl transition-all" style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}>
                ChoreMaxx
              </span>
            </Link>
            <p className="text-sm text-amber-50/80 leading-relaxed drop-shadow-md">
              © 2026 ChoreMaxx. All rights reserved.
              <br />
              Made for happier homes.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 drop-shadow-md">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 drop-shadow-md">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/support" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="/kids" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  Kids & parental controls
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@choremaxx.app"
                  className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md"
                >
                  support@choremaxx.app
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-white mb-5 drop-shadow-md">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  Copyright
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-amber-50/80 hover:text-white transition-all duration-300 drop-shadow-md">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-600/40 pt-8 pb-8 text-center">
          <p className="text-xs text-amber-50/70 drop-shadow-md">
            mytikas73.com — Privacy first · Parental controls · Delete your data anytime
          </p>
        </div>
      </div>
    </footer>
  );
}
