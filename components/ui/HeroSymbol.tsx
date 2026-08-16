'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/**
 * Yoca — interactive hero symbol.
 * The fragmented "Y" mark, exploded into its four brand fragments and driven
 * by pointer parallax: each fragment lives on its own depth layer, drifts
 * gently while idle and leans toward the cursor. Honors reduced motion.
 * (Faithful to the logo geometry — fragments are never redrawn or distorted.)
 */

/** Exact geometry of the Yoca mark (logo file, viewBox 0 0 250 69.05 → symbol crop). */
export const MARK = {
  lime: '0,16.71 1.36,0.62 17.54,0.62 16.18,16.71',
  green: '9.31,16.71 25.49,16.71 24.13,32.8 7.95,32.8',
  y: '50.92,0.62 67.43,0.62 42.59,69.04 26.18,69.04 33.49,48.91 15.43,48.91 16.66,32.8 39.56,32.8',
} as const;

const FRAGMENTS: Array<{ points: string; fill: string; depth: number; delay: number }> = [
  { points: MARK.lime, fill: '#A2FF00', depth: 26, delay: 0 },
  { points: MARK.green, fill: '#40C401', depth: 40, delay: 0.9 },
  { points: MARK.y, fill: '#FFFFFF', depth: 14, delay: 0.4 },
];

export default function HeroSymbol() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const rotate = useTransform(sx, [-1, 1], [-4, 4]);

  const handlePointer = (event: React.PointerEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointer}
      onPointerLeave={reset}
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[420px] select-none"
    >
      <motion.svg
        viewBox="-12 -8 92 88"
        className="h-auto w-full"
        style={{ rotate: prefersReducedMotion ? 0 : rotate }}
      >
        {FRAGMENTS.map((fragment, index) => (
          <Fragment
            key={index}
            fragment={fragment}
            sx={sx}
            sy={sy}
            reduced={!!prefersReducedMotion}
          />
        ))}
      </motion.svg>
    </div>
  );
}

function Fragment({
  fragment,
  sx,
  sy,
  reduced,
}: {
  fragment: (typeof FRAGMENTS)[number];
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  reduced: boolean;
}) {
  const x = useTransform(sx, [-1, 1], [fragment.depth / 2.4, -fragment.depth / 2.4]);
  const y = useTransform(sy, [-1, 1], [fragment.depth / 3, -fragment.depth / 3]);

  if (reduced) {
    return <polygon points={fragment.points} fill={fragment.fill} />;
  }

  return (
    <motion.g style={{ x, y }}>
      <motion.polygon
        points={fragment.points}
        fill={fragment.fill}
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1, y: [0, -3.5, 0] }}
        transition={{
          opacity: { duration: 0.7, delay: fragment.delay * 0.22 },
          scale: { duration: 0.7, delay: fragment.delay * 0.22 },
          y: {
            duration: 6.5,
            delay: fragment.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        style={{ transformOrigin: 'center' }}
      />
    </motion.g>
  );
}
