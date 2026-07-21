import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { absoluteUrl, canonicalHostFor } from '@/lib/domains';

/** Yoca — host-aware robots.txt (each domain points at its own sitemap). */

export default function robots(): MetadataRoute.Robots {
  const host = canonicalHostFor(headers().get('x-yoca-host') ?? headers().get('host'));

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: absoluteUrl(host, '/sitemap.xml'),
    host: `https://${host}`,
  };
}
