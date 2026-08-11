# Website agent handoff — ChoreMaxx

**Repo:** [Djoek47/Choremaxx-Website](https://github.com/Djoek47/Choremaxx-Website)  
**Working branch:** `cursor/website-brand-palettes-9ecd` → [PR #1](https://github.com/Djoek47/Choremaxx-Website/pull/1)  
**Live domain:** https://www.choremaxx.app  
**Sibling app (Orbit):** [Djoek47/Orbit](https://github.com/Djoek47/Orbit) @ `cursor/choremaxx-make-v10-5f8f` ([PR #29](https://github.com/Djoek47/Orbit/pull/29))

This file is the checklist for finishing / maintaining the marketing site. Read Orbit’s playbooks when product copy or legal must stay in sync:

- `docs/weekend-ship-automation.md` — **A1 / B4** website items
- `docs/site-copy-a1-patch.md` — Poppins, families-only, pricing, legal re-host
- `docs/legal/privacy-policy.md` + `docs/legal/terms-of-service.md`
- `constants/accent-themes.ts` + `constants/brand-lockup.ts` + `assets/brand/marks/`

---

## Done on this branch

| Area | Status |
|------|--------|
| Official house marks (Sky/Citrus/Coral/Berry) from Orbit `assets/brand/marks/` | ✅ |
| App icon plates in `public/brand/icons/` + coral `apple-icon.png` / `og.png` | ✅ |
| Email logo `public/emails/logo-mark.png` from Orbit | ✅ |
| Per-session palette pick (sessionStorage + avoid last visit) | ✅ |
| Wordmark chore=secondary / maxx=primary via CSS vars | ✅ |
| Palette hex tokens synced to Orbit accent + LOCKUPS.chore | ✅ |
| Canonical / OG / sitemap / robots → `https://www.choremaxx.app` | ✅ |
| Invisible white-on-light text fixed on unfinished pages | ✅ |
| Poppins naming (not Nova) | ✅ |
| Families-only (roommate mode removed from marketing) | ✅ |
| Pricing: 7-day trial · $4.99/mo · $48/yr | ✅ |
| Privacy / Terms re-hosted from Orbit legal (2026-08-10) | ✅ |
| Vercel missing `.v0/inject-built-with-v0.mjs` stub + `vercel.json` | ✅ |
| Readable how-it-works / support / features / download / SEO landings | ✅ |
| System day/night (`data-appearance`) from prefers-color-scheme | ✅ |
| Website logos: foreground (day) / tinted (night) per palette | ✅ |
| Wordmark night chore from Orbit NIGHT_CHORE; surfaces from color-palettes | ✅ |
| App screenshots wired (home, plan, shopping, rewards, poppins-activity) | ✅ |

---

## Still TODO (human or next agent)

1. **Tasks screenshot** — Drop `public/screenshots/tasks.png` when available; Features Tasks row will pick it up when wired.
2. **Merge + redeploy** — Merge PR #1 to `main`; confirm Vercel production on www.choremaxx.app (privacy/terms must be live for ASC).
3. **Optional Vercel cleanup** — Clear custom Build Command so it is just `next build` / `pnpm build`.
4. **iOS accent prefs** — Leave app-side accent prefs alone; site only mirrors the four logo packs for marketing.

---

## How palette + appearance work

1. Blocking script in `app/layout.tsx` reads `sessionStorage.cm-palette`.
2. If missing, picks random from `sky|citrus|coral|berry` excluding `localStorage.cm-last-palette`.
3. Sets `data-palette` on `<html>` before paint.
4. Sets `data-appearance` to `day`|`night` from `prefers-color-scheme` and listens for OS changes.
5. `app/globals.css` remaps brand + surface tokens and `.brand-logo`:
   - Day → `icon-{palette}-foreground.png`
   - Night → `icon-{palette}-tinted.png`
6. Wordmark: `chore` = `--color-secondary` (day lockup / night bright), `maxx` = `--color-primary`.
7. Browser **tab favicon** always matches the session palette color (day/night ignored):
   - Berry → purple `icon-berry.png`, Sky → blue, Citrus → orange, Coral → coral
   - File: `icon-{palette}.png?p={palette}` (cache-bust; favicons are **not** cookies —
     browsers cache them hard. We remove/recreate the `<link rel="icon">` node.)
   - Limitation: some browsers still keep the first favicon for the tab until a full
     reload or new tab; header/wordmark will always match immediately.

### Logo pack map (choremaxx_logo_color_directions)

| File | Use |
|------|-----|
| `icon-{p}.png` | App tab — day |
| `icon-{p}-dark.png` | App tab — night |
| `icon-{p}-foreground.png` | Website — day |
| `icon-{p}-tinted.png` | Website — night (font contrast) |

Plated `choremaxx-logo-mark-*.png` remain for favicon / OG / email — not header chrome.

Default / fallback = **coral** (Orbit `DEFAULT_ACCENT_THEME_ID`).

---

## Do not

- Invent roommate mode or Free / $8.99 Family plans
- Rename Poppins back to Nova
- Recreate the house mark as SVG/emoji — always use Orbit PNGs
- Put plated marks back in `.brand-logo` (use foreground/tinted)
- Change iOS in-app theme prefs from this repo
- Push product features that are not in Orbit Master Brief §3

---

## Verify before ship

```bash
pnpm install
pnpm build
pnpm start   # spot-check /, /how-it-works, /support, /features, /privacy, /terms
```

Confirm: day + night both readable, palette swaps logo+wordmark on new session, night uses tinted logo + bright chore, pricing shows trial + $4.99 / $48, no “roommate” promises, canonical tags use www.choremaxx.app.
