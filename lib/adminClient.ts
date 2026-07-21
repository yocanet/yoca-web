'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Yoca — admin panel Supabase client (browser).
 *
 * Uses the public anon key + Supabase Auth: admins sign in with an email /
 * password user created in the Supabase dashboard. Row Level Security grants
 * the `authenticated` role full management of content tables, so the panel
 * talks to Supabase directly — no custom API needed.
 */

let client: SupabaseClient | null = null;

export function getAdminClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!client) {
    client = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'yoca-admin-auth',
      },
    });
  }
  return client;
}
