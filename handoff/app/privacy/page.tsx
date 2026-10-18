import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — ChoreMaxx',
  description: 'Your data, your control.',
  alternates: { canonical: 'https://www.choremaxx.app/privacy' },
};

import LegalBody, { LegalFoot, LegalH2, LegalLead, LegalP } from '@/components/site/LegalBody';
import PageShellV2 from '@/components/site/PageShellV2';

export default function PrivacyPage() {
  return (
    <PageShellV2 kicker="Legal" heading="Privacy Policy" sub="Your data, your control." stamp="Last updated 10 August 2026">
      <LegalBody>
        <LegalLead>
          <strong style={{ color: 'var(--tx)', fontWeight: 700 }}>Choremaxx (&ldquo;we&rdquo;, &ldquo;our&rdquo;)</strong> is a chore and rewards app for{' '}
          <strong style={{ color: 'var(--tx)', fontWeight: 700 }}>families</strong>. This policy explains what we collect and how we use it.
        </LegalLead>

        <LegalH2>What we collect</LegalH2>
        <LegalP><strong style={{ color: 'var(--tx)', fontWeight: 650 }}>Account data:</strong> email, display name, authentication identifiers (including Apple Sign-In subject when used).</LegalP>
        <LegalP><strong style={{ color: 'var(--tx)', fontWeight: 650 }}>Household data:</strong> household name, memberships, roles, tasks, groceries, calendar events, rewards, XP, badges, Momentum scores.</LegalP>
        <LegalP><strong style={{ color: 'var(--tx)', fontWeight: 650 }}>Device data:</strong> push notification tokens, approximate location when you enable grocery suggestions, voice audio temporarily when you use Talk to Poppins.</LegalP>
        <LegalP><strong style={{ color: 'var(--tx)', fontWeight: 650 }}>Usage analytics:</strong> feature events that help improve Choremaxx (task completion, Poppins interactions).</LegalP>

        <LegalH2>How we use data</LegalH2>
        <LegalP>Provide household coordination features and realtime sync.</LegalP>
        <LegalP>Generate Poppins briefings and recommendations.</LegalP>
        <LegalP>Send notifications you request or that household rules allow.</LegalP>
        <LegalP>Maintain security, prevent abuse, and meet legal obligations.</LegalP>

        <LegalH2>Children</LegalH2>
        <LegalP>Choremaxx supports a Child role under parental/admin supervision. We do not knowingly sell children&rsquo;s personal information. Parents/admins control invites, rewards approvals, and access.</LegalP>

        <LegalH2>Sharing</LegalH2>
        <LegalP>We use infrastructure processors such as Supabase (database/auth/storage), Expo/Apple/Google for app delivery and push, and OpenAI (or equivalent) for Poppins when enabled. We do not sell personal data.</LegalP>

        <LegalH2>Retention &amp; deletion</LegalH2>
        <LegalP>You may export or delete your account from Settings. Deletion removes your profile and associated personal account records; household-shared content may remain for other members until the household is deleted by an owner.</LegalP>

        <LegalH2>Your rights</LegalH2>
        <LegalP>Depending on your region, you may request access, correction, export, or deletion by contacting <a href="mailto:privacy@choremaxx.app">privacy@choremaxx.app</a> or using in-app Settings.</LegalP>

        <LegalH2>Contact</LegalH2>
        <LegalP>Choremaxx — <a href="mailto:privacy@choremaxx.app">privacy@choremaxx.app</a></LegalP>

        <LegalFoot />
      </LegalBody>
    </PageShellV2>
  );
}
