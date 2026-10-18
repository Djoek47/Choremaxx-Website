# ChoreMaxx public website (redesign)

Static site, no build step. Vercel root directory should be this `site/` folder
(framework: Other / none).

## Before deploying
1. **Legal pages** — `privacy.html`, `terms.html`, `support.html` are included (copied from the prior site).
2. **App Store ID** — set to `6796850110` in `index.html`.
3. **config.js** — Supabase project URL is set. Fill **`supabaseAnonKey`** with the project’s anon key
   (never the service role key). Used only by `/auth/callback`.
4. **Supabase → Auth → URL configuration:** Site URL `https://www.choremaxx.app`; redirect URLs
   `https://www.choremaxx.app/auth/callback`, `https://choremaxx.app/auth/callback`, `choremaxx://auth/callback`.
5. **Apple Developer:** Associated Domains for `app.choremaxx.household`.
   `/.well-known/apple-app-site-association` is included and served as JSON.

## Pages
- `/` home (hero, features, Poppin AI, pricing, FAQ, download)
- `/privacy` `/terms` `/support`
- `/auth/callback` email confirmation bridge
- `/join/:code` household invite deep-link bridge

## Console
Staff console lives in `../console/` (separate Vite deploy).
