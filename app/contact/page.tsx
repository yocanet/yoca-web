import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ContactForm from '@/components/ContactForm';
import { getDict } from '@/lib/i18n';
import { getContent } from '@/lib/content';
import { buildMetadata, breadcrumbSchema, getRequestContext, jsonLdString } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  return buildMetadata({
    ctx,
    path: '/contact',
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
  });
}

export default async function ContactPage() {
  const ctx = getRequestContext();
  const t = await getContent(ctx.locale);
  const base = ctx.base;
  const calendlyUrl = t.contact.calendlyUrl.trim();

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t.contact.heading,
    url: `https://${ctx.host}${base}/contact`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: base },
              { name: t.nav.contact, path: `${base}/contact` },
            ]),
          ),
        }}
      />
      <SiteHeader t={t} path="/contact" />
      <main id="main">
        <section
          className="relative z-[7] pb-14 pt-44"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 85% 0%, rgba(162,255,0,0.06), transparent 70%), #0D0E12',
          }}
        >
          <div className="container-y">
            <p className="eyebrow">{t.contact.eyebrow}</p>
            <h1 className="mt-5 max-w-[20ch] text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              {t.contact.heading}
            </h1>
            <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted">
              {t.contact.description}
            </p>
          </div>
        </section>

        <section className="relative z-[7] py-16 lg:py-20">
          <div className="container-y grid items-start gap-10 lg:grid-cols-[7fr_4fr] lg:gap-16">
            <ContactForm
              locale={ctx.locale}
              t={t.contact}
              errorRequired={t.checkup.errorRequired}
              errorEmail={t.checkup.errorEmail}
              errorGeneric={t.checkup.errorGeneric}
            />
            <aside className="glass grid justify-items-start gap-3 rounded-md p-7 lg:sticky lg:top-28">
              <h2 className="text-[17px] font-extrabold">{t.contact.direct}</h2>
              <a
                href="mailto:connect@yoca.net"
                className="break-all text-[17px] font-bold text-yoca-lime transition-colors hover:text-yoca-green"
              >
                connect@yoca.net
              </a>
              <a
                href="https://instagram.com/thisisyoca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-muted transition-colors hover:text-white"
              >
                @thisisyoca
              </a>
              <p className="mt-2 w-full border-t border-line pt-4 text-[13px] text-subtle">
                {t.contact.based}
              </p>
            </aside>
          </div>
        </section>

        {/* ── Live scheduling (Calendly) — active once a URL is set in /admin ── */}
        {calendlyUrl.startsWith('https://calendly.com/') && (
          <section className="relative z-[7] border-t border-line bg-surface py-16">
            <div className="container-y">
              <div className="mb-8 max-w-2xl">
                <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                  {t.contact.scheduleTitle}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {t.contact.scheduleSub}
                </p>
              </div>
              <div className="overflow-hidden rounded-md border border-line">
                <iframe
                  src={`${calendlyUrl}?hide_gdpr_banner=1&background_color=121418&text_color=f4f4f1&primary_color=a2ff00`}
                  title={t.contact.scheduleTitle}
                  loading="lazy"
                  className="h-[720px] w-full"
                />
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter t={t} />
    </>
  );
}
