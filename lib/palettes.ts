/**
 * ChoreMaxx house palettes — synced with Orbit
 * (`constants/accent-themes.ts`, `constants/brand-lockup.ts`,
 * `constants/color-palettes.ts`).
 *
 * Four official brand looks — Sky, Citrus, Coral, and Berry — each pairing a
 * primary (“maxx”) / secondary (“chore”) wordmark duo with official icon plates.
 *
 * Logo pack (choremaxx_logo_color_directions):
 * - icon-{p}.png            → app/tab day
 * - icon-{p}-dark.png       → app/tab night
 * - icon-{p}-foreground.png → website day logo
 * - icon-{p}-tinted.png     → website night logo (contrast with fonts)
 *
 * One palette is chosen per browsing session (see the bootstrap script in
 * app/layout.tsx). Day vs night follows `prefers-color-scheme` via
 * `data-appearance` on `<html>`.
 *
 * Default = Coral (App Store / Orbit DEFAULT_ACCENT_THEME_ID).
 */

export type PaletteName = 'sky' | 'citrus' | 'coral' | 'berry';
export type Appearance = 'day' | 'night';

export interface WordmarkColors {
  /** “chore” half — Orbit LOCKUPS.chore (day) / NIGHT_CHORE (night) */
  chore: string;
  /** “maxx” half — Orbit LOCKUPS.maxx / accent.primary (unchanged at night) */
  maxx: string;
}

export interface SurfaceTokens {
  bg: string;
  bgSoft: string;
  card: string;
  text: string;
  textSoft: string;
  textMuted: string;
  border: string;
  glass: string;
  glassBorder: string;
}

export interface PaletteLogos {
  /** App / tab icon — day (primary plate) */
  tabDay: string;
  /** App / tab icon — night (nightTint plate) */
  tabNight: string;
  /** Website header/footer — day (palette-accurate, transparent) */
  websiteDay: string;
  /** Website header/footer — night (white silhouette for contrast) */
  websiteNight: string;
  /** Plated house mark (email / OG / favicon fallback) */
  plated: string;
}

export interface Palette {
  name: PaletteName;
  label: string;
  /** “maxx” + buttons / accents — Orbit accent.primary */
  primary: string;
  primaryDark: string;
  primaryLight: string;
  /** Day “chore” wordmark — Orbit LOCKUPS.chore */
  secondary: string;
  wordmark: { day: WordmarkColors; night: WordmarkColors };
  surfaces: { day: SurfaceTokens; night: SurfaceTokens };
  logos: PaletteLogos;
  /** @deprecated Prefer logos.websiteDay — kept for older call sites */
  logo: string;
}

function iconPaths(p: PaletteName): PaletteLogos {
  return {
    tabDay: `/brand/icons/icon-${p}.png`,
    tabNight: `/brand/icons/icon-${p}-dark.png`,
    websiteDay: `/brand/icons/icon-${p}-foreground.png`,
    websiteNight: `/brand/icons/icon-${p}-tinted.png`,
    plated: `/brand/choremaxx-logo-mark-${p}.png`,
  };
}

