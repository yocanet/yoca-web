import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import TeamSection from '@/components/sections/TeamSection';
import CtaSection from '@/components/sections/CtaSection';
import SectionWrapper from '@/components/SectionWrapper';
import Reveal from '@/components/ui/Reveal';
import Manifesto from '@/components/ui/Manifesto';
import { getDict } from '@/lib/i18n';
import { getContent } from '@/lib/content';
import { buildMetadata, breadcrumbSchema, getRequestContext, jsonLdString } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  return buildMetadata({
    ctx,
    path: '/about',
    title: t.about.metaTitle,
    description: t.about.metaDescription,
  });
}

/** Measurement / delivery stack — real tools used on engagements. */
const STACK = [
  'Google Analytics 4',
  'Google Tag Manager',
  'Meta Pixel & CAPI',
  'Google Ads',
  'Search Console',
  'Semrush',
  'Hotjar',
  'Cloudflare',
  'Next.js',
  'Supabase',
  'Vercel',
  'Figma',
];

export default async function AboutPage() {
  const ctx = getRequestContext();
  const t = await getContent(ctx.locale);
  const base = ctx.base;
  const a = t.about;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: base },
              { name: t.nav.about, path: `${base}/about` },
            ]),
          ),
        }}
      />
      <SiteHeader t={t} path="/about" />
      <main id="main">
        {/* ── Intro ─────────────────────────────────────────────── */}
        <section
          className="relative z-[7] pb-16 pt-44"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 85% 0%, rgba(162,255,0,0.07), transparent 70%), #0D0E12',
          }}
        >
          <div className="container-y">
            <p className="eyebrow">{a.eyebrow}</p>
            <h1 className="mt-5 max-w-[24ch] text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              {a.heading}
            </h1>
            <p className="mt-6 text-[17px] font-extrabold uppercase tracking-[0.14em] text-yoca-lime">
              {a.sub}
            </p>
          </div>
        </section>

        {/* ── Editorial spread: sticky manifesto + flowing methodology ── */}
        <section className="relative z-[7] border-t border-line bg-surface py-16 lg:py-28">
          <div className="container-y grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
            {/* Sticky manifesto column */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <h2 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-yoca-lime">
                  {a.storyTitle}
                </h2>
                <div className="mt-6 grid max-w-[58ch] gap-6 text-[17px] leading-[1.85] text-soft">
                  <p className="text-[21px] font-bold leading-[1.6] text-white">{a.story1}</p>
                  <p>{a.story2}</p>
                  <p>{a.story3}</p>
                </div>
                <Link href={`${base}/contact`} className="btn-primary mt-9">
                  {t.hero.primaryCta}
                </Link>
              </Reveal>
            </div>

            {/* Flowing methodology cards — canonical 01→02→03 order */}
            <div className="grid content-start gap-6">
              {t.systems.items.map((system, index) => (
                <Reveal key={system.name} delay={index * 0.08}>
                  <article className="glass rounded-md p-7 transition-colors duration-300 hover:border-yoca-lime/40 lg:p-9">
                    <p className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 text-xl font-extrabold tracking-tight">{system.name}</h3>
                    <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
                      {system.tagline}
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{system.body}</p>
                    <ul className="mt-5 grid gap-2 border-t border-line pt-4">
                      {system.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[13px] font-semibold text-soft">
                          <span
                            aria-hidden="true"
                            className="mt-[6px] block h-1.5 w-1.5 flex-none bg-yoca-green"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Scroll-activated manifesto ────────────────────────── */}
        <section className="relative z-[7] border-t border-line py-20 lg:py-32">
          <div className="container-y">
            <Manifesto lines={a.manifesto} />
          </div>
        </section>

        {/* ── Values ────────────────────────────────────────────── */}
        <section
          className="relative z-[7] py-16 lg:py-24"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 10% 100%, rgba(64,196,1,0.05), transparent 70%), #0D0E12',
          }}
        >
          <div className="container-y">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  {a.valuesTitle}
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{a.valuesSub}</p>
              </div>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {a.values.map((value, index) => (
                <Reveal key={value.title} delay={index * 0.07}>
                  <article className="glass group h-full rounded-md p-7 transition-colors duration-300 hover:border-yoca-lime/40 lg:p-9">
                    <span className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold tracking-tight">{value.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">{value.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team (Supabase-driven; hidden while empty) ────────── */}
        <SectionWrapper sectionKey="team">
          <TeamSection t={t.team} />
        </SectionWrapper>

        {/* ── Tech stack ────────────────────────────────────────── */}
        <section className="relative z-[7] border-t border-line bg-surface py-16 lg:py-20">
          <div className="container-y">
            <Reveal>
              <div className="mb-9 max-w-2xl">
                <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                  {a.stackTitle}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{a.stackSub}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="flex flex-wrap gap-2.5">
                {STACK.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-sm border border-line bg-surface-deep px-3.5 py-2 text-[13px] font-bold text-soft transition-colors duration-200 hover:border-yoca-lime/50 hover:text-yoca-lime"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <CtaSection t={t.cta} base={base} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
