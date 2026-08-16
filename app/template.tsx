'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_YOCA } from '@/lib/motion';

/**
 * Yoca — page transition (App Router template).
 * A slanted Electric Lime wipe (the mark's 4.83° lean) sweeps off the page
 * toward the end edge while the content rises in beneath it. Header stays
 * outside the wipe; nothing under prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [wipeDone, setWipeDone] = useState(false);

  // Safety net: the wipe is removed from the DOM once it finishes — and no
  // later than 1.2s regardless (background tabs pause rAF-driven animation).
  useEffect(() => {
    const timer = window.setTimeout(() => setWipeDone(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <>
      {!wipeDone && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[95] bg-yoca-lime"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          animate={{ clipPath: 'polygon(100% 0, 108% 0, 100% 100%, 92% 100%)' }}
          transition={{ duration: 0.62, ease: EASE_YOCA }}
          onAnimationComplete={() => setWipeDone(true)}
          style={{ willChange: 'clip-path' }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: EASE_YOCA }}
      >
        {children}
      </motion.div>
    </>
  );
}
