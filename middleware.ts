import { NextRequest, NextResponse } from 'next/server';
import { domainForHost, normalizeHost } from '@/lib/domains';

/**
 * Yoca — edge middleware for multi-domain locale mapping.
 *
 * - Detects the incoming `host` header and resolves the locale
 *   (yoca.net → en, yoca.tr / yoca.com.tr → tr, yoca.az → az).
 * - 308-redirects non-canonical hosts (www.*, yoca.com.tr) to their
 *   canonical domain so each language lives on exactly one host.
 * - Forwards the resolved locale + host to the app via request headers,
 *   which server components and metadata builders read.
 */

export const config = {
  // Run on every route except static assets and Next internals.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|brand/|clients/|favicons/).*)'],
};

export function middleware(request: NextRequest) {
  const rawHost = request.headers.get('host');
  const host = normalizeHost(rawHost);
  const domain = domainForHost(rawHost);

  // 1) www → apex on any known domain
  const hadWww = (rawHost ?? '').toLowerCase().startsWith('www.');

  // 2) Non-canonical domains (yoca.com.tr) → canonical host (yoca.tr)
  const targetHost = domain.canonicalHost ?? host;
  const knownHost = ['yoca.net', 'yoca.tr', 'yoca.com.tr', 'yoca.az'].includes(host);

  if (knownHost && (hadWww || domain.canonicalHost)) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = targetHost;
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  // 3) Forward locale + host context to the application layer
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-yoca-locale', domain.locale);
  requestHeaders.set('x-yoca-host', targetHost);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('x-yoca-locale', domain.locale);
  // Content varies by Host; keep shared caches honest.
  response.headers.set('Vary', 'Host');
  return response;
}
