import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageIntro from '@/components/ui/PageIntro';
import CtaSection from '@/components/sections/CtaSection';
import ServiceUmbrellas from '@/components/sections/ServiceUmbrellas';
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
  const base = ctx.base;
  const sp = t.servicesPage;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: base },
              { name: t.nav.services, path: `${base}/services` },
            ]),
          ),
        }}
      />
      <SiteHeader t={t} path="/services" />
      <main id="main">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <PageIntro
          eyebrow={sp.eyebrow}
          title={t.services.heading}
          sub={t.services.sub}
          compact
          rail={t.services.items.map((item, index) => (
            <span key={item.name} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
              <span className="text-yoca-lime">{String(index + 1).padStart(2, '0')}</span>
              {item.name}
            </span>
          ))}
        />

        {/* ── Three umbrellas with problem/deliverables/stack tabs ─ */}
        <section className="relative z-[7] bg-surface py-16">
          <div className="container-y">
            <ServiceUmbrellas t={sp} serviceNames={t.services.items.map((item) => item.name)} base={base} />
          </div>
        </section>

        {/* ── Process — soft-white break, one horizontal sequence ── */}
        <section className="section-light relative z-[7] py-20 lg:py-32">
          <div className="container-y">
            <Reveal>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
                <h2 className="max-w-[16ch] text-[clamp(32px,4.2vw,56px)] font-extrabold leading-[1.04] tracking-[-0.03em]">
                  {sp.processTitle}
                </h2>
                <p className="light-muted max-w-[46ch] text-[16px] leading-relaxed lg:justify-self-end">{sp.processSub}</p>
              </div>
            </Reveal>
            <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5 lg:gap-6">
              {/* Connecting rail (desktop) */}
              <span aria-hidden="true" className="absolute inset-x-0 top-[9px] hidden h-px bg-[rgba(5,5,5,0.16)] lg:block" />
              {sp.process.map((step, index) => (
                <Reveal key={step.name} delay={index * 0.1}>
                  <li className="relative">
                    <span
                      aria-hidden="true"
                      className={`slant relative z-10 block h-[19px] w-[22px] ${index === sp.process.length - 1 ? 'bg-yoca-lime' : index === 0 ? 'bg-[#050505]' : 'bg-yoca-green'}`}
                    />
                    <span className="mt-6 block text-[clamp(44px,5vw,72px)] font-extrabold leading-none tracking-[-0.05em] text-[rgba(5,5,5,0.14)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 text-[20px] font-extrabold tracking-[-0.02em]">{step.name}</h3>
                    <p className="light-muted mt-2 max-w-[30ch] text-[14px] leading-relaxed">{step.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2}>
              <div className="mt-16 flex flex-wrap gap-4">
                <Link href={`${base}/contact`} className="btn-primary">
                  {t.hero.primaryCta}
                </Link>
                <Link
                  href={`${base}/checkup`}
                  className="inline-flex min-h-12 items-center gap-2 border border-[rgba(5,5,5,0.3)] px-7 py-3 text-[15px] font-bold text-[#050505] transition-colors hover:border-[#050505]"
                >
                  {t.hero.secondaryCta}
                </Link>
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
