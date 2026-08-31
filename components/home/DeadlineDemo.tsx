'use client';

import { useState } from 'react';

type Outcome = {
  key: 'ontime' | 'late' | 'expired';
  time: string; label: string; title: string; xp: string;
  tone: string; body: string;
  weekXp: string; bar: number; streak: string; streakTone: string; state: string; crown: string; poppins: string;
};

const TONE = { good: '#5BD6BD', warn: '#FFD166', bad: '#FF6B81' };

const OUTCOMES: Outcome[] = [
  {
    key: 'ontime', time: '7:40 PM', label: 'Before deadline', title: 'On time', xp: '+40 XP', tone: TONE.good,
    body: 'Full XP the instant they tap Complete — no waiting on you to approve it. The streak ticks to 13 and the task closes out for the night. If it looks suspiciously clean, request a photo afterward.',
    weekXp: '1,460', bar: 74, streak: '13 days', streakTone: TONE.good, state: 'Complete', crown: 'Liam leads',
    poppins: 'Poppins: kitchen is closed out for tonight. Nothing overdue.',
  },
  {
    key: 'late', time: '10:15 PM', label: 'After deadline', title: 'Late Credit', xp: '+16 XP', tone: TONE.warn,
    body: 'Past the 8:00 PM deadline but before 11:59 PM, so it earns reduced XP and the streak survives at 13 days. The app records it as late, and that shows up in their Champion’s Record.',
    weekXp: '1,436', bar: 70, streak: '13 days · late', streakTone: TONE.warn, state: 'Late', crown: 'Liam leads',
    poppins: 'Poppins: logged late. Want a reminder 30 minutes before tomorrow’s deadline?',
  },
  {
    key: 'expired', time: 'Never', label: 'Left overnight', title: 'Expired', xp: '0 XP', tone: TONE.bad,
    body: 'After 11:59 PM the task expires and can’t be completed at all. No XP, and the 12-day streak breaks. Expired tasks sit in their own tab for a week, then clear out.',
    weekXp: '1,420', bar: 66, streak: 'Broken', streakTone: TONE.bad, state: 'Expired', crown: 'Emma takes it',
    poppins: 'Poppins: streak broken. Streak Rescue is available for 210 XP.',
  },
];

const panel: React.CSSProperties = {
  padding: 'clamp(20px, 4vw, 32px)', borderRadius: 32, background: 'var(--gl)', border: '1px solid var(--glb)',
  backdropFilter: 'blur(38px) saturate(190%)', boxShadow: 'var(--shadow)',
  display: 'flex', flexDirection: 'column', gap: 24,
};

const stat: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px',
  borderRadius: 18, background: 'color-mix(in srgb,var(--bg) 70%,transparent)', border: '1px solid var(--bd)',
};

