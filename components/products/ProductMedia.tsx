/* eslint-disable @next/next/no-img-element */
import type { ProductMedia as ProductMediaSpec } from '@/lib/productMedia';

/**
 * Yoca — product media compositions (server component, CSS only).
 * phones   → one primary screen + two supporting screens, offset (no row of
 *            three identical mockups, no floating animation)
 * browsers → one primary window + offset supporting windows (Demo Hub)
 * art      → two expressive images side by side (Labs) — allowed to breathe
 * The images already carry their framing; no extra device shells.
 */
interface ProductMediaProps {
  media: ProductMediaSpec;
  name: string;
}

export default function ProductMedia({ media, name }: ProductMediaProps) {
  if (media.kind === 'phones') {
    const [a, b, c] = media.images;
    return (
      <div className="relative mx-auto grid w-full max-w-[420px] grid-cols-[1fr_1.25fr_1fr] items-end gap-3" aria-label={name}>
        <img src={a} alt={`${name} — 01`} width={900} height={1800} loading="lazy" className="block h-auto w-full border border-[rgba(5,5,5,0.16)]" />
        <img src={b} alt={`${name} — 02`} width={900} height={1800} loading="lazy" className="relative z-10 -mb-3 block h-auto w-full border border-[rgba(5,5,5,0.16)] shadow-[0_18px_40px_rgba(5,5,5,0.18)]" />
        <img src={c} alt={`${name} — 03`} width={900} height={1800} loading="lazy" className="mb-6 block h-auto w-full border border-[rgba(5,5,5,0.16)]" />
      </div>
    );
  }
  if (media.kind === 'browsers') {
    const [primary, ...rest] = media.images;
    return (
      <div className="relative w-full pb-10 pe-8" aria-label={name}>
        {rest.slice(0, 2).map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            width={1920}
            height={1200}
            loading="lazy"
            className="absolute block h-auto border border-[rgba(5,5,5,0.16)] opacity-90"
            style={{ width: '82%', insetInlineEnd: `${index * 4}%`, bottom: `${index * 5}%`, zIndex: 1 + index }}
          />
        ))}
        <img src={primary} alt={`${name} — 01`} width={1920} height={1200} loading="lazy" className="relative z-10 block h-auto w-[86%] border border-[rgba(5,5,5,0.16)] shadow-[0_18px_40px_rgba(5,5,5,0.16)]" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3" aria-label={name}>
      {media.images.slice(0, 2).map((src, index) => (
        <img key={src} src={src} alt={`${name} — ${index + 1}`} width={1600} height={1000} loading="lazy" className={`block h-auto w-full border border-[rgba(5,5,5,0.16)] ${index === 1 ? 'mt-8' : ''}`} />
      ))}
    </div>
  );
}
