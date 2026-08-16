'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import type { CaseStudy } from '@/lib/workData';
import { DUR, EASE_YOCA } from '@/lib/motion';
import ProjectCover from '@/components/work/ProjectCover';

/**
 * Yoca — editorial Work grid (soft-white section).
 * Asymmetric desktop layout: the first card renders as a featured wide tile,
 * the rest alternate between standard and vertical scales. Every card carries
 * an honest status label (Client Case Study / Concept Project / Yoca Product /
 * Experimental); metric badges appear ONLY when verified data exists.
 */

interface WorkGridProps {
  studies: CaseStudy[];
  base: string;
  labels: {
    all: string;
    clients: string;
    concepts: string;
    products: string;
    viewCase: string;
    metricNote: string;
    empty: string;
    status: Record<CaseStudy['kind'], string>;
  };
}

type Filter = 'all' | 'client' | 'concept' | 'product';

/**
 * Editorial layout pattern (desktop, 5-col grid):
 *   1st — full-width featured · 2nd/3rd — 60/40 asymmetric pair ·
 *   4th — wide horizontal · then the pattern repeats.
 */
const LAYOUT: Array<{ span: string; aspect: string }> = [
  { span: 'md:col-span-5', aspect: 'md:aspect-[21/9] aspect-[11/7]' },
  { span: 'md:col-span-3', aspect: 'md:aspect-[4/3] aspect-[11/7]' },
  { span: 'md:col-span-2', aspect: 'md:aspect-[3/4] aspect-[11/7]' },
  { span: 'md:col-span-5', aspect: 'md:aspect-[21/8] aspect-[11/7]' },
];

const STATUS_STYLE: Record<CaseStudy['kind'], string> = {
  client: 'bg-yoca-lime text-black',
  concept: 'bg-[#050505] text-white',
  product: 'bg-yoca-green text-black',
  experimental: 'bg-[#E4E4DF] text-[#050505]',
};

export default function WorkGrid({ studies, base, labels }: WorkGridProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [hovered, setHovered] = useState<string | null>(null);
  // Contextual cursor ("View Project ↗") — pointer devices only, inside the grid.
  const gridRef = useRef<HTMLDivElement>(null);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const sx = useSpring(cx, { stiffness: 320, damping: 28, mass: 0.4 });
  const sy = useSpring(cy, { stiffness: 320, damping: 28, mass: 0.4 });
  const onPointerMove = (event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse' || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    cx.set(event.clientX - rect.left);
    cy.set(event.clientY - rect.top);
  };

  const filtered = studies.filter((study) => {
    if (filter === 'all') return true;
    if (filter === 'client') return study.kind === 'client';
    if (filter === 'concept') return study.kind === 'concept';
    return study.kind === 'product' || study.kind === 'experimental';
  });

  // Only show filters that actually have content — no empty "Client Case
  // Studies" tab while every project is a concept.
  const hasClient = studies.some((study) => study.kind === 'client');
  const hasConcept = studies.some((study) => study.kind === 'concept');
  const hasProduct = studies.some((study) => study.kind === 'product' || study.kind === 'experimental');
  const tabs: Array<{ key: Filter; label: string }> = [
    { key: 'all', label: labels.all },
    ...(hasClient ? [{ key: 'client' as Filter, label: labels.clients }] : []),
    ...(hasConcept ? [{ key: 'concept' as Filter, label: labels.concepts }] : []),
    ...(hasProduct ? [{ key: 'product' as Filter, label: labels.products }] : []),
  ];

  const hasVerifiedMetrics = filtered.some((study) => study.metricBadge);

  return (
    <div>
      {/* Filter bar — only when there is more than one real category to filter */}
      {tabs.length > 2 && (
      <div
        role="tablist"
        aria-label={labels.all}
        className="mb-10 flex flex-wrap gap-1 rounded-sm border border-[rgba(5,5,5,0.18)] p-1 sm:w-fit"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={filter === tab.key}
            onClick={() => setFilter(tab.key)}
            className={`min-h-[44px] flex-1 rounded-sm px-5 py-2 text-[13px] font-bold transition-colors sm:flex-none ${
              filter === tab.key
                ? 'bg-[#050505] text-white'
                : 'light-muted hover:text-[#050505]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      )}

      {filtered.length === 0 ? (
        <p className="light-muted py-10 text-[15px]">{labels.empty}</p>
      ) : (
        <div ref={gridRef} onPointerMove={onPointerMove} className="relative grid gap-8 md:grid-cols-5">
          {/* Contextual cursor label */}
          <motion.span
            aria-hidden="true"
            className="hover-preview pointer-events-none absolute start-0 top-0 z-20 whitespace-nowrap bg-yoca-lime px-3.5 py-2 text-[12px] font-extrabold uppercase tracking-[0.1em] text-black"
            style={{ x: sx, y: sy, translateX: 14, translateY: 14 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: DUR.micro, ease: EASE_YOCA }}
          >
            {labels.viewCase} ↗
          </motion.span>
          <AnimatePresence mode="popLayout">
            {filtered.map((study, index) => {
              const slot = LAYOUT[index % LAYOUT.length];
              const featured = index % LAYOUT.length === 0;
              return (
                <motion.div
                  key={study.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: DUR.ui, ease: EASE_YOCA }}
                  className={slot.span}
                >
                  <Link
                    href={`${base}/work/${study.slug}`}
                    className="group block"
                    aria-label={`${study.name} — ${labels.viewCase}`}
                    onMouseEnter={() => setHovered(study.slug)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span
                      className={`relative block overflow-hidden rounded-sm border border-[rgba(5,5,5,0.14)] bg-white ${slot.aspect}`}
                    >
                      <span className="absolute inset-0 block transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                        <ProjectCover slug={study.slug} name={study.name} sector={study.sector} index={index} size={featured ? 'lg' : 'md'} priority={featured} />
                      </span>
                      {study.videoUrl && hovered === study.slug && (
                        <video
                          src={study.videoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )}
                      {/* Status label */}
                      <span
                        className={`slant absolute start-3 top-3 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] ${STATUS_STYLE[study.kind]}`}
                      >
                        {labels.status[study.kind]}
                      </span>
                      {/* Verified metric badge — only when real data exists */}
                      {study.metricBadge && (
                        <span className="slant absolute end-3 top-3 bg-yoca-lime px-3 py-1 text-[12px] font-extrabold text-black">
                          {study.metricBadge}
                        </span>
                      )}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 start-0 h-[3px] w-0 bg-yoca-lime transition-all duration-300 group-hover:w-full"
                      />
                    </span>
                    <span className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="light-subtle inline-block rounded-sm border border-[rgba(5,5,5,0.18)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em]">
                        {study.sector}
                      </span>
                      {study.services.map((service) => (
                        <span
                          key={service}
                          className="light-subtle inline-block text-[11px] font-bold uppercase tracking-[0.1em]"
                        >
                          {service}
                        </span>
                      ))}
                    </span>
                    <h2 className={`mt-3 font-extrabold transition-transform duration-500 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1 ${featured ? 'text-[26px]' : 'text-[22px]'}`}>
                      {study.name}
                    </h2>
                    <p className="light-muted mt-2 max-w-[60ch] text-[15px]">{study.summary}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#267800]">
                      {labels.viewCase}
                      <span
                        aria-hidden="true"
                        className="icon-arrow"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Source footnote only when verified metrics are displayed */}
      {hasVerifiedMetrics && <p className="light-subtle mt-10 text-[12px]">{labels.metricNote}</p>}
    </div>
  );
}
