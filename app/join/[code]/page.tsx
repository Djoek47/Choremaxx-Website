import type { Metadata } from 'next';

import JoinClient from './JoinClient';

export const metadata: Metadata = {
  title: 'Join household — Choremaxx',
  description: 'Open Choremaxx to join a household invite.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function JoinPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <JoinClient code={code || ''} />;
}
