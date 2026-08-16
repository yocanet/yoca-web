'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE_YOCA, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Yoca — signature type reveal.
 * Splits a heading into words; each word rises out of its own clipping box
 * (110% → 0) with a short stagger — type is "printed" onto the page rather
 * than faded in. `emphasis` words get the lime underline. Works in RTL
 * (words keep their order; letters inside a word are never split).
 * Static under prefers-reduced-motion.
 */

interface SplitWordsProps {
  text: string;
  emphasis?: string[];
  /** Start on mount ("load") or when scrolled into view ("view"). */
  trigger?: 'load' | 'view';
  delay?: number;
  stagger?: number;
  className?: string;
}

export default function SplitWords({
  text,
  emphasis = [],
  trigger = 'view',
  delay = 0,
  stagger = 0.045,
  className,
}: SplitWordsProps) {
  const reduced = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const isEmphasis = (word: string) => emphasis.some((e) => word.replace(/[^\p{L}\p{N}]/gu, '') === e.replace(/[^\p{L}\p{N}]/gu, ''));

  if (reduced) {
    return (
      <span className={className}>
        {words.map((word, index) => (
          <span key={index}>
            {isEmphasis(word) ? <span className="underline decoration-yoca-lime decoration-[0.045em] underline-offset-[0.06em]">{word}</span> : word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    );
  }

  const inner = (index: number) => ({
    initial: { y: '110%' },
    ...(trigger === 'load' ? { animate: { y: '0%' } } : { whileInView: { y: '0%' }, viewport: VIEWPORT_ONCE }),
    transition: { duration: 0.7, delay: delay + index * stagger, ease: EASE_YOCA },
  });

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
          <motion.span {...inner(index)} className="inline-block">
            {isEmphasis(word) ? (
              <span className="underline decoration-yoca-lime decoration-[0.045em] underline-offset-[0.06em]">{word}</span>
            ) : (
              word
            )}
          </motion.span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
