'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Yoca — page transition (App Router template).
 * A restrained geometric reveal: content fades in and rises 10px over 300ms.
 * No wipes over the header (it lives outside), no scroll hijacking, and no
 * motion at all under prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 0.8, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
