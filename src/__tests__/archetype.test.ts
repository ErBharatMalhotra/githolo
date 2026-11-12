import { describe, it, expect } from 'vitest';
import {
  calculateArchetype,
  calculateRarity,
  calculateRpgStats,
  generateUltimateSkill,
  enrichDevStats,
} from '@/lib/engine/archetype';
import type { TopLanguage } from '@/lib/engine/types';

describe('RPG Stat & Archetype Engine', () => {
  describe('calculateArchetype', () => {
    it('assigns Systems Paladin when Rust/C/C++ >= 35%', () => {
      const langs: TopLanguage[] = [
        { name: 'Rust', percentage: 40 },
        { name: 'TypeScript', percentage: 60 },
      ];
      const result = calculateArchetype(langs, 10, 20, 70, 10, 100);
      expect(result.archetype).toBe('Systems Paladin');
      expect(result.title).toBe('The Low-Level Bastion');
    });

    it('assigns Iron Monolith when streakDays >= 60', () => {
      const langs: TopLanguage[] = [{ name: 'TypeScript', percentage: 100 }];
      const result = calculateArchetype(langs, 65, 20, 70, 10, 100);
      expect(result.archetype).toBe('Iron Monolith');
      expect(result.title).toBe('The Relentless Engine');
    });

    it('assigns Open Source Titan when totalStars >= 1000', () => {
      const langs: TopLanguage[] = [{ name: 'JavaScript', percentage: 100 }];
      const result = calculateArchetype(langs, 10, 20, 70, 1500, 200);
      expect(result.archetype).toBe('Open Source Titan');
    });

    it('assigns Midnight Sorcerer when nightOwlPercentage >= 45', () => {
      const langs: TopLanguage[] = [{ name: 'Python', percentage: 100 }];
      const result = calculateArchetype(langs, 15, 55, 60, 50, 100);
      expect(result.archetype).toBe('Midnight Sorcerer');
    });

    it('assigns The Code Arbiter when prMergeRate >= 80% and commits > 50', () => {
      const langs: TopLanguage[] = [{ name: 'Go', percentage: 100 }];
      const result = calculateArchetype(langs, 10, 20, 92, 50, 150);
      expect(result.archetype).toBe('The Code Arbiter');
    });

    it('assigns Polyglot Alchemist when 4+ languages have >= 12% presence', () => {
      const langs: TopLanguage[] = [
        { name: 'Go', percentage: 25 },
        { name: 'Python', percentage: 25 },
        { name: 'TypeScript', percentage: 25 },
        { name: 'Rust', percentage: 25 },
      ];
      const result = calculateArchetype(langs, 10, 20, 60, 50, 40);
      expect(result.archetype).toBe('Polyglot Alchemist');
    });

    it('defaults to Fullstack Alchemist if no extreme criteria met', () => {
      const langs: TopLanguage[] = [{ name: 'HTML', percentage: 100 }];
      const result = calculateArchetype(langs, 5, 10, 50, 5, 20);
      expect(result.archetype).toBe('Fullstack Alchemist');
    });
  });

  describe('calculateRarity', () => {
    it('calculates Mythic for top-tier metrics', () => {
      const { rarity, percentile } = calculateRarity(4000, 2500, 500, 1000);
      expect(rarity).toBe('Mythic');
      expect(percentile).toContain('0.5%');
    });

    it('calculates Legendary for high metrics', () => {
      // powerScore: 1200*1.2 (1440) + 100*15 (1500) + 20*8 (160) + 50*5 (250) = 3350 >= 2500
      const { rarity } = calculateRarity(1200, 100, 20, 50);
      expect(rarity).toBe('Legendary');
    });

    it('calculates Epic for mid-high metrics', () => {
      // powerScore: 500*1.2 (600) + 40*15 (600) + 10*8 (80) + 20*5 (100) = 1380 >= 1000
      const { rarity } = calculateRarity(500, 40, 10, 20);
      expect(rarity).toBe('Epic');
    });

    it('calculates Rare for moderate metrics', () => {
      // powerScore: 200*1.2 (240) + 15*15 (225) + 5*8 (40) + 10*5 (50) = 555 >= 400
      const { rarity } = calculateRarity(200, 15, 5, 10);
      expect(rarity).toBe('Rare');
    });

    it('calculates Standard for starter metrics', () => {
      const { rarity } = calculateRarity(50, 5, 2, 2);
      expect(rarity).toBe('Standard');
    });
  });

  describe('calculateRpgStats', () => {
    it('keeps stats bounded between 0 and 99', () => {
      const stats = calculateRpgStats(
        50000, // commits
        2000,  // PRs
        500,   // issues
        10000, // stars
        5000,  // followers
        [{ name: 'Rust', percentage: 100 }],
        95     // prMergeRate
      );

      expect(stats.atk).toBeLessThanOrEqual(99);
      expect(stats.atk).toBeGreaterThanOrEqual(15);
      expect(stats.def).toBeLessThanOrEqual(99);
      expect(stats.def).toBeGreaterThanOrEqual(20);
      expect(stats.mana).toBeLessThanOrEqual(99);
      expect(stats.luck).toBeLessThanOrEqual(99);
      expect(stats.overall).toBeLessThanOrEqual(99);
    });
  });

  describe('generateUltimateSkill', () => {
    it('generates archetype-specific skill names', () => {
      expect(generateUltimateSkill('Systems Paladin', 'kernel-core', 'Rust')).toContain('ZERO-COST ABSTRACTION');
      expect(generateUltimateSkill('Midnight Sorcerer', 'night-daemon', 'Python')).toContain('VOID COMMIT OVERDRIVE');
      expect(generateUltimateSkill('Iron Monolith')).toContain('UNBROKEN PROTOCOL');
    });
  });

  describe('enrichDevStats', () => {
    it('populates defaults and calculated stats correctly', () => {
      const enriched = enrichDevStats({
        username: 'ErBharatMalhotra',
        totalCommits: 850,
        totalStars: 150,
      });

      expect(enriched.username).toBe('ErBharatMalhotra');
      expect(enriched.name).toBe('ErBharatMalhotra');
      expect(enriched.avatarUrl).toContain('githubusercontent.com');
      expect(enriched.rpgStats.overall).toBeGreaterThan(0);
      expect(enriched.ultimateSkill).toBeTruthy();
    });
  });
});
