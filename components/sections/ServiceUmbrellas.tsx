'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Dict } from '@/lib/i18n';

/**
 * Yoca — services grouped under the three system umbrellas
 * (01 Brand System → 02 Growth Engine → 03 Scale Framework), each card
 * with "problem it solves" / deliverables / tech-stack tabs.
 */

interface ServiceUmbrellasProps {
  t: Dict['servicesPage'];
}

type TabKey = 'problem' | 'deliverables' | 'stack';

export default function ServiceUmbrellas({ t }: ServiceUmbrellasProps) {
  const [activeTabs, setActiveTabs] = useState<Record<string, TabKey>>({});

  const tabFor = (groupKey: string): TabKey => activeTabs[groupKey] ?? 'problem';

  return (
    <div className="grid gap-6 lg:gap-8">
      {t.groups.map((group, index) => {
        const active = tabFor(group.key);
        const tabs: Array<{ key: TabKey; label: string }> = [
          { key: 'problem', label: t.tabs.problem },
          { key: 'deliverables', label: t.tabs.deliverables },
          { key: 'stack', label: t.tabs.stack },
        ];
        return (
          <article
            id={group.key}
            key={group.key}
            className="glass scroll-mt-28 rounded-md p-7 lg:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
              <header>
                <p className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
                  {String(index + 1).padStart(2, '0')} · {group.system}
                </p>
                <h2 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight lg:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{group.desc}</p>
              </header>

              <div>
                <div role="tablist" aria-label={group.title} className="flex flex-wrap gap-1 rounded-sm border border-line p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      role="tab"
                      aria-selected={active === tab.key}
                      onClick={() => setActiveTabs((prev) => ({ ...prev, [group.key]: tab.key }))}
                      className={`min-h-[44px] flex-1 rounded-sm px-4 py-2 text-[13px] font-bold transition-colors ${
                        active === tab.key
                          ? 'bg-yoca-lime text-black'
                          : 'text-muted hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 min-h-[172px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.22 }}
                    >
                      {active === 'problem' && (
                        <p className="max-w-[58ch] text-[15px] leading-[1.9] text-soft">
                          {group.problem}
                        </p>
                      )}
                      {active === 'deliverables' && (
                        <ul className="grid gap-2.5 sm:grid-cols-2">
                          {group.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 text-[14px] text-soft">
                              <span
                                aria-hidden="true"
                                className="mt-[7px] block h-1.5 w-1.5 flex-none bg-yoca-lime"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                      {active === 'stack' && (
                        <ul className="flex flex-wrap gap-2.5">
                          {group.stack.map((tool) => (
                            <li
                              key={tool}
                              className="rounded-sm border border-line bg-surface px-3.5 py-2 text-[13px] font-bold text-soft"
                            >
                              {tool}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
