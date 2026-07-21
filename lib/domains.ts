import type { DomainConfig, Locale } from '@/types';

/**
 * Yoca — multi-domain configuration.
 * yoca.net     → global / English (x-default)
 * yoca.tr      → Turkish (canonical Turkish host)
 * yoca.com.tr  → Turkish (308 → yoca.tr to avoid duplicate content)
 * yoca.az      → Azerbaijani
 */
export const DOMAINS: DomainConfig[] = [
  { host: 'yoca.net', locale: 'en', hreflang: 'en' },
  { host: 'yoca.tr', locale: 'tr', hreflang: 'tr-TR' },
  { host: 'yoca.com.tr', locale: 'tr', hreflang: 'tr-TR', canonicalHost: 'yoca.tr' },
  { host: 'yoca.az', locale: 'az', hreflang: 'az-AZ' },
];

export const DEFAULT_DOMAIN =
  process.env.NEXT_PUBLIC_DEFAULT_DOMAIN?.trim() || 'yoca.net';

export const LOCALES: Locale[] = ['en', 'tr', 'az'];

/** Strip port / www and lowercase. */
export function normalizeHost(rawHost: string | null | undefined): string {
  if (!rawHost) return DEFAULT_DOMAIN;
  return rawHost.toLowerCase().split(':')[0].replace(/^www\./, '');
}

export function domainForHost(rawHost: string | null | undefined): DomainConfig {
  const host = normalizeHost(rawHost);
  const found = DOMAINS.find((d) => d.host === host);
  if (found) return found;
  // Vercel previews / localhost fall back to the global domain config
  return DOMAINS[0];
}

export function localeForHost(rawHost: string | null | undefined): Locale {
  return domainForHost(rawHost).locale;
}

/** Canonical serving host for a request host (resolves com.tr → tr). */
export function canonicalHostFor(rawHost: string | null | undefined): string {
  const d = domainForHost(rawHost);
  return d.canonicalHost ?? d.host;
}

/** One canonical host per locale, used for hreflang alternates. */
export function hostForLocale(locale: Locale): string {
  const d = DOMAINS.find((x) => x.locale === locale && !x.canonicalHost);
  return d ? d.host : DEFAULT_DOMAIN;
}

/** Absolute URL on a given host. */
export function absoluteUrl(host: string, path: string = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `https://${host}${p}`;
}
