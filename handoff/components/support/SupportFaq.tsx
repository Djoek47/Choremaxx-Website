'use client';

import { useState } from 'react';

const FAQ: { q: string; a: string }[] = [
  { q: 'How do I create a household?', a: 'Download ChoreMaxx, sign up with email or Apple/Google, name your household, choose your reward system, and invite members by code, link, or QR.' },
  { q: 'Do my kids need their own email?', a: 'No. Admins create Sidekick profiles with just a name. They sign in on a shared device or with a simple PIN.' },
  { q: 'What is Poppins?', a: 'Poppins is the AI built into ChoreMaxx, and it is Admins only. Ask it how something works, or tell it what you want — assign Saturday’s yard work, move a task, remind everyone before the deadline. It answers, and it acts. Sidekicks do not get access to it.' },
  { q: 'How do rewards and rankings work?', a: 'Members earn XP the moment they tap Complete. XP builds streaks, wins the Week’s Crown and Monthly Sovereign, and can be spent in the reward shop on privileges you configure — screen time, outing choices, allowance, and more.' },
  { q: 'Do my kids need my approval before they claim a reward?', a: 'You choose when you create the reward: instant, or requires your approval. Either way that day’s tasks and homework have to be done first, which is completion rather than permission. To claim one, a Sidekick presses and holds the reward card (Hold & Request).' },
  { q: 'How do I delete my account?', a: 'In the app: Settings → Delete account. Or email privacy@choremaxx.app. We remove your data within 30 days.' },
  { q: 'Is my data sold?', a: 'No, never. We do not sell personal data. You own your data and can export or delete it at any time.' },
  { q: 'What happens if someone leaves the household?', a: 'An Admin can remove members. Their past tasks and XP remain on record. They can always be re-invited.' },
];

export default function SupportFaq() {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {FAQ.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            style={{
              padding: '20px 24px', borderRadius: 22, background: 'var(--gl)',
              border: `1px solid ${isOpen ? 'color-mix(in srgb,var(--p) 36%,transparent)' : 'var(--glb)'}`,
              backdropFilter: 'blur(26px) saturate(175%)', boxShadow: 'var(--shadow)', transition: 'border-color .3s',
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18,
                padding: 0, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 650, letterSpacing: '-.015em', color: 'var(--tx)' }}>{f.q}</span>
              <span
                style={{
                  flexShrink: 0, width: 26, height: 26, borderRadius: 999, display: 'grid', placeItems: 'center',
                  transition: 'transform .35s cubic-bezier(.22,1,.36,1), background .3s, color .3s',
                  background: isOpen ? 'var(--p)' : 'color-mix(in srgb,var(--bgs) 70%,transparent)',
                  color: isOpen ? '#fff' : 'var(--txm)',
                  transform: isOpen ? 'rotate(135deg)' : 'none',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {isOpen ? (
              <p style={{ margin: '14px 0 0', fontSize: 14.5, lineHeight: 1.7, color: 'var(--txm)' }}>{f.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
