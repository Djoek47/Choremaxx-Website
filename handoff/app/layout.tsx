import type { Metadata } from 'next';

import PaletteProvider from '@/components/theme/PaletteProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'ChoreMaxx',
  description: 'The chore app for families with standards.',
  metadataBase: new URL('https://www.choremaxx.app'),
  openGraph: {
    type: 'website',
    siteName: 'ChoreMaxx',
    title: 'ChoreMaxx — Your house. Your rules. Actually followed.',
    description: 'With ChoreMaxx, hand out the work, track who actually did it, and make it worth doing.',
    images: ['/og.png'],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-palette="coral" data-appearance="day" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,700,800&display=swap" />
      </head>
      <body>
        <PaletteProvider>{children}</PaletteProvider>
      </body>
    </html>
  );
}
