import { Resend } from 'resend';

import type { ContactKind } from '@/lib/contact';

export type { ContactKind };

const FROM =
  process.env.RESEND_FROM_EMAIL?.trim() || 'Choremaxx <noreply@choremaxx.app>';
const TO =
  process.env.CONTACT_TO_EMAIL?.trim() || 'support@choremaxx.app';

export function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

export function contactInbox(): string {
  return TO;
}

export function contactFrom(): string {
  return FROM;
}

export function subjectFor(kind: ContactKind, summary: string): string {
  const clean = summary.replace(/\s+/g, ' ').trim().slice(0, 80);
  if (kind === 'suggestion') {
    return clean ? `Suggestion: ${clean}` : 'New suggestion from website';
  }
  return clean ? `Support: ${clean}` : 'Support request from website';
}
