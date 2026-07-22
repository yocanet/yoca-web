import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CheckUpWizard from '@/components/checkup/CheckUpWizard';
import { getDict } from '@/lib/i18n';
import { getContent } from '@/lib/content';
import { buildMetadata, breadcrumbSchema, getRequestContext, jsonLdString } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  return buildMetadata({
    ctx,
    path: '/checkup',
    title: t.meta.checkupTitle,
    description: t.meta.checkupDescription,
  });
}

export default async function CheckupPage() {
  const ctx = getRequestContext();
  const t = await getContent(ctx.locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            breadcrumbSchema(ctx.host, [
              { name: t.nav.home, path: ctx.base },
              { name: t.nav.checkup, path: `${ctx.base}/checkup` },
            ]),
          ),
        }}
      />
      <SiteHeader t={t} path="/checkup" />
      <main id="main">
        <section
          className="relative z-[7] pb-10 pt-44"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 85% 0%, rgba(162,255,0,0.06), transparent 70%), #0D0E12',
          }}
        >
          <div className="container-y">
            <p className="eyebrow">{t.checkup.eyebrow}</p>
            <h1 className="mt-5 max-w-[26ch] text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
              {t.checkup.introTitle}
            </h1>
            <p className="mt-5 max-w-[62ch] text-[17px] leading-relaxed text-muted">
              {t.checkup.introSub}
            </p>
          </div>
        </section>

        <section className="relative z-[7] bg-surface py-16 lg:py-20">
          <div className="container-y">
            <div className="mx-auto max-w-3xl">
              <CheckUpWizard locale={ctx.locale} t={t.checkup} />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter t={t} />
    </>
  );
}
