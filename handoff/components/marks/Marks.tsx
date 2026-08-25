/* House marks.
   Duotone  — filled back layer at 26% + solid foreground, both currentColor.
   Halo     — single layer, stroke 1.4, colourless (inherits surrounding text tone).

   NOTE: these are OUR drawings in the app's format. lib/icons (the ICONS map that
   lib/Icon.tsx imports) is not in this repo, so they are not the app's 29 marks.
   Swap the path data here once that set is available. */

type MarkProps = { size?: number; title?: string };

function Duo({ back, fore, size = 22, title }: MarkProps & { back: React.ReactNode; fore: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      <g opacity=".26">{back}</g>
      <g>{fore}</g>
    </svg>
  );
}

function Halo({ children, size = 22, title }: MarkProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}>
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* ── Duotone Rust: domains + achievements ── */
export const MarkClipboard = (p: MarkProps) => <Duo {...p} back={<rect x="4.4" y="4.4" width="15.2" height="16.2" rx="2.6" />} fore={<><path d="M9 2.4h6a1 1 0 011 1v3H8v-3a1 1 0 011-1z" /><path d="M10.7 16.1l-2.4-2.4 1.5-1.5.9.9 3.5-3.5 1.5 1.5z" /></>} />;
export const MarkScales = (p: MarkProps) => <Duo {...p} back={<path d="M4 8.6l-2.3 5.2h4.6zM20 8.6l-2.3 5.2h4.6z" />} fore={<><path d="M11.1 4.4h1.8v15.4h-1.8z" /><path d="M3.3 7.9h17.4v1.7H3.3z" /><path d="M7.4 19.2h9.2v1.8H7.4z" /></>} />;
export const MarkClock = (p: MarkProps) => <Duo {...p} back={<circle cx="12" cy="12" r="9" />} fore={<><path d="M11.1 6.4h1.8V12h-1.8z" /><path d="M12 11.1h4.6v1.8H12z" /></>} />;
export const MarkBook = (p: MarkProps) => <Duo {...p} back={<path d="M3.5 5.4a1.8 1.8 0 011.8-1.8h5.8v16.8H5.3a1.8 1.8 0 00-1.8 1.8zM20.5 5.4a1.8 1.8 0 00-1.8-1.8h-5.8v16.8h5.8a1.8 1.8 0 011.8 1.8z" />} fore={<path d="M11.1 3.6h1.8v16.8h-1.8z" />} />;
export const MarkCart = (p: MarkProps) => <Duo {...p} back={<path d="M6.3 8.5h14.5l-1.9 7.3H8.1z" />} fore={<><path d="M2.2 3.4h3.4l1 4.2h-2z" /><circle cx="10" cy="19.8" r="1.5" /><circle cx="17.9" cy="19.8" r="1.5" /></>} />;
export const MarkBolt = (p: MarkProps) => <Duo {...p} back={<circle cx="12" cy="12" r="9" />} fore={<path d="M13.6 3.1L7.1 13.3h4.2l-.8 7.9 6.5-10.4h-4.2z" />} />;
export const MarkFlame = (p: MarkProps) => <Duo {...p} back={<path d="M12 21.7c3.7 0 6.3-2.6 6.3-6 0-4.3-3.7-6.3-3.7-10.1-2.2.9-3.3 2.6-3.3 4.5 0 1.5-1.1 2.1-1.9 1.4-.7-.6-1-1.7-1-2.7-2.1 1.5-2.9 3.5-2.9 6.5 0 3.7 2.6 6.4 6.5 6.4z" />} fore={<path d="M12 21.7c1.8 0 3-1.4 3-3 0-2.1-1.8-2.9-1.8-4.9-1.7.7-2.5 2.1-2.5 3.7 0 2.2.6 4.2 1.3 4.2z" />} />;
export const MarkMoon = (p: MarkProps) => <Duo {...p} back={<path d="M20.6 14.9A8.9 8.9 0 019.1 3.4 8.9 8.9 0 1020.6 14.9z" />} fore={<path d="M17.4 3.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />} />;
export const MarkShield = (p: MarkProps) => <Duo {...p} back={<path d="M12 2.4l7.6 3.1v6.1c0 4.7-3.2 8.1-7.6 10-4.4-1.9-7.6-5.3-7.6-10V5.5z" />} fore={<path d="M12 16.6l-2.8-2.7c-1.3-1.2-.4-3.4 1.3-3.4.7 0 1.2.4 1.5.9.3-.5.8-.9 1.5-.9 1.7 0 2.6 2.2 1.3 3.4z" />} />;
export const MarkPause = (p: MarkProps) => <Duo {...p} back={<rect x="4.4" y="7" width="15.2" height="13" rx="2.6" />} fore={<><path d="M9.2 3.4h5.6a1 1 0 011 1v2.6H8.2V4.4a1 1 0 011-1z" /><path d="M9.9 10.6h1.6v5.8H9.9zM12.5 10.6h1.6v5.8h-1.6z" /></>} />;
export const MarkAppliance = (p: MarkProps) => <Duo {...p} back={<rect x="4.4" y="3.6" width="15.2" height="16.8" rx="2.4" />} fore={<><path d="M4.4 8.2h15.2v1.7H4.4z" /><path d="M8.4 12.6h7.2v1.7H8.4z" /></>} />;
export const MarkPeople = (p: MarkProps) => <Duo {...p} back={<><circle cx="8.4" cy="8.6" r="3.4" /><path d="M2.4 20.4c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4z" /></>} fore={<><circle cx="16.4" cy="9.4" r="2.8" /><path d="M11.6 20.4c0-2.8 2.2-4.6 4.8-4.6s4.8 1.8 4.8 4.6z" /></>} />;
export const MarkFace = (p: MarkProps) => <Duo {...p} back={<circle cx="12" cy="12" r="9.1" />} fore={<><circle cx="9.3" cy="10.2" r="1.4" /><circle cx="14.7" cy="10.2" r="1.4" /><path d="M7.8 13.9a5.1 5.1 0 008.4 0l1.6 1.1a6.9 6.9 0 01-11.6 0z" /></>} />;
export const MarkPin = (p: MarkProps) => <Duo {...p} back={<path d="M12 21.6c4.3-4.9 6.7-8.1 6.7-11.5a6.7 6.7 0 10-13.4 0c0 3.4 2.4 6.6 6.7 11.5z" />} fore={<circle cx="12" cy="9.9" r="2.6" />} />;
export const MarkHouse = (p: MarkProps) => <Duo {...p} back={<path d="M12 2.7L2.7 10.4v10.9h18.6V10.4z" />} fore={<path d="M9.5 21.3v-6.1h5v6.1z" />} />;
export const MarkLock = (p: MarkProps) => <Duo {...p} back={<rect x="4.3" y="10.1" width="15.4" height="10.8" rx="2.7" />} fore={<><path d="M7.9 10.1V7.9a4.1 4.1 0 018.2 0v2.2h-1.9V7.9a2.2 2.2 0 00-4.4 0v2.2z" /><circle cx="12" cy="15.5" r="1.7" /></>} />;

/* ── Halo, colourless: trophies ── */
export const MarkCrown = (p: MarkProps) => <Halo {...p}><path d="M2.9 7.4l3.8 3.2L12 4.7l5.3 5.9 3.8-3.2-1.6 11.7H4.5zM4.9 17.2h14.2" /></Halo>;
export const MarkMedal = (p: MarkProps) => <Halo {...p}><circle cx="12" cy="15.3" r="5.5" /><path d="M8.4 10.2L5.6 3.1h12.8l-2.8 7.1M12 12.8l.85 1.85h1.95l-1.55 1.3.55 1.95L12 18.8l-1.8 1.05.55-1.95-1.55-1.3h1.95z" /></Halo>;
export const MarkChart = (p: MarkProps) => <Halo {...p}><path d="M3.5 3.6v16.3h16.9M7.4 19.9v-6.6M12 19.9v-9.6M16.6 19.9v-5" /></Halo>;

/** Rounded-square tile the marks sit in. Rust for duotone, colourless for halo. */
export function MarkTile({ children, tone = 'rust', size = 42 }: { children: React.ReactNode; tone?: 'rust' | 'colourless'; size?: number }) {
  return (
    <span
      style={{
        width: size, height: size, borderRadius: 14, display: 'grid', placeItems: 'center', flexShrink: 0,
        background: tone === 'rust' ? 'var(--pl)' : 'color-mix(in srgb, var(--txm) 10%, transparent)',
        color: tone === 'rust' ? 'var(--p)' : 'var(--txs)',
      }}
    >
      {children}
    </span>
  );
}
