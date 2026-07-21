import type { Locale } from '@/types';

/**
 * Yoca — locale & host configuration (path-based i18n).
 *
 * Every language lives under a path prefix on the same host:
 *   /en/… (x-default) · /tr/… · /az/… · /ar/… (RTL)
 * When the production domains are connected they all serve the same app;
 * the path prefix keeps working identically on each of them.
 */

export const LOCALES: Locale[] = ['en', 'tr', 'az', 'ar'];

export const DEFAULT_LOCALE: Locale = 'en';

export const HREFLANG: Record<Locale, string> = {
  en: 'en',
  tr: 'tr-TR',
  az: 'az-AZ',
  ar: 'ar',
};

export const RTL_LOCALES: Locale[] = ['ar'];

export const DEFAULT_DOMAIN =
  process.env.NEXT_PUBLIC_DEFAULT_DOMAIN?.trim() || 'yoca.net';

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

/** Strip port / www and lowercase. */
export function normalizeHost(rawHost: string | null | undefined): string {
  if (!rawHost) return DEFAULT_DOMAIN;
  return rawHost.toLowerCase().split(':')[0].replace(/^www\./, '');
}

/** Kept for compatibility: the serving host (no per-locale hosts anymore). */
export function canonicalHostFor(rawHost: string | null | undefined): string {
  return normalizeHost(rawHost);
}

/** The locale's base path prefix, e.g. "/tr". */
export function basePathFor(locale: Locale): string {
  return `/${locale}`;
}

/** Prefix an app path with a locale: localizePath('tr', '/work') → '/tr/work'. */
export function localizePath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p === '/' ? `/${locale}` : `/${locale}${p}`;
}

/** Absolute URL on a given host. */
export function absoluteUrl(host: string, path: string = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `https://${host}${p}`;
}

/** Absolute localized URL: https://host/tr/work */
export function absoluteLocalizedUrl(host: string, locale: Locale, path: string): string {
  return absoluteUrl(host, localizePath(locale, path));
}
