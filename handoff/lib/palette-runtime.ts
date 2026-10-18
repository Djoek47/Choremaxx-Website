export const PALETTES = ['sky', 'citrus', 'coral', 'berry'] as const;
export type Palette = (typeof PALETTES)[number];
export type Appearance = 'day' | 'night';

export const PALETTE_META: Record<Palette, { label: string; primary: string; wordmark: string; note: string }> = {
  sky:    { label: 'Sky',    primary: '#378ADD', wordmark: '#C4922A', note: 'gold wordmark' },
  citrus: { label: 'Citrus', primary: '#EF9F27', wordmark: '#712B13', note: 'rust wordmark' },
  coral:  { label: 'Coral',  primary: '#D85A30', wordmark: '#C4922A', note: 'the default' },
  berry:  { label: 'Berry',  primary: '#7F77DD', wordmark: '#C4789A', note: 'rose wordmark' },
};

const SESSION_KEY = 'cm-palette';
const LAST_KEY = 'cm-last-palette';

/** One palette per session, never the same as the visitor's previous visit. */
export function pickPalette(): Palette {
  try {
    const current = window.sessionStorage.getItem(SESSION_KEY);
    if (current && (PALETTES as readonly string[]).includes(current)) return current as Palette;
    const last = window.localStorage.getItem(LAST_KEY);
    const pool = PALETTES.filter((p) => p !== last);
    const arr = pool.length ? pool : PALETTES;
    const pick = arr[Math.floor(Math.random() * arr.length)];
    window.sessionStorage.setItem(SESSION_KEY, pick);
    window.localStorage.setItem(LAST_KEY, pick);
    return pick;
  } catch {
    return 'coral';
  }
}

export function systemAppearance(): Appearance {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
  } catch {
    return 'day';
  }
}

export function logoFor(palette: Palette, appearance: Appearance): string {
  const variant = appearance === 'night' ? 'tinted' : 'foreground';
  return `/brand/icons/icon-${palette}-${variant}.png`;
}
