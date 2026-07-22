'use client';

import { motion } from 'framer-motion';
import { EASE_YOCA } from '@/lib/motion';

/**
 * Yoca — scroll-activated manifesto.
 * Each line sharpens to full contrast as it enters the viewport while the
 * others stay muted. No scroll locking, no forced animation — plain scroll.
 */

export default function Manifesto({ lines }: { lines: string[] }) {
  return (
    <div className="grid gap-3">
      {lines.map((line, index) => (
        <motion.p
          key={line}
          initial={{ opacity: 0.18, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: '-30% 0px -30% 0px' }}
          transition={{ duration: 0.5, delay: index * 0.05, ease: EASE_YOCA }}
          className="text-3xl font-extrabold leading-[1.15] tracking-tight text-soft sm:text-5xl lg:text-6xl"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
