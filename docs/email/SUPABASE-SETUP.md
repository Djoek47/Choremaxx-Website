# Supabase setup — branded auth emails

Do this in the **Supabase Dashboard** for the Choremaxx **app** project (the Orbit / TestFlight backend). The website repo does not store the project name or ref.

### Which Supabase project?

**This is it:** `https://dejrbyufotcvcillnneo.supabase.co`  
Project ref: `dejrbyufotcvcillnneo`

Open these while signed in:

| Step | Link |
| --- | --- |
| Project home | https://supabase.com/dashboard/project/dejrbyufotcvcillnneo |
| Email templates (paste HTML here) | https://supabase.com/dashboard/project/dejrbyufotcvcillnneo/auth/templates |
| URL configuration (redirect allow list) | https://supabase.com/dashboard/project/dejrbyufotcvcillnneo/auth/url-configuration |
| Auth hooks (check Send Email) | https://supabase.com/dashboard/project/dejrbyufotcvcillnneo/auth/hooks |
| SMTP | https://supabase.com/dashboard/project/dejrbyufotcvcillnneo/auth/smtp |

The website (this repo / Vercel) is **not** a Supabase project. Only the iOS app talks to this backend.

The website already hosts the logo and the HTTPS bridge. Supabase is what **sends** the mail.

Open the HTML from this branch (`cursor/v1-90ad`):

| Paste this file | Into this Supabase template |
| --- | --- |
| [`docs/email/confirm-email.supabase.html`](./confirm-email.supabase.html) | Confirm signup |
| [`docs/email/reset-password.supabase.html`](./reset-password.supabase.html) | Reset password |
| [`docs/email/change-email.supabase.html`](./change-email.supabase.html) | Change email address |

GitHub (this branch):

- https://github.com/Djoek47/Choremaxx-Website/blob/cursor/v1-90ad/docs/email/confirm-email.supabase.html
- https://github.com/Djoek47/Choremaxx-Website/blob/cursor/v1-90ad/docs/email/reset-password.supabase.html
- https://github.com/Djoek47/Choremaxx-Website/blob/cursor/v1-90ad/docs/email/change-email.supabase.html

Use the `*.supabase.html` files, **not** the preview files. Previews still contain `EXAMPLE_TOKEN` / “Hi Jason”. The `.supabase.html` files use `{{ .TokenHash }}` and `{{ .Token }}`.

---

## 1. URL configuration (required)

**Authentication → URL Configuration**

**Site URL**

```
https://www.choremaxx.app
```

**Redirect URLs** — add all of these (one per line):

```
https://www.choremaxx.app/auth/callback
https://www.choremaxx.app/auth/callback/**
https://choremaxx.app/auth/callback
https://choremaxx.app/auth/callback/**
choremaxx://auth/callback
choremaxx://auth/callback/**
```

Save.

The email buttons do **not** use `choremaxx://` as the tap target. They use:

```
https://www.choremaxx.app/auth/callback?token_hash={{ .TokenHash }}&type=signup
https://www.choremaxx.app/auth/callback?token_hash={{ .TokenHash }}&type=recovery
https://www.choremaxx.app/auth/callback?token_hash={{ .TokenHash }}&type=email_change
```

Mail apps often strip custom-scheme buttons. The website then opens `choremaxx://auth/callback?…` for the iOS app. Keep `choremaxx://…` on the allow list for the app itself.

---

## 2. Email provider settings

**Authentication → Providers → Email** (sometimes **Sign in / Providers → Email**)

Turn **on**:

- **Confirm email** (signup does not finish until they confirm)
- **Secure email change** (if you offer change-email in the app)

OTP / magic link: keep **OTP** enabled so the 8-digit code in the email still works if the button fails. The templates show both the button and the code.

---

## 3. Paste the three templates

**Authentication → Email Templates**  
(newer dashboards: **Authentication → Emails → Templates**)

For each template:

1. Turn **Enable custom template** on (if shown).
2. Set the **Subject**.
3. Open the matching `*.supabase.html` file, Select All, Copy.
4. Paste into the **Body** (HTML) field. Replace the whole default body — do not leave the old `{{ .ConfirmationURL }}` button in place.
5. Save.

| Template in dashboard | Subject | File | `type` in the link |
| --- | --- | --- | --- |
| Confirm signup | `Confirm your email` | `confirm-email.supabase.html` | `signup` |
| Reset password | `Reset your password` | `reset-password.supabase.html` | `recovery` |
| Change email address | `Confirm your new email` | `change-email.supabase.html` | `email_change` |

Do **not** paste `confirm-email.html` (the “Hi Jason” preview). That will send a fake token.

Leave `{{ .TokenHash }}` and `{{ .Token }}` exactly as written. Supabase fills them in at send time.

Sender (if you can set it):

```
Choremaxx <noreply@choremaxx.app>
```

The domain `choremaxx.app` must be verified on your SMTP provider (usually **Resend**). Unverified domains land in spam or fail.

---

## 4. If you use an Auth Send Email Hook

If **Authentication → Hooks** has **Send Email** pointing at the Edge Function `send-auth-email`, **dashboard templates are ignored**. The hook owns the HTML.

Then either:

- Update `send-auth-email` so it sends the same HTML/links as these files, **or**
- Temporarily disable the hook, paste the templates above, and send a test — only if you are sure nothing else depends on the hook.

After changing the hook:

```bash
npx supabase functions deploy send-auth-email --no-verify-jwt
```

---

## 5. SMTP (so mail actually leaves)

**Project Settings → Authentication** (or **Authentication → Emails → SMTP**)

If you send through Resend:

- Host / port / user from Resend’s SMTP docs
- From: `Choremaxx <noreply@choremaxx.app>`
- Domain `choremaxx.app` verified in Resend, with SPF/DKIM

Without SMTP (or without the hook), Supabase rate-limits built-in mail and it is easy to miss inboxes.

---

## 6. Prove it works (TestFlight)

1. Sign up with a real inbox → you get **Confirm your email**, coral **Confirm email** button, and a code.
2. Tap the button → Safari opens `www.choremaxx.app/auth/callback?…&type=signup` → Choremaxx opens.
3. Kill the app / ignore the button → open Choremaxx → Confirm your email → type the code. Still works.
4. Forgot password → same layout, button **Reset password**, link has `type=recovery`.
5. Change email → same layout, button **Confirm new email**, link has `type=email_change`.

Logo in the email must load: `https://www.choremaxx.app/emails/logo-mark.png`

If the button is not tappable in Mail, the fallback URL at the bottom of the email is the same HTTPS link.

---

## What you should not do

- Do not set the email CTA to `choremaxx://…` (Mail often shows it as dead text).
- Do not use only `{{ .ConfirmationURL }}` unless it already redirects to `https://www.choremaxx.app/auth/callback` with `token_hash` and `type`. These templates already build that URL.
- Do not verify the user on the website. `/auth/callback` only opens the app.
- Do not paste the preview HTML into production.
