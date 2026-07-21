import Link from 'next/link';
import type { Dict } from '@/lib/i18n';

/** Yoca — final call-to-action band. */

interface CtaSectionProps {
  t: Dict['cta'];
}

export default function CtaSection({ t }: CtaSectionProps) {
  return (
    <section className="relative z-[7] py-24 text-center lg:py-36">
      <div className="container-y grid justify-items-center">
        <span aria-hidden="true" className="mb-7 inline-flex gap-2">
          <span className="h-3.5 w-3.5 bg-yoca-lime" />
          <span className="h-3.5 w-3.5 bg-yoca-green" />
          <span className="h-3.5 w-3.5 bg-surface-elevated" />
        </span>
        <h2 className="max-w-[22ch] text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {t.heading}
        </h2>
        <p className="mt-5 max-w-[54ch] text-[17px] leading-relaxed text-muted">{t.body}</p>
        <Link href="/checkup" className="btn-primary mt-9 px-8 py-4 text-base">
          {t.button}
        </Link>
      </div>
    </section>
  );
}
