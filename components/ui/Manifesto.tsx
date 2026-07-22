'use client';

import { motion } from 'framer-motion';

/**
 * Yoca — scroll-activated manifesto.
 * Four short lines ("Think clearly. / Build deliberately. / Measure honestly.
 * / Improve continuously.") reveal one by one as they enter the viewport,
 * with the key word snapping to Electric Lime.
 */

export default function Manifesto({ lines }: { lines: string[] }) {
  return (
    <div className="grid gap-3">
      {lines.map((line, index) => (
        <motion.p
          key={line}
          initial={{ opacity: 0.12, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6, delay: index * 0.12, ease: [0.21, 0.6, 0.35, 1] }}
          className="text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
        >
          <motion.span
            initial={{ color: 'rgba(244,244,241,1)' }}
            whileInView={{ color: index === lines.length - 1 ? '#A2FF00' : 'rgba(244,244,241,1)' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.12 }}
          >
            {line}
          </motion.span>
        </motion.p>
      ))}
    </div>
  );
}
