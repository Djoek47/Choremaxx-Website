import type { Metadata } from 'next';

import AuthCallbackClient from './AuthCallbackClient';

export const metadata: Metadata = {
  title: 'Opening Choremaxx…',
  description: 'Confirming your email and opening the Choremaxx app.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

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

function pickQuery(
  searchParams: Record<string, string | string[] | undefined>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of AUTH_KEYS) {
    const raw = searchParams[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (typeof value === 'string' && value.length > 0) out[key] = value;
  }
  return out;
}

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialQuery = pickQuery(params);

  return <AuthCallbackClient initialQuery={initialQuery} />;
}
