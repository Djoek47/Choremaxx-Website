import type { Metadata } from 'next';

import HomeClient from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: 'ChoreMaxx — Your home, running itself',
  description:
    'Chores with XP, rewards kids actually want, one family calendar, and Poppin AI. Free for 7 days on iPhone and iPad.',
  alternates: { canonical: 'https://www.choremaxx.app/' },
};

export default function Home() {
  return <HomeClient />;
}
