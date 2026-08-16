/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/types';
import { getCaseStudies } from '@/lib/work';

/**
 * Yoca — selected work as a typographic index (Server Component).
 * No image grid: each project is a hairline row — name at display scale,
 * sector · services · year, an honest status label — and on desktop the
 * project visual slides in at the row's end on hover. Reads from the same
 * case_studies source as /work; the "Concept Project" labelling is preserved.
 */

interface WorkIndexProps {
  t: Dict['work'];
  locale: Locale;
  base: string;
  /** Maximum rows on the homepage. */
  limit?: number;
}

export default async function WorkIndex({ t, locale, base, limit = 4 }: WorkIndexProps) {
  const studies = (await getCaseStudies(locale)).slice(0, limit);
  if (studies.length === 0) return null;

  const status = {
    client: t.statusClient,
    concept: t.statusConcept,
    product: t.statusProduct,
    experimental: t.statusExp,
  } as const;

  return (
    <section className="relative z-[7] border-t border-line bg-surface py-20 lg:py-32" aria-label={t.heading}>
      <div className="container-y">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(34px,4.6vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
              {t.heading}
            </h2>
          </div>
          <Link
            href={`${base}/work`}
            className="inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.1em] text-muted transition-colors hover:text-yoca-lime"
          >
            {t.allWork} <span aria-hidden="true" className="icon-arrow">→</span>
          </Link>
        </div>

        <ol className="mt-12 border-t border-line lg:mt-16">
          {studies.map((study, index) => (
            <li key={study.slug} className="border-b border-line">
              <Link
                href={`${base}/work/${study.slug}`}
                className="group relative grid items-center gap-x-8 gap-y-3 py-7 md:grid-cols-[56px_minmax(0,1fr)_auto] lg:py-9"
                aria-label={`${study.name} — ${t.viewCase}`}
              >
                <span className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="block text-[clamp(28px,4vw,56px)] font-extrabold leading-[1.02] tracking-[-0.03em] text-soft transition-colors duration-300 group-hover:text-white">
                    {study.name}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold uppercase tracking-[0.1em] text-subtle">
                    <span>{study.sector}</span>
                    <span aria-hidden="true" className="h-3 w-px bg-line" />
                    <span>{study.services.join(' · ')}</span>
                    <span aria-hidden="true" className="h-3 w-px bg-line" />
                    <span>{study.year}</span>
                  </span>
                </span>
                <span className="flex items-center gap-4 md:justify-self-end">
                  <span className="slant bg-surface-elevated px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] text-soft">
                    {status[study.kind]}
                  </span>
                  <span aria-hidden="true" className="icon-arrow text-xl text-subtle transition-colors group-hover:text-yoca-lime">
                    →
                  </span>
                </span>

                {/* Hover preview (desktop, pointer devices only) */}
                <span
                  aria-hidden="true"
                  className="hover-preview pointer-events-none absolute end-[14%] top-1/2 z-10 w-[240px] -translate-y-1/2 translate-x-3 rotate-[-4.83deg] overflow-hidden border border-line opacity-0 shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100"
                >
                  <img src={study.image} alt="" width={480} height={305} loading="lazy" className="block h-auto w-full" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
