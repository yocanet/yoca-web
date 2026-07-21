/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CtaSection from '@/components/sections/CtaSection';
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
  const studies = await getCaseStudies(ctx.locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: '/' },
              { name: t.nav.work, path: '/work' },
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
                path: `/work/${study.slug}`,
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
              'radial-gradient(ellipse 60% 55% at 85% 0%, rgba(162,255,0,0.06), transparent 70%), #050505',
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

        <section className="relative z-[7] py-16">
          <div className="container-y grid gap-8 md:grid-cols-2">
            {studies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group block"
                aria-label={`${study.name} — ${t.work.viewCase}`}
              >
                <span className="relative block aspect-[11/7] overflow-hidden rounded-sm border border-line bg-surface-secondary">
                  <img
                    src={study.image}
                    alt=""
                    width={880}
                    height={560}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[3px] w-0 bg-yoca-lime transition-all duration-300 group-hover:w-full"
                  />
                </span>
                <span className="mt-4 inline-block rounded-sm border border-line px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-yoca-lime">
                  {study.sector}
                </span>
                <h2 className="mt-3 text-[22px] font-extrabold">{study.name}</h2>
                <p className="mt-2 max-w-[52ch] text-[15px] text-muted">{study.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <CtaSection t={t.cta} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
