/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { fetchMenu } from '@/lib/supabase';
import type { Dict } from '@/lib/i18n';
import type { MenuItem } from '@/types';

/** Yoca — site footer (Server Component) with Supabase-driven links. */

interface SiteFooterProps {
  t: Dict;
}

export default async function SiteFooter({ t }: SiteFooterProps) {
  const rows = await fetchMenu('footer');
  const items: MenuItem[] = rows
    ? rows.map((row) => ({
        title: row.title,
        url: row.url,
        external: /^(https?:|mailto:)/.test(row.url),
      }))
    : [
        { title: t.nav.work, url: '/work' },
        { title: t.nav.checkup, url: '/checkup' },
        { title: t.nav.contact, url: '/contact' },
        { title: 'Instagram', url: 'https://instagram.com/thisisyoca', external: true },
        { title: 'connect@yoca.net', url: 'mailto:connect@yoca.net', external: true },
      ];

  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[7] border-t border-line bg-surface-deep pb-8 pt-16 lg:pt-24">
      <div className="container-y">
        <div className="grid gap-12 border-b border-line pb-12 md:grid-cols-[5fr_4fr] lg:gap-20">
          <div>
            <p className="max-w-md text-2xl font-extrabold leading-snug tracking-tight lg:text-3xl">
              {t.footer.message}
            </p>
            <Link href="/checkup" className="btn-primary mt-7">
              {t.cta.button}
            </Link>
          </div>
          <nav aria-label="Footer" className="md:justify-self-end">
            <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
              {t.footer.connect}
            </h2>
            <ul className="grid gap-2.5">
              {items.map((item) => (
                <li key={item.url + item.title}>
                  {item.external ? (
                    <a
                      href={item.url}
                      className="text-[14px] text-muted transition-colors hover:text-yoca-lime"
                      {...(item.url.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      href={item.url}
                      className="text-[14px] text-muted transition-colors hover:text-yoca-lime"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 pt-7 text-[13px] text-subtle">
          <img
            src="/brand/yoca-logo-mono-white.svg"
            alt=""
            aria-hidden="true"
            width={96}
            height={24}
            loading="lazy"
            className="h-6 w-auto opacity-80"
          />
          <p>
            © {year} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
