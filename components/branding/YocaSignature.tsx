import styles from "./YocaSignature.module.css";

export type YocaSignatureVariant = "built" | "signature";
export type YocaSignatureTheme = "light" | "dark" | "auto";

export interface YocaSignatureProps {
  /** "built" = Built by [YOCA.]  |  "signature" = Made to move forward. [YOCA.] */
  variant?: YocaSignatureVariant;
  /** "auto" follows prefers-color-scheme and any ancestor .dark / [data-theme="dark"] */
  theme?: YocaSignatureTheme;
  /** utm_source value. Client name ("Marina Vista") or hostname ("www.client.com"). */
  source?: string;
  className?: string;
}

const YOCA_URL = "https://yoca.net/";

const VARIANTS = {
  built: {
    text: "Built by",
    campaign: "built_by_yoca",
    ariaLabel: "Built by Yoca",
  },
  signature: {
    text: "Made to move forward.",
    campaign: "made_to_move_forward",
    ariaLabel: "Made to move forward. By Yoca",
  },
} as const;

/** "Marina Vista" -> "marina-vista" · "https://www.client.com/tr" -> "client.com" */
function normalizeSource(raw?: string): string | undefined {
  if (!raw) return undefined;
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, "")
    .replace(/^www\./, "")
    .replace(/[/?#].*$/, "");
  if (!cleaned) return undefined;
  const isHostname = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(cleaned);
  if (isHostname) return cleaned;
  return cleaned.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || undefined;
}

function resolveSource(source?: string): string | undefined {
  if (source) return normalizeSource(source);
  // Build-time fallback — no window access, so the component stays server-renderable
  // and hydration-safe. Set NEXT_PUBLIC_SITE_URL=https://www.client.com to use it.
  const envUrl =
    typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_SITE_URL : undefined;
  return normalizeSource(envUrl);
}

function buildHref(campaign: string, source?: string): string {
  const params = new URLSearchParams();
  if (source) params.set("utm_source", source);
  params.set("utm_medium", "footer");
  params.set("utm_campaign", campaign);
  return `${YOCA_URL}?${params.toString()}`;
}

export default function YocaSignature({
  variant = "built",
  theme = "auto",
  source,
  className,
}: YocaSignatureProps) {
  const config = VARIANTS[variant];
  const href = buildHref(config.campaign, resolveSource(source));

  return (
    <a
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-theme={theme}
      data-variant={variant}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={config.ariaLabel}
    >
      <span className={styles.label}>{config.text}</span>

      {/* Official Yoca logo — original path data, unmodified proportions. */}
      <svg
        className={styles.mark}
        viewBox="0 0 250 69.05"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path className={styles.ink} d="M79.32,47.06c-4.08-2.17-7.28-5.16-9.6-8.99-2.33-3.82-3.49-8.13-3.49-12.92s1.16-9.1,3.49-12.92c2.32-3.82,5.53-6.82,9.6-8.99,4.08-2.17,8.68-3.25,13.78-3.25s9.71,1.08,13.78,3.25c4.08,2.17,7.28,5.16,9.6,8.99,2.32,3.82,3.49,8.13,3.49,12.92s-1.16,9.1-3.49,12.92c-2.33,3.82-5.53,6.82-9.6,8.99-4.08,2.17-8.68,3.25-13.78,3.25s-9.7-1.08-13.78-3.25ZM99.73,37.25c1.98-1.15,3.55-2.77,4.7-4.87s1.72-4.5,1.72-7.22-.57-5.13-1.72-7.22c-1.15-2.1-2.72-3.72-4.7-4.87-1.98-1.15-4.19-1.72-6.63-1.72s-4.65.57-6.63,1.72c-1.98,1.15-3.55,2.77-4.7,4.87-1.15,2.1-1.72,4.5-1.72,7.22s.57,5.13,1.72,7.22c1.15,2.1,2.72,3.72,4.7,4.87,1.98,1.15,4.19,1.72,6.63,1.72s4.65-.57,6.63-1.72Z" />
        <path className={styles.ink} d="M137.64,47.09c-4.03-2.14-7.19-5.13-9.5-8.95-2.3-3.82-3.46-8.16-3.46-12.99s1.15-9.16,3.46-12.99c2.3-3.82,5.47-6.81,9.5-8.95,4.03-2.14,8.58-3.22,13.65-3.22,4.42,0,8.41.78,11.96,2.35,3.55,1.57,6.5,3.82,8.84,6.77l-8.71,7.88c-3.13-3.78-6.93-5.67-11.4-5.67-2.63,0-4.96.57-7.02,1.72-2.06,1.15-3.64,2.77-4.76,4.87-1.13,2.1-1.69,4.5-1.69,7.22s.56,5.13,1.69,7.22c1.13,2.1,2.72,3.72,4.76,4.87,2.04,1.15,4.39,1.72,7.02,1.72,4.46,0,8.27-1.89,11.4-5.67l8.71,7.88c-2.35,2.95-5.29,5.21-8.84,6.77-3.55,1.57-7.54,2.34-11.96,2.34-5.06,0-9.62-1.07-13.65-3.22h0Z" />
        <path className={styles.ink} d="M209.75,39.94h-20.46l-3.8,9.39h-13.96L192.88.97h13.47l21.42,48.38h-14.24l-3.8-9.39h.01ZM205.74,29.85l-6.22-15.47-6.22,15.47h12.44Z" />
        <path className={styles.accent} d="M25.49,16.71l-1.36,16.09H7.95l1.36-16.09h16.18Z" />
        <path className={styles.accentAlt} d="M0,16.71L1.36.62h16.18l-1.36,16.09H0Z" />
        <path className={styles.ink} d="M42.59,69.04h-16.41s7.31-20.13,7.31-20.13h-9.96v-.02h-8.1l1.23-16.09h14.66v.06s8.24,0,8.24,0L50.92.62h16.51l-24.83,68.42Z" />
        <path className={styles.accent} d="M232.24,49.16l1.37-16.29h16.39l-1.38,16.29h-16.38Z" />
      </svg>

      <svg
        className={styles.arrow}
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M2.5 7.5 7.5 2.5M3.4 2.5h4.1v4.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
