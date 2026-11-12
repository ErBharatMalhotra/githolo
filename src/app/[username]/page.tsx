import { fetchDevData } from '@/lib/github';
import { enrichDevStats } from '@/lib/engine/archetype';
import type { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export async function generateMetadata(
  { params }: { params: Promise<{ username: string }> }
): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `${username} | GitHolo — Developer Trading Card`,
    description: `View ${username}'s 3D Holographic Developer Trading Card with RPG stats, archetype, and rarity tier.`,
    openGraph: {
      title: `${username}'s GitHolo Card`,
      description: `View ${username}'s holographic developer trading card with RPG stats and rarity tier.`,
      images: [`/api/og/${username}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${username}'s GitHolo Card`,
      description: `View ${username}'s holographic developer trading card.`,
      images: [`/api/og/${username}`],
    },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  let stats;
  try {
    const raw = await fetchDevData(username);
    stats = enrichDevStats({ ...raw, username });
  } catch {
    stats = enrichDevStats({ username });
  }

  return <ProfileClient stats={stats} />;
}
