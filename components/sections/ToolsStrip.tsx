import type { Dict } from '@/lib/i18n';
import SplitWords from '@/components/ui/SplitWords';

/**
 * Yoca — platforms strip (Server Component).
 * Measure / Grow / Build as three compact text lines — no cards, no badges,
 * no partner claims. Reads as a footnote to the system, not a feature.
 */

interface ToolsStripProps {
  t: Dict['partners'];
}

export default function ToolsStrip({ t }: ToolsStripProps) {
  return (
    <section className="relative z-[7] border-t border-line bg-surface-deep py-14 lg:py-20" aria-label={t.heading}>
      <div className="container-y grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 className="max-w-[18ch] text-2xl font-extrabold leading-tight tracking-[-0.02em] sm:text-3xl">
            <SplitWords text={t.heading} />
          </h2>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted">{t.sub}</p>
        </div>
        <dl className="grid divide-y divide-line border-y border-line">
          {t.categories.map((category, index) => (
            <div key={category.name} className="grid gap-2 py-5 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-8">
              <dt className="flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-soft">
                <span
                  aria-hidden="true"
                  className={`slant block h-2.5 w-3 ${index === 0 ? 'bg-yoca-lime' : index === 1 ? 'bg-yoca-green' : 'bg-surface-elevated'}`}
                />
                {category.name}
              </dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1.5 text-[15px] font-semibold text-muted">
                {category.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
