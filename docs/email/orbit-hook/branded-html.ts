/**
 * Branded Auth email HTML for Edge deploy (`send-auth-email`).
 * Visual source: Ben’s cream-card confirm-email.html (SF Pro, peach header,
 * coral pill CTA, dashed OTP). Street, city, and year lines removed.
 *
 * Copy this file over Orbit:
 *   supabase/functions/send-auth-email/branded-html.ts
 * then: npx supabase functions deploy send-auth-email --no-verify-jwt
 */

export type AuthEmailAction =
  | 'signup'
  | 'invite'
  | 'magiclink'
  | 'recovery'
  | 'email_change'
  | 'email'
  | string;

const LOGO_URL = 'https://www.choremaxx.app/emails/logo-mark.png';
const FONT =
  "'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI Variable Display','Segoe UI',Helvetica,Arial,sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || 'there';
}

type Copy = {
  subject: string;
  title: string;
  preheader: string;
  badge: string;
  headline: string;
  bodyHtml: string;
  ctaLabel: string;
  expiry: string;
  afterCode: string;
  ignore: string;
};

function copyFor(input: {
  action: AuthEmailAction;
  name: string;
  oldEmail?: string;
  newEmail?: string;
}): Copy {
  const name = firstName(input.name);
  const hi = name && name !== 'there' ? `Hi ${escapeHtml(name)}, tap` : 'Tap';

  switch (input.action) {
    case 'recovery':
      return {
        subject: 'Reset your password',
        title: 'Reset your password',
        preheader: 'Tap Reset password to choose a new Choremaxx password — or use the code inside.',
        badge: 'Password reset',
        headline: 'Reset your password',
        bodyHtml: `${hi} <strong style="color:#0F1C2A;font-weight:600;">Reset password</strong> on this phone — we&rsquo;ll open Choremaxx so you can choose a new password. Or enter the code below in the app.`,
        ctaLabel: 'Reset password',
        expiry: 'Link expires in 1 hour.',
        afterCode:
          'Open Choremaxx &rarr; <span style="color:#2A3A4C;">Forgot password</span> &rarr; type the code. Works even if the button doesn&rsquo;t.',
        ignore:
          'You received this because a password reset was requested for a Choremaxx account with this address. If that wasn&rsquo;t you, ignore this email &mdash; your password stays the same.',
      };
    case 'email_change':
      return {
        subject: 'Confirm your new email',
        title: 'Confirm your new email',
        preheader:
          'Tap Confirm new email to finish changing the address on your Choremaxx account — or use the code inside.',
        badge: 'Email change',
        headline: 'Confirm your new email',
        bodyHtml: `${hi} <strong style="color:#0F1C2A;font-weight:600;">Confirm new email</strong> on this phone — we&rsquo;ll open Choremaxx and finish switching the address on your household account. Or enter the code below in the app.`,
        ctaLabel: 'Confirm new email',
        expiry: 'Link expires in 24 hours.',
        afterCode:
          'Open Choremaxx &rarr; <span style="color:#2A3A4C;">Confirm your email</span> &rarr; type the code. Works even if the button doesn&rsquo;t.',
        ignore:
          'You received this because an email change was requested for a Choremaxx account. If that wasn&rsquo;t you, ignore this email &mdash; the address will not change until it&rsquo;s confirmed.',
      };
    case 'magiclink':
    case 'email':
      return {
        subject: 'Sign in to Choremaxx',
        title: 'Sign in to Choremaxx',
        preheader: 'Tap Sign in to open Choremaxx — or use the code inside.',
        badge: 'Sign in',
        headline: 'Sign in to Choremaxx',
        bodyHtml: `${hi} <strong style="color:#0F1C2A;font-weight:600;">Sign in</strong> on this phone — we&rsquo;ll open Choremaxx. Or enter the code below in the app.`,
        ctaLabel: 'Sign in',
        expiry: 'Link expires in 15 minutes.',
        afterCode:
          'Open Choremaxx &rarr; <span style="color:#2A3A4C;">Sign in</span> &rarr; type the code. Works even if the button doesn&rsquo;t.',
        ignore:
          'You received this because someone tried to sign in to Choremaxx with this address. If that wasn&rsquo;t you, ignore this email.',
      };
    case 'signup':
    case 'invite':
    default:
      return {
        subject: 'Confirm your email',
        title: 'Confirm your email',
        preheader:
          'Tap Confirm email to finish setting up your Choremaxx household — or use the code inside.',
        badge: 'One last step',
        headline: 'Confirm your email',
        bodyHtml: `${hi} <strong style="color:#0F1C2A;font-weight:600;">Confirm email</strong> on this phone — we&rsquo;ll open Choremaxx and finish verifying your household account. Or enter the code below in the app.`,
        ctaLabel: 'Confirm email',
        expiry: 'Link expires in 24 hours.',
        afterCode:
          'Open Choremaxx &rarr; <span style="color:#2A3A4C;">Confirm your email</span> &rarr; type the code. Works even if the button doesn&rsquo;t.',
        ignore:
          'You received this because someone signed up for Choremaxx with this address. If that wasn&rsquo;t you, ignore this email &mdash; no account is created until it&rsquo;s confirmed.',
      };
  }
}

