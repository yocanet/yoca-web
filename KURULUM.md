# Yoca Next.js — Kurulum Rehberi (Türkçe)

Bu rehber projeyi sıfırdan yayına almanın tüm adımlarını içerir.
Gereksinimler: **Node.js 18.17+**, bir **Supabase** hesabı, bir **Vercel** hesabı
ve domainlerinizin DNS paneline erişim.

---

## 1. Supabase (veritabanı) — ~5 dakika

1. [supabase.com](https://supabase.com) → **New project** (bölge: Frankfurt/eu-central önerilir).
2. Sol menü → **SQL Editor** → projedeki `supabase/schema.sql` dosyasının tamamını
   yapıştırın → **Run**. Bu tek komut şunları kurar:
   - `sections` (bölüm aç/kapa anahtarları), `menus` (header/footer menüleri),
     `team_members` (ekip), `checkup_submissions` (check-up başvuruları),
     `contact_submissions` (iletişim formu)
   - RLS güvenlik kuralları (ziyaretçi yalnızca içerik okuyabilir ve form
     gönderebilir; başvuruları yalnızca siz okursunuz)
   - Varsayılan bölüm ve menü kayıtları
3. **Project Settings → API** sayfasından üç değeri not alın:
   - `Project URL`
   - `anon public` key
   - `service_role` key (gizli — yalnızca sunucu tarafında kullanılır)

> `schema.sql` tekrar çalıştırılabilir (idempotent) — mevcut verinize dokunmaz.

## 2. Yerel Kurulum

```bash
unzip yoca-next.zip -d yoca-next && cd yoca-next
npm install
cp .env.example .env.local
```

`.env.local` içine Supabase değerlerini girin:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

İsteğe bağlı satırlar:

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXX      # Analytics (cookie onayından sonra yüklenir)
RESEND_API_KEY=re_...             # Form bildirimlerini e-posta ile almak için
NOTIFY_EMAIL_TO=connect@yoca.net
NOTIFY_EMAIL_FROM=Yoca <noreply@yoca.net>
```

Çalıştırın ve derlemeyi doğrulayın:

```bash
npm run build   # ilk derlemenin hatasız geçtiğini görün
npm run dev     # http://localhost:3000
```

Localhost, bilinmeyen host sayıldığından site **yoca.net (İngilizce)**
yapılandırmasıyla açılır. Türkçe/Azerbaycanca davranışı yerelde test etmek için
`/etc/hosts` dosyanıza `127.0.0.1 yoca.tr` ve `127.0.0.1 yoca.az` ekleyip
`http://yoca.tr:3000` adresini açabilirsiniz.

## 3. Vercel Dağıtımı

1. Projeyi bir GitHub reposuna push'layın → Vercel'de **Add New → Project** ile içe aktarın.
2. **Settings → Environment Variables**: `.env.local` içindeki tüm değişkenleri ekleyin
   (Production + Preview), sonra **Redeploy**.
3. **Settings → Domains**: dört domaini de ekleyin —
   `yoca.net`, `yoca.tr`, `yoca.com.tr`, `yoca.az` (dilerseniz `www.` varyantları da).
4. Vercel'in her domain için gösterdiği DNS kayıtlarını domain sağlayıcınıza girin
   (genellikle apex için `A 76.76.21.21`, www için `CNAME cname.vercel-dns.com`).

DNS yayıldıktan sonra middleware her şeyi otomatik yönetir:

| İstek | Sonuç |
|---|---|
| `yoca.net` | İngilizce site |
| `yoca.tr` | Türkçe site |
| `yoca.com.tr` | 308 → `yoca.tr` (duplicate content önlenir) |
| `yoca.az` | Azerbaycanca site |
| `www.*` | 308 → apex |

## 4. İçerik Yönetimi (Supabase Studio → Table Editor)

| Tablo | Ne işe yarar |
|---|---|
| `sections` | `is_active` = false → o bölüm sitede anında gizlenir (hero, bento, services, clients, partners, team, clocks, checkup_banner, cta) |
| `menus` | Header/footer linkleri; `order_index` sıralar, `is_active` gizler. Tablo boşaltılırsa varsayılan menü devreye girer |
| `team_members` | Gerçek ekibinizi ekleyin: `name`, `role`, `image_url` (Storage'a yükleyip public URL verin), `linkedin`, `tags` (dizi: `{"SEO","CRO","Growth"}`). Tablo boşken ekip bölümü hiç görünmez |
| `checkup_submissions` | Check-Up başvuruları; skor `contact_info_json.score` içinde (0–100) |
| `contact_submissions` | İletişim formu mesajları |

Ekip fotoğrafı yüklemek için: **Storage → New bucket** (`public` işaretli, adı örn.
`team`) → fotoğrafı yükleyin → **Get URL** → `image_url` alanına yapıştırın.

## 5. Yayın Sonrası Kontrol Listesi

- [ ] Dört domain de açılıyor, `yoca.com.tr` → `yoca.tr`'ye yönleniyor
- [ ] Sayfa kaynağında `hreflang` etiketleri dört varyantı gösteriyor
- [ ] Her domainde `/sitemap.xml` ve `/robots.txt` çalışıyor
- [ ] `/checkup` sihirbazını tamamlayınca kayıt `checkup_submissions`'a düşüyor
- [ ] `/contact` formu `contact_submissions`'a düşüyor
- [ ] (Resend kuruluysa) bildirim e-postaları geliyor
- [ ] Google Search Console'a üç kanonik domain de eklendi
- [ ] Partner rozetlerindeki seviyeler gerçek sertifikasyonlarınızla uyumlu

## Sorun Giderme

| Belirti | Çözüm |
|---|---|
| Bölümler görünmüyor | `sections` tablosunda ilgili satırın `is_active` değeri |
| Form 503 dönüyor | Supabase env değişkenleri eksik/yanlış — Vercel'de kontrol edin |
| Form 500 dönüyor | `schema.sql` çalıştırılmamış olabilir (tablo yok) |
| Yanlış dil açılıyor | Domain, Vercel'e eklendi mi? Middleware yalnızca tanıdığı hostları eşler |
| E-posta gelmiyor | `RESEND_API_KEY` doğru mu, `NOTIFY_EMAIL_FROM` Resend'de doğrulanmış bir domain mi |
