/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
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
    live: 'border-yoca-green/40 text-yoca-green',
    soon: 'border-yellow-400/40 text-yellow-300',
    exp: 'border-line text-subtle',
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
        <section
          className="relative z-[7] pb-14 pt-44"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 85% 0%, rgba(64,196,1,0.07), transparent 70%), #0D0E12',
          }}
        >
          <div className="container-y">
            <p className="eyebrow">{p.eyebrow}</p>
            <h1 className="mt-5 max-w-[20ch] text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {p.heading}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted">{p.sub}</p>
          </div>
        </section>

        {/* ── Product cards ─────────────────────────────────────── */}
        <section className="relative z-[7] bg-surface py-16">
          <div className="container-y">
            <div className="grid gap-5 md:grid-cols-2">
              {p.items.map((product, index) => (
                <Reveal key={product.key} delay={(index % 2) * 0.08}>
                  <article className="glass group flex h-full flex-col rounded-md p-7 transition-colors duration-300 hover:border-yoca-lime/40 lg:p-9">
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
                        className={`flex-none rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${statusClass[product.status]}`}
                      >
                        {statusLabel[product.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
                      {product.category}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{product.desc}</p>

                    {/* Growth metrics */}
                    <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5">
                      {product.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="text-2xl font-extrabold tabular-nums text-yoca-lime">
                            {metric.value}
                          </p>
                          <p className="mt-0.5 text-[12px] font-semibold text-subtle">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {product.url && (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost mt-6 w-fit"
                      >
                        {p.liveDemo} ↗
                      </a>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-[12px] text-subtle">{p.metricsNote}</p>
          </div>
        </section>

        <CtaSection t={t.cta} base={base} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
