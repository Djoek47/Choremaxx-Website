'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import {
  APP_STORE_URL,
  buildAppConfirmUrl,
  hasAuthError,
  hasAuthPayload,
  parseHashParams,
} from '@/lib/auth-bridge';

import styles from './bridge.module.css';

const OPEN_DELAY_MS = 600;

type Props = {
  /** Server-parsed query so the Open CTA works before hydration. */
  initialQuery: Record<string, string>;
};

export default function AuthCallbackClient({ initialQuery }: Props) {
  const [hashParams, setHashParams] = useState<URLSearchParams | null>(null);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setHashParams(parseHashParams(window.location.hash || ''));
  }, []);

  const search = useMemo(() => {
    const q = new URLSearchParams();
    for (const [key, value] of Object.entries(initialQuery)) {
      if (value) q.set(key, value);
    }
    return q;
  }, [initialQuery]);

  const mergedForError = useMemo(() => {
    const m = new URLSearchParams(search);
    hashParams?.forEach((v, k) => {
      if (!m.has(k)) m.set(k, v);
    });
    return m;
  }, [search, hashParams]);

  const authError = hasAuthError(mergedForError);
  const deepLink = useMemo(
    () => buildAppConfirmUrl(search, hashParams ?? undefined),
    [search, hashParams]
  );
  const payloadReady = hasAuthPayload(mergedForError);
  const showOpen = !authError.error;

  useEffect(() => {
    if (!showOpen || !payloadReady || attempted) return;
    const timer = window.setTimeout(() => {
      setAttempted(true);
      window.location.href = deepLink;
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [showOpen, payloadReady, deepLink, attempted]);

  return (
    <div className={styles.bridge}>
      <div className={styles.wash} aria-hidden />
      <div className={styles.blobA} aria-hidden />
      <div className={styles.blobB} aria-hidden />

      <main className={styles.main}>
        <div className={styles.brand}>
          <Image
            src="/emails/logo-mark.png"
            alt=""
            width={64}
            height={64}
            priority
            className={styles.mark}
          />
          <p className={styles.wordmark} aria-label="choremaxx">
            <span className={styles.chore}>chore</span>
            <span className={styles.maxx}>maxx</span>
          </p>
        </div>

        {authError.error ? (
          <>
            <h1 className={styles.title}>Couldn’t open the link</h1>
            <p className={styles.sub}>
              {authError.description ||
                'This confirmation link is invalid or expired. Open Choremaxx and enter the code from your email.'}
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Opening Choremaxx…</h1>
            <p className={styles.sub}>Confirming your email</p>
          </>
        )}

        <div className={styles.actions}>
          {showOpen ? (
            <a className={styles.primary} href={deepLink}>
              Open Choremaxx
            </a>
          ) : null}
          <a className={styles.secondary} href={APP_STORE_URL}>
            Get the app
          </a>
        </div>

        <p className={styles.help}>
          Or open Choremaxx → Confirm your email → enter the code from this email.
        </p>
      </main>
    </div>
  );
}
