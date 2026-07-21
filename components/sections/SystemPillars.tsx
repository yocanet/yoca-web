'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Dict } from '@/lib/i18n';

/**
 * Yoca — system architecture as three interactive columns.
 * Canonical order (never changes): 01 Yoca Brand System™ →
 * 02 Yoca Growth Engine™ → 03 Yoca Scale Framework™.
 * Each card links to its umbrella on the Services page.
 */

interface SystemPillarsProps {
  t: Dict['systems'];
  base: string;
}

const GROUP_ANCHORS = ['brand', 'growth', 'scale'];

export default function SystemPillars({ t, base }: SystemPillarsProps) {
  return (
    <section
      className="relative z-[7] bg-surface py-20 lg:py-28"
      aria-label={t.heading}
    >
      <div className="container-y">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">{t.sub}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {t.items.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.21, 0.6, 0.35, 1] }}
            >
              <Link
                href={`${base}/services#${GROUP_ANCHORS[index] ?? ''}`}
                className="group flex h-full flex-col rounded-md border border-line bg-surface-deep/70 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-yoca-lime/50 lg:p-9"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    aria-hidden="true"
                    className="block h-2.5 w-2.5 bg-surface-elevated transition-colors duration-300 group-hover:bg-yoca-lime"
                  />
                </div>
                <h3 className="mt-5 text-xl font-extrabold tracking-tight">{system.name}</h3>
                <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
                  {system.tagline}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{system.body}</p>
                <ul className="mt-6 grid gap-2 border-t border-line pt-5">
                  {system.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-[13px] font-semibold text-soft">
                      <span
                        aria-hidden="true"
                        className="mt-[6px] block h-1.5 w-1.5 flex-none bg-yoca-green"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <span
                  aria-hidden="true"
                  className="mt-auto block h-[3px] w-0 translate-y-6 bg-yoca-lime transition-all duration-300 group-hover:w-full"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
