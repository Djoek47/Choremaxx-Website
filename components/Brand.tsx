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

/**
 * House mark + wordmark — icon swaps with palette × day/night via `.brand-logo`;
 * “chore” uses `--sec`, “maxx” uses `--p` (Orbit lockups).
 */
export function Logo({ size = 34, text = 'text-xl' }: { size?: number; text?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0" aria-label="ChoreMaxx home">
      <span
        className="brand-logo"
        aria-hidden
        style={{ width: size, height: size, borderRadius: size * 0.28 }}
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

// Android robot head (Material "android" glyph; the robot is CC BY 3.0 by Google).
const ANDROID =
  'M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z';

export function AndroidLogo({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d={ANDROID} />
    </svg>
  );
}

/**
 * The visitor's store logo next to a free-trial / download button.
 * Which one shows is pure CSS keyed on <html> (set in app/layout.tsx):
 * iPhone/iPad → Apple, Android (Samsung included) → Android,
 * computers/unknown → Apple ↔ Android crossfade driven by one
 * `data-store-logo` clock so every glyph on the page stays in sync.
 */
export function PlatformGlyph({ size = 18 }: { size?: number }) {
  return (
    <span className="pg" style={{ width: size, height: size }} aria-hidden>
      <span className="pg-apple"><AppleLogo size={size} /></span>
      <span className="pg-android"><AndroidLogo size={size} /></span>
    </span>
  );
}

/**
 * Store download control — frosted glass pill (not the generic Apple badge,
 * not the coral primary CTA). Day/night tokens live on `.btn-store`.
 * Logo uses PlatformGlyph so the header badge cycles with the hero CTA on PC.
 */
export function AppStoreBadge({
  href = '/download',
  large = false,
  className = '',
}: {
  href?: string;
  large?: boolean;
  className?: string;
}) {
  const external = href.startsWith('http');
  const cls = `btn-store${large ? ' btn-store-lg' : ''}${className ? ` ${className}` : ''}`;
  const glyph = large ? 26 : 20;
  const inner = (
    <>
      <span className="btn-store-glyph" aria-hidden>
        <PlatformGlyph size={glyph} />
      </span>
      <span className="btn-store-copy">
        <span className="btn-store-kicker">Download on the</span>
        <span className="btn-store-title">App Store</span>
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={cls} aria-label="Download on the App Store" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label="Download on the App Store">
      {inner}
    </Link>
  );
}
