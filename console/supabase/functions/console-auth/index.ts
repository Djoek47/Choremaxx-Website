/**
 * ChoreMaxx Console staff auth — three factors, custom email (not the app magic link).
 *
 * Steps:
 *   1) request-otp   → Resend staff email with 8-digit code
 *   2) verify-otp    → unlock password step
 *   3) verify-password → unlock TOTP (or TOTP enroll if first time)
 *   4) enroll-totp / confirm-enroll → QR setup for authenticator apps
 *   5) verify-totp   → return Supabase session tokens
 *
 * Body: { action, email?, code?, password?, challengeId?, stepToken?, totpCode? }
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const LOGO = 'https://www.choremaxx.app/brand/icons/icon-coral.png';
const FROM = 'ChoreMaxx Console <noreply@choremaxx.app>';
const OTP_TTL_MS = 15 * 60 * 1000;
const STEP_TTL_MS = 15 * 60 * 1000;

const cors = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin ?? '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
});

const json = (origin: string | null, body: unknown, status = 200) =>
  Response.json(body, { status, headers: cors(origin) });

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function randomDigits(n: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(n));
  return [...bytes].map((b) => (b % 10).toString()).join('');
}

function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Base32 (RFC 4648) encode/decode for TOTP secrets. */
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
function b32encode(bytes: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let out = '';
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      out += B32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) out += B32[(value << (5 - bits)) & 31];
  return out;
}
function b32decode(s: string): Uint8Array {
  const clean = s.replace(/=+$/, '').toUpperCase().replace(/[^A-Z2-7]/g, '');
  let bits = 0;
  let value = 0;
  const out: number[] = [];
  for (const ch of clean) {
    const idx = B32.indexOf(ch);
    if (idx < 0) continue;
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      out.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return new Uint8Array(out);
}

async function totpCode(secretB32: string, atMs = Date.now()): Promise<string> {
  const key = b32decode(secretB32);
  const counter = Math.floor(atMs / 1000 / 30);
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setUint32(0, Math.floor(counter / 0x100000000));
  view.setUint32(4, counter >>> 0);
  const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', cryptoKey, buf));
  const offset = sig[sig.length - 1]! & 0xf;
  const code =
    (((sig[offset]! & 0x7f) << 24) |
      ((sig[offset + 1]! & 0xff) << 16) |
      ((sig[offset + 2]! & 0xff) << 8) |
      (sig[offset + 3]! & 0xff)) %
    1_000_000;
  return code.toString().padStart(6, '0');
}

async function totpValid(secretB32: string, code: string): Promise<boolean> {
  const clean = (code ?? '').replace(/\s+/g, '');
  if (!/^\d{6}$/.test(clean)) return false;
  const now = Date.now();
  for (const delta of [-1, 0, 1]) {
    const expected = await totpCode(secretB32, now + delta * 30_000);
    if (expected === clean) return true;
  }
  return false;
}

function staffEmailHtml(opts: { name: string; code: string }): string {
  const digits = opts.code.split('').join(' ');
  return `<!DOCTYPE html><html><head>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&display=swap" rel="stylesheet"/>
  </head><body style="margin:0;padding:0;background:#FAF0EB">
  <div style="font-family:'Bricolage Grotesque',Segoe UI,-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;margin:0 auto;padding:32px 16px">
    <div style="background:#fff;border-radius:24px;overflow:hidden;border:1px solid rgba(20,40,60,.08)">
      <div style="padding:22px 28px;background:#FDE8DF;border-bottom:1px solid rgba(216,90,48,.15)">
        <img src="${LOGO}" width="36" height="36" alt="" style="vertical-align:middle;border-radius:10px"/>
        <span style="margin-left:10px;font-weight:800;font-size:18px;letter-spacing:-.03em;color:#0F1C2A;vertical-align:middle">
          chore<span style="color:#D85A30">maxx</span> <span style="color:#C4922A;font-weight:700">console</span>
        </span>
      </div>
      <div style="padding:28px">
        <div style="display:inline-block;background:#FDE8DF;color:#B84722;font-size:11px;font-weight:800;letter-spacing:.08em;padding:4px 10px;border-radius:8px">STAFF CONSOLE</div>
        <h1 style="margin:14px 0 8px;font-size:26px;letter-spacing:-.03em;color:#0F1C2A">Sign in to the console</h1>
        <p style="margin:0 0 18px;color:#2A3A4C;font-size:15px;line-height:1.55">
          Hi ${escapeHtml(opts.name)}, use this code on <strong>console.choremaxx.app</strong>.
          This is not the ChoreMaxx app sign-in email.
        </p>
        <div style="background:#FFF6F0;border:1.5px dashed #D85A30;border-radius:16px;padding:18px;text-align:center">
          <div style="font-size:11px;font-weight:800;letter-spacing:.1em;color:#B84722;margin-bottom:10px">CONSOLE SIGN-IN CODE</div>
          <div style="font-size:32px;font-weight:800;letter-spacing:.28em;color:#0F1C2A;font-variant-numeric:tabular-nums">${digits}</div>
          <p style="margin:12px 0 0;font-size:13px;color:#5A6E82">Expires in 15 minutes. Enter it on the console, then your password and authenticator code.</p>
        </div>
        <p style="margin:22px 0 0;font-size:12px;color:#9C9088;line-height:1.5">
          If you did not request this, ignore the email and tell an owner. Never share this code.
        </p>
      </div>
    </div>
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

type Challenge = {
  id: string;
  user_id: string;
  email: string;
  otp_hash: string;
  otp_expires_at: string;
  otp_verified_at: string | null;
  password_verified_at: string | null;
  step_token_hash: string | null;
  step_token_expires_at: string | null;
  pending_access_token: string | null;
  pending_refresh_token: string | null;
  consumed_at: string | null;
};

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin');
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
  if (req.method !== 'POST') return json(origin, { error: 'POST only' }, 405);

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

  // ── 1. Request OTP ────────────────────────────────────────────────────────
  if (action === 'request-otp') {
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase();
    if (!email.includes('@')) return json(origin, { error: 'Enter your work email.' }, 400);

    const { data: staff } = await admin
      .from('console_staff')
      .select('user_id, email, totp_enabled')
      .ilike('email', email)
      .maybeSingle();

    // Same response whether or not staff — avoid enumeration.
    const generic = { ok: true, message: 'If this address is on the staff list, a console sign-in code is on its way.' };
    if (!staff) return json(origin, generic);

    const otp = randomDigits(8);
    const otpHash = await sha256Hex(otp);
    await admin.from('console_auth_challenges').insert({
      user_id: staff.user_id,
      email: staff.email,
      otp_hash: otpHash,
      otp_expires_at: new Date(Date.now() + OTP_TTL_MS).toISOString(),
    });

    if (!resendKey) {
      console.error('console-auth: RESEND_API_KEY missing');
      return json(origin, { error: 'Email is not configured for the console yet.' }, 503);
    }

    const name = (staff.email.split('@')[0] ?? 'there').split(/[._-]/)[0] || 'there';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [staff.email],
        subject: 'Your ChoreMaxx Console sign-in code',
        html: staffEmailHtml({ name, code: otp }),
        text: `Your ChoreMaxx Console sign-in code is ${otp}. It expires in 15 minutes. Enter it at console.choremaxx.app — this is not the app sign-in email.`,
      }),
    });
    if (!res.ok) {
      console.error('console-auth resend', res.status, (await res.text()).slice(0, 300));
      return json(origin, { error: 'Could not send the console email.' }, 502);
    }
    return json(origin, { ...generic, challengeHint: true });
  }

  // ── 2. Verify OTP ─────────────────────────────────────────────────────────
  if (action === 'verify-otp') {
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase();
    const code = String(body.code ?? '').replace(/\s+/g, '');
    if (!/^\d{8}$/.test(code)) return json(origin, { error: 'Enter the 8-digit code from your email.' }, 400);

    const { data: rows } = await admin
      .from('console_auth_challenges')
      .select('*')
      .ilike('email', email)
      .is('consumed_at', null)
      .order('created_at', { ascending: false })
      .limit(5);

    const hash = await sha256Hex(code);
    const match = (rows as Challenge[] | null)?.find(
      (r) => r.otp_hash === hash && new Date(r.otp_expires_at).getTime() > Date.now() && !r.otp_verified_at
    );
    if (!match) return json(origin, { error: 'That code is wrong or expired. Request a new one.' }, 401);

    await admin
      .from('console_auth_challenges')
      .update({ otp_verified_at: new Date().toISOString() })
      .eq('id', match.id);
    const stepToken = await issueStepToken(match.id);
    return json(origin, { ok: true, next: 'password', challengeId: match.id, stepToken });
  }

  // ── 3. Verify password ────────────────────────────────────────────────────
  if (action === 'verify-password') {
    const challengeId = String(body.challengeId ?? '');
    const stepToken = String(body.stepToken ?? '');
    const password = String(body.password ?? '');
    if (!password || password.length < 8) return json(origin, { error: 'Enter your console password (8+ characters).' }, 400);

    const ch = await loadChallenge(challengeId, stepToken);
    if (!ch?.otp_verified_at || ch.password_verified_at) {
      return json(origin, { error: 'Session expired. Start sign-in again.' }, 401);
    }

    const authed = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: signed, error } = await authed.auth.signInWithPassword({ email: ch.email, password });
    if (error || !signed.session) {
      return json(origin, { error: 'Wrong password.' }, 401);
    }

    const { data: staff } = await admin
      .from('console_staff')
      .select('totp_enabled, totp_secret')
      .eq('user_id', ch.user_id)
      .maybeSingle();

    await admin
      .from('console_auth_challenges')
      .update({
        password_verified_at: new Date().toISOString(),
        pending_access_token: signed.session.access_token,
        pending_refresh_token: signed.session.refresh_token,
      })
      .eq('id', ch.id);
    const nextToken = await issueStepToken(ch.id);

    if (!staff?.totp_enabled || !staff.totp_secret) {
      // Prepare enrollment secret (not enabled until confirm-enroll).
      const secretBytes = crypto.getRandomValues(new Uint8Array(20));
      const secret = b32encode(secretBytes);
      await admin.from('console_staff').update({ totp_secret: secret, totp_enabled: false }).eq('user_id', ch.user_id);
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

    return json(origin, { ok: true, next: 'totp', challengeId: ch.id, stepToken: nextToken });
  }

  // ── 4a. Confirm TOTP enrollment → session (one code finishes first setup) ──
  if (action === 'confirm-enroll') {
    const challengeId = String(body.challengeId ?? '');
    const stepToken = String(body.stepToken ?? '');
    const totpCodeIn = String(body.totpCode ?? '');
    const ch = await loadChallenge(challengeId, stepToken);
    if (!ch?.password_verified_at || !ch.pending_access_token || !ch.pending_refresh_token) {
      return json(origin, { error: 'Session expired. Start sign-in again.' }, 401);
    }

    const { data: staff } = await admin
      .from('console_staff')
      .select('totp_secret, totp_enabled')
      .eq('user_id', ch.user_id)
      .maybeSingle();
    if (!staff?.totp_secret) return json(origin, { error: 'No authenticator setup in progress.' }, 400);
    if (!(await totpValid(staff.totp_secret, totpCodeIn))) {
      return json(origin, { error: 'That authenticator code is wrong. Try the next one.' }, 401);
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

  // ── 5. Verify TOTP → session ──────────────────────────────────────────────
  if (action === 'verify-totp') {
    const challengeId = String(body.challengeId ?? '');
    const stepToken = String(body.stepToken ?? '');
    const totpCodeIn = String(body.totpCode ?? '');
    const ch = await loadChallenge(challengeId, stepToken);
    if (!ch?.password_verified_at || !ch.pending_access_token || !ch.pending_refresh_token) {
      return json(origin, { error: 'Session expired. Start sign-in again.' }, 401);
    }

    const { data: staff } = await admin
      .from('console_staff')
      .select('totp_secret, totp_enabled')
      .eq('user_id', ch.user_id)
      .maybeSingle();
    if (!staff?.totp_enabled || !staff.totp_secret) {
      return json(origin, { error: 'Set up your authenticator first.' }, 400);
    }
    if (!(await totpValid(staff.totp_secret, totpCodeIn))) {
      return json(origin, { error: 'That authenticator code is wrong.' }, 401);
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
});
