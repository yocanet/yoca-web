'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Dict } from '@/lib/i18n';
import { EASE_YOCA } from '@/lib/motion';

/**
 * Yoca — the three systems on a soft-white editorial break.
 * Canonical order (never changes): 01 Yoca Brand System™ →
 * 02 Yoca Growth Engine™ → 03 Yoca Scale Framework™.
 * Each card carries its OWN visual language:
 *   01 — typographic fragments on a brand-architecture grid
 *   02 — data flow / funnel lines with performance nodes
 *   03 — expanding modular blocks (infrastructure & automation)
 */

interface SystemPillarsProps {
  t: Dict['systems'];
  base: string;
}

const GROUP_ANCHORS = ['brand', 'growth', 'scale'];

/** 01 — Brand: type fragment + architecture grid */
interface VisualProps {
  reduced: boolean;
  active: boolean;
}

function BrandVisual({ reduced, active }: VisualProps) {
  return (
    <svg viewBox="0 0 220 84" className="h-auto w-full" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 8 }).map((__, col) => (
          <rect
            key={`${row}-${col}`}
            x={4 + col * 28}
            y={6 + row * 26}
            width="20"
            height="18"
            fill="none"
            stroke="rgba(5,5,5,0.12)"
            strokeWidth="1"
          />
        )),
      )}
      <motion.text
        x="14"
        y="52"
        fontSize="44"
        fontWeight="800"
        fill="#050505"
        initial={reduced ? false : { opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Aa
      </motion.text>
      <motion.rect
        x="88"
        y="32"
        width="20"
        height="18"
        fill="#A2FF00"
        initial={reduced ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        animate={active && !reduced ? { x: [88, 116, 88] } : undefined}
        transition={
          active && !reduced
            ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.4, delay: 0.35 }
        }
      />
      <motion.rect
        x="144"
        y="6"
        width="20"
        height="18"
        fill="#050505"
        initial={reduced ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.45 }}
      />
      <motion.rect
        x="172"
        y="58"
        width="20"
        height="18"
        fill="#40C401"
        initial={reduced ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.55 }}
      />
    </svg>
  );
}

/** 02 — Growth: funnel lines + performance nodes */
function GrowthVisual({ reduced, active }: VisualProps) {
  const bars = [64, 46, 30, 18];
  return (
    <svg viewBox="0 0 220 84" className="h-auto w-full" aria-hidden="true">
      {bars.map((width, index) => (
        <motion.rect
          key={index}
          x={110 - width}
          y={8 + index * 18}
          width={width * 2}
          height="10"
          fill={index === bars.length - 1 ? '#40C401' : 'rgba(5,5,5,0.10)'}
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
          style={{ transformOrigin: '110px 0px' }}
        />
      ))}
      <motion.path
        d="M 20 70 L 70 54 L 120 60 L 170 30 L 208 14"
        fill="none"
        stroke="#A2FF00"
        strokeWidth="2.5"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      {/* Hover: a signal travels through the system and activates nodes */}
      {active && !reduced && (
        <motion.rect
          width="7"
          height="7"
          fill="#050505"
          stroke="#A2FF00"
          strokeWidth="1.5"
          initial={{ x: 16, y: 66 }}
          animate={{ x: [16, 66, 116, 166, 202], y: [66, 50, 56, 26, 10] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {[
        [70, 54],
        [170, 30],
      ].map(([x, y], index) => (
        <motion.rect
          key={index}
          x={x - 4}
          y={y - 4}
          width="8"
          height="8"
          fill="#050505"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 + index * 0.2 }}
        />
      ))}
    </svg>
  );
}

/** 03 — Scale: expanding modular blocks */
function ScaleVisual({ reduced, active }: VisualProps) {
  const blocks = [
    { x: 12, y: 48, s: 16, fill: '#050505' },
    { x: 36, y: 48, s: 16, fill: '#050505' },
    { x: 12, y: 24, s: 16, fill: '#050505' },
    { x: 36, y: 24, s: 16, fill: '#40C401' },
    { x: 68, y: 24, s: 40, fill: 'rgba(5,5,5,0.10)' },
    { x: 118, y: 12, s: 26, fill: '#A2FF00' },
    { x: 118, y: 46, s: 26, fill: 'rgba(5,5,5,0.10)' },
    { x: 154, y: 12, s: 60, fill: 'none' },
  ];
  return (
    <svg viewBox="0 0 220 84" className="h-auto w-full" aria-hidden="true">
      {blocks.map((block, index) => (
        <motion.rect
          key={index}
          x={block.x}
          y={block.y}
          width={block.s}
          height={block.s}
          fill={block.fill}
          stroke={block.fill === 'none' ? '#050505' : undefined}
          strokeWidth={block.fill === 'none' ? 1.5 : undefined}
          strokeDasharray={block.fill === 'none' ? '4 4' : undefined}
          initial={reduced ? false : { opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          animate={
            active && !reduced && block.fill === 'none'
              ? { opacity: [1, 0.4, 1], scale: [1, 1.06, 1] }
              : undefined
          }
          transition={
            active && !reduced && block.fill === 'none'
              ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.45, delay: 0.15 + index * 0.09 }
          }
          style={{ transformOrigin: `${block.x + block.s / 2}px ${block.y + block.s / 2}px` }}
        />
      ))}
    </svg>
  );
}

const VISUALS = [BrandVisual, GrowthVisual, ScaleVisual];

export default function SystemPillars({ t, base }: SystemPillarsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section-light relative z-[7] py-20 lg:py-28" aria-label={t.heading}>
      <div className="container-y">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {t.heading}
          </h2>
          <p className="light-muted mt-4 text-[16px] leading-relaxed">{t.sub}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {t.items.map((system, index) => {
            const Visual = VISUALS[index] ?? BrandVisual;
            return (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: EASE_YOCA }}
              >
                <Link
                  href={`${base}/services#${GROUP_ANCHORS[index] ?? ''}`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  className="light-card group flex h-full flex-col rounded-md p-7 transition-colors duration-300 hover:border-[#40C401] lg:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[13px] font-extrabold tracking-[0.1em] text-[#267800]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      aria-hidden="true"
                      className="block h-2.5 w-2.5 bg-[rgba(5,5,5,0.14)] transition-colors duration-300 group-hover:bg-yoca-lime"
                    />
                  </div>

                  <div className="mt-5">
                    <Visual reduced={!!prefersReducedMotion} active={hovered === index} />
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold tracking-tight">{system.name}</h3>
                  <p className="light-subtle mt-1 text-[12px] font-bold uppercase tracking-[0.12em]">
                    {system.tagline}
                  </p>
                  <p className="light-muted mt-4 text-[15px] leading-relaxed">{system.body}</p>
                  <ul className="mt-6 grid gap-2 border-t border-[rgba(5,5,5,0.12)] pt-5">
                    {system.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[13px] font-semibold">
                        <span
                          aria-hidden="true"
                          className="mt-[6px] block h-1.5 w-1.5 flex-none bg-yoca-green"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
