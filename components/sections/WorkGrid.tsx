'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { CaseStudy } from '@/lib/workData';

/**
 * Yoca — Work grid with filter bar, metric badges and hover video previews.
 * Filters: All · Client Case Studies · Yoca Products (kind on each study).
 * When a study has a videoUrl, hovering the card plays a muted loop preview.
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
  };
}

type Filter = 'all' | 'client' | 'product';

export default function WorkGrid({ studies, base, labels }: WorkGridProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = studies.filter((study) => filter === 'all' || study.kind === filter);

  const tabs: Array<{ key: Filter; label: string }> = [
    { key: 'all', label: labels.all },
    { key: 'client', label: labels.clients },
    { key: 'product', label: labels.products },
  ];

  return (
    <div>
      {/* Filter bar */}
      <div role="tablist" aria-label={labels.all} className="mb-10 flex flex-wrap gap-1 rounded-sm border border-line p-1 sm:w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={filter === tab.key}
            onClick={() => setFilter(tab.key)}
            className={`min-h-[44px] flex-1 rounded-sm px-5 py-2 text-[13px] font-bold transition-colors sm:flex-none ${
              filter === tab.key ? 'bg-yoca-lime text-black' : 'text-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-[15px] text-muted">{labels.empty}</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((study) => (
              <motion.div
                key={study.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`${base}/work/${study.slug}`}
                  className="group block"
                  aria-label={`${study.name} — ${labels.viewCase}`}
                  onMouseEnter={() => setHovered(study.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="relative block aspect-[11/7] overflow-hidden rounded-sm border border-line bg-surface-secondary">
                    <img
                      src={study.image}
                      alt=""
                      width={880}
                      height={560}
                      loading="lazy"
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
                    {/* Metric badge */}
                    {study.metricBadge && (
                      <span className="absolute start-3 top-3 rounded-sm bg-yoca-lime px-2.5 py-1 text-[12px] font-extrabold text-black">
                        {study.metricBadge}
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 start-0 h-[3px] w-0 bg-yoca-lime transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                  <span className="mt-4 inline-block rounded-sm border border-line px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-yoca-lime">
                    {study.sector}
                  </span>
                  <h2 className="mt-3 text-[22px] font-extrabold">{study.name}</h2>
                  <p className="mt-2 max-w-[52ch] text-[15px] text-muted">{study.summary}</p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Source footnote for metric claims */}
      <p className="mt-10 text-[12px] text-subtle">{labels.metricNote}</p>
    </div>
  );
}