function otpBlock(otp: string): string {
  if (!otp) return '';
  return `
          <tr>
            <td width="600" class="cm-cell" style="width:600px;padding:0 44px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="512" class="cm-inner" style="width:512px;border-collapse:collapse;">
                <tr>
                  <td width="512" class="cm-inner" bgcolor="#FDE8DF" style="width:512px;padding:20px;background-color:#FDE8DF;background-image:linear-gradient(135deg,#FDECE4 0%,#FBE0D4 100%);border-radius:24px;">
                    <p style="margin:0 0 12px;font-family:${FONT};font-size:11px;line-height:14px;mso-line-height-rule:exactly;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B84722;">Or enter this code in Choremaxx</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="472" class="cm-inner" style="width:472px;border-collapse:collapse;">
                      <tr>
                        <td width="472" class="cm-inner" bgcolor="#FFFFFF" align="center" style="width:472px;padding:16px 12px;background:#FFFFFF;border:1px dashed #EFB69C;border-radius:16px;">
                          <span class="cm-code" style="font-family:'SF Mono',Menlo,Consolas,'Courier New',monospace;font-size:32px;line-height:40px;mso-line-height-rule:exactly;font-weight:700;letter-spacing:0.2em;color:#0F1C2A;">${escapeHtml(otp)}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td width="600" class="cm-cell" style="width:600px;padding:26px 44px 0;">
              <p style="margin:0;font-family:${FONT};font-size:13px;line-height:20px;mso-line-height-rule:exactly;color:#5A6E82;">__AFTER_CODE__</p>
            </td>
          </tr>`;
}

