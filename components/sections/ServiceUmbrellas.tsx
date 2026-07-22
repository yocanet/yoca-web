'use client';

import { useRef, useState } from 'react';
import type { Dict } from '@/lib/i18n';

/**
 * Yoca — services grouped under the three system umbrellas
 * (01 Brand System → 02 Growth Engine → 03 Scale Framework).
 *
 * Accessibility-first tabs: on ≥md screens the four panels (problem /
 * deliverables / tech stack / what changes) behave as a proper tablist with
 * arrow-key navigation; below md the same content renders as an accordion.
 * ALL panels stay in the DOM (hidden attribute) — nothing is unmounted, so
 * content is crawlable and screen-reader friendly.
 */

interface ServiceUmbrellasProps {
  t: Dict['servicesPage'];
  serviceNames: string[];
  base: string;
}

/** umbrella index → [service item index, detail slug][] */
const GROUP_SERVICES: Array<Array<[number, string]>> = [
  [
    [0, 'brand-strategy-identity'],
    [3, 'creative-production'],
  ],
  [
    [1, 'web-digital-experiences'],
    [2, 'growth-performance'],
  ],
  [
    [4, 'ai-automation'],
    [5, 'digital-product-development'],
  ],
];

type TabKey = 'problem' | 'deliverables' | 'stack' | 'changes';
const TAB_ORDER: TabKey[] = ['problem', 'deliverables', 'stack', 'changes'];

export default function ServiceUmbrellas({ t, serviceNames, base }: ServiceUmbrellasProps) {
  const [activeTabs, setActiveTabs] = useState<Record<string, TabKey>>({});
  const tabRefs = useRef<Record<string, Array<HTMLButtonElement | null>>>({});

  const tabFor = (groupKey: string): TabKey => activeTabs[groupKey] ?? 'problem';

  const setTab = (groupKey: string, tab: TabKey) =>
    setActiveTabs((prev) => ({ ...prev, [groupKey]: tab }));

  /** Arrow-key navigation inside a tablist (RTL-aware via document.dir). */
  const onTablistKeyDown = (groupKey: string, index: number) => (event: React.KeyboardEvent) => {
    const rtl = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
    let nextIndex = -1;
    if (event.key === (rtl ? 'ArrowLeft' : 'ArrowRight')) nextIndex = (index + 1) % TAB_ORDER.length;
    if (event.key === (rtl ? 'ArrowRight' : 'ArrowLeft'))
      nextIndex = (index - 1 + TAB_ORDER.length) % TAB_ORDER.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = TAB_ORDER.length - 1;
    if (nextIndex === -1) return;
    event.preventDefault();
    setTab(groupKey, TAB_ORDER[nextIndex]);
    tabRefs.current[groupKey]?.[nextIndex]?.focus();
  };

  const panelContent = (group: Dict['servicesPage']['groups'][number], tab: TabKey) => {
    if (tab === 'problem') {
      return <p className="max-w-[58ch] text-[15px] leading-[1.9] text-soft">{group.problem}</p>;
    }
    if (tab === 'deliverables') {
      return (
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {group.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] text-soft">
              <span aria-hidden="true" className="mt-[7px] block h-1.5 w-1.5 flex-none bg-yoca-lime" />
              {item}
            </li>
          ))}
        </ul>
      );
    }
    if (tab === 'stack') {
      return (
        <div>
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
          <p className="mt-4 text-[13px] italic text-subtle">{t.stackNote}</p>
        </div>
      );
    }
    return (
      <p className="flex max-w-[58ch] items-start gap-3 text-[17px] font-bold leading-[1.7] text-yoca-lime">
        <span aria-hidden="true" className="mt-2 block h-2.5 w-2.5 flex-none bg-yoca-lime" />
        {group.changes}
      </p>
    );
  };

  const tabLabel = (tab: TabKey) => t.tabs[tab];

  return (
    <div className="grid gap-6 lg:gap-8">
      {t.groups.map((group, index) => {
        const active = tabFor(group.key);
        return (
          <article id={group.key} key={group.key} className="glass scroll-mt-28 rounded-md p-7 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
              <header>
                <p className="text-[13px] font-extrabold tracking-[0.1em] text-yoca-lime">
                  {String(index + 1).padStart(2, '0')} · {group.system}
                </p>
                <h2 className="mt-3 text-2xl font-extrabold leading-snug tracking-tight lg:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{group.desc}</p>
                <ul className="mt-5 grid gap-1.5">
                  {(GROUP_SERVICES[index] ?? []).map(([serviceIndex, slug]) => (
                    <li key={slug}>
                      <a
                        href={`${base}/services/${slug}`}
                        className="group/link inline-flex min-h-[44px] items-center gap-2 text-[14px] font-bold text-soft transition-colors hover:text-yoca-lime"
                      >
                        <span aria-hidden="true" className="block h-1.5 w-1.5 bg-yoca-lime" />
                        {serviceNames[serviceIndex]}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1"
                        >
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </header>

              {/* ── Desktop: tabs (≥md) ─────────────────────────── */}
              <div className="max-md:hidden">
                <div
                  role="tablist"
                  aria-label={group.title}
                  className="flex flex-wrap gap-1 rounded-sm border border-line p-1"
                >
                  {TAB_ORDER.map((tab, tabIndex) => (
                    <button
                      key={tab}
                      ref={(el) => {
                        if (!tabRefs.current[group.key]) tabRefs.current[group.key] = [];
                        tabRefs.current[group.key][tabIndex] = el;
                      }}
                      id={`tab-${group.key}-${tab}`}
                      role="tab"
                      aria-selected={active === tab}
                      aria-controls={`panel-${group.key}-${tab}`}
                      tabIndex={active === tab ? 0 : -1}
                      onKeyDown={onTablistKeyDown(group.key, tabIndex)}
                      onClick={() => setTab(group.key, tab)}
                      className={`min-h-[44px] flex-1 rounded-sm px-4 py-2 text-[13px] font-bold transition-colors ${
                        active === tab ? 'bg-yoca-lime text-black' : 'text-muted hover:text-white'
                      }`}
                    >
                      {tabLabel(tab)}
                    </button>
                  ))}
                </div>
                <div className="mt-5 min-h-[172px]">
                  {TAB_ORDER.map((tab) => (
                    <div
                      key={tab}
                      id={`panel-${group.key}-${tab}`}
                      role="tabpanel"
                      aria-labelledby={`tab-${group.key}-${tab}`}
                      hidden={active !== tab}
                    >
                      {panelContent(group, tab)}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Mobile: accordion (<md) — same content, always in DOM ── */}
              <div className="grid gap-2 md:hidden">
                {TAB_ORDER.map((tab) => {
                  const open = active === tab;
                  return (
                    <div key={tab} className="rounded-sm border border-line">
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`acc-${group.key}-${tab}`}
                        onClick={() => setTab(group.key, tab)}
                        className={`flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-start text-[14px] font-bold transition-colors ${
                          open ? 'text-yoca-lime' : 'text-soft'
                        }`}
                      >
                        {tabLabel(tab)}
                        <span
                          aria-hidden="true"
                          className={`text-[16px] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
                        >
                          +
                        </span>
                      </button>
                      <div id={`acc-${group.key}-${tab}`} hidden={!open} className="px-4 pb-4">
                        {panelContent(group, tab)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
