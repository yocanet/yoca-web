import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import TeamSection from '@/components/sections/TeamSection';
import CtaSection from '@/components/sections/CtaSection';
import SectionWrapper from '@/components/SectionWrapper';
import Reveal from '@/components/ui/Reveal';
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
  const a = t.about;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: '/' },
              { name: t.nav.about, path: '/about' },
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
              'radial-gradient(ellipse 60% 55% at 85% 0%, rgba(162,255,0,0.07), transparent 70%), #050505',
          }}
        >
          <div className="container-y">
            <p className="eyebrow">{a.eyebrow}</p>
            <h1 className="mt-5 max-w-[16ch] text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
              {a.heading}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[18px] leading-relaxed text-muted">{a.sub}</p>
          </div>
        </section>

        {/* ── Story ─────────────────────────────────────────────── */}
        <section className="relative z-[7] border-t border-line py-16 lg:py-24">
          <div className="container-y grid gap-10 md:grid-cols-[minmax(220px,1fr)_2fr] md:gap-16">
            <Reveal>
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-yoca-lime">
                {a.storyTitle}
              </h2>
            </Reveal>
            <div className="grid max-w-[64ch] gap-6 text-[17px] leading-[1.85] text-soft">
              {[a.story1, a.story2, a.story3].map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values bento ──────────────────────────────────────── */}
        <section
          className="relative z-[7] py-16 lg:py-24"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 10% 100%, rgba(64,196,1,0.05), transparent 70%)',
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
        <section className="relative z-[7] border-t border-line py-16 lg:py-20">
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
                    className="rounded-sm border border-line bg-surface px-3.5 py-2 text-[13px] font-bold text-soft transition-colors duration-200 hover:border-yoca-lime/50 hover:text-yoca-lime"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Check-up bridge ───────────────────────────────────── */}
        <SectionWrapper sectionKey="checkup_banner">
          <section className="relative z-[7] py-14">
            <div className="container-y">
              <div className="glass flex flex-wrap items-center justify-between gap-6 rounded-md p-8 lg:p-10">
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight lg:text-2xl">
                    {t.checkup.title}
                  </h2>
                  <p className="mt-2 max-w-[52ch] text-[15px] text-muted">{t.checkup.description}</p>
                </div>
                <Link href="/checkup" className="btn-primary">
                  {t.hero.primaryCta}
                </Link>
              </div>
            </div>
          </section>
        </SectionWrapper>

        <CtaSection t={t.cta} />
      </main>
      <SiteFooter t={t} />
    </>
  );
}