export const PALETTES: Record<PaletteName, Palette> = {
  sky: {
    name: 'sky',
    label: 'Sky',
    primary: '#378ADD',
    primaryDark: '#2A6FB5',
    primaryLight: '#E5F2FB',
    secondary: '#C4922A',
    wordmark: {
      day: { chore: '#C4922A', maxx: '#378ADD' },
      night: { chore: '#FAC775', maxx: '#378ADD' },
    },
    surfaces: {
      day: {
        bg: '#EAF3FB',
        bgSoft: '#E4EBF2',
        card: 'rgba(255, 255, 255, 0.78)',
        text: '#0F1C2A',
        textSoft: '#2A3A4C',
        textMuted: '#5A6E82',
        border: 'rgba(20, 40, 60, 0.1)',
        glass: 'rgba(255, 255, 255, 0.65)',
        glassBorder: 'rgba(255, 255, 255, 0.80)',
      },
      night: {
        bg: '#07121F',
        bgSoft: '#0A1525',
        card: 'rgba(255, 255, 255, 0.05)',
        text: '#EEF2FF',
        textSoft: '#C8D8F0',
        textMuted: '#7C9CC0',
        border: 'rgba(55, 138, 221, 0.2)',
        glass: 'rgba(255, 255, 255, 0.06)',
        glassBorder: 'rgba(255, 255, 255, 0.12)',
      },
    },
    logos: iconPaths('sky'),
    logo: '/brand/icons/icon-sky-foreground.png',
  },
  citrus: {
    name: 'citrus',
    label: 'Citrus',
    primary: '#EF9F27',
    primaryDark: '#C47F1A',
    primaryLight: '#FDF3E0',
    secondary: '#712B13',
    wordmark: {
      day: { chore: '#712B13', maxx: '#EF9F27' },
      night: { chore: '#F0DCC8', maxx: '#EF9F27' },
    },
    surfaces: {
      day: {
        bg: '#FBF4E8',
        bgSoft: '#E4EBF2',
        card: 'rgba(255, 255, 255, 0.78)',
        text: '#712B13',
        textSoft: '#8A4A28',
        textMuted: '#9A6A48',
        border: 'rgba(20, 40, 60, 0.1)',
        glass: 'rgba(255, 255, 255, 0.65)',
        glassBorder: 'rgba(255, 255, 255, 0.80)',
      },
      night: {
        bg: '#1A1208',
        bgSoft: '#0A1525',
        card: 'rgba(255, 255, 255, 0.05)',
        text: '#EEF2FF',
        textSoft: '#C8D8F0',
        textMuted: '#7C9CC0',
        border: 'rgba(239, 159, 39, 0.22)',
        glass: 'rgba(255, 255, 255, 0.06)',
        glassBorder: 'rgba(255, 255, 255, 0.12)',
      },
    },
    logos: iconPaths('citrus'),
    logo: '/brand/icons/icon-citrus-foreground.png',
  },
  coral: {
    name: 'coral',
    label: 'Coral',
    primary: '#D85A30',
    primaryDark: '#B84722',
    primaryLight: '#FDE8DF',
    secondary: '#C4922A',
    wordmark: {
      day: { chore: '#C4922A', maxx: '#D85A30' },
      night: { chore: '#FAC775', maxx: '#D85A30' },
    },
    surfaces: {
      day: {
        bg: '#FAF0EB',
        bgSoft: '#E4EBF2',
        card: 'rgba(255, 255, 255, 0.78)',
        text: '#0F1C2A',
        textSoft: '#2A3A4C',
        textMuted: '#5A6E82',
        border: 'rgba(20, 40, 60, 0.1)',
        glass: 'rgba(255, 255, 255, 0.65)',
        glassBorder: 'rgba(255, 255, 255, 0.80)',
      },
      night: {
        bg: '#1A0C08',
        bgSoft: '#0A1525',
        card: 'rgba(255, 255, 255, 0.05)',
        text: '#EEF2FF',
        textSoft: '#C8D8F0',
        textMuted: '#7C9CC0',
        border: 'rgba(216, 90, 48, 0.22)',
        glass: 'rgba(255, 255, 255, 0.06)',
        glassBorder: 'rgba(255, 255, 255, 0.12)',
      },
    },
    logos: iconPaths('coral'),
    logo: '/brand/icons/icon-coral-foreground.png',
  },
  berry: {
    name: 'berry',
    label: 'Berry',
    primary: '#7F77DD',
    primaryDark: '#6259C4',
    primaryLight: '#EEEBFB',
    secondary: '#C4789A',
    wordmark: {
      day: { chore: '#C4789A', maxx: '#7F77DD' },
      night: { chore: '#F4C0D1', maxx: '#7F77DD' },
    },
    surfaces: {
      day: {
        bg: '#F4F0FA',
        bgSoft: '#EBE4F5',
        card: 'rgba(255, 255, 255, 0.78)',
        text: '#1A1230',
        textSoft: '#3A2E55',
        textMuted: '#6B5F88',
        border: 'rgba(90, 60, 140, 0.12)',
        glass: 'rgba(255, 255, 255, 0.65)',
        glassBorder: 'rgba(255, 255, 255, 0.80)',
      },
      night: {
        bg: '#100A1C',
        bgSoft: '#1A1628',
        card: 'rgba(255, 255, 255, 0.06)',
        text: '#F5F0FF',
        textSoft: '#D4CBE8',
        textMuted: '#9B8FBF',
        border: 'rgba(127, 119, 221, 0.2)',
        glass: 'rgba(255, 255, 255, 0.06)',
        glassBorder: 'rgba(255, 255, 255, 0.12)',
      },
    },
    logos: iconPaths('berry'),
    logo: '/brand/icons/icon-berry-foreground.png',
  },
};

export const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];

export const DEFAULT_PALETTE: PaletteName = 'coral';
export const DEFAULT_APPEARANCE: Appearance = 'day';

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

/** Resolve wordmark colors for the active palette / appearance. */
export function resolveWordmark(
  palette: PaletteName = DEFAULT_PALETTE,
  appearance: Appearance = DEFAULT_APPEARANCE
): WordmarkColors {
  return PALETTES[palette].wordmark[appearance];
}

/** Website logo path for the active palette / appearance. */
export function resolveWebsiteLogo(
  palette: PaletteName = DEFAULT_PALETTE,
  appearance: Appearance = DEFAULT_APPEARANCE
): string {
  const logos = PALETTES[palette].logos;
  return appearance === 'night' ? logos.websiteNight : logos.websiteDay;
}
