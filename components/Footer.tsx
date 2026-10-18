'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AppStoreBadge, Logo, Moji } from '@/components/Brand';

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',     href: '/features'     },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Pricing',      href: '/#pricing'     },
      { label: 'Download',     href: '/download'     },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',   href: '/about'   },
      { label: 'Support', href: '/support' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Help Center', href: '/support' },
      { label: 'Privacy',     href: '/privacy' },
      { label: 'Terms',       href: '/terms'   },
      { label: 'Cookies',     href: '/cookies' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/auth') || pathname?.startsWith('/join')) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="container-page py-16">

        {/* Main grid: brand + 3 link columns + newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Logo size={30} text="text-lg" />
            <p className="text-sm leading-relaxed footer-mute" style={{ maxWidth: 180 }}>
              The chore app for families with standards.
            </p>
            <div className="mt-1"><AppStoreBadge /></div>
          </div>

          {/* Link columns */}
          {columns.map(({ heading, links }) => (
            <div key={heading} className="md:col-span-1">
              <h4 className="text-sm font-bold mb-5 footer-mute">
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="footer-link text-sm transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter column */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-bold mb-5 footer-mute">
              Stay in the loop
            </h4>
            <p className="text-sm mb-4 footer-body">
              Get updates and tips for your home.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              className="footer-newsletter flex items-center gap-2"
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="flex-1 bg-transparent text-sm outline-none min-w-0"
              />
              <button
                type="submit"
                className="footer-newsletter-go w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                aria-label="Subscribe"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Moji parade */}
        <div aria-hidden className="flex items-end justify-center gap-3 sm:gap-5 mb-8 flex-wrap">
          {['broom','basket','pan','plant','paw','bed','shirt','cart','trophy','star','gift','sparkles'].map((m, i) => (
            <span key={m} className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:rotate-6" style={{ transform: `rotate(${(i % 3 - 1) * 6}deg)` }}>
              <Moji name={m} size={30} />
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs footer-mute">
            © 2026 ChoreMaxx. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms',   href: '/terms'   },
              { label: 'Cookies', href: '/cookies' },
            ].map(({ label, href }) => (
              <Link key={label} href={href} className="footer-link text-xs transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
