/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CtaSection from '@/components/sections/CtaSection';
import { getDict } from '@/lib/i18n';
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

export function generateMetadata({ params }: PageProps): Metadata {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  const study = getCaseStudy(ctx.locale, params.slug);
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

export default function CaseStudyPage({ params }: PageProps) {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  const study = getCaseStudy(ctx.locale, params.slug);
  if (!study) notFound();

  const all = getCaseStudies(ctx.locale);
  const index = all.findIndex((cs) => cs.slug === study.slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  const narrative: Array<{ label: string; text: string }> = [
    { label: t.work.problem, text: study.problem },
    { label: t.work.approach, text: study.approach },
    { label: t.work.solution, text: study.solution },
    { label: t.work.result, text: study.results },
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
              path: `/work/${study.slug}`,
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
              { name: t.nav.home, path: '/' },
              { name: t.nav.work, path: '/work' },
              { name: study.name, path: `/work/${study.slug}` },
            ]),
          ),
        }}
      />
      <SiteHeader t={t} path={`/work/${study.slug}`} />
      <main id="main">
        <section
          className="relative z-[7] pb-10 pt-44"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 85% 0%, rgba(162,255,0,0.06), transparent 70%), #050505',
          }}
        >
          <div className="container-y">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2.5 text-[13px] text-subtle">
              <Link href="/" className="transition-colors hover:text-yoca-lime">
                {t.nav.home}
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/work" className="transition-colors hover:text-yoca-lime">
                {t.nav.work}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-muted">
                {study.name}
              </span>
            </nav>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {study.name}
            </h1>
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

        <section className="relative z-[7] py-16 lg:py-24">
          <div className="container-y grid gap-12 lg:gap-14">
            {narrative.map((block, blockIndex) => (
              <div key={block.label} className="grid gap-3 md:grid-cols-[minmax(200px,1fr)_2fr] md:gap-8">
                <div>
                  <span className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
                    {String(blockIndex + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 text-xl font-extrabold">{block.label}</h2>
                </div>
                <p className="max-w-[62ch] text-[17px] leading-[1.8] text-soft">{block.text}</p>
              </div>
            ))}
          </div>
        </section>

        <nav
          aria-label="Case studies"
          className="container-y relative z-[7] flex justify-between gap-5 border-t border-line py-10 max-sm:flex-col"
        >
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group grid gap-1.5">
              <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-subtle">
                ← {t.work.backToWork}
              </span>
              <span className="text-lg font-extrabold transition-colors group-hover:text-yoca-lime">
                {prev.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/work/${next.slug}`} className="group grid gap-1.5 text-right max-sm:text-left">
              <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-subtle">
                {t.work.allWork} →
              </span>
              <span className="text-lg font-extrabold transition-colors group-hover:text-yoca-lime">
                {next.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <CtaSection t={t.cta} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
