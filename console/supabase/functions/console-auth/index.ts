import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import {
  cors,
  json,
  sha256Hex,
  randomDigits,
  randomToken,
  b32encode,
  totpValid,
  staffEmailHtml,
  FROM,
  OTP_TTL_MS,
  STEP_TTL_MS,
  type Challenge,
} from './helpers.ts';

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin');
  try {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
    if (req.method !== 'POST') return json(origin, { error: 'POST only' }, 405);

    return await handle(req, origin);
  } catch (err) {
    console.error('console-auth unhandled', err);
    return json(origin, { error: 'Sign-in failed unexpectedly. Try again.' }, 500);
  }
});

async function handle(req: Request, origin: string | null): Promise<Response> {
  const url = Deno.env.get('SUPABASE_URL')!;
  const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
  const resendKey = Deno.env.get('RESEND_API_KEY') ?? '';
  const admin = createClient(url, service);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json(origin, { error: 'Invalid JSON' }, 400);
  }
  const action = String(body.action ?? '');

  async function loadChallenge(id: string, stepToken: string): Promise<Challenge | null> {
    const { data } = await admin.from('console_auth_challenges').select('*').eq('id', id).maybeSingle();
    if (!data || data.consumed_at) return null;
    if (!data.step_token_hash || !data.step_token_expires_at) return null;
    if (new Date(data.step_token_expires_at).getTime() < Date.now()) return null;
    const hash = await sha256Hex(stepToken);
    if (hash !== data.step_token_hash) return null;
    return data as Challenge;
  }

  async function issueStepToken(challengeId: string): Promise<string> {
    const token = randomToken();
    const hash = await sha256Hex(token);
    await admin
      .from('console_auth_challenges')
      .update({
        step_token_hash: hash,
        step_token_expires_at: new Date(Date.now() + STEP_TTL_MS).toISOString(),
      })
      .eq('id', challengeId);
    return token;
  }

  async function sendOtpEmail(email: string, otp: string): Promise<Response | null> {
    if (!resendKey) {
      console.error('console-auth: RESEND_API_KEY missing');
      return json(origin, { error: 'Email is not configured for the console yet.' }, 503);
    }
    const name = (email.split('@')[0] ?? 'there').split(/[._-]/)[0] || 'there';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: 'Your ChoreMaxx Console sign-in code',
        html: staffEmailHtml({ name, code: otp }),
        text: `Your ChoreMaxx Console sign-in code is ${otp}. It expires in 15 minutes. Enter it at console.choremaxx.app — this is not the app sign-in email.`,
      }),
    });
    if (!res.ok) {
      console.error('console-auth resend', res.status, (await res.text()).slice(0, 300));
      return json(origin, { error: 'Could not send the console email. Try again in a moment.' }, 502);
    }
    return null;
  }

  async function consumeOpenChallenges(userId: string) {
    await admin
      .from('console_auth_challenges')
      .update({
        consumed_at: new Date().toISOString(),
        pending_access_token: null,
        pending_refresh_token: null,
        step_token_hash: null,
      })
      .eq('user_id', userId)
      .is('consumed_at', null);
  }

  // ── 1. Email + password → send email code ─────────────────────────────────
  if (action === 'start-signin' || action === 'request-otp') {
    // request-otp kept as alias only when password is also supplied (old clients).
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase();
    const password = String(body.password ?? '');
    if (!email.includes('@')) return json(origin, { error: 'Enter your work email.' }, 400);
    if (!password || password.length < 8) {
      return json(origin, { error: 'Enter your console password (at least 8 characters).' }, 400);
    }

    const { data: staff } = await admin
      .from('console_staff')
      .select('user_id, email, totp_enabled, totp_secret')
      .ilike('email', email)
      .maybeSingle();

    const badCreds = { error: 'Wrong email or password.' };
    if (!staff) return json(origin, badCreds, 401);

    const authed = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    // Prefer the canonical auth.users email on the staff row.
    const { data: signed, error } = await authed.auth.signInWithPassword({
      email: staff.email,
      password,
    });
    if (error || !signed.session) {
      return json(origin, badCreds, 401);
    }

    await consumeOpenChallenges(staff.user_id);

    const otp = randomDigits(8);
    const otpHash = await sha256Hex(otp);
    const { data: inserted, error: insErr } = await admin
      .from('console_auth_challenges')
      .insert({
        user_id: staff.user_id,
        email: staff.email,
        otp_hash: otpHash,
        otp_expires_at: new Date(Date.now() + OTP_TTL_MS).toISOString(),
        password_verified_at: new Date().toISOString(),
        pending_access_token: signed.session.access_token,
        pending_refresh_token: signed.session.refresh_token,
      })
      .select('id')
      .single();
    if (insErr || !inserted) {
      console.error('console-auth insert challenge', insErr);
      return json(origin, { error: 'Could not start sign-in. Try again.' }, 500);
    }

    const mailErr = await sendOtpEmail(staff.email, otp);
    if (mailErr) return mailErr;

    const stepToken = await issueStepToken(inserted.id);
    return json(origin, {
      ok: true,
      next: 'otp',
      challengeId: inserted.id,
      stepToken,
      message: `We sent a console sign-in code to ${staff.email}.`,
    });
  }

  // ── 1b. Resend email code (password already verified on this challenge) ───
  if (action === 'resend-otp') {
    const challengeId = String(body.challengeId ?? '');
    const stepToken = String(body.stepToken ?? '');
    const ch = await loadChallenge(challengeId, stepToken);
    if (!ch?.password_verified_at || ch.otp_verified_at) {
      return json(origin, { error: 'Session expired. Start sign-in again from your email and password.' }, 401);
    }
    const otp = randomDigits(8);
    const otpHash = await sha256Hex(otp);
    await admin
      .from('console_auth_challenges')
      .update({
        otp_hash: otpHash,
        otp_expires_at: new Date(Date.now() + OTP_TTL_MS).toISOString(),
        otp_verified_at: null,
      })
      .eq('id', ch.id);
    const mailErr = await sendOtpEmail(ch.email, otp);
    if (mailErr) return mailErr;
    const nextToken = await issueStepToken(ch.id);
    return json(origin, {
      ok: true,
      next: 'otp',
      challengeId: ch.id,
      stepToken: nextToken,
      message: `New console code sent to ${ch.email}.`,
    });
  }

  // ── 2. Verify email OTP → authenticator ───────────────────────────────────
  if (action === 'verify-otp') {
    const challengeId = String(body.challengeId ?? '');
    const stepToken = String(body.stepToken ?? '');
    const code = String(body.code ?? '').replace(/\s+/g, '');
    if (!/^\d{8}$/.test(code)) return json(origin, { error: 'Enter the 8-digit code from your email.' }, 400);

    // Prefer challenge id from the browser; fall back to email lookup for older clients.
    let ch: Challenge | null = null;
    if (challengeId && stepToken) {
      ch = await loadChallenge(challengeId, stepToken);
    }
    if (!ch) {
      const email = String(body.email ?? '')
        .trim()
        .toLowerCase();
      const { data: rows } = await admin
        .from('console_auth_challenges')
        .select('*')
        .ilike('email', email)
        .is('consumed_at', null)
        .order('created_at', { ascending: false })
        .limit(5);
      const hash = await sha256Hex(code);
      const match = (rows as Challenge[] | null)?.find(
        (r) =>
          r.password_verified_at &&
          r.otp_hash === hash &&
          new Date(r.otp_expires_at).getTime() > Date.now() &&
          !r.otp_verified_at,
      );
      if (!match) return json(origin, { error: 'That email code is wrong or expired. Request a new one.' }, 401);
      ch = match;
    } else {
      if (!ch.password_verified_at) {
        return json(origin, { error: 'Session expired. Start sign-in again from your email and password.' }, 401);
      }
      if (ch.otp_verified_at) {
        return json(origin, { error: 'That email code was already used. Request a new one or start over.' }, 401);
      }
      if (new Date(ch.otp_expires_at).getTime() < Date.now()) {
        return json(origin, { error: 'That email code expired. Request a new one.' }, 401);
      }
      const hash = await sha256Hex(code);
      if (hash !== ch.otp_hash) {
        return json(origin, { error: 'That email code is wrong. Check the message and try again.' }, 401);
      }
    }

    await admin
      .from('console_auth_challenges')
      .update({ otp_verified_at: new Date().toISOString() })
      .eq('id', ch.id);
    const nextToken = await issueStepToken(ch.id);

    const { data: staff } = await admin
      .from('console_staff')
      .select('totp_enabled, totp_secret')
      .eq('user_id', ch.user_id)
      .maybeSingle();

    if (staff?.totp_enabled && staff.totp_secret) {
      return json(origin, { ok: true, next: 'totp', challengeId: ch.id, stepToken: nextToken });
    }

    // First-time (or incomplete) enroll — reuse existing secret if present so a
    // previously scanned QR still works.
    let secret = staff?.totp_secret ?? null;
    if (!secret) {
      const secretBytes = crypto.getRandomValues(new Uint8Array(20));
      secret = b32encode(secretBytes);
      await admin.from('console_staff').update({ totp_secret: secret, totp_enabled: false }).eq('user_id', ch.user_id);
    }
    const otpauth = `otpauth://totp/ChoreMaxx%20Console:${encodeURIComponent(ch.email)}?secret=${secret}&issuer=ChoreMaxx%20Console&algorithm=SHA1&digits=6&period=30`;
    return json(origin, {
      ok: true,
      next: 'enroll-totp',
      challengeId: ch.id,
      stepToken: nextToken,
      otpauth,
      secret,
    });
  }

  // Legacy no-op: password is verified in start-signin now.
  if (action === 'verify-password') {
    return json(origin, {
      error: 'Sign-in order changed. Enter your email and password first, then the email code.',
    }, 400);
  }

  // ── 3a. Confirm TOTP enrollment → session ─────────────────────────────────
  if (action === 'confirm-enroll') {
    const challengeId = String(body.challengeId ?? '');
    const stepToken = String(body.stepToken ?? '');
    const totpCodeIn = String(body.totpCode ?? '');
    const ch = await loadChallenge(challengeId, stepToken);
    if (!ch?.password_verified_at || !ch.otp_verified_at || !ch.pending_access_token || !ch.pending_refresh_token) {
      return json(origin, { error: 'Session expired. Start sign-in again from your email and password.' }, 401);
    }

    const { data: staff } = await admin
      .from('console_staff')
      .select('totp_secret, totp_enabled')
      .eq('user_id', ch.user_id)
      .maybeSingle();
    if (!staff?.totp_secret) return json(origin, { error: 'No authenticator setup in progress. Start over.' }, 400);
    if (!(await totpValid(staff.totp_secret, totpCodeIn))) {
      return json(origin, { error: 'That authenticator code is wrong. Wait for a new code and try again.' }, 401);
    }
    await admin
      .from('console_staff')
      .update({ totp_enabled: true, totp_enrolled_at: new Date().toISOString() })
      .eq('user_id', ch.user_id);

    await admin
      .from('console_auth_challenges')
      .update({
        consumed_at: new Date().toISOString(),
        pending_access_token: null,
        pending_refresh_token: null,
        step_token_hash: null,
      })
      .eq('id', ch.id);

    await admin.from('console_audit').insert({
      staff_id: ch.user_id,
      action: 'console_signin',
      target: ch.email,
    });

    return json(origin, {
      ok: true,
      next: 'done',
      enrolled: true,
      session: {
        access_token: ch.pending_access_token,
        refresh_token: ch.pending_refresh_token,
      },
    });
  }

  // ── Cancel an unfinished challenge ────────────────────────────────────────
  if (action === 'cancel-challenge') {
    const challengeId = String(body.challengeId ?? '');
    const stepToken = String(body.stepToken ?? '');
    if (!challengeId) return json(origin, { ok: true });
    const { data } = await admin.from('console_auth_challenges').select('*').eq('id', challengeId).maybeSingle();
    if (data && !data.consumed_at) {
      let ok = true;
      if (data.step_token_hash && stepToken) {
        const hash = await sha256Hex(stepToken);
        ok = hash === data.step_token_hash;
      }
      if (ok || !data.step_token_hash) {
        await admin
          .from('console_auth_challenges')
          .update({
            consumed_at: new Date().toISOString(),
            pending_access_token: null,
            pending_refresh_token: null,
            step_token_hash: null,
          })
          .eq('id', challengeId);
      }
    }
    return json(origin, { ok: true, next: 'email' });
  }

  // ── 3b. Verify TOTP (already enrolled) → session ──────────────────────────
  if (action === 'verify-totp') {
    const challengeId = String(body.challengeId ?? '');
    const stepToken = String(body.stepToken ?? '');
    const totpCodeIn = String(body.totpCode ?? '');
    const ch = await loadChallenge(challengeId, stepToken);
    if (!ch?.password_verified_at || !ch.otp_verified_at || !ch.pending_access_token || !ch.pending_refresh_token) {
      return json(origin, { error: 'Session expired. Start sign-in again from your email and password.' }, 401);
    }

    const { data: staff } = await admin
      .from('console_staff')
      .select('totp_secret, totp_enabled')
      .eq('user_id', ch.user_id)
      .maybeSingle();
    if (!staff?.totp_enabled || !staff.totp_secret) {
      return json(origin, { error: 'Set up your authenticator first. Start over to scan the QR again.' }, 400);
    }
    if (!(await totpValid(staff.totp_secret, totpCodeIn))) {
      return json(origin, { error: 'That authenticator code is wrong. Wait for a new code and try again.' }, 401);
    }

    await admin
      .from('console_auth_challenges')
      .update({
        consumed_at: new Date().toISOString(),
        pending_access_token: null,
        pending_refresh_token: null,
        step_token_hash: null,
      })
      .eq('id', ch.id);

    await admin.from('console_audit').insert({
      staff_id: ch.user_id,
      action: 'console_signin',
      target: ch.email,
    });

    return json(origin, {
      ok: true,
      next: 'done',
      session: {
        access_token: ch.pending_access_token,
        refresh_token: ch.pending_refresh_token,
      },
    });
  }

  return json(origin, { error: 'Unknown action' }, 400);
}
