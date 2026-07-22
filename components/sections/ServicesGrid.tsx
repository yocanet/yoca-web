import Link from 'next/link';
import type { Dict } from '@/lib/i18n';

/** Yoca — six-capability services grid (Server Component). */

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
            <article
              key={service.name}
              className="group relative rounded-sm border border-line bg-surface p-6 pb-12 transition-colors duration-300 hover:border-yoca-green"
            >
              <span className="text-[12px] font-extrabold tracking-[0.1em] text-yoca-lime">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-extrabold leading-snug">{service.name}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{service.desc}</p>
              <p className="mt-3 flex items-start gap-2 border-t border-line pt-3 text-[13px] font-bold leading-relaxed text-yoca-lime/90">
                <span aria-hidden="true" className="mt-[5px] block h-1.5 w-1.5 flex-none bg-yoca-lime" />
                {service.changes}
              </p>
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-5 h-2 w-2 bg-surface-elevated transition-colors duration-300 group-hover:bg-yoca-lime"
              />
            </article>
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
