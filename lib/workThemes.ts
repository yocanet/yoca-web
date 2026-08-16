/**
 * Yoca — per-project cover identity (≈80 % project / 20 % Yoca system).
 * Until real project media is registered in lib/workMedia.ts, each cover is a
 * typographic composition in the project's OWN palette and mood — four
 * projects, four worlds — instead of one dark Yoca card repeated four times.
 * Colours here are project identity, deliberately outside the Yoca palette.
 */
export interface WorkTheme {
  /** Cover surface + ink. */
  surface: string;
  ink: string;
  /** Project accent (used for the mark/rule/motif). */
  accent: string;
  /** Secondary tone for the motif. */
  tone: string;
  /** Motif family drawn on the cover. */
  motif: 'horizon' | 'grid' | 'pulse' | 'route';
  /** Cover mood: light covers contrast the dark Yoca frame on purpose. */
  mode: 'light' | 'dark';
}

export const WORK_THEMES: Record<string, WorkTheme> = {
  'marina-vista': { surface: '#E9E3D6', ink: '#1E2A33', accent: '#1E2A33', tone: '#B9A98F', motif: 'horizon', mode: 'light' },
  'vertex-studio': { surface: '#0B0B0B', ink: '#FFFFFF', accent: '#FF4D2E', tone: '#3A3A3A', motif: 'grid', mode: 'dark' },
  'novis-clinic': { surface: '#F3F7F8', ink: '#0F2B33', accent: '#1F8A8A', tone: '#CFE3E5', motif: 'pulse', mode: 'light' },
  'roam-safaris': { surface: '#15271F', ink: '#F5EBD8', accent: '#E0A24A', tone: '#2E4A3A', motif: 'route', mode: 'dark' },
};

const FALLBACK: WorkTheme = { surface: '#171A20', ink: '#F4F4F1', accent: '#A2FF00', tone: '#2A2E37', motif: 'grid', mode: 'dark' };

export function getWorkTheme(slug: string): WorkTheme {
  return WORK_THEMES[slug] ?? FALLBACK;
}
