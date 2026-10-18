-- Console staff auth: email OTP challenges + TOTP secrets (service-role only).
-- Passwords stay on auth.users (set when creating the staff user).

alter table public.console_staff
  add column if not exists totp_secret text,
  add column if not exists totp_enabled boolean not null default false,
  add column if not exists totp_enrolled_at timestamptz;

comment on column public.console_staff.totp_secret is
  'Base32 TOTP secret. Readable only via service role (edge functions).';

create table if not exists public.console_auth_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  otp_hash text not null,
  otp_expires_at timestamptz not null,
  otp_verified_at timestamptz,
  password_verified_at timestamptz,
  -- Opaque bearer the browser holds between steps (hashed at rest).
  step_token_hash text,
  step_token_expires_at timestamptz,
  -- Temporary session material after password OK, released only after TOTP.
  pending_access_token text,
  pending_refresh_token text,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists console_auth_challenges_email_idx
  on public.console_auth_challenges (email, created_at desc);

alter table public.console_auth_challenges enable row level security;
-- No client policies: edge function (service role) only.

-- Helper: is this email on the staff list? (anon-callable via edge only — not granted to anon)
create or replace function public.console_staff_user_id(p_email text)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select user_id
  from public.console_staff
  where lower(email) = lower(trim(p_email))
  limit 1;
$$;
revoke all on function public.console_staff_user_id(text) from public;
