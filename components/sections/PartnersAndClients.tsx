/* eslint-disable @next/next/no-img-element */
import type { ClientLogo } from '@/types';
import type { Dict } from '@/lib/i18n';

/**
 * Yoca — Client Logos Marquee & Official Partner Badges.
 *
 * - Pure-CSS infinite marquee: logos render grayscale(100%) opacity-50 and
 *   transition to full colour + a subtle lift on hover; the track pauses
 *   while hovered.
 * - Platform stack ("Built with the platforms behind modern digital growth"):
 *   Measure / Grow / Build tool categories — no partner badges are claimed
 *   without an official verification URL.
 */

interface PartnersAndClientsProps {
  t: { clients: Dict['clients']; partners: Dict['partners'] };
  showClients?: boolean;
  showPartners?: boolean;
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Marina Vista', src: '/clients/marina-vista.svg' },
  { name: 'Vertex Studio', src: '/clients/vertex-studio.svg' },
  { name: 'Novis Clinic', src: '/clients/novis-clinic.svg' },
  { name: 'Roam Safaris', src: '/clients/roam-safaris.svg' },
  { name: 'YocaServe', src: '/clients/yocaserve.svg' },
  { name: 'WonKick', src: '/clients/wonkick.svg' },
];

export default function PartnersAndClients({
  t,
  showClients = true,
  showPartners = true,
}: PartnersAndClientsProps) {
  return (
    <>
      {showClients && (
        <section className="relative z-[7] overflow-hidden py-14 lg:py-20" aria-label={t.clients.heading}>
          <div className="container-y">
            <p className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em] text-subtle after:h-px after:flex-1 after:bg-line">
              {t.clients.heading}
            </p>
            <p className="mb-8 mt-2 max-w-[64ch] text-[13px] text-subtle">{t.clients.sub}</p>
          </div>
          <div className="marquee-mask relative overflow-hidden">
            <div className="group flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap">
              {[0, 1].map((loop) => (
                <div
                  key={loop}
                  aria-hidden={loop === 1}
                  className="flex items-center gap-10 pr-10 sm:gap-20 sm:pr-20"
                >
                  {CLIENT_LOGOS.map((client) => (
                    <span key={`${loop}-${client.name}`} className="block flex-none">
                      <img
                        src={client.src}
                        alt={loop === 0 ? client.name : ''}
                        width={200}
                        height={50}
                        loading="lazy"
                        className="h-10 w-auto opacity-50 grayscale transition-all duration-300 ease-out hover:-translate-y-[3px] hover:opacity-100 hover:grayscale-0"
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showPartners && (
        <section className="relative z-[7] border-t border-line bg-surface-deep py-20 lg:py-28" aria-label={t.partners.heading}>
          <div className="container-y">
            <div className="mb-10 max-w-2xl lg:mb-14">
              <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                {t.partners.heading}
              </h2>
              <p className="mt-3 text-[15px] text-muted">{t.partners.sub}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {t.partners.categories.map((category, index) => (
                <article key={category.name} className="glass rounded-md p-7 lg:p-8">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`block h-2.5 w-2.5 ${index === 0 ? 'bg-yoca-lime' : index === 1 ? 'bg-yoca-green' : 'bg-surface-elevated'}`}
                    />
                    <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-soft">
                      {category.name}
                    </h3>
                  </div>
                  <ul className="mt-5 grid gap-2.5">
                    {category.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-sm border border-line bg-surface px-3.5 py-2.5 text-[14px] font-bold text-soft"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
