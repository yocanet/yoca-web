/**
 * Yoca — case-study media manifest.
 *
 * Art-directed CONCEPT presentation media lives under /public/work/<slug>/.
 * These are concept visuals for concept projects — never presented as live
 * client screenshots or performance evidence. Register a file here ONLY when
 * it exists; the case-study page renders a chapter per registered slot.
 *
 *   hero.webp          1920×1200  large project hero (device presentation)
 *   brand-01.webp      1600×1000  identity / brand system board
 *   desktop-01.webp    1920×1200  desktop screen (browser frame)
 *   desktop-02.webp    1920×1200  second desktop screen
 *   mobile-01.webp     900×1800   phone screen
 *   mobile-02.webp     900×1800   second phone screen
 *   interaction.webm   1600×1000  ≤ 8 s muted loop, with poster interaction.webp
 */

export interface WorkMedia {
  hero?: string;
  brand?: string[];
  desktop?: string[];
  mobile?: string[];
  interaction?: { video: string; poster: string };
}

export const WORK_MEDIA: Record<string, WorkMedia> = {
  'marina-vista': {
    hero: '/work/marina-vista/hero.webp',
    desktop: ['/work/marina-vista/desktop-01.webp', '/work/marina-vista/desktop-02.webp'],
    mobile: ['/work/marina-vista/mobile-01.webp', '/work/marina-vista/mobile-02.webp'],
    interaction: { video: '/work/marina-vista/interaction.webm', poster: '/work/marina-vista/interaction.webp' },
  },
  'vertex-studio': {
    hero: '/work/vertex-studio/hero.webp',
    desktop: ['/work/vertex-studio/desktop-01.webp', '/work/vertex-studio/desktop-02.webp'],
    mobile: ['/work/vertex-studio/mobile-01.webp', '/work/vertex-studio/mobile-02.webp'],
    interaction: { video: '/work/vertex-studio/interaction.webm', poster: '/work/vertex-studio/interaction.webp' },
  },
  'novis-clinic': {
    hero: '/work/novis-clinic/hero.webp',
    desktop: ['/work/novis-clinic/desktop-01.webp', '/work/novis-clinic/desktop-02.webp'],
    mobile: ['/work/novis-clinic/mobile-01.webp', '/work/novis-clinic/mobile-02.webp'],
    interaction: { video: '/work/novis-clinic/interaction.webm', poster: '/work/novis-clinic/interaction.webp' },
  },
  'roam-safaris': {
    hero: '/work/roam-safaris/hero.webp',
    desktop: ['/work/roam-safaris/desktop-01.webp', '/work/roam-safaris/desktop-02.webp'],
    mobile: ['/work/roam-safaris/mobile-01.webp', '/work/roam-safaris/mobile-02.webp'],
    interaction: { video: '/work/roam-safaris/interaction.webm', poster: '/work/roam-safaris/interaction.webp' },
  },
};

export function getWorkMedia(slug: string): WorkMedia {
  return WORK_MEDIA[slug] ?? {};
}
