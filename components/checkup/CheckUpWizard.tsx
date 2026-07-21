'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { CheckupPayload, Locale } from '@/types';
import type { Dict } from '@/lib/i18n';

/**
 * Yoca — Digital Marketing Check-Up Wizard.
 *
 * 17-step interactive lead-magnet assessment (16 multi-choice questions +
 * contact capture) with an animated progress bar, smooth Framer Motion step
 * transitions and direct submission into the Supabase `checkup_submissions`
 * table via the /api/checkup route (validated server-side).
 */

interface CheckUpWizardProps {
  locale: Locale;
  t: Dict['checkup'];
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function CheckUpWizard({ locale, t }: CheckUpWizardProps) {
  const prefersReducedMotion = useReducedMotion();
  const questions = t.questions;
  const totalSteps = questions.length + 1; // + contact step

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '' });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const isContactStep = step === questions.length;
  const progress = Math.round((step / (totalSteps - 1)) * 100);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const go = (delta: number) => {
    setDirection(delta);
    setStep((current) => Math.min(Math.max(current + delta, 0), totalSteps - 1));
    scrollToTop();
  };

  const selectOption = (questionKey: string, optionIndex: number) => {
    setAnswers((current) => ({ ...current, [questionKey]: optionIndex }));
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => go(1), prefersReducedMotion ? 0 : 280);
  };

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim()),
    [contact.email],
  );

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (!contact.name.trim() || !contact.email.trim() || !consent) {
      setErrorMessage(t.errorRequired);
      return;
    }
    if (!emailValid) {
      setErrorMessage(t.errorEmail);
      return;
    }

    setStatus('submitting');
    const payload: CheckupPayload = {
      answers,
      contact: {
        name: contact.name.trim(),
        company: contact.company.trim(),
        email: contact.email.trim(),
        phone: contact.phone.trim(),
      },
      locale,
      website: '', // honeypot — must stay empty
    };

    try {
      const response = await fetch('/api/checkup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };
      if (response.ok && result.ok) {
        setStatus('success');
        scrollToTop();
      } else {
        setStatus('error');
        setErrorMessage(result.error || t.errorGeneric);
      }
    } catch {
      setStatus('error');
      setErrorMessage(t.errorGeneric);
    }
  };

  const stepVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * 36,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * -36,
    }),
  };

  if (status === 'success') {
    return (
      <div
        ref={topRef}
        role="status"
        className="grid justify-items-start gap-4 rounded-md border border-yoca-green bg-yoca-green/5 p-10"
      >
        <span
          aria-hidden="true"
          className="grid h-10 w-10 place-items-center bg-yoca-green text-xl font-extrabold text-black"
        >
          ✓
        </span>
        <p className="text-[16px] leading-relaxed text-soft">{t.success}</p>
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-32">
      {/* Progress bar */}
      <div className="mb-8" aria-hidden="true">
        <div className="mb-2.5 flex items-baseline justify-between text-[12px] font-bold uppercase tracking-[0.08em] text-subtle">
          <span>
            {t.step} {step + 1} {t.of} {totalSteps}
          </span>
          <span className="text-[14px] text-yoca-lime">{progress}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-surface-elevated">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #40C401, #A2FF00)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.22, 0.8, 0.3, 1] }}
          />
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 rounded-sm border border-red-500 bg-red-500/10 px-4 py-3 text-[14px] font-semibold text-red-400"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {!isContactStep ? (
            <motion.fieldset
              key={`question-${step}`}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 0.8, 0.3, 1] }}
              className="border-0 p-0"
            >
              <legend className="mb-6 text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
                {questions[step].title}
              </legend>
              <div className="grid gap-2.5">
                {questions[step].options.map((option, optionIndex) => {
                  const checked = answers[questions[step].key] === optionIndex;
                  return (
                    <label
                      key={optionIndex}
                      className={`flex cursor-pointer items-center gap-3.5 rounded-sm border py-4 text-[15px] font-semibold transition-colors duration-200 ${
                        checked
                          ? 'border-yoca-lime bg-yoca-lime/5'
                          : 'border-line bg-surface-secondary hover:border-subtle'
                      }`}
                      style={{ paddingLeft: '18px', paddingRight: '18px' }}
                    >
                      <input
                        type="radio"
                        name={questions[step].key}
                        checked={checked}
                        onChange={() => selectOption(questions[step].key, optionIndex)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`h-[18px] w-[18px] flex-none rounded-full border-2 transition-colors ${
                          checked
                            ? 'border-yoca-lime bg-yoca-lime shadow-[inset_0_0_0_3px_#000]'
                            : 'border-line'
                        }`}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            </motion.fieldset>
          ) : (
            <motion.fieldset
              key="contact"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.22, 0.8, 0.3, 1] }}
              className="border-0 p-0"
            >
              <legend className="mb-2 text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
                {t.contactTitle}
              </legend>
              <p className="mb-6 text-[15px] text-muted">{t.contactDesc}</p>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="cu-name" className="text-[13px] font-bold text-soft">
                    {t.name} <span className="text-yoca-lime">*</span>
                  </label>
                  <input
                    id="cu-name"
                    required
                    maxLength={190}
                    autoComplete="name"
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    className="min-h-12 rounded-sm border border-line bg-surface-secondary px-3.5 text-[15px] text-white transition-colors focus:border-yoca-lime focus:outline-none"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="cu-company" className="text-[13px] font-bold text-soft">
                    {t.company}
                  </label>
                  <input
                    id="cu-company"
                    maxLength={190}
                    autoComplete="organization"
                    value={contact.company}
                    onChange={(e) => setContact((c) => ({ ...c, company: e.target.value }))}
                    className="min-h-12 rounded-sm border border-line bg-surface-secondary px-3.5 text-[15px] text-white transition-colors focus:border-yoca-lime focus:outline-none"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="cu-email" className="text-[13px] font-bold text-soft">
                    {t.email} <span className="text-yoca-lime">*</span>
                  </label>
                  <input
                    id="cu-email"
                    type="email"
                    required
                    maxLength={190}
                    autoComplete="email"
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    className="min-h-12 rounded-sm border border-line bg-surface-secondary px-3.5 text-[15px] text-white transition-colors focus:border-yoca-lime focus:outline-none"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="cu-phone" className="text-[13px] font-bold text-soft">
                    {t.phone}
                  </label>
                  <input
                    id="cu-phone"
                    type="tel"
                    maxLength={60}
                    autoComplete="tel"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    className="min-h-12 rounded-sm border border-line bg-surface-secondary px-3.5 text-[15px] text-white transition-colors focus:border-yoca-lime focus:outline-none"
                  />
                </div>
              </div>
              <label className="mt-5 flex cursor-pointer items-start gap-3 text-[14px] text-muted">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-[18px] w-[18px] flex-none accent-yoca-lime"
                  required
                />
                <span>{t.consent}</span>
              </label>
            </motion.fieldset>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3.5">
          <button
            type="button"
            onClick={() => go(-1)}
            className={`btn-ghost ${step === 0 ? 'invisible' : ''}`}
          >
            {t.back}
          </button>
          {!isContactStep ? (
            <button type="button" onClick={() => go(1)} className="btn-primary">
              {t.next}
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary disabled:opacity-60"
            >
              {status === 'submitting' ? '…' : t.submit}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
