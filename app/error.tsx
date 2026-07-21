'use client';

import { useEffect, useState } from 'react';

/**
 * Yoca — branded error boundary (Client Component, as Next.js requires).
 * Locale is read from <html lang> since server dictionaries are unavailable here.
 */

const STRINGS: Record<string, { heading: string; text: string; retry: string }> = {
  en: {
    heading: 'Something broke on our side.',
    text: 'An unexpected error occurred. Please try again in a moment.',
    retry: 'Try Again',
  },
  tr: {
    heading: 'Bizim tarafımızda bir sorun oluştu.',
    text: 'Beklenmeyen bir hata meydana geldi. Lütfen kısa bir süre sonra tekrar deneyin.',
    retry: 'Tekrar Dene',
  },
  az: {
    heading: 'Bizim tərəfdə problem yarandı.',
    text: 'Gözlənilməz xəta baş verdi. Bir az sonra yenidən cəhd edin.',
    retry: 'Yenidən Cəhd Et',
  },
  ar: {
    heading: 'حدث خلل من جهتنا.',
    text: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى بعد قليل.',
    retry: 'حاول مرة أخرى',
  },
};

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    console.error(error);
    const lang = document.documentElement.lang;
    if (lang in STRINGS) setLocale(lang);
  }, [error]);

  const t = STRINGS[locale];

  return (
    <main
      className="grid min-h-screen place-items-center bg-surface-deep px-5 py-24 text-center text-white"
      style={{
        background:
          'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(162,255,0,0.05), transparent 70%), #0D0E12',
      }}
    >
      <div className="grid justify-items-center gap-4">
        <p
          aria-hidden="true"
          className="text-[clamp(70px,14vw,150px)] font-extrabold leading-none tracking-tighter"
        >
          500<span className="text-yoca-lime">.</span>
        </p>
        <h1 className="max-w-[24ch] text-xl font-extrabold sm:text-2xl lg:text-3xl">{t.heading}</h1>
        <p className="max-w-[50ch] text-muted">{t.text}</p>
        <button type="button" onClick={reset} className="btn-primary mt-3 px-8 py-4 text-base">
          {t.retry}
        </button>
      </div>
    </main>
  );
}
