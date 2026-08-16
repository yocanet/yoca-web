'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Dict } from '@/lib/i18n';
import { EASE_YOCA } from '@/lib/motion';

/**
 * Yoca — interactive services index (client).
 * Six hairline rows; on pointer devices (≥ lg) a sticky preview panel
 * crossfades between one composition per capability — identity system,
 * responsive UI, measurement, editorial media, workflow nodes, product UI.
 * Every row's description and "what changes" line stay visible on all
 * devices, so nothing is hover-only. Keyboard focus drives the preview too.
 */

const SERVICE_SLUGS = ['brand-strategy-identity', 'web-digital-experiences', 'growth-performance', 'creative-production', 'ai-automation', 'digital-product-development'];

interface ServicesIndexProps {
  t: Dict['services'];
  base: string;
}

/** Six abstract compositions — brand geometry only, no stock imagery. */
function Preview({ index, reduced }: { index: number; reduced: boolean }) {
  const common = { initial: reduced ? false : { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.02 }, transition: { duration: 0.4, ease: EASE_YOCA } };
  return (
    <AnimatePresence mode="wait">
      <motion.svg key={index} viewBox="0 0 320 220" className="h-auto w-full" aria-hidden="true" {...common}>
        {index === 0 && (
          <g>
            {/* Identity system: mark modules + type block + swatches */}
            <polygon points="30,60 32.7,28 64.9,28 62.2,60" fill="#A2FF00" />
            <polygon points="48.5,60 80.7,60 78,92 45.8,92" fill="#40C401" />
            <rect x="30" y="100" width="34" height="34" fill="#FFFFFF" />
            <text x="120" y="70" fontSize="52" fontWeight="800" fill="#FFFFFF" letterSpacing="-2">Aa</text>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x={120 + i * 30} y="100" width="22" height="22" fill={i === 0 ? '#A2FF00' : i === 1 ? '#40C401' : `rgba(255,255,255,${0.9 - i * 0.14})`} />
            ))}
            {[0, 1, 2].map((i) => <rect key={i} x="120" y={150 + i * 16} width={170 - i * 40} height="6" fill="rgba(255,255,255,0.18)" />)}
          </g>
        )}
        {index === 1 && (
          <g>
            {/* Responsive UI: desktop + phone frames */}
            <rect x="24" y="30" width="200" height="130" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
            <rect x="24" y="30" width="200" height="14" fill="rgba(255,255,255,0.12)" />
            <rect x="40" y="60" width="90" height="10" fill="#FFFFFF" />
            <rect x="40" y="78" width="120" height="6" fill="rgba(255,255,255,0.3)" />
            <rect x="40" y="90" width="100" height="6" fill="rgba(255,255,255,0.3)" />
            <rect x="40" y="112" width="52" height="18" fill="#A2FF00" />
            <motion.rect x="240" y="60" width="56" height="120" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" initial={reduced ? false : { y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }} />
            <rect x="248" y="78" width="40" height="8" fill="#FFFFFF" />
            <rect x="248" y="92" width="32" height="5" fill="rgba(255,255,255,0.3)" />
            <rect x="248" y="150" width="40" height="14" fill="#A2FF00" />
          </g>
        )}
        {index === 2 && (
          <g>
            {/* Measurement: bars + line, one green target */}
            {[70, 96, 82, 118, 140, 168].map((h, i) => (
              <motion.rect key={i} x={30 + i * 44} y={190 - h} width="26" height={h} fill={i === 5 ? '#40C401' : 'rgba(255,255,255,0.16)'} initial={reduced ? false : { scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.05 * i, duration: 0.45 }} style={{ transformOrigin: `${43 + i * 44}px 190px` }} />
            ))}
            <motion.path d="M 43 130 L 87 108 L 131 118 L 175 90 L 219 70 L 263 42" fill="none" stroke="#A2FF00" strokeWidth="2.5" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.7 }} />
          </g>
        )}
        {index === 3 && (
          <g>
            {/* Editorial media: overlapping frames */}
            <rect x="30" y="40" width="150" height="100" fill="rgba(255,255,255,0.10)" />
            <rect x="110" y="70" width="150" height="100" fill="rgba(255,255,255,0.18)" />
            <rect x="70" y="120" width="110" height="70" fill="#A2FF00" />
            <rect x="200" y="30" width="60" height="30" fill="#40C401" />
            <text x="200" y="196" fontSize="12" fontWeight="800" fill="rgba(255,255,255,0.6)" letterSpacing="2">04</text>
          </g>
        )}
        {index === 4 && (
          <g>
            {/* Workflow nodes */}
            {[[40, 60], [130, 40], [130, 110], [220, 75], [280, 150]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="26" height="26" fill={i === 3 ? '#A2FF00' : i === 4 ? '#40C401' : 'rgba(255,255,255,0.7)'} />
            ))}
            <motion.path d="M 66 73 L 130 53 M 66 73 L 130 123 M 156 53 L 220 88 M 156 123 L 220 88 M 246 88 L 280 163" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
          </g>
        )}
        {index === 5 && (
          <g>
            {/* Product UI: app shell */}
            <rect x="30" y="30" width="260" height="160" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
            <rect x="30" y="30" width="70" height="160" fill="rgba(255,255,255,0.08)" />
            {[0, 1, 2, 3].map((i) => <rect key={i} x="42" y={50 + i * 22} width="46" height="8" fill={i === 0 ? '#A2FF00' : 'rgba(255,255,255,0.3)'} />)}
            {[0, 1, 2].map((i) => (
              <motion.rect key={i} x={116 + i * 58} y="50" width="50" height="40" fill="rgba(255,255,255,0.14)" initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i, duration: 0.35 }} />
            ))}
            <rect x="116" y="106" width="162" height="70" fill="rgba(255,255,255,0.08)" />
            <rect x="128" y="120" width="80" height="8" fill="#FFFFFF" />
            <rect x="128" y="136" width="120" height="5" fill="rgba(255,255,255,0.3)" />
            <rect x="128" y="154" width="44" height="12" fill="#40C401" />
          </g>
        )}
      </motion.svg>
    </AnimatePresence>
  );
}

