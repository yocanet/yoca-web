'use client';

import { useState } from 'react';

/** Yoca — email with a small copy interaction (real address, never invented). */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable — the mailto link still works.
    }
  };

  return (
    <span className="flex flex-wrap items-center gap-2.5">
      <a
        href={`mailto:${email}`}
        className="break-all text-[17px] font-bold text-yoca-lime transition-colors hover:text-yoca-green"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${email}`}
        className="rounded-sm border border-line px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-subtle transition-colors hover:border-yoca-lime hover:text-yoca-lime"
      >
        {copied ? '✓' : '⧉'}
      </button>
    </span>
  );
}
