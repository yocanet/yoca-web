import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import AmbientBackground from '@/components/ui/AmbientBackground';
import CookieConsent from '@/components/ui/CookieConsent';
import { getDict } from '@/lib/i18n';
import {
  buildMetadata,
  getRequestContext,
  jsonLdString,
  organizationSchema,
  professionalServiceSchema,
} from '@/lib/seo';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export function generateMetadata(): Metadata {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);
  return buildMetadata({
    ctx,
    path: '/',
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
  });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);

  return (
    <html lang={ctx.locale} className={manrope.variable}>
      <body className="font-sans">
        {/* JSON-LD structured data (valid anywhere in the document) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationSchema(ctx.host)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(professionalServiceSchema(ctx.host, ctx.locale)),
          }}
        />
        <AmbientBackground />
        {children}
        <CookieConsent
          text={t.cookies.text}
          acceptAll={t.cookies.acceptAll}
          essentialOnly={t.cookies.essentialOnly}
        />
      </body>
    </html>
  );
}
