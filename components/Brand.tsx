import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import { MOJI } from '@/lib/moji-art';

/** One of the app's own Moji, drawn on its 24×24 grid. */
export function Moji({ name, size = 28, style, className }: { name: string; size?: number; style?: CSSProperties; className?: string }) {
  const art = MOJI[name];
  if (!art) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: art }}
    />
  );
}

/** App icon + "chore" in gold, "maxx" in coral, exactly like the app. */
export function Logo({ size = 34, text = 'text-xl' }: { size?: number; text?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="ChoreMaxx home">
      <Image
        src="/brand/choremaxx-app-icon.png"
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size, borderRadius: size * 0.28, boxShadow: '0 6px 14px -6px rgba(168,65,31,.55)' }}
      />
      <span className={`wordmark ${text}`}>
        <span className="w-chore">chore</span>
        <span className="w-maxx">maxx</span>
      </span>
    </Link>
  );
}

const APPLE =
  'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z';

export function AppleLogo({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d={APPLE} />
    </svg>
  );
}

/** Apple-style black "Download on the App Store" badge. */
export function AppStoreBadge({
  href = 'https://apps.apple.com/app/id6796850110',
  large = false,
}: {
  href?: string;
  large?: boolean;
}) {
  const external = href.startsWith('http');
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label="Download on the App Store"
      className="inline-flex items-center gap-2.5 transition-transform active:translate-y-[2px]"
      style={{
        background: '#000',
        color: '#fff',
        borderRadius: large ? 16 : 13,
        padding: large ? '0.7rem 1.35rem 0.7rem 1.05rem' : '0.5rem 1rem 0.5rem 0.8rem',
        border: '1px solid #A6A6A6',
        boxShadow: '0 4px 0 #2A1A12, 0 14px 26px -12px rgba(0,0,0,.5)',
      }}
    >
      <AppleLogo size={large ? 30 : 22} color="#fff" />
      <span className="flex flex-col leading-none text-left">
        <span style={{ fontSize: large ? 12 : 10, fontWeight: 500, letterSpacing: '0.01em', color: '#fff' }}>Download on the</span>
        <span style={{ fontSize: large ? 24 : 18, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 2, color: '#fff', fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", sans-serif' }}>App Store</span>
      </span>
    </Link>
  );
}
