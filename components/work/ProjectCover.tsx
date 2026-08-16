/* eslint-disable @next/next/no-img-element */
import { getWorkMedia } from '@/lib/workMedia';
import { getWorkTheme } from '@/lib/workThemes';

/**
 * Yoca — project cover.
 * Shows the REAL hero media when it is registered in lib/workMedia.ts.
 * Otherwise a typographic cover in the project's own identity (theme):
 * name at display scale, sector, a project-specific motif and a small
 * Yoca index mark — never a fake screenshot. Pure component (server or client).
 */
interface ProjectCoverProps {
  slug: string;
  name: string;
  sector: string;
  index?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

function Motif({ kind, accent, tone }: { kind: string; accent: string; tone: string }) {
  if (kind === 'horizon') {
    return (
      <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="128" x2="400" y2="128" stroke={accent} strokeOpacity="0.5" strokeWidth="1" />
        <line x1="0" y1="146" x2="400" y2="146" stroke={accent} strokeOpacity="0.25" strokeWidth="1" />
        <rect x="290" y="70" width="70" height="58" fill={tone} />
        <rect x="330" y="88" width="50" height="40" fill={accent} fillOpacity="0.9" />
      </svg>
    );
  }
  if (kind === 'grid') {
    return (
      <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        {[80, 160, 240, 320].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={tone} strokeWidth="1" />)}
        {[66, 133].map((y) => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={tone} strokeWidth="1" />)}
        <rect x="320" y="0" width="80" height="66" fill={accent} />
      </svg>
    );
  }
  if (kind === 'pulse') {
    return (
      <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 0 140 L 220 140 L 240 100 L 260 170 L 280 120 L 300 140 L 400 140" fill="none" stroke={accent} strokeWidth="2" />
        <circle cx="330" cy="60" r="34" fill={tone} />
        <circle cx="330" cy="60" r="12" fill={accent} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      <path d="M 0 200 L 400 200 L 400 165 Q 300 150 200 168 T 0 160 Z" fill={tone} />
      <path d="M 40 180 C 120 120, 180 190, 250 110 S 360 60, 390 30" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="5 6" />
      <circle cx="40" cy="180" r="4" fill={accent} />
      <circle cx="390" cy="30" r="6" fill={accent} />
    </svg>
  );
}

export default function ProjectCover({ slug, name, sector, index, className, size = 'md', priority }: ProjectCoverProps) {
  const media = getWorkMedia(slug);
  const theme = getWorkTheme(slug);

  if (media.hero) {
    return (
      <img
        src={media.hero}
        alt={name}
        width={1920}
        height={1200}
        loading={priority ? 'eager' : 'lazy'}
        className={`h-full w-full object-cover ${className ?? ''}`}
      />
    );
  }

  const title = size === 'lg' ? 'text-[clamp(32px,5vw,84px)]' : size === 'sm' ? 'text-[clamp(20px,2.4vw,32px)]' : 'text-[clamp(26px,3vw,48px)]';
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className ?? ''}`}
      style={{ background: theme.surface, color: theme.ink }}
      role="img"
      aria-label={`${name} — ${sector}`}
    >
      <Motif kind={theme.motif} accent={theme.accent} tone={theme.tone} />
      <div className="absolute start-[6%] top-[8%] flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ opacity: 0.7 }}>
        <span aria-hidden="true" className="slant block h-2 w-2.5" style={{ background: theme.accent }} />
        {typeof index === 'number' ? String(index + 1).padStart(2, '0') : ''}
      </div>
      <div className="absolute inset-x-[6%] bottom-[9%]">
        <p className={`${title} font-extrabold leading-[0.98] tracking-[-0.035em]`}>{name}</p>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ opacity: 0.7 }}>{sector}</p>
      </div>
    </div>
  );
}
