/**
 * Yoca — case-study media manifest.
 *
 * Real project media lives under /public/work/<slug>/ using these slots.
 * Register a file here ONLY when it actually exists in the repository — the
 * case-study page renders a visual chapter for each registered slot and
 * silently skips the rest (no placeholders, no fabricated screenshots).
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
  // 'marina-vista': {
  //   hero: '/work/marina-vista/hero.webp',
  //   desktop: ['/work/marina-vista/desktop-01.webp'],
  //   mobile: ['/work/marina-vista/mobile-01.webp'],
  //   interaction: { video: '/work/marina-vista/interaction.webm', poster: '/work/marina-vista/interaction.webp' },
  // },
};

export function getWorkMedia(slug: string): WorkMedia {
  return WORK_MEDIA[slug] ?? {};
}
