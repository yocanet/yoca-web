import type { ReactNode } from 'react';

/**
 * Yoca — safe Markdown renderer (server-side, React output).
 * A deliberately small subset: paragraphs, H2/H3, ordered/unordered lists,
 * blockquote, horizontal rule, images with captions, inline bold/italic/code
 * and links. Output is React elements only — no HTML strings, no
 * dangerouslySetInnerHTML — so stored content can never inject markup.
 * Links are restricted to http(s):, mailto: and site-relative paths.
 */

const SAFE_HREF = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i;

function safeHref(href: string): string | null {
  const trimmed = href.trim();
  return SAFE_HREF.test(trimmed) ? trimmed : null;
}

/** Inline: **bold**, *italic*, `code`, [text](url) */
export function renderInline(text: string, keyPrefix = 'i'): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let n = 0;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${n++}`;
    if (token.startsWith('**')) out.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    else if (token.startsWith('`')) out.push(<code key={key}>{token.slice(1, -1)}</code>);
    else if (token.startsWith('*')) out.push(<em key={key}>{token.slice(1, -1)}</em>);
    else {
      const m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      const href = m ? safeHref(m[2]) : null;
      if (m && href) {
        const external = /^https?:\/\//i.test(href);
        out.push(
          <a key={key} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {m[1]}
          </a>,
        );
      } else out.push(m ? m[1] : token);
    }
    last = match.index + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type Block =
  | { type: 'p'; text: string }
  | { type: 'h2' | 'h3'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'hr' }
  | { type: 'img'; src: string; alt: string; caption?: string };

export function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (!t) { i += 1; continue; }
    if (/^---+$/.test(t)) { blocks.push({ type: 'hr' }); i += 1; continue; }
    const h = /^(#{1,3})\s+(.*)$/.exec(t);
    if (h) { blocks.push({ type: h[1].length === 1 ? 'h2' : (`h${h[1].length}` as 'h2' | 'h3'), text: h[2].trim() }); i += 1; continue; }
    const img = /^!\[([^\]]*)\]\(([^)\s]+)\)(?:\s*\*([^*]+)\*)?$/.exec(t);
    if (img) {
      const src = safeHref(img[2]);
      if (src) blocks.push({ type: 'img', src, alt: img[1], caption: img[3]?.trim() });
      i += 1; continue;
    }
    if (/^>\s?/.test(t)) {
      const q: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) { q.push(lines[i].trim().replace(/^>\s?/, '')); i += 1; }
      blocks.push({ type: 'quote', text: q.join(' ') });
      continue;
    }
    if (/^[-*]\s+/.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^[-*]\s+/, '')); i += 1; }
      blocks.push({ type: 'ul', items });
      continue;
    }
    if (/^\d+[.)]\s+/.test(t)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+[.)]\s+/, '')); i += 1; }
      blocks.push({ type: 'ol', items });
      continue;
    }
    // paragraph: consecutive non-empty, non-block lines
    const p: string[] = [];
    while (i < lines.length) {
      const c = lines[i].trim();
      if (!c || /^(#{1,3}\s|[-*]\s|\d+[.)]\s|>|---|!\[)/.test(c)) break;
      p.push(c); i += 1;
    }
    blocks.push({ type: 'p', text: p.join(' ') });
  }
  return blocks;
}

/** Plain-text extraction (reading time, excerpts). */
export function markdownToText(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*`_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function readingMinutes(md: string, wpm = 210): number {
  const words = markdownToText(md).split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

/** Headings for a table of contents / section-level AI actions. */
export function markdownHeadings(md: string): Array<{ level: 2 | 3; text: string }> {
  return parseMarkdown(md)
    .filter((b): b is { type: 'h2' | 'h3'; text: string } => b.type === 'h2' || b.type === 'h3')
    .map((b) => ({ level: b.type === 'h2' ? 2 : 3, text: b.text }));
}

export function Markdown({ md, className }: { md: string; className?: string }) {
  const blocks = parseMarkdown(md);
  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const key = `b-${index}`;
        switch (block.type) {
          case 'h2': return <h2 key={key}>{renderInline(block.text, key)}</h2>;
          case 'h3': return <h3 key={key}>{renderInline(block.text, key)}</h3>;
          case 'ul': return <ul key={key}>{block.items.map((it, j) => <li key={j}>{renderInline(it, `${key}-${j}`)}</li>)}</ul>;
          case 'ol': return <ol key={key}>{block.items.map((it, j) => <li key={j}>{renderInline(it, `${key}-${j}`)}</li>)}</ol>;
          case 'quote': return <blockquote key={key}>{renderInline(block.text, key)}</blockquote>;
          case 'hr': return <hr key={key} />;
          case 'img':
            return (
              <figure key={key}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt} loading="lazy" />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          default: return <p key={key}>{renderInline(block.text, key)}</p>;
        }
      })}
    </div>
  );
}
