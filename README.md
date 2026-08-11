# ChoreMaxx Marketing Website

Production marketing & legal companion for **ChoreMaxx** — an AI household operating system for families.

**Live:** [https://www.choremaxx.app](https://www.choremaxx.app)  
**App (Orbit):** [Djoek47/Orbit](https://github.com/Djoek47/Orbit) · branch `cursor/choremaxx-make-v10-5f8f`  
**Handoff for agents:** [`WEBSITE_AGENT_HANDOFF.md`](./WEBSITE_AGENT_HANDOFF.md)

## Overview

- Per-session house palette (Sky / Citrus / Coral / Berry) with official Orbit icon plates
- System day/night via `prefers-color-scheme` (`data-appearance`)
- Wordmark: **chore** = secondary (brightens at night), **maxx** = primary
- Poppins AI naming (not Nova)
- Families-only positioning (no roommate mode)
- Pricing: **7-day trial · $4.99/mo · $48/yr**
- SEO, legal pages, App Store URL targets

## Tech Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Vercel · pnpm

## Setup

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
```

## Deploy

Push to GitHub → Vercel auto-deploys. Custom domain: **www.choremaxx.app**.

If the Vercel Build Command still includes `node .v0/inject-built-with-v0.mjs`, a no-op stub lives at `.v0/inject-built-with-v0.mjs` and `vercel.json` pins `"buildCommand": "next build"`. Prefer clearing the custom Build Command in Project Settings.

## App Store URLs

| Field | URL |
|-------|-----|
| Privacy | https://www.choremaxx.app/privacy |
| Terms | https://www.choremaxx.app/terms |
| Support | https://www.choremaxx.app/support |
| Copyright | https://www.choremaxx.app/copyright |

Email logo: `https://www.choremaxx.app/emails/logo-mark.png`

## Brand (synced with Orbit)

`choremaxx_logo_color_directions` — four palettes × day/night:

| Asset | Role |
|-------|------|
| `icon-{p}.png` | App / tab — day |
| `icon-{p}-dark.png` | App / tab — night |
| `icon-{p}-foreground.png` | **Website** logo — day |
| `icon-{p}-tinted.png` | **Website** logo — night (contrast with fonts) |

| Palette | maxx (primary) | chore day | chore night |
|---------|----------------|-----------|-------------|
| Coral (default) | `#D85A30` | `#C4922A` | `#FAC775` |
| Sky | `#378ADD` | `#C4922A` | `#FAC775` |
| Citrus | `#EF9F27` | `#712B13` | `#F0DCC8` |
| Berry | `#7F77DD` | `#C4789A` | `#F4C0D1` |

Source of truth: Orbit `constants/accent-themes.ts` + `constants/brand-lockup.ts` + `constants/color-palettes.ts` + `assets/brand/icons/`.

Bootstrap in `app/layout.tsx` sets `data-palette` (session) + `data-appearance` (system). `app/globals.css` remaps tokens and `.brand-logo`.

**Do not** recreate the house mark as SVG/emoji. Use Orbit PNGs; website chrome uses **foreground** / **tinted**, not plated marks.

## Project structure

```
app/                 # Routes (homepage, features, how-it-works, support, legal, SEO landings)
components/          # Header, Footer, PageShell, LegalDocument
lib/palettes.ts      # Palette tokens (mirror Orbit)
public/brand/        # Official house marks + icon plates
public/emails/       # Resend / email logo
public/screenshots/  # Marketing captures (hero placeholder until real app shots land)
```

## Product locks (do not drift)

From Orbit Master Brief / weekend ship playbook:

- AI name in product strings: **Poppins**
- Families only — no roommate mode
- Pricing: 7-day trial · $4.99/mo · $48/yr (+ tax via Apple)
- Allowance never sends money — **Mark as paid**
- Canonical / OG domain: `https://www.choremaxx.app`

## Still open

- Drop real iOS app screenshots into `public/screenshots/` and wire the homepage hero mockup (still on a legacy blob URL)
- Clear Vercel custom Build Command when convenient
- Merge PR → `main` and confirm production deploy on www.choremaxx.app

## License

© 2026 ChoreMaxx. All rights reserved.
