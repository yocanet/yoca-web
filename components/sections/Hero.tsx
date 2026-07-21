'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import HeroSymbol from '@/components/ui/HeroSymbol';
import type { Dict } from '@/lib/i18n';

/**
 * Yoca — homepage hero.
 * Two-column editorial layout: staggered copy on the start side, the
 * interactive fragmented-Y motion system on the end side.
 * CTA hierarchy: Start a Project (solid lime, → contact) is primary;
 * the free Digital Check-Up (border) is the secondary lead magnet.
 */

interface HeroProps {
  t: Dict['hero'];
  /** Locale base path, e.g. "/tr". */
  base: string;
}

export default function Hero({ t, base }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const item = (delay: number) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 0.8, 0.3, 1] as const },
  });

  return (
    <section className="relative z-[7] flex min-h-[92vh] items-center overflow-hidden bg-surface-deep pb-20 pt-40">
      {/* Grid lines backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(#1A1E26 1px, transparent 1px), linear-gradient(90deg, #1A1E26 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, #000 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at 50% 30%, #000 30%, transparent 75%)',
        }}
      />

      <div className="container-y relative grid items-center gap-14 lg:grid-cols-[7fr_4fr]">
        <div>
          <motion.p {...item(0)} className="eyebrow">
            {t.eyebrow}
          </motion.p>
          <motion.h1
            {...item(0.1)}
            className="mt-6 max-w-[18ch] text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t.title}
          </motion.h1>
          <motion.p
            {...item(0.2)}
            className="mt-6 max-w-[58ch] text-base leading-relaxed text-muted lg:text-[19px]"
          >
            {t.description}
          </motion.p>
          <motion.div {...item(0.3)} className="mt-9 flex flex-wrap gap-3.5">
            <Link href={`${base}/contact`} className="btn-primary px-8 py-4 text-base">
              {t.primaryCta}
            </Link>
            <Link href={`${base}/checkup`} className="btn-ghost px-8 py-4 text-base">
              {t.secondaryCta}
            </Link>
          </motion.div>
          <motion.p
            {...item(0.4)}
            className="mt-11 text-[13px] font-bold uppercase tracking-[0.16em] text-subtle"
          >
            {t.line}
          </motion.p>
        </div>

        <motion.div {...item(0.25)} className="max-lg:hidden">
          <HeroSymbol />
        </motion.div>
      </div>
    </section>
  );
}
