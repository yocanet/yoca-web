import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CtaSection from '@/components/sections/CtaSection';
import Reveal from '@/components/ui/Reveal';
import { getDict } from '@/lib/i18n';
import { getContent } from '@/lib/content';
import { buildMetadata, breadcrumbSchema, getRequestContext, jsonLdString } from '@/lib/seo';

/**
 * Yoca — service detail pages (all four locales).
 * Slugs are locale-independent; content comes from the i18n dictionary:
 * the service item (desc, deliverables, "what it changes") plus its umbrella
 * group (problem, tech stack, system name).
 */

/** slug → [service item index, umbrella group index] */
const SERVICES: Array<{ slug: string; item: number; group: number }> = [
  { slug: 'brand-strategy-identity', item: 0, group: 0 },
  { slug: 'web-digital-experiences', item: 1, group: 1 },
  { slug: 'growth-performance', item: 2, group: 1 },
  { slug: 'creative-production', item: 3, group: 0 },
  { slug: 'ai-automation', item: 4, group: 2 },
  { slug: 'digital-product-development', item: 5, group: 2 },
];

interface PageProps {
  params: { slug: string };
}

function resolve(slug: string) {
  return SERVICES.find((entry) => entry.slug === slug) ?? null;
}

export function generateMetadata({ params }: PageProps): Metadata {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  const entry = resolve(params.slug);
  if (!entry) {
    return buildMetadata({
      ctx,
      path: '/services',
      title: t.servicesPage.metaTitle,
      description: t.servicesPage.metaDescription,
    });
  }
  const service = t.services.items[entry.item];
  return buildMetadata({
    ctx,
    path: `/services/${params.slug}`,
    title: `${service.name} — ${t.nav.services} | Yoca`,
    description: service.desc,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const ctx = getRequestContext();
  const t = await getContent(ctx.locale);
  const base = ctx.base;
  const entry = resolve(params.slug);
  if (!entry) notFound();

  const service = t.services.items[entry.item];
  const group = t.servicesPage.groups[entry.group];
  const related = SERVICES.filter(
    (item) => item.group === entry.group && item.slug !== entry.slug,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: base },
              { name: t.nav.services, path: `${base}/services` },
              { name: service.name, path: `${base}/services/${entry.slug}` },
            ]),
          ),
        }}
      />
      <SiteHeader t={t} path={`/services/${entry.slug}`} />
      <main id="main">
        <section
          className="intro-slab relative z-[7] bg-surface-deep pb-14 pt-44"
        >
          <div className="container-y">
            <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2.5 text-[13px] text-subtle">
              <Link href={base} className="transition-colors hover:text-yoca-lime">
                {t.nav.home}
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={`${base}/services`} className="transition-colors hover:text-yoca-lime">
                {t.nav.services}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-muted">
                {service.name}
              </span>
            </nav>
            <p className="mt-6 text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
              {String(entry.group + 1).padStart(2, '0')} · {group.system}
            </p>
            <h1 className="mt-3 max-w-[22ch] text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {service.name}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted">
              {service.desc}
            </p>
          </div>
        </section>

        {/* The problem it solves */}
        <section className="relative z-[7] border-t border-line bg-surface py-16">
          <div className="container-y grid gap-8 md:grid-cols-2 lg:gap-12">
            <Reveal>
              <div className="glass h-full rounded-md p-7 lg:p-9">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
                  {t.servicesPage.tabs.problem}
                </h2>
                <p className="mt-4 text-[16px] leading-[1.85] text-soft">{group.problem}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="glass h-full rounded-md border-yoca-lime/30 p-7 lg:p-9">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
                  {t.servicesPage.tabs.changes}
                </h2>
                <p className="mt-4 text-[19px] font-bold leading-[1.65] text-yoca-lime">
                  {service.changes}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Deliverables + stack */}
        <section className="relative z-[7] py-16">
          <div className="container-y grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <Reveal>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  {t.servicesPage.tabs.deliverables}
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 rounded-sm border border-line bg-surface p-4 text-[14px] font-semibold text-soft"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[6px] block h-1.5 w-1.5 flex-none bg-yoca-lime"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  {t.servicesPage.tabs.stack}
                </h2>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {group.stack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-sm border border-line bg-surface px-3.5 py-2 text-[13px] font-bold text-soft"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] italic text-subtle">{t.servicesPage.stackNote}</p>

                {related.length > 0 && (
                  <div className="mt-10 border-t border-line pt-6">
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
                      {group.title}
                    </h3>
                    <ul className="mt-3 grid gap-2">
                      {related.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`${base}/services/${item.slug}`}
                            className="text-[14px] font-bold text-muted transition-colors hover:text-yoca-lime"
                          >
                            → {t.services.items[item.item].name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection t={t.cta} base={base} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
