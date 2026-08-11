/**
 * ChoreMaxx house palettes.
 *
 * Four official brand looks — Sky, Citrus, Coral, and Berry — each pairing a
 * primary/secondary color duo with a recolored house-mark logo. One palette
 * is chosen per browsing session (see the bootstrap script in
 * app/layout.tsx) and applied to the page via a `data-palette` attribute on
 * `<html>`, which the CSS custom-property overrides in app/globals.css read
 * from. This file is the single source of truth for the palette names/colors
 * so design and code never drift apart — the CSS values below must match
 * app/globals.css exactly.
 */

export type PaletteName = 'sky' | 'citrus' | 'coral' | 'berry';

export interface Palette {
  name: PaletteName;
  label: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  logo: string;
}

export const PALETTES: Record<PaletteName, Palette> = {
  sky: {
    name: 'sky',
    label: 'Sky',
    primary: '#4C8DFF',
    primaryDark: '#2F6FE0',
    primaryLight: '#E7EFFF',
    secondary: '#143C7A',
    logo: '/brand/choremaxx-logo-mark-sky.png',
  },
  citrus: {
    name: 'citrus',
    label: 'Citrus',
    primary: '#F5B400',
    primaryDark: '#D89A00',
    primaryLight: '#FFF3D6',
    secondary: '#7A4B00',
    logo: '/brand/choremaxx-logo-mark-citrus.png',
  },
  coral: {
    name: 'coral',
    label: 'Coral',
    primary: '#FF6B4A',
    primaryDark: '#E24A2A',
    primaryLight: '#FFE3D9',
    secondary: '#7A1F12',
    logo: '/brand/choremaxx-logo-mark-coral.png',
  },
  berry: {
    name: 'berry',
    label: 'Berry',
    primary: '#B23AD1',
    primaryDark: '#8F1FAE',
    primaryLight: '#F4DFFB',
    secondary: '#3D1049',
    logo: '/brand/choremaxx-logo-mark-berry.png',
  },
};

export const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];

export const DEFAULT_PALETTE: PaletteName = 'sky';

const SESSION_KEY = 'cm-palette';
const LAST_VISIT_KEY = 'cm-last-palette';

/**
 * Picks the palette for the current browsing session, mirroring the inline
 * bootstrap script in app/layout.tsx. New tab/session → random palette that
 * excludes the visitor's previous-visit pick; returning within the same
 * session reuses that session's palette. Safe to call from client code
 * that needs to know the active palette (e.g. to read palette.label).
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
