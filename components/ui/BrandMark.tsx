/**
 * Yoca — the mark, drawn from the logo file (never approximated).
 * Server-safe inline SVG: use `variant="mark"` for the Y symbol,
 * `variant="modules"` for the two stacked lime/green modules alone
 * (section accents, list markers, decorative corners).
 */

export const MARK_PATHS = {
  lime: 'M0,16.71L1.36.62h16.18l-1.36,16.09H0Z',
  green: 'M25.49,16.71l-1.36,16.09H7.95l1.36-16.09h16.18Z',
  y: 'M42.59,69.04h-16.41l7.31-20.13h-18.06l1.23-16.09h22.9L50.92.62h16.51l-24.83,68.42Z',
} as const;

interface BrandMarkProps {
  variant?: 'mark' | 'modules';
  /** Colour of the Y stroke (mark variant only). */
  ink?: string;
  className?: string;
}

export default function BrandMark({ variant = 'mark', ink = '#FFFFFF', className }: BrandMarkProps) {
  if (variant === 'modules') {
    return (
      <svg viewBox="-0.5 0 26.5 33.5" aria-hidden="true" className={className} focusable="false">
        <path d={MARK_PATHS.lime} fill="#A2FF00" />
        <path d={MARK_PATHS.green} fill="#40C401" />
      </svg>
    );
  }
  return (
    <svg viewBox="-1 -0.5 70 70.5" aria-hidden="true" className={className} focusable="false">
      <path d={MARK_PATHS.lime} fill="#A2FF00" />
      <path d={MARK_PATHS.green} fill="#40C401" />
      <path d={MARK_PATHS.y} fill={ink} />
    </svg>
  );
}
