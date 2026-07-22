import Link from 'next/link';
import type { Dict } from '@/lib/i18n';

/** Yoca — six-capability services grid (Server Component). */

const SERVICE_SLUGS = ['brand-strategy-identity', 'web-digital-experiences', 'growth-performance', 'creative-production', 'ai-automation', 'digital-product-development'];

interface ServicesGridProps {
  t: Dict['services'];
  ctaLabel: string;
  base: string;
}

export default function ServicesGrid({ t, ctaLabel, base }: ServicesGridProps) {
  return (
    <section className="relative z-[7] border-t border-line bg-surface-deep py-20 lg:py-28">
      <div className="container-y">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">{t.sub}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((service, index) => (
            <Link
              key={service.name}
              href={`${base}/services/${SERVICE_SLUGS[index] ?? ''}`}
              className="group relative block rounded-sm border border-line bg-surface p-6 pb-14 transition-colors duration-300 hover:border-yoca-green"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[12px] font-extrabold tracking-[0.1em] text-yoca-lime">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {/* Hover fragment: three modular squares assemble */}
                <span aria-hidden="true" className="flex gap-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <span className="block h-1.5 w-1.5 translate-y-1 bg-yoca-lime transition-transform duration-300 group-hover:translate-y-0" />
                  <span className="block h-1.5 w-1.5 -translate-y-1 bg-yoca-green transition-transform duration-300 group-hover:translate-y-0" />
                  <span className="block h-1.5 w-1.5 translate-y-0.5 bg-surface-elevated transition-transform duration-300 group-hover:translate-y-0" />
                </span>
              </div>
              <h3 className="mt-3 text-lg font-extrabold leading-snug">{service.name}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{service.desc}</p>
              <p className="mt-3 flex items-start gap-2 border-t border-line pt-3 text-[13px] font-bold leading-relaxed text-yoca-lime/90">
                <span aria-hidden="true" className="mt-[5px] block h-1.5 w-1.5 flex-none bg-yoca-lime" />
                {service.changes}
              </p>
              <span className="absolute bottom-4 start-6 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-subtle transition-colors duration-300 group-hover:text-yoca-lime">
                {t.explore}
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <Link href={`${base}/services`} className="btn-ghost">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
