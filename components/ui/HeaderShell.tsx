'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * Yoca — header shell (Client Component).
 * Applies the scrolled surface: slightly reduced height, dark translucent
 * background with restrained blur and a hairline bottom border. Height is
 * animated with a transition so there is no layout jump; the header itself
 * is fixed, so page content never shifts.
 */

export default function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] border-b backdrop-blur-md transition-[background-color,border-color] duration-300 ${
        scrolled ? 'border-line/70 bg-[rgba(5,5,5,0.82)]' : 'border-transparent bg-[rgba(5,5,5,0.35)]'
      }`}
    >
      <div
        className={`container-y flex items-center justify-between gap-4 transition-[height] duration-300 min-[1280px]:gap-8 ${
          scrolled ? 'h-[62px]' : 'h-[72px]'
        }`}
      >
        {children}
      </div>
    </header>
  );
}
