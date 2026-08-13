'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',     href: '/features'     },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Pricing',      href: '/#pricing'     },
      { label: 'Updates',      href: '/features'     },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', href: '/support'  },
      { label: 'Blog',     href: '/support'  },
      { label: 'Careers',  href: '/support'  },
      { label: 'Press',    href: '/support'  },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center',           href: '/support'   },
      { label: 'Contact us',            href: '/support'   },
      { label: 'Suggest an idea',       href: '/suggest'   },
      { label: 'Privacy',               href: '/privacy'   },
      { label: 'Terms',                 href: '/terms'     },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/auth') || pathname?.startsWith('/join')) {
    return null;
  }

  return (
    <footer style={{ background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container-page py-16">

        {/* Main grid: brand + 3 link columns + newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2" aria-label="ChoreMaxx home">
              <span className="brand-logo w-7 h-7" role="img" aria-hidden="true" />
              <span className="text-base font-bold" style={{ color: 'var(--color-secondary)' }}>
                chore<span style={{ color: 'var(--color-primary)' }}>maxx</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)', maxWidth: 180 }}>
              AI Household Operating System for a better, happier home.
            </p>
            {/* App store badge */}
            <Link href="/download" className="mt-1 inline-block">
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                style={{
                  background: 'var(--color-text-primary)',
                  display: 'inline-flex',
                  width: 'fit-content',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--color-bg)">
                  <path d="M11.182 9.99c-.02-2.04 1.66-3.02 1.735-3.068-0.944-1.382-2.415-1.572-2.937-1.596-1.25-.127-2.44.737-3.073.737-.633 0-1.61-.718-2.647-.698C2.66 5.39 1.33 6.33.693 7.73-.608 10.574.47 14.806 1.727 17.13c.624 1.145 1.37 2.43 2.354 2.385.942-.038 1.3-.607 2.44-.607 1.14 0 1.46.607 2.45.588.988-.02 1.64-1.16 2.26-2.306a9.96 9.96 0 001.04-2.68c-.022-.01-1.98-.763-2-3.01l-.089-.51z" />
                  <path d="M9.304 3.26C9.8 2.65 10.13 1.8 10.04.93c-.74.077-1.637.494-2.167 1.1-.476.55-.894 1.428-.782 2.27.827.064 1.67-.363 2.213-1.04z" />
                </svg>
                <div>
                  <p style={{ fontSize: '0.6rem', lineHeight: 1, color: 'var(--color-bg)' }}>Download on the</p>
                  <p className="font-semibold" style={{ fontSize: '0.8rem', lineHeight: 1.3, color: 'var(--color-bg)' }}>App Store</p>
                </div>
              </div>
            </Link>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {['twitter', 'youtube', 'instagram', 'tiktok'].map(s => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" opacity="0.25" />
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(({ heading, links }) => (
            <div key={heading} className="md:col-span-1">
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'var(--color-text-secondary)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
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
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Stay in the loop
            </h4>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Get updates and tips for your home.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex items-center gap-2"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 9999,
                padding: '0.375rem 0.375rem 0.375rem 1rem',
              }}
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="flex-1 bg-transparent text-sm outline-none min-w-0"
                style={{ color: 'var(--color-text-primary)' }}
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--color-primary)' }}
                aria-label="Subscribe"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
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
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
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
