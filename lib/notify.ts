/**
 * Yoca — optional email notifications (server only).
 *
 * When RESEND_API_KEY is set, new contact and check-up submissions trigger a
 * notification email via the Resend REST API (dependency-free fetch). When it
 * is not set, notifications are skipped silently — submissions still land in
 * Supabase either way.
 *
 * Env:
 *   RESEND_API_KEY    Resend API key (https://resend.com)
 *   NOTIFY_EMAIL_TO   Recipient (default: connect@yoca.net)
 *   NOTIFY_EMAIL_FROM Verified sender (default: Yoca <noreply@yoca.net>)
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const NOTIFY_TO = process.env.NOTIFY_EMAIL_TO ?? 'connect@yoca.net';
const NOTIFY_FROM = process.env.NOTIFY_EMAIL_FROM ?? 'Yoca <noreply@yoca.net>';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapTemplate(heading: string, bodyHtml: string): string {
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
  <tr><td style="padding:0 8px 24px 8px;">
    <span style="font-size:22px;font-weight:bold;color:#ffffff;letter-spacing:1px;">YOCA</span><span style="font-size:22px;font-weight:bold;color:#A2FF00;">.</span>
  </td></tr>
  <tr><td style="background:#0C0C0C;border:1px solid #292929;border-radius:8px;padding:32px 28px;">
    <h1 style="margin:0 0 16px 0;font-size:20px;line-height:1.4;color:#ffffff;">${escapeHtml(heading)}</h1>
    <div style="font-size:14px;line-height:1.7;color:#A1A1A1;">${bodyHtml}</div>
  </td></tr>
  <tr><td style="padding:20px 8px;font-size:12px;color:#737373;">
    Yoca — Your Own Creative Agency · connect@yoca.net
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

async function sendEmail(subject: string, heading: string, bodyHtml: string, replyTo?: string): Promise<void> {
  if (!RESEND_API_KEY) return; // notifications not configured — skip silently
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        subject,
        html: wrapTemplate(heading, bodyHtml),
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!response.ok) {
      console.error('notify: Resend responded', response.status, await response.text());
    }
  } catch (error) {
    console.error('notify: email send failed', error);
  }
}

function row(label: string, value: string): string {
  if (!value) return '';
  return `<p style="margin:0 0 6px 0;"><strong style="color:#ffffff;">${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

export async function notifyContact(data: {
  name: string;
  email: string;
  company: string;
  message: string;
  locale: string;
}): Promise<void> {
  const body =
    row('Name', data.name) +
    row('Email', data.email) +
    row('Company', data.company) +
    row('Locale', data.locale) +
    `<p style="margin:12px 0 0 0;white-space:pre-line;">${escapeHtml(data.message)}</p>`;
  await sendEmail(`New project request — ${data.name}`, 'New project request', body, data.email);
}

export async function notifyCheckup(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  locale: string;
  score: number;
  answers: Record<string, { i: number; v: string }>;
}): Promise<void> {
  let body =
    row('Name', data.name) +
    row('Email', data.email) +
    row('Company', data.company) +
    row('Phone', data.phone) +
    row('Locale', data.locale) +
    `<p style="margin:12px 0 8px 0;"><strong style="color:#A2FF00;">Digital health score: ${data.score}/100</strong></p>`;
  for (const [key, answer] of Object.entries(data.answers)) {
    body += `<p style="margin:0 0 4px 0;"><strong style="color:#F4F4F1;">${escapeHtml(key)}</strong>: ${escapeHtml(answer.v)}</p>`;
  }
  await sendEmail(
    `New Digital Check-Up — ${data.name} (${data.score}/100)`,
    'New Digital Check-Up application',
    body,
    data.email,
  );
}
