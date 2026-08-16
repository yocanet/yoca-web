import Link from 'next/link';
import { getDict } from '@/lib/i18n';
import { getRequestContext } from '@/lib/seo';

/** Yoca — branded 404 page (locale-aware via the request host). */

export default function NotFound() {
  const ctx = getRequestContext();
  const t = getDict(ctx.locale);

  return (
    <main
      id="main"
      className="intro-slab relative z-[7] grid min-h-screen place-items-center bg-surface-deep px-5 py-24 text-center"
    >
      <div className="grid justify-items-center gap-4">
        <p
          aria-hidden="true"
          className="text-[clamp(70px,14vw,150px)] font-extrabold leading-none tracking-tighter"
        >
          404<span className="text-yoca-lime">.</span>
        </p>
        <h1 className="max-w-[24ch] text-xl font-extrabold sm:text-2xl lg:text-3xl">
          {t.notFound.heading}
        </h1>
        <p className="max-w-[50ch] text-muted">{t.notFound.text}</p>
        <Link href={ctx.base} className="btn-primary mt-3 px-8 py-4 text-base">
          {t.notFound.back}
        </Link>
      </div>
    </main>
  );
}
