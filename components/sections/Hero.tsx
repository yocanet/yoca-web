'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import HeroSymbol from '@/components/ui/HeroSymbol';
import type { Dict } from '@/lib/i18n';
import { DUR, EASE_YOCA } from '@/lib/motion';

/**
 * Yoca — homepage hero.
 * Full-viewport, type-led. Staggered copy on the start side; the real Yoca
 * mark at architectural scale on the end side, assembling itself on load.
 * A bottom rail carries the three-system order (01 → 02 → 03) and a scroll
 * pulse; the index line lives in the lime brand band directly below.
 * CTA hierarchy: Start a Project (solid lime, → contact) is primary;
 * the free Digital Check-Up (border) is the secondary lead magnet.
 */

interface HeroProps {
  t: Dict['hero'];
  /** Locale base path, e.g. "/tr". */
  base: string;
  /** System names for the bottom rail (01 → 02 → 03). */
  rail?: string[];
}

/**
 * Controlled typographic emphasis: the key words ("brands", "systems" and
 * their localized equivalents) get a thin lime underline — no neon, no loop.
 */
function EmphasisTitle({ title, words }: { title: string; words: string[] }) {
  let parts: Array<{ text: string; hit: boolean }> = [{ text: title, hit: false }];
  for (const word of words) {
    const next: typeof parts = [];
    for (const part of parts) {
      if (part.hit || !part.text.includes(word)) {
        next.push(part);
        continue;
      }
      const at = part.text.indexOf(word);
      if (at > 0) next.push({ text: part.text.slice(0, at), hit: false });
      next.push({ text: word, hit: true });
      if (at + word.length < part.text.length) {
        next.push({ text: part.text.slice(at + word.length), hit: false });
      }
    }
    parts = next;
  }
  return (
    <>
      {parts.map((part, index) =>
        part.hit ? (
          <span
            key={index}
            className="underline decoration-yoca-lime decoration-[0.05em] underline-offset-[0.14em]"
          >
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
}

export default function Hero({ t, base, rail = [] }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const item = (delay: number) => ({
    initial: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.slow, delay, ease: EASE_YOCA },
  });

  return (
    <section className="relative z-[7] flex min-h-[100svh] flex-col overflow-hidden bg-surface-deep pt-32 lg:pt-36">
      {/* Grid lines backdrop — fades toward the rail */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(#1A1E26 1px, transparent 1px), linear-gradient(90deg, #1A1E26 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(180deg, #000 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, #000 55%, transparent 100%)',
        }}
      />

      <div className="container-y relative grid flex-1 items-center gap-12 py-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        <div className="relative z-10">
          <motion.p {...item(0)} className="eyebrow">
            {t.eyebrow}
          </motion.p>
          <motion.h1
            {...item(0.1)}
            className="mt-7 max-w-[15ch] text-[clamp(42px,5.8vw,86px)] font-extrabold leading-[0.98] tracking-[-0.03em]"
          >
            <EmphasisTitle title={t.title} words={t.emphasis} />
          </motion.h1>
          <motion.p
            {...item(0.2)}
            className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-muted lg:text-[19px]"
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
        </div>

        {/* The mark — allowed to run past the container edge on wide screens */}
        <motion.div
          {...item(0.15)}
          className="relative max-lg:mx-auto max-lg:w-[min(70vw,340px)] lg:-me-[6vw] lg:justify-self-end lg:w-[min(38vw,560px)]"
        >
          <HeroSymbol />
        </motion.div>
      </div>

      {/* Bottom rail: index line · system order · scroll hint */}
      <motion.div {...item(0.45)} className="container-y relative">
        <div className="module-rule" />
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-6">
          {rail.length > 0 && (
            <ol className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-bold uppercase tracking-[0.12em] text-subtle">
              {rail.map((name, index) => (
                <li key={name} className="flex items-center gap-2">
                  <span className="text-yoca-lime">{String(index + 1).padStart(2, '0')}</span>
                  <span>{name}</span>
                  {index < rail.length - 1 && (
                    <span aria-hidden="true" className="ms-4 block h-px w-6 bg-line" />
                  )}
                </li>
              ))}
            </ol>
          )}
          <span aria-hidden="true" className="hidden h-8 w-px overflow-hidden bg-line lg:block">
            <motion.span
              className="block h-full w-full bg-yoca-lime"
              animate={prefersReducedMotion ? undefined : { y: ['-100%', '100%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
