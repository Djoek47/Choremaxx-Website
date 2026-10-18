import type { Metadata } from 'next';

import HomeClient from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: 'ChoreMaxx — The chore app for families with standards',
  description:
    'Assign the work, track who actually did it, and make it worth doing. 150 ready-made chores, XP, streaks and weekly crowns. For families, not roommates.',
  openGraph: {
    title: 'ChoreMaxx — Everyone knows what’s theirs to do',
    description: 'Parents assign. Kids complete. XP, streaks, crowns and rewards keep it honest. Free for 7 days.',
  },
};

export default function Home() {
  return <HomeClient />;
}
