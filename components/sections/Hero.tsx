'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import type { Dict } from '@/lib/i18n';

/** Yoca — homepage hero with staggered reveal and drifting brand squares. */

interface HeroProps {
  t: Dict['hero'];
}

export default function Hero({ t }: HeroProps) {
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
            'linear-gradient(#141414 1px, transparent 1px), linear-gradient(90deg, #141414 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 30%, #000 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 80% at 50% 30%, #000 30%, transparent 75%)',
        }}
      />
      {/* Floating brand squares */}
      {!prefersReducedMotion && (
        <div aria-hidden="true" className="absolute inset-0 max-sm:hidden">
          {[
            { right: '16%', top: '24%', size: 22, color: '#A2FF00', delay: 0 },
            { right: '12.5%', top: '32%', size: 22, color: '#40C401', delay: 1.2 },
            { right: '19.5%', top: '40%', size: 22, color: '#1B1B1B', delay: 2 },
            { right: '26%', top: '58%', size: 12, color: '#A2FF00', delay: 1.8 },
          ].map((square, index) => (
            <motion.span
              key={index}
              className="absolute block"
              style={{
                right: square.right,
                top: square.top,
                width: square.size,
                height: square.size,
                background: square.color,
              }}
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 7, delay: square.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      <div className="container-y relative">
        <motion.p {...item(0)} className="eyebrow">
          {t.eyebrow}
        </motion.p>
        <motion.h1
          {...item(0.1)}
          className="mt-6 max-w-[18ch] text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-7xl"
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
          <Link href="/checkup" className="btn-primary px-8 py-4 text-base">
            {t.primaryCta}
          </Link>
          <a href="mailto:connect@yoca.net" className="btn-ghost px-8 py-4 text-base">
            {t.secondaryCta}
          </a>
        </motion.div>
        <motion.p
          {...item(0.4)}
          className="mt-11 text-[13px] font-bold uppercase tracking-[0.16em] text-subtle"
        >
          {t.line}
        </motion.p>
      </div>
    </section>
  );
}
