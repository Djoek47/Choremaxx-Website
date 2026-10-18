import type { Metadata } from 'next';
import Link from 'next/link';

import ContactFormV2 from '@/components/forms/ContactFormV2';
import PageShell from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Suggest an improvement — ChoreMaxx',
  description: 'Share a product idea or improvement for ChoreMaxx. We read every suggestion.',
  alternates: { canonical: 'https://www.choremaxx.app/suggest' },
};

export default function SuggestPage() {
  return (
    <PageShell
      heading="Suggest something"
      sub="Quiet ideas welcome. Tell us what would make ChoreMaxx better for your household."
    >
      <div className="max-w-xl">
        <div
          className="rounded-[30px] p-8 flex flex-col gap-6"
          style={{ background: 'var(--gl)', border: '1px solid var(--bd)', boxShadow: 'var(--shadow)' }}
        >
          <ContactFormV2
            kind="suggestion"
            submitLabel="Send suggestion"
            messageLabel="Your idea"
            messagePlaceholder="What should we add, simplify, or change?"
          />
          <p className="text-sm leading-relaxed" style={{ color: 'var(--txm)' }}>
            Need help with an account or bug instead?{' '}
            <Link href="/support" style={{ color: 'var(--p)', fontWeight: 650 }}>
              Contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </PageShell>
  );
}
