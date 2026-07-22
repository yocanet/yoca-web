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
    products: string;
    viewCase: string;
    metricNote: string;
    empty: string;
    status: Record<CaseStudy['kind'], string>;
  };
}

type Filter = 'all' | 'client' | 'product';

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
    if (filter === 'client') return study.kind === 'client' || study.kind === 'concept';
    return study.kind === 'product' || study.kind === 'experimental';
  });

  const tabs: Array<{ key: Filter; label: string }> = [
    { key: 'all', label: labels.all },
    { key: 'client', label: labels.clients },
    { key: 'product', label: labels.products },
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
        <div className="grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((study, index) => {
              const featured = index === 0;
              const vertical = !featured && index % 3 === 2;
              return (
                <motion.div
                  key={study.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className={featured ? 'md:col-span-2' : undefined}
                >
                  <Link
                    href={`${base}/work/${study.slug}`}
                    className="group block"
                    aria-label={`${study.name} — ${labels.viewCase}`}
                    onMouseEnter={() => setHovered(study.slug)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span
                      className={`relative block overflow-hidden rounded-sm border border-[rgba(5,5,5,0.14)] bg-white ${
                        featured
                          ? 'aspect-[21/9] max-md:aspect-[11/7]'
                          : vertical
                            ? 'aspect-[4/5] max-md:aspect-[11/7]'
                            : 'aspect-[11/7]'
                      }`}
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
                    <span className="light-subtle mt-4 inline-block rounded-sm border border-[rgba(5,5,5,0.18)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em]">
                      {study.sector}
                    </span>
                    <h2 className={`mt-3 font-extrabold ${featured ? 'text-[26px]' : 'text-[22px]'}`}>
                      {study.name}
                    </h2>
                    <p className="light-muted mt-2 max-w-[60ch] text-[15px]">{study.summary}</p>
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
