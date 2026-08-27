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
| `*.supabase.html` | Paste into Supabase Auth → Email Templates only if the Send Email hook is **off** |
| `orbit-hook/branded-html.ts` | Live mail: copy into Orbit `supabase/functions/send-auth-email/` and redeploy the hook |

## Connect in Supabase

Full operator steps: **[SUPABASE-SETUP.md](./SUPABASE-SETUP.md)** (URL allow list, paste the three templates, SMTP, hook warning, TestFlight checks).

## Live checks (already on production)

- Bridge page: `https://www.choremaxx.app/auth/callback` (200, `noindex`)
- Logo: `https://www.choremaxx.app/emails/logo-mark.png`
- Apple App Site Association: `https://www.choremaxx.app/.well-known/apple-app-site-association`
