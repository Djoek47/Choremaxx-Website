# ChoreMaxx Console

The staff website for ChoreMaxx support: who pays and for how long, Poppins actions bought and
spent, the support inbox (app messages and emails to support@choremaxx.app, with replies), and
app errors. Live data from the app's Supabase project. Households show as codes (HH-XXXX)
unless you turn on **Show names**, which is logged. It never reads tasks, messages, photos,
children's names or anything said to Poppins, and it can't change billing.

Static site (Vite + TypeScript + supabase-js). No server of its own: every read is protected by
Supabase RLS and staff-only database functions; replies go through a Supabase edge function.

---

## 1. Supabase (once) — same project as the app

The SQL and edge functions are in `supabase/`. They are also in the app repo (patch
`v37-01` + `v37-02`), so if you apply those patches you can run the commands from the app repo
instead. Either way, run from a folder linked to the project (`supabase link`):

```bash
supabase db push                                   # or paste the files below into the SQL editor, in order
#   supabase/migrations/20261008120000_support_console.sql
#   supabase/migrations/20261008130000_console_live.sql
#   supabase/migrations/20261008140000_household_email_log.sql
#   supabase/migrations/20261008150000_support_attachments.sql   (screenshots in the console)
#   supabase/migrations/20261017120000_console_users_routing.sql (Users view + sends each message
#                                                                 and error to the right section)

supabase functions deploy support-inbound --no-verify-jwt
supabase functions deploy support-reply
supabase secrets set RESEND_INBOUND_SECRET=whsec_...  # from step 2
# RESEND_API_KEY is already set for the app's receipt emails.
```

**Make yourself staff.** Your email must already be a Supabase user (sign up in the app, or
Supabase → Authentication → Users → Add user). Then in the SQL editor:

```sql
insert into public.console_staff (user_id, email, role)
select id, email, 'owner' from auth.users where email = 'you@choremaxx.app';
```

Add more staff the same way with `role = 'support'`. Remove someone:
`delete from public.console_staff where email = '…';`

**Staff sign-in is three factors** (not the app magic link):

1. Work email + console **password** (set on the Auth user in Supabase)
2. **Console-only** 8-digit email code (`console-auth` → Resend)
3. **Authenticator app** TOTP — first sign-in shows a QR to enroll; later sign-ins ask for the 6-digit code

Wrong password / wrong email code / wrong authenticator code each return a clear error on the form.
Use **Start over** (or resend) if a mid-flow challenge expires.

```bash
supabase functions deploy console-auth --no-verify-jwt
# RESEND_API_KEY must already be set (same secret as other Resend functions).
```

Staff passwords: Supabase → Authentication → Users → set a password for each `console_staff` email
(or `update user` with a password). Magic-link-only users cannot pass step 1 until a password exists.

## 2. Resend — receive support@choremaxx.app

1. Resend → **Receiving** → add domain `choremaxx.app` → add the MX record it shows at your DNS
   host. (If choremaxx.app mail already goes to Google/iCloud, use a subdomain such as
   `help.choremaxx.app` instead and forward support@ to it.)
2. Resend → **Webhooks** → Add → URL
   `https://<project-ref>.supabase.co/functions/v1/support-inbound` → event **email.received**.
3. Copy the webhook's **signing secret** into `RESEND_INBOUND_SECRET` (step 1).

Test: send an email to support@choremaxx.app. It appears in the console inbox within seconds
(as a new ticket, linked to the household when the sender has a ChoreMaxx account). Reply from
the console; the customer's answer lands on the same ticket (the `CMX-1234` in the subject ties
them together).

## 3. GitHub

```bash
cd choremaxx-console
git init && git add -A && git commit -m "ChoreMaxx Console"
git branch -M main
git remote add origin https://github.com/<you>/choremaxx-console.git
git push -u origin main
```

Keep the repo **private**. `.env` files are git-ignored; the anon key is safe in the browser,
but don't commit it anyway.

## 4. Vercel

1. Vercel → Add New → Project → import the GitHub repo. Framework: **Vite** (detected).
2. Environment variables (Production and Preview):
   - `VITE_SUPABASE_URL` = `https://<project-ref>.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = the project's **anon** key (Settings → API). Never the service role key.
3. Deploy. Then Settings → Domains → add `console.choremaxx.app` and the CNAME it shows.

`vercel.json` already sets the build, SPA routing, and `noindex` + no-framing headers.

## 5. Check it

- Open the site, enter your staff email, click the link in the email → Overview loads.
- An address that isn't on the staff list is signed out with "This address isn't on the staff list."
- Households: statuses and time left match the app's Purchase diagnostics for your own household.
- Support: send a message from the app (Settings → Support) → appears with `In app` and its error count.
- Errors: appear after a build containing patch `v37-02` reports one.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the two values
npm run dev                  # http://localhost:5173
npm run build                # typecheck + production build into dist/
```

## What each screen reads

| Screen | Source |
|---|---|
| Overview, Households | `rpc('console_households')` — status, plan, days left, members, actions |
| Support | `support_tickets`, `support_replies` (RLS: staff only), realtime on both |
| Reply | edge function `support-reply` (Resend), logged in `console_audit` |
| Credits & AI | `rpc('console_pack_sales')`, `rpc('console_ai_mix')` |
| Errors & feedback | `rpc('console_errors')`, `rpc('console_deletion_reasons')` |

Revenue is an estimate from list prices (USD) before Apple's cut. Real proceeds: App Store
Connect → Sales and Trends.

## Where things land

Every message is filed automatically, whether it came from the app's Support screen or as an
email to support@choremaxx.app through Resend:

- **Credits & billing**: anything about credits, packs, purchases, refunds, charges, the
  subscription or trial, and app errors in the Billing or Poppins category. Shows under
  Support → Credits & billing and on the Credits & AI page.
- **Errors & bugs**: messages with errors attached, or about crashes and things not working.
  Errors attached in the app's feedback tool also appear on the Errors page, linked to the ticket.
- **Support**: everything else (questions, feedback, requests).

To move a ticket by hand, change its section from the dropdown next to its status.
The app side (filing attached errors, app version on error reports) is in the app repo's
`send-support-feedback` function; redeploy it with
`supabase functions deploy send-support-feedback`.
