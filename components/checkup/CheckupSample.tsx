'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE_YOCA } from '@/lib/motion';

/**
 * Yoca — Digital Check-Up sample visualisation.
 * A clearly-labelled EXAMPLE score card: the total counts up from 0, category
 * bars fill with a stagger. Values are fixed illustrations, never user data,
 * and the label/note come from the dictionary in every locale.
 */

interface CheckupSampleProps {
  title: string;
  sampleLabel: string;
  note: string;
  /** Localized category labels (from the wizard's section list). */
  categories: Array<{ label: string; value: number }>;
  total: number;
  /** "light" = on the lime band (black ink). */
  tone?: 'light' | 'dark';
}

function useCountUp(target: number, run: boolean, duration = 1.1) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return value;
}

export default function CheckupSample({ title, sampleLabel, note, categories, total, tone = 'light' }: CheckupSampleProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const run = inView && !reduced;
  const counted = useCountUp(total, run);
  const shown = reduced ? total : counted;
  const ink = tone === 'light' ? 'text-black' : 'text-white';
  const faint = tone === 'light' ? 'bg-black/15' : 'bg-white/15';
  const bar = tone === 'light' ? 'bg-black' : 'bg-yoca-lime';
  const muted = tone === 'light' ? 'text-black/65' : 'text-muted';

  return (
    <div ref={ref} className={`w-full max-w-[420px] border ${tone === 'light' ? 'border-black/25' : 'border-line'} p-6 lg:p-7`} aria-label={`${title} — ${sampleLabel}`}>
      <div className="flex items-start justify-between gap-4">
        <span className={`text-[11px] font-extrabold uppercase tracking-[0.14em] ${muted}`}>{title}</span>
        <span className={`slant px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] ${tone === 'light' ? 'bg-black text-white' : 'bg-yoca-lime text-black'}`}>
          {sampleLabel}
        </span>
      </div>
      <p className={`mt-3 text-[56px] font-extrabold leading-none tracking-[-0.04em] tabular-nums ${ink}`}>
        {shown}
        <span className={`text-[20px] font-bold ${muted}`}> / 100</span>
      </p>
      <ul className="mt-6 grid gap-3">
        {categories.map((category, index) => (
          <li key={category.label} className="grid grid-cols-[minmax(0,1fr)_40px] items-center gap-3 text-[13px] font-bold">
            <span className="flex items-center gap-3">
              <span className={`w-[92px] flex-none truncate ${muted}`}>{category.label}</span>
              <span className={`relative h-1.5 flex-1 overflow-hidden ${faint}`}>
                <motion.span
                  className={`absolute inset-y-0 start-0 ${bar}`}
                  initial={reduced ? false : { width: '0%' }}
                  animate={{ width: run || reduced ? `${category.value}%` : '0%' }}
                  transition={{ duration: 0.9, delay: 0.2 + index * 0.1, ease: EASE_YOCA }}
                />
              </span>
            </span>
            <span className={`text-end tabular-nums ${ink}`}>{category.value}</span>
          </li>
        ))}
      </ul>
      <p className={`mt-5 text-[11px] leading-relaxed ${muted}`}>{note}</p>
    </div>
  );
}
