'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { Dict } from '@/lib/i18n';

/**
 * Yoca — Bento Grid 3-Feature Showcase (Apple/Vercel style).
 *
 * - Main card: animated micro-UI simulation (live-looking performance graph
 *   built with Framer Motion bars + a drawing line).
 * - Secondary cards: glassmorphism with lime/green soft-glow borders and a
 *   3D tilt effect that follows the cursor.
 */

interface BentoFeaturesProps {
  t: Dict['bento'];
}

const BARS = [34, 46, 41, 58, 52, 66, 74, 69, 82, 90];

function TiltCard({
  children,
  glow,
}: {
  children: React.ReactNode;
  glow: 'lime' | 'green';
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -7, ry: px * 9 });
  };

  const glowRgb = glow === 'lime' ? '162,255,0' : '64,196,1';

  return (
    <div style={{ perspective: '900px' }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.6 }}
        className="glass group relative h-full rounded-md p-7 transition-shadow duration-300"
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{
          boxShadow: `0 0 44px rgba(${glowRgb},0.16), inset 0 0 24px rgba(${glowRgb},0.05)`,
          borderColor: `rgba(${glowRgb},0.45)`,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function MicroGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative mt-8 rounded-md border border-line bg-black/50 p-5"
      aria-hidden="true"
    >
      {/* Browser-chrome dots */}
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-yoca-lime" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </div>
      {/* Animated bars */}
      <div className="flex h-28 items-end gap-2">
        {BARS.map((height, index) => (
          <motion.span
            key={index}
            className="flex-1 rounded-sm"
            style={{
              background:
                index >= BARS.length - 2
                  ? 'linear-gradient(180deg, #A2FF00, #40C401)'
                  : '#1B1B1B',
              border: '1px solid #292929',
            }}
            initial={{ height: prefersReducedMotion ? `${height}%` : '8%' }}
            animate={inView ? { height: `${height}%` } : undefined}
            transition={{ duration: 0.7, delay: 0.08 * index, ease: [0.22, 0.8, 0.3, 1] }}
          />
        ))}
      </div>
      {/* Rising trend line */}
      <svg viewBox="0 0 100 40" className="absolute inset-x-5 bottom-5 h-24 w-[calc(100%-2.5rem)]" fill="none">
        <motion.path
          d="M0 36 L11 30 L22 32 L33 24 L44 27 L55 19 L66 14 L77 17 L88 8 L100 3"
          stroke="#A2FF00"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}

export default function BentoFeatures({ t }: BentoFeaturesProps) {
  return (
    <section className="relative z-[7] py-20 lg:py-28">
      <div className="container-y">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
            {t.heading}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">{t.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Main feature card — spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <TiltCard glow="lime">
              <span className="inline-block rounded-sm border border-line px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-yoca-lime">
                {t.main.tag}
              </span>
              <h3 className="mt-4 text-2xl font-extrabold leading-snug lg:text-[28px]">
                {t.main.title}
              </h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{t.main.body}</p>
              <MicroGraph />
              <div className="mt-4 flex items-center justify-between text-[12px] font-semibold">
                <span className="text-yoca-green">{t.main.metric}</span>
                <span className="text-subtle">{t.main.metricLabel}</span>
              </div>
            </TiltCard>
          </div>

          {/* Secondary cards */}
          <div className="grid grid-cols-1 gap-5">
            <TiltCard glow="lime">
              <span className="text-[12px] font-extrabold tracking-[0.1em] text-yoca-lime">01</span>
              <h3 className="mt-3 text-xl font-extrabold leading-snug">{t.growth.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{t.growth.body}</p>
              <div className="mt-6 flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 bg-yoca-lime" />
                <span className="h-3 w-3 translate-y-1 bg-yoca-green" />
                <span className="h-3 w-3 translate-y-2 bg-surface-elevated" />
              </div>
            </TiltCard>
            <TiltCard glow="green">
              <span className="text-[12px] font-extrabold tracking-[0.1em] text-yoca-green">02</span>
              <h3 className="mt-3 text-xl font-extrabold leading-snug">{t.scale.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{t.scale.body}</p>
              <div className="mt-6 grid grid-cols-6 gap-1" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-full ${index < 8 ? 'bg-yoca-green/60' : 'bg-surface-elevated'}`}
                  />
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
