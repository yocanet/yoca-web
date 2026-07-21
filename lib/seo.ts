import type { Metadata } from 'next';
import { headers } from 'next/headers';
import type { Locale } from '@/types';
import {
  absoluteUrl,
  canonicalHostFor,
  hostForLocale,
  LOCALES,
} from '@/lib/domains';

/** Yoca — SEO helpers: request context, metadata + hreflang, JSON-LD builders. */

export interface RequestSeoContext {
  locale: Locale;
  host: string;
}

/** Read the locale/host that the middleware attached to the request. */
export function getRequestContext(): RequestSeoContext {
  const h = headers();
  const locale = (h.get('x-yoca-locale') as Locale) || 'en';
  const host = canonicalHostFor(h.get('x-yoca-host') ?? h.get('host'));
  return { locale, host };
}

const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  az: 'az_AZ',
};

/**
 * Build page metadata with exact cross-domain canonical + hreflang alternates:
 *   en    → https://yoca.net{path}
 *   tr-TR → https://yoca.tr{path}
 *   az-AZ → https://yoca.az{path}
 *   x-default → https://yoca.net{path}
 */
export function buildMetadata(opts: {
  ctx: RequestSeoContext;
  path: string;
  title: string;
  description: string;
  ogImagePath?: string;
}): Metadata {
  const { ctx, path, title, description } = opts;
  const canonical = absoluteUrl(ctx.host, path);
  const ogImage = absoluteUrl(ctx.host, opts.ogImagePath ?? '/brand/og-default.png');

  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    const hreflang = locale === 'en' ? 'en' : locale === 'tr' ? 'tr-TR' : 'az-AZ';
    languages[hreflang] = absoluteUrl(hostForLocale(locale), path);
  }
  languages['x-default'] = absoluteUrl(hostForLocale('en'), path);

  return {
    metadataBase: new URL(`https://${ctx.host}`),
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: 'website',
      siteName: 'Yoca',
      title,
      description,
      url: canonical,
      locale: OG_LOCALES[ctx.locale],
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Yoca — Your Own Creative Agency' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/favicons/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicons/favicon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: '/favicons/apple-touch-icon.png',
    },
  };
}

// ── JSON-LD builders ───────────────────────────────────────────────
type JsonLd = Record<string, unknown>;

export function organizationSchema(host: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Yoca',
    alternateName: 'Your Own Creative Agency',
    url: absoluteUrl(host, '/'),
    logo: absoluteUrl(host, '/brand/yoca-logo-primary.svg'),
    email: 'connect@yoca.net',
    sameAs: ['https://instagram.com/thisisyoca'],
  };
}

export function professionalServiceSchema(host: string, locale: Locale): JsonLd {
  const descriptions: Record<Locale, string> = {
    en: 'Brand strategy, web experiences, growth systems, creative production, AI automation and digital product development.',
    tr: 'Marka stratejisi, web deneyimleri, büyüme sistemleri, yaratıcı üretim, yapay zekâ otomasyonu ve dijital ürün geliştirme.',
    az: 'Brend strategiyası, veb təcrübələri, inkişaf sistemləri, kreativ istehsal, süni intellekt avtomatlaşdırması və rəqəmsal məhsul inkişafı.',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Yoca',
    description: descriptions[locale],
    url: absoluteUrl(host, '/'),
    areaServed: ['TR', 'AZ', 'AE', 'GB', 'EU'],
    priceRange: '$$',
    parentOrganization: { '@type': 'Organization', name: 'Yoca' },
  };
}

export function caseStudySchema(
  host: string,
  work: { name: string; description: string; path: string; year?: string },
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    additionalType: 'CaseStudy',
    name: work.name,
    description: work.description,
    url: absoluteUrl(host, work.path),
    dateCreated: work.year,
    creator: { '@type': 'Organization', name: 'Yoca' },
  };
}

export function breadcrumbSchema(
  host: string,
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(host, item.path),
    })),
  };
}

/** Serialize a schema for a <script type="application/ld+json"> tag. */
export function jsonLdString(schema: JsonLd): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
