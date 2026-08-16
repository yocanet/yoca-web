import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PageIntro from '@/components/ui/PageIntro';
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
        <PageIntro eyebrow={t.checkup.eyebrow} title={t.checkup.introTitle} sub={t.checkup.introSub} compact titleMax="max-w-[22ch]" />

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
