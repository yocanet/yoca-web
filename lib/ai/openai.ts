/**
 * Yoca — OpenAI Responses API client (server only).
 * Plain fetch (no SDK dependency). Models are configured through env so they
 * can change without touching UI code:
 *   OPENAI_API_KEY               required
 *   OPENAI_EDITORIAL_MODEL       default gpt-4.1
 *   OPENAI_RESEARCH_MODEL        default gpt-4.1
 * Structured outputs use json_schema (strict) so the app never parses prose.
 */

export const MODELS = {
  editorial: process.env.OPENAI_EDITORIAL_MODEL || 'gpt-4.1',
  research: process.env.OPENAI_RESEARCH_MODEL || 'gpt-4.1',
} as const;

const ENDPOINT = 'https://api.openai.com/v1/responses';

export interface OpenAIUsage {
  input_tokens?: number;
  output_tokens?: number;
}

export interface OpenAIResult<T> {
  data: T;
  usage: OpenAIUsage;
  requestId?: string;
  raw?: unknown;
}

export class OpenAIError extends Error {
  status: number;
  requestId?: string;
  constructor(message: string, status: number, requestId?: string) {
    super(message);
    this.status = status;
    this.requestId = requestId;
  }
}

interface CallOptions {
  model: string;
  system: string;
  user: string;
  /** JSON schema for strict structured output (omit for free text). */
  schema?: { name: string; schema: Record<string, unknown> };
  tools?: Array<Record<string, unknown>>;
  maxOutputTokens?: number;
  timeoutMs?: number;
}

/** Extract concatenated output text from a Responses API payload. */
function outputText(payload: unknown): string {
  const p = payload as { output_text?: string; output?: Array<{ type: string; content?: Array<{ type: string; text?: string }> }> };
  if (typeof p.output_text === 'string') return p.output_text;
  const parts: string[] = [];
  for (const item of p.output ?? []) {
    if (item.type !== 'message') continue;
    for (const c of item.content ?? []) if (c.type === 'output_text' && c.text) parts.push(c.text);
  }
  return parts.join('\n');
}

/** Web-search citations (url_citation annotations) from a Responses payload. */
export function outputCitations(payload: unknown): Array<{ url: string; title: string }> {
  const p = payload as { output?: Array<{ type: string; content?: Array<{ annotations?: Array<{ type: string; url?: string; title?: string }> }> }> };
  const out: Array<{ url: string; title: string }> = [];
  for (const item of p.output ?? []) {
    if (item.type !== 'message') continue;
    for (const c of item.content ?? []) {
      for (const a of c.annotations ?? []) {
        if (a.type === 'url_citation' && a.url) out.push({ url: a.url, title: a.title ?? '' });
      }
    }
  }
  return out;
}

export async function callOpenAI<T = string>(opts: CallOptions): Promise<OpenAIResult<T>> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new OpenAIError('OPENAI_API_KEY is not configured', 500);

  const body: Record<string, unknown> = {
    model: opts.model,
    input: [
      { role: 'system', content: opts.system },
      { role: 'user', content: opts.user },
    ],
    max_output_tokens: opts.maxOutputTokens ?? 4000,
  };
  if (opts.tools) body.tools = opts.tools;
  if (opts.schema) {
    body.text = { format: { type: 'json_schema', name: opts.schema.name, schema: opts.schema.schema, strict: true } };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 120_000);
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timer);
    throw new OpenAIError(error instanceof Error && error.name === 'AbortError' ? 'OpenAI request timed out' : 'OpenAI request failed', 504);
  }
  clearTimeout(timer);
  const requestId = res.headers.get('x-request-id') ?? undefined;
  const payload = (await res.json().catch(() => ({}))) as { error?: { message?: string }; usage?: OpenAIUsage };
  if (!res.ok) throw new OpenAIError(payload.error?.message || `OpenAI error ${res.status}`, res.status, requestId);

  const text = outputText(payload);
  if (!text) throw new OpenAIError('OpenAI returned an empty result', 502, requestId);
  let data: T;
  if (opts.schema) {
    try {
      data = JSON.parse(text) as T;
    } catch {
      throw new OpenAIError('OpenAI returned invalid structured output', 502, requestId);
    }
  } else data = text as unknown as T;
  return { data, usage: payload.usage ?? {}, requestId, raw: payload };
}
