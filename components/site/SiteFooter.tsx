'use client';

import Link from 'next/link';

import { usePalette } from '@/components/theme/PaletteProvider';

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '/features', label: 'Features' },
      { href: '/how-it-works', label: 'How it works' },
      { href: '/#pricing', label: 'Pricing' },
      { href: '/download', label: 'Download' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/kids', label: 'Kids & safety' },
      { href: '/support', label: 'Support' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
      { href: '/copyright', label: 'Copyright' },
      { href: '/cookies', label: 'Cookies' },
    ],
  },
];

export default function SiteFooter() {
  const { logo } = usePalette();

  return (
    <footer
      style={{
        padding: 'clamp(48px, 10vw, 72px) var(--cm-page-x) calc(34px + var(--cm-footer-bottom))',
        background: 'var(--bg)', borderTop: '1px solid var(--bd)',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: 44, marginBottom: 52 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="" width={28} height={28} style={{ display: 'block' }} />
              <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--sec)' }}>
                chore<span style={{ color: 'var(--p)' }}>maxx</span>
              </span>
            </span>
            <p style={{ margin: 0, maxWidth: 210, fontSize: 13.5, lineHeight: 1.6, color: 'var(--txm)' }}>
              Poppins keeps the whole house in step.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              <p style={{ margin: '0 0 3px', fontSize: 11, fontWeight: 650, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--txm)' }}>
                {col.title}
              </p>
              {col.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="cm-footer-link"
                  style={{ fontSize: 13.5, color: 'var(--txs)', padding: '8px 0', display: 'inline-block', minHeight: 44, lineHeight: '28px' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 26, borderTop: '1px solid var(--bd)' }}>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--txm)' }}>&copy; 2026 ChoreMaxx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
