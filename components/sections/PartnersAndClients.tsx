/* eslint-disable @next/next/no-img-element */
import type { ClientLogo, PartnerBadge } from '@/types';
import type { Dict } from '@/lib/i18n';

/**
 * Yoca — Client Logos Marquee & Official Partner Badges.
 *
 * - Pure-CSS infinite marquee: logos render grayscale(100%) opacity-50 and
 *   transition to full colour + a subtle lift on hover; the track pauses
 *   while hovered.
 * - Glassmorphism partner badges (Google Premier / Meta Business / TikTok
 *   Marketing Partner) with verification icon and brand-coloured glow.
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

const PARTNERS: PartnerBadge[] = [
  { key: 'google', name: 'Google', level: 'Google Premier Partner', glow: '66,133,244' },
  { key: 'meta', name: 'Meta', level: 'Meta Business Partner', glow: '0,129,253' },
  { key: 'tiktok', name: 'TikTok', level: 'TikTok Marketing Partner', glow: '105,201,208' },
];

/**
 * Official partner-program verification links.
 * TODO(yoca): replace each with your public verification PROFILE URL
 * (e.g. your Google Partners directory listing) once certified.
 */
const PARTNER_URLS: Record<PartnerBadge['key'], string> = {
  google: 'https://www.google.com/partners/',
  meta: 'https://www.facebook.com/business/marketing-partners',
  tiktok: 'https://partners.tiktok.com/',
};

function GoogleMark() {
  const letters: Array<[string, string]> = [
    ['G', '#4285F4'],
    ['o', '#EA4335'],
    ['o', '#FBBC05'],
    ['g', '#4285F4'],
    ['l', '#34A853'],
    ['e', '#EA4335'],
  ];
  return (
    <span className="text-2xl font-bold tracking-tight" aria-hidden="true">
      {letters.map(([letter, color], index) => (
        <span key={index} style={{ color }}>
          {letter}
        </span>
      ))}
    </span>
  );
}

function MetaMark() {
  return (
    <span className="flex items-center gap-2 text-2xl font-bold text-white" aria-hidden="true">
      <svg viewBox="0 0 36 24" width="34" height="22" fill="#0081FD">
        <path d="M25.8 1.6c-2.9 0-5.2 2.2-7.2 5-.6.9-1.2 1.8-1.7 2.7-.5-.8-1-1.6-1.6-2.4-2-2.9-4.2-5.3-7.2-5.3C3.6 1.6.9 5.4.9 11.3c0 4 1.8 7 5 7 2.6 0 4.3-1.6 7-6.1l1.4-2.4c.4.7.9 1.5 1.4 2.4 2.9 4.8 4.6 6.1 7.2 6.1 3.1 0 5.1-2.8 5.1-7.1 0-6-2.7-9.6-6.2-9.6zM10.6 13.5c-1.9 3.1-2.9 3.9-4.4 3.9-1.6 0-2.7-1.5-2.7-4.2 0-4.2 1.7-6.8 4-6.8 1.7 0 3.2 1.4 5.1 4.3-1 1.4-1.4 2-2 2.8zm14.5 3.9c-1.5 0-2.4-.8-4.5-4.2l-1.5-2.5c1.9-3 3.5-4.3 5-4.3 2.1 0 3.5 2.3 3.5 6 0 3.2-1 5-2.5 5z" />
      </svg>
      Meta
    </span>
  );
}

function TikTokMark() {
  return (
    <span className="flex items-center gap-2 text-2xl font-bold text-white" aria-hidden="true">
      <svg viewBox="0 0 20 24" width="18" height="21" fill="#69C9D0">
        <path d="M15.5 0h-3.9v16.1c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5c.4 0 .7.1 1.1.2V8.8c-.4 0-.7-.1-1.1-.1C4 8.7.7 12 .7 16.1S4 23.5 8.1 23.5s7.4-3.3 7.4-7.4V8c1.4 1 3.2 1.7 5 1.7V5.8c-2.8-.1-5-2.7-5-5.8z" />
      </svg>
      TikTok
    </span>
  );
}

const MARKS: Record<PartnerBadge['key'], () => JSX.Element> = {
  google: GoogleMark,
  meta: MetaMark,
  tiktok: TikTokMark,
};

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
            <p className="mb-8 flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em] text-subtle after:h-px after:flex-1 after:bg-line">
              {t.clients.heading}
            </p>
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
              {PARTNERS.map((partner) => {
                const Mark = MARKS[partner.key];
                return (
                  <a
                    key={partner.key}
                    href={PARTNER_URLS[partner.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${partner.level} — official verification`}
                    className="glass group relative grid justify-items-start gap-3.5 rounded-md p-8 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        boxShadow: `0 0 44px rgba(${partner.glow},0.16), inset 0 0 24px rgba(${partner.glow},0.05)`,
                      }}
                      aria-hidden="true"
                    />
                    <div className="flex min-h-[34px] items-center">
                      <Mark />
                    </div>
                    <h3 className="text-base font-bold text-soft">{partner.level}</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-yoca-green/35 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-yoca-green">
                      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                        <path
                          d="M8 0l1.9 1.4 2.3-.3 1 2.1 2.1 1-.3 2.3L16 8l-1.4 1.9.3 2.3-2.1 1-1 2.1-2.3-.3L8 16l-1.9-1.4-2.3.3-1-2.1-2.1-1 .3-2.3L0 8l1.4-1.9L1.1 3.8l2.1-1 1-2.1 2.3.3z"
                          fill="currentColor"
                          opacity="0.9"
                        />
                        <path d="M6.9 10.7L4.6 8.4l1-1 1.3 1.3 3.4-3.4 1 1z" fill="#000" />
                      </svg>
                      {t.partners.verified}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
