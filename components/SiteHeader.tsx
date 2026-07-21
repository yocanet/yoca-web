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
 * Navigation comes from the Supabase `menus` table (location = header);
 * known routes are re-labelled in the visitor's language, and every internal
 * link is prefixed with the locale base path (/en, /tr, /az, /ar).
 * CTA hierarchy: "Start a Project" = primary (solid lime → /contact).
 */

interface SiteHeaderProps {
  t: Dict;
  /** Current logical path (no locale prefix) for the language switcher. */
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

export default async function SiteHeader({ t, path = '/' }: SiteHeaderProps) {
  const ctx = getRequestContext();
  const base = ctx.base;
  const withBase = (url: string) => (url === '/' ? base : `${base}${url}`);

  const rows = await fetchMenu('header');
  const rawItems: MenuItem[] = rows
    ? rows.map((row) => ({
        title: localizedTitle(row.url, row.title, t),
        url: row.url,
        external: /^(https?:|mailto:)/.test(row.url),
      }))
    : [
        { title: t.nav.home, url: '/' },
        { title: t.nav.about, url: '/about' },
        { title: t.nav.services, url: '/services' },
        { title: t.nav.work, url: '/work' },
        { title: t.nav.products, url: '/products' },
        { title: t.nav.checkup, url: '/checkup' },
        { title: t.nav.contact, url: '/contact' },
      ];
  const items: MenuItem[] = rawItems.map((item) =>
    item.external ? item : { ...item, url: withBase(item.url) },
  );

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-line/60 bg-surface-deep/85 backdrop-blur-xl">
      <div className="container-y flex h-[72px] items-center justify-between gap-6">
        <Link href={base} aria-label="Yoca — Home" className="flex-none">
          <img
            src="/brand/yoca-logo-primary.svg"
            alt="Yoca"
            width={148}
            height={37}
            className="h-9 w-auto max-sm:h-7"
          />
        </Link>

        <nav aria-label="Main" className="max-lg:hidden">
          <ul className="flex items-center gap-0.5">
            {items.map((item) =>
              item.external ? (
                <li key={item.url + item.title}>
                  <a
                    href={item.url}
                    className="inline-block rounded-sm px-3 py-2 text-[14px] font-semibold text-muted transition-colors hover:text-white"
                    {...(item.url.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.title}
                  </a>
                </li>
              ) : (
                <li key={item.url + item.title}>
                  <Link
                    href={item.url}
                    className="inline-block rounded-sm px-3 py-2 text-[14px] font-semibold text-muted transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="max-sm:hidden">
            <LanguageSwitcher
              current={ctx.locale}
              path={path}
              ariaLabel={t.common.languageSwitcher}
            />
          </div>
          <Link href={`${base}/contact`} className="btn-primary max-lg:hidden">
            {t.hero.primaryCta}
          </Link>
          <MobileMenu
            items={items}
            cta={{ title: t.hero.primaryCta, url: `${base}/contact` }}
            locale={ctx.locale}
            path={path}
            languageLabel={t.common.languageSwitcher}
          />
        </div>
      </div>
    </header>
  );
}
