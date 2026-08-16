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
              fill={(col + row) % 3 === 0 ? '#A2FF00' : (col * row) % 4 === 1 ? 'rgba(5,5,5,0.7)' : 'rgba(5,5,5,0.12)'}
            />
          )),
        )}
        <rect x="120" y="0" width="80" height="8" fill="rgba(5,5,5,0.25)" />
        <rect x="120" y="14" width="62" height="8" fill="rgba(5,5,5,0.14)" />
        <rect x="120" y="28" width="70" height="8" fill="rgba(5,5,5,0.14)" />
      </svg>
    );
  }
  if (productKey === 'wonkick') {
    // Squad grid (formation)
    return (
      <svg viewBox="0 0 200 44" className="h-11 w-auto">
        {[[16, 32], [56, 10], [56, 32], [96, 20], [136, 8], [136, 34], [176, 20]].map(([x, y], i) => (
          <rect key={i} x={x} y={y - 6} width="12" height="12" fill={i === 3 ? '#A2FF00' : i > 4 ? '#40C401' : 'rgba(5,5,5,0.55)'} />
        ))}
        <path d="M 22 32 L 62 16 M 62 38 L 102 26 M 102 26 L 142 14 M 102 26 L 142 40 M 142 14 L 182 26" stroke="rgba(5,5,5,0.2)" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }
  if (productKey === 'demo-hub') {
    // Tile showcase
    return (
      <svg viewBox="0 0 200 44" className="h-11 w-auto">
        <rect x="0" y="0" width="58" height="44" fill="rgba(5,5,5,0.14)" />
        <rect x="66" y="0" width="58" height="20" fill="#A2FF00" />
        <rect x="66" y="26" width="58" height="18" fill="rgba(5,5,5,0.25)" />
        <rect x="132" y="0" width="30" height="44" fill="rgba(5,5,5,0.10)" />
        <rect x="170" y="0" width="30" height="28" fill="#40C401" />
        <rect x="170" y="34" width="30" height="10" fill="rgba(5,5,5,0.14)" />
      </svg>
    );
  }
  // labs — experiment modules
  return (
    <svg viewBox="0 0 200 44" className="h-11 w-auto">
      <rect x="0" y="12" width="20" height="20" fill="rgba(5,5,5,0.25)" />
      <rect x="30" y="12" width="20" height="20" fill="none" stroke="#A2FF00" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="60" y="12" width="20" height="20" fill="#40C401" />
      <rect x="90" y="4" width="36" height="36" fill="none" stroke="rgba(5,5,5,0.3)" strokeWidth="1.5" />
      <rect x="100" y="14" width="16" height="16" fill="#A2FF00" />
      <rect x="140" y="12" width="20" height="20" fill="none" stroke="rgba(5,5,5,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="170" y="12" width="20" height="20" fill="none" stroke="rgba(5,5,5,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

export default async function ProductsPage() {
  const ctx = getRequestContext();
  const t = await getContent(ctx.locale);
  const base = ctx.base;
  const p = t.products;

  const statusLabel = { live: p.statusLive, soon: p.statusSoon, exp: p.statusExp } as const;
  const statusClass = {
    live: 'bg-yoca-green text-black',
    soon: 'bg-[#F5D90A] text-black',
    exp: 'bg-[#050505] text-white',
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

        {/* ── Products as an editorial index on soft white ─────── */}
        <section className="section-light relative z-[7] py-16 lg:py-24">
          <div className="container-y">
            <ol className="border-t border-[rgba(5,5,5,0.16)]">
              {p.items.map((product, index) => (
                <Reveal key={product.key} delay={0.04}>
                  <li
                    id={product.key}
                    className="grid scroll-mt-28 gap-8 border-b border-[rgba(5,5,5,0.16)] py-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,5fr)] lg:gap-10 lg:py-16"
                  >
                    {/* Numeral + status */}
                    <div className="flex items-start justify-between gap-4 lg:block">
                      <span className="block text-[clamp(56px,7vw,104px)] font-extrabold leading-[0.85] tracking-[-0.05em] text-[rgba(5,5,5,0.14)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`slant mt-1 inline-block px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] lg:mt-6 ${statusClass[product.status]}`}>
                        {statusLabel[product.status]}
                      </span>
                    </div>

                    {/* Identity + copy */}
                    <div>
                      <h2 className="text-[clamp(26px,2.8vw,40px)] font-extrabold leading-tight tracking-[-0.03em]">{product.name}</h2>
                      <p className="light-subtle mt-3 text-[12px] font-bold uppercase tracking-[0.14em]">{product.category}</p>
                      <p className="light-muted mt-5 max-w-[50ch] text-[16px] leading-relaxed">{product.desc}</p>
                      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                        {product.capabilities.map((capability) => (
                          <li key={capability} className="flex items-center gap-2 text-[13px] font-bold">
                            <span aria-hidden="true" className="slant block h-2 w-2.5 flex-none bg-yoca-green" />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Motif + CTA */}
                    <div className="light-card flex flex-col justify-between gap-8 p-7 lg:p-9">
                      <div aria-hidden="true" className="[&_svg]:h-16 [&_svg]:w-auto">
                        <ProductMotif productKey={product.key} />
                      </div>
                      {product.url ? (
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-12 w-fit items-center gap-2 bg-[#050505] px-6 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-yoca-green hover:text-black"
                        >
                          {product.cta} ↗
                        </a>
                      ) : (
                        <span className="inline-flex min-h-12 w-fit items-center gap-2 border border-[rgba(5,5,5,0.3)] px-6 py-2.5 text-[14px] font-bold text-[#050505]">
                          {p.overviewCta}
                        </span>
                      )}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <CtaSection t={t.cta} base={base} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
