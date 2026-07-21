import { cache } from 'react';
import { ALLOWED_CONTENT_KEYS } from '@/lib/contentKeys';
import { getDict, type Dict } from '@/lib/i18n';
import { getSupabase } from '@/lib/supabase';
import type { Locale, SiteContentRow } from '@/types';

/**
 * Yoca — editable site content layer.
 *
 * The base copy lives in lib/i18n.ts. The admin panel can override the most
 * important strings per locale through the Supabase `site_content` table
 * (key = dot path into the dictionary, e.g. "hero.title"). Overrides are
 * merged onto the dictionary at request time; anything not overridden falls
 * back to the built-in copy, so the site never breaks.
 */

function setDeep(target: Record<string, unknown>, dotKey: string, value: string): void {
  const parts = dotKey.split('.');
  let node: Record<string, unknown> = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const next = node[parts[i]];
    if (typeof next !== 'object' || next === null) return;
    node = next as Record<string, unknown>;
  }
  if (typeof node[parts[parts.length - 1]] === 'string') {
    node[parts[parts.length - 1]] = value;
  }
}

/** Fetch every override row once per request (deduped via React cache). */
const fetchOverrides = cache(async (): Promise<SiteContentRow[]> => {
  const supabase = getSupabase();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('id,key,locale,value')
      .returns<SiteContentRow[]>();
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
});

/**
 * The dictionary for a locale with admin overrides applied.
 * Use this in pages/layouts instead of getDict().
 */
export async function getContent(locale: Locale): Promise<Dict> {
  const base = getDict(locale);
  const rows = (await fetchOverrides()).filter(
    (row) => row.locale === locale && ALLOWED_CONTENT_KEYS.has(row.key) && row.value.trim().length > 0,
  );
  if (rows.length === 0) return base;

  const merged = JSON.parse(JSON.stringify(base)) as Dict;
  for (const row of rows) {
    setDeep(merged as unknown as Record<string, unknown>, row.key, row.value);
  }
  return merged;
}
