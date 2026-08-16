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

        {/* ── Process ───────────────────────────────────────────── */}
        <section
          className="relative z-[7] border-t border-line bg-surface-deep py-16 lg:py-24"
        >
          <div className="container-y">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <h2 className="text-[clamp(32px,4.2vw,56px)] font-extrabold leading-[1.04] tracking-[-0.03em]">
                  {sp.processTitle}
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{sp.processSub}</p>
              </div>
            </Reveal>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
                <Link href={`${base}/contact`} className="btn-primary">
                  {t.hero.primaryCta}
                </Link>
                <Link href={`${base}/checkup`} className="btn-ghost">
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
