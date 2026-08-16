'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE_YOCA } from '@/lib/motion';

/**
 * Yoca — per-product motifs (client): each product speaks its own visual
 * language and moves in its own way when scrolled into view —
 * YocaServe: QR tiles resolve into a menu · WonKick: formation links draw ·
 * Demo Hub: browser tiles slide in · Labs: experiment modules pulse.
 * Static under reduced motion.
 */

export default function ProductMotif({ productKey }: { productKey: string }) {
  const reduced = useReducedMotion();
  const pop = (i: number) => ({
    initial: reduced ? false : { opacity: 0, scale: 0.6 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.35, delay: 0.04 * i, ease: EASE_YOCA },
  });
  if (productKey === 'yocaserve') {
    // QR / menu grid
    return (
      <svg viewBox="0 0 200 44" className="h-11 w-auto">
        {[0, 1, 2, 3, 4, 5, 6].map((col) =>
          [0, 1, 2].map((row) => (
            <motion.rect
              key={`${col}-${row}`}
              x={col * 15}
              y={row * 15}
              width="11"
              height="11"
              fill={(col + row) % 3 === 0 ? '#A2FF00' : (col * row) % 4 === 1 ? 'rgba(5,5,5,0.7)' : 'rgba(5,5,5,0.12)'}
              style={{ transformOrigin: `${col * 15 + 5.5}px ${row * 15 + 5.5}px` }}
              {...pop(col + row)}
            />
          )),
        )}
        <rect x="120" y="0" width="80" height="8" fill="rgba(5,5,5,0.25)" />
        <rect x="120" y="14" width="62" height="8" fill="rgba(5,5,5,0.14)" />
        <rect x="120" y="28" width="70" height="8" fill="rgba(5,5,5,0.14)" />
      </svg>
    );
  }
  if (productKey === 'wonkick') {
    // Squad grid (formation)
    return (
      <svg viewBox="0 0 200 44" className="h-11 w-auto">
        {[[16, 32], [56, 10], [56, 32], [96, 20], [136, 8], [136, 34], [176, 20]].map(([x, y], i) => (
          <rect key={i} x={x} y={y - 6} width="12" height="12" fill={i === 3 ? '#A2FF00' : i > 4 ? '#40C401' : 'rgba(5,5,5,0.55)'} />
        ))}
        <motion.path
          d="M 22 32 L 62 16 M 62 38 L 102 26 M 102 26 L 142 14 M 102 26 L 142 40 M 142 14 L 182 26"
          stroke="rgba(5,5,5,0.2)"
          strokeWidth="1.5"
          fill="none"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_YOCA }}
        />
      </svg>
    );
  }
  if (productKey === 'demo-hub') {
    // Tile showcase
    return (
      <svg viewBox="0 0 200 44" className="h-11 w-auto">
        {[
          [0, 0, 58, 44, 'rgba(5,5,5,0.14)'],
          [66, 0, 58, 20, '#A2FF00'],
          [66, 26, 58, 18, 'rgba(5,5,5,0.25)'],
          [132, 0, 30, 44, 'rgba(5,5,5,0.10)'],
          [170, 0, 30, 28, '#40C401'],
          [170, 34, 30, 10, 'rgba(5,5,5,0.14)'],
        ].map(([x, y, w, h, fill], i) => (
          <motion.rect
            key={i}
            x={x as number}
            y={y as number}
            width={w as number}
            height={h as number}
            fill={fill as string}
            initial={reduced ? false : { opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.06 * i, ease: EASE_YOCA }}
          />
        ))}
      </svg>
    );
  }
  // labs — experiment modules
  return (
    <svg viewBox="0 0 200 44" className="h-11 w-auto">
      <rect x="0" y="12" width="20" height="20" fill="rgba(5,5,5,0.25)" />
      <motion.rect x="30" y="12" width="20" height="20" fill="none" stroke="#A2FF00" strokeWidth="1.5" strokeDasharray="4 3" animate={reduced ? undefined : { opacity: [1, 0.35, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
      <rect x="60" y="12" width="20" height="20" fill="#40C401" />
      <rect x="90" y="4" width="36" height="36" fill="none" stroke="rgba(5,5,5,0.3)" strokeWidth="1.5" />
      <rect x="100" y="14" width="16" height="16" fill="#A2FF00" />
      <rect x="140" y="12" width="20" height="20" fill="none" stroke="rgba(5,5,5,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="170" y="12" width="20" height="20" fill="none" stroke="rgba(5,5,5,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

