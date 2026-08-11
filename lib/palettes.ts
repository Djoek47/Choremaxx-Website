/**
 * ChoreMaxx house palettes — synced with Orbit
 * (`constants/accent-themes.ts` + `constants/brand-lockup.ts`).
 *
 * Four official brand looks — Sky, Citrus, Coral, and Berry — each pairing a
 * primary (“maxx”) / secondary (“chore”) wordmark duo with an official house
 * mark. One palette is chosen per browsing session (see the bootstrap script
 * in app/layout.tsx) and applied via `data-palette` on `<html>`.
 *
 * Default = Coral (App Store / Orbit DEFAULT_ACCENT_THEME_ID).
 */

export type PaletteName = 'sky' | 'citrus' | 'coral' | 'berry';

export interface Palette {
  name: PaletteName;
  label: string;
  /** “maxx” + buttons / accents — Orbit accent.primary */
  primary: string;
  primaryDark: string;
  primaryLight: string;
  /** “chore” wordmark — Orbit LOCKUPS.chore */
  secondary: string;
  logo: string;
}

export const PALETTES: Record<PaletteName, Palette> = {
  sky: {
    name: 'sky',
    label: 'Sky',
    primary: '#378ADD',
    primaryDark: '#2A6FB5',
    primaryLight: '#E5F2FB',
    secondary: '#C4922A',
    logo: '/brand/choremaxx-logo-mark-sky.png',
  },
  citrus: {
    name: 'citrus',
    label: 'Citrus',
    primary: '#EF9F27',
    primaryDark: '#C47F1A',
    primaryLight: '#FDF3E0',
    secondary: '#712B13',
    logo: '/brand/choremaxx-logo-mark-citrus.png',
  },
  coral: {
    name: 'coral',
    label: 'Coral',
    primary: '#D85A30',
    primaryDark: '#B84722',
    primaryLight: '#FDE8DF',
    secondary: '#C4922A',
    logo: '/brand/choremaxx-logo-mark-coral.png',
  },
  berry: {
    name: 'berry',
    label: 'Berry',
    primary: '#7F77DD',
    primaryDark: '#6259C4',
    primaryLight: '#EEEBFB',
    secondary: '#C4789A',
    logo: '/brand/choremaxx-logo-mark-berry.png',
  },
};

export const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];

export const DEFAULT_PALETTE: PaletteName = 'coral';

const SESSION_KEY = 'cm-palette';
const LAST_VISIT_KEY = 'cm-last-palette';

/**
 * Picks the palette for the current browsing session, mirroring the inline
 * bootstrap script in app/layout.tsx.
 */
export function getSessionPalette(): PaletteName {
  if (typeof window === 'undefined') return DEFAULT_PALETTE;

  try {
    const current = window.sessionStorage.getItem(SESSION_KEY);
    if (current && (PALETTE_NAMES as string[]).includes(current)) {
      return current as PaletteName;
    }

    const last = window.localStorage.getItem(LAST_VISIT_KEY);
    const choices = PALETTE_NAMES.filter(p => p !== last);
    const pool = choices.length > 0 ? choices : PALETTE_NAMES;
    const next = pool[Math.floor(Math.random() * pool.length)];

    window.sessionStorage.setItem(SESSION_KEY, next);
    window.localStorage.setItem(LAST_VISIT_KEY, next);
    return next;
  } catch {
    return DEFAULT_PALETTE;
  }
}