export default function ServicesIndex({ t, base }: ServicesIndexProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
      <ol className="border-t border-line">
        {t.items.map((service, index) => (
          <li key={service.name} className="border-b border-line">
            <Link
              href={`${base}/services/${SERVICE_SLUGS[index] ?? ''}`}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={`group relative grid items-start gap-3 py-6 ps-6 pe-2 transition-colors duration-300 hover:bg-surface md:grid-cols-[56px_minmax(0,1fr)_auto] md:gap-6 md:py-7 ${active === index ? 'lg:bg-surface' : ''}`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 start-0 w-px bg-line transition-all duration-300 group-hover:w-[3px] group-hover:bg-yoca-lime ${active === index ? 'lg:w-[3px] lg:bg-yoca-lime' : ''}`}
              />
              <span className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime md:pt-1.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="block text-[clamp(20px,2vw,28px)] font-extrabold leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-white">
                  {service.name}
                </span>
                <span className="mt-2 block text-[14px] leading-relaxed text-muted">{service.desc}</span>
                <span className="mt-2 flex items-start gap-2 text-[13px] font-bold leading-relaxed text-soft">
                  <span aria-hidden="true" className="slant mt-[6px] block h-2 w-2.5 flex-none bg-yoca-lime" />
                  {service.changes}
                </span>
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-subtle transition-colors duration-300 group-hover:text-yoca-lime md:justify-self-end">
                {t.explore}
                <span aria-hidden="true" className="icon-arrow">↗</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Sticky preview — desktop pointer devices */}
      <div className="hover-preview lg:sticky lg:top-28 lg:self-start">
        <div className="border border-line bg-surface p-6">
          <div className="mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-subtle">
            <span>{String(active + 1).padStart(2, '0')}</span>
            <span className="truncate ps-4">{t.items[active]?.name}</span>
          </div>
          <Preview index={active} reduced={!!reduced} />
        </div>
      </div>
    </div>
  );
}
