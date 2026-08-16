'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CityClock, Locale } from '@/types';

/**
 * Yoca — global time as an editorial index.
 * One row per city: name · live time · a hairline whose fill is the
 * position in that city's 24-hour day (so the four bars read like a
 * time-zone chart), plus a day/night marker. Time is always computed live.
 */

interface LiveStatusProps {
  locale: Locale;
  heading: string;
  sub: string;
  activeLabel: string;
  cityLabels: { istanbul: string; baku: string; london: string; dubai: string };
}

const CITIES: CityClock[] = [
  { key: 'istanbul', label: 'Istanbul', timeZone: 'Europe/Istanbul' },
  { key: 'baku', label: 'Baku', timeZone: 'Asia/Baku' },
  { key: 'london', label: 'London', timeZone: 'Europe/London' },
  { key: 'dubai', label: 'Dubai', timeZone: 'Asia/Dubai' },
];

export default function LiveStatus({ locale, heading, sub, activeLabel, cityLabels }: LiveStatusProps) {
  // Initialize with the real time so no "--:--" flash appears; the server/client
  // minute difference is covered by suppressHydrationWarning on <time>.
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  /** Minutes since local midnight for a time zone (0..1440). */
  const dayFraction = (timeZone: string) => {
    const parts = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).formatToParts(now);
    const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24;
    const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
    return (h * 60 + m) / 1440;
  };

  const formatters = useMemo(() => {
    const map = new Map<string, Intl.DateTimeFormat>();
    for (const city of CITIES) {
      map.set(
        city.timeZone,
        new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: city.timeZone,
        }),
      );
    }
    return map;
  }, [locale]);

  return (
    <div className="relative z-[7] border-t border-line bg-surface py-14 lg:py-20">
      <div className="container-y grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 className="text-2xl font-extrabold leading-tight tracking-[-0.02em] sm:text-3xl">{heading}</h2>
          <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-muted">{sub}</p>
          <p className="mt-6 flex items-center gap-2.5 text-[13px] font-semibold text-muted">
            <span className="relative inline-flex h-2.5 w-2.5 flex-none">
              <span className="absolute inset-0 rounded-full bg-yoca-green" />
              <span className="absolute -inset-1.5 rounded-full border border-yoca-green motion-safe:animate-pulse-ring" />
            </span>
            {activeLabel}
          </p>
        </div>
        <ol className="grid divide-y divide-line border-y border-line">
          {CITIES.map((city) => {
            const fraction = dayFraction(city.timeZone);
            const isDay = fraction >= 7 / 24 && fraction < 20 / 24;
            return (
              <li key={city.key} className="grid grid-cols-[96px_64px_minmax(0,1fr)] items-center gap-4 py-4 sm:grid-cols-[120px_72px_minmax(0,1fr)] sm:gap-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-subtle">{cityLabels[city.key]}</span>
                <time className="text-[17px] font-extrabold tabular-nums text-soft" suppressHydrationWarning>
                  {formatters.get(city.timeZone)!.format(now)}
                </time>
                <span className="relative h-px bg-line" aria-hidden="true">
                  <span
                    className="absolute inset-y-0 start-0 bg-yoca-green transition-[width] duration-700"
                    style={{ width: `${Math.round(fraction * 100)}%` }}
                    suppressHydrationWarning
                  />
                  <span
                    className={`absolute top-1/2 h-2.5 w-3 -translate-y-1/2 ${isDay ? 'bg-yoca-lime' : 'bg-surface-elevated border border-line'} slant`}
                    style={{ insetInlineStart: `calc(${Math.round(fraction * 100)}% - 6px)` }}
                    suppressHydrationWarning
                  />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
