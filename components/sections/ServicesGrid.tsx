import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import SplitWords from '@/components/ui/SplitWords';
import ServicesIndex from '@/components/sections/ServicesIndex';

/**
 * Yoca — services index (Server Component).
 * Six capabilities as one continuous, numbered index — hairline rows instead
 * of cards. Each row: number · name · what changes. The whole row is the link;
 * on hover the start rule fills lime and the arrow travels.
 */

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

        <ServicesIndex t={t} base={base} />

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
