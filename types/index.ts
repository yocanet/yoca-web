/** Yoca — shared TypeScript types. */

export type Locale = 'en' | 'tr' | 'az';

export interface DomainConfig {
  host: string;
  locale: Locale;
  hreflang: string; // e.g. "tr-TR"
  /** When set, this host 308-redirects to the canonical host. */
  canonicalHost?: string;
}

// ── Supabase rows ──────────────────────────────────────────────────
export interface SectionRow {
  id: number;
  key: string;
  name: string;
  is_active: boolean;
  updated_at: string;
}

export interface MenuRow {
  id: number;
  title: string;
  url: string;
  location: 'header' | 'footer';
  order_index: number;
  is_active: boolean;
}

export interface TeamMemberRow {
  id: number;
  name: string;
  role: string;
  image_url: string | null;
  linkedin: string | null;
  tags: string[] | null;
  order_index: number;
  is_active: boolean;
}

export interface CheckupSubmissionRow {
  id: string;
  data_json: Record<string, CheckupAnswer>;
  contact_info_json: CheckupContact;
  created_at: string;
}

// ── Check-up wizard ────────────────────────────────────────────────
export interface CheckupAnswer {
  /** Selected option index. */
  i: number;
  /** Selected option label (in the submission locale). */
  v: string;
}

export interface CheckupContact {
  name: string;
  company: string;
  email: string;
  phone: string;
  locale: Locale;
  score: number;
}

export interface CheckupQuestion {
  key: string;
  title: string;
  options: string[];
}

export interface CheckupPayload {
  answers: Record<string, number>;
  contact: { name: string; company: string; email: string; phone: string };
  locale: Locale;
  /** Honeypot — must stay empty. */
  website?: string;
}

// ── UI data ────────────────────────────────────────────────────────
export interface ClientLogo {
  name: string;
  src: string;
  href?: string;
}

export interface PartnerBadge {
  key: 'google' | 'meta' | 'tiktok';
  name: string;
  level: string;
  /** RGB triplet used for the glow, e.g. "66,133,244". */
  glow: string;
}

export interface CityClock {
  key: 'istanbul' | 'baku' | 'london' | 'dubai';
  label: string;
  timeZone: string;
}

// ── CMS rows (v3) ──────────────────────────────────────────────────
export interface CaseStudyLocalized {
  name: string;
  sector: string;
  summary: string;
  problem: string;
  approach: string;
  solution: string;
  results: string;
}

export interface CaseStudyRow {
  id: number;
  slug: string;
  year: string;
  market: string;
  image_url: string;
  services: string[] | null;
  order_index: number;
  is_active: boolean;
  content: Partial<Record<Locale, CaseStudyLocalized>>;
}

export interface SiteContentRow {
  id: number;
  key: string;
  locale: Locale;
  value: string;
}

export interface ContactSubmissionRow {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  locale: string;
  created_at: string;
}

export interface MenuItem {
  title: string;
  url: string;
  external?: boolean;
}
