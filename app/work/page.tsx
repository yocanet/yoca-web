import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CtaSection from '@/components/sections/CtaSection';
import WorkGrid from '@/components/sections/WorkGrid';
import { getDict } from '@/lib/i18n';
import { getContent } from '@/lib/content';
import { getCaseStudies } from '@/lib/work';
import {
  buildMetadata,
  breadcrumbSchema,
  caseStudySchema,
  getRequestContext,
  jsonLdString,
} from '@/lib/seo';

export function generateMetadata(): Metadata {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  return buildMetadata({
    ctx,
    path: '/work',
    title: t.work.metaTitle,
    description: t.work.metaDescription,
  });
}

export default async function WorkPage() {
  const ctx = getRequestContext();
  const t = await getContent(ctx.locale);
  const base = ctx.base;
  const studies = await getCaseStudies(ctx.locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: base },
              { name: t.nav.work, path: `${base}/work` },
            ]),
          ),
        }}
      />
      {studies.map((study) => (
        <script
          key={study.slug}
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
      ))}
      <SiteHeader t={t} path="/work" />
      <main id="main">
        <section
          className="relative z-[7] pb-14 pt-44"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 85% 0%, rgba(162,255,0,0.06), transparent 70%), #0D0E12',
          }}
        >
          <div className="container-y">
            <p className="eyebrow">{t.work.eyebrow}</p>
            <h1 className="mt-5 max-w-[22ch] text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {t.work.heading}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted">{t.work.sub}</p>
          </div>
        </section>

        <section className="section-light relative z-[7] py-16 lg:py-20">
          <div className="container-y">
            <WorkGrid
              studies={studies}
              base={base}
              labels={{
                all: t.work.filterAll,
                clients: t.work.filterClients,
                products: t.work.filterProducts,
                viewCase: t.work.viewCase,
                metricNote: t.work.metricNote,
                empty: t.work.empty,
                status: {
                  client: t.work.statusClient,
                  concept: t.work.statusConcept,
                  product: t.work.statusProduct,
                  experimental: t.work.statusExp,
                },
              }}
            />
          </div>
        </section>

        <CtaSection t={t.cta} base={base} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
