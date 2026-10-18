import Link from 'next/link';

export default function StickyCta() {
  return (
    <div className="sticky-cta" aria-label="Download ChoreMaxx">
      <p className="sticky-cta__copy">
        <strong>7 days free</strong>
        No card to start
      </p>
      <Link href="https://apps.apple.com/app/id6796850110" className="sticky-cta__btn">
        Start free
      </Link>
    </div>
  );
}
