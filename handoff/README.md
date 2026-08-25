# Website redesign handoff bundle

This folder holds the **v0 / design export** for the Chore Maxx marketing site redesign. Cloud agents and local devs apply it onto the live Next.js app on `cursor/website-brand-v2-9ecd`.

## Expected layout

```
handoff/
├── README.md          ← you are here
├── app/               ← Next.js App Router pages + globals.css + layout.tsx
├── components/        ← shared React components (Header, Footer, PageShell, …)
└── lib/               ← utilities, tokens, helpers
```

Drop the contents of **“Chore Maxx website redesign”** (from your design export) so those three directories are populated before integrating.

## Add the bundle to git

From the repo root (after copying the downloaded folder in as `handoff/`):

```bash
git checkout cursor/website-brand-v2-9ecd
git add handoff
git commit -m "Add website redesign handoff bundle"
git push -u origin cursor/website-brand-v2-9ecd
```

## Apply onto the live site

```bash
pnpm run integrate-handoff   # or: bash scripts/integrate-redesign-handoff.sh
pnpm install               # if handoff changed dependencies
pnpm dev                   # spot-check locally
pnpm build                 # must pass before merge
```

The script copies `handoff/app/*`, `handoff/components/*`, and `handoff/lib/*` into the repo root. It **does not** delete routes that exist only in the main tree (e.g. `/auth/callback`, `/join/[code]`, `/api/contact`).

## Protected — review after integrate

Do **not** ship a blind overwrite of these without re-applying brand V2 + bridge work:

| Path | Why |
|------|-----|
| `lib/palettes.ts` | Orbit-synced Sky/Citrus/Coral/Berry tokens + logo paths |
| `app/layout.tsx` | Blocking palette/appearance bootstrap + favicon swap |
| `app/globals.css` | `data-palette` × `data-appearance` CSS vars + `.brand-logo` |
| `app/auth/callback/**` | Email confirm deep-link bridge (Orbit) |
| `app/join/[code]/**` | Family invite universal link |
| `app/api/contact/route.ts` | Resend support/suggest forms |
| `lib/auth-bridge.ts`, `lib/resend.ts`, `lib/contact.ts` | Bridge + contact plumbing |

See `WEBSITE_AGENT_HANDOFF.md` and `docs/BRANCH_CONTINUITY.md` for product locks (Poppins, families-only, pricing, legal).

## Agent workflow

1. Confirm `handoff/app`, `handoff/components`, and `handoff/lib` contain source files (not just placeholders).
2. Run `pnpm run integrate-handoff`.
3. Diff protected paths above; merge redesign UI while keeping palette system + auth bridge + contact API.
4. `pnpm build` and spot-check `/`, `/features`, `/support`, `/auth/callback`, day + night × palettes.
5. Commit integrated changes separately from this bundle commit when possible.
