# ChoreMaxx Website

Production public site is the **static redesign** in [`site/`](./site/).

| Path | What |
|---|---|
| `site/` | Public marketing site (deploy this to Vercel → `www.choremaxx.app`) |
| `console/` | Staff support console (Vite; deploy separately to `console.choremaxx.app`) |
| `app/`, `components/`, … | Previous Next.js site (kept for reference / legal source) |

## Deploy public site

1. Vercel project **choremaxx**: set **Root Directory** to `site`, Framework to **Other** (no build).
2. Fill `site/config.js` → `supabaseAnonKey` (anon key only).
3. Production branch: `cursor/apply-redesign-d768` (or promote the latest deploy).

## Deploy console

See [`console/README.md`](./console/README.md). Set `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` on that Vercel project.
