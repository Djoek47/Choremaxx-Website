'use client';

import { useState } from 'react';

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Who can assign tasks?',
    a: 'Admins only — up to two per household. The paying admin decides who the second one is. Sidekicks complete their own tasks; nobody can mark someone else’s work as done.',
  },
  {
    q: 'Can my children claim a reward without my approval?',
    a: 'Only if you set that reward to grant instantly, and only after the day’s tasks and homework are finished. Anything set to require approval still comes to you. Sidekicks can also propose a new reward occasionally — you decide whether it becomes real.',
  },
  {
    q: 'Does ChoreMaxx send money?',
    a: 'No. It’s not a payment platform and it never connects to your bank. Allowance is approved and recorded in the app; you pay them however you already do.',
  },
  {
    q: 'What happens if a task gets missed?',
    a: 'Finished after the deadline but before 11:59pm, it earns reduced XP and keeps the streak. After 11:59pm it expires and can’t be completed. Expired tasks sit in their own tab for a week, then clear out.',
  },
  {
    q: 'Do I have to check every completed chore?',
    a: 'No. XP lands when your child taps Complete. If you want to verify, request a photo on that task. Homework proof can be set as required, per child.',
  },
  {
    q: 'Can I turn it off for a vacation?',
    a: 'Recess pauses tasks and freezes every streak where it stands.',
  },
  {
    q: 'Is my family’s data safe?',
    a: 'Household data is encrypted, we don’t sell it, and you can export or delete all of it from inside the app.',
  },
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
