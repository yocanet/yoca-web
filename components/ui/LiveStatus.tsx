'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CityClock, Locale } from '@/types';

/**
 * Yoca — Global Live Clocks & Pulse Indicator.
 * Live minute-accurate clocks for Istanbul, London and Dubai plus a
 * pulsing green "actively working" badge.
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
    <div className="relative z-[7] border-t border-line bg-surface py-10">
      <div className="container-y mb-6">
        <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{heading}</h2>
        <p className="mt-1.5 max-w-[64ch] text-[14px] text-muted">{sub}</p>
      </div>
      <div className="container-y flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line pt-5 max-md:justify-center max-md:text-center">
        <p className="flex items-center gap-2.5 text-[13px] font-semibold text-muted">
          <span className="relative inline-flex h-2.5 w-2.5 flex-none">
            <span className="absolute inset-0 rounded-full bg-yoca-green" />
            <span className="absolute -inset-1.5 rounded-full border border-yoca-green motion-safe:animate-pulse-ring" />
          </span>
          {activeLabel}
        </p>
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          {CITIES.map((city) => (
            <span key={city.key} className="flex items-baseline gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-subtle">
                {cityLabels[city.key]}
              </span>
              <time
                className="text-[15px] font-extrabold tabular-nums text-soft"
                suppressHydrationWarning
              >
                {formatters.get(city.timeZone)!.format(now)}
              </time>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
