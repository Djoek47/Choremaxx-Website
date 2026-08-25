import type { MetadataRoute } from 'next';

/* Web app manifest — improves mobile install UX and gives search engines an
 * additional canonical signal (name, icons, theme). Next.js serves this at
 * /manifest.webmanifest and auto-injects <link rel="manifest">. Theme/background
 * use the Coral default brand tokens (see app/globals.css). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ChoreMaxx — AI Household Operating System',
    short_name: 'ChoreMaxx',
    description:
      'Run your household together. AI-powered task management, rewards, and family coordination in one calm place.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FAF0EB',
    theme_color: '#D85A30',
    lang: 'en',
    dir: 'ltr',
    categories: ['productivity', 'lifestyle', 'utilities'],
    icons: [
      { src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        src: '/brand/choremaxx-logo-mark.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/brand/icons/icon-coral.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
