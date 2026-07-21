/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { fetchMenu } from '@/lib/supabase';
import { getRequestContext } from '@/lib/seo';
import type { Dict } from '@/lib/i18n';

/**
 * Yoca — site footer.
 * Giant closing hook ("Ready to Engineer Your Growth?") with a full-width
 * Electric Lime CTA, followed by a 4-column system breakdown
 * (Systems · Company · Products · Connect) and the oversized wordmark.
 */

interface SiteFooterProps {
  t: Dict;
}

export default async function SiteFooter({ t }: SiteFooterProps) {
  const ctx = getRequestContext();
  const base = ctx.base;
  const withBase = (url: string) => (url === '/' ? base : `${base}${url}`);

  const rows = await fetchMenu('footer');
  const year = new Date().getFullYear();

  const systemsCol = [
    { title: t.systems.items[0]?.name ?? 'Yoca Brand System™', url: `${base}/services#brand` },
    { title: t.systems.items[1]?.name ?? 'Yoca Growth Engine™', url: `${base}/services#growth` },
    { title: t.systems.items[2]?.name ?? 'Yoca Scale Framework™', url: `${base}/services#scale` },
  ];
  const companyCol = [
    { title: t.nav.about, url: `${base}/about` },
    { title: t.nav.services, url: `${base}/services` },
    { title: t.nav.work, url: `${base}/work` },
    { title: t.nav.checkup, url: `${base}/checkup` },
    { title: t.nav.contact, url: `${base}/contact` },
  ];
  const productsCol = t.products.items.map((product) => ({
    title: product.name,
    url: `${base}/products`,
  }));
  // Connect column: external links from the CMS menu + brand contacts.
  const connectCol = (rows ?? [])
    .filter((row) => /^(https?:|mailto:)/.test(row.url))
    .map((row) => ({ title: row.title, url: row.url, external: true }));
  if (connectCol.length === 0) {
    connectCol.push(
      { title: 'Instagram', url: 'https://instagram.com/thisisyoca', external: true },
      { title: 'connect@yoca.net', url: 'mailto:connect@yoca.net', external: true },
    );
  }

  const columns: Array<{ heading: string; items: Array<{ title: string; url: string; external?: boolean }> }> = [
    { heading: t.footer.colSystems, items: systemsCol },
    { heading: t.footer.company, items: companyCol },
    { heading: t.footer.colProducts, items: productsCol },
    { heading: t.footer.connect, items: connectCol },
  ];

  return (
    <footer className="relative z-[7] border-t border-line bg-surface-deep pb-8 pt-16 lg:pt-24">
      <div className="container-y">
        {/* ── Closing hook + full-width lime CTA ─────────────────── */}
        <div className="border-b border-line pb-14">
          <p className="max-w-[16ch] text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t.footer.hook}
          </p>
          <Link
            href={`${base}/contact`}
            className="btn-primary mt-9 w-full px-8 py-5 text-lg"
          >
            {t.footer.hookCta} →
          </Link>
        </div>

        {/* ── 4-column system breakdown ──────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-line py-12 lg:grid-cols-4">
          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
                {column.heading}
              </h2>
              <ul className="grid gap-2.5">
                {column.items.map((item) => (
                  <li key={item.url + item.title}>
                    {item.external ? (
                      <a
                        href={item.url}
                        className="inline-block py-0.5 text-[14px] text-muted transition-colors hover:text-yoca-lime"
                        {...(item.url.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        href={item.url}
                        className="inline-block py-0.5 text-[14px] text-muted transition-colors hover:text-yoca-lime"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
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
          <p className="text-[12px]">{t.footer.message}</p>
        </div>

        {/* Oversized outlined wordmark — typographic texture, not a logo redraw. */}
        <p
          aria-hidden="true"
          className="wordmark-outline pointer-events-none mt-10 select-none text-center leading-none"
        >
          YOCA
        </p>
      </div>
    </footer>
  );
}
