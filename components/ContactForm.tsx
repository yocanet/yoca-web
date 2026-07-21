'use client';

import { useState } from 'react';
import type { Dict } from '@/lib/i18n';
import type { Locale } from '@/types';

/** Yoca — contact form (client): validates, posts to /api/contact. */

interface ContactFormProps {
  locale: Locale;
  t: Dict['contact'];
  errorRequired: string;
  errorEmail: string;
  errorGeneric: string;
}

type Status = 'idle' | 'submitting' | 'success';

export default function ContactForm({
  locale,
  t,
  errorRequired,
  errorEmail,
  errorGeneric,
}: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim() || !consent) {
      setError(errorRequired);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError(errorEmail);
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          message: form.message.trim(),
          locale,
          website: '', // honeypot
        }),
      });
      const result = (await response.json()) as { ok: boolean; message?: string; error?: string };
      if (response.ok && result.ok) {
        setSuccessMessage(result.message || t.success);
        setStatus('success');
      } else {
        setStatus('idle');
        setError(result.error || errorGeneric);
      }
    } catch {
      setStatus('idle');
      setError(errorGeneric);
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="grid justify-items-start gap-4 rounded-md border border-yoca-green bg-yoca-green/5 p-9"
      >
        <span
          aria-hidden="true"
          className="grid h-10 w-10 place-items-center bg-yoca-green text-xl font-extrabold text-black"
        >
          ✓
        </span>
        <p className="text-[16px] leading-relaxed text-soft">{successMessage}</p>
      </div>
    );
  }

  const inputClass =
    'min-h-12 w-full rounded-sm border border-line bg-surface-secondary px-3.5 text-[15px] text-white transition-colors focus:border-yoca-lime focus:outline-none';

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      {error && (
        <div
          role="alert"
          className="rounded-sm border border-red-500 bg-red-500/10 px-4 py-3 text-[14px] font-semibold text-red-400"
        >
          {error}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="cf-name" className="text-[13px] font-bold text-soft">
            {t.name} <span className="text-yoca-lime">*</span>
          </label>
          <input
            id="cf-name"
            required
            maxLength={190}
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="cf-email" className="text-[13px] font-bold text-soft">
            {t.email} <span className="text-yoca-lime">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            required
            maxLength={190}
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="cf-company" className="text-[13px] font-bold text-soft">
          {t.company}
        </label>
        <input
          id="cf-company"
          maxLength={190}
          autoComplete="organization"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="cf-message" className="text-[13px] font-bold text-soft">
          {t.message} <span className="text-yoca-lime">*</span>
        </label>
        <textarea
          id="cf-message"
          required
          rows={6}
          maxLength={5000}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`${inputClass} min-h-[140px] resize-y py-3`}
        />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-[14px] text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-[18px] w-[18px] flex-none accent-yoca-lime"
          required
        />
        <span>{t.consent}</span>
      </label>
      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary px-8 py-4 text-base disabled:opacity-60"
        >
          {status === 'submitting' ? '…' : t.submit}
        </button>
      </div>
    </form>
  );
}
