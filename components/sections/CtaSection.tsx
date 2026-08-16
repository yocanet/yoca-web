import Link from 'next/link';
import type { Dict } from '@/lib/i18n';
import BrandMark from '@/components/ui/BrandMark';
import SplitWords from '@/components/ui/SplitWords';
import Magnetic from '@/components/ui/Magnetic';

/** Yoca — final call-to-action band (primary CTA → contact). */

interface CtaSectionProps {
  t: Dict['cta'];
  base: string;
}

export default function CtaSection({ t, base }: CtaSectionProps) {
  return (
    <section className="relative z-[7] overflow-hidden border-t border-line bg-surface-deep py-24 text-center lg:py-36">
      {/* Oversized mark bleeding off the end edge — the one place it appears large */}
      <BrandMark
        className="pointer-events-none absolute -bottom-10 -end-8 h-[min(52vw,340px)] w-auto opacity-[0.07] rtl:-scale-x-100"
        ink="#FFFFFF"
      />
      <div className="container-y relative grid justify-items-center">
        <BrandMark variant="modules" className="mb-7 h-9 w-auto" />
        <h2 className="max-w-[18ch] text-[clamp(34px,4.6vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          <SplitWords text={t.heading} />
        </h2>
        <p className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-muted">{t.body}</p>
        <Magnetic className="mt-9">
          <Link href={`${base}/contact`} className="btn-primary px-8 py-4 text-base">
            {t.button}
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
