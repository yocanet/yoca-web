'use client';

import { getAdminClient } from '@/lib/adminClient';
import { readingMinutes } from '@/lib/markdown';
import type { InsightRow, Locale } from '@/types';

/**
 * Yoca — admin-side Insights helpers (browser, Supabase Auth + RLS).
 * Slug generation, editable payload building, revisions, AI endpoint calls.
 */

export const INSIGHT_LOCALES: Array<{ code: Locale; label: string }> = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'az', label: 'Azərbaycanca' },
  { code: 'ar', label: 'العربية' },
];

export const STATUS_LABELS: Record<InsightRow['status'], string> = {
  DRAFT: 'Taslak',
  IN_REVIEW: 'İncelemede',
  SCHEDULED: 'Zamanlandı',
  PUBLISHED: 'Yayında',
  ARCHIVED: 'Arşiv',
};

const TR_MAP: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', ə: 'e', İ: 'i' };

export function slugify(input: string): string {
  const mapped = input.split('').map((ch) => TR_MAP[ch] ?? ch).join('');
  const ascii = mapped
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/[\s-]+/g, '-');
  return ascii || `insight-${Date.now().toString(36)}`;
}

export type EditableInsight = Omit<InsightRow, 'id' | 'created_at' | 'updated_at' | 'reading_minutes'> & { id?: string };

export function emptyInsight(locale: Locale = 'tr', groupId?: string): EditableInsight {
  return {
    group_id: groupId ?? crypto.randomUUID(),
    locale,
    slug: '',
    title: '',
    excerpt: '',
    body_md: '',
    cover_url: null,
    cover_alt: null,
    cover_caption: null,
    category_key: null,
    tags: [],
    author_name: 'Yoca',
    author_role: null,
    status: 'DRAFT',
    publish_at: null,
    featured: false,
    related_service: null,
    related_product: null,
    related_insight_id: null,
    cta_type: 'none',
    seo_title: null,
    meta_description: null,
    canonical_override: null,
    og_title: null,
    og_description: null,
    og_image: null,
    noindex: false,
    sources: [],
    faq: [],
  };
}

export function toPayload(row: EditableInsight) {
  const { id: _id, ...rest } = row;
  void _id;
  return {
    ...rest,
    slug: slugify(rest.slug || rest.title),
    reading_minutes: readingMinutes(rest.body_md),
    publish_at: rest.publish_at || null,
    // Status/publish_at consistency: PUBLISHED needs a publish time (now if empty);
    // SCHEDULED needs a future time, otherwise it is simply published now.
    ...(rest.status === 'PUBLISHED' && !rest.publish_at ? { publish_at: new Date().toISOString() } : {}),
    ...(rest.status === 'SCHEDULED' && rest.publish_at && new Date(rest.publish_at) <= new Date() ? { status: 'PUBLISHED' as const } : {}),
  };
}

export async function saveRevision(insightId: string, row: Pick<EditableInsight, 'title' | 'excerpt' | 'body_md'>, reason: string) {
  const supabase = getAdminClient();
  if (!supabase || !row.body_md) return;
  await supabase.from('insight_revisions').insert({ insight_id: insightId, title: row.title, excerpt: row.excerpt, body_md: row.body_md, reason });
}

/** Call the server AI endpoint with the current session token. */
export async function callAi<T = unknown>(payload: Record<string, unknown>): Promise<T> {
  const supabase = getAdminClient();
  const { data } = (await supabase?.auth.getSession()) ?? { data: { session: null } };
  const token = data.session?.access_token;
  if (!token) throw new Error('Oturum bulunamadı — yeniden giriş yapın.');
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; result?: T; error?: string };
  if (!res.ok || !json.ok) {
    const map: Record<string, string> = {
      unauthorized: 'Yetkisiz — yeniden giriş yapın.',
      rate_limited: 'Çok fazla istek — biraz bekleyin.',
      topic_required: 'Konu gerekli.',
      selection_required: 'Önce metin seçin.',
    };
    throw new Error(map[json.error ?? ''] ?? json.error ?? 'AI isteği başarısız oldu.');
  }
  return json.result as T;
}

/** Local datetime-local ↔ ISO helpers (editor shows local time, stores UTC). */
export function isoToLocalInput(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
export function localInputToIso(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
