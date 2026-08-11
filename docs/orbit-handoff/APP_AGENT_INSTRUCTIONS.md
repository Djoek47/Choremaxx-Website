# Orbit app agent — email confirm + deletion UX handoff

**Repo:** `Djoek47/Orbit`  
**Base branch:** `cursor/choremaxx-make-v10-5f8f`  
**Feature branch to create/push:** `cursor/email-confirm-deletion-ux-3686`  
**Patch commit:** `6d5e304` — `fix(auth): HTTPS confirm links, OTP entry, and deletion feedback`

A previous agent implemented this locally but **could not push to Orbit (403)**. Your job: apply the patch, push, open the PR, ship ops, and (if asked) TestFlight.

---

## 1. Apply the patch

Patch file (same content in both places):

- Website PR #2:  
  https://github.com/Djoek47/Choremaxx-Website/blob/cursor/website-auth-bridge-instructions-3686/docs/orbit-handoff/orbit-email-confirm-deletion-ux-3686.patch
- Or download from that branch:

```bash
cd /path/to/Orbit
git fetch origin
git checkout cursor/choremaxx-make-v10-5f8f
git pull origin cursor/choremaxx-make-v10-5f8f
git checkout -b cursor/email-confirm-deletion-ux-3686

# download patch then:
curl -L -o /tmp/orbit-email-confirm-deletion-ux-3686.patch \
  "https://raw.githubusercontent.com/Djoek47/Choremaxx-Website/cursor/website-auth-bridge-instructions-3686/docs/orbit-handoff/orbit-email-confirm-deletion-ux-3686.patch"

git am /tmp/orbit-email-confirm-deletion-ux-3686.patch
git push -u origin cursor/email-confirm-deletion-ux-3686
```

Open a PR into `cursor/choremaxx-make-v10-5f8f` (or the current ship branch).

---

## 2. What the patch already implements (do not redo)

### Email confirmation (broken link / no code entry / spinner)

| Area | Change |
|------|--------|
| Edge emails | CTA always `https://www.choremaxx.app/auth/callback?token_hash=…&type=…` (clickable HTTPS). Real button + clickable fallback link. Copy mentions in-app code. |
| App redirect | `getEmailConfirmRedirectUrl()` → `https://www.choremaxx.app/auth/callback` |
| Confirm screen | Primary **confirmation code** field + `verifySignupEmailOtp` via `supabase.auth.verifyOtp({ email, token, type: 'signup' })` |
| Callback screen | Verify timeout (12s); never infinite spinner; **Enter code** exit path |
| Pending signup | Persisted to AsyncStorage so password survives app kill |

Key files:

- `lib/auth/email-confirmation.ts`
- `app/confirm-email.tsx`
- `app/auth/callback.tsx`
- `supabase/functions/send-auth-email/index.ts`
- `supabase/functions/send-auth-email/branded-html.ts`
- `emails/verification.tsx`

### Account deletion + optional feedback

| Area | Change |
|------|--------|
| Settings | Delete account → navigates to `/delete-account` (no one-tap Alert) |
| New screen | Apple-calm two-step: optional reason/note → confirm forever → done |
| Backend | Migration `submit_account_deletion_feedback` (best-effort before `delete_own_account`) |

Key files:

- `app/delete-account.tsx`
- `app/settings.tsx`
- `repositories/auth-repository.ts`
- `store/orbit-store.tsx`
- `supabase/migrations/20260811000000_account_deletion_feedback.sql`

Design intent: radical simplicity, soft charcoal/gray, sparse accent, large type, no clutter — Apple-caliber, not SaaS flashy.

---

## 3. Ops you must run after merge (or on staging before TestFlight)

1. **Redeploy Auth email Edge Function** (HTTPS links only take effect after deploy):

```bash
npx supabase functions deploy send-auth-email --no-verify-jwt
```

2. **Apply migration:**

```bash
npx supabase db push
# or apply: supabase/migrations/20260811000000_account_deletion_feedback.sql
```

3. **Supabase Auth → URL configuration** allow-list:

- `https://www.choremaxx.app/auth/callback`
- `https://choremaxx.app/auth/callback`
- `choremaxx://auth/callback`

4. Confirm **Auth Send Email Hook** still points at `send-auth-email`.

---

## 4. Dependency on website agent (parallel)

Emails now open **HTTPS**. The website must ship `/auth/callback` that forwards to `choremaxx://auth/callback?…` plus AASA.

Website handoff (for them, not you):  
https://github.com/Djoek47/Choremaxx-Website/blob/cursor/website-auth-bridge-instructions-3686/docs/auth-callback-bridge-for-website-agent.md

Until that is live, users can still confirm with the **in-app code**. You can TestFlight the app before the site bridge exists.

---

## 5. TestFlight (if requested)

```bash
npm run testflight:preflight   # if available
npm run build:ios:testflight
npm run submit:ios:testflight
```

Smoke on device:

1. Sign up → land on Confirm your email  
2. Enter code from email → reaches onboarding / premium gate (not stuck Confirming)  
3. Tap email HTTPS link (once site bridge is live) → app verifies → You're in  
4. Settings → Delete account → optional feedback → Delete forever → welcome  

---

## 6. Do not

- Revert HTTPS email CTAs back to `choremaxx://` as the primary button (Mail shows them as plain text)
- Remove the OTP entry UI
- Block account deletion if feedback RPC fails (it is best-effort)
- Implement `/auth/callback` on the marketing site in this repo — that’s the website agent

---

## 7. Quick PR description (paste)

```
fix(auth): HTTPS confirm links, OTP entry, and deletion feedback

- Email CTAs use https://www.choremaxx.app/auth/callback (clickable in Mail)
- Confirm-email: enter OTP from email; pending signup persisted
- auth/callback: timeout + Enter code path (no endless spinner)
- Settings → Delete account: two-step confirm + optional churn feedback
- Migration: submit_account_deletion_feedback

Requires: redeploy send-auth-email; apply migration; website /auth/callback bridge (parallel).
```
