'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAdminClient } from '@/lib/adminClient';

/** Yoca Admin — genel bakış paneli. */

interface Stats {
  contact: number;
  checkup: number;
  team: number;
  work: number;
  hiddenSections: number;
}

export default function AdminDashboard() {
  const supabase = getAdminClient();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!supabase) return;
    (async () => {
      const count = async (table: string, filter?: (q: any) => any): Promise<number> => {
        try {
          let query = supabase.from(table).select('*', { count: 'exact', head: true });
          if (filter) query = filter(query);
          const { count: value } = await query;
          return value ?? 0;
        } catch {
          return 0;
        }
      };
      const [contact, checkup, team, work, hiddenSections] = await Promise.all([
        count('contact_submissions'),
        count('checkup_submissions'),
        count('team_members'),
        count('case_studies'),
        count('sections', (q) => q.eq('is_active', false)),
      ]);
      setStats({ contact, checkup, team, work, hiddenSections });
    })();
  }, [supabase]);

  const cards: Array<{ label: string; value: number | null; href: string; hint: string }> = [
    {
      label: 'İletişim Başvurusu',
      value: stats?.contact ?? null,
      href: '/admin/submissions',
      hint: 'Formdan gelen mesajlar',
    },
    {
      label: 'Check-Up Başvurusu',
      value: stats?.checkup ?? null,
      href: '/admin/submissions?tab=checkup',
      hint: 'Skorlu lead başvuruları',
    },
    {
      label: 'Ekip Üyesi',
      value: stats?.team ?? null,
      href: '/admin/team',
      hint: 'Sitede görünen ekip',
    },
    {
      label: 'Work Projesi',
      value: stats?.work ?? null,
      href: '/admin/work',
      hint: 'Vaka çalışmaları',
    },
    {
      label: 'Gizli Bölüm',
      value: stats?.hiddenSections ?? null,
      href: '/admin/sections',
      hint: 'Kapalı durumda olan bölümler',
    },
  ];

  return (
    <div className="grid gap-8">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight">Panel</h1>
        <p className="mt-1.5 text-[14px] text-muted">
          Sitenin tüm içerik ve başvuru yönetimi buradan yapılır.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="admin-card group transition-colors hover:border-yoca-lime/50">
            <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-subtle">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-extrabold text-yoca-lime">
              {card.value === null ? '—' : card.value}
            </p>
            <p className="mt-1.5 text-[12px] text-muted">{card.hint}</p>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <h2 className="text-[15px] font-extrabold">Hızlı Rehber</h2>
        <ul className="mt-3 grid gap-2 text-[13px] leading-relaxed text-muted">
          <li>
            <strong className="text-soft">Bölümler:</strong> Ana sayfadaki blokları tek tıkla aç/kapat.
          </li>
          <li>
            <strong className="text-soft">Menüler:</strong> Header ve footer linklerini ekle, sırala, gizle.
          </li>
          <li>
            <strong className="text-soft">Metinler:</strong> Hero, CTA ve bölüm başlıklarını 3 dilde düzenle.
          </li>
          <li>
            <strong className="text-soft">Work:</strong> Vaka çalışmalarını 3 dilde yönet; boşsa varsayılanları içe aktarabilirsin.
          </li>
          <li>
            <strong className="text-soft">Ekip:</strong> Gerçek ekip üyelerini fotoğraf ve etiketlerle ekle.
          </li>
        </ul>
      </div>
    </div>
  );
}
