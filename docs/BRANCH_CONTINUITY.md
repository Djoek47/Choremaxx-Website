# Website branch continuity (do not break)

## Canonical working branch

**`cursor/website-brand-v2-9ecd`**

This is the continuous product line for www.choremaxx.app:
- Brand V2 (palettes, coral lockup, screenshots, A1/B4)
- Auth email bridge (`/auth/callback`, AASA, `/join/[code]`)
- Vercel `.v0` build stub

All new website work **must** branch from this tip (or from `main` only after this is merged into `main`).

## Never

- Do **not** start feature work from stale `main` while brand V2 is ahead of `main`
- Do **not** deploy a feature branch that is based on old `main` to Production
- Do **not** force-push Production to a branch that drops brand V2 commits

## Before any Production deploy

```bash
# Must show Coral / brand tokens, not lavender #5B8CFF
curl -sL "https://www.choremaxx.app/" | rg -o 'D85A30|5B8CFF|FAF0EB|data-palette' | head

# Bridge must be 200
curl -sI "https://www.choremaxx.app/auth/callback?token_hash=test&type=signup" | head -3
```

## Contact / Resend

Website support + suggestion forms POST to `/api/contact` and send via Resend.

Required Vercel env (once): `RESEND_API_KEY`  
Optional: `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL` (default `support@choremaxx.app`)

From address must be on a Resend-verified domain (`choremaxx.app`).

## Related PRs

- Brand + bridge continuous line: keep `cursor/website-brand-v2-9ecd` updated
- Feature PRs should target `main` **only after** brand V2 is merged, or target brand V2 until then
- Push **once** when ready — never sync the same tip to multiple branches (burns Preview builds)
