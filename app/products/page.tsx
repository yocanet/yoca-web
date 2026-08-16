/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageIntro from '@/components/ui/PageIntro';
import CtaSection from '@/components/sections/CtaSection';
import Reveal from '@/components/ui/Reveal';
import { getDict } from '@/lib/i18n';
import { getContent } from '@/lib/content';
import { buildMetadata, breadcrumbSchema, getRequestContext, jsonLdString } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  return buildMetadata({
    ctx,
    path: '/products',
    title: t.products.metaTitle,
    description: t.products.metaDescription,
  });
}

/** Per-product visual motifs — each card speaks its own business language. */
function ProductMotif({ productKey }: { productKey: string }) {
  if (productKey === 'yocaserve') {
    // QR / menu grid
    return (
      <svg viewBox="0 0 200 44" className="h-11 w-auto">
        {[0, 1, 2, 3, 4, 5, 6].map((col) =>
          [0, 1, 2].map((row) => (
            <rect
              key={`${col}-${row}`}
              x={col * 15}
              y={row * 15}
              width="11"
              height="11"
              fill={(col + row) % 3 === 0 ? '#A2FF00' : (col * row) % 4 === 1 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.12)'}
            />
          )),
        )}
        <rect x="120" y="0" width="80" height="8" fill="rgba(255,255,255,0.25)" />
        <rect x="120" y="14" width="62" height="8" fill="rgba(255,255,255,0.14)" />
        <rect x="120" y="28" width="70" height="8" fill="rgba(255,255,255,0.14)" />
      </svg>
    );
  }
  if (productKey === 'wonkick') {
    // Squad grid (formation)
    return (
      <svg viewBox="0 0 200 44" className="h-11 w-auto">
        {[[16, 32], [56, 10], [56, 32], [96, 20], [136, 8], [136, 34], [176, 20]].map(([x, y], i) => (
          <rect key={i} x={x} y={y - 6} width="12" height="12" fill={i === 3 ? '#A2FF00' : i > 4 ? '#40C401' : 'rgba(255,255,255,0.55)'} />
        ))}
        <path d="M 22 32 L 62 16 M 62 38 L 102 26 M 102 26 L 142 14 M 102 26 L 142 40 M 142 14 L 182 26" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }
  if (productKey === 'demo-hub') {
    // Tile showcase
    return (
      <svg viewBox="0 0 200 44" className="h-11 w-auto">
        <rect x="0" y="0" width="58" height="44" fill="rgba(255,255,255,0.14)" />
        <rect x="66" y="0" width="58" height="20" fill="#A2FF00" />
        <rect x="66" y="26" width="58" height="18" fill="rgba(255,255,255,0.25)" />
        <rect x="132" y="0" width="30" height="44" fill="rgba(255,255,255,0.10)" />
        <rect x="170" y="0" width="30" height="28" fill="#40C401" />
        <rect x="170" y="34" width="30" height="10" fill="rgba(255,255,255,0.14)" />
      </svg>
    );
  }
  // labs — experiment modules
  return (
    <svg viewBox="0 0 200 44" className="h-11 w-auto">
      <rect x="0" y="12" width="20" height="20" fill="rgba(255,255,255,0.25)" />
      <rect x="30" y="12" width="20" height="20" fill="none" stroke="#A2FF00" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="60" y="12" width="20" height="20" fill="#40C401" />
      <rect x="90" y="4" width="36" height="36" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <rect x="100" y="14" width="16" height="16" fill="#A2FF00" />
      <rect x="140" y="12" width="20" height="20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="170" y="12" width="20" height="20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

/** Product wordmark assets (existing brand SVGs; text card when absent). */
const LOGOS: Record<string, string | null> = {
  yocaserve: '/clients/yocaserve.svg',
  wonkick: '/clients/wonkick.svg',
  'demo-hub': null,
  labs: null,
};

export default async function ProductsPage() {
  const ctx = getRequestContext();
  const t = await getContent(ctx.locale);
  const base = ctx.base;
  const p = t.products;

  const statusLabel = { live: p.statusLive, soon: p.statusSoon, exp: p.statusExp } as const;
  const statusClass = {
    live: 'bg-yoca-green text-black',
    soon: 'bg-[#F5D90A] text-black',
    exp: 'bg-surface-elevated text-soft',
  } as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: base },
              { name: t.nav.products, path: `${base}/products` },
            ]),
          ),
        }}
      />
      <SiteHeader t={t} path="/products" />
      <main id="main">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <PageIntro
          eyebrow={p.eyebrow}
          title={p.heading}
          sub={p.sub}
          compact
          rail={p.items.map((product) => (
            <a
              key={product.key}
              href={`#${product.key}`}
              className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-subtle transition-colors hover:text-yoca-lime"
            >
              <span aria-hidden="true" className="slant block h-2 w-2.5 bg-yoca-green" />
              {product.name}
            </a>
          ))}
        />

        {/* ── Product cards — each with its own scale & character ── */}
        <section className="relative z-[7] bg-surface py-16">
          <div className="container-y">
            <div className="grid gap-5 md:grid-cols-2">
              {p.items.map((product, index) => {
                // Layout variants: featured full-width / technical / vertical showcase / editorial strip
                // 0: featured full-width · 1: technical grid card · 2: vertical
                // showcase · 3: experimental editorial strip
                const variant = index === 0 || index === 3 ? 'md:col-span-2' : '';
                return (
                <Reveal key={product.key} delay={(index % 2) * 0.08}>
                  <article
                    id={product.key}
                    className={`glass group flex h-full scroll-mt-28 flex-col rounded-md p-7 transition-colors duration-300 hover:border-yoca-lime/40 lg:p-9 ${variant}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      {LOGOS[product.key] ? (
                        <img
                          src={LOGOS[product.key]!}
                          alt={product.name}
                          width={180}
                          height={44}
                          className="h-9 w-auto"
                        />
                      ) : (
                        <h2 className="text-[22px] font-extrabold tracking-tight">{product.name}</h2>
                      )}
                      <span
                        className={`slant flex-none px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] ${statusClass[product.status]}`}
                      >
                        {statusLabel[product.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
                      {product.category}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{product.desc}</p>

                    {/* Product-specific visual motif */}
                    <div className={index === 0 || index === 3 ? 'mt-6 [&_svg]:md:h-20' : 'mt-6'} aria-hidden="true">
                      <ProductMotif productKey={product.key} />
                    </div>

                    {/* Technology capabilities — honest, verifiable */}
                    <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                      {product.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="rounded-sm border border-line bg-surface px-3 py-1.5 text-[12px] font-bold text-soft"
                        >
                          {capability}
                        </li>
                      ))}
                    </ul>

                    {/* Product CTA — visually distinct from Work's "View Project":
                        pill-shaped, green-bordered, product-labelled. External URL
                        when live; internal overview anchor until then (no dead links). */}
                    {product.url ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-yoca-green/60 px-6 py-2.5 text-[14px] font-bold text-yoca-green transition-colors hover:bg-yoca-green hover:text-black"
                      >
                        {product.cta} ↗
                      </a>
                    ) : (
                      <Link
                        href={`${base}/products#${product.key}`}
                        className="mt-6 inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-line px-6 py-2.5 text-[14px] font-bold text-soft transition-colors hover:border-yoca-green/60 hover:text-yoca-green"
                      >
                        {p.overviewCta}
                        <span aria-hidden="true" className="icon-arrow">→</span>
                      </Link>
                    )}
                  </article>
                </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <CtaSection t={t.cta} base={base} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
