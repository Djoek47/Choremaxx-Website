import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kids & Parental Controls — ChoreMaxx',
  description: 'How ChoreMaxx works for kids and families. Parental controls built in.',
  alternates: { canonical: 'https://www.choremaxx.app/kids' },
};

import Link from 'next/link';

import PageShellV2 from '@/components/site/PageShellV2';

const HOW = [
  ['Parents/Admins create profiles', 'for kids with just a name. No email needed.'],
  ['Kids sign in', 'on a shared device with a PIN or simple password parents set.'],
  ['Parents control everything:', 'which tasks kids see, whether they need photo proof, what rewards are available, and whether requests get approved.'],
  ['Kids can see their tasks,', 'mark them done, earn XP, and check the leaderboard. That\u2019s it.'],
];

const CONTROLS = [
  ['Invites:', 'Parents decide who joins the household. Kids can\u2019t create their own account.'],
  ['Task visibility:', 'Assign tasks only to kids, only to adults, or both.'],
  ['Approval gates:', 'Set some tasks to require parent approval before XP is awarded.'],
  ['Reward approvals:', 'Parents approve reward purchases before they\u2019re redeemed.'],
  ['Notifications:', 'Parents can disable push notifications for kids to minimize screen time.'],
];

const SAFETY = [
  'We do not knowingly sell children\u2019s personal information.',
  'Child accounts are tied to parent/admin oversight—no independent social features.',
  'All household data (tasks, proof photos, rewards) is visible to parents/admins.',
  'Parents can export or delete their child\u2019s data anytime from account settings.',
];

const CANNOT = [
  'Create their own account without a parent.',
  'Invite other kids to the household.',
  'Create custom rewards.',
  'Leave the household (parents remove them).',
  'Chat or message with other kids.',
];

const card: React.CSSProperties = {
  padding: 34, borderRadius: 30, background: 'var(--gl)', border: '1px solid var(--glb)',
  backdropFilter: 'blur(34px) saturate(185%)', boxShadow: 'var(--shadow)',
  display: 'flex', flexDirection: 'column', gap: 16,
};

export default function KidsPage() {
  return (
    <PageShellV2 kicker="Company" heading="Kids & Parental Controls" sub="How ChoreMaxx works for kids and families. Parental controls built in.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={card}>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: 'var(--txs)' }}>
            ChoreMaxx includes a <strong style={{ color: 'var(--tx)', fontWeight: 700 }}>Child role</strong> designed for family use under an adult Admin/Owner.
          </p>
          <h2 style={{ margin: '8px 0 0', fontSize: 22, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>How it works</h2>
          {HOW.map(([lead, rest]) => (
            <p key={lead} style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: 'var(--txm)' }}>
              <strong style={{ color: 'var(--tx)', fontWeight: 650 }}>{lead}</strong> {rest}
            </p>
          ))}
        </div>

        <div style={card}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>Parental controls</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
            {CONTROLS.map(([lead, rest]) => (
              <div key={lead} style={{ padding: 20, borderRadius: 20, background: 'color-mix(in srgb,var(--bgs) 70%,transparent)', border: '1px solid var(--bd)' }}>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--txm)' }}>
                  <strong style={{ color: 'var(--tx)', fontWeight: 650 }}>{lead}</strong> {rest}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          <div style={{ ...card, padding: 30, borderRadius: 28, gap: 14 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>Safety &amp; privacy</h2>
            {SAFETY.map((s) => <p key={s} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--txm)' }}>{s}</p>)}
          </div>
          <div style={{ ...card, padding: 30, borderRadius: 28, gap: 14 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>What kids can&rsquo;t do</h2>
            {CANNOT.map((s) => <p key={s} style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: 'var(--txm)' }}>{s}</p>)}
          </div>
        </div>

        <div
          style={{
            padding: '30px 34px', borderRadius: 28, display: 'flex', flexDirection: 'column', gap: 12,
            background: 'color-mix(in srgb,var(--p) 7%,var(--card))', border: '1px solid color-mix(in srgb,var(--p) 22%,transparent)',
            boxShadow: 'var(--spec)',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--tx)' }}>Age recommendations</h2>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: 'var(--txs)' }}>
            ChoreMaxx is designed for households with kids 5+. Younger kids may not understand XP or leaderboards, but can still learn task
            completion. Teens thrive with the gamification and independence.
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--txm)' }}>
            See our <Link href="/privacy">Privacy Policy</Link> for full details on how we protect child data.
          </p>
        </div>
      </div>
    </PageShellV2>
  );
}
