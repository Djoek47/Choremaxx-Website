'use client';

import { PALETTES, PALETTE_META } from '@/lib/palette-runtime';
import { usePalette } from './PaletteProvider';

export default function PaletteDots({ size = 13 }: { size?: number }) {
  const { setPalette, toggleAppearance } = usePalette();

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 7, padding: '7px 10px', borderRadius: 999,
        background: 'var(--gl)', border: '1px solid var(--glb)',
        backdropFilter: 'blur(32px) saturate(190%)', boxShadow: 'var(--spec)',
      }}
    >
      {PALETTES.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setPalette(p)}
          aria-label={`${PALETTE_META[p].label} theme`}
          style={{
            width: size, height: size, borderRadius: 999, padding: 0, cursor: 'pointer',
            border: '1.5px solid rgba(255,255,255,.6)', background: PALETTE_META[p].primary,
            transition: 'transform .25s cubic-bezier(.34,1.56,.64,1)',
          }}
        />
      ))}
      <span style={{ width: 1, height: 14, background: 'var(--bd)', margin: '0 1px' }} />
      <button
        type="button"
        onClick={toggleAppearance}
        aria-label="Toggle day and night"
        style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', color: 'var(--txm)' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </button>
    </div>
  );
}
