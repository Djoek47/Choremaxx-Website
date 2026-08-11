import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SITE_URL = 'https://www.choremaxx.app';

/* One of these is picked at random each browsing session (never repeating
 * the palette from the visitor's last visit) and applied via a blocking
 * bootstrap script below, before first paint. See app/globals.css for the
 * color tokens each palette maps to, and lib/palettes.ts for reference. */
const PALETTES = ['sky', 'citrus', 'coral', 'berry'] as const;

export const metadata: Metadata = {
  title: 'ChoreMaxx — AI Household Operating System',
  description: 'Run your household together. AI-powered task management, rewards, and family coordination in one calm place.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/brand/choremaxx-logo-mark.png',
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

/* Picks a session palette on the client before first paint, so the header/
 * footer logo mark and wordmark never flash the wrong colors. New tab or
 * browser session → new random palette, excluding whichever one was shown
 * on the visitor's previous visit (tracked in localStorage). Returning to a
 * page within the same session reuses that session's palette. */
const PALETTE_BOOTSTRAP_SCRIPT = `(function(){
  var palettes = ${JSON.stringify(PALETTES)};
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
    document.documentElement.setAttribute('data-palette', current);
  } catch (e) {
    document.documentElement.setAttribute('data-palette', 'sky');
  }
})();`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#5B8CFF',
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" style={{ background: '#F6F5FA' }}>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <meta name="theme-color" content="#5B8CFF" />
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
      <body className="antialiased bg-background text-foreground">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
