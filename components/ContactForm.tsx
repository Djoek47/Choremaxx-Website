'use client';

import { FormEvent, useState } from 'react';

import type { ContactKind } from '@/lib/contact';

type Props = {
  kind: ContactKind;
  submitLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm({
  kind,
  submitLabel,
  messageLabel,
  messagePlaceholder,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, name, email, message, company }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus('error');
        setError(data.error || 'Could not send. Please try again.');
        return;
      }
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setError('Could not send. Check your connection and try again.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col gap-3 py-2">
        <p className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Sent. Thank you.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          We read every message. Expect a reply within about a day.
        </p>
        <button
          type="button"
          className="btn-outline self-start mt-2"
          onClick={() => setStatus('idle')}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot */}
      <label className="sr-only" aria-hidden="true">
        Company
        <input
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
          Name
        </span>
        <input
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          className="contact-input"
          placeholder="Your name"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
          Email
        </span>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={160}
          className="contact-input"
          placeholder="you@email.com"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
          {messageLabel}
        </span>
        <textarea
          required
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={4000}
          rows={5}
          className="contact-input"
          style={{ resize: 'vertical', minHeight: 120 }}
          placeholder={messagePlaceholder}
        />
      </label>

      {error ? (
        <p className="text-sm font-medium" style={{ color: 'var(--color-danger)' }}>
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn-primary self-start" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}
