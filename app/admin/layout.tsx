import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';

/**
 * Yoca — admin panel layout (Server Component wrapper).
 * The panel itself is fully client-side (Supabase Auth + RLS).
 * Never indexed by search engines.
 */

export const metadata: Metadata = {
  title: 'Yoca Yönetim Paneli',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
