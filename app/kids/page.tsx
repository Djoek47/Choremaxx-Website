import type { Metadata } from 'next';
import LegalDocument from '@/components/LegalDocument';

export const metadata: Metadata = {
  title: 'Kids & Parental Controls — ChoreMaxx',
  description: 'How ChoreMaxx works for kids and families. Parental controls built-in.',
  canonical: 'https://mytikas73.com/kids',
  robots: 'index, follow',
};

export default function Kids() {
  return (
    <LegalDocument title="Kids & Parental Controls">
      <p>
        ChoreMaxx includes a <strong>Child role</strong> designed for family use under an adult Admin/Owner.
      </p>

      <h2>How it works</h2>
      <ul>
        <li>
          <strong>Parents/Admins create profiles</strong> for kids with just a name. No email needed.
        </li>
        <li>
          <strong>Kids sign in</strong> on a shared device with a PIN or simple password parents set.
        </li>
        <li>
          <strong>Parents control everything:</strong> which tasks kids see, whether they need photo proof, what
          rewards are available, and whether requests get approved.
        </li>
        <li>
          <strong>Kids can see their tasks,</strong> mark them done, earn XP, and check the leaderboard. That&apos;s it.
        </li>
      </ul>

      <h2>Parental controls</h2>
      <ul>
        <li>
          <strong>Invites:</strong> Parents decide who joins the household. Kids can&apos;t create their own account.
        </li>
        <li>
          <strong>Task visibility:</strong> Assign tasks only to kids, only to adults, or both.
        </li>
        <li>
          <strong>Approval gates:</strong> Set some tasks to require parent approval before XP is awarded.
        </li>
        <li>
          <strong>Reward approvals:</strong> Parents approve reward purchases before they&apos;re redeemed.
        </li>
        <li>
          <strong>Notifications:</strong> Parents can disable push notifications for kids to minimize screen time.
        </li>
      </ul>

      <h2>Safety & privacy</h2>
      <ul>
        <li>We do not knowingly sell children&apos;s personal information.</li>
        <li>Child accounts are tied to parent/admin oversight—no independent social features.</li>
        <li>
          All household data (tasks, proof photos, rewards) is visible to parents/admins.
        </li>
        <li>
          Parents can export or delete their child&apos;s data anytime from account settings.
        </li>
      </ul>

      <h2>Age recommendations</h2>
      <p>
        ChoreMaxx is designed for households with kids 5+. Younger kids may not understand XP or leaderboards, but can
        still learn task completion. Teens thrive with the gamification and independence.
      </p>

      <h2>What kids can&apos;t do</h2>
      <ul>
        <li>Create their own account without a parent.</li>
        <li>Invite other kids to the household.</li>
        <li>Create custom rewards.</li>
        <li>Leave the household (parents remove them).</li>
        <li>Chat or message with other kids.</li>
      </ul>

      <p className="mt-8 text-sm text-muted">
        See our <a href="/privacy">Privacy Policy</a> for full details on how we protect child data.
      </p>

      <p className="mt-4 text-sm text-muted">© 2026 ChoreMaxx. All rights reserved.</p>
    </LegalDocument>
  );
}
