import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SITE_URL = 'https://www.choremaxx.app';

/* One of these is picked at random each browsing session (never repeating
 * the palette from the visitor's last visit) and applied via a blocking
 * bootstrap script below, before first paint. Day/night follows
 * prefers-color-scheme. See app/globals.css + lib/palettes.ts. */
const PALETTES = ['sky', 'citrus', 'coral', 'berry'] as const;
const DEFAULT_PALETTE = 'coral';

/* Tab / favicon plates — always the colored icon-{p}.png for palette match. */
const TAB_ICON_DAY = '/brand/icons/icon-coral.png';

export const metadata: Metadata = {
  title: 'ChoreMaxx — AI Household Operating System',
  description: 'Run your household together. AI-powered task management, rewards, and family coordination in one calm place.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: TAB_ICON_DAY, type: 'image/png' }],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'ChoreMaxx — AI Household Operating System',
    description: 'Run your household together. AI-powered task management, rewards, and family coordination in one calm place.',
    url: SITE_URL,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: 'ChoreMaxx',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChoreMaxx — AI Household Operating System',
    description: 'Run your household together.',
    images: [`${SITE_URL}/og.png`],
  },
  robots: 'index, follow',
};

/* Picks a session palette + system appearance before first paint so the
 * header/footer logo mark, wordmark, and browser tab icon never flash the
 * wrong colors. New tab/session → new random palette (excluding last visit).
 * Appearance follows prefers-color-scheme and updates live when the OS theme flips.
 * Tab favicon always uses the colored plate icon-{palette}.png (color match only —
 * not day/night). */
const PALETTE_BOOTSTRAP_SCRIPT = `(function(){
  var palettes = ${JSON.stringify(PALETTES)};
  var primaries = { sky: '#378ADD', citrus: '#EF9F27', coral: '#D85A30', berry: '#7F77DD' };
  var nightTints = { sky: '#07121F', citrus: '#1A1208', coral: '#1A0C08', berry: '#100A1C' };
  var root = document.documentElement;
  function currentPalette() {
    var p = root.getAttribute('data-palette');
    return (p && palettes.indexOf(p) !== -1) ? p : '${DEFAULT_PALETTE}';
  }
  function setFavicon(href) {
    var links = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
    if (!links.length) {
      var link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = href;
      document.head.appendChild(link);
      return;
    }
    for (var i = 0; i < links.length; i++) {
      links[i].type = 'image/png';
      links[i].href = href;
    }
  }
  function setThemeColor(color, media) {
    var selector = media
      ? 'meta[name="theme-color"][media="' + media + '"]'
      : 'meta[name="theme-color"]:not([media])';
    var meta = document.querySelector(selector);
    if (!meta && !media) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    if (meta) meta.setAttribute('content', color);
  }
  function applyBrandChrome() {
    var night = false;
    try {
      night = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {}
    var appearance = night ? 'night' : 'day';
    var palette = currentPalette();
    root.setAttribute('data-appearance', appearance);
    root.style.colorScheme = night ? 'dark' : 'light';
    /* Always the colored tab plate — berry→purple, sky→blue, etc. Day/night ignored. */
    setFavicon('/brand/icons/icon-' + palette + '.png');
    var primary = primaries[palette] || primaries.coral;
    var nightBg = nightTints[palette] || nightTints.coral;
    setThemeColor(primary, '(prefers-color-scheme: light)');
    setThemeColor(nightBg, '(prefers-color-scheme: dark)');
    setThemeColor(night ? nightBg : primary);
  }
  try {
    var current = sessionStorage.getItem('cm-palette');
    if (!current || palettes.indexOf(current) === -1) {
      var last = localStorage.getItem('cm-last-palette');
      var choices = palettes.filter(function (p) { return p !== last; });
      if (choices.length === 0) choices = palettes;
      current = choices[Math.floor(Math.random() * choices.length)];
      sessionStorage.setItem('cm-palette', current);
      localStorage.setItem('cm-last-palette', current);
    }
    root.setAttribute('data-palette', current);
  } catch (e) {
    root.setAttribute('data-palette', '${DEFAULT_PALETTE}');
  }
  applyBrandChrome();
  try {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) {
      mq.addEventListener('change', applyBrandChrome);
    } else if (mq.addListener) {
      mq.addListener(applyBrandChrome);
    }
  } catch (e) {}
})();`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#D85A30' },
    { media: '(prefers-color-scheme: dark)', color: '#1A0C08' },
  ],
  userScalable: true,
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-palette={DEFAULT_PALETTE}
      data-appearance="day"
      style={{ background: 'var(--color-bg)' }}
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" type="image/png" href={TAB_ICON_DAY} />
        <meta name="theme-color" content="#D85A30" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1A0C08" media="(prefers-color-scheme: dark)" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: PALETTE_BOOTSTRAP_SCRIPT }} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ChoreMaxx',
            url: SITE_URL,
            logo: `${SITE_URL}/brand/choremaxx-logo-mark.png`,
            email: 'support@choremaxx.app',
            description: 'AI Household Operating System',
          })}
        </script>
      </head>
      <body className="antialiased" style={{ background: 'var(--color-bg)', color: 'var(--color-text-primary)' }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
