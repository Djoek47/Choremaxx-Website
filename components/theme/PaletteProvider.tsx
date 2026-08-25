'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  type Appearance,
  type Palette,
  logoFor,
  pickPalette,
  systemAppearance,
} from '@/lib/palette-runtime';

type Ctx = {
  palette: Palette;
  appearance: Appearance;
  logo: string;
  setPalette: (p: Palette) => void;
  toggleAppearance: () => void;
};

const PaletteContext = createContext<Ctx | null>(null);

export function usePalette(): Ctx {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error('usePalette must be used inside <PaletteProvider>');
  return ctx;
}

export default function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<Palette>('coral');
  const [appearance, setAppearance] = useState<Appearance>('day');

  const apply = useCallback((p: Palette, a: Appearance) => {
    const html = document.documentElement;
    html.setAttribute('data-palette', p);
    html.setAttribute('data-appearance', a);
    setPaletteState(p);
    setAppearance(a);
  }, []);

  useEffect(() => {
    apply(pickPalette(), systemAppearance());

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply(pickPalette(), mq.matches ? 'night' : 'day');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [apply]);

  const value = useMemo<Ctx>(
    () => ({
      palette,
      appearance,
      logo: logoFor(palette, appearance),
      setPalette: (p) => apply(p, appearance),
      toggleAppearance: () => apply(palette, appearance === 'day' ? 'night' : 'day'),
    }),
    [palette, appearance, apply]
  );

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}
