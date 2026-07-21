import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import {
  absoluteLocalizedUrl,
  canonicalHostFor,
  DEFAULT_LOCALE,
  HREFLANG,
  LOCALES,
} from '@/lib/domains';
import { getAllSlugs } from '@/lib/work';

/**
 * Yoca — sitemap for path-based i18n.
 * Every logical page is listed once per locale (/en, /tr, /az, /ar) with
 * full cross-locale hreflang alternates.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = canonicalHostFor(headers().get('host'));
  const lastModified = new Date();
  const slugs = await getAllSlugs();

  const PATHS: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }> = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/work', priority: 0.9, changeFrequency: 'weekly' },
    ...slugs.map((slug) => ({
      path: `/work/${slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
    { path: '/products', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/checkup', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { path, priority, changeFrequency } of PATHS) {
    const languages: Record<string, string> = {};
    for (const locale of LOCALES) {
      languages[HREFLANG[locale]] = absoluteLocalizedUrl(host, locale, path);
    }
    languages['x-default'] = absoluteLocalizedUrl(host, DEFAULT_LOCALE, path);

    for (const locale of LOCALES) {
      entries.push({
        url: absoluteLocalizedUrl(host, locale, path),
        lastModified,
        changeFrequency,
        priority: locale === DEFAULT_LOCALE ? priority : Math.max(0.1, priority - 0.1),
        alternates: { languages },
      });
    }
  }
  return entries;
}