export default function DeadlineDemo() {
  const [i, setI] = useState(0);
  const [rescued, setRescued] = useState(false);
  const o = OUTCOMES[i];

  return (
    <div className="cm-deadline" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.08fr) minmax(0,.92fr)', gap: 22 }}>
      <div className="cm-glass" style={panel}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, borderRadius: 22, background: 'color-mix(in srgb,var(--bg) 70%,transparent)', border: '1px solid var(--bd)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 650, letterSpacing: '-.02em', color: 'var(--tx)' }}>Load the dishwasher</p>
            <p style={{ margin: '3px 0 0', fontSize: 13, color: 'var(--txm)' }}>Kitchen · daily · assigned to Liam · deadline 8:00 PM</p>
          </div>
          <span style={{ flexShrink: 0, padding: '6px 12px', borderRadius: 999, background: 'var(--p)', color: '#fff', fontSize: 12.5, fontWeight: 650 }}>40 XP</span>
        </div>

        <div>
          <p style={{ margin: '0 0 12px', fontSize: 11, fontWeight: 650, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txm)' }}>They tap Complete at</p>
          <div className="cm-deadline-outcomes cm-glass" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 10 }}>
            {OUTCOMES.map((x, idx) => {
              const on = idx === i;
              return (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => { setI(idx); setRescued(false); }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '16px 8px',
                    borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'transform .28s cubic-bezier(.34,1.56,.64,1), background .28s, border-color .28s, color .28s',
                    background: on ? 'var(--p)' : 'color-mix(in srgb,var(--bg) 70%,transparent)',
                    border: `1.5px solid ${on ? 'var(--p)' : 'var(--bd)'}`,
                    color: on ? '#fff' : 'var(--tx)',
                    transform: on ? 'translateY(-3px)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-.03em' }}>{x.time}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, opacity: 0.78 }}>{x.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ padding: 24, borderRadius: 24, background: `color-mix(in srgb,${o.tone} 12%,transparent)`, border: `1px solid color-mix(in srgb,${o.tone} 34%,transparent)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{ margin: 0, fontSize: 16.5, fontWeight: 700, letterSpacing: '-.025em', color: 'var(--tx)' }}>{o.title}</p>
            <span style={{ marginLeft: 'auto', flexShrink: 0, padding: '6px 13px', borderRadius: 999, background: o.tone, color: '#0B1F1B', fontSize: 13, fontWeight: 750 }}>{o.xp}</span>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.6, color: 'var(--txm)' }}>{o.body}</p>

          {o.key === 'expired' && !rescued ? (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--bd)', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <p style={{ margin: 0, flex: 1, minWidth: 180, fontSize: 13.5, lineHeight: 1.5, color: 'var(--txm)' }}>
                Streak Rescue: pay 210 XP — part of this week&rsquo;s earnings — and the 12 days stand. Miss three days and it&rsquo;s gone for good.
              </p>
              <button
                type="button"
                onClick={() => setRescued(true)}
                style={{
                  flexShrink: 0, padding: '12px 20px', borderRadius: 999, border: 'none', background: 'var(--p)',
                  color: '#fff', fontSize: 13.5, fontWeight: 650, cursor: 'pointer', fontFamily: 'inherit',
                  boxShadow: '0 6px 20px color-mix(in srgb,var(--p) 42%,transparent)',
                }}
              >
                Buy the streak back
              </button>
            </div>
          ) : null}

          {o.key === 'expired' && rescued ? (
            <p style={{ margin: '16px 0 0', paddingTop: 16, borderTop: '1px solid var(--bd)', fontSize: 13.5, fontWeight: 600, color: 'var(--p)' }}>
              Streak saved at 12 days. 210 XP gone. They won&rsquo;t do that twice.
            </p>
          ) : null}
        </div>
      </div>

      <div className="cm-glass" style={{ ...panel, gap: 22 }}>
        <p style={{ margin: 0, fontSize: 19, fontWeight: 650, letterSpacing: '-.025em', color: 'var(--tx)' }}>Liam&rsquo;s week</p>

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12.5, fontWeight: 650, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--txm)' }}>XP this week</span>
            <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.04em', color: 'var(--p)' }}>{o.weekXp}</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: 'color-mix(in srgb,var(--bg) 80%,transparent)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 999, background: o.tone, width: `${o.bar}%`, transition: 'width .6s cubic-bezier(.22,1,.36,1), background .45s' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <div style={stat}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txs)' }}>Streak</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: o.key === 'expired' && rescued ? 'var(--p)' : o.streakTone }}>
              {o.key === 'expired' && rescued ? '12 days · rescued' : o.streak}
            </span>
          </div>
          <div style={stat}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txs)' }}>Task state</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx)' }}>{o.state}</span>
          </div>
          <div style={stat}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txs)' }}>This week&rsquo;s crown</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx)' }}>{o.crown}</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid var(--bd)', display: 'flex', alignItems: 'flex-start', gap: 11 }}>
          <span style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--p)', display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
          </span>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--txm)' }}>
            {o.key === 'expired' && rescued ? 'Poppins: streak restored at 12 days. 210 XP deducted.' : o.poppins}
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1180px) { .cm-deadline { grid-template-columns: minmax(0,1fr) !important; } }
      `}</style>
    </div>
  );
}
