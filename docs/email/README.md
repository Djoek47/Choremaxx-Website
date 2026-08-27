# Choremaxx auth emails

Visual source: the uploaded confirmation layout (`confirm-email.html`) — cream wash, coral CTA, logo mark hosted at `https://www.choremaxx.app/emails/logo-mark.png`.

All three flows share that layout. Buttons land on the live HTTPS bridge:

`https://www.choremaxx.app/auth/callback?token_hash=…&type=…`

The website forwards into the iOS app (`choremaxx://auth/callback`). OTP `verifyOtp` still happens **in the app**.

## Files

| File | Use |
| --- | --- |
| `confirm-email.html` | Preview of the uploaded signup email (example token / “Hi Jason”) |
| `reset-password.html` | Preview — forgot password, same chrome, `type=recovery` |
| `change-email.html` | Preview — confirm new email, same chrome, `type=email_change` |
| `*.supabase.html` | Paste into Supabase Auth → Email Templates (`{{ .TokenHash }}` / `{{ .Token }}`) |

## Connect in Supabase

Dashboard → **Authentication** → **Email Templates**:

1. **Confirm signup** → paste `confirm-email.supabase.html` (subject: `Confirm your email`)
2. **Reset password** → paste `reset-password.supabase.html` (subject: `Reset your password`)
3. **Change email address** → paste `change-email.supabase.html` (subject: `Confirm your new email`)

Site URL / redirect allow list must include:

- `https://www.choremaxx.app/auth/callback`
- `https://choremaxx.app/auth/callback`

Do **not** use `choremaxx://` as the primary CTA. Mail clients often strip custom-scheme buttons.

## Live checks (already on production)

- Bridge page: `https://www.choremaxx.app/auth/callback` (200, `noindex`)
- Logo: `https://www.choremaxx.app/emails/logo-mark.png`
- Apple App Site Association: `https://www.choremaxx.app/.well-known/apple-app-site-association`
