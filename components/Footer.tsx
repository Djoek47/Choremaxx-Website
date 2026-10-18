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
      { label: 'Help Center', href: '/support'   },
      { label: 'Privacy',     href: '/privacy'   },
      { label: 'Terms',       href: '/terms'     },
      { label: 'Cookies',     href: '/cookies'   },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/auth') || pathname?.startsWith('/join')) {
    return null;
  }

  return (
    <footer style={{ background: '#F6E9DF', borderTop: '1px solid rgba(200,160,135,0.25)' }}>
      <div className="container-page py-16">

        {/* Main grid: brand + 3 link columns + newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Logo size={30} text="text-lg" />
            <p className="text-sm leading-relaxed" style={{ color: '#8F7A6C', maxWidth: 180 }}>
              AI Household Operating System for a better, happier home.
            </p>
            {/* App store badge */}
            <div className="mt-1"><AppStoreBadge /></div>
          </div>

          {/* Link columns */}
          {columns.map(({ heading, links }) => (
            <div key={heading} className="md:col-span-1">
              <h4
                className="text-sm font-bold mb-5"
                style={{ color: '#8F7A6C' }}
              >
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: '#5A4438' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#D85A30')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#5A4438')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter column */}
          <div className="md:col-span-1">
            <h4
              className="text-sm font-bold mb-5"
              style={{ color: '#8F7A6C' }}
            >
              Stay in the loop
            </h4>
            <p className="text-sm mb-4" style={{ color: '#5A4438' }}>
              Get updates and tips for your home.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex items-center gap-2"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(200,160,135,0.45)',
                borderRadius: 9999,
                padding: '0.375rem 0.375rem 0.375rem 1rem',
              }}
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="flex-1 bg-transparent text-sm outline-none min-w-0"
                style={{ color: '#2A1A12' }}
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#D85A30' }}
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
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(200,160,135,0.30)' }}
        >
          <p className="text-xs" style={{ color: '#8F7A6C' }}>
            © 2025 ChoreMaxx. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'Terms',   href: '/terms'   },
              { label: 'Cookies', href: '/cookies' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs transition-colors"
                style={{ color: '#8F7A6C' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D85A30')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8F7A6C')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
