/* eslint-disable @next/next/no-img-element */
import { getWorkMedia } from '@/lib/workMedia';

/**
 * Yoca — project cover (authentic media only).
 * Renders the REAL hero capture registered in lib/workMedia.ts, or the first
 * real mobile capture for the portrait variant. Returns null when no
 * authentic media exists — callers show the typographic treatment instead.
 * No generated art, no fabricated screens, ever.
 */
interface ProjectCoverProps {
  slug: string;
  name: string;
  sector: string;
  index?: number;
  className?: string;
  priority?: boolean;
  variant?: 'landscape' | 'portrait';
  position?: 'center' | 'top';
}

export default function ProjectCover({ slug, name, className, priority, variant = 'landscape', position = 'center' }: ProjectCoverProps) {
  const media = getWorkMedia(slug);

  if (variant === 'portrait' && media.mobile?.[0]) {
    return (
      <img
        src={media.mobile[0]}
        alt={name}
        width={900}
        height={1800}
        loading={priority ? 'eager' : 'lazy'}
        className={`block h-full w-full object-cover object-top ${className ?? ''}`}
      />
    );
  }

  if (!media.hero) return null;

  return (
    <img
      src={media.hero}
      alt={name}
      width={1920}
      height={1200}
      loading={priority ? 'eager' : 'lazy'}
      className={`h-full w-full object-cover ${position === 'top' ? 'object-top' : 'object-center'} ${className ?? ''}`}
    />
  );
}
