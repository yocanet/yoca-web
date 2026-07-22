/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { fetchMenu } from '@/lib/supabase';
import { getRequestContext } from '@/lib/seo';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from '@/components/ui/MobileMenu';
import type { Dict } from '@/lib/i18n';
import type { MenuItem } from '@/types';

/**
 * Yoca — site header (Server Component).
 *
 * Navigation architecture (desktop):
 *   [Logo = Home]  About · Services · Work · Products   [■ Digital Check-Up] [EN/TR/AZ/AR] [Start a Project]
 * - Home and Contact are NOT nav items (logo = home; Start a Project → contact).
 * - Digital Check-Up is a bordered utility action with a lime square icon —
 *   it never competes with the solid-lime primary CTA.
 * - Breakpoints: ≥1440 full · 1180–1439 compressed (nowrap, tighter gaps)
 *   · ≤1179 overlay menu.
 * - Active page: 2px lime underline under the current nav link.
 */

interface SiteHeaderProps {
  t: Dict;
  /** Current logical path (no locale prefix). */
  path?: string;
}

/** Map known internal routes to their localized nav labels. */
function localizedTitle(url: string, fallback: string, t: Dict): string {
  const map: Record<string, string> = {
    '/': t.nav.home,
    '/about': t.nav.about,
    '/services': t.nav.services,
    '/work': t.nav.work,
    '/products': t.nav.products,
    '/checkup': t.nav.checkup,
    '/contact': t.nav.contact,
  };
  return map[url] ?? fallback;
}

/** Routes that live in the utility group / logo, never in the main nav. */
const NON_NAV_URLS = new Set(['/', '/checkup', '/contact']);

export default async function SiteHeader({ t, path = '/' }: SiteHeaderProps) {
  const ctx = getRequestContext();
  const base = ctx.base;
  const withBase = (url: string) => (url === '/' ? base : `${base}${url}`);

  const rows = await fetchMenu('header');
  const rawItems: Array<MenuItem & { logical?: string }> = rows
    ? rows
        .filter((row) => !NON_NAV_URLS.has(row.url))
        .map((row) => ({
          title: localizedTitle(row.url, row.title, t),
          url: row.url,
          external: /^(https?:|mailto:)/.test(row.url),
        }))
    : [
        { title: t.nav.about, url: '/about' },
        { title: t.nav.services, url: '/services' },
        { title: t.nav.work, url: '/work' },
        { title: t.nav.products, url: '/products' },
      ];
  const items = rawItems.map((item) =>
    item.external ? item : { ...item, logical: item.url, url: withBase(item.url) },
  );

  const isActive = (logical?: string) =>
    !!logical && (logical === path || (logical !== '/' && path.startsWith(logical)));

  // Overlay menu still lists every page (incl. Check-Up + Contact).
  const overlayItems: MenuItem[] = [
    ...items,
    { title: t.nav.checkup, url: `${base}/checkup` },
    { title: t.nav.contact, url: `${base}/contact` },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-line/60 bg-[rgba(5,5,5,0.82)] backdrop-blur-xl">
      <div className="container-y flex h-[72px] items-center justify-between gap-4 min-[1440px]:gap-8">
        <Link href={base} aria-label="Yoca — Home" className="flex-none">
          <img
            src="/brand/yoca-logo-primary.svg"
            alt="Yoca"
            width={148}
            height={37}
            className="h-9 w-auto max-sm:h-7"
          />
        </Link>

        {/* Main nav — desktop only (≥1180px), never wraps */}
        <nav aria-label="Main" className="hidden min-[1180px]:block">
          <ul className="flex items-center gap-0.5 whitespace-nowrap min-[1440px]:gap-1.5">
            {items.map((item) => (
              <li key={item.url + item.title}>
                {item.external ? (
                  <a
                    href={item.url}
                    className="inline-block whitespace-nowrap rounded-sm px-3 py-2 text-[14px] font-semibold text-muted transition-colors hover:text-white min-[1440px]:px-4"
                    {...(item.url.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link
                    href={item.url}
                    aria-current={isActive(item.logical) ? 'page' : undefined}
                    className={`relative inline-block whitespace-nowrap rounded-sm px-3 py-2 text-[14px] font-semibold transition-colors min-[1440px]:px-4 ${
                      isActive(item.logical) ? 'text-white' : 'text-muted hover:text-white'
                    }`}
                  >
                    {item.title}
                    {isActive(item.logical) && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0 h-[2px] bg-yoca-lime min-[1440px]:inset-x-4"
                      />
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Utility action group */}
        <div className="flex items-center gap-2.5 min-[1440px]:gap-4">
          <Link
            href={`${base}/checkup`}
            className="hidden items-center gap-2 whitespace-nowrap rounded-sm border border-line bg-white/[0.02] px-3.5 py-2 text-[13px] font-bold text-soft transition-colors hover:border-yoca-lime/60 hover:text-yoca-lime min-[1180px]:inline-flex"
          >
            <span aria-hidden="true" className="block h-2 w-2 flex-none bg-yoca-lime" />
            {t.nav.checkup}
          </Link>
          <div className="hidden min-[1180px]:block">
            <LanguageSwitcher
              current={ctx.locale}
              path={path}
              ariaLabel={t.common.languageSwitcher}
            />
          </div>
          <Link
            href={`${base}/contact`}
            className="btn-primary hidden whitespace-nowrap !px-5 min-[1180px]:inline-flex min-[1440px]:!px-7"
          >
            {t.hero.primaryCta}
          </Link>
          <div className="min-[1180px]:hidden">
            <MobileMenu
              items={overlayItems}
              cta={{ title: t.hero.primaryCta, url: `${base}/contact` }}
              locale={ctx.locale}
              path={path}
              languageLabel={t.common.languageSwitcher}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
