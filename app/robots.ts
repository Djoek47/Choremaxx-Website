import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth/', '/join/'],
    },
    sitemap: 'https://www.choremaxx.app/sitemap.xml',
  };
}
