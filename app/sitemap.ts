import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { absoluteUrl, canonicalHostFor, hostForLocale, LOCALES } from '@/lib/domains';
import { getAllSlugs } from '@/lib/work';

/**
 * Yoca — host-aware dynamic sitemap.
 * Each domain serves its own sitemap with cross-domain hreflang alternates,
 * so yoca.net/sitemap.xml, yoca.tr/sitemap.xml and yoca.az/sitemap.xml all
 * stay consistent from one source of truth.
 */

const PATHS: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/work', priority: 0.9, changeFrequency: 'weekly' },
  ...getAllSlugs().map((slug) => ({
    path: `/work/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
  { path: '/checkup', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const host = canonicalHostFor(headers().get('x-yoca-host') ?? headers().get('host'));
  const lastModified = new Date();

  return PATHS.map(({ path, priority, changeFrequency }) => {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      const hreflang = locale === 'en' ? 'en' : locale === 'tr' ? 'tr-TR' : 'az-AZ';
      languages[hreflang] = absoluteUrl(hostForLocale(locale), path);
    }
    languages['x-default'] = absoluteUrl(hostForLocale('en'), path);

    return {
      url: absoluteUrl(host, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    };
  });
}
