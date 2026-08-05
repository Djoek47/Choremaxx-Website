'use client';

import Link from 'next/link';
import Image from 'next/image';

const links = {
  Product: [
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Features',     href: '/features'     },
    { label: 'Download',     href: '/download'     },
    { label: 'Nova AI',      href: '/features'     },
  ],
  Support: [
    { label: 'Help center',          href: '/support'  },
    { label: 'Kids & parental',      href: '/kids'     },
    { label: 'support@choremaxx.app', href: 'mailto:support@choremaxx.app' },
  ],
  Legal: [
    { label: 'Privacy',   href: '/privacy'   },
    { label: 'Terms',     href: '/terms'     },
    { label: 'Cookies',   href: '/cookies'   },
    { label: 'Copyright', href: '/copyright' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <div className="container-page py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/brand/choremaxx-logo-mark.png"
                alt="ChoreMaxx"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-white">ChoreMaxx</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-[200px]">
              The AI household operating system for families and roommates.
            </p>
            <div className="flex gap-3 mt-2">
              <span className="chip">iOS</span>
              <span className="chip">Android</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }} className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © 2026 ChoreMaxx · mytikas73.com · Privacy first · Delete your data anytime
          </p>
          <Link href="/download" className="btn-primary text-sm py-2 px-6">
            Get the app
          </Link>
        </div>
      </div>
    </footer>
  );
}
