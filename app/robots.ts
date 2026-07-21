import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { absoluteUrl, canonicalHostFor } from '@/lib/domains';

/** Yoca — host-aware robots.txt (each domain points at its own sitemap). */

export default function robots(): MetadataRoute.Robots {
  const host = canonicalHostFor(headers().get('host'));

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin'],
      },
    ],
    sitemap: absoluteUrl(host, '/sitemap.xml'),
    host: `https://${host}`,
  };
}
