/**
 * Yoca — global motion system (single source of truth).
 *
 * ONE easing curve, ONE duration scale, ONE stagger rhythm — every animated
 * component imports from here instead of inventing its own values, so the
 * whole site moves like it was choreographed by one motion designer.
 *
 * Derived from the fragmented-Y DNA: movement is modular, directional and
 * structural — squares align, grids expand, lines draw. Never bouncy,
 * elastic or decorative.
 */

/** The Yoca ease — confident start, calm settle. Used everywhere. */
export const EASE_YOCA = [0.22, 0.72, 0.32, 1] as const;

/** Duration scale (seconds). micro = hover/press · ui = state change ·
 *  reveal = content entering · slow = ambient/hero. */
export const DUR = {
  micro: 0.2,
  ui: 0.3,
  reveal: 0.55,
  slow: 0.7,
} as const;

/** Shared stagger step between sibling reveals. */
export const STAGGER = 0.08;

/** Vertical travel for content reveals (px). */
export const RISE = 22;

/** Shared viewport config for whileInView reveals. */
export const VIEWPORT_ONCE = { once: true, margin: '-80px' } as const;

/** Standard fade-and-rise reveal props (spread onto a motion element). */
export const fadeRise = (delay = 0) => ({
  initial: { opacity: 0, y: RISE },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_ONCE,
  transition: { duration: DUR.reveal, delay, ease: EASE_YOCA },
});

/** Geometric mask reveal — content emerges from structure (clip wipe). */
export const maskReveal = (delay = 0) => ({
  initial: { clipPath: 'inset(0 100% 0 0)' },
  whileInView: { clipPath: 'inset(0 0% 0 0)' },
  viewport: VIEWPORT_ONCE,
  transition: { duration: DUR.slow, delay, ease: EASE_YOCA },
});

/** Line-draw transition for SVG paths (pair with pathLength 0 → 1). */
export const lineDraw = (delay = 0) => ({
  duration: DUR.slow + 0.3,
  delay,
  ease: EASE_YOCA,
});

/** Structured alias of the same tokens (fast / normal / editorial vocabulary). */
export const MOTION = {
  duration: { fast: DUR.micro, normal: DUR.ui, editorial: DUR.slow },
  ease: { standard: EASE_YOCA, enter: EASE_YOCA, exit: [0.4, 0, 0.6, 1] as const },
  distance: { xs: 6, sm: 12, md: RISE },
  /** Maximum pointer-driven displacement (px) for reactive layers. */
  pointer: { max: 10 },
} as const;