export function renderBrandedAuthEmail(input: {
  action: AuthEmailAction;
  name: string;
  confirmUrl: string;
  otp?: string;
  oldEmail?: string;
  newEmail?: string;
}): { subject: string; html: string; text: string } {
  const c = copyFor(input);
  const url = escapeHtml(input.confirmUrl);
  const otp = input.otp?.trim() ?? '';
  const otpHtml = otpBlock(otp).replace('__AFTER_CODE__', c.afterCode);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>${escapeHtml(c.title)}</title>
<!--[if mso]>
<xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
<![endif]-->
<style>
  body { margin:0; padding:0; width:100% !important; -webkit-text-size-adjust:100%; }
  table { border-collapse:collapse; }
  img { border:0; outline:none; text-decoration:none; }
  @media only screen and (max-width:620px) {
    .cm-shell, .cm-cell, .cm-inner { width:100% !important; max-width:100% !important; }
    .cm-cell { padding-left:24px !important; padding-right:24px !important; }
    .cm-h1 { font-size:28px !important; line-height:34px !important; }
    .cm-code { font-size:26px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#F1E4DC;">
<div style="background-color:#F1E4DC;background-image:radial-gradient(ellipse 90% 45% at 50% -8%, rgba(216,90,48,0.20), rgba(241,228,220,0) 62%),linear-gradient(180deg,#FCF3EE 0%,#F3E6DE 48%,#EBDBD2 100%);padding:40px 16px 56px;font-family:${FONT};">
  <span style="display:none;font-size:1px;color:#F1E4DC;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(c.preheader)}</span>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" class="cm-shell" style="width:600px;max-width:600px;margin:0 auto;border-collapse:collapse;">

    <tr>
      <td width="600" class="cm-shell" style="width:600px;background:#FFFFFF;border-radius:32px;border:1px solid #EADFD8;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="cm-shell" style="width:600px;border-collapse:collapse;">
          <tr>
            <td width="600" class="cm-cell" bgcolor="#FDE8DF" style="width:600px;padding:26px 44px;background-color:#FDE8DF;background-image:linear-gradient(180deg,#FDECE4 0%,#FBE1D5 100%);border-radius:32px 32px 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td width="48" style="width:48px;padding:0 14px 0 0;vertical-align:middle;">
                    <img src="${LOGO_URL}" width="48" height="48" alt="Choremaxx" style="display:block;width:48px;height:48px;border:0;border-radius:14px;" />
                  </td>
                  <td style="vertical-align:middle;font-family:${FONT};font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:26px;mso-line-height-rule:exactly;">
                    <span style="color:#C4922A;">chore</span><span style="color:#D85A30;">maxx</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td width="600" height="3" class="cm-cell" bgcolor="#E8CE9E" style="width:600px;height:3px;line-height:3px;font-size:0;background-color:#E8CE9E;background-image:linear-gradient(90deg,#D85A30 0%,#E8CE9E 55%,#FBE1D5 100%);">&nbsp;</td>
          </tr>

          <tr>
            <td width="600" class="cm-cell" style="width:600px;padding:40px 44px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 18px;">
                <tr>
                  <td bgcolor="#FDE8DF" style="padding:7px 14px;background-color:#FDE8DF;border:1px solid #F5C9B6;border-radius:100px;font-family:${FONT};font-size:11px;line-height:14px;mso-line-height-rule:exactly;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B84722;">${escapeHtml(c.badge)}</td>
                </tr>
              </table>
              <h1 class="cm-h1" style="margin:0 0 16px;font-family:${FONT};font-size:34px;line-height:40px;mso-line-height-rule:exactly;font-weight:800;letter-spacing:-0.03em;color:#0F1C2A;">${escapeHtml(c.headline)}</h1>
              <p style="margin:0 0 30px;font-family:${FONT};font-size:17px;line-height:28px;mso-line-height-rule:exactly;color:#2A3A4C;text-wrap:pretty;">${c.bodyHtml}</p>
            </td>
          </tr>

          <tr>
            <td width="600" class="cm-cell" style="width:600px;padding:0 44px 26px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td align="center" bgcolor="#D85A30" style="border-radius:100px;background-color:#D85A30;background-image:linear-gradient(180deg,#E4693C 0%,#D85A30 100%);box-shadow:0 6px 22px rgba(216,90,48,0.38);">
                    <a href="${url}" target="_blank" rel="noopener" style="display:block;padding:18px 38px;font-family:${FONT};font-size:16px;line-height:20px;mso-line-height-rule:exactly;font-weight:700;letter-spacing:-0.01em;color:#FFFFFF;text-decoration:none;border-radius:100px;mso-padding-alt:0;">
                      <!--[if mso]><i style="letter-spacing:38px;mso-font-width:-100%;mso-text-raise:22pt">&nbsp;</i><![endif]-->
                      <span style="color:#FFFFFF;">${escapeHtml(c.ctaLabel)}</span>
                      <!--[if mso]><i style="letter-spacing:38px;mso-font-width:-100%">&nbsp;</i><![endif]-->
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font-family:${FONT};font-size:13px;line-height:18px;mso-line-height-rule:exactly;color:#5A6E82;">${escapeHtml(c.expiry)}</p>
            </td>
          </tr>
${otpHtml}

          <tr>
            <td width="600" class="cm-cell" style="width:600px;padding:24px 44px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="512" class="cm-inner" style="width:512px;border-collapse:collapse;">
                <tr><td width="512" height="1" style="width:512px;height:1px;background:#EFE4DD;line-height:1px;font-size:0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <tr>
            <td width="600" class="cm-cell" style="width:600px;padding:20px 44px 40px;">
              <p style="margin:0;font-family:${FONT};font-size:12px;line-height:19px;mso-line-height-rule:exactly;color:#5A6E82;">If the button does not work, open this link:<br />
                <a href="${url}" target="_blank" rel="noopener" style="word-break:break-all;color:#D85A30;text-decoration:underline;">${url}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td width="600" class="cm-cell" style="width:600px;padding:26px 24px 0;" align="center">
        <p style="margin:0 0 8px;font-family:${FONT};font-size:12px;line-height:19px;mso-line-height-rule:exactly;color:#5A6E82;text-align:center;">${c.ignore}</p>
        <p style="margin:0 0 8px;font-family:${FONT};font-size:12px;line-height:19px;mso-line-height-rule:exactly;color:#5A6E82;text-align:center;">
          <a href="https://www.choremaxx.app/support" target="_blank" rel="noopener" style="color:#5A6E82;text-decoration:underline;">Support</a>&nbsp; &middot; &nbsp;<a href="https://www.choremaxx.app/privacy" target="_blank" rel="noopener" style="color:#5A6E82;text-decoration:underline;">Privacy</a>&nbsp; &middot; &nbsp;<a href="https://www.choremaxx.app/terms" target="_blank" rel="noopener" style="color:#5A6E82;text-decoration:underline;">Terms</a>
        </p>
        <p style="margin:0;font-family:${FONT};font-size:11px;line-height:18px;mso-line-height-rule:exactly;color:#8A7E77;text-align:center;">ChoreMaxx<br />All rights reserved.</p>
      </td>
    </tr>
  </table>
</div>
</body>
</html>`;

  const text = [
    `choremaxx — ${c.headline}`,
    '',
    c.bodyHtml.replace(/<[^>]+>/g, '').replace(/&rsquo;/g, "'").replace(/&rarr;/g, '->').replace(/&mdash;/g, '—'),
    '',
    `${c.ctaLabel}: ${input.confirmUrl}`,
    otp ? `Code: ${otp}` : '',
    c.expiry,
    '',
    'ChoreMaxx',
  ]
    .filter(Boolean)
    .join('\n');

  return { subject: c.subject, html, text };
}
