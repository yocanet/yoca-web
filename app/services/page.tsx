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
    path: '/services',
    title: t.servicesPage.metaTitle,
    description: t.servicesPage.metaDescription,
  });
}

export default async function ServicesPage() {
  const ctx = getRequestContext();
  const t = await getContent(ctx.locale);
  const sp = t.servicesPage;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: '/' },
              { name: t.nav.services, path: '/services' },
            ]),
          ),
        }}
      />
      <SiteHeader t={t} path="/services" />
      <main id="main">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <section
          className="relative z-[7] pb-14 pt-44"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 85% 0%, rgba(162,255,0,0.06), transparent 70%), #050505',
          }}
        >
          <div className="container-y">
            <p className="eyebrow">{sp.eyebrow}</p>
            <h1 className="mt-5 max-w-[24ch] text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {t.services.heading}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted">
              {t.services.sub}
            </p>
          </div>
        </section>

        {/* ── Detailed service cards ────────────────────────────── */}
        <section className="relative z-[7] py-16">
          <div className="container-y grid gap-5 lg:grid-cols-2">
            {t.services.items.map((service, index) => (
              <Reveal key={service.name} delay={(index % 2) * 0.08}>
                <article className="glass group flex h-full flex-col rounded-md p-7 transition-colors duration-300 hover:border-yoca-lime/40 lg:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-[22px] font-extrabold leading-snug tracking-tight">
                      {service.name}
                    </h2>
                    <span className="flex-none text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{service.desc}</p>
                  <div className="mt-6 border-t border-line pt-5">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-subtle">
                      {sp.deliverables}
                    </h3>
                    <ul className="mt-3 grid gap-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[14px] text-soft">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] block h-1.5 w-1.5 flex-none bg-yoca-lime"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────── */}
        <section
          className="relative z-[7] border-t border-line py-16 lg:py-24"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 90% 100%, rgba(64,196,1,0.05), transparent 70%)',
          }}
        >
          <div className="container-y">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  {sp.processTitle}
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{sp.processSub}</p>
              </div>
            </Reveal>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sp.process.map((step, index) => (
                <Reveal key={step.name} delay={index * 0.08}>
                  <li className="relative h-full rounded-md border border-line bg-surface p-6">
                    <span className="text-[26px] font-extrabold leading-none text-yoca-lime">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-4 text-[17px] font-extrabold tracking-tight">{step.name}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{step.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap gap-4">
                <Link href="/checkup" className="btn-primary">
                  {t.hero.primaryCta}
                </Link>
                <Link href="/work" className="btn-ghost">
                  {t.hero.secondaryCta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <CtaSection t={t.cta} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
