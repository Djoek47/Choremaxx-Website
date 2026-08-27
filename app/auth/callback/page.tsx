import type { Metadata } from 'next';

import { authFlowType, bridgeCopy } from '@/lib/auth-bridge';

import AuthCallbackClient from './AuthCallbackClient';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const raw = params.type;
  const type = Array.isArray(raw) ? raw[0] : raw;
  const copy = bridgeCopy(authFlowType(new URLSearchParams(type ? { type } : {})));
  return {
    title: copy.title,
    description: `${copy.sub} and opening the Choremaxx app.`,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

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
