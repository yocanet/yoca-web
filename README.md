# Yoca — Next.js Multi-Domain Platform

**Your Own Creative Agency** — yoca.net · yoca.tr · yoca.com.tr · yoca.az

Next.js 14+ (App Router) + Tailwind CSS + Framer Motion + Supabase, designed for Vercel.

## Mimari Özeti

| Katman | Dosya | Görev |
|---|---|---|
| Multi-domain | `middleware.ts` | Host → locale eşlemesi (net→EN, tr/com.tr→TR, az→AZ); www ve yoca.com.tr → kanonik host'a 308 |
| SEO | `lib/seo.ts` | Domainler arası canonical + hreflang (`en`, `tr-TR`, `az-AZ`, `x-default`), OG/Twitter, JSON-LD (Organization, ProfessionalService, CaseStudy, BreadcrumbList) |
| Sitemap/Robots | `app/sitemap.ts`, `app/robots.ts` | Host-aware dinamik üretim |
| i18n | `lib/i18n.ts` | EN/TR/AZ sözlükleri (check-up soruları dahil) |
| CMS | Supabase | `sections`, `menus`, `team_members`, `checkup_submissions` (RLS'li) |
| Görünürlük | `components/SectionWrapper.tsx` | `is_active` kapalıysa bölüm hiç render edilmez |

## Kurulum

```bash
npm install
cp .env.example .env.local   # Supabase anahtarlarınızı girin
npm run dev
```

1. [Supabase](https://supabase.com) projesi oluşturun.
2. `supabase/schema.sql` içeriğini SQL Editor'de çalıştırın (tablolar + RLS + seed).
3. `.env.local` dosyasına URL / anon key / service-role key değerlerini girin.
4. `npm run dev` → http://localhost:3000 (localhost, yoca.net/EN yapılandırmasına düşer).

Yerel olarak farklı domain davranışını test etmek için `/etc/hosts` dosyanıza
`127.0.0.1 yoca.tr` benzeri kayıtlar ekleyip `http://yoca.tr:3000` açabilirsiniz.

## Vercel Dağıtımı

1. Repoyu Vercel'e bağlayın, environment değişkenlerini ekleyin.
2. **Settings → Domains** altına dört domaini de ekleyin:
   `yoca.net`, `yoca.tr`, `yoca.com.tr`, `yoca.az` (+ www varyantları).
3. Middleware; www ve `yoca.com.tr` isteklerini kanonik host'a 308 ile yönlendirir,
   kalan her istekte locale'i çözer. Ek yapılandırma gerekmez.

## İçerik Yönetimi (Supabase Studio)

- **sections**: `is_active` alanını değiştirmek bölümü anında açar/kapatır
  (hero, bento, clients, partners, team, clocks, checkup_banner, cta).
- **menus**: header/footer linkleri; `order_index` ile sıralama, `is_active` ile gizleme.
- **team_members**: gerçek ekip üyelerinizi ekleyin (`tags` bir text[] dizisidir,
  örn. `{"SEO","Performance Ads","CRO"}`); tablo boşken ekip bölümü hiç görünmez.
- **checkup_submissions**: Check-Up başvuruları; `contact_info_json.score`
  0–100 dijital sağlık skorunu içerir. Anon anahtar yalnızca INSERT yapabilir,
  kayıtları sadece siz (dashboard/service-role) okuyabilirsiniz.

## Notlar

- Ortam değişkenleri girilmediğinde site varsayılan menü/bölümlerle sorunsuz render olur;
  yalnızca check-up gönderimi 503 döner.
- Partner rozetlerindeki seviye başlıkları (Google Premier Partner vb.) gerçek
  sertifikasyon durumunuzu yansıtmalıdır — metinler `components/sections/PartnersAndClients.tsx`
  ve `lib/i18n.ts` içindedir.
- Marka varlıkları `public/brand/` altındadır; orijinal logo dosyalarınızla
  birebir değiştirebilirsiniz (aynı dosya adlarıyla).
