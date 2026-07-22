'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CaseStudy } from '@/lib/workData';

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
  experimental: 'border border-[rgba(5,5,5,0.3)] bg-white text-[#050505]',
};

export default function WorkGrid({ studies, base, labels }: WorkGridProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [hovered, setHovered] = useState<string | null>(null);

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
      {/* Filter bar */}
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

      {filtered.length === 0 ? (
        <p className="light-muted py-10 text-[15px]">{labels.empty}</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-5">
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
                  transition={{ duration: 0.3 }}
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
                      <img
                        src={study.image}
                        alt=""
                        width={featured ? 1400 : 880}
                        height={featured ? 600 : 560}
                        loading={featured ? 'eager' : 'lazy'}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                      />
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
                        className={`absolute start-3 top-3 rounded-sm px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] ${STATUS_STYLE[study.kind]}`}
                      >
                        {labels.status[study.kind]}
                      </span>
                      {/* Verified metric badge — only when real data exists */}
                      {study.metricBadge && (
                        <span className="absolute end-3 top-3 rounded-sm bg-yoca-lime px-2.5 py-1 text-[12px] font-extrabold text-black">
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
                    <h2 className={`mt-3 font-extrabold ${featured ? 'text-[26px]' : 'text-[22px]'}`}>
                      {study.name}
                    </h2>
                    <p className="light-muted mt-2 max-w-[60ch] text-[15px]">{study.summary}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#267800]">
                      {labels.viewCase}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
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
