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
 * Each system carries a diagram that explains HOW it works, labelled with
 * the system's own (localized) points — no decorative filler:
 *   01 — Brand: one core, three touchpoints (radiating structure)
 *   02 — Growth: a closed loop — campaigns → conversion → content, repeating
 *   03 — Scale: layered framework whose capacity compounds upward
 */

interface SystemPillarsProps {
  t: Dict['systems'];
  base: string;
}

const GROUP_ANCHORS = ['brand', 'growth', 'scale'];

/** 01 — Brand System: one core → three touchpoints */
function BrandVisual({ reduced, active, points }: VisualProps) {
  const nodes = [46, 90, 134]; // y of the three touchpoints
  return (
    <svg viewBox="0 0 320 180" className="h-auto w-full" aria-hidden="true">
      {/* Core: the two brand modules + a solid block */}
      <motion.g
        initial={reduced ? false : { opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <polygon points="24,64 26.7,32 58.9,32 56.2,64" fill="#A2FF00" />
        <polygon points="42.5,64 74.6,64 71.9,96 39.8,96" fill="#40C401" />
        <rect x="24" y="104" width="34" height="34" fill={INK} />
      </motion.g>
      {/* Spine */}
      <line x1="96" y1="46" x2="96" y2="134" stroke={FAINT} strokeWidth="1.5" />
      <line x1="76" y1="90" x2="96" y2="90" stroke={FAINT} strokeWidth="1.5" />
      {nodes.map((y, index) => (
        <motion.g
          key={y}
          initial={reduced ? false : { opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.25 + index * 0.14 }}
        >
          <line x1="96" y1={y} x2="126" y2={y} stroke={FAINT} strokeWidth="1.5" />
          <rect x="126" y={y - 9} width="18" height="18" fill={index === 0 ? '#A2FF00' : index === 1 ? '#40C401' : INK} />
          <text x="154" y={y + 4} style={LABEL}>{points[index] ?? ''}</text>
        </motion.g>
      ))}
      {/* Hover: signal leaves the core and reaches every touchpoint */}
      {active && !reduced &&
        nodes.map((y, index) => (
          <motion.rect
            key={`pulse-${y}`}
            width="6"
            height="6"
            fill="#A2FF00"
            stroke={INK}
            strokeWidth="1"
            initial={{ x: 73, y: 87 }}
            animate={{ x: [73, 93, 93, 123], y: [87, 87, y - 3, y - 3] }}
            transition={{ duration: 1.4, delay: index * 0.18, repeat: Infinity, repeatDelay: 0.4, ease: 'easeInOut' }}
          />
        ))}
    </svg>
  );
}

/** 02 — Growth Engine: a closed loop that repeats */
function GrowthVisual({ reduced, active, points }: VisualProps) {
  const stations: Array<{ x: number; y: number; anchor: 'start' | 'middle' | 'end'; dy: number }> = [
    { x: 60, y: 44, anchor: 'start', dy: -16 },
    { x: 260, y: 44, anchor: 'end', dy: -16 },
    { x: 160, y: 138, anchor: 'middle', dy: 26 },
  ];
  const loop = 'M 60 44 L 260 44 L 160 138 Z';
  return (
    <svg viewBox="0 0 320 180" className="h-auto w-full" aria-hidden="true">
      <motion.path
        d={loop}
        fill="none"
        stroke={FAINT}
        strokeWidth="1.5"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
      {/* Direction ticks — the loop turns clockwise */}
      {[
        [160, 44, 0],
        [210, 91, 137],
        [110, 91, -137],
      ].map(([x, y, r], index) => (
        <polygon
          key={index}
          points="-4,-4 4,0 -4,4"
          fill={MID}
          transform={`translate(${x} ${y}) rotate(${r})`}
        />
      ))}
      {stations.map((station, index) => (
        <motion.g
          key={index}
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
          style={{ transformOrigin: `${station.x}px ${station.y}px` }}
        >
          <rect x={station.x - 10} y={station.y - 10} width="20" height="20" fill={index === 0 ? '#A2FF00' : index === 1 ? INK : '#40C401'} />
          <text x={station.x} y={station.y + station.dy} textAnchor={station.anchor} style={LABEL}>
            {points[index] ?? ''}
          </text>
        </motion.g>
      ))}
      {/* Centre readout: momentum bars — grow while the loop runs */}
      <g>
        {[0, 1, 2, 3].map((index) => (
          <motion.rect
            key={index}
            x={140 + index * 11}
            y={94 - index * 5}
            width="7"
            height={10 + index * 5}
            fill={index === 3 ? '#40C401' : FAINT}
            initial={reduced ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            animate={active && !reduced ? { scaleY: [1, 1.25, 1] } : undefined}
            transition={
              active && !reduced
                ? { duration: 1.2, delay: index * 0.1, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.4, delay: 0.9 + index * 0.08 }
            }
            style={{ transformOrigin: `${143 + index * 11}px 104px` }}
          />
        ))}
      </g>
      {/* Hover: a signal circulates the loop */}
      {active && !reduced && (
        <motion.rect
          width="7"
          height="7"
          fill="#A2FF00"
          stroke={INK}
          strokeWidth="1"
          initial={{ x: 56, y: 40 }}
          animate={{ x: [56, 256, 156, 56], y: [40, 40, 134, 40] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </svg>
  );
}

/** 03 — Scale Framework: layers whose capacity compounds upward */
function ScaleVisual({ reduced, active, points }: VisualProps) {
  const layers = [
    { y: 128, blocks: 1 },
    { y: 84, blocks: 2 },
    { y: 40, blocks: 4 },
  ];
  return (
    <svg viewBox="0 0 320 180" className="h-auto w-full" aria-hidden="true">
      {layers.map((layer, index) => (
        <motion.g
          key={layer.y}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 + index * 0.16 }}
        >
          {/* Layer plate */}
          <rect x="24" y={layer.y} width="272" height="30" fill="none" stroke={FAINT} strokeWidth="1.5" />
          <rect x="24" y={layer.y} width="4" height="30" fill={index === 2 ? '#A2FF00' : index === 1 ? '#40C401' : INK} />
          <text x="40" y={layer.y + 19} style={LABEL}>{points[index] ?? ''}</text>
          {/* Capacity blocks: 1 → 2 → 4 */}
          {Array.from({ length: layer.blocks }).map((_, block) => (
            <motion.rect
              key={block}
              x={296 - 24 - block * 24}
              y={layer.y + 7}
              width="16"
              height="16"
              fill={index === 2 ? '#A2FF00' : index === 1 ? '#40C401' : INK}
              initial={reduced ? false : { opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={active && !reduced ? { opacity: [1, 0.35, 1] } : undefined}
              transition={
                active && !reduced
                  ? { duration: 1.4, delay: block * 0.12 + index * 0.1, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.35, delay: 0.5 + index * 0.16 + block * 0.08 }
              }
              style={{ transformOrigin: `${296 - 16 - block * 24}px ${layer.y + 15}px` }}
            />
          ))}
        </motion.g>
      ))}
      {/* Rising connector: bottom layer feeds the next */}
      <motion.path
        d="M 160 128 L 160 114 M 160 84 L 160 70"
        stroke={MID}
        strokeWidth="1.5"
        strokeDasharray="3 3"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
    </svg>
  );
}

const VISUALS = [BrandVisual, GrowthVisual, ScaleVisual];

export default function SystemPillars({ t, base }: SystemPillarsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="section-light relative z-[7] py-20 lg:py-32" aria-label={t.heading}>
      <div className="container-y">
        {/* Section head — heading start, sub end (editorial spread) */}
        <div className="grid gap-6 border-b border-[rgba(5,5,5,0.16)] pb-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <h2 className="max-w-[16ch] text-[clamp(34px,4.6vw,64px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
            {t.heading}
          </h2>
          <p className="light-muted max-w-[46ch] text-[16px] leading-relaxed lg:justify-self-end lg:text-[17px]">
            {t.sub}
          </p>
        </div>

        {/* Three systems as full-width numbered rows — one sequence, read top to bottom */}
        <ol>
          {t.items.map((system, index) => {
            const Visual = VISUALS[index] ?? BrandVisual;
            const active = hovered === index;
            return (
              <motion.li
                key={system.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: EASE_YOCA }}
                className="border-b border-[rgba(5,5,5,0.16)]"
              >
                <Link
                  href={`${base}/services#${GROUP_ANCHORS[index] ?? ''}`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  className="group grid gap-8 py-10 transition-colors duration-300 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,5fr)] lg:gap-10 lg:py-14"
                >
                  {/* Giant numeral — outlined at rest, filled lime on hover */}
                  <div className="flex items-start justify-between lg:block">
                    <span
                      aria-hidden="true"
                      className={`block text-[clamp(64px,8vw,120px)] font-extrabold leading-[0.85] tracking-[-0.05em] transition-colors duration-300 ${
                        active ? 'text-yoca-green' : 'text-[rgba(5,5,5,0.16)]'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`slant mt-1 block h-3.5 w-4 transition-colors duration-300 lg:mt-6 ${
                        active ? 'bg-yoca-lime' : 'bg-[rgba(5,5,5,0.16)]'
                      }`}
                    />
                  </div>

                  <div>
                    <h3 className="text-[clamp(24px,2.4vw,34px)] font-extrabold leading-tight tracking-[-0.02em]">
                      {system.name}
                    </h3>
                    <p className="light-subtle mt-2 text-[12px] font-bold uppercase tracking-[0.14em]">
                      {system.tagline}
                    </p>
                    <p className="light-muted mt-5 max-w-[46ch] text-[16px] leading-relaxed">{system.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {system.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-[13px] font-bold">
                          <span aria-hidden="true" className="slant block h-2 w-2.5 flex-none bg-yoca-green" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="light-card p-6 lg:p-8">
                    <Visual reduced={!!prefersReducedMotion} active={active} points={system.points} />
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
