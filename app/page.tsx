import Link from 'next/link';
import type { Metadata } from 'next';
import SectionWrapper from '@/components/SectionWrapper';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Hero from '@/components/sections/Hero';
import BentoFeatures from '@/components/sections/BentoFeatures';
import PartnersAndClients from '@/components/sections/PartnersAndClients';
import TeamSection from '@/components/sections/TeamSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import CtaSection from '@/components/sections/CtaSection';
import LiveStatus from '@/components/ui/LiveStatus';
import { getDict } from '@/lib/i18n';
import { buildMetadata, getRequestContext, jsonLdString, breadcrumbSchema } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  return buildMetadata({
    ctx,
    path: '/',
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
  });
}

export default async function HomePage() {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(breadcrumbSchema(ctx.host, [{ name: t.nav.home, path: '/' }])),
        }}
      />
      <SiteHeader t={t} />
      <main id="main">
        <SectionWrapper sectionKey="hero">
          <Hero t={t.hero} />
        </SectionWrapper>

        <SectionWrapper sectionKey="clients">
          <PartnersAndClients
            t={{ clients: t.clients, partners: t.partners }}
            showClients
            showPartners={false}
          />
        </SectionWrapper>

        <SectionWrapper sectionKey="bento">
          <BentoFeatures t={t.bento} />
        </SectionWrapper>

        <SectionWrapper sectionKey="services">
          <ServicesGrid t={t.services} ctaLabel={t.cta.button} />
        </SectionWrapper>

        <SectionWrapper sectionKey="team">
          <TeamSection t={t.team} />
        </SectionWrapper>

        <SectionWrapper sectionKey="checkup_banner">
          <section className="relative z-[7] py-14">
            <div className="container-y">
              <div className="glass grid items-center gap-8 overflow-hidden rounded-md p-8 md:grid-cols-[3fr_2fr] lg:p-12">
                <div>
                  <span className="inline-block rounded-sm border border-line px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-yoca-lime">
                    {t.checkup.eyebrow}
                  </span>
                  <h2 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight lg:text-3xl">
                    {t.checkup.title}
                  </h2>
                  <p className="mt-3 max-w-[52ch] text-[15px] text-muted">{t.checkup.description}</p>
                </div>
                <div className="grid justify-items-start gap-6 md:justify-items-end">
                  <div aria-hidden="true" className="flex h-[74px] items-end gap-2">
                    {[34, 58, 44, 76, 92].map((height, index) => (
                      <span
                        key={index}
                        className={`w-[18px] border ${
                          index === 4
                            ? 'border-yoca-lime bg-yoca-lime'
                            : 'border-line bg-surface-elevated'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <Link href="/checkup" className="btn-primary">
                    {t.hero.primaryCta}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </SectionWrapper>

        <SectionWrapper sectionKey="partners">
          <PartnersAndClients
            t={{ clients: t.clients, partners: t.partners }}
            showClients={false}
            showPartners
          />
        </SectionWrapper>

        <SectionWrapper sectionKey="cta">
          <CtaSection t={t.cta} />
        </SectionWrapper>
      </main>

      <SectionWrapper sectionKey="clocks">
        <LiveStatus
          locale={ctx.locale}
          activeLabel={t.clocks.active}
          cityLabels={{
            istanbul: t.clocks.istanbul,
            london: t.clocks.london,
            dubai: t.clocks.dubai,
          }}
        />
      </SectionWrapper>

      <SiteFooter t={t} />
    </>
  );
}
