/**
 * Yoca — brand band.
 * A full-bleed Electric Lime strip carrying the index line
 * ("Strategy. Identity. Experience. Growth.") as oversized black type on a
 * slow marquee. The one moment on the page where the brand colour is the
 * surface, not the accent. Server Component — CSS animation only.
 */

interface BrandBandProps {
  line: string;
}

export default function BrandBand({ line }: BrandBandProps) {
  const words = line
    .split('.')
    .map((word) => word.trim())
    .filter(Boolean);
  const sequence = [...words, ...words];

  return (
    <div
      aria-hidden="true"
      className="relative z-[7] overflow-hidden border-y border-black/20 bg-yoca-lime py-5 text-black lg:py-6"
    >
      <div className="flex w-max motion-safe:animate-marquee motion-reduce:flex-wrap motion-reduce:justify-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {sequence.map((word, index) => (
              <span key={`${copy}-${index}`} className="flex items-center">
                <span className="px-6 text-[clamp(28px,4.4vw,64px)] font-extrabold leading-none tracking-[-0.03em] lg:px-10">
                  {word}.
                </span>
                <span className="slant block h-[0.55em] w-[0.6em] bg-black text-[clamp(28px,4.4vw,64px)]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
