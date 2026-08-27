/** Pure helpers for Auth / invite deep-link bridges (no Supabase on the website). */

export const APP_STORE_URL = 'https://apps.apple.com/app/id6796850110';
export const APP_SCHEME_CALLBACK = 'choremaxx://auth/callback';
export const APP_SCHEME_JOIN = 'choremaxx://join';

const AUTH_KEYS = [
  'token_hash',
  'token',
  'type',
  'code',
  'access_token',
  'refresh_token',
  'error',
  'error_description',
] as const;

export function parseHashParams(hash: string): URLSearchParams {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  return new URLSearchParams(raw.startsWith('?') ? raw.slice(1) : raw);
}

export function buildAppConfirmUrl(
  search: URLSearchParams,
  hashParams?: URLSearchParams
): string {
  const merged = new URLSearchParams();

  for (const key of AUTH_KEYS) {
    const fromSearch = search.get(key);
    const fromHash = hashParams?.get(key) ?? null;
    const value = fromSearch || fromHash;
    if (value) merged.set(key, value);
  }

  // Normalize aliases for the iOS app (verifyOtp prefers token_hash).
  if (!merged.get('token_hash') && merged.get('token')) {
    merged.set('token_hash', merged.get('token')!);
  }
  if (!merged.get('type') && (merged.get('token_hash') || merged.get('code') || merged.get('access_token'))) {
    merged.set('type', 'signup');
  }

  // Drop raw `token` once normalized to avoid ambiguous doubles in the app.
  if (merged.get('token_hash') && merged.get('token') === merged.get('token_hash')) {
    merged.delete('token');
  }

  return `${APP_SCHEME_CALLBACK}?${merged.toString()}`;
}

export function hasAuthError(params: URLSearchParams): {
  error?: string;
  description?: string;
} {
  const error = params.get('error') || undefined;
  const description = params.get('error_description') || undefined;
  return { error, description };
}

export function hasAuthPayload(params: URLSearchParams): boolean {
  return Boolean(
    params.get('token_hash') ||
      params.get('token') ||
      params.get('code') ||
      params.get('access_token') ||
      params.get('refresh_token')
  );
}

export function normalizeJoinCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
}

export function buildAppJoinUrl(code: string): string {
  return `${APP_SCHEME_JOIN}/${normalizeJoinCode(code)}`;
}

export function authFlowType(params: URLSearchParams): string {
  return (params.get('type') || 'signup').toLowerCase();
}

export function bridgeCopy(type: string): {
  title: string;
  sub: string;
  help: string;
  errorFallback: string;
} {
  switch (type) {
    case 'recovery':
      return {
        title: 'Opening Choremaxx…',
        sub: 'Resetting your password',
        help: 'Or open Choremaxx → Forgot password → enter the code from this email.',
        errorFallback:
          'This reset link is invalid or expired. Open Choremaxx and enter the code from your email.',
      };
    case 'email_change':
      return {
        title: 'Opening Choremaxx…',
        sub: 'Confirming your new email',
        help: 'Or open Choremaxx → Confirm your email → enter the code from this email.',
        errorFallback:
          'This email-change link is invalid or expired. Open Choremaxx and enter the code from your email.',
      };
    case 'magiclink':
    case 'invite':
      return {
        title: 'Opening Choremaxx…',
        sub: 'Signing you in',
        help: 'Or open Choremaxx and enter the code from this email.',
        errorFallback:
          'This sign-in link is invalid or expired. Open Choremaxx and enter the code from your email.',
      };
    default:
      return {
        title: 'Opening Choremaxx…',
        sub: 'Confirming your email',
        help: 'Or open Choremaxx → Confirm your email → enter the code from this email.',
        errorFallback:
          'This confirmation link is invalid or expired. Open Choremaxx and enter the code from your email.',
      };
  }
}
