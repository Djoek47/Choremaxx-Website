'use client';

import { memo } from 'react';

import { ICONS, type IconName, type IconShape } from './icons';

export type { IconName };

/** Rust accent — matches the app Duotone Rust spec. */
export const ICON_ACCENT = '#E4552B';

const STROKE = { body: 1.75, accent: 1.9 };

export type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  /** Decorative by default. Pass a label when the icon is the only content. */
  label?: string;
};

function draw(s: IconShape, i: number, body: string, accent: string) {
  const stroke = s.accent ? accent : body;
  const width = s.accent ? STROKE.accent : STROKE.body;
  const fill = s.fill ? (s.accent ? accent : body) : 'none';
  const common = {
    stroke,
    strokeWidth: width,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill,
  };
  return s.t === 'c' ? (
    <circle key={i} cx={s.cx} cy={s.cy} r={s.r} {...common} />
  ) : (
    <path key={i} d={s.d} {...common} />
  );
}

function Icon({ name, size = 24, className, label }: IconProps) {
  const shapes = ICONS[name];
  if (!shapes) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      style={{ display: 'block', flexShrink: 0 }}
    >
      {shapes.map((s, i) => draw(s, i, 'currentColor', ICON_ACCENT))}
    </svg>
  );
}

export default memo(Icon);
