import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { HoloCard } from '@/components/card/HoloCard';
import { enrichDevStats } from '@/lib/engine/archetype';
import type { DevStats } from '@/lib/engine/types';

describe('HoloCard Component', () => {
  const dummyStats: DevStats = enrichDevStats({
    username: 'ErBharatMalhotra',
    name: 'Bharat Malhotra',
    avatarUrl: 'https://avatars.githubusercontent.com/ErBharatMalhotra',
    totalCommits: 1450,
    totalStars: 420,
    totalPRs: 85,
  });

  it('renders card with username, archetype and rarity badge', () => {
    render(<HoloCard stats={dummyStats} theme="cyberpunk" interactive={false} />);

    expect(screen.getByText('ErBharatMalhotra')).toBeInTheDocument();
    expect(screen.getByText(dummyStats.rarity)).toBeInTheDocument();
    expect(screen.getByText(dummyStats.archetype)).toBeInTheDocument();
  });

  it('renders RPG metrics (ATK, DEF, MANA, LUCK)', () => {
    render(<HoloCard stats={dummyStats} theme="gold" interactive={false} />);

    expect(screen.getByText('ATK')).toBeInTheDocument();
    expect(screen.getByText('DEF')).toBeInTheDocument();
    expect(screen.getByText('MANA')).toBeInTheDocument();
    expect(screen.getByText('LUCK')).toBeInTheDocument();
    expect(screen.getByText(dummyStats.rpgStats.atk.toString())).toBeInTheDocument();
  });

  it('renders ultimate skill and domain branding', () => {
    render(<HoloCard stats={dummyStats} theme="retro90s" interactive={false} />);

    expect(screen.getByText('ULTIMATE SKILL')).toBeInTheDocument();
    expect(screen.getByText(dummyStats.ultimateSkill)).toBeInTheDocument();
    expect(screen.getByText('GITHOLO.BHARATDN.COM')).toBeInTheDocument();
  });
});
