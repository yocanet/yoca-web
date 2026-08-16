'use client';

import { motion } from 'framer-motion';
import { EASE_YOCA } from '@/lib/motion';

/**
 * Yoca — scroll-activated manifesto.
 * Each line sharpens to full contrast as it enters the viewport while the
 * others stay muted. No scroll locking, no forced animation — plain scroll.
 */

export default function Manifesto({ lines, tone = 'dark' }: { lines: string[]; tone?: 'dark' | 'light' }) {
  const ink = tone === 'light' ? 'text-[#050505]' : 'text-soft';
  return (
    <div className="grid gap-2">
      {lines.map((line, index) => (
        <motion.p
          key={line}
          initial={{ opacity: 0.16, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-30% 0px -30% 0px' }}
          transition={{ duration: 0.5, delay: index * 0.05, ease: EASE_YOCA }}
          className={`text-[clamp(34px,6vw,92px)] font-extrabold leading-[1.06] tracking-[-0.035em] ${ink}`}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
