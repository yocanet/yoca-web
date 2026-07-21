'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import type { Locale } from '@/types';

/**
 * Yoca — language switcher (Client Component).
 *
 * In-app switching: picking a language sets the `yoca_locale` cookie and
 * refreshes the current route, so the whole site changes language without
 * leaving the page. Once the real domains (yoca.net / yoca.tr / yoca.az)
 * are connected, the middleware lets the host decide the language on those
 * hosts and this control redirects between them instead.
 */

interface LanguageSwitcherProps {
  current: Locale;
  path: string;
  ariaLabel: string;
}

const LABELS: Record<Locale, string> = { en: 'EN', tr: 'TR', az: 'AZ' };
const LOCALES: Locale[] = ['en', 'tr', 'az'];
const HOST_FOR_LOCALE: Record<Locale, string> = {
  en: 'yoca.net',
  tr: 'yoca.tr',
  az: 'yoca.az',
};
const KNOWN_HOSTS = ['yoca.net', 'yoca.tr', 'yoca.com.tr', 'yoca.az'];

export default function LanguageSwitcher({ current, path, ariaLabel }: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (locale: Locale) => {
    if (locale === current) return;
    const hostname = window.location.hostname.toLowerCase().replace(/^www\./, '');
    if (KNOWN_HOSTS.includes(hostname)) {
      // Live domains: each language lives on its own host.
      window.location.href = `https://${HOST_FOR_LOCALE[locale]}${path}`;
      return;
    }
    // Preview / single-host mode: switch in place via cookie.
    document.cookie = `yoca_locale=${locale}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <nav aria-label={ariaLabel} className="flex gap-0.5 rounded-sm border border-line p-0.5">
      {LOCALES.map((locale) => {
        const isActive = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={isActive ? 'true' : undefined}
            disabled={isPending}
            className={`rounded-sm px-2.5 py-1 text-[12px] font-bold tracking-wide transition-colors ${
              isActive ? 'bg-yoca-lime text-black' : 'text-subtle hover:text-white'
            } ${isPending ? 'opacity-60' : ''}`}
          >
            {LABELS[locale]}
          </button>
        );
      })}
    </nav>
  );
}
