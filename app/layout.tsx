import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'ChoreMaxx — AI Household Operating System',
  description: 'Run your household together. AI-powered task management, rewards, and family coordination in one calm place.',
  icons: {
    icon: '/brand/choremaxx-logo-mark.png',
  },
  openGraph: {
    title: 'ChoreMaxx — AI Household Operating System',
    description: 'Run your household together. AI-powered task management, rewards, and family coordination in one calm place.',
    url: 'https://mytikas73.com',
    type: 'website',
    images: [
      {
        url: 'https://mytikas73.com/og.png',
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
    images: ['https://mytikas73.com/og.png'],
  },
  robots: 'index, follow',
  canonical: 'https://mytikas73.com',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D85A30',
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://mytikas73.com" />
        <meta name="theme-color" content="#D85A30" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ChoreMaxx',
            url: 'https://mytikas73.com',
            logo: 'https://mytikas73.com/brand/choremaxx-logo-mark.png',
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
