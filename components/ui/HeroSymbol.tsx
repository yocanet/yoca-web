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

const FRAGMENTS: Array<{ points: string; fill: string; depth: number; delay: number }> = [
  { points: '4,0 34,0 30,28 0,28', fill: '#A2FF00', depth: 26, delay: 0 },
  { points: '18,36 48,36 44,64 14,64', fill: '#40C401', depth: 40, delay: 0.9 },
  { points: '80,0 112,0 72,62 40,62', fill: '#FFFFFF', depth: 14, delay: 0.4 },
  { points: '40,62 72,62 60,126 28,126', fill: '#FFFFFF', depth: 20, delay: 1.3 },
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
      {/* Ambient glow behind the mark */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 55% 45%, rgba(162,255,0,0.14), transparent 70%)',
        }}
      />
      <motion.svg
        viewBox="-24 -17 160 160"
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
