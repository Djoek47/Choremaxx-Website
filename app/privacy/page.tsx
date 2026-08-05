import type { Metadata } from 'next';
import LegalDocument from '@/components/LegalDocument';

export const metadata: Metadata = {
  title: 'Privacy Policy — ChoreMaxx',
  description: 'ChoreMaxx privacy policy. Your data, your control.',
  canonical: 'https://mytikas73.com/privacy',
  robots: 'index, follow',
};

export default function PrivacyPolicy() {
  return (
    <LegalDocument title="Privacy Policy" lastUpdated="2026-07-20">
      <p>
        <strong>Choremaxx ("we", "our")</strong> is an AI household operating system. This policy explains what we
        collect and how we use it.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account data:</strong> email, display name, authentication identifiers (including Apple Sign-In
          subject when used).
        </li>
        <li>
          <strong>Household data:</strong> household name, memberships, roles, tasks, groceries, calendar events,
          rewards, XP, badges, Momentum scores.
        </li>
        <li>
          <strong>Device data:</strong> push notification tokens, approximate location when you enable grocery
          suggestions, voice audio temporarily when you use Talk to Nova.
        </li>
        <li>
          <strong>Usage analytics:</strong> feature events that help improve Choremaxx (task completion, Nova
          interactions).
        </li>
      </ul>

      <h2>How we use data</h2>
      <ul>
        <li>Provide household coordination features and realtime sync.</li>
        <li>Generate Nova briefings and recommendations.</li>
        <li>Send notifications you request or that household rules allow.</li>
        <li>Maintain security, prevent abuse, and meet legal obligations.</li>
      </ul>

      <h2>Children</h2>
      <p>
        Choremaxx supports a Child role under parental/admin supervision. We do not knowingly sell children&apos;s
        personal information. Parents/admins control invites, rewards approvals, and access.
      </p>

      <h2>Sharing</h2>
      <p>
        We use infrastructure processors such as Supabase (database/auth/storage), Expo/Apple/Google for app delivery
        and push, and OpenAI (or equivalent) for Nova when enabled. We do not sell personal data.
      </p>

      <h2>Retention & deletion</h2>
      <p>
        You may export or delete your account from Settings. Deletion removes your profile and associated personal
        account records; household-shared content may remain for other members until the household is deleted by an
        owner.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your region, you may request access, correction, export, or deletion by contacting{' '}
        <a href="mailto:privacy@choremaxx.app">privacy@choremaxx.app</a> or using in-app Settings.
      </p>

      <h2>Contact</h2>
      <p>
        <strong>Choremaxx</strong>
        <br />
        <a href="mailto:privacy@choremaxx.app">privacy@choremaxx.app</a>
      </p>

      <p className="mt-8 text-sm text-muted">© 2026 Choremaxx. All rights reserved.</p>
    </LegalDocument>
  );
}
