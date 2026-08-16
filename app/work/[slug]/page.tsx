/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CtaSection from '@/components/sections/CtaSection';
import Reveal from '@/components/ui/Reveal';
import { getDict } from '@/lib/i18n';
import { getContent } from '@/lib/content';
import { getCaseStudies, getCaseStudy } from '@/lib/work';
import {
  buildMetadata,
  breadcrumbSchema,
  caseStudySchema,
  getRequestContext,
  jsonLdString,
} from '@/lib/seo';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  const study = await getCaseStudy(ctx.locale, params.slug);
  if (!study) {
    return buildMetadata({
      ctx,
      path: '/work',
      title: t.work.metaTitle,
      description: t.work.metaDescription,
    });
  }
  return buildMetadata({
    ctx,
    path: `/work/${study.slug}`,
    title: `${study.name} — ${t.nav.work} | Yoca`,
    description: study.summary,
    ogImagePath: study.image,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const ctx = getRequestContext();
  const t = await getContent(ctx.locale);
  const base = ctx.base;
  const study = await getCaseStudy(ctx.locale, params.slug);
  if (!study) notFound();

  const all = await getCaseStudies(ctx.locale);
  const isConcept = study.kind === 'concept' || study.kind === 'experimental';
  const resultsHeading = isConcept ? t.work.designedOutcome : t.work.result;
  const statusLabel =
    study.kind === 'client'
      ? t.work.statusClient
      : study.kind === 'concept'
        ? t.work.statusConcept
        : study.kind === 'product'
          ? t.work.statusProduct
          : t.work.statusExp;
  const index = all.findIndex((cs) => cs.slug === study.slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  /** 5-module case template: Challenge → Applied System → Execution & Tech
   *  → Verified Results (chart) → Client Quote. */
  const narrative: Array<{ label: string; text: string }> = [
    { label: t.work.problem, text: study.problem },
    { label: t.work.approach, text: study.approach },
    { label: t.work.solution, text: study.solution },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            caseStudySchema(ctx.host, {
              name: study.name,
              description: study.summary,
              path: `${base}/work/${study.slug}`,
              year: study.year,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: base },
              { name: t.nav.work, path: `${base}/work` },
              { name: study.name, path: `${base}/work/${study.slug}` },
            ]),
          ),
        }}
      />
      <SiteHeader t={t} path={`/work/${study.slug}`} />
      <main id="main">
        <section
          className="intro-slab relative z-[7] bg-surface-deep pb-10 pt-44"
        >
          <div className="container-y">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2.5 text-[13px] text-subtle">
              <Link href={base} className="transition-colors hover:text-yoca-lime">
                {t.nav.home}
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={`${base}/work`} className="transition-colors hover:text-yoca-lime">
                {t.nav.work}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-muted">
                {study.name}
              </span>
            </nav>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                {study.name}
              </h1>
              <span className="slant bg-surface-elevated px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-soft">
                {statusLabel}
              </span>
              {study.metricBadge && (
                <span className="slant bg-yoca-lime px-3.5 py-1.5 text-[13px] font-extrabold text-black">
                  {study.metricBadge}
                </span>
              )}
            </div>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted">
              {study.summary}
            </p>
            <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-6">
              {[
                [t.work.sector, study.sector],
                [t.work.market, study.market],
                [t.work.year, study.year],
                [t.work.servicesLabel, study.services.join(', ')],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-subtle">
                    {label}
                  </dt>
                  <dd className="mt-1 text-[15px] font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className="container-y relative z-[7]">
          <figure className="overflow-hidden rounded-sm border border-line">
            <img
              src={study.image}
              alt={study.name}
              width={1400}
              height={800}
              fetchPriority="high"
              className="w-full"
            />
          </figure>
        </div>

        {/* Modules 1–3: Challenge / Applied System / Execution & Tech */}
        <section className="relative z-[7] py-16 lg:py-24">
          <div className="container-y grid gap-12 lg:gap-14">
            {narrative.map((block, blockIndex) => (
              <Reveal key={block.label} delay={blockIndex * 0.05}>
                <div className="grid gap-3 md:grid-cols-[minmax(200px,1fr)_2fr] md:gap-8">
                  <div>
                    <span className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
                      {String(blockIndex + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-2 text-xl font-extrabold">{block.label}</h2>
                  </div>
                  <p className="max-w-[62ch] text-[17px] leading-[1.8] text-soft">{block.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Module 4: Verified Results — narrative + stat bars */}
        <section className="relative z-[7] border-t border-line bg-surface py-16 lg:py-24">
          <div className="container-y grid gap-10 md:grid-cols-[minmax(200px,1fr)_2fr] md:gap-8">
            <div>
              <span className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">04</span>
              <h2 className="mt-2 text-xl font-extrabold">{resultsHeading}</h2>
            </div>
            <div>
              <p className="max-w-[62ch] text-[17px] leading-[1.8] text-soft">{study.results}</p>
              {study.stats && study.stats.length > 0 && (
                <div className="mt-9 grid gap-5">
                  {study.stats.map((stat) => (
                    <Reveal key={stat.label}>
                      <div>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-subtle">
                            {stat.label}
                          </span>
                          <span className="text-xl font-extrabold tabular-nums text-yoca-lime">
                            {stat.value}
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-elevated">
                          <div
                            className="h-full rounded-full bg-yoca-lime"
                            style={{ width: `${Math.min(100, Math.max(4, stat.bar ?? 50))}%` }}
                          />
                        </div>
                      </div>
                    </Reveal>
                  ))}
                  <p className="text-[12px] text-subtle">{t.work.metricNote}</p>
                </div>
              )}
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-8"
                >
                  {t.work.liveLabel} ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Module 5: Client Quote — renders only when a real quote exists */}
        {study.quote && (
          <section className="relative z-[7] py-16 lg:py-24">
            <div className="container-y grid gap-10 md:grid-cols-[minmax(200px,1fr)_2fr] md:gap-8">
              <div>
                <span className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">05</span>
                <h2 className="mt-2 text-xl font-extrabold">{t.work.quoteLabel}</h2>
              </div>
              <figure className="glass max-w-[62ch] rounded-md p-8 lg:p-10">
                <blockquote className="text-xl font-bold leading-[1.6] text-white">
                  “{study.quote}”
                </blockquote>
                {study.quoteAuthor && (
                  <figcaption className="mt-4 text-[14px] font-semibold text-yoca-lime">
                    — {study.quoteAuthor}
                  </figcaption>
                )}
              </figure>
            </div>
          </section>
        )}

        {/* Project navigation: Previous / All Work / Next (visual preview) */}
        <nav aria-label="Case studies" className="container-y relative z-[7] border-t border-line py-12">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            {prev ? (
              <Link href={`${base}/work/${prev.slug}`} className="group grid gap-1">
                <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-subtle">
                  <span aria-hidden="true" className="inline-block rtl:rotate-180">←</span> {t.work.backToWork}
                </span>
                <span className="text-lg font-extrabold transition-colors group-hover:text-yoca-lime">
                  {prev.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            <Link
              href={`${base}/work`}
              className="rounded-sm border border-line px-4 py-2.5 text-[13px] font-bold text-muted transition-colors hover:border-yoca-lime hover:text-yoca-lime"
            >
              {t.work.allWork}
            </Link>
          </div>
          {next && (
            <Link href={`${base}/work/${next.slug}`} className="group block" aria-label={next.name}>
              <span className="relative block aspect-[21/7] overflow-hidden rounded-sm border border-line max-md:aspect-[11/7]">
                <img
                  src={next.image}
                  alt=""
                  width={1400}
                  height={470}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-60 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-90"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-surface-deep/90 via-surface-deep/30 to-transparent" />
                <span className="absolute bottom-6 start-6">
                  <span className="block text-[12px] font-bold uppercase tracking-[0.1em] text-yoca-lime">
                    {t.work.allWork} <span aria-hidden="true" className="icon-arrow">→</span>
                  </span>
                  <span className="mt-1 block text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {next.name}
                  </span>
                </span>
              </span>
            </Link>
          )}
        </nav>

        <CtaSection t={t.cta} base={base} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
