'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Yoca — scroll-reveal wrapper.
 * Fades and rises content into view the first time it enters the viewport.
 * Honors reduced-motion preferences via framer-motion's built-in handling.
 */

interface RevealProps {
  children: ReactNode;
  /** Extra delay in seconds (for staggering siblings). */
  delay?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.6, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
