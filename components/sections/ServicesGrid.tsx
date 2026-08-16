import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import SplitWords from '@/components/ui/SplitWords';

/**
 * Yoca — services index (Server Component).
 * Six capabilities as one continuous, numbered index — hairline rows instead
 * of cards. Each row: number · name · what changes. The whole row is the link;
 * on hover the start rule fills lime and the arrow travels.
 */

const SERVICE_SLUGS = ['brand-strategy-identity', 'web-digital-experiences', 'growth-performance', 'creative-production', 'ai-automation', 'digital-product-development'];

interface ServicesGridProps {
  t: Dict['services'];
  ctaLabel: string;
  base: string;
}

export default function ServicesGrid({ t, ctaLabel, base }: ServicesGridProps) {
  return (
    <section className="relative z-[7] bg-surface-deep py-20 lg:py-32">
      <div className="container-y">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <h2 className="max-w-[16ch] text-[clamp(34px,4.6vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            <SplitWords text={t.heading} />
          </h2>
          <p className="max-w-[46ch] text-[16px] leading-relaxed text-muted lg:justify-self-end lg:text-[17px]">
            {t.sub}
          </p>
        </div>

        <ol className="mt-12 border-t border-line lg:mt-16">
          {t.items.map((service, index) => (
            <li key={service.name} className="border-b border-line">
              <Link
                href={`${base}/services/${SERVICE_SLUGS[index] ?? ''}`}
                className="group relative grid items-start gap-3 py-6 ps-6 pe-2 transition-colors duration-300 hover:bg-surface md:grid-cols-[64px_minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-8 md:py-8 lg:ps-8"
              >
                {/* Start rule — hairline at rest, lime on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 start-0 w-px bg-line transition-colors duration-300 group-hover:w-[3px] group-hover:bg-yoca-lime"
                />
                <span className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime md:pt-1.5">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[clamp(20px,2vw,28px)] font-extrabold leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-white">
                  {service.name}
                </h3>
                <div className="grid gap-2">
                  <p className="text-[15px] leading-relaxed text-muted">{service.desc}</p>
                  <p className="flex items-start gap-2 text-[14px] font-bold leading-relaxed text-soft">
                    <span aria-hidden="true" className="slant mt-[6px] block h-2 w-2.5 flex-none bg-yoca-lime" />
                    {service.changes}
                  </p>
                </div>
                <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-subtle transition-colors duration-300 group-hover:text-yoca-lime md:justify-self-end">
                  {t.explore}
                  <span aria-hidden="true" className="icon-arrow">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href={`${base}/services`} className="btn-ghost">
            {t.explore} <span aria-hidden="true" className="icon-arrow">→</span>
          </Link>
          <Link href={`${base}/contact`} className="btn-primary">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
