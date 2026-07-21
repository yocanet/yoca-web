'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAdminClient } from '@/lib/adminClient';
import type { CheckupSubmissionRow, ContactSubmissionRow } from '@/types';

/** Yoca Admin — başvurular (iletişim formu + Digital Check-Up). */

type Tab = 'contact' | 'checkup';

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('tr-TR', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Istanbul',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function SubmissionsInner() {
  const supabase = getAdminClient();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>(searchParams.get('tab') === 'checkup' ? 'checkup' : 'contact');
  const [contacts, setContacts] = useState<ContactSubmissionRow[]>([]);
  const [checkups, setCheckups] = useState<CheckupSubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = async () => {
    if (!supabase) return;
    const [contactResult, checkupResult] = await Promise.all([
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('checkup_submissions').select('*').order('created_at', { ascending: false }),
    ]);
    setContacts((contactResult.data as ContactSubmissionRow[]) ?? []);
    setCheckups((checkupResult.data as CheckupSubmissionRow[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeContact = async (id: string) => {
    if (!supabase) return;
    await supabase.from('contact_submissions').delete().eq('id', id);
    load();
  };

  const removeCheckup = async (id: string) => {
    if (!supabase) return;
    await supabase.from('checkup_submissions').delete().eq('id', id);
    load();
  };

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight">Başvurular</h1>
        <p className="mt-1.5 text-[14px] text-muted">
          İletişim formu mesajları ve Digital Check-Up lead başvuruları.
        </p>
      </header>

      <div className="flex gap-1 rounded-sm border border-line p-1 sm:w-fit">
        {(
          [
            { code: 'contact', label: `İletişim (${contacts.length})` },
            { code: 'checkup', label: `Check-Up (${checkups.length})` },
          ] as Array<{ code: Tab; label: string }>
        ).map((item) => (
          <button
            key={item.code}
            type="button"
            onClick={() => setTab(item.code)}
            className={`flex-1 rounded-sm px-4 py-1.5 text-[13px] font-bold transition-colors sm:flex-none ${
              tab === item.code ? 'bg-yoca-lime text-black' : 'text-muted hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[14px] text-muted">Yükleniyor…</p>
      ) : tab === 'contact' ? (
        contacts.length === 0 ? (
          <p className="text-[14px] text-muted">Henüz iletişim başvurusu yok.</p>
        ) : (
          <div className="grid gap-2.5">
            {contacts.map((row) => (
              <div key={row.id} className="admin-card !p-4">
                <button
                  type="button"
                  onClick={() => setOpenId(openId === row.id ? null : row.id)}
                  className="flex w-full flex-wrap items-center justify-between gap-3 text-left"
                >
                  <span>
                    <span className="text-[14px] font-extrabold">{row.name}</span>
                    <span className="ml-2 text-[12px] text-subtle">
                      {row.company ? `${row.company} · ` : ''}
                      {row.email}
                    </span>
                  </span>
                  <span className="text-[12px] text-subtle">{formatDate(row.created_at)}</span>
                </button>
                {openId === row.id && (
                  <div className="mt-3 border-t border-line pt-3">
                    <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-soft">
                      {row.message}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a href={`mailto:${row.email}`} className="admin-btn-primary">
                        Yanıtla
                      </a>
                      <button
                        type="button"
                        className="admin-btn hover:!border-red-400 hover:!text-red-400"
                        onClick={() => removeContact(row.id)}
                      >
                        Sil
                      </button>
                      <span className="text-[11px] uppercase tracking-wide text-subtle">
                        dil: {row.locale}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      ) : checkups.length === 0 ? (
        <p className="text-[14px] text-muted">Henüz check-up başvurusu yok.</p>
      ) : (
        <div className="grid gap-2.5">
          {checkups.map((row) => {
            const contact = row.contact_info_json;
            const answers = Object.entries(row.data_json ?? {});
            return (
              <div key={row.id} className="admin-card !p-4">
                <button
                  type="button"
                  onClick={() => setOpenId(openId === row.id ? null : row.id)}
                  className="flex w-full flex-wrap items-center justify-between gap-3 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 flex-none items-center justify-center rounded-sm text-[14px] font-extrabold ${
                        (contact?.score ?? 0) >= 60
                          ? 'bg-yoca-lime/15 text-yoca-lime'
                          : (contact?.score ?? 0) >= 30
                            ? 'bg-yellow-400/15 text-yellow-400'
                            : 'bg-red-400/15 text-red-400'
                      }`}
                    >
                      {contact?.score ?? '–'}
                    </span>
                    <span>
                      <span className="block text-[14px] font-extrabold">{contact?.name}</span>
                      <span className="text-[12px] text-subtle">
                        {contact?.company ? `${contact.company} · ` : ''}
                        {contact?.email}
                      </span>
                    </span>
                  </span>
                  <span className="text-[12px] text-subtle">{formatDate(row.created_at)}</span>
                </button>
                {openId === row.id && (
                  <div className="mt-3 border-t border-line pt-3">
                    <dl className="grid gap-1.5">
                      {answers.map(([key, answer]) => (
                        <div key={key} className="grid grid-cols-[140px_1fr] gap-3 text-[13px]">
                          <dt className="text-subtle">{key}</dt>
                          <dd className="text-soft">{answer?.v ?? ''}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {contact?.email && (
                        <a href={`mailto:${contact.email}`} className="admin-btn-primary">
                          Yanıtla
                        </a>
                      )}
                      {contact?.phone && (
                        <span className="text-[13px] font-semibold text-soft">{contact.phone}</span>
                      )}
                      <button
                        type="button"
                        className="admin-btn hover:!border-red-400 hover:!text-red-400"
                        onClick={() => removeCheckup(row.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminSubmissions() {
  return (
    <Suspense fallback={<p className="text-[14px] text-muted">Yükleniyor…</p>}>
      <SubmissionsInner />
    </Suspense>
  );
}
