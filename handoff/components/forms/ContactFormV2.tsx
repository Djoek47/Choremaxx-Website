'use client';

import { useState } from 'react';

/** Must match app/api/contact/route.ts exactly — it 400s on anything else. */
export type ContactKind = 'support' | 'suggestion';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputStyle: React.CSSProperties = {
  padding: '12px 15px', borderRadius: 14, border: '1px solid var(--bd)',
  background: 'color-mix(in srgb, var(--bgs) 60%, transparent)',
  fontSize: 14.5, color: 'var(--tx)', outline: 'none', fontFamily: 'inherit',
};

const honeypotStyle: React.CSSProperties = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0 0 0 0)', border: 0,
};

export default function ContactFormV2({
  kind,
  submitLabel = 'Send message',
  messageLabel = 'How can we help?',
  messagePlaceholder = 'Describe the issue — app version or device helps.',
}: {
  kind: ContactKind;
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot: must stay empty
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;

    // Mirror the server's own checks so the user sees them instantly.
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ ok: false, text: 'Name, email, and message are required.' });
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setStatus({ ok: false, text: 'Enter a valid email address.' });
      return;
    }
    if (message.trim().length < 8) {
      setStatus({ ok: false, text: 'Please write a little more detail.' });
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, name: name.trim(), email: email.trim(), message: message.trim(), company }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (res.ok && data.ok) {
        setName(''); setEmail(''); setMessage('');
        setStatus({ ok: true, text: 'Sent. We reply within 24 hours.' });
      } else {
        setStatus({ ok: false, text: data.error || 'Could not send right now. Try again, or email support@choremaxx.app.' });
      }
    } catch {
      setStatus({ ok: false, text: 'No connection. Try again, or email support@choremaxx.app.' });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }} noValidate>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{ fontSize: 12.5, fontWeight: 650, color: 'var(--txs)' }}>Your name</span>
        <input name="name" type="text" autoComplete="name" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{ fontSize: 12.5, fontWeight: 650, color: 'var(--txs)' }}>Email</span>
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{ fontSize: 12.5, fontWeight: 650, color: 'var(--txs)' }}>{messageLabel}</span>
        <textarea name="message" rows={5} placeholder={messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...inputStyle, lineHeight: 1.55, resize: 'vertical' }} />
      </label>

      {/* Bot trap — the route silently no-ops if this arrives non-empty. */}
      <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company} onChange={(e) => setCompany(e.target.value)} style={honeypotStyle} />

      <button
        type="submit"
        disabled={sending}
        style={{
          marginTop: 4, padding: 14, borderRadius: 999, border: 'none',
          background: 'linear-gradient(180deg, color-mix(in srgb,#fff 18%,var(--p)) 0%, var(--p) 60%)',
          color: '#fff', fontSize: 14.5, fontWeight: 650, fontFamily: 'inherit',
          cursor: sending ? 'progress' : 'pointer', opacity: sending ? 0.6 : 1,
          boxShadow: '0 1px 0 rgba(255,255,255,.35) inset, 0 8px 26px color-mix(in srgb,var(--p) 42%,transparent)',
        }}
      >
        {sending ? 'Sending…' : submitLabel}
      </button>

      {status ? (
        <p
          role="status"
          style={{
            margin: '4px 0 0', padding: '12px 15px', borderRadius: 14, fontSize: 13.5, lineHeight: 1.55, color: 'var(--tx)',
            background: status.ok ? 'color-mix(in srgb,#5BD6BD 14%,transparent)' : 'color-mix(in srgb,#FF6B81 12%,transparent)',
            border: status.ok ? '1px solid color-mix(in srgb,#5BD6BD 34%,transparent)' : '1px solid color-mix(in srgb,#FF6B81 32%,transparent)',
          }}
        >
          {status.text}
        </p>
      ) : null}
    </form>
  );
}
