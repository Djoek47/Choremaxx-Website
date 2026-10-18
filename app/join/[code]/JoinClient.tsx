'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { APP_STORE_URL, buildAppJoinUrl, normalizeJoinCode } from '@/lib/auth-bridge';

import styles from '../../auth/callback/bridge.module.css';

const OPEN_DELAY_MS = 600;

export default function JoinClient({ code }: { code: string }) {
  const normalized = useMemo(() => normalizeJoinCode(code), [code]);
  const deepLink = useMemo(() => buildAppJoinUrl(normalized), [normalized]);
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    if (!normalized || attempted) return;
    const timer = window.setTimeout(() => {
      setAttempted(true);
      window.location.href = deepLink;
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [normalized, deepLink, attempted]);

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

        <h1 className={styles.title}>Opening Choremaxx…</h1>
        <p className={styles.sub}>
          {normalized ? `Joining with code ${normalized}` : 'Invite link incomplete'}
        </p>

        <div className={styles.actions}>
          {normalized ? (
            <a className={styles.primary} href={deepLink}>
              Open Choremaxx
            </a>
          ) : null}
          <a className={styles.secondary} href={APP_STORE_URL}>
            Get the app
          </a>
        </div>

        <p className={styles.help}>
          If the app doesn’t open, install Choremaxx from the App Store, then tap Open again.
        </p>
      </main>
    </div>
  );
}
