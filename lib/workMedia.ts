/**
 * Yoca — case-study media manifest.
 *
 * AUTHENTIC media only: real browser captures / screen recordings of the
 * concept sites Yoca actually built (demo.yoca.net/<slug>/). Never generated
 * mockups. Register a file here ONLY when it exists in /public/work/<slug>/;
 * the case-study page renders a chapter per registered slot and shows the
 * clean typographic cover otherwise.
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
  // Register ONLY authentic captures of the real demo sites
  // (demo.yoca.net/<slug>/). Generated presentation mockups are not allowed.
  // 'marina-vista': {
  //   hero: '/work/marina-vista/hero.webp',
  //   desktop: ['/work/marina-vista/desktop-01.webp', '/work/marina-vista/desktop-02.webp'],
  //   mobile: ['/work/marina-vista/mobile-01.webp', '/work/marina-vista/mobile-02.webp'],
  //   interaction: { video: '/work/marina-vista/interaction.webm', poster: '/work/marina-vista/interaction.webp' },
  // },
};

export function getWorkMedia(slug: string): WorkMedia {
  return WORK_MEDIA[slug] ?? {};
}
