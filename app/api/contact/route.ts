import { NextResponse } from 'next/server';

import {
  contactFrom,
  contactInbox,
  getResendClient,
  subjectFor,
  type ContactKind,
} from '@/lib/resend';

export const runtime = 'nodejs';

const MAX_MESSAGE = 4000;
const MAX_NAME = 80;
const MAX_EMAIL = 160;

type Body = {
  kind?: string;
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot — must stay empty. */
  company?: string;
};

function isKind(value: unknown): value is ContactKind {
  return value === 'support' || value === 'suggestion';
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Bot trap
  if (body.company && String(body.company).trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!isKind(body.kind)) {
    return NextResponse.json({ error: 'Invalid kind' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim().slice(0, MAX_NAME);
  const email = String(body.email ?? '').trim().slice(0, MAX_EMAIL);
  const message = String(body.message ?? '').trim().slice(0, MAX_MESSAGE);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }
  if (message.length < 8) {
    return NextResponse.json({ error: 'Please write a little more detail.' }, { status: 400 });
  }

  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json(
      { error: 'Email is not configured yet. Please email support@choremaxx.app.' },
      { status: 503 }
    );
  }

  const kind = body.kind;
  const subject = subjectFor(kind, message);
  const label = kind === 'suggestion' ? 'Suggestion' : 'Support';

  const text = [
    `${label} from the Choremaxx website`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message,
  ].join('\n');

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0F0E17;line-height:1.5;">
      <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:#8B8AA0;">${label}</p>
      <p style="margin:0 0 4px;"><strong>${escapeHtml(name)}</strong></p>
      <p style="margin:0 0 20px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: contactFrom(),
    to: [contactInbox()],
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error('contact/resend', error);
    return NextResponse.json(
      { error: 'Could not send right now. Try again, or email support@choremaxx.app.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
