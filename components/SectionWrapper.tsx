import { cache } from 'react';
import type { ReactNode } from 'react';
import { fetchSections } from '@/lib/supabase';

/**
 * Yoca — Section visibility gate (Server Component).
 *
 * Reads the Supabase `sections` table (deduped per request via React cache)
 * and renders its children only when the section's `is_active` flag is true.
 * Unknown keys default to visible so new sections never disappear silently.
 */

const getSections = cache(async () => fetchSections());

interface SectionWrapperProps {
  sectionKey: string;
  children: ReactNode;
}

export default async function SectionWrapper({ sectionKey, children }: SectionWrapperProps) {
  const sections = await getSections();
  const isActive = sections[sectionKey] ?? true;
  if (!isActive) return null;
  return <>{children}</>;
}
