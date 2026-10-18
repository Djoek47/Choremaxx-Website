/**
 * ChoreMaxx Console staff auth — three factors, custom email (not the app magic link).
 *
 * Steps:
 *   1) start-signin     → email + password; on success email an 8-digit code
 *   2) verify-otp       → unlock authenticator step (or enroll if first time)
 *   3) confirm-enroll / verify-totp → return Supabase session tokens
 *
 * Also: resend-otp, cancel-challenge
 *
 * Body: { action, email?, password?, code?, challengeId?, stepToken?, totpCode? }
 */
export const LOGO = 'https://www.choremaxx.app/brand/icons/icon-coral.png';
export const FROM = 'ChoreMaxx Console <noreply@choremaxx.app>';
export const OTP_TTL_MS = 15 * 60 * 1000;
export const STEP_TTL_MS = 15 * 60 * 1000;

export const cors = (origin: string | null) => ({
  'Access-Control-Allow-Origin': origin ?? '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
});

export const json = (origin: string | null, body: unknown, status = 200) =>
  Response.json(body, { status, headers: cors(origin) });

export async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function randomDigits(n: number): string {
  const bytes = crypto.getRandomValues(new Uint8Array(n));
  return [...bytes].map((b) => (b % 10).toString()).join('');
}

export function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Base32 (RFC 4648) encode/decode for TOTP secrets. */
export const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export function b32encode(bytes: Uint8Array): string {
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
export function b32decode(s: string): Uint8Array {
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

export async function totpCode(secretB32: string, atMs = Date.now()): Promise<string> {
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

export async function totpValid(secretB32: string, code: string): Promise<boolean> {
  const clean = (code ?? '').replace(/\s+/g, '');
  if (!/^\d{6}$/.test(clean)) return false;
  const now = Date.now();
  for (const delta of [-1, 0, 1]) {
    const expected = await totpCode(secretB32, now + delta * 30_000);
    if (expected === clean) return true;
  }
  return false;
}

export function staffEmailHtml(opts: { name: string; code: string }): string {
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
          <p style="margin:12px 0 0;font-size:13px;color:#5A6E82">Expires in 15 minutes. Enter it on the console, then your authenticator code.</p>
        </div>
        <p style="margin:22px 0 0;font-size:12px;color:#9C9088;line-height:1.5">
          If you did not request this, ignore the email and tell an owner. Never share this code.
        </p>
      </div>
    </div>
  </div>
</body></html>`;
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

export type Challenge = {
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

