# Drop-in for the live Send Email hook

Inbox mail comes from Orbit, not from the website:

`supabase/functions/send-auth-email/branded-html.ts`

1. Replace that file with `branded-html.ts` from this folder.
2. From the Orbit repo:

```bash
npx supabase link --project-ref dejrbyufotcvcillnneo
npx supabase functions deploy send-auth-email --no-verify-jwt
```

Keep the Send Email hook **on**. Do not paste dashboard templates.

Layout: cream card, peach header, coral pill, hosted logo, no street / city / year line.
