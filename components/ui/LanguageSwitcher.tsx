import { hostForLocale, LOCALES } from '@/lib/domains';
import type { Locale } from '@/types';

/**
 * Yoca — cross-domain language switcher (Server Component).
 * Each language links to the same path on its canonical domain:
 * EN → yoca.net, TR → yoca.tr, AZ → yoca.az.
 */

interface LanguageSwitcherProps {
  current: Locale;
  path: string;
  ariaLabel: string;
}

const LABELS: Record<Locale, string> = { en: 'EN', tr: 'TR', az: 'AZ' };

export default function LanguageSwitcher({ current, path, ariaLabel }: LanguageSwitcherProps) {
  return (
    <nav aria-label={ariaLabel} className="flex gap-0.5 rounded-sm border border-line p-0.5">
      {LOCALES.map((locale) => {
        const isActive = locale === current;
        return (
          <a
            key={locale}
            href={`https://${hostForLocale(locale)}${path}`}
            hrefLang={locale}
            aria-current={isActive ? 'true' : undefined}
            className={`rounded-sm px-2.5 py-1 text-[12px] font-bold tracking-wide transition-colors ${
              isActive ? 'bg-yoca-lime text-black' : 'text-subtle hover:text-white'
            }`}
          >
            {LABELS[locale]}
          </a>
        );
      })}
    </nav>
  );
}
